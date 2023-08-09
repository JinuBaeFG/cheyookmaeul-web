import { gql, useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const SEE_CONTEST_NOTICE_LIST = gql`
  query seeContestNotices($contestId: String) {
    seeContestNotices(contestId: $contestId) {
      id
      noticeTitle
      noticeDiscription
      createdAt
    }
  }
`;

const Container = styled.div``;

const BannerBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
`;

const BannerInputBtn = styled.span`
  margin: 0 4px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
`;

const HeaderHistoryBack = styled.div`
  cursor: pointer;
  margin-right: 16px;
`;

export default function ContestNoticeTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data: noticeData } = useQuery(SEE_CONTEST_NOTICE_LIST, {
    variables: {
      contestId: location.state.contestId,
    },
  });

  return (
    <Container>
      <BannerBtnWrap>
        <HeaderHistoryBack onClick={() => navigate("/contest/contestList")}>
          <IoIosArrowBack size={24} />
        </HeaderHistoryBack>
        <BannerInputBtn
          onClick={() =>
            navigate("/contest/createContestNotice", {
              state: { contestId: location.state.contestId },
            })
          }
        >
          등록
        </BannerInputBtn>
      </BannerBtnWrap>
      <TableContainer component={Paper} style={{ padding: 16 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 10 }}>No</TableCell>
              <TableCell align="left">제목</TableCell>
              <TableCell style={{ width: 100 }} align="center">
                등록일자
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {noticeData?.seeContestNotices
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(
                (
                  { id, noticeTitle, noticeDiscription, createdAt }: any,
                  i: number
                ) => {
                  let getDate = new Date(parseInt(createdAt));
                  let date = getDate.getDate();
                  let month = getDate.getMonth() + 1;
                  let year = getDate.getFullYear();
                  return (
                    <TableRow key={id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell
                        align="left"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate("/contest/contestNoticeDetail", {
                            state: { id, noticeTitle, noticeDiscription },
                          })
                        }
                      >
                        {noticeTitle}
                      </TableCell>
                      <TableCell align="center">
                        {year + "." + month + "." + date}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={noticeData?.seeContestNotices.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}
