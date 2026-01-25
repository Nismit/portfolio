import styled from '@emotion/styled';
import { body, description, headline, subHeadline, title } from './variant';

type Margin = number | string;
export type Margins = [Margin, Margin?, Margin?, Margin?];
export type AlignType = 'center' | 'inherit' | 'justify' | 'left' | 'right';

const TypographyComponentMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  blockquote: 'blockquote',
  em: 'em',
  strong: 'strong',
  b: 'b',
} as const;

export type TypographyComponent = keyof typeof TypographyComponentMapping;

const VariantMapping = {
  headline: headline,
  subHeadline: subHeadline,
  body: body,
  title: title,
  description: description,
} as const;

export type Variant = keyof typeof VariantMapping;

const getMargins = (margins: number | Margins) => {
  if (typeof margins === 'number') {
    return `margin: ${margins}px`;
  }

  const result = margins.reduce<string[]>((acc, cur) => {
    if (typeof cur === 'string') {
      return [...acc, cur];
    }

    return [...acc, `${cur}px`];
  }, []);

  return `margin: ${result.join(' ')}`;
};

export const TypographyRoot = styled.span<{
  $align?: AlignType;
  $color?: string;
  $margin?: number | Margins;
  $variant?: Variant;
}>`
  ${({ $align }) => $align && `text-align: ${$align};`};
  ${({ $color }) => $color && `color: ${$color};`};
  ${({ $margin }) => {
    if (!$margin) return;
    return getMargins($margin);
  }};

  ${({ $variant }) => $variant !== undefined && VariantMapping[$variant as Variant]}
`;
