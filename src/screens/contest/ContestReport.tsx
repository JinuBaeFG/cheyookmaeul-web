import React from "react";
import styled from "styled-components";
import ContestHeader from "../../components/contest/ContestHeader";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";
import ContestReportTable from "../../components/contest/ContestReportTable";

const ContestListContainer = styled.div``;

export default function ContestReport() {
  return (
    <ContestListContainer>
      <PageTitle title="대회 문의 관리" />
      <HeaderTitle title="대회 문의 관리" />
      <ContestHeader />
      <ContestReportTable />
    </ContestListContainer>
  );
}
