import type { FC } from 'react';

type Margin = number | string;
type Margins = [Margin, Margin?, Margin?, Margin?];
type AlignType = 'center' | 'inherit' | 'justify' | 'left' | 'right';
type TypographyComponent =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'blockquote'
  | 'em'
  | 'strong'
  | 'b';
type Variant = 'headline' | 'subHeadline' | 'body' | 'title' | 'description';

type Props = {
  component?: TypographyComponent;
  variant?: Variant;
  align?: AlignType;
  margin?: Margins;
  color?: string;
  className?: string;
  children: React.ReactNode;
};

const variantClasses: Record<Variant, string> = {
  headline: 'text-4xl leading-[43.2px] tracking-[1.2px] font-bold',
  subHeadline: 'text-lg font-normal leading-8 tracking-[0.9px]',
  body: 'text-base font-normal leading-[25.8px] tracking-[0.9px]',
  title: 'text-lg font-medium',
  description: 'text-base font-normal leading-[25.8px]',
};

const getMarginStyle = (margins: Margins): string => {
  const result = margins.map((m) => (typeof m === 'string' ? m : `${m}px`));
  return result.join(' ');
};

const Typography: FC<Props> = ({
  component: Component = 'span',
  variant = 'body',
  align,
  margin,
  color,
  className = '',
  children,
}) => {
  const style: React.CSSProperties = {};
  if (align) style.textAlign = align;
  if (margin) style.margin = getMarginStyle(margin);
  if (color) style.color = color;

  return (
    <Component
      className={`${variantClasses[variant]} ${className}`.trim()}
      style={Object.keys(style).length > 0 ? style : undefined}
    >
      {children}
    </Component>
  );
};

export default Typography;
