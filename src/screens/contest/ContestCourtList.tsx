import React from "react";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import HeaderTitle from "../../components/HeaderTitle";
import ContestHeader from "../../components/contest/ContestHeader";
import ContestCourtTable from "../../components/contest/ContestCourtTable";

const ContestListContainer = styled.div``;

export default function ContestCourtList() {
  return (
    <ContestListContainer>
      <PageTitle title="그룹관리" />
      <HeaderTitle title="그룹관리" />
      <ContestHeader />
      <ContestCourtTable />
    </ContestListContainer>
  );
}
