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
import AddMatchTable from "./AddMatchTable";

const DELETE_CONTEST_GROUP = gql`
  mutation deleteContestGroupMatch($id: String) {
    deleteContestGroupMatch(id: $id) {
      ok
      error
    }
  }
`;

const DELETE_CONTEST_GROUP_MATCH_HISTORY = gql`
  mutation deleteContestGroupMatchTeam(
    $contestId: String
    $contestTeamId: String
    $contestMatchGroupId: String
  ) {
    deleteContestGroupMatchTeam(
      contestId: $contestId
      contestTeamId: $contestTeamId
      contestMatchGroupId: $contestMatchGroupId
    ) {
      ok
      error
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
  font-size: 12px;
  padding: 8px;
  width: 100px;
  border-radius: 8px;
  text-align: center;
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

const ButtonSubmit = styled.input`
  padding: 8px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  border: 1px solid ${(props) => props.theme.menuColor};
  border-radius: 8px;
  cursor: pointer;
  margin: 4px;
`;

export default function GroupMatchTable({
  groupNo,
  contestTeam,
  contestId,
  contestMatchGroupId,
  createMatchListYN,
}) {
  const navigate = useNavigate();

  // 조 삭제
  const onDeleteGroupMatchCompleted = (data: any) => {
    const {
      deleteContestGroupMatch: { ok },
    } = data;

    if (ok) {
      window.location.reload();
    }
  };
  const [deleteContestGroupMatchMutation] = useMutation(DELETE_CONTEST_GROUP, {
    onCompleted: onDeleteGroupMatchCompleted,
  });

  const onDeleteContestGroupMatch = () => {
    deleteContestGroupMatchMutation({
      variables: {
        id: contestMatchGroupId,
      },
    });
  };

  // 팀 삭제
  const deleteContestGroupMatchTeamCompleted = (data: any) => {
    const {
      deleteContestGroupMatchTeam: { ok },
    } = data;

    if (ok) {
      window.location.reload();
    }
  };

  const [deleteContestGroupMatchTeamMutation] = useMutation(
    DELETE_CONTEST_GROUP_MATCH_HISTORY,
    {
      onCompleted: deleteContestGroupMatchTeamCompleted,
    }
  );

  const onDeleteContestGroupMatchTeam = (id) => {
    deleteContestGroupMatchTeamMutation({
      variables: {
        contestId,
        contestTeamId: id,
        contestMatchGroupId,
      },
    });
  };

  const [match, setMatch] = useState([]);
  const [visible, setVisible] = useState(false);
  let contestTeamList;

  const toggleVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    setMatch(contestTeam || []);
    contestTeamList = contestTeam.map((item) => {
      return { id: item.id };
    });
  }, []);

  return (
    <TableContainer component={Paper} style={{ padding: 16, marginBottom: 16 }}>
      <ColumnWrap>
        <HeaderColumnWrap>
          <ContestHeaderColumn>
            <ContestHeaderText
              style={{
                backgroundColor: "#01AA73",
                color: "white",
              }}
              onClick={toggleVisible}
            >
              팀 추가
            </ContestHeaderText>
          </ContestHeaderColumn>
          <ContestHeaderColumn>
            <ContestHeaderText
              style={{
                backgroundColor: "white",
                color: "red",
                border: "1px solid #ccc",
              }}
              onClick={onDeleteContestGroupMatch}
            >
              조 삭제
            </ContestHeaderText>
          </ContestHeaderColumn>
        </HeaderColumnWrap>
      </ColumnWrap>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 10 }}>조</TableCell>
            <TableCell style={{ width: 300 }} align="center">
              팀명
            </TableCell>
            <TableCell style={{ width: 300 }} align="center">
              선수
            </TableCell>
            <TableCell style={{ width: 300 }} align="center">
              관리
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {match !== undefined && match !== null && match.length > 0
            ? match.map(({ id, teamName, contestUser }: any, i: number) => {
                return (
                  <TableRow key={id}>
                    <TableCell style={{ width: 10 }}>{groupNo}</TableCell>
                    <TableCell align="center">{teamName || ""}</TableCell>
                    <TableCell align="center">
                      {contestUser !== undefined && contestUser !== null
                        ? contestUser.map((item) => {
                            return item.user.username + " ";
                          })
                        : null}
                    </TableCell>
                    <TableCell align="center">
                      {createMatchListYN ? (
                        <ContestListButtonWrap>
                          <ContestButton onClick={() => {}}>
                            <ContestButtonText>경기확인</ContestButtonText>
                          </ContestButton>
                        </ContestListButtonWrap>
                      ) : (
                        <ContestListButtonWrap>
                          <ContestButton
                            onClick={() => {
                              onDeleteContestGroupMatchTeam(id);
                            }}
                          >
                            <ContestButtonText>팀 삭제</ContestButtonText>
                          </ContestButton>
                        </ContestListButtonWrap>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
      <AddMatchTable
        groupNo={groupNo}
        contestId={contestId}
        contestMatchGroupId={contestMatchGroupId}
        match={match}
        isModal={visible}
        setIsModal={setVisible}
      />
    </TableContainer>
  );
}
