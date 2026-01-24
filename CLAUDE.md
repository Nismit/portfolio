# Portfolio Project Instructions

## Project Overview

Next.js 15 App Router + Tailwind CSS + TypeScript のポートフォリオサイト。
静的サイト生成（SSG）で出力する。

参照: @overview.md, @plan.md

## Commands

```bash
# Development
npm run dev          # 開発サーバー起動

# Lint & Format
npm run lint         # Biome lint実行
npm run format       # Biome format実行
npm run check        # lint + format チェック

# Build
npm run build        # 本番ビルド
npm run start        # 本番サーバー起動

# Test
npm run test         # Vitest実行
npm run test:watch   # Vitest watchモード

# Storybook
npm run storybook    # Storybook開発
```

## Code Style

### TypeScript
- `import type { X }` で型のみのインポートを分離
- 型は明示的に定義、`any` は使用禁止
- `interface` より `type` を優先

### React / Next.js 15 App Router

**Server Components（デフォルト）:**
- データ取得、DB接続、機密情報処理に使用
- `async/await` で直接データフェッチ可能
- クライアントJSバンドルに含まれない

**Client Components:**
- `'use client'` ディレクティブを先頭に記述
- useState, useEffect, イベントハンドラーが必要な場合のみ
- localStorage等ブラウザAPIアクセス時

**重要: Next.js 15の変更点:**
- `params` と `searchParams` は `Promise` になった
- 使用時は `const { slug } = await params` のように await する

**ディレクトリ構造:**
```
src/
├── app/                    # App Router
│   ├── layout.tsx          # Root Layout（必須）
│   ├── page.tsx            # Home page
│   ├── [route]/
│   │   └── page.tsx
│   └── _components/        # Route専用コンポーネント
├── components/             # 共有コンポーネント
│   └── [Name]/index.tsx
└── lib/                    # ユーティリティ
```

**ファイル規約:**
- `layout.tsx` - 共有レイアウト（状態保持）
- `page.tsx` - ページコンポーネント
- `loading.tsx` - ローディングUI
- `error.tsx` - エラーバウンダリ（`'use client'`必須）
- `not-found.tsx` - 404ページ

### Tailwind CSS
- インラインで `className` に記述
- 長くなる場合は変数に分離（例: `const containerStyles = "..."` ）
- カスタムカラーは `tailwind.config.ts` の theme.extend で定義

### File Naming
- コンポーネント: PascalCase (`Button.tsx`)
- ユーティリティ: camelCase (`formatDate.ts`)
- 定数: UPPER_SNAKE_CASE (`const MAX_COUNT = 10`)

## Static Generation (SSG)

- 動的ルートは `generateStaticParams` で事前生成
- `output: 'export'` で完全静的出力
- Server-only機能（cookies, headers at runtime）は使用不可

## Testing

- テストファイルは `*.test.ts` または `*.test.tsx`
- コンポーネントテストは React Testing Library を使用
- モックは最小限に、実際の動作をテスト

## Git

### コミットルール
- コミットメッセージは英語
- Conventional Commits 形式: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- 作業ブランチ: `v5`

### コミットタイミング
- **Claudeが自動でコミット**する
- 小さな変更でも動作確認できたらすぐコミット
- 1コミット = 1つの理解可能な変更

### コミット粒度の目安
- ページ移行: 1ページ完了で1コミット
- コンポーネント移行: 1コンポーネント完了で1コミット
- 設定変更: 1つの設定完了で1コミット
- リファクタリング: 1つの改善で1コミット

### コミットメッセージ例
```
feat: add root layout for App Router
feat: migrate about page to App Router
refactor: convert Header component to Tailwind
chore: setup Biome linter
test: add tests for api utility functions
```

### 禁止事項
- 複数の無関係な変更を1コミットにまとめない
- ビルドが通らない状態でコミットしない
- WIP（作業中）コミットは避ける
