import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BannerHeader from "../../components/banner/BannerHeader";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";

const DELETE_BANNER = gql`
  mutation deleteBanner($id: String) {
    deleteBanner(id: $id) {
      ok
    }
  }
`;

const SEE_BANNER_QUERY = gql`
  query seeBanner($id: String) {
    seeBanner(id: $id) {
      id
      title
      discription
      sortation
      bannerImagePath
      createdAt
    }
  }
`;

const BannerDetailContainer = styled.div``;

const BannerContent = styled.div`
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const BannerBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 8px;
`;

const BannerInputBtn = styled.span`
  margin: 0 4px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
`;

const BannerSortation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const BannerTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const BannerDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const BannerTitleImage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const BannerDiscription = styled.div`
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

const BannerDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data } = useQuery(SEE_BANNER_QUERY, {
    variables: {
      id: location.state.id,
    },
    fetchPolicy: "cache-and-network",
  });

  const onCompleted = (data: any) => {
    const {
      deleteBanner: { ok },
    } = data;

    if (ok) {
      navigate("/banner/bannerList");
    }
  };

  const [deleteBannerMutation] = useMutation(DELETE_BANNER, {
    onCompleted,
  });

  const onDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteBannerMutation({
        variables: {
          id: location.state.id,
        },
      });
    }
  };

  let getDate = new Date(parseInt(data?.seeBanner.createdAt));
  let date = getDate.getDate();
  let month = getDate.getMonth() + 1;
  let year = getDate.getFullYear();

  return (
    <BannerDetailContainer>
      <PageTitle title="배너상세" />
      <HeaderTitle title="배너상세" />
      <BannerHeader />
      <BannerContent>
        <BannerBtnWrap>
          <BannerInputBtn onClick={() => navigate("/banner/bannerList")}>
            목록
          </BannerInputBtn>
          <BannerInputBtn
            onClick={() =>
              navigate("/banner/editBanner", {
                state: { id: location.state.id },
              })
            }
          >
            수정
          </BannerInputBtn>
          <BannerInputBtn onClick={() => onDelete()}>삭제</BannerInputBtn>
        </BannerBtnWrap>
        <BannerSortation>
          <ColumnTitle>노출영역</ColumnTitle>
          <ColumnDisc>
            {data?.seeBanner.sortation === "main" ? "메인" : "동네소식"}
          </ColumnDisc>
        </BannerSortation>
        <BannerTitle>
          <ColumnTitle>제목</ColumnTitle>
          <ColumnDisc>{data?.seeBanner.title}</ColumnDisc>
        </BannerTitle>
        <BannerDate>
          <ColumnTitle>작성일자</ColumnTitle>
          <ColumnDisc>{year + "." + month + "." + date}</ColumnDisc>
        </BannerDate>
        <BannerTitleImage>
          <ColumnTitle>메인 노출 이미지</ColumnTitle>
          <ColumnDisc>
            <ColumnImage src={data?.seeBanner.bannerImagePath} />
          </ColumnDisc>
        </BannerTitleImage>
        <BannerDiscription>
          <ColumnTitle>상세내용</ColumnTitle>
          <ColumnDisc
            dangerouslySetInnerHTML={{ __html: data?.seeBanner.discription }}
          ></ColumnDisc>
        </BannerDiscription>
      </BannerContent>
    </BannerDetailContainer>
  );
};

export default BannerDetail;
