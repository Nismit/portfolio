---
name: create-component
description: Create a new React component following project conventions
---

# Create Component: $ARGUMENTS

## Structure

```
src/components/[ComponentName]/
├── index.tsx        # Main component
├── styles.ts        # Tailwind styles (optional)
└── [ComponentName].test.tsx  # Tests
```

## Template

```tsx
// src/components/[ComponentName]/index.tsx
type Props = {
  // Define props here
};

export const ComponentName = ({ ...props }: Props) => {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
};
```

## Checklist

1. Create component file with proper TypeScript types
2. Use Tailwind CSS for styling
3. Add test file with basic render test
4. Export from component index
