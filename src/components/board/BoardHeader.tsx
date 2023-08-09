import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const BoardHeaderContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const BoardHeanderColumn = styled.div`
  margin-right: 12px;
`;

const BoardHeaderText = styled.span`
  font-size: 16px;
`;

const active = { color: "black", fontWeight: 600 };
const deactive = { color: "gray" };

const BoardHeader = () => {
  return (
    <BoardHeaderContainer>
      <BoardHeanderColumn>
        <NavLink
          to={"/board/main"}
          style={({ isActive }) => (isActive ? active : deactive)}
        >
          <BoardHeaderText>게시판 관리</BoardHeaderText>
        </NavLink>
      </BoardHeanderColumn>
      <BoardHeanderColumn>
        <NavLink
          to={"/adminnotice"}
          style={({ isActive }) => (isActive ? active : deactive)}
        >
          <BoardHeaderText>관리자 공지사항</BoardHeaderText>
        </NavLink>
      </BoardHeanderColumn>
      <BoardHeanderColumn>
        <NavLink
          to={"/adminfaq"}
          style={({ isActive }) => (isActive ? active : deactive)}
        >
          <BoardHeaderText>관리자 FAQ</BoardHeaderText>
        </NavLink>
      </BoardHeanderColumn>
    </BoardHeaderContainer>
  );
};

export default BoardHeader;
