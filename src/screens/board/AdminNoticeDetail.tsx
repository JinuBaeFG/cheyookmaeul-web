import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BoardHeader from "../../components/board/BoardHeader";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";

const DELETE_ADMIN_NOTICE = gql`
  mutation deleteAdminNotice($id: String) {
    deleteAdminNotice(id: $id) {
      ok
    }
  }
`;

const SEE_ADMIN_NOTICE_QUERY = gql`
  query seeAdminNotice($id: String) {
    seeAdminNotice(id: $id) {
      id
      title
      discription
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

const AdminNoticeDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data } = useQuery(SEE_ADMIN_NOTICE_QUERY, {
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
      navigate("/board/adminnotice");
    }
  };

  const [deleteAdminNoticeMutation] = useMutation(DELETE_ADMIN_NOTICE, {
    onCompleted,
  });

  const onDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteAdminNoticeMutation({
        variables: {
          id: location.state.id,
        },
      });
    }
  };

  let getDate = new Date(parseInt(data?.seeAdminNotice.createdAt));
  let date = getDate.getDate();
  let month = getDate.getMonth() + 1;
  let year = getDate.getFullYear();

  return (
    <BannerDetailContainer>
      <PageTitle title="관리자 공지사항" />
      <HeaderTitle title="관리자 공지사항" />
      <BoardHeader />
      <BannerContent>
        <BannerBtnWrap>
          <BannerInputBtn onClick={() => navigate("/adminnotice")}>
            목록
          </BannerInputBtn>
          <BannerInputBtn
            onClick={() =>
              navigate("/adminnotice/editAdminNotice", {
                state: { id: location.state.id },
              })
            }
          >
            수정
          </BannerInputBtn>
          <BannerInputBtn onClick={() => onDelete()}>삭제</BannerInputBtn>
        </BannerBtnWrap>
        <BannerTitle>
          <ColumnTitle>제목</ColumnTitle>
          <ColumnDisc>{data?.seeAdminNotice.title}</ColumnDisc>
        </BannerTitle>
        <BannerDate>
          <ColumnTitle>작성일자</ColumnTitle>
          <ColumnDisc>{year + "." + month + "." + date}</ColumnDisc>
        </BannerDate>
        <BannerDiscription>
          <ColumnTitle>상세내용</ColumnTitle>
          <ColumnDisc
            dangerouslySetInnerHTML={{
              __html: data?.seeAdminNotice.discription,
            }}
          ></ColumnDisc>
        </BannerDiscription>
      </BannerContent>
    </BannerDetailContainer>
  );
};

export default AdminNoticeDetail;
