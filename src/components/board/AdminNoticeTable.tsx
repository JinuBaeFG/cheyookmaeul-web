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
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SEE_ADMIN_NOTICES_QUERY = gql`
  query seeAdminNotices($offset: Int) {
    seeAdminNotices(offset: $offset) {
      id
      title
      createdAt
    }
  }
`;

const Container = styled.div``;

const BannerBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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

const AdminNoticeTable = () => {
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

  const { data } = useQuery(SEE_ADMIN_NOTICES_QUERY, {
    variables: {
      offset: 0,
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <Container>
      <BannerBtnWrap>
        <BannerInputBtn onClick={() => navigate("/adminnotice/addadminnotice")}>
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
            {data?.seeAdminNotices
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(({ id, title, createdAt }: any, i: number) => {
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
                        navigate("/adminnotice/adminNoticeDetail", {
                          state: { id },
                        })
                      }
                    >
                      {title}
                    </TableCell>
                    <TableCell align="center">
                      {year + "." + month + "." + date}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={data?.seeAdminNotices.length}
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
};

export default AdminNoticeTable;
