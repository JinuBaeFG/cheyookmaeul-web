import React from "react";
import styled from "styled-components";
import ContestHeader from "../../components/contest/ContestHeader";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";
import ContestNoticeTable from "../../components/contest/ContestNoticeTable";

const ContestListContainer = styled.div``;

export default function ContestNotice() {
  return (
    <ContestListContainer>
      <PageTitle title="대회 공지사항 관리" />
      <HeaderTitle title="대회 공지사항 관리" />
      <ContestHeader />
      <ContestNoticeTable />
    </ContestListContainer>
  );
}
