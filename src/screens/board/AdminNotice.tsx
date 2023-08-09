import React, { useState } from "react";
import styled from "styled-components";
import BoardHeader from "../../components/board/BoardHeader";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";
import { AiOutlineBorder, AiOutlineCheckSquare } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import AdminNoticeTable from "../../components/board/AdminNoticeTable";

const Container = styled.div`
  width: calc(100% - 300);
  height: 100%;
`;

const AdminNotice = () => {
  const [allSelect, setAllSelect] = useState(false);
  return (
    <Container>
      <PageTitle title="관리자 공지사항" />
      <HeaderTitle title="관리자 공지사항" />
      <BoardHeader />
      <AdminNoticeTable />
    </Container>
  );
};

export default AdminNotice;
