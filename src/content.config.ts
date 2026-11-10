// @ts-ignore
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const homePage = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/homePage' }),
  schema: z.object({
    heroLabel: z.string().optional(),
    heroTitle: z.string().optional(),
    heroBody: z.string().optional(),
    heroImage: z.string().optional(),
    heroPrimaryLabel: z.string().optional(),
    heroPrimaryHref: z.string().optional(),
    heroSecondaryLabel: z.string().optional(),
    heroSecondaryHref: z.string().optional(),
    heroTertiaryLabel: z.string().optional(),
    heroTertiaryHref: z.string().optional(),
    heroQuaternaryLabel: z.string().optional(),
    heroQuaternaryHref: z.string().optional(),
    introTitle: z.string().optional(),
    introBody: z.string().optional(),
    highlights: z.array(
      z.object({
        title: z.string().optional(),
        body: z.string().optional(),
        image: z.string().optional(),
      }),
    ).default([]),
    storyImages: z.array(
      z.object({
        image: z.string().optional(),
        alt: z.string().optional(),
      }),
    ).default([]),
    logoCloudLabel: z.string().optional(),
    logoCloudTitle: z.string().optional(),
    logos: z.array(
      z.object({
        name: z.string().optional(),
        image: z.string().optional(),
      }),
    ).default([]),
    statsLabel: z.string().optional(),
    statsTitle: z.string().optional(),
    stats: z.array(
      z.object({
        value: z.string().optional(),
        label: z.string().optional(),
        detail: z.string().optional(),
      }),
    ).default([]),
    showcaseLabel: z.string().optional(),
    showcaseTitle: z.string().optional(),
    showcaseBody: z.string().optional(),
    showcases: z.array(
      z.object({
        tag: z.string().optional(),
        title: z.string().optional(),
        body: z.string().optional(),
        image: z.string().optional(),
      }),
    ).default([]),
    giftBoxLabel: z.string().optional(),
    giftBoxTitle: z.string().optional(),
    giftBoxDescription: z.string().optional(),
    giftBoxContents: z.array(z.string()).default([]),
    giftBoxScenes: z.string().optional(),
    giftBoxImage: z.string().optional(),
    aboutLabel: z.string().optional(),
    aboutTitle: z.string().optional(),
    aboutBody: z.string().optional(),
    aboutContactEmail: z.string().optional(),
    aboutContactRedNote: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaTitle: z.string().optional(),
    ctaBody: z.string().optional(),
    ctaPrimaryLabel: z.string().optional(),
    ctaPrimaryHref: z.string().optional(),
    ctaSecondaryLabel: z.string().optional(),
    ctaSecondaryHref: z.string().optional(),
    ctaTertiaryLabel: z.string().optional(),
    ctaTertiaryHref: z.string().optional(),
    ctaQuaternaryLabel: z.string().optional(),
    ctaQuaternaryHref: z.string().optional(),
    productsLabel: z.string().optional(),
    productsTitle: z.string().optional(),
    brandTimelineTitle: z.string().optional(),
    // Added fields
    brandTimeline: z.array(
      z.object({
        date: z.string(),
        title: z.string(),
        description: z.string(),
      })
    ).default([]),
    brandStatsLabel: z.string().optional(),
    brandStatsTitle: z.string().optional(),
    brandStatsItems: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        detail: z.string(),
      })
    ).default([]),
    livingPicksLabel: z.string().optional(),
    livingPicksTitle: z.string().optional(),
    livingPicksBody: z.string().optional(),
    livingPicksCategories: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        englishName: z.string().optional(),
        description: z.string().optional(),
        mainImage: z.string().optional(),
        products: z.array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
            image: z.string().optional(),
          })
        ).default([]),
      })
    ).default([]),
    comingSoonLabel: z.string().optional(),
    comingSoonTitle: z.string().optional(),
    comingSoonBody: z.string().optional(),
    comingSoonConcepts: z.array(
      z.object({
        title: z.string(),
        englishTitle: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        tag: z.string().optional(),
      })
    ).default([]),
  }),
});

