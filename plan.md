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

## Phase 1: Storybook 廃止 ✅

- [x] Storybook 関連パッケージ削除
- [x] `.storybook/` ディレクトリ削除
- [x] `*.stories.ts` / `*.stories.tsx` ファイル削除
- [x] Chromatic 関連削除
- [x] package.json スクリプト削除
- [x] `--legacy-peer-deps` 不要に（脆弱性 0）

---

## Phase 2: Testing with Vitest

### 2.1 Vitest セットアップ ✅

- [x] Vitest インストール・設定
- [x] React Testing Library インストール
- [x] テスト用設定ファイル作成（`vitest.config.ts`）
- [x] テストスクリプト追加（`package.json`）

### 2.2 ユーティリティ関数テスト ✅

- [x] `lib/api.ts` - データ取得関数
  - [x] `getAllSnippetsPath()`
  - [x] `getPostBySlug()`
  - [x] `getAllPosts()`
  - [x] `getAllCategories()`
  - [x] `getPostsFromCategory()`
- [x] `lib/transpiler.ts` - Markdown変換
- [x] `lib/gtag.ts` - Analytics関数

### 2.3 コンポーネントテスト ✅

- [x] Typography - レンダリング・バリアント
- [x] Header - ナビゲーション動作
- [x] Command - コマンドパレット動作
- [x] Article - 記事表示
- [x] Categories - カテゴリリスト
- [x] ListItem - リスト項目
- [x] ProjectInformation - プロジェクト情報表示
- [x] Social - ソーシャルリンク

---

## Phase 3: App Router Migration ✅

### 3.1 App Router 構造への移行 ✅

- [x] `src/app/` ディレクトリ作成
- [x] レイアウト構造の設計
  - [x] `app/layout.tsx` (Root Layout)
  - [x] 共通ヘッダー・フッター
- [x] ページ移行
  - [x] `/` → `app/page.tsx`
  - [x] `/projects` → `app/projects/page.tsx`
  - [x] `/projects/[id]` → `app/projects/[id]/page.tsx`
  - [x] `/snippets` → `app/snippets/page.tsx`
  - [x] `/snippets/category/[...slug]` → `app/snippets/category/[...slug]/page.tsx`
  - [x] `/uses` → `app/uses/page.tsx`
- [x] メタデータ管理の移行（Head → Metadata API）
- [x] 静的生成の設定（`generateStaticParams`）

### 3.2 機能移行 ✅

- [x] Google Analytics 対応（App Router用に調整）
- [x] コマンドパレット（cmdk）動作確認
- [x] テストで動作確認

---

## Phase 4: Emotion → Tailwind CSS Migration

### 4.1 Tailwind セットアップ ✅

- [x] Tailwind CSS インストール・設定
- [x] カスタムカラー設定（既存のCSS変数を移行）
- [x] カスタムフォント設定（PPNeueMontreal）

### 4.2 コンポーネント移行 ✅

- [x] Layout / Container
- [x] Header
- [x] Typography
- [x] Command
- [x] Article
- [x] Categories
- [x] ListItem
- [x] ProjectInformation
- [x] ProjectImages
- [x] Social
- [x] Icons
- [x] Shortcut

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
