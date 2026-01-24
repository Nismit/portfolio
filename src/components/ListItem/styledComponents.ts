import styled from '@emotion/styled';

export const LinkItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0;
  text-decoration: none;

  span,
  svg {
    transition: opacity 300ms cubic-bezier(0.1, 1.06, 0.87, 0.71);
  }

  &:hover {
    span,
    svg {
      opacity: 0.7;
    }
  }

  & + & {
    border-top: 1px solid rgba(var(--primary-fade), 1);
  }
`;

export const LinkTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
