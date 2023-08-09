import React, { useLayoutEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import ScheduleTableRow from "./ScheduleTableRow";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const SEE_CONTEST_GROUP_MATCH_SCHEDULE_BY_COURT = gql`
  query seeContestGroupByCourt($contestCourtId: String) {
    seeContestGroupByCourt(contestCourtId: $contestCourtId) {
      id
      contest {
        id
        contestId
      }
      contestTeam {
        id
        teamName
        contestUser {
          id
          user {
            id
            username
            avatar
          }
        }
      }
      opponentTeam {
        id
        teamName
        contestUser {
          id
          user {
            id
            username
            avatar
          }
        }
      }
      contestCourt {
        id
        courtName
      }
      contestMatchGroup {
        id
      }
      winScore
      loseScore
      matchNo
      status
      matchTime
      matchTimeHour
      matchTimeMin
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

const ContestColumnWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function MatchScheduleTableByCourt({}) {
  const location = useLocation();
  const navigate = useNavigate();

  const contestId = location.state.contestId;
  const contestCourtId = location.state.contestCourtId;
  console.log(contestId, contestCourtId);
  const { data: contestMatchSchedule } = useQuery(
    SEE_CONTEST_GROUP_MATCH_SCHEDULE_BY_COURT,
    {
      variables: {
        contestCourtId: contestCourtId,
      },
    }
  );

  return (
    <TableContainer component={Paper} style={{ padding: 16, marginBottom: 16 }}>
      <ColumnWrap>
        <ContestColumnWrap>
          <HeaderHistoryBack
            onClick={() =>
              navigate("/contest/contestCourtList", {
                state: { contestId: location.state.contestId },
              })
            }
          >
            <IoIosArrowBack size={24} />
          </HeaderHistoryBack>
        </ContestColumnWrap>
      </ColumnWrap>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={6}>
              경기/일정
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">팀명/팀원</TableCell>
            <TableCell align="center">경기코트명</TableCell>
            <TableCell align="center">경기순서</TableCell>
            <TableCell align="center">시작시간</TableCell>
            <TableCell align="center">점수</TableCell>
            <TableCell align="center">경기상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contestMatchSchedule !== undefined && contestMatchSchedule !== null
            ? contestMatchSchedule?.seeContestGroupByCourt.map((team) => {
                return (
                  <ScheduleTableRow
                    key={team.id}
                    contestTeam={team}
                    contestId={contestId}
                    groupMatchId={team.contestMatchGroup.id}
                  />
                );
              })
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
/*
 */
