# Portfolio Project Overview

## Project Info

- **Version**: v4.2.1
- **Type**: Static Site Generator (SSG)
- **Framework**: Next.js 14.2.3

---

## Directory Structure

```
portfolio/
├── src/
│   ├── components/          # React UI components
│   ├── pages/               # Next.js pages (routing)
│   ├── lib/                 # Utility functions & libraries
│   ├── data/                # JSON & Markdown data
│   ├── styles.css           # Global styles
│   └── prism-night-owl.css  # Syntax highlighting theme
├── public/                  # Static files (images, fonts, PDF)
├── .storybook/              # Storybook configuration
├── .github/                 # GitHub configuration
└── node_modules/            # npm dependencies
```

---

## Tech Stack

### Framework & Runtime

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | v14.2.3 | React framework |
| React | v18.3.1 | UI library |
| TypeScript | v5.4.5 | Type safety |

### Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| Emotion | v11.11.1 | CSS-in-JS |
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

### UI & Development Tools

| Technology | Purpose |
|------------|---------|
| cmdk | Command palette |
| Storybook v8 | Component development |
| ESLint | Code quality |
| Chromatic | Visual testing |

### Analytics

- **Google Analytics**: gtag.js (pageview tracking)

---

## Page Structure

| Path | File | Description |
|------|------|-------------|
| `/` | `pages/index.tsx` | About page - Self introduction |
| `/projects` | `pages/projects/index.tsx` | Project list |
| `/projects/[id]` | `pages/projects/[id].tsx` | Dynamic project detail page |
| `/snippets` | `pages/snippets/index.tsx` | Snippet list (markdown) |
| `/snippets/category/[...slug]` | `pages/snippets/category/[...slug].tsx` | Category-filtered snippets |
| `/uses` | `pages/uses.tsx` | Uses page (hardware/software) |

---

## Components

### Layout

| Component | Location | Purpose |
|-----------|----------|---------|
| Layout | `/src/components/Layout/` | Main layout wrapper |
| Container | `/src/components/Layout/` | Grid-based content area |
| Head | `/src/components/Head/` | Meta data management |
| Header | `/src/components/Header/` | Navigation header |

### Typography

| Component | Location | Variants |
|-----------|----------|----------|
| Typography | `/src/components/Typography/` | headline, subHeadline, body, title, description |

### Navigation

| Component | Location | Features |
|-----------|----------|----------|
| Header | `/src/components/Header/` | Logo, menu button, command menu |
| Command | `/src/components/Command/` | cmdk-based command palette (Cmd+K or Cmd+/) |

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

- **Emotion (CSS-in-JS)**: Scoped component styles
- **Global CSS**: `/src/styles.css`
- **Color Scheme**: CSS variables (dark theme)

### CSS Variables (Color Palette)

```css
--background: 11, 16, 26;        /* Deep navy background */
--primary: 243, 244, 246;        /* Light gray text */
--secondary: 152, 161, 179;      /* Gray text */
--primary-fade: 102, 104, 109;   /* Faded gray */
--tertiary: 62, 70, 89;          /* Dark gray */
```

### Typography

- **Font**: `PPNeueMontreal` (custom font)
- **Sizes**:
  - headline: 2.25rem (36px)
  - subHeadline: 1.125rem (18px)
  - body: 16px
  - title: 1.125rem
  - description: 16px

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
  reactStrictMode: true
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
| build | `next build` | Production build |
| start | `next start` | Production server |
| lint | `next lint` | ESLint execution |
| storybook | `storybook dev` | Storybook development |
| build-storybook | `storybook build` | Storybook production build |
| chromatic | `chromatic --exit-zero-on-changes` | Visual testing |

---

## Pre-rendering Strategy

- **getStaticProps**: Data fetching at build time
- **getStaticPaths**: Dynamic route pre-generation
  - Project details: Generated from `projects.json`
  - Snippet categories: Generated from markdown files

---

## Analytics

- **Google Analytics**: `gtag.js` pageview tracking
- Route change monitoring via `routeChangeComplete` event in `_app.tsx`

---

## Key Files Summary

### Components

```
/src/components/
├── Layout/
├── Header/
├── Typography/
├── Command/
├── Article/
├── Categories/
├── ProjectInformation/
├── ProjectImages/
├── Social/
├── ListItem/
├── Icons/
├── Shortcut/
└── Head/
```

### Pages

```
/src/pages/
├── index.tsx           # About
├── projects/
│   ├── index.tsx       # Project list
│   └── [id].tsx        # Project detail
├── snippets/
│   ├── index.tsx       # Snippet list
│   └── category/
│       └── [...slug].tsx  # Category filter
├── uses.tsx            # Uses
├── _app.tsx            # App wrapper
└── _document.tsx       # Document customization
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
├── styles.css          # Global styles
└── prism-night-owl.css # Syntax highlighting
```
