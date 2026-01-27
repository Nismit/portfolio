# cmdk → 独自コマンドメニューコンポーネント移行計画

## 概要

`cmdk` パッケージを Radix UI Dialog ベースの独自コンポーネントに置き換える。
参考実装: [fumadocs/search.tsx](https://github.com/fuma-nama/fumadocs/blob/75d9cba5/packages/ui/src/components/dialog/search.tsx)

## 現状分析

### 現在の cmdk 使用箇所

- `src/components/Command/index.tsx` - メインコンポーネント
- `src/components/Header/Header.test.tsx` - テスト

### 使用している cmdk 機能

| cmdk コンポーネント | 機能 |
|---|---|
| `Command.Dialog` | モーダルダイアログ（open/onOpenChange） |
| `Command.Input` | 検索入力 |
| `Command.List` | アイテムリスト |
| `Command.Empty` | 結果なし表示 |
| `Command.Group` | グループ見出し |
| `Command.Item` | 選択可能なアイテム（onSelect） |

### 現在のコマンドメニュー項目

**Pages グループ:**
- About → `/`
- Projects → `/projects`
- Uses → `/uses`
- Snippets → `/snippets`

**Social グループ:**
- Twitter（外部リンク）
- GitHub（外部リンク）
- LinkedIn（外部リンク）
- Email（mailto）

### 現在のキーボードショートカット

- `⌘K` / `⌘/` - メニュー開閉トグル

---

## 実装計画

### Phase 1: 依存パッケージの追加

```bash
npm install @radix-ui/react-dialog
```

### Phase 2: コンポーネント作成

#### ファイル構成

```
src/components/CommandMenu/
├── index.tsx           # メインエクスポート
├── CommandMenu.tsx     # ルートコンポーネント
├── CommandInput.tsx    # 検索入力
├── CommandList.tsx     # リスト + キーボードナビゲーション
├── CommandGroup.tsx    # グループ見出し
├── CommandItem.tsx     # アイテム
├── CommandEmpty.tsx    # 結果なし表示
├── context.tsx         # Context定義
├── types.ts            # 型定義
└── CommandMenu.test.tsx # テスト
```

#### 型定義 (`types.ts`)

```typescript
import type { ReactElement } from 'react';

export type CommandItemData = {
  id: string;
  label: string;
  shortcut?: string;
  icon?: ReactElement;
  group: string;
} & (
  | { type: 'navigate'; href: string }
  | { type: 'external'; href: string }
);

export type CommandGroup = {
  id: string;
  heading: string;
  items: CommandItemData[];
};
```

#### Context (`context.tsx`)

```typescript
import { createContext, useContext } from 'react';

type CommandContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  search: string;
  onSearchChange: (value: string) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  filteredItems: CommandItemData[];
};

export const CommandContext = createContext<CommandContextValue | null>(null);

export function useCommand() {
  const ctx = useContext(CommandContext);
  if (!ctx) throw new Error('Missing CommandMenu provider');
  return ctx;
}
```

#### キーボードナビゲーション

`CommandList.tsx` で実装:

```typescript
useEffect(() => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.isComposing) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      // アクティブアイテムの移動
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      // アイテム選択実行
    }
  };

  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
}, []);
```

#### 検索フィルタリング

```typescript
const filteredItems = useMemo(() => {
  if (!search.trim()) return allItems;

  const query = search.toLowerCase();
  return allItems.filter(item =>
    item.label.toLowerCase().includes(query)
  );
}, [search, allItems]);
```

### Phase 3: スタイル移行

現在の `styles.css` の cmdk スタイルを Tailwind クラスに変換。

#### スタイルマッピング

| cmdk セレクタ | Tailwind クラス |
|---|---|
| `[cmdk-overlay]` | `fixed inset-0 bg-background/70 backdrop-blur-sm` |
| `[cmdk-dialog]` | `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[640px]` |
| `[cmdk-root]` | `w-full rounded-lg overflow-hidden shadow-[0_0_1px_1px_rgba(255,255,255,0.1)] bg-cmdk-bg` |
| `[cmdk-input]` | `w-full border-none text-lg p-4 px-6 outline-none bg-transparent text-primary border-b border-primary-fade/80 font-medium` |
| `[cmdk-input]::placeholder` | `placeholder:text-secondary` |
| `[cmdk-list]` | `max-h-[400px] overflow-auto overscroll-contain` |
| `[cmdk-group-heading]` | `select-none text-secondary pt-6 pb-2 px-6 flex items-center` |
| `[cmdk-item]` | `cursor-pointer text-base flex items-center justify-between gap-3 py-3 px-6 select-none transition-colors` |
| `[cmdk-item][aria-selected="true"]` | `bg-cmdk-selected` |
| `[cmdk-empty]` | `text-base flex items-center justify-center h-16` |

#### Radix Dialog アニメーション

```css
/* styles.css に追加 */
@keyframes dialog-overlay-show {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes dialog-content-show {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
```

### Phase 4: 既存コンポーネントの置き換え

1. `src/components/Command/` を `src/components/CommandMenu/` に置き換え
2. `src/components/Header/index.tsx` のインポート更新
3. テスト更新

### Phase 5: クリーンアップ

1. `npm uninstall cmdk`
2. `styles.css` から `[cmdk-*]` スタイル削除
3. `overview.md` 更新

---

## 実装詳細

### CommandMenu.tsx

```tsx
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { CommandContext } from './context';
import { CommandInput } from './CommandInput';
import { CommandList } from './CommandList';
import type { CommandItemData } from './types';

const ITEMS: CommandItemData[] = [
  // Pages
  { id: 'about', label: 'About', shortcut: 'A', group: 'Pages', type: 'navigate', href: '/' },
  { id: 'projects', label: 'Projects', shortcut: 'P', group: 'Pages', type: 'navigate', href: '/projects' },
  { id: 'uses', label: 'Uses', shortcut: 'U', group: 'Pages', type: 'navigate', href: '/uses' },
  { id: 'snippets', label: 'Snippets', shortcut: 'S', group: 'Pages', type: 'navigate', href: '/snippets' },
  // Social
  { id: 'twitter', label: 'Twitter', group: 'Social', type: 'external', href: 'https://twitter.com/nismit_', icon: <Twitter /> },
  { id: 'github', label: 'GitHub', group: 'Social', type: 'external', href: 'https://github.com/Nismit', icon: <GitHub /> },
  { id: 'linkedin', label: 'LinkedIn', group: 'Social', type: 'external', href: 'https://www.linkedin.com/in/nismit/', icon: <LinkedIn /> },
  { id: 'email', label: 'Email', group: 'Social', type: 'external', href: 'mailto:nismit.dev@gmail.com?subject=Hello%20Mitch', icon: <Email /> },
];

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function CommandMenu({ open, setOpen }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return ITEMS;
    const query = search.toLowerCase();
    return ITEMS.filter(item => item.label.toLowerCase().includes(query));
  }, [search]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setSearch('');
      setActiveId(null);
    }
  }, [open]);

  // Set initial active item
  useEffect(() => {
    if (open && filteredItems.length > 0 && !activeId) {
      setActiveId(filteredItems[0].id);
    }
  }, [open, filteredItems, activeId]);

  const handleSelect = useCallback((item: CommandItemData) => {
    setOpen(false);
    if (item.type === 'navigate') {
      router.push(item.href);
    } else {
      window.open(item.href, '_blank', 'noopener');
    }
  }, [router, setOpen]);

  // Global keyboard shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && e.metaKey) || (e.key === '/' && e.metaKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/70 backdrop-blur-sm data-[state=open]:animate-overlay-show" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[640px] rounded-lg overflow-hidden shadow-[0_0_1px_1px_rgba(255,255,255,0.1)] bg-cmdk-bg data-[state=open]:animate-content-show"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Command Menu</Dialog.Title>
          <CommandContext.Provider
            value={{
              open,
              onOpenChange: setOpen,
              search,
              onSearchChange: setSearch,
              activeId,
              setActiveId,
              filteredItems,
            }}
          >
            <CommandInput />
            <CommandList onSelect={handleSelect} />
          </CommandContext.Provider>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### CommandInput.tsx

```tsx
'use client';

import { useCommand } from './context';

export function CommandInput() {
  const { search, onSearchChange } = useCommand();

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Type a command or search keywords"
      className="w-full border-none text-lg p-4 px-6 outline-none bg-transparent text-primary border-b border-primary-fade/80 font-medium placeholder:text-secondary"
      autoFocus
    />
  );
}
```

### CommandList.tsx

```tsx
'use client';

