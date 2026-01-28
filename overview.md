# Portfolio Project Overview

## Project Info

- **Version**: v5.0.0
- **Type**: Static Site Generator (SSG)
- **Framework**: Next.js 16.1.4 (App Router)

---

## Directory Structure

```
portfolio/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── projects/           # Projects route
│   │   ├── snippets/           # Snippets route
│   │   ├── uses/               # Uses route
│   │   └── _components/        # Route-specific components
│   ├── components/             # Shared React components
│   ├── lib/                    # Utility functions
│   ├── data/                   # JSON & Markdown data
│   ├── styles.css              # Global styles + Tailwind
│   └── prism-night-owl.css     # Syntax highlighting theme
├── public/                     # Static files (images, fonts, PDF)
├── .github/                    # GitHub configuration
└── node_modules/               # npm dependencies
```

---

## Tech Stack

### Framework & Runtime

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | v16.1.4 | React framework (App Router) |
| React | v19.2.3 | UI library |
| TypeScript | v5.4.5 | Type safety |

### Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | v4.1.18 | Utility-first CSS |
| CSS Variables | - | Color scheme management |

### Markdown Processing (for Snippets)

| Technology | Purpose |
|------------|---------|
| unified | AST processing |
| remark-parse | Markdown to AST |
| remark-rehype | AST transformation |
| rehype-react | AST to React |
| refractor | Syntax highlighting |
| gray-matter | YAML frontmatter extraction |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| Biome | v2.3.12 | Linting & formatting |
| Vitest | v4.0.18 | Unit & component testing |
| React Testing Library | v16.3.2 | Component testing utilities |
| Radix UI Dialog | - | Command menu dialog base |

### Analytics

- **Google Analytics**: gtag.js (pageview tracking)

---

## Page Structure

| Path | File | Description |
|------|------|-------------|
| `/` | `app/page.tsx` | About page - Self introduction |
| `/projects` | `app/projects/page.tsx` | Project list |
| `/projects/[id]` | `app/projects/[id]/page.tsx` | Dynamic project detail page |
| `/snippets` | `app/snippets/page.tsx` | Snippet list (markdown) |
| `/snippets/category/[...slug]` | `app/snippets/category/[...slug]/page.tsx` | Category-filtered snippets |
| `/uses` | `app/uses/page.tsx` | Uses page (hardware/software) |

---

## Components

### Layout

| Component | Location | Purpose |
|-----------|----------|---------|
| MainContainer | `/src/app/_components/` | Grid-based content area |
| Header | `/src/components/Header/` | Navigation header |

### Typography

| Component | Location | Variants |
|-----------|----------|----------|
| Typography | `/src/components/Typography/` | headline, subHeadline, body, title, description |

### Navigation

| Component | Location | Features |
|-----------|----------|----------|
| Header | `/src/components/Header/` | Logo, menu button, command menu |
| CommandMenu | `/src/components/CommandMenu/` | Command palette (Cmd+K or Cmd+/) |

### Content Display

| Component | Location | Purpose |
|-----------|----------|---------|
| Article | `/src/components/Article/` | Snippet article display |
| Categories | `/src/components/Categories/` | Snippet category list |
| ListItem | `/src/components/ListItem/` | Project/link list items |
| Social | `/src/components/Social/` | Social media links |

### Project Related

| Component | Location | Purpose |
|-----------|----------|---------|
| ProjectInformation | `/src/components/ProjectInformation/` | Client, tech stack, role display |
| ProjectImages | `/src/components/ProjectImages/` | Project image gallery |

### UI Helpers

| Component | Location | Purpose |
|-----------|----------|---------|
| Icons | `/src/components/Icons/` | SVG icons (Logo, Arrow, Twitter, GitHub, etc.) |
| Shortcut | `/src/components/Shortcut/` | Keyboard shortcut display |

---

## Styling Approach

### CSS Strategy

- **Tailwind CSS v4**: Utility-first styling with `@theme` directive
- **Global CSS**: `/src/styles.css`
- **Color Scheme**: CSS variables (dark theme)

### Tailwind v4 Theme (`src/styles.css`)

```css
@theme {
  --color-background: rgb(11 16 26);
  --color-primary: rgb(243 244 246);
  --color-secondary: rgb(152 161 179);
  --color-primary-fade: rgb(102 104 109);
  --color-tertiary: rgb(62 70 89);
  --color-cmdk-bg: rgb(19 26 38);
  --color-cmdk-selected: rgb(32 44 64);

  --font-sans: "PPNeueMontreal", ...;

  --text-headline: 2.5rem;
  --text-subheadline: 1.2rem;
  --text-title: 1rem;
  --text-body: 1rem;
  --text-description: 0.85rem;
}
```

