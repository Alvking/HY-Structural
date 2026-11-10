import { config, fields, singleton } from '@keystatic/core';

const previewOrigin = import.meta.env.PUBLIC_KEYSTATIC_PREVIEW_ORIGIN || 'http://127.0.0.1:4321';
const preview = (path: string) => `${previewOrigin.replace(/\/$/, '')}${path}`;

// 统一媒体池：前台正文图片存放在 public/assets/images/cms/（Keystatic 按字段
// 路径自动建立子目录），后台上传的图片进入同一目录，与 YAML 值保持一致。
const siteImage = (label: string, description?: string) =>
  fields.image({
    label,
    directory: 'public/assets/images/cms',
    publicPath: '/assets/images/cms/',
    description,
  });

const text = (label: string, options?: { multiline?: boolean; description?: string }) =>
  fields.text({
    label,
    multiline: options?.multiline,
    description: options?.description,
  });

const linkPair = () =>
  fields.object(
    {
      label: text('名称'),
      href: text('链接'),
    },
    {
      label: '链接',
      layout: [6, 6],
    },
  );

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: '企业官网内容后台',
    },
    navigation: {
      '首页正文': ['sitePage'],
      '站点设置': ['siteSettings'],
      '系统页面': ['notFoundPage'],
    },
  },
  singletons: {
    // 首页真正渲染的内容（Hero、服务、技术、病害、材料、案例、流程、关于、联系）。
    sitePage: singleton({
      label: '首页正文',
      path: 'src/content/sitePage/home',
      previewUrl: preview('/'),
      schema: {
        seoTitle: text('SEO 标题'),
        seoDescription: text('SEO 描述', { multiline: true }),
        keywords: fields.array(fields.text({ label: '关键词' }), {
          label: 'SEO 关键词',
          description: '用于 SEO 输出的关键词列表。',
        }),
        ogTitle: text('社交分享标题 (OG)'),
        ogDescription: text('社交分享描述 (OG)', { multiline: true }),
        brand: fields.object(
          {
            name: text('品牌全称'),
            shortName: text('品牌简称'),
            legalName: text('法定英文名称'),
            mark: text('品牌字母标记'),
            tagline: text('品牌标语'),
            area: text('主营市场'),
            email: text('联系邮箱'),
            website: text('官网链接'),
            websiteLabel: text('官网显示文字'),
          },
          { label: '品牌信息', layout: [6, 6, 6, 6, 12, 6, 6, 6, 6] },
        ),
        utilityBar: fields.object(
          {
            message: text('通知条文字'),
            links: fields.array(linkPair(), {
              label: '通知条链接',
              itemLabel: (props) => props.fields.label.value || '未命名链接',
            }),
          },
          { label: '顶部通知条' },
        ),
        hero: fields.object(
          {
            eyebrow: text('顶部小标签'),
            stagesLabel: text('阶段栏目标题'),
            stages: fields.array(fields.text({ label: '阶段' }), { label: '阶段词', description: '例如 INSPECT / DESIGN / BUILD。' }),
            title: text('主标题'),
            titleAccent: text('主标题强调行'),
            subtitle: text('副标题'),
            lead: text('导语', { multiline: true }),
            applicationsLabel: text('应用领域栏目标题'),
            applications: fields.array(linkPair(), {
              label: '应用领域列表',
              itemLabel: (props) => props.fields.label.value || '应用领域',
            }),
            primaryLabel: text('主按钮文案'),
            primaryHref: text('主按钮链接'),
            secondaryLabel: text('次按钮文案'),
            secondaryHref: text('次按钮链接'),
            trust: fields.array(fields.text({ label: '信任点' }), { label: '信任点列表' }),
            image: siteImage('首屏图片', '首页 Hero 大图。'),
            imageAlt: text('首屏图片替代文字'),
            imageNote: text('首屏图片说明'),
          },
          { label: '首屏 (Hero)' },
        ),
        intro: fields.object(
          {
            eyebrow: text('栏目小标签'),
            title: text('栏目标题'),
            body: text('栏目正文', { multiline: true }),
          },
          { label: '介绍区' },
        ),
        proof: fields.array(
          fields.object(
            {
              value: text('数值'),
              label: text('说明'),
            },
            { label: '数据项', layout: [6, 6] },
          ),
          {
            label: '关键数据',
            description: '介绍区下方的数据条。',
            itemLabel: (props) => `${props.fields.value.value || ''} ${props.fields.label.value || ''}`.trim() || '数据项',
          },
        ),
        services: fields.object(
          {
            eyebrow: text('栏目小标签'),
            title: text('栏目标题'),
            body: text('栏目正文', { multiline: true }),
            items: fields.array(
              fields.object(
                {
                  index: text('编号'),
                  icon: text('图标符号', { description: '单个 Unicode 符号，例如 ⌁、▱、↗。' }),
                  title: text('服务标题'),
                  body: text('服务描述', { multiline: true }),
                  image: siteImage('服务配图'),
                  imageAlt: text('配图替代文字'),
                },
                { label: '服务项', layout: [2, 2, 8, 12, 12, 12] },
              ),
              {
                label: '服务列表',
                itemLabel: (props) => props.fields.title.value || '服务项',
              },
            ),
          },
          { label: '服务方案区' },
        ),
        quickLinks: fields.array(
          fields.object(
            {
              index: text('编号'),
              title: text('标题'),
              body: text('说明', { multiline: true }),
              href: text('链接'),
            },
            { label: '快捷入口', layout: [2, 5, 5, 12] },
          ),
          {
            label: '快捷入口列表',
            itemLabel: (props) => props.fields.title.value || '快捷入口',
          },
        ),
        technologies: fields.object(
          {
            eyebrow: text('栏目小标签'),
            title: text('栏目标题'),
            body: text('栏目正文', { multiline: true }),
            conditionLabel: text('适用情形前缀'),
            items: fields.array(
              fields.object(
                {
                  index: text('编号'),
                  title: text('技术名称'),
                  condition: text('适用情形', { multiline: true }),
                  image: siteImage('技术配图'),
                  imageAlt: text('配图替代文字'),
                },
                { label: '技术项', layout: [2, 10, 12, 12, 12] },
              ),
              {
                label: '技术列表',
                itemLabel: (props) => props.fields.title.value || '技术项',
              },
            ),
          },
          { label: '加固技术区' },
        ),
        conditions: fields.object(
          {
            eyebrow: text('栏目小标签'),
            title: text('栏目标题'),
            body: text('栏目正文', { multiline: true }),
            items: fields.array(
              fields.object(
                {
                  index: text('编号'),
                  title: text('结构类型'),
                  image: siteImage('病害配图'),
                  imageAlt: text('配图替代文字'),
                  blocks: fields.array(
                    fields.object(
                      {
                        heading: text('小节标题'),
                        body: text('小节正文', { multiline: true }),
                      },
                      { label: '内容块', layout: [12, 12] },
                    ),
                    { label: '病害/处理方法内容块' },
                  ),
                },
                { label: '病害类型', layout: [2, 10, 12, 12, 12] },
              ),
              {
                label: '病害类型列表',
                itemLabel: (props) => props.fields.title.value || '病害类型',
              },
            ),
          },
          { label: '常见病害区' },
        ),
        materials: fields.object(
          {
            eyebrow: text('栏目小标签'),
            title: text('栏目标题'),
            body: text('栏目正文', { multiline: true }),
            brandsTitle: text('品牌栏目标题'),
            brands: fields.array(
              fields.object(
                {
                  name: text('品牌名称'),
                  body: text('品牌说明', { multiline: true }),
                },
                { label: '品牌', layout: [6, 6] },
              ),
              {
                label: '材料品牌',
                itemLabel: (props) => props.fields.name.value || '品牌',
              },
            ),
            selectionTitle: text('选型原则标题'),
            selectionBody: text('选型原则正文', { multiline: true }),
            equipment: fields.array(
              fields.object(
                {
                  title: text('设备组标题'),
                  image: siteImage('设备配图'),
                  imageAlt: text('配图替代文字'),
                  items: fields.array(fields.text({ label: '设备/工具' }), { label: '设备清单' }),
                },
                { label: '设备组', layout: [6, 6, 12, 12] },
              ),
              {
                label: '专业设备',
                itemLabel: (props) => props.fields.title.value || '设备组',
              },
            ),
            note: text('备注', { multiline: true }),
          },
          { label: '材料与设备区' },
        ),
        experience: fields.object(
          {
            eyebrow: text('栏目小标签'),
            title: text('栏目标题'),
            body: text('栏目正文', { multiline: true }),
            feature: fields.object(
              {
                label: text('项目标签'),
                title: text('项目标题'),
                body: text('项目描述', { multiline: true }),
                points: fields.array(fields.text({ label: '要点' }), { label: '项目要点' }),
                image: siteImage('项目配图'),
                imageAlt: text('配图替代文字'),
              },
              { label: '重点案例' },
            ),
            projects: fields.array(
              fields.object(
                {
                  title: text('项目标题'),
                  subtitle: text('项目副标题'),
                  image: siteImage('案例配图'),
                  imageAlt: text('配图替代文字'),
                },
                { label: '案例卡片', layout: [6, 6, 12, 12] },
              ),
              {
                label: '案例列表',
                itemLabel: (props) => props.fields.title.value || '案例卡片',
              },
            ),
            disclaimer: text('案例免责声明', { multiline: true }),
          },
          { label: '工程案例区' },
        ),
        process: fields.object(
          {
            eyebrow: text('栏目小标签'),
            title: text('栏目标题'),
            body: text('栏目正文', { multiline: true }),
            integration: fields.array(
              fields.object(
                {
                  index: text('编号'),
                  icon: text('图标符号', { description: '单个 Unicode 符号，例如 ⌕、◈、▤。' }),
                  title: text('阶段名称'),
                  body: text('阶段说明', { multiline: true }),
                  meta: text('交付物说明'),
                },
                { label: '交付阶段', layout: [2, 2, 8, 12, 12] },
              ),
              {
                label: '一体化交付',
                itemLabel: (props) => props.fields.title.value || '交付阶段',
              },
            ),
            detailTitle: text('详细流程标题'),
            steps: fields.array(
              fields.object(
                {
                  index: text('步骤编号'),
                  title: text('步骤名称'),
                  body: text('步骤说明', { multiline: true }),
                },
                { label: '步骤', layout: [2, 10, 12] },
              ),
              {
                label: '详细步骤',
                itemLabel: (props) => props.fields.title.value || '步骤',
              },
            ),
          },
          { label: '服务流程区' },
        ),
        about: fields.object(
          {
            eyebrow: text('栏目小标签'),
            title: text('栏目标题'),
            body: text('栏目正文', { multiline: true }),
            points: fields.array(
              fields.object(
                {
                  index: text('编号'),
                  title: text('优势标题'),
                  body: text('优势说明', { multiline: true }),
                },
                { label: '优势项', layout: [2, 10, 12] },
              ),
              {
                label: '选择我们的理由',
                itemLabel: (props) => props.fields.title.value || '优势项',
              },
            ),
            riskTitle: text('风险提示标题'),
            riskBody: text('风险提示正文', { multiline: true }),
            image: siteImage('关于我们配图'),
            imageAlt: text('配图替代文字'),
          },
          { label: '关于我们区' },
        ),
        contact: fields.object(
          {
            eyebrow: text('栏目小标签'),
            title: text('栏目标题'),
            body: text('栏目正文', { multiline: true }),
            email: text('联系邮箱'),
            website: text('官网链接'),
            websiteLabel: text('官网显示文字'),
            markets: text('办公地址/市场'),
            note: text('补充说明', { multiline: true }),
            floatLabel: text('浮动按钮文案'),
            form: fields.object(
              {
                nameLabel: text('姓名字段标签'),
                companyLabel: text('公司字段标签'),
                emailLabel: text('邮箱字段标签'),
                phoneLabel: text('电话字段标签'),
                messageLabel: text('需求字段标签'),
                messagePlaceholder: text('需求输入框占位文字'),
                submitLabel: text('提交按钮文案'),
                hint: text('表单提示文字', { multiline: true }),
              },
              { label: '表单文案', layout: [6, 6, 6, 6, 12, 12, 6, 6] },
            ),
          },
          { label: '联系区' },
        ),
        footer: fields.object(
          {
            tagline: text('页脚标语'),
            copyright: text('版权文案'),
          },
          { label: '页脚' },
        ),
      },
    }),
    siteSettings: singleton({
      label: '站点设置',
      path: 'src/content/siteSettings/settings',
      previewUrl: preview('/'),
      schema: {
        brandName: text('品牌名称', {
          description: '可留空；显示在浏览器标题、页头和页脚中。',
        }),
        defaultMetaDescription: text('默认 Meta 描述', {
          multiline: true,
          description: '可留空；作为没有单页覆盖时的站点默认描述。',
        }),
        defaultLocale: text('默认语言', {
          description: '翻译脚本会把它视为源语言，建议固定为 en 并用英文维护 CMS 原文。',
        }),
        localeCookieName: text('语言 Cookie 名称', {
          description: '用于记录访客手动切换后的语言，例如 site_locale。',
        }),
        localeSwitcherLabel: text('语言切换器标签', {
          description: '语言切换组件的辅助说明文本，例如 Language switcher。',
        }),
        mobileMenuLabel: text('移动菜单辅助文字', {
          description: '移动端菜单按钮的无障碍说明，例如 Toggle navigation menu。',
        }),
        supportedLocales: fields.array(
          fields.object(
            {
              code: text('语言代码'),
              label: text('语言名称'),
            },
            { layout: [4, 8] },
          ),
          {
            label: '支持的语言',
            description: '翻译脚本会按这里的语言代码生成本地化文件。语言名称应保持各语言自己的原生名称。',
          },
        ),
        logoPath: siteImage('Logo', '可留空；用于站点图标或品牌图。'),
        defaultOgImage: siteImage('默认分享/OG图片', '用于站点默认的社交分享缩略图。'),
        categoryTranslations: fields.array(
          fields.object(
            {
              id: text('分类标识（如 pe-trees）'),
              label: text('分类名称'),
            },
            { layout: [4, 8] },
          ),
          {
            label: '产品分类名称映射',
            description: '用于把分类标识翻译为可读语言。可以在多语言翻译文件中分别做翻译。',
            itemLabel: (props) => `${props.fields.id.value || '未设置'} -> ${props.fields.label.value || '未设置'}`,
          },
        ),
        heroScrollText: text('Hero 滚动提示文字', {
          description: '可留空；首页首屏底部的 SCROLL 提示文字。',
        }),
        navigation: fields.array(
          fields.object(
            {
              label: text('名称'),
              href: text('链接'),
              isPrimary: fields.checkbox({ label: '主按钮样式' }),
            },
            { layout: [5, 5, 2] },
          ),
          {
            label: '顶部导航',
            description: '共享站点壳层导航；不填则前台不显示。',
          },
        ),
        footerBody: text('页脚说明', {
          multiline: true,
          description: '可留空；用于页脚的基础站点介绍。',
        }),
        footerLinks: fields.array(
          fields.object(
            {
              label: text('名称'),
              href: text('链接'),
            },
            { layout: [6, 6] },
          ),
          {
            label: '页脚链接',
            description: '页脚二级导航；不填则前台不显示。',
          },
        ),
        footerContactLabel: text('页脚联系标签', {
          description: '可留空；例如 Email / WhatsApp / Contact。',
        }),
        footerContactValue: text('页脚联系内容', {
          description: '可留空；例如 hello@example.com。',
        }),
        contactPhonePrimary: text('联系电话（主）', {
          description: '可留空；例如 +254 728 630 800。',
        }),
        contactPhonePrimaryHref: text('联系电话链接（主）', {
          description: '可留空；例如 tel:+254728630800。',
        }),
        contactPhoneSecondary: text('联系电话（次）', {
          description: '可留空。',
        }),
        contactPhoneSecondaryHref: text('联系电话链接（次）', {
          description: '可留空。',
        }),
        footerAddress: text('地址', {
          description: '可留空；例如 Block D 1124 Laikipia Rd, Nairobi。',
        }),
        footerQuickLinksLabel: text('页脚「快速链接」栏目标题', {
          description: '可留空。',
        }),
        footerContactColumnTitle: text('页脚「联系我们」栏目标题', {
          description: '可留空。',
        }),
        footerPhone: text('页脚联系电话', {
          description: '可留空；例如 0728630800 / 0742159128。',
        }),
        footerEmail: text('页脚联系邮箱', {
          description: '可留空；例如 contact@example.com。',
        }),
        footerMotto: text('页脚品牌标语', {
          description: '可留空；页脚底部显示的品牌格言。',
        }),
        copyrightLine: text('版权文案', {
          description: '可留空；完整填写需要前台显示的版权文本，例如 © 2026 某某公司. All rights reserved.',
        }),
      },
    }),
    notFoundPage: singleton({
      label: '404 页面',
      path: 'src/content/notFoundPage/not-found',
      previewUrl: preview('/404.html'),
      schema: {
        seoTitle: text('SEO 标题'),
        code: text('状态码'),
        message: text('主提示'),
        detail: text('详细提示', { multiline: true }),
        homeLabel: text('返回首页按钮'),
        homeHref: text('返回首页链接'),
      },
    }),
  },
});
