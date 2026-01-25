# Portfolio v5 Upgrade Plan

## Goals

- [x] Next.js 最新版へアップグレード
- [ ] Page Router → App Router 移行
- [ ] SSG（静的出力）を維持
- [ ] Emotion → Tailwind CSS 移行（デザイン維持）
- [ ] コンテンツは変更なし

---

## Phase 0: Biome Setup (Linter/Formatter) ✅

- [x] Biome インストール (@biomejs/biome v2.3.12)
- [x] `biome.json` 設定ファイル作成
- [x] ESLint 関連パッケージ削除
- [x] `.eslintrc.json` 削除
- [x] Biome domains (next, react) 設定
- [x] `npm run lint` / `npm run format` スクリプト設定

---

## Phase 1: Storybook 廃止

- [ ] Storybook 関連パッケージ削除
- [ ] `.storybook/` ディレクトリ削除
- [ ] `*.stories.ts` / `*.stories.tsx` ファイル削除
- [ ] Chromatic 関連削除
- [ ] package.json スクリプト削除

---

## Phase 2: Testing with Vitest

### 2.1 Vitest セットアップ

- [ ] Vitest インストール・設定
- [ ] React Testing Library インストール
- [ ] テスト用設定ファイル作成（`vitest.config.ts`）
- [ ] テストスクリプト追加（`package.json`）

### 2.2 ユーティリティ関数テスト

- [ ] `lib/api.ts` - データ取得関数
  - [ ] `getAllSnippetsPath()`
  - [ ] `getPostBySlug()`
  - [ ] `getAllPosts()`
  - [ ] `getAllCategories()`
  - [ ] `getPostsFromCategory()`
- [ ] `lib/transpiler.ts` - Markdown変換
- [ ] `lib/gtag.ts` - Analytics関数

### 2.3 コンポーネントテスト

- [ ] Typography - レンダリング・バリアント
- [ ] Header - ナビゲーション動作
- [ ] Command - コマンドパレット動作
- [ ] Article - 記事表示
- [ ] Categories - カテゴリリスト
- [ ] ListItem - リスト項目
- [ ] ProjectInformation - プロジェクト情報表示
- [ ] Social - ソーシャルリンク

---

## Phase 3: App Router Migration

### 3.1 App Router 構造への移行

- [ ] `src/app/` ディレクトリ作成
- [ ] レイアウト構造の設計
  - [ ] `app/layout.tsx` (Root Layout)
  - [ ] 共通ヘッダー・フッター
- [ ] ページ移行
  - [ ] `/` → `app/page.tsx`
  - [ ] `/projects` → `app/projects/page.tsx`
  - [ ] `/projects/[id]` → `app/projects/[id]/page.tsx`
  - [ ] `/snippets` → `app/snippets/page.tsx`
  - [ ] `/snippets/category/[...slug]` → `app/snippets/category/[...slug]/page.tsx`
  - [ ] `/uses` → `app/uses/page.tsx`
- [ ] メタデータ管理の移行（Head → Metadata API）
- [ ] 静的生成の設定（`generateStaticParams`）

### 3.2 機能移行

- [ ] Google Analytics 対応（App Router用に調整）
- [ ] コマンドパレット（cmdk）動作確認
- [ ] テストで動作確認

---

## Phase 4: Emotion → Tailwind CSS Migration

### 4.1 Tailwind セットアップ

- [ ] Tailwind CSS インストール・設定
- [ ] カスタムカラー設定（既存のCSS変数を移行）
- [ ] カスタムフォント設定（PPNeueMontreal）

### 4.2 コンポーネント移行

- [ ] Layout / Container
- [ ] Header
- [ ] Typography
- [ ] Command
- [ ] Article
- [ ] Categories
- [ ] ListItem
- [ ] ProjectInformation
- [ ] ProjectImages
- [ ] Social
- [ ] Icons
- [ ] Shortcut

### 4.3 クリーンアップ

- [ ] Emotion 関連パッケージ削除
- [ ] 不要なスタイルファイル削除
- [ ] テストで動作確認

---

## Phase 5: Final Checks

- [ ] 全ページの動作確認
- [ ] デザイン比較（Before/After）
- [ ] ビルド & 静的出力確認
- [ ] Lighthouse スコア確認

---

## Notes

- 現在のブランチ: `v5`
- ベースバージョン: v4.2.1
- Next.js 16.1.4 + React 19.2.3 にアップグレード済み