const siteSettings = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/siteSettings' }),
  schema: z.object({
    brandName: z.string().optional(),
    defaultMetaDescription: z.string().optional(),
    logoPath: z.string().optional(),
    defaultOgImage: z.string().optional(),
    defaultLocale: z.string().default('en'),
    localeCookieName: z.string().default('site_locale'),
    localeSwitcherLabel: z.string().optional(),
    mobileMenuLabel: z.string().default('Toggle navigation menu'),
    supportedLocales: z.array(
      z.object({
        code: z.string(),
        label: z.string().optional(),
      }),
    ).default([
      { code: 'en', label: 'English' },
      { code: 'zh-CN', label: '简体中文' },
    ]),
    categoryTranslations: z.array(
      z.object({
        id: z.string(),
        label: z.string().optional(),
      }),
    ).default([]),
    heroScrollText: z.string().optional(),
    navigation: z.array(
      z.object({
        label: z.string().optional(),
        href: z.string().optional(),
        isPrimary: z.boolean().optional(),
      }),
    ).default([]),
    footerBody: z.string().optional(),
    footerLinks: z.array(
      z.object({
        label: z.string().optional(),
        href: z.string().optional(),
      }),
    ).default([]),
    footerContactLabel: z.string().optional(),
    footerContactValue: z.string().optional(),
    contactPhonePrimary: z.string().optional(),
    contactPhonePrimaryHref: z.string().optional(),
    contactPhoneSecondary: z.string().optional(),
    contactPhoneSecondaryHref: z.string().optional(),
    footerAddress: z.string().optional(),
    footerQuickLinksLabel: z.string().optional(),
    footerContactColumnTitle: z.string().optional(),
    footerPhone: z.string().optional(),
    footerEmail: z.string().optional(),
    footerMotto: z.string().optional(),
    copyrightLine: z.string().optional(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    brand: z.string().optional(),
    partNumber: z.string().optional(),
    englishName: z.string().optional(),
    oneLiner: z.string().optional(),
    ingredients: z.string().optional(),
    usage: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    mainImage: z.string().optional(),
    stockStatus: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
  }),
});

const notFoundPage = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/notFoundPage' }),
  schema: z.object({
    seoTitle: z.string(),
    code: z.string(),
    message: z.string(),
    detail: z.string(),
    homeLabel: z.string(),
    homeHref: z.string(),
  }),
});

