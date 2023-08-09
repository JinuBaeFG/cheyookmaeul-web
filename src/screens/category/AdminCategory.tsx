import React from "react";
import styled from "styled-components";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";
import CategoryHeader from "../../components/category/CategoryHeader";
import Category from "./Category";

const Container = styled.div`
  width: calc(100% - 300);
  height: 100%;
`;

const AdminCategory = () => {
  return (
    <Container>
      <PageTitle title="카테고리 관리" />
      <HeaderTitle title="카테고리 관리" />
      <CategoryHeader />
      <Category />
    </Container>
  );
};

export default AdminCategory;
