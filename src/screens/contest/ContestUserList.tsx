import React from "react";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import HeaderTitle from "../../components/HeaderTitle";
import ContestHeader from "../../components/contest/ContestHeader";
import ContestUserTable from "../../components/contest/ContestUserTable";

const ContestListContainer = styled.div``;

export default function ContestUserList() {
  return (
    <ContestListContainer>
      <PageTitle title="참가자관리" />
      <HeaderTitle title="참가자관리" />
      <ContestHeader />
      <ContestUserTable />
    </ContestListContainer>
  );
}
