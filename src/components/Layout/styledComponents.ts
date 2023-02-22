import styled from "@emotion/styled";

export const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr min(70ch, calc(100% - 2rem)) 1fr;
  grid-column-gap: 1rem;
  padding-bottom: 3rem;

  > * {
    grid-column: 2;
  }

  .full-bleed {
    width: 100%;
    grid-column: 1 / -1;
  }
`;
