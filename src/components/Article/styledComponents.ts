import styled from '@emotion/styled';

export const _Article = styled.article`
  margin-bottom: 3rem;

  p,
  ul {
    color: rgb(var(--primary-fade));
  }
`;

export const CategoryLink = styled.span`
  display: inline-block;
  padding: 0.15rem 1.2rem;
  background-color: rgba(var(--tertiary), 0.8);
  border-radius: 1.4rem;
  margin-top: 1rem;

  &:before {
    content: "#";
  }
`;
