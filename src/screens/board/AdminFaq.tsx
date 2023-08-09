import React, { useState } from "react";
import styled from "styled-components";
import BoardHeader from "../../components/board/BoardHeader";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";
import AdminFaqTable from "../../components/board/AdminFaqTable";

const Container = styled.div`
  width: calc(100% - 300);
  height: 100%;
`;

const AdminFaq = () => {
  const [allSelect, setAllSelect] = useState(false);
  return (
    <Container>
      <PageTitle title="관리자 공지사항" />
      <HeaderTitle title="관리자 공지사항" />
      <BoardHeader />
      <AdminFaqTable />
    </Container>
  );
};

export default AdminFaq;
