# Portfolio v5 Upgrade Plan

## Goals

- [ ] Next.js 最新版へアップグレード
- [ ] Page Router → App Router 移行
- [ ] SSG（静的出力）を維持
- [ ] Emotion → Tailwind CSS 移行（デザイン維持）
- [ ] コンテンツは変更なし

---

## Phase 0: Biome Setup (Linter/Formatter) ✅

### 0.1 Biome 導入

- [x] Biome インストール (@biomejs/biome v2.3.12)
- [x] `biome.json` 設定ファイル作成
- [ ] ~~ESLint 関連パッケージ削除~~ (next lint と共存)
- [ ] ~~`.eslintrc.json` 削除~~ (next lint 用に維持)

### 0.2 スクリプト設定

- [x] `npm run lint` → next lint (維持)
- [x] `npm run format` → Biome format 実行
- [x] `npm run check` → lint + format チェック
- [x] `npm run check:fix` → lint + format 自動修正

### 0.3 既存コードの修正

- [x] Biome ルールに合わせてコード修正
- [x] フォーマット適用
- [x] 既存コードと互換性のないルールをオフに設定

---

## Phase 1: Next.js Upgrade & App Router Migration

### 1.1 Next.js アップグレード

- [ ] Next.js 15.x へアップグレード
- [ ] React 19 へアップグレード
- [ ] 依存関係の互換性確認・更新

### 1.2 App Router 構造への移行

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

### 1.3 機能移行

- [ ] Google Analytics 対応（App Router用に調整）
- [ ] コマンドパレット（cmdk）動作確認

---

## Phase 2: Emotion → Tailwind CSS Migration

### 2.1 Tailwind セットアップ

- [ ] Tailwind CSS インストール・設定
- [ ] カスタムカラー設定（既存のCSS変数を移行）
- [ ] カスタムフォント設定（PPNeueMontreal）
- [ ] Typography プラグイン検討

### 2.2 コンポーネント移行

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

### 2.3 クリーンアップ

- [ ] Emotion 関連パッケージ削除
- [ ] 不要なスタイルファイル削除

---

## Phase 3: Testing with Vitest

### 3.1 Vitest セットアップ

- [ ] Vitest インストール・設定
- [ ] React Testing Library インストール
- [ ] テスト用設定ファイル作成（`vitest.config.ts`）
- [ ] テストスクリプト追加（`package.json`）

### 3.2 ユーティリティ関数テスト

- [ ] `lib/api.ts` - データ取得関数
  - [ ] `getAllSnippetsPath()`
  - [ ] `getPostBySlug()`
  - [ ] `getAllPosts()`
  - [ ] `getAllCategories()`
  - [ ] `getPostsFromCategory()`
- [ ] `lib/transpiler.ts` - Markdown変換
- [ ] `lib/gtag.ts` - Analytics関数

### 3.3 コンポーネントテスト

- [ ] Typography - レンダリング・バリアント
- [ ] Header - ナビゲーション動作
- [ ] Command - コマンドパレット動作
- [ ] Article - 記事表示
- [ ] Categories - カテゴリリスト
- [ ] ListItem - リスト項目
- [ ] ProjectInformation - プロジェクト情報表示
- [ ] Social - ソーシャルリンク

### 3.4 CI 統合（オプション）

- [ ] GitHub Actions でテスト自動実行

---

## Phase 4: Final Checks

- [ ] 全ページの動作確認
- [ ] デザイン比較（Before/After）
- [ ] ビルド & 静的出力確認
- [ ] Lighthouse スコア確認
- [ ] Storybook 更新（必要に応じて）

---

## Notes

- 現在のブランチ: `v5`
- ベースバージョン: v4.2.1
