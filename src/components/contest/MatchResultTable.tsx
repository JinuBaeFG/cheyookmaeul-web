import React, { useEffect, useState } from "react";
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

const SEE_CONTEST_MATCH_GROUP_RESULT = gql`
  query seeContestGroupMatchResult($contestMatchGroupId: String) {
    seeContestGroupMatchResult(contestMatchGroupId: $contestMatchGroupId) {
      id
      contest {
        id
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
      totalWin
      totalLose
      totalWinScore
      totalLoseScore
      totalScore
    }
  }
`;

export default function MatchResultTable({ groupMatchId, contestId }) {
  const { data: contestMatchResult } = useQuery(
    SEE_CONTEST_MATCH_GROUP_RESULT,
    {
      variables: { contestMatchGroupId: groupMatchId },
    }
  );

  return (
    <TableContainer component={Paper} style={{ padding: 16, marginBottom: 16 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={7}>
              경기결과
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">순위</TableCell>
            <TableCell align="center">팀명</TableCell>
            <TableCell align="center">승</TableCell>
            <TableCell align="center">패</TableCell>
            <TableCell align="center">득점</TableCell>
            <TableCell align="center">실점</TableCell>
            <TableCell align="center">득실차</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contestMatchResult !== undefined && contestMatchResult !== null
            ? contestMatchResult.seeContestGroupMatchResult.map(
                (team: any, index) => {
                  return (
                    <TableRow key={team.id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        {team.contestTeam.teamName}
                      </TableCell>
                      <TableCell align="center">{team.totalWin}</TableCell>
                      <TableCell align="center">{team.totalLose}</TableCell>
                      <TableCell align="center">{team.totalWinScore}</TableCell>
                      <TableCell align="center">
                        {team.totalLoseScore}
                      </TableCell>
                      <TableCell align="center">{team.totalScore}</TableCell>
                    </TableRow>
                  );
                }
              )
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
/*
 */
