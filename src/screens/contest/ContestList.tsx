import React from "react";
import styled from "styled-components";
import ContestHeader from "../../components/contest/ContestHeader";
import ContestTable from "../../components/contest/ContestTable";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";

const ContestListContainer = styled.div``;

const ContestList = () => {
  return (
    <ContestListContainer>
      <PageTitle title="대회관리" />
      <HeaderTitle title="대회관리" />
      <ContestHeader />
      <ContestTable />
    </ContestListContainer>
  );
};

export default ContestList;
