import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ContestHeanderContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ContestHeanderColumn = styled.div`
  margin-right: 12px;
`;

const ContestHeaderText = styled.span`
  font-size: 16px;
`;

const active = { color: "black", fontWeight: 600 };
const deactive = { color: "gray" };

const ContestHeader = () => {
  return (
    <ContestHeanderContainer>
      <ContestHeanderColumn>
        <NavLink
          to={"/contest"}
          style={({ isActive }) => (isActive ? active : deactive)}
        >
          <ContestHeaderText>대회 관리</ContestHeaderText>
        </NavLink>
      </ContestHeanderColumn>
    </ContestHeanderContainer>
  );
};

export default ContestHeader;
