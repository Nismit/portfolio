import type { FC } from "react";
import type {
  Margins,
  AlignType,
  TypographyComponent,
  Variant,
} from "./styledComponents";
import { TypographyRoot } from "./styledComponents";

type Props = {
  component?: TypographyComponent;
  variant?: Variant;
  align?: AlignType;
  margin?: Margins;
  color?: string;
  className?: string;
  children: React.ReactNode;
};

const Typography: FC<Props> = ({
  component = "span",
  variant = "body",
  align,
  margin,
  color,
  className,
  children,
}) => {
  return (
    <TypographyRoot
      as={component}
      $variant={variant}
      $align={align}
      $margin={margin}
      $color={color}
      className={className}
    >
      {children}
    </TypographyRoot>
  );
};

export default Typography;
