---
date: "2023-02-18T18:52:47-08:00"
title: Async array.reduce() with Typescript
category: "javascript"
---

TypeScript Playground: [Link](https://www.typescriptlang.org/play?ts=4.9.5#code/C4TwDgpgBAaghgGwK4QCrmgXigbwFBRQDaA1hCAFxQDOwATgJYB2A5gLpVNIC2ARhHSgAfGvWYsA3HgC+UvAGMA9k1pQ4dOlQCCGuCAA88ZGgwA+KNiIFcUBgBMqARgA0UJnG4QqAImURvUNLO1ji2DlAATK7unj7AAO6KAUEhYVQAzNEeXlDewAAWdBD+gXhsckoqwGrUIEzyAGJI9RZQABQAbogoVEYo6JAAlBbm+IRFwEh0TFAACnSK3AzUEAB0RdSKCB0Qnd0Qg1KyeHhwtS0AZs3ywAzKUMAQtG3DY1CVqhtICNXYcPFwBjVdR0dYQOxIeQQfTzRbLaEAJQgSjodn0tEYrFcfRMkFM+La1kIZzq8nacHk8lc8imw0woyJhHeyk+Ty2O3mEA6dyQ1BxrX+gOBlKkTKZH2qXWMAoBQJqpKa9TaNLoh0Z4wgk2muHVTNW+o27IgnO5il5OOCYrFRClKFW9g4UFtEF1xzFKTFsKWKzBm22uxw0kG1jV1g+WzWCEULDaAHIkdRvsAKLHXF8fmrpCdHs81UA)

```ts
type ValueType = {
  [key: string]: number | string;
};

const arr: Array<ValueType> = [
  { id: 1, name: "one" },
  { id: 2, name: "two" },
  { id: 3, name: "three" },
];

const asyncFunc = (value: ValueType) => {
  return Promise.resolve(value);
};

async function test() {
  const result = await arr.reduce<Promise<Record<string, ValueType>>>(
    async (acc, cur) => {
      const resolvePreviousValue = await acc;
      const value = await asyncFunc(cur);
      return {
        ...resolvePreviousValue,
        [value.id]: value,
      };
    },
    Promise.resolve({})
  );

  console.log("Result:", result);
}

test();
```
