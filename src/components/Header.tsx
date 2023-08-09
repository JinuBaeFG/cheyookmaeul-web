import { NavLink } from "react-router-dom";
import styled from "styled-components";
import routes from "../routes";

const SHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background-color: ${(props) => props.theme.menuColor};
  padding: 18px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 100%;
`;

const activeStyle = {
  width: "100%",
  padding: 16,
  backgroundColor: "#FFFFFF",
  color: "#01AA73",
};

const deactiveStyle = {
  width: "100%",
  padding: 16,
  backgroundColor: "#01AA73",
  color: "#FFFFFF",
};

const Header = () => {
  return (
    <SHeader>
      <Wrapper>
        <NavLink
          to={routes.home}
          style={({ isActive }: any) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          홈
        </NavLink>
        <NavLink
          to={routes.contest}
          style={({ isActive }: any) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          대회관리
        </NavLink>
        <NavLink
          to={routes.banner}
          style={({ isActive }: any) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          배너관리
        </NavLink>
        <NavLink
          to={routes.category}
          style={({ isActive }: any) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          카테고리 관리
        </NavLink>
        <NavLink
          to={routes.feed}
          style={({ isActive }: any) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          피드 관리
        </NavLink>
        <NavLink
          to={routes.memeber}
          style={({ isActive }: any) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          회원 관리
        </NavLink>
        <NavLink
          to={routes.board}
          style={({ isActive }: any) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          게시판 관리
        </NavLink>
        <NavLink
          to={routes.facility}
          style={({ isActive }: any) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          시설 관리
        </NavLink>
      </Wrapper>
    </SHeader>
  );
};
export default Header;
