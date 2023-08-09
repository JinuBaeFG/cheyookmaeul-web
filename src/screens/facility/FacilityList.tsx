import React from "react";
import styled from "styled-components";
import FacilityHeader from "../../components/facility/FacilityHeader";
import FacilityTable from "../../components/facility/FacilityTable";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";

const FacilityListContainer = styled.div``;

const FacilityList = () => {
  return (
    <FacilityListContainer>
      <PageTitle title="시설관리" />
      <HeaderTitle title="시설관리" />
      <FacilityHeader />
      <FacilityTable />
    </FacilityListContainer>
  );
};

export default FacilityList;
