import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(var(--primary-fade), 0.8);
`;

export const Link = styled.a`
  color: rgba(var(--primary), 1);

  &:hover {
    color: rgba(var(--primary), 0.7);
  }
`;
