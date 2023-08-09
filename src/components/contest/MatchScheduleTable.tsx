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

const SEE_CONTEST_GROUP_MATCH_SCHEDULE = gql`
  query seeContestGroupMatchSchedule($contestMatchGroupId: String) {
    seeContestGroupMatchSchedule(contestMatchGroupId: $contestMatchGroupId) {
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

export default function MatchScheduleTable({ groupMatchId, contestId }) {
  const { data: contestMatchSchedule } = useQuery(
    SEE_CONTEST_GROUP_MATCH_SCHEDULE,
    {
      variables: {
        contestMatchGroupId: groupMatchId,
      },
    }
  );

  return (
    <TableContainer component={Paper} style={{ padding: 16, marginBottom: 16 }}>
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
            ? contestMatchSchedule?.seeContestGroupMatchSchedule.map((team) => {
                return (
                  <ScheduleTableRow
                    key={team.id}
                    contestTeam={team}
                    contestId={contestId}
                    groupMatchId={groupMatchId}
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
