import argparse
import base64
import json
import os
import sys
import time
from datetime import datetime
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import ProxyHandler, Request, build_opener


MODEL = os.getenv("IMAGE_MODEL", "gpt-image-2")
BASE_URL = os.getenv("IMAGE_BASE_URL", "https://api.lk888.ai").rstrip("/")
GENERATE_URL = f"{BASE_URL}/v1/media/generate"
STATUS_URL = f"{BASE_URL}/v1/media/status"
DIRECT_OPENER = build_opener(ProxyHandler({}))


def parse_args():
    parser = argparse.ArgumentParser(description="通过 AIGC 聚合引擎生成图片")
    parser.add_argument("prompt", help="图片提示词")
    parser.add_argument("output", nargs="?", help="保存文件名，默认按时间生成 PNG 文件名")
    parser.add_argument("-s", "--size", default="1024x1024", help="图片尺寸，默认 1024x1024")
    parser.add_argument(
        "-q",
        "--quality",
        choices=("auto", "high", "medium", "low"),
        default="auto",
        help="图片质量，默认 auto",
    )
    parser.add_argument(
        "--poll-interval",
        type=float,
        default=4.0,
        help="轮询间隔秒数，默认 4 秒",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=600.0,
        help="等待任务完成的最长秒数，默认 600 秒",
    )
    args = parser.parse_args()
    if args.poll_interval <= 0:
        parser.error("--poll-interval 必须大于 0")
    if args.timeout <= 0:
        parser.error("--timeout 必须大于 0")
    return args


def request_json(url, api_key, method="GET", payload=None):
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Accept": "application/json",
        "User-Agent": "astro-image-script/1.0",
    }
    body = None
    if payload is not None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        headers["Content-Type"] = "application/json"

    request = Request(url, data=body, headers=headers, method=method)
    try:
        with DIRECT_OPENER.open(request, timeout=60) as response:
            raw = response.read()
    except HTTPError as error:
        details = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"接口返回 HTTP {error.code}: {details}") from error
    except URLError as error:
        raise RuntimeError(f"无法连接图片接口: {error.reason}") from error

    try:
        return json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise RuntimeError("接口没有返回有效的 JSON") from error


def find_task_id(response):
    task_id = response.get("task_id")
    if task_id is None and isinstance(response.get("data"), dict):
        task_id = response["data"].get("task_id")
    return task_id


def find_direct_result(response):
    data = response.get("data")
    if not isinstance(data, list) or not data or not isinstance(data[0], dict):
        return None, None
    return data[0].get("url"), data[0].get("b64_json")


def wait_for_result(task_id, api_key, poll_interval, timeout):
    deadline = time.monotonic() + timeout
    last_message = None
    while True:
        query = urlencode({"task_id": task_id})
        status = request_json(f"{STATUS_URL}?{query}", api_key)
        state = status.get("state")
        progress = status.get("progress") or ""
        message = f"任务状态: {state or 'unknown'} {progress}".rstrip()
        if message != last_message:
            print(message)
            last_message = message

        if status.get("is_final") is True:
            if state != "success":
                raise RuntimeError(status.get("error") or f"图片任务失败，状态: {state}")
            result_url = status.get("result_url")
            if not result_url:
                raise RuntimeError("任务成功，但接口未返回 result_url")
            return result_url

        if time.monotonic() >= deadline:
            raise TimeoutError(f"等待图片任务超时（task_id={task_id}）")
        time.sleep(poll_interval)


def save_result(output_path, result_url=None, b64_json=None):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    temporary_path = output_path.with_name(f"{output_path.name}.part")
    try:
        if b64_json:
            image_bytes = base64.b64decode(b64_json, validate=True)
        elif result_url:
            request = Request(result_url, headers={"User-Agent": "astro-image-script/1.0"})
            try:
                with DIRECT_OPENER.open(request, timeout=120) as response:
                    image_bytes = response.read()
            except (HTTPError, URLError) as error:
                raise RuntimeError(f"下载生成图片失败: {error}") from error
        else:
            raise RuntimeError("接口未返回可保存的图片")

        if not image_bytes:
            raise RuntimeError("下载到的图片内容为空")
        temporary_path.write_bytes(image_bytes)
        temporary_path.replace(output_path)
    finally:
        if temporary_path.exists():
            temporary_path.unlink()


def main():
    args = parse_args()
    api_key = os.getenv("IMAGE_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("未配置 IMAGE_API_KEY 环境变量")

    output_path = Path(args.output or f"gen_{datetime.now():%Y%m%d_%H%M%S}.png")
    payload = {
        "model": MODEL,
        "prompt": args.prompt,
        "params": {
            "size": args.size,
            "quality": args.quality,
        },
    }

    print(f"正在生成图片，提示词: {args.prompt}")
    response = request_json(GENERATE_URL, api_key, method="POST", payload=payload)
    result_url, b64_json = find_direct_result(response)
    if not result_url and not b64_json:
        task_id = find_task_id(response)
        if task_id is None:
            raise RuntimeError(f"创建任务成功，但响应中没有 task_id: {response}")
        print(f"任务已创建: {task_id}")
        result_url = wait_for_result(
            task_id,
            api_key,
            poll_interval=args.poll_interval,
            timeout=args.timeout,
        )

    save_result(output_path, result_url=result_url, b64_json=b64_json)
    print(f"生成成功！图片已保存为: {output_path.resolve()}")


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, TimeoutError, ValueError) as error:
        print(f"失败: {error}", file=sys.stderr)
        sys.exit(1)
