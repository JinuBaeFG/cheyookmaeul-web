import styled from "styled-components";
import Header from "./Header";

interface ILayout {
  children: React.ReactNode;
}

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
