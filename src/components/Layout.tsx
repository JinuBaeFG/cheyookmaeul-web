import styled from "styled-components";
import Header from "./Header";

interface ILayout {
  children: React.ReactNode;
}

const Content = styled.main`
  margin: 0 auto;
  margin-left: 300px;
  width: calc(100% - 300px);
  height: 100%;
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
