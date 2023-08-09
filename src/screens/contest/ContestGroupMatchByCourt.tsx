import React from "react";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import HeaderTitle from "../../components/HeaderTitle";
import ContestHeader from "../../components/contest/ContestHeader";
import MatchScheduleTableByCourt from "../../components/contest/MatchScheduleTableByCourt";

const ContestListContainer = styled.div``;

export default function ContestGroupMatchByCourt() {
  return (
    <ContestListContainer>
      <PageTitle title="그룹 경기 관리(코트별)" />
      <HeaderTitle title="그룹 경기 관리(코트별)" />
      <ContestHeader />
      <MatchScheduleTableByCourt />
    </ContestListContainer>
  );
}
