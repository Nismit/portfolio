import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
`;

export const CategoryList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;

  position: fixed;
  margin-left: -150px;

  li {
    text-transform: capitalize;
  }
`;