import { useEffect, useMemo } from 'react';
import { useCommand } from './context';
import { CommandGroup } from './CommandGroup';
import { CommandEmpty } from './CommandEmpty';
import type { CommandItemData } from './types';

type Props = {
  onSelect: (item: CommandItemData) => void;
};

export function CommandList({ onSelect }: Props) {
  const { filteredItems, activeId, setActiveId } = useCommand();

  // Group items by group field
  const groups = useMemo(() => {
    const map = new Map<string, CommandItemData[]>();
    for (const item of filteredItems) {
      const existing = map.get(item.group) || [];
      map.set(item.group, [...existing, item]);
    }
    return Array.from(map.entries());
  }, [filteredItems]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.isComposing) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = filteredItems.findIndex(item => item.id === activeId);
        let nextIndex: number;

        if (e.key === 'ArrowDown') {
          nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % filteredItems.length;
        } else {
          nextIndex = currentIndex <= 0 ? filteredItems.length - 1 : currentIndex - 1;
        }

        setActiveId(filteredItems[nextIndex]?.id ?? null);
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems.find(item => item.id === activeId);
        if (selected) onSelect(selected);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filteredItems, activeId, setActiveId, onSelect]);

  if (filteredItems.length === 0) {
    return <CommandEmpty />;
  }

  return (
    <div className="max-h-[400px] overflow-auto overscroll-contain">
      {groups.map(([heading, items]) => (
        <CommandGroup key={heading} heading={heading} items={items} onSelect={onSelect} />
      ))}
    </div>
  );
}
```

### CommandItem.tsx

```tsx
'use client';

