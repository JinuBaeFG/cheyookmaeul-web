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
  mutation createContestGroup($groupName: String, $contestId: String) {
    createContestGroup(groupName: $groupName, contestId: $contestId) {
      ok
      error
    }
  }
`;

const DELETE_CONTEST_GROUP = gql`
  mutation deleteContestGroup($ids: [ContestGroupIds]) {
    deleteContestGroup(ids: $ids) {
      ok
      error
    }
  }
`;

const SEE_CONTEST_GROUP_LIST = gql`
  query seeContestGroups($contestId: String) {
    seeContestGroups(contestId: $contestId) {
      id
      groupName
      roundAdvance
      createMatchYN
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
export default function ContestGroupTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onCompleted = (data: any) => {
    const {
      createContestGroup: { ok, error },
    } = data;

    if (ok) {
      window.location.reload();
    }
  };

  const [createContestGroupMutation] = useMutation<any>(CREATE_CONTEST_GROUP, {
    onCompleted,
  });

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onSubmitValid: SubmitHandler<any> = (data) => {
    createContestGroupMutation({
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

  const { data } = useQuery(SEE_CONTEST_GROUP_LIST, {
    variables: {
      contestId: location.state.contestId,
    },
    fetchPolicy: "cache-and-network",
  });

  const { checkedSet, addToSet, deleteToSet, clearSet, replaceSet } =
    useCheckGroup();

  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    if (data?.seeContestGroups.length === 0) {
      setAllChecked(false);
      return;
    }

    if (checkedSet.size === data?.seeContestGroups.length) setAllChecked(true);
    else setAllChecked(false);
  }, [data?.seeContestGroups, checkedSet]);

  const allCheck = (checked) => {
    setAllChecked(checked);
    deleteIds = [];
    if (checked) {
      onAllSelectedData();
      const ids = data?.seeContestGroups.map((row) => {
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
      deleteContestGroup: { ok },
    } = data;

    if (ok) {
      window.location.reload();
    }
  };
  const [deleteContestGroupMutation] = useMutation(DELETE_CONTEST_GROUP, {
    onCompleted: onDeleteCompleted,
  });

  const onAllSelectedData = () => {
    data?.seeContestGroups.map((row) => {
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
    deleteContestGroupMutation({
      variables: {
        ids: deleteIds,
      },
    });
  };

  useEffect(() => {
    register("groupName");
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
              {...register("groupName", {
                required: "그룹명을 입력해주세요.",
              })}
              placeholder="그룹명을 입력해주세요"
            />
            <ContestHeaderColumn>
              <ButtonSubmit type="submit" value={"그룹 등록"} />
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
                그룹 삭제
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
              그룹명
            </TableCell>
            <TableCell style={{ width: 300 }} align="center">
              관리
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.seeContestGroups
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map(
              (
                { id, groupName, roundAdvance, createMatchYN }: any,
                i: number
              ) => {
                console.log(createMatchYN);
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
                    <TableCell align="left">{groupName}</TableCell>
                    <TableCell align="center">
                      <ContestListButtonWrap>
                        <ContestButton
                          onClick={() =>
                            navigate("/contest/contestGroupMatch", {
                              state: {
                                contestId: location.state.contestId,
                                contestGroupId: id,
                                contestGroupName: groupName,
                                roundAdvance: roundAdvance,
                                createMatchYN: createMatchYN,
                              },
                            })
                          }
                        >
                          <ContestButtonText>조편성 관리</ContestButtonText>
                        </ContestButton>
                        {createMatchYN ? (
                          <ContestButton
                            onClick={() =>
                              navigate("/contest/contestManagement", {
                                state: {
                                  contestId: location.state.contestId,
                                  contestGroupId: id,
                                  contestGroupName: groupName,
                                  roundAdvance: roundAdvance,
                                  createMatchYN: createMatchYN,
                                },
                              })
                            }
                          >
                            <ContestButtonText>경기 관리</ContestButtonText>
                          </ContestButton>
                        ) : null}
                      </ContestListButtonWrap>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={data?.seeContestGroups.length || 0}
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
