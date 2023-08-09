import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const FacilityHeanderContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const FacilityHeanderColumn = styled.div`
  margin-right: 12px;
`;

const FacilityHeaderText = styled.span`
  font-size: 16px;
`;

const active = { color: "black", fontWeight: 600 };
const deactive = { color: "gray" };

const FacilityHeader = () => {
  return (
    <FacilityHeanderContainer>
      <FacilityHeanderColumn>
        <NavLink
          to={"/facility/facilityList"}
          style={({ isActive }) => (isActive ? active : deactive)}
        >
          <FacilityHeaderText>시설 목록</FacilityHeaderText>
        </NavLink>
      </FacilityHeanderColumn>
      <FacilityHeanderColumn>
        <NavLink
          to={"/facility/addFacility"}
          style={({ isActive }) => (isActive ? active : deactive)}
        >
          <FacilityHeaderText>시설 등록</FacilityHeaderText>
        </NavLink>
      </FacilityHeanderColumn>
    </FacilityHeanderContainer>
  );
};

export default FacilityHeader;