import { useCommand } from './context';
import { ExternalArrow } from '@/components/Icons';
import Shortcut from '@/components/Shortcut';
import Typography from '@/components/Typography';
import type { CommandItemData } from './types';

type Props = {
  item: CommandItemData;
  onSelect: (item: CommandItemData) => void;
};

export function CommandItem({ item, onSelect }: Props) {
  const { activeId, setActiveId } = useCommand();
  const isActive = activeId === item.id;

  return (
    <div
      role="option"
      aria-selected={isActive}
      className={`cursor-pointer text-base flex items-center justify-between gap-3 py-3 px-6 select-none transition-colors ${
        isActive ? 'bg-cmdk-selected' : ''
      }`}
      onClick={() => onSelect(item)}
      onMouseEnter={() => setActiveId(item.id)}
    >
      <div className="flex items-center gap-4">
        {item.icon}
        <Typography variant="body" component="span">
          {item.label}
        </Typography>
      </div>
      {item.shortcut && <Shortcut content={item.shortcut} />}
      {item.type === 'external' && <ExternalArrow isSmall />}
    </div>
  );
}
```

---

## 作業チェックリスト

- [ ] `@radix-ui/react-dialog` インストール
- [ ] `src/components/CommandMenu/types.ts` 作成
- [ ] `src/components/CommandMenu/context.tsx` 作成
- [ ] `src/components/CommandMenu/CommandInput.tsx` 作成
- [ ] `src/components/CommandMenu/CommandEmpty.tsx` 作成
- [ ] `src/components/CommandMenu/CommandItem.tsx` 作成
- [ ] `src/components/CommandMenu/CommandGroup.tsx` 作成
- [ ] `src/components/CommandMenu/CommandList.tsx` 作成
- [ ] `src/components/CommandMenu/CommandMenu.tsx` 作成
- [ ] `src/components/CommandMenu/index.tsx` 作成
- [ ] `src/styles.css` にアニメーション追加
- [ ] `src/components/Header/index.tsx` 更新
- [ ] `src/components/CommandMenu/CommandMenu.test.tsx` 作成
- [ ] `cmdk` アンインストール
- [ ] `src/styles.css` から `[cmdk-*]` スタイル削除
- [ ] `src/components/Command/` 削除
- [ ] `overview.md` 更新

---

## 注意点

1. **アクセシビリティ**: Radix UI Dialog は自動でフォーカストラップ、ESCキー対応、ARIAを提供
2. **検索フィルタリング**: シンプルな部分一致で十分（現在の項目数が少ないため）
3. **アニメーション**: `data-[state=open]` / `data-[state=closed]` で制御
4. **スクロール**: アクティブアイテムへの自動スクロールは `scrollIntoView` で実装可能
