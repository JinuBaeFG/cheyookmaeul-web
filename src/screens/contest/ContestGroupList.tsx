import React from "react";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import HeaderTitle from "../../components/HeaderTitle";
import ContestHeader from "../../components/contest/ContestHeader";
import ContestGroupTable from "../../components/contest/ContestGroupTable";

const ContestListContainer = styled.div``;

export default function ContestGroupList() {
  return (
    <ContestListContainer>
      <PageTitle title="그룹관리" />
      <HeaderTitle title="그룹관리" />
      <ContestHeader />
      <ContestGroupTable />
    </ContestListContainer>
  );
}
