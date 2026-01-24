import styled from '@emotion/styled';
import { Arrow } from '.';

export const ExternalArrow = styled(Arrow)<{ $isSmall?: boolean }>`
  transform: rotate(-45deg);
  ${({ $isSmall }) => $isSmall && `width: 12px; height: 12px;`};
`;
