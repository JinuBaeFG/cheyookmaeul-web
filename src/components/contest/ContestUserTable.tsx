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
import { IoIosArrowBack } from "react-icons/io";

const DECRYPT_PHONE_NUMBER = gql`
  mutation decryptPhoneNumber($phoneNumber: String) {
    decryptPhoneNumber(phoneNumber: $phoneNumber) {
      ok
      phoneNumber
    }
  }
`;

const SEE_CONTEST_USER_LIST = gql`
  query seeUserList($contestId: String) {
    seeUserList(contestId: $contestId) {
      id
      contest {
        contestId
        contestName
      }
      contestTeam {
        id
        teamName
        contestUser {
          user {
            id
            username
            avatar
            phoneNumber
          }
        }
      }
      user {
        id
        username
        avatar
        phoneNumber
      }
      userAge
      userGender
      userTier
      contestSports
      contestSportsType
      contestPaymentStatus
    }
  }
`;

const DELETE_CONTEST_USER = gql`
  mutation deleteContestUser($ids: [DeleteContestUser]) {
    deleteContestUser(ids: $ids) {
      ok
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

const ContestLinkSpan = styled.div``;

let deleteIds: any = [];
export default function ContestUserTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data } = useQuery(SEE_CONTEST_USER_LIST, {
    variables: {
      contestId: location.state.contestId,
    },
    pollInterval: 1000,
  });

  const { checkedSet, addToSet, deleteToSet, clearSet, replaceSet } =
    useCheckGroup();

  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    if (data?.seeUserList.length === 0) {
      setAllChecked(false);
      return;
    }

    if (checkedSet.size === data?.seeUserList.length) setAllChecked(true);
    else setAllChecked(false);
  }, [data?.seeUserList, checkedSet]);

  const allCheck = (checked) => {
    setAllChecked(checked);
    deleteIds = [];
    if (checked) {
      onAllSelectedData();
      const ids = data?.seeUserList.map((row) => {
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
      deleteContestUser: { ok },
    } = data;

    if (ok) {
      window.location.reload();
    }
  };
  const [deleteContestUserMutation] = useMutation(DELETE_CONTEST_USER, {
    onCompleted: onDeleteCompleted,
  });

  const onAllSelectedData = () => {
    data?.seeUserList.map((row) => {
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

  const onDeleteContestUser = () => {
    deleteContestUserMutation({
      variables: {
        ids: deleteIds,
      },
    });
  };

  const onDecryptPhoneNumber = (data: any) => {
    const {
      decryptPhoneNumber: { ok, phoneNumber },
    } = data;

    if (ok) {
      setPhoneNumber(phoneNumber);
    }
  };

  const [decryptPhoneNumberMutation] = useMutation(DECRYPT_PHONE_NUMBER, {
    onCompleted: onDecryptPhoneNumber,
  });

  const decryptPhoneNumber = (phoneNumber: string) => {
    decryptPhoneNumberMutation({
      variables: {
        phoneNumber,
      },
    });
  };

  return (
    <TableContainer component={Paper} style={{ padding: 16 }}>
      <ColumnWrap>
        <HeaderHistoryBack onClick={() => navigate("/contest/contestList")}>
          <IoIosArrowBack size={24} />
        </HeaderHistoryBack>
        <HeaderColumnWrap>
          <ContestHeaderColumn
            onClick={() =>
              navigate("/contest/createContestUser", {
                state: {
                  contestId: location.state.contestId,
                  contestSports: location.state.contestSports,
                  contestSportsDetail: location.state.contestSportsDetail,
                },
              })
            }
          >
            <ContestHeaderText>참가자 등록</ContestHeaderText>
          </ContestHeaderColumn>
          <ContestHeaderColumn>
            <ContestHeaderText
              style={{
                backgroundColor: "white",
                color: "red",
                border: "1px solid #ccc",
              }}
              onClick={onDeleteContestUser}
            >
              참가자 삭제
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
            <TableCell style={{ width: 100 }} align="center">
              이름
            </TableCell>
            <TableCell style={{ width: 100 }} align="center">
              팀명
            </TableCell>
            <TableCell style={{ width: 100 }} align="center">
              경기타입
            </TableCell>
            <TableCell style={{ width: 100 }} align="center">
              등급
            </TableCell>
            <TableCell style={{ width: 100 }} align="center">
              나이
            </TableCell>
            <TableCell style={{ width: 100 }} align="center">
              성별
            </TableCell>
            <TableCell style={{ width: 300 }} align="center">
              연락처
            </TableCell>
            <TableCell style={{ width: 100 }} align="center">
              결제상태
            </TableCell>
            <TableCell style={{ width: 100 }} align="center">
              참가 파트너
            </TableCell>
            <TableCell style={{ width: 100 }} align="center">
              조 배정
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.seeUserList !== undefined && data?.seeUserList !== null
            ? data?.seeUserList
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map(
                  (
                    {
                      id,
                      user,
                      contestTeam,
                      userAge,
                      userGender,
                      userTier,
                      contestSportsType,
                      contestPaymentStatus,
                    }: any,
                    i: number
                  ) => {
                    return (
                      <TableRow key={id}>
                        <TableCell>
                          <ContestCheckBox
                            id={id}
                            onCheck={onCheckHandler}
                            checked={checkedSet.has(id)}
                          />
                        </TableCell>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell
                          align="center"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate("/contest/editContestUser", {
                              state: {
                                id: id,
                                contestId: location.state.contestId,
                                contestSports: location.state.contestSports,
                                contestSportsDetail:
                                  location.state.contestSportsDetail,
                              },
                            })
                          }
                        >
                          {user.username}
                        </TableCell>
                        <TableCell align="center">
                          {contestTeam?.teamName || ""}
                        </TableCell>
                        <TableCell align="center">
                          {contestSportsType}
                        </TableCell>
                        <TableCell align="center">{userTier}</TableCell>
                        <TableCell align="center">{userAge}</TableCell>
                        <TableCell align="center">{userGender}</TableCell>
                        <TableCell
                          align="center"
                          onClick={() => {
                            decryptPhoneNumber(user.phoneNumber);
                            setIsVisible(!isVisible);
                          }}
                        >
                          {isVisible ? phoneNumber : user.phoneNumber}
                        </TableCell>
                        <TableCell align="center">
                          {contestPaymentStatus}
                        </TableCell>
                        <TableCell align="center">
                          {contestTeam.contestUser !== undefined &&
                          contestTeam.contestUser !== null
                            ? contestTeam.contestUser.map((item) => {
                                if (user.username !== item.user.username)
                                  return item.user.username;
                              })
                            : null}
                        </TableCell>
                        <TableCell align="center">{}</TableCell>
                      </TableRow>
                    );
                  }
                )
            : null}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={data?.seeUserList.length || 0}
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
