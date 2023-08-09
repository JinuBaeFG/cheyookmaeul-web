import React, { useState } from "react";
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

const SEE_CONTEST_MATCH_GROUP = gql`
  query seeContestMatchTeam($contestMatchGroupId: String) {
    seeContestMatchTeam(contestMatchGroupId: $contestMatchGroupId) {
      id
      teamName
    }
  }
`;

const SEE_CONTEST_MATCH_GROUP_HISTORY = gql`
  query seeContestGroupMatchHistory($contestMatchGroupId: String) {
    seeContestGroupMatchHistory(contestMatchGroupId: $contestMatchGroupId) {
      id
      contest {
        id
      }
      contestTeam {
        id
        teamName
      }
      opponentTeam {
        id
        teamName
      }
      isWinner
      winScore
      loseScore
      resultScore
    }
  }
`;

export default function MatchTable({ groupMatchId }) {
  const { data: contestTeamList } = useQuery(SEE_CONTEST_MATCH_GROUP, {
    variables: { contestMatchGroupId: groupMatchId },
  });
  const { data: contestMatchHistory } = useQuery(
    SEE_CONTEST_MATCH_GROUP_HISTORY,
    {
      variables: { contestMatchGroupId: groupMatchId },
    }
  );

  return (
    <TableContainer component={Paper} style={{ padding: 16, marginBottom: 16 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">선수</TableCell>
            {contestTeamList?.seeContestMatchTeam !== undefined &&
            contestTeamList?.seeContestMatchTeam !== null
              ? contestTeamList?.seeContestMatchTeam.map((item) => (
                  <TableCell key={item.id} align="center">
                    {item.teamName}
                  </TableCell>
                ))
              : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {contestTeamList?.seeContestMatchTeam.map((team) => {
            return (
              <TableRow key={team.id}>
                <TableCell align="center">{team.teamName}</TableCell>
                {contestTeamList.seeContestMatchTeam.map((list) => {
                  if (team.id === list.id) {
                    return (
                      <TableCell key={list.id} align="center">
                        -
                      </TableCell>
                    );
                  } else if (team.id !== list.id) {
                    return contestMatchHistory?.seeContestGroupMatchHistory.map(
                      (item) => {
                        if (
                          team.id === item.contestTeam.id &&
                          list.id === item.opponentTeam.id
                        ) {
                          return (
                            <TableCell key={item.id} align="center">
                              {team.teamName +
                                " VS " +
                                item.opponentTeam.teamName}
                            </TableCell>
                          );
                        }
                      }
                    );
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
