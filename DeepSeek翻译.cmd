@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
cd /d "%~dp0"
set PATH=%APPDATA%\npm;%PATH%
set NO_PROXY=127.0.0.1,localhost,::1

if /i "%~1"=="/?" goto :help
if /i "%~1"=="--help" goto :help

if defined DEEPSEEK_API_KEY goto :key_ok
if not exist ".env" (
    echo [错误] 未找到 .env 文件，且未设置 DEEPSEEK_API_KEY。
    goto :fail
)
for /f "usebackq tokens=1,* delims==" %%a in (".env") do (
    if "%%a"=="DEEPSEEK_API_KEY" set "DEEPSEEK_API_KEY=%%b"
    if "%%a"=="DEEPSEEK_MODEL" set "DEEPSEEK_MODEL=%%b"
)
:key_ok
if not defined DEEPSEEK_API_KEY (
    echo [错误] DEEPSEEK_API_KEY 未设置。请在 .env 中填写你的 DeepSeek API Key。
    goto :fail
)
if not defined DEEPSEEK_MODEL set "DEEPSEEK_MODEL=deepseek-chat"

if not exist logs mkdir logs
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "LOG_TS=%%i"
set "LOG_FILE=%CD%\logs\deepseek-translate-%LOG_TS%.log"
echo 日志文件：%LOG_FILE%
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "& { node '.\scripts\i18n\translate-locales.mjs' --stale %* 2>&1 | Tee-Object -FilePath $env:LOG_FILE; $code = $LASTEXITCODE; if ($code -ne 0) { exit $code }; pnpm run i18n:audit 2>&1 | Tee-Object -FilePath $env:LOG_FILE -Append; exit $LASTEXITCODE }"
set "EXIT_CODE=%ERRORLEVEL%"
echo.
if "%EXIT_CODE%"=="0" (
    echo 翻译与审计完成。
) else (
    echo 翻译或审计失败，请查看上方日志。
)
if "%NO_PAUSE%"=="" pause
exit /b %EXIT_CODE%

:fail
echo.
if "%NO_PAUSE%"=="" pause
exit /b 1

:help
echo.
echo 使用 DeepSeek 翻译网站内容
echo.
echo 用法:
echo   DeepSeek翻译.cmd                 增量翻译变更文件，完成后审计
echo   DeepSeek翻译.cmd --locale ja     只翻译指定语言，如 ja、ko、fr
echo   DeepSeek翻译.cmd --limit 1       只翻译少量文件用于连通测试
echo   DeepSeek翻译.cmd --force         全量重翻（覆盖已有翻译）
echo.
echo 配置: 在 .env 中设置 DEEPSEEK_API_KEY（必填）和 DEEPSEEK_MODEL（可选）。
echo.
exit /b 0