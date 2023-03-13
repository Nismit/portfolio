import type { FC } from "react";
import Head from "../Head";
import Header from "../Header";
import { Container } from "./styledComponents";

type Props = {
  children: React.ReactElement;
};

const Layout: FC<Props> = ({ children }) => (
  <>
    <Head />
    <Header />
    <Container>{children}</Container>
  </>
);

export default Layout;
