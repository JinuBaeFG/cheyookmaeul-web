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
import TournamentScheduleTableRow from "./TournamentScheduleTableRow";

export default function TournamentScheduleTable({
  matches,
  groupMatchId,
  contestId,
}) {
  return (
    <TableContainer component={Paper} style={{ padding: 16, marginBottom: 16 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={7}>
              경기/일정
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">라운드</TableCell>
            <TableCell align="center">팀명</TableCell>
            <TableCell align="center">경기코트명</TableCell>
            <TableCell align="center">경기순서</TableCell>
            <TableCell align="center">시작시간</TableCell>
            <TableCell align="center">점수</TableCell>
            <TableCell align="center">경기상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches !== undefined && matches !== null
            ? matches.map((team) => {
                return (
                  <TournamentScheduleTableRow
                    key={team.id}
                    tournament={team}
                    contestId={contestId}
                    groupMatchId={groupMatchId}
                    state={team.state}
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
