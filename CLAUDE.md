# Portfolio Project Instructions

## Project Overview

Portfolio site built with Next.js 16 App Router + Tailwind CSS v4 + TypeScript.
Output as Static Site Generation (SSG).

Reference: @overview.md, @plan.md

## Commands

```bash
# Development
npm run dev          # Start development server

# Lint & Format
npm run lint         # Run Biome lint
npm run format       # Run Biome format

# Build
npm run build        # Production build (SSG)
npm run start        # Start production server

# Test
npm run test         # Run Vitest
npm run test:watch   # Run Vitest in watch mode
```

## Code Style

### TypeScript
- Use `import type { X }` to separate type-only imports
- Define types explicitly, never use `any`
- Prefer `type` over `interface`

### React / Next.js 16 App Router

**Server Components (default):**
- Use for data fetching, DB connections, handling sensitive data
- Can fetch data directly with `async/await`
- Not included in client JS bundle

**Client Components:**
- Add `'use client'` directive at the top
- Only when useState, useEffect, or event handlers are needed
- When accessing browser APIs like localStorage

**Important: Next.js 15+ changes:**
- `params` and `searchParams` are now `Promise`
- Must use `const { slug } = await params` to access values

**Directory Structure:**
```
src/
├── app/                    # App Router
│   ├── layout.tsx          # Root Layout (required)
│   ├── page.tsx            # Home page
│   ├── [route]/
│   │   └── page.tsx
│   └── _components/        # Route-specific components
├── components/             # Shared components
│   └── [Name]/index.tsx
└── lib/                    # Utilities
```

**File Conventions:**
- `layout.tsx` - Shared layout (preserves state)
- `page.tsx` - Page component
- `loading.tsx` - Loading UI
- `error.tsx` - Error boundary (`'use client'` required)
- `not-found.tsx` - 404 page

### Tailwind CSS v4
- Write styles inline in `className`
- Extract to variables when too long (e.g., `const containerStyles = "..."`)
- Custom colors defined in `@theme` block in `src/styles.css`
- No `tailwind.config.ts` file - configuration is in CSS

### File Naming
- Components: PascalCase (`Button.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (`const MAX_COUNT = 10`)

## Static Generation (SSG)

- Dynamic routes pre-generated with `generateStaticParams`
- Full static output with `output: 'export'`
- Server-only features (cookies, headers at runtime) not available

## Testing

- Test files: `*.test.ts` or `*.test.tsx`
- Component tests use React Testing Library
- Keep mocks minimal, test actual behavior

## Git

### Commit Rules
- Commit messages in English
- Conventional Commits format: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- Working branch: `v5`

### Commit Timing
- **Claude commits automatically**
- Commit as soon as changes are verified working
- 1 commit = 1 understandable change

### Commit Granularity Guidelines
- Page migration: 1 commit per completed page
- Component migration: 1 commit per completed component
- Config changes: 1 commit per completed config
- Refactoring: 1 commit per improvement

### Commit Message Examples
```
feat: add root layout for App Router
feat: migrate about page to App Router
refactor: convert Header component to Tailwind
chore: setup Biome linter
test: add tests for api utility functions
```

### Prohibited Actions
- Do not combine unrelated changes in one commit
- Do not commit when build is broken
- Avoid WIP (work in progress) commits
