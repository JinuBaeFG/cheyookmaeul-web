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

const SEE_FACILITY_LIST_QUERY = gql`
  query seeFacilities($offset: Int) {
    seeFacilities(offset: $offset) {
      id
      name
      activeArea
      createdAt
    }
  }
`;

const FacilityTable = () => {
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

  const { data } = useQuery(SEE_FACILITY_LIST_QUERY, {
    variables: {
      offset: 0,
    },
    fetchPolicy: "cache-and-network",
  });
  console.log(data);
  return (
    <TableContainer component={Paper} style={{ padding: 16 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 10 }}>No</TableCell>
            <TableCell style={{ width: 100 }} align="center">
              지역
            </TableCell>
            <TableCell align="left">시설명</TableCell>
            <TableCell style={{ width: 100 }} align="center">
              등록일자
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.seeFacilities
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map(({ id, name, activeArea, createdAt }: any, i: number) => {
              let getDate = new Date(parseInt(createdAt));
              let date = getDate.getDate();
              let month = getDate.getMonth() + 1;
              let year = getDate.getFullYear();
              return (
                <TableRow key={id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{activeArea}</TableCell>
                  <TableCell
                    align="left"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate("/facility/editFacility", { state: { id } })
                    }
                  >
                    {name}
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
              count={data?.seeFacilities.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default FacilityTable;
