import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FacilityHeader from "../../components/facility/FacilityHeader";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";

const DELETE_FACILITY = gql`
  mutation deleteFacility($id: String) {
    deleteFacility(id: $id) {
      ok
    }
  }
`;

const SEE_FACILITY_QUERY = gql`
  query seeFacility($id: String) {
    seeFacility(id: $id) {
      id
      name
      discription
      sidoName
      gusiName
      dongEubMyunName
      riName
      roadName
      buildingNumber
      zipcode
      activeArea
      address
      addrRoad
      areaLatitude
      areaLongitude
      detailAddress
      operTime
      facilitySports {
        id
        name
      }
      facilityImage {
        id
        imagePath
      }
      facilityInfo {
        id
        awardDate
        discription
      }
      facilityTag {
        name
      }
    }
  }
`;

const FacilityDetailContainer = styled.div``;

const FacilityContent = styled.div`
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const FacilityBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 8px;
`;

const FacilityInputBtn = styled.span`
  margin: 0 4px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
`;

const FacilitySortation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const FacilityTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const FacilityDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const FacilityTitleImage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const FacilityDiscription = styled.div`
  align-items: center;
  margin-bottom: 8px;
`;

const ColumnTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  width: 150px;
  text-align: center;
  padding: 8px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
`;

const ColumnDisc = styled.div`
  font-size: 16px;
  padding: 8px;
`;

const ColumnImage = styled.img``;

const FacilityDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state.id);
  const { data } = useQuery(SEE_FACILITY_QUERY, {
    variables: {
      id: parseInt(location.state.id),
    },
    fetchPolicy: "cache-and-network",
  });

  console.log(data);

  const onCompleted = (data: any) => {
    const {
      deleteFacility: { ok },
    } = data;

    if (ok) {
      navigate("/Facility/FacilityList");
    }
  };

  const [deleteFacilityMutation] = useMutation(DELETE_FACILITY, {
    onCompleted,
  });

  const onDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteFacilityMutation({
        variables: {
          id: location.state.id,
        },
      });
    }
  };

  let getDate = new Date(parseInt(data?.seeFacility.createdAt));
  let date = getDate.getDate();
  let month = getDate.getMonth() + 1;
  let year = getDate.getFullYear();

  return (
    <FacilityDetailContainer>
      <PageTitle title="배너상세" />
      <HeaderTitle title="배너상세" />
      <FacilityHeader />
      <FacilityContent>
        <FacilityBtnWrap>
          <FacilityInputBtn onClick={() => navigate("/Facility/FacilityList")}>
            목록
          </FacilityInputBtn>
          <FacilityInputBtn
            onClick={() =>
              navigate("/Facility/editFacility", {
                state: { id: location.state.id },
              })
            }
          >
            수정
          </FacilityInputBtn>
          <FacilityInputBtn onClick={() => onDelete()}>삭제</FacilityInputBtn>
        </FacilityBtnWrap>
        <FacilitySortation>
          <ColumnTitle>시설명</ColumnTitle>
          <ColumnDisc>{data?.seeFacility?.name}</ColumnDisc>
        </FacilitySortation>
        <FacilityTitle>
          <ColumnTitle>제목</ColumnTitle>
          <ColumnDisc>{data?.seeFacility.title}</ColumnDisc>
        </FacilityTitle>
        <FacilityDate>
          <ColumnTitle>작성일자</ColumnTitle>
          <ColumnDisc>{year + "." + month + "." + date}</ColumnDisc>
        </FacilityDate>
        <FacilityTitleImage>
          <ColumnTitle>메인 노출 이미지</ColumnTitle>
          <ColumnDisc>
            <ColumnImage src={data?.seeFacility.FacilityImagePath} />
          </ColumnDisc>
        </FacilityTitleImage>
        <FacilityDiscription>
          <ColumnTitle>상세내용</ColumnTitle>
          <ColumnDisc>{data?.seeFacility.discription}</ColumnDisc>
        </FacilityDiscription>
      </FacilityContent>
    </FacilityDetailContainer>
  );
};

export default FacilityDetail;
