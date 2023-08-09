import React, { useEffect, useLayoutEffect, useState } from "react";
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
import TournamentScheduleTableRow from "./TournamentScheduleTableRow";

const SEE_CONTEST_ROUND_ADVANCE = gql`
  query seeContestRoundAdvance($contestGroupId: String, $roundAdvance: Int) {
    seeContestRoundAdvance(
      contestGroupId: $contestGroupId
      roundAdvance: $roundAdvance
    ) {
      id
      groupNo
      contestGroupMatchResult {
        id
        contestTeam {
          id
          teamName
        }
        totalWin
        totalLose
        totalScore
        totalWinScore
        totalLoseScore
      }
    }
  }
`;

export default function RoundAdvanceTable({
  matches,
  groupMatchId,
  contestId,
  groupTierId,
  roundAdvance,
  startRound,
}) {
  const { data: roundAdvanceData } = useQuery(SEE_CONTEST_ROUND_ADVANCE, {
    variables: {
      contestGroupId: groupTierId,
      roundAdvance,
    },
  });

  const [contestTeam, setContestTeam] = useState<any>([]);
  const [round, setRound] = useState<any>();

  useEffect(() => {
    roundAdvanceData?.seeContestRoundAdvance.map((item) => {
      setContestTeam((contestTeam) => [
        ...contestTeam,
        item.contestGroupMatchResult[0],
      ]);
    });

    setRound(startRound / 2);
  }, [roundAdvanceData]);

  const onSelectRound = (e) => {
    console.log(e.target.value);
  };
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
            <TableCell align="center">팀명</TableCell>
            <TableCell align="center">승</TableCell>
            <TableCell align="center">패</TableCell>
            <TableCell align="center">득실차</TableCell>
            <TableCell align="center">본선편성</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contestTeam
            .sort((a, b) => {
              if (a.totalWin < b.totalWin) return 1;
              if (a.totalWin > b.totalWin) return -1;
              if (a.totalWin === b.totalWin) return 0;
            })
            .map((item) => {
              let showRound = 0;
              return (
                <TableRow key={item.contestTeam.id}>
                  <TableCell align="center">
                    {item.contestTeam.teamName}
                  </TableCell>
                  <TableCell align="center">{item.totalWin}</TableCell>
                  <TableCell align="center">{item.totalLose}</TableCell>
                  <TableCell align="center">{item.totalScore}</TableCell>
                  <TableCell align="center">
                    <select
                      onChange={(e) => {
                        onSelectRound(e);
                      }}
                    >
                      <option value={""}>경기선택</option>
                      {matches.map((item) => {
                        console.log(typeof item.name);
                        if (item.name === round.toString()) {
                          showRound++;
                          return (
                            <option key={item.id} value={item.id}>
                              {startRound + "강 " + showRound + "경기"}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
/*
 */