const sitePage = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/sitePage' }),
  schema: z.object({
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    brand: z.object({
      name: z.string().optional(),
      shortName: z.string().optional(),
      legalName: z.string().optional(),
      mark: z.string().optional(),
      tagline: z.string().optional(),
      area: z.string().optional(),
      email: z.string().optional(),
      website: z.string().optional(),
      websiteLabel: z.string().optional(),
    }),
    utilityBar: z
      .object({
        message: z.string().optional(),
        links: z
          .array(
            z.object({
              label: z.string().optional(),
              href: z.string().optional(),
            }),
          )
          .default([]),
      })
      .optional(),
    hero: z.object({
      eyebrow: z.string().optional(),
      stagesLabel: z.string().optional(),
      stages: z.array(z.string()).default([]),
      title: z.string().optional(),
      titleAccent: z.string().optional(),
      subtitle: z.string().optional(),
      lead: z.string().optional(),
      applicationsLabel: z.string().optional(),
      applications: z
        .array(
          z.object({
            label: z.string().optional(),
            href: z.string().optional(),
          }),
        )
        .default([]),
      primaryLabel: z.string().optional(),
      primaryHref: z.string().optional(),
      secondaryLabel: z.string().optional(),
      secondaryHref: z.string().optional(),
      trust: z.array(z.string()).default([]),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      imageNote: z.string().optional(),
    }),
    intro: z
      .object({
        eyebrow: z.string().optional(),
        title: z.string().optional(),
        body: z.string().optional(),
      })
      .optional(),
    proof: z
      .array(
        z.object({
          value: z.string().optional(),
          label: z.string().optional(),
        }),
      )
      .default([]),
    services: z
      .object({
        eyebrow: z.string().optional(),
        title: z.string().optional(),
        body: z.string().optional(),
        items: z
          .array(
            z.object({
              index: z.string().optional(),
              icon: z.string().optional(),
              title: z.string().optional(),
              body: z.string().optional(),
              image: z.string().optional(),
              imageAlt: z.string().optional(),
            }),
          )
          .default([]),
      })
      .optional(),
    quickLinks: z
      .array(
        z.object({
          index: z.string().optional(),
          title: z.string().optional(),
          body: z.string().optional(),
          href: z.string().optional(),
        }),
      )
      .default([]),
    technologies: z
      .object({
        eyebrow: z.string().optional(),
        title: z.string().optional(),
        body: z.string().optional(),
        conditionLabel: z.string().optional(),
        items: z
          .array(
            z.object({
              index: z.string().optional(),
              title: z.string().optional(),
              condition: z.string().optional(),
              image: z.string().optional(),
              imageAlt: z.string().optional(),
            }),
          )
          .default([]),
      })
      .optional(),
    conditions: z
      .object({
        eyebrow: z.string().optional(),
        title: z.string().optional(),
        body: z.string().optional(),
        items: z
          .array(
            z.object({
              index: z.string().optional(),
              title: z.string().optional(),
              image: z.string().optional(),
              imageAlt: z.string().optional(),
              blocks: z
                .array(
                  z.object({
                    heading: z.string().optional(),
                    body: z.string().optional(),
                  }),
                )
                .default([]),
            }),
          )
          .default([]),
      })
      .optional(),
    materials: z
      .object({
        eyebrow: z.string().optional(),
        title: z.string().optional(),
        body: z.string().optional(),
        brandsTitle: z.string().optional(),
        brands: z
          .array(
            z.object({
              name: z.string().optional(),
              body: z.string().optional(),
            }),
          )
          .default([]),
        selectionTitle: z.string().optional(),
        selectionBody: z.string().optional(),
        equipment: z
          .array(
            z.object({
              title: z.string().optional(),
              image: z.string().optional(),
              imageAlt: z.string().optional(),
              items: z.array(z.string()).default([]),
            }),
          )
          .default([]),
        note: z.string().optional(),
      })
      .optional(),
    experience: z
      .object({
        eyebrow: z.string().optional(),
        title: z.string().optional(),
        body: z.string().optional(),
        feature: z
          .object({
            label: z.string().optional(),
            title: z.string().optional(),
            body: z.string().optional(),
            points: z.array(z.string()).default([]),
            image: z.string().optional(),
            imageAlt: z.string().optional(),
          })
          .optional(),
        projects: z
          .array(
            z.object({
              title: z.string().optional(),
              subtitle: z.string().optional(),
              image: z.string().optional(),
              imageAlt: z.string().optional(),
            }),
          )
          .default([]),
        disclaimer: z.string().optional(),
      })
      .optional(),
    process: z
      .object({
        eyebrow: z.string().optional(),
        title: z.string().optional(),
        body: z.string().optional(),
        integration: z
          .array(
            z.object({
              index: z.string().optional(),
              icon: z.string().optional(),
              title: z.string().optional(),
              body: z.string().optional(),
              meta: z.string().optional(),
            }),
          )
          .default([]),
        detailTitle: z.string().optional(),
        steps: z
          .array(
            z.object({
              index: z.string().optional(),
              title: z.string().optional(),
              body: z.string().optional(),
            }),
          )
          .default([]),
      })
      .optional(),
    about: z
      .object({
        eyebrow: z.string().optional(),
        title: z.string().optional(),
        body: z.string().optional(),
        points: z
          .array(
            z.object({
              index: z.string().optional(),
              title: z.string().optional(),
              body: z.string().optional(),
            }),
          )
          .default([]),
        riskTitle: z.string().optional(),
        riskBody: z.string().optional(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
      })
      .optional(),
    contact: z
      .object({
        eyebrow: z.string().optional(),
        title: z.string().optional(),
        body: z.string().optional(),
        email: z.string().optional(),
        website: z.string().optional(),
        websiteLabel: z.string().optional(),
        markets: z.string().optional(),
        note: z.string().optional(),
        floatLabel: z.string().optional(),
        form: z
          .object({
            nameLabel: z.string().optional(),
            companyLabel: z.string().optional(),
            emailLabel: z.string().optional(),
            phoneLabel: z.string().optional(),
            messageLabel: z.string().optional(),
            messagePlaceholder: z.string().optional(),
            submitLabel: z.string().optional(),
            hint: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    footer: z
      .object({
        tagline: z.string().optional(),
        copyright: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  homePage,
  siteSettings,
  products,
  notFoundPage,
  sitePage,
};
