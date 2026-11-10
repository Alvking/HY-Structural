<<<<<<< HEAD
# Project Setup & Local Development Guide

This guide documents the complete setup workflow from extracting the archive to launching the local development environment and CMS dashboard.

---

## Prerequisites

* **Node.js**: v20+ or v24+ (verify with `node -v`)
* **Package Manager**: `pnpm` (install globally via `npm install -g pnpm`)

---

## 1. Extracting the Project Archive

Ensure the full source files (including `src/` and `scripts/`) are properly extracted from the archive rather than running directly from a partial copy.

From PowerShell in the archive's parent directory (`C:\Users\Administrator\Desktop\HY`):

```powershell
cd C:\Users\Administrator\Desktop\HY
Expand-Archive -Path ".\9-21-1(1).zip" -DestinationPath ".\extracted_project" -Force

```

Navigate into the root folder where `package.json` resides:

```powershell
cd .\extracted_project\9-21-1(1)

```

Confirm core directories exist before proceeding:

```powershell
Test-Path src, scripts

```

*Both checks must return `True`.*

---

## 2. Installing Dependencies

Install the project packages using `pnpm` to ensure all workspace dependencies and CLI binaries are linked correctly:

```powershell
pnpm install

```

> **Note on warnings:** A notice stating `Update available! 10.8.1 -> ...` during installation is informational and does not affect the setup. Wait until `pnpm install` finishes and returns to the command prompt.
> 
> 

Verify that the local Astro binary was generated:

```powershell
Test-Path .\node_modules\.bin\astro.cmd

```

---

## 3. Running the Application

### Option A: Direct Developer Mode (Recommended)

To run the server with real-time logs and immediate error visibility:

```powershell
pnpm run dev

```

### Option B: Pre-configured Startup Script

The project includes a Windows batch helper to start the dev server and open the browser automatically:

```powershell
.\启动后台.cmd

```

---

## 4. Accessing the Application

Once the development server is active, access the interfaces at the following URLs:

* **Keystatic CMS Admin Panel:** [http://127.0.0.1:4321/keystatic](http://127.0.0.1:4321/keystatic)


* **Main Website Preview:** [http://127.0.0.1:4321/](https://www.google.com/search?q=http://127.0.0.1:4321/)



---

## Troubleshooting Common Errors

* **`'pnpm.cmd' is not recognized`**: Run `npm install -g pnpm` in your terminal, then restart PowerShell.
* **`Cannot find module '...src\content\siteSettings\settings.yaml'`**: The `src` directory was not extracted. Re-extract the `.zip` archive completely.
* **`'astro' is not recognized` / `node_modules missing**`: Run `pnpm install` in the project root before attempting `pnpm run dev`.
* **`ERR_CONNECTION_REFUSED` at `127.0.0.1:4321**`: The dev server is either still building or failed on startup. Inspect the terminal running `pnpm run dev` or review the latest file in `.\logs\` to check for crashes.



###########################
Whatsapp icon 
On the file sitehome.astro
Add the following code

const whatsappNumber = (site.contactPhonePrimaryHref || site.contactPhonePrimary || '')
  .replace(/^tel:/i, '')
  .replace(/\D/g, '');
const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello HY Structural, I would like to enquire about your services.')}`
  : '';

const alternateLocales = Astro.site
  ? [
      ...locales.map((item) => ({
        lang: item.code,
        href: new URL(
          item.code.toLowerCase() === defaultLocale.toLowerCase() ? '/' : `/${item.code}/`,
          Astro.site,
        ).toString(),
      })),
      { lang: 'x-default', href: new URL('/', Astro.site).toString() },
    ]
  : [];
---

<!-- <Layout
  title={page.seoTitle}
  description={page.seoDescription || site.defaultMetaDescription}
  lang={locale}
  siteName={site.brandName}
  defaultDescription={site.defaultMetaDescription}
  faviconHref={site.logoPath}
  ogImage={site.defaultOgImage}
  alternateLocales={alternateLocales}
>
  <NoScriptReveal />
  <SiteHeader site={site} page={page} locale={locale} currentPath={currentPath} />

  <main id="main">
    <HeroSection hero={page.hero} />
    <IntroSection intro={page.intro} proof={page.proof} />
    <ServicesSection services={page.services} quickLinks={page.quickLinks} />
    <TechnologiesSection technologies={page.technologies} />
    <ConditionsSection conditions={page.conditions} />
    <MaterialsSection materials={page.materials} />
    <ExperienceSection experience={page.experience} />
    <ProcessSection process={page.process} />
    <AboutSection about={page.about} />
    <ContactSection contact={page.contact} site={site} />
  </main>

  <SiteFooter site={site} page={page} locale={locale} currentPath={currentPath} />

  {whatsappHref && (
    <a
      class="float-whatsapp"
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HY Structural on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16.04 3C8.86 3 3.02 8.82 3.02 15.98c0 2.3.61 4.55 1.77 6.54L3 29l6.65-1.74a13.1 13.1 0 0 0 6.38 1.63h.01c7.18 0 13.02-5.82 13.02-12.98A12.9 12.9 0 0 0 25.24 6.7 12.94 12.94 0 0 0 16.04 3Zm0 23.7h-.01a10.8 10.8 0 0 1-5.5-1.5l-.4-.24-3.95 1.04 1.05-3.84-.26-.42a10.7 10.7 0 0 1-1.65-5.76c0-5.9 4.81-10.7 10.73-10.7 2.87 0 5.56 1.12 7.59 3.14a10.63 10.63 0 0 1 3.14 7.57c0 5.9-4.81 10.7-10.74 10.7Zm5.89-8.02c-.32-.16-1.9-.94-2.19-1.05-.3-.1-.5-.16-.7.16-.21.32-.8 1.05-.98 1.26-.18.21-.36.24-.67.08-.32-.16-1.33-.49-2.53-1.56-.93-.82-1.56-1.83-1.74-2.15-.18-.31-.02-.49.14-.65.14-.14.32-.37.47-.55.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.68-.96-2.3-.25-.6-.5-.52-.69-.53h-.59c-.21 0-.55.08-.84.39-.29.32-1.1 1.08-1.1 2.62s1.13 3.04 1.28 3.25c.16.21 2.22 3.37 5.37 4.73.75.32 1.34.52 1.8.67.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.76.27-1.41.19-1.55-.08-.14-.29-.22-.61-.38Z" />
      </svg>
      <span>WhatsApp</span>
    </a>
  )} -->

and it fetches the whatsapp number from settings.yaml
  then run pnpm build
=======
# HY-Structural
modifying and adding extra features
>>>>>>> 20d5ce76ea4ef491b7802708e3cb86df59f340d3
