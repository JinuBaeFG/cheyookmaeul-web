import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const BannerHeanderContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const BannerHeanderColumn = styled.div`
  margin-right: 12px;
`;

const BannerHeaderText = styled.span`
  font-size: 16px;
`;

const active = { color: "black", fontWeight: 600 };
const deactive = { color: "gray" };

const BannerHeader = () => {
  return (
    <BannerHeanderContainer>
      <BannerHeanderColumn>
        <NavLink
          to={"/banner/bannerList"}
          style={({ isActive }) => (isActive ? active : deactive)}
        >
          <BannerHeaderText>배너 목록</BannerHeaderText>
        </NavLink>
      </BannerHeanderColumn>
      <BannerHeanderColumn>
        <NavLink
          to={"/banner/addBanner"}
          style={({ isActive }) => (isActive ? active : deactive)}
        >
          <BannerHeaderText>배너 등록</BannerHeaderText>
        </NavLink>
      </BannerHeanderColumn>
    </BannerHeanderContainer>
  );
};

export default BannerHeader;
