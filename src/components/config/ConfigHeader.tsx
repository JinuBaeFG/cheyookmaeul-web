import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ConfigHeaderContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ConfigHeanderColumn = styled.div`
  margin-right: 12px;
`;

const ConfigHeaderText = styled.span`
  font-size: 16px;
`;

const active = { color: "black", fontWeight: 600 };
const deactive = { color: "gray" };

const ConfigHeader = () => {
  return (
    <ConfigHeaderContainer>
      <ConfigHeanderColumn>
        <NavLink
          to={"/home"}
          style={({ isActive }) => (isActive ? active : deactive)}
        >
          <ConfigHeaderText>약관 관리</ConfigHeaderText>
        </NavLink>
      </ConfigHeanderColumn>
    </ConfigHeaderContainer>
  );
};

export default ConfigHeader;
