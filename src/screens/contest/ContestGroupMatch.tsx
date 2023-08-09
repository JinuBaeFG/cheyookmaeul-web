import React from "react";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import HeaderTitle from "../../components/HeaderTitle";
import ContestHeader from "../../components/contest/ContestHeader";
import ContestGroupMatchTable from "../../components/contest/ContestGroupMatchTable";

const ContestListContainer = styled.div``;

export default function ContestGroupMatch() {
  return (
    <ContestListContainer>
      <PageTitle title="그룹 조편성 관리" />
      <HeaderTitle title="그룹 조편성 관리" />
      <ContestHeader />
      <ContestGroupMatchTable />
    </ContestListContainer>
  );
}
