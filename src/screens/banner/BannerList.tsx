import React from "react";
import styled from "styled-components";
import BannerHeader from "../../components/banner/BannerHeader";
import BannerTable from "../../components/banner/BannerTable";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";

const BannerListContainer = styled.div``;

const BannerList = () => {
  return (
    <BannerListContainer>
      <PageTitle title="배너관리" />
      <HeaderTitle title="배너관리" />
      <BannerHeader />
      <BannerTable />
    </BannerListContainer>
  );
};

export default BannerList;
