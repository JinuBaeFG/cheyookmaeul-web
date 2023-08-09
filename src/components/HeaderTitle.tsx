import React from "react";
import styled from "styled-components";

const HeaderTitleContainer = styled.div`
  padding: 16px;
  background-color: ${(props) => props.theme.menuColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderTitleText = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.whiteColor};
`;

const HeaderTitle = ({ title }: any) => {
  return (
    <HeaderTitleContainer>
      <HeaderTitleText>{title}</HeaderTitleText>
    </HeaderTitleContainer>
  );
};

export default HeaderTitle;
