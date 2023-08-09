import React, { useEffect, useState } from "react";
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
import { gql, useMutation, useQuery } from "@apollo/client";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ContestCheckBox from "../ContestCheckBox";
import useCheckGroup from "../../hooks/useCheckGroup";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";

const CREATE_CONTEST_GROUP = gql`
  mutation createContestCourt($courtName: String, $contestId: String) {
    createContestCourt(courtName: $courtName, contestId: $contestId) {
      ok
      error
    }
  }
`;

const DELETE_CONTEST_GROUP = gql`
  mutation deleteContestCourt($ids: [DeleteCourtIds]) {
    deleteContestCourt(ids: $ids) {
      ok
      error
    }
  }
`;

const SEE_CONTEST_COURT_LIST = gql`
  query seeContestCourt($contestId: String) {
    seeContestCourt(contestId: $contestId) {
      id
      courtName
    }
  }
`;

const ColumnWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
`;

const HeaderHistoryBack = styled.div`
  cursor: pointer;
  margin-right: 16px;
`;

const HeaderColumnWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContestColumnWrap = styled.div`
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

const TitleInput = styled.input`
  width: 200px;
  border: 1px solid #ccc;
  padding: 8px;
`;

const ButtonSubmit = styled.input`
  padding: 8px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  border: 1px solid ${(props) => props.theme.menuColor};
  border-radius: 8px;
  cursor: pointer;
  margin: 4px;
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
export default function ContestCourtTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onCompleted = (data: any) => {
    const {
      createContestCourt: { ok, error },
    } = data;

    if (ok) {
      window.location.reload();
    }
  };

  const [createContestCourtMutation] = useMutation<any>(CREATE_CONTEST_GROUP, {
    onCompleted,
  });

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onSubmitValid: SubmitHandler<any> = (data) => {
    console.log(data);
    createContestCourtMutation({
      variables: {
        ...data,
      },
    });
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data } = useQuery(SEE_CONTEST_COURT_LIST, {
    variables: {
      contestId: location.state.contestId,
    },
    fetchPolicy: "cache-and-network",
  });

  const { checkedSet, addToSet, deleteToSet, clearSet, replaceSet } =
    useCheckGroup();

  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    if (data?.seeContestCourt.length === 0) {
      setAllChecked(false);
      return;
    }

    if (checkedSet.size === data?.seeContestCourt.length) setAllChecked(true);
    else setAllChecked(false);
  }, [data?.seeContestCourt, checkedSet]);

  const allCheck = (checked) => {
    setAllChecked(checked);
    deleteIds = [];
    if (checked) {
      onAllSelectedData();
      const ids = data?.seeContestCourt.map((row) => {
        return row.id;
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
      deleteContestCourt: { ok },
    } = data;

    if (ok) {
      window.location.reload();
    }
  };
  const [deleteContestCourtMutation] = useMutation(DELETE_CONTEST_GROUP, {
    onCompleted: onDeleteCompleted,
  });

  const onAllSelectedData = () => {
    data?.seeContestCourt.map((row) => {
      deleteIds.push({ id: row.id });
    });
  };

  const onSelectData = (id) => {
    deleteIds.push({ id: id });
  };

  const onDeselectedData = (id) => {
    const newDeleteIDs = deleteIds.filter((item) => item.id !== id);
    deleteIds = newDeleteIDs;
  };

  const onDeleteContestGroup = () => {
    deleteContestCourtMutation({
      variables: {
        ids: deleteIds,
      },
    });
  };

  useEffect(() => {
    register("courtName");
    register("contestId");
    setValue("contestId", location.state.contestId);
  }, []);

  return (
    <TableContainer component={Paper} style={{ padding: 16 }}>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <ColumnWrap>
          <ContestColumnWrap>
            <HeaderHistoryBack onClick={() => navigate("/contest/contestList")}>
              <IoIosArrowBack size={24} />
            </HeaderHistoryBack>
            <TitleInput
              {...register("courtName", {
                required: "코트/경기장 이름을 입력해주세요.",
              })}
              placeholder="코트/경기장 이름을 입력해주세요."
            />
            <ContestHeaderColumn>
              <ButtonSubmit type="submit" value={"경기장 등록"} />
            </ContestHeaderColumn>
          </ContestColumnWrap>
          <HeaderColumnWrap>
            <ContestHeaderColumn>
              <ContestHeaderText
                style={{
                  backgroundColor: "white",
                  color: "red",
                  border: "1px solid #ccc",
                }}
                onClick={onDeleteContestGroup}
              >
                코트 삭제
              </ContestHeaderText>
            </ContestHeaderColumn>
          </HeaderColumnWrap>
        </ColumnWrap>
      </form>
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
            <TableCell style={{ width: 500 }} align="center">
              코트/경기장명
            </TableCell>
            <TableCell style={{ width: 100 }} align="center">
              경기관리
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.seeContestCourt
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map(({ id, courtName }: any, i: number) => {
              return (
                <TableRow key={id}>
                  <TableCell>
                    <ContestCheckBox
                      id={id}
                      onCheck={onCheckHandler}
                      checked={checkedSet.has(id)}
                    />
                  </TableCell>
                  <TableCell style={{ width: 10 }}>{i + 1}</TableCell>
                  <TableCell align="left">{courtName}</TableCell>
                  <TableCell align="center">
                    <ContestButton
                      onClick={() => {
                        navigate("/contest/contestGroupMatchByCourt", {
                          state: {
                            contestId: location.state.contestId,
                            contestCourtId: id,
                          },
                        });
                      }}
                    >
                      <ContestButtonText>경기확인</ContestButtonText>
                    </ContestButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={data?.seeContestCourt.length || 0}
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
}
