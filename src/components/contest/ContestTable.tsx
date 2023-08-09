import { gql, useMutation, useQuery } from "@apollo/client";
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
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useCheckGroup from "../../hooks/useCheckGroup";
import ContestCheckBox from "../ContestCheckBox";

const SEE_CONTEST_LIST_QUERY = gql`
  query seeContests($offset: Int) {
    seeContests(offset: $offset) {
      contestId
      contestSports
      contestSportsDetail
      contestName
      contestStartDate
      contestEndDate
      contestRecruitStart
      contestRecruitEnd
      contestPlace
      createdAt
      contestStatus
    }
  }
`;

const DELETE_CONTEST = gql`
  mutation deleteContest($ids: [ContestIds]) {
    deleteContest(ids: $ids) {
      ok
    }
  }
`;

const ColumnWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
  justify-content: flex-end;
`;

const HeaderColumnWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContestHeaderColumn = styled.div`
  margin-left: 8px;
  cursor: pointer;
`;

const ContestHeaderText = styled.span`
  font-size: 16px;
  padding: 8px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  width: 100px;
  border-radius: 8px;
`;

const ContestListButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ContestButton = styled.div`
  margin-right: 8px;
  cursor: pointer;
`;

const ContestButtonText = styled.span`
  font-size: 12px;
  padding: 4px;
  color: ${(props) => props.theme.blackColor};
  width: 100px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

let deleteIds: any = [];
const ContestTable = () => {
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

  const { data } = useQuery(SEE_CONTEST_LIST_QUERY, {
    variables: {
      offset: 0,
    },
    fetchPolicy: "cache-and-network",
  });

  const { checkedSet, addToSet, deleteToSet, clearSet, replaceSet } =
    useCheckGroup();

  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    if (data?.seeContests.length === 0) {
      setAllChecked(false);
      return;
    }
    if (checkedSet.size === data?.seeContests.length) setAllChecked(true);
    else setAllChecked(false);
  }, [data?.seeContests, checkedSet]);

  const allCheck = (checked) => {
    setAllChecked(checked);
    deleteIds = [];
    if (checked) {
      onAllSelectedData();
      const ids = data?.seeContests.map((row) => {
        return row.contestId;
      });
      replaceSet(ids);
      return;
    }

    clearSet();
  };

  const onCheckHandler = (checked, id) => {
    if (checked) {
      addToSet(id);
      onSelectData(id);
      return;
    }
    deleteToSet(id);
    onDeselectedData(id);
  };

  const onDeleteCompleted = (data: any) => {
    const {
      deleteContest: { ok },
    } = data;

    if (ok) {
      window.location.reload();
    }
  };
  const [deleteContestMutation] = useMutation(DELETE_CONTEST, {
    onCompleted: onDeleteCompleted,
  });

  const onAllSelectedData = () => {
    data?.seeContests.map((row) => {
      deleteIds.push({ contestId: row.contestId });
    });
  };

  const onSelectData = (id) => {
    deleteIds.push({ contestId: id });
  };

  const onDeselectedData = (id) => {
    const newDeleteIDs = deleteIds.filter((item) => item.contestId !== id);
    deleteIds = newDeleteIDs;
  };

  const onDeleteContets = () => {
    deleteContestMutation({
      variables: {
        ids: deleteIds,
      },
    });
  };

  return (
    <TableContainer component={Paper} style={{ padding: 16 }}>
      <ColumnWrap>
        <HeaderColumnWrap>
          <ContestHeaderColumn>
            <NavLink to={"/contest/createContest"}>
              <ContestHeaderText>대회 등록</ContestHeaderText>
            </NavLink>
          </ContestHeaderColumn>
          <ContestHeaderColumn onClick={onDeleteContets}>
            <ContestHeaderText
              style={{
                backgroundColor: "white",
                color: "red",
                border: "1px solid #ccc",
              }}
            >
              선택 삭제
            </ContestHeaderText>
          </ContestHeaderColumn>
        </HeaderColumnWrap>
      </ColumnWrap>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 10 }}>
              <ContestCheckBox
                id="allCheck"
                onCheck={allCheck}
                checked={allChecked}
              />
            </TableCell>
            <TableCell style={{ width: 10 }}>No</TableCell>
            <TableCell align="center">대회명</TableCell>
            <TableCell style={{ width: 100 }} align="center">
              대회상태
            </TableCell>
            <TableCell style={{ width: 100 }} align="center">
              등록일자
            </TableCell>
            <TableCell style={{ width: 500 }} align="center">
              관리
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.seeContests
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map(
              (
                {
                  contestId,
                  contestSports,
                  contestSportsDetail,
                  contestName,
                  contestStatus,
                  createdAt,
                }: any,
                i: number
              ) => {
                let getDate = new Date(parseInt(createdAt));
                let date = getDate.getDate();
                let month = getDate.getMonth() + 1;
                let year = getDate.getFullYear();

                return (
                  <>
                    <TableRow key={contestId}>
                      <TableCell rowSpan={2}>
                        <ContestCheckBox
                          id={contestId}
                          onCheck={onCheckHandler}
                          checked={checkedSet.has(contestId)}
                        />
                      </TableCell>
                      <TableCell rowSpan={2}>{i + 1}</TableCell>
                      <TableCell
                        rowSpan={2}
                        align="left"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate("/contest/editContest", {
                            state: {
                              contestId,
                            },
                          })
                        }
                      >
                        {contestName}
                      </TableCell>
                      <TableCell rowSpan={2} align="center">
                        {contestStatus}
                      </TableCell>
                      <TableCell rowSpan={2} align="center">
                        {year + "." + month + "." + date}
                      </TableCell>
                      <TableCell>
                        <ContestListButtonWrap>
                          <ContestButton
                            onClick={() =>
                              navigate("/contest/contestUserList", {
                                state: {
                                  contestId,
                                  contestSports,
                                  contestSportsDetail,
                                },
                              })
                            }
                          >
                            <ContestButtonText>참가자 정보</ContestButtonText>
                          </ContestButton>
                          <ContestButton
                            onClick={() =>
                              navigate("/contest/contestGroupList", {
                                state: { contestId },
                              })
                            }
                          >
                            <ContestButtonText>조/경기 관리</ContestButtonText>
                          </ContestButton>
                          <ContestButton
                            onClick={() =>
                              navigate("/contest/contestCourtList", {
                                state: { contestId },
                              })
                            }
                          >
                            <ContestButtonText>경기장 관리</ContestButtonText>
                          </ContestButton>
                        </ContestListButtonWrap>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <ContestListButtonWrap>
                          <ContestButton
                            onClick={() =>
                              navigate("/contest/contestNotice", {
                                state: { contestId },
                              })
                            }
                          >
                            <ContestButtonText>공지사항 관리</ContestButtonText>
                          </ContestButton>
                          <ContestButton
                            onClick={() =>
                              navigate("/contest/contestReport", {
                                state: { contestId },
                              })
                            }
                          >
                            <ContestButtonText>문의 관리</ContestButtonText>
                          </ContestButton>
                        </ContestListButtonWrap>
                      </TableCell>
                    </TableRow>
                  </>
                );
              }
            )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={data?.seeContests.length}
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

export default ContestTable;
