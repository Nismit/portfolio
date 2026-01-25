import { describe, expect, it } from 'vitest';
import { markdownToHtml } from './transpiler';

describe('markdownToHtml', () => {
  it('should convert markdown to HTML', async () => {
    const markdown = '# Hello World';
    const result = await markdownToHtml(markdown);
    expect(result).toContain('<h1>Hello World</h1>');
  });

  it('should convert paragraph text', async () => {
    const markdown = 'This is a paragraph.';
    const result = await markdownToHtml(markdown);
    expect(result).toContain('<p>This is a paragraph.</p>');
  });

  it('should highlight JavaScript code blocks', async () => {
    const markdown = '```javascript\nconst x = 1;\n```';
    const result = await markdownToHtml(markdown);
    expect(result).toContain('language-javascript');
    expect(result).toContain('<span class="token');
  });

  it('should highlight TypeScript code blocks', async () => {
    const markdown = '```typescript\nconst x: number = 1;\n```';
    const result = await markdownToHtml(markdown);
    expect(result).toContain('language-typescript');
  });

  it('should handle unknown language gracefully', async () => {
    const markdown = '```unknownlang\nsome code\n```';
    const result = await markdownToHtml(markdown);
    expect(result).toContain('<code');
  });
});
