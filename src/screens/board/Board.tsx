import React from "react";
import styled from "styled-components";
import BoardHeader from "../../components/board/BoardHeader";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";

const Container = styled.div``;

const Board = () => {
  return (
    <Container>
      <PageTitle title="게시판관리" />
      <HeaderTitle title="게시판관리" />
      <BoardHeader />
    </Container>
  );
};

export default Board;