### Typography

- **Font**: `PPNeueMontreal` (custom font)
- **Font Weights**: 400 (Regular), 500 (Medium), 700 (Bold)

### Layout Design

- **Container**: Grid-based (max-width: 70ch)
  - `grid-template-columns: 1fr min(70ch, calc(100% - 2rem)) 1fr`
  - `.full-bleed`: Full-width support

---

## Data Management

### Static Data (JSON)

#### Projects (`/src/data/projects.json`)

```json
{
  "projects": [
    {
      "id": "local-public-eatery",
      "title": "Local Public Eatery",
      "stack": "WordPress",
      "images": [...]
    }
  ]
}
```

#### Social Links (`/src/data/social.json`)

```json
{
  "social": [
    {
      "type": "external",
      "title": "Twitter",
      "link": "https://twitter.com/nismit_"
    }
  ]
}
```

### Markdown-based (Snippets)

- **Location**: `/src/data/snippets/*.md`
- **Frontmatter**: YAML format

```markdown
---
date: "2023-03-11T18:52:47-08:00"
title: "Centering item with 2 lines of CSS code"
category: "css"
---
```

### Data Fetching Library (`/src/lib/api.ts`)

| Function | Purpose |
|----------|---------|
| `getAllSnippetsPath()` | Detect markdown files (fast-glob) |
| `getPostBySlug(slug)` | Get individual snippet (gray-matter) |
| `getAllPosts()` | Get all snippets (sorted by date) |
| `getTagsFromPosts(slug)` | Extract frontmatter |
| `getAllCategories()` | Get unique categories |
| `getPostsFromCategory(category)` | Get snippets by category |

### Markdown Transformation (`/src/lib/transpiler.ts`)

```
Markdown → (remark-parse) → Markdown AST
         → (remark-rehype) → HTML AST
         → (rehypePrism) → Syntax highlighting
         → (rehype-stringify) → HTML
```

**Supported Languages**: JavaScript, TypeScript, CSS, HTML/Markup

---

## Configuration Files

### tsconfig.json

```json
{
  "target": "ES2019",
  "jsx": "preserve",
  "baseUrl": ".",
  "paths": { "@/*": ["./src/*"] }
}
```

### next.config.js

```javascript
{
  reactStrictMode: true,
  output: "export"  // Static site generation
}
```

### Environment Variables

```
NEXT_PUBLIC_GA_ID=G-YS3RFKVG58
```

---

## Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| dev | `next dev` | Development server |
| build | `next build` | Production build (SSG) |
| start | `next start` | Production server |
| lint | `biome check` | Biome linting |
| format | `biome format --write` | Biome formatting |
| test | `vitest run` | Run tests |
| test:watch | `vitest` | Watch mode testing |

---

## Static Generation Strategy

- **generateStaticParams**: Pre-generate dynamic routes at build time
- **output: 'export'**: Full static HTML export
- Server-only features (cookies, headers at runtime) are not available

---

## Analytics

- **Google Analytics**: `gtag.js` pageview tracking
- Configured in root `layout.tsx` using Next.js `Script` component

---

## Key Files Summary

### App Router

```
/src/app/
├── layout.tsx              # Root layout (Header, Analytics)
├── page.tsx                # Home / About
├── projects/
│   ├── page.tsx            # Project list
│   └── [id]/page.tsx       # Project detail
├── snippets/
│   ├── page.tsx            # Snippet list
│   └── category/
│       └── [...slug]/page.tsx  # Category filter
├── uses/
│   └── page.tsx            # Uses page
└── _components/
    └── MainContainer.tsx   # Content wrapper
```

### Components

```
/src/components/
├── Header/
├── Typography/
├── CommandMenu/
├── Article/
├── Categories/
├── ProjectInformation/
├── ProjectImages/
├── Social/
├── ListItem/
├── Icons/
└── Shortcut/
```

### Utilities

```
/src/lib/
├── api.ts              # Data API
├── transpiler.ts       # Markdown processing
└── gtag.ts             # Google Analytics
```

### Styles

```
/src/
├── styles.css          # Global styles + Tailwind v4 theme
└── prism-night-owl.css # Syntax highlighting
```
