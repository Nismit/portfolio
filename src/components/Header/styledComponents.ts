import styled from "@emotion/styled";

export const _Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 64px auto;
  max-width: 1024px;

  a.home {
    & > svg {
      color: rgba(var(--primary), 1);
    }

    &:hover > svg {
      color: rgba(var(--primary), 0.5);
    }
  }
`;

export const Commands = styled.div`
  display: inline-flex;
  gap: 0.3rem;
`;

export const TextButton = styled.button`
  all: unset;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 0.3rem;
  transition: color 300ms cubic-bezier(0.1, 1.06, 0.87, 0.71);

  &:hover {
    color: rgba(var(--primary), 0.7);
    text-decoration: none;
  }
`;
