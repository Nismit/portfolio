import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import { refractor } from "refractor/lib/core";
import javascript from "refractor/lang/javascript";
import typescript from "refractor/lang/typescript";
import css from "refractor/lang/css";
import html from "refractor/lang/markup";

/**
 * Param is markdown content
 * Markdown
 * -> remark-parse -> mdast (Markdown AST)
 * -> remark-rehype -> hast (HTML AST)
 * -> rehypePrism -> parse code block
 * -> rehype-stringify -> HTML
 * @param content
 * @returns {string}
 */
export const markdownToHtml = async (content: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(content);
  return result.toString();
};

const getLanguage = (node: any) => {
  const className = node.properties.className || [];

  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === "language-") {
      return classListItem.slice(9).toLowerCase();
    }
  }

  return null;
};

const rehypePrism = (): any => {
  refractor.register(javascript);
  refractor.register(typescript);
  refractor.register(css);
  refractor.register(html);

  const transformer = (tree: any) => {
    visit(
      tree,
      (node: any, _: number | null | undefined, parent: any): undefined => {
        if (!parent || parent.tagName !== "pre" || node.tagName !== "code") {
          return;
        }

        const lang = getLanguage(node);

        if (lang === null) {
          return;
        }

        let result;
        try {
          parent.properties.className = (
            parent.properties.className || []
          ).concat("language-" + lang);

          result = refractor.highlight(toString(node), lang);
        } catch (err) {
          if (err instanceof Error && /Unknown language/.test(err.message)) {
            console.warn(err.message);
            return;
          }

          throw err;
        }

        node.children = result.children;
      }
    );
  };

  return transformer;
};
