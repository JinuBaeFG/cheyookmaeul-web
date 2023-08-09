import React from "react";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import HeaderTitle from "../../components/HeaderTitle";
import ContestHeader from "../../components/contest/ContestHeader";
import GroupMatchManagement from "../../components/contest/GroupMatchManagement";

const ContestListContainer = styled.div``;

export default function ContestMatchManagement() {
  return (
    <ContestListContainer>
      <PageTitle title="그룹 경기 관리" />
      <HeaderTitle title="그룹 경기 관리" />
      <ContestHeader />
      <GroupMatchManagement />
    </ContestListContainer>
  );
}
