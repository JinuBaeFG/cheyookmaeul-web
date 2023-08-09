import React, { useEffect, useState } from "react";
import { SingleEliminationBracket } from "@g-loot/react-tournament-brackets";
import { gql, useMutation, useQuery } from "@apollo/client";
import { start } from "repl";

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

const UPDATE_CONTEST_TOURNAMENT_HISTORY = gql`
  mutation updateContestTournamentHistory(
    $contestTeamHistoryId: String
    $opponentTeamHistoryId: String
    $contestTournamentGroupId: String
    $contestTeamId: String
    $contestTeamName: String
    $groupTierId: String
    $contestId: String
  ) {
    updateContestTournamentHistory(
      contestTournamentGroupId: $contestTournamentGroupId
      contestTeamHistoryId: $contestTeamHistoryId
      opponentTeamHistoryId: $opponentTeamHistoryId
      contestTeamId: $contestTeamId
      contestTeamName: $contestTeamName
      groupTierId: $groupTierId
      contestId: $contestId
    ) {
      ok
      error
    }
  }
`;

export default function GroupTournament({
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

  const onCompleted = (data: any) => {
    const {
      updateContestTournamentHistory: { ok, error },
    } = data;
    if (ok) {
      alert("적용되었습니다.");
      window.location.reload();
    }
    if (error) {
      alert("이미 적용된 팀입니다.");
    }
  };
  const [updateContestTournamentHistoryMutation] = useMutation(
    UPDATE_CONTEST_TOURNAMENT_HISTORY,
    {
      onCompleted,
    }
  );

  const [contestTeam, setContestTeam] = useState<any>([]);

  useEffect(() => {
    roundAdvanceData?.seeContestRoundAdvance.map((item) => {
      setContestTeam((contestTeam) => [
        ...contestTeam,
        item.contestGroupMatchResult[0],
      ]);
    });
  }, [roundAdvanceData]);

  const onTopSelectHandler = (e, topParty, bottomParty, match) => {
    let index = e.target.selectedIndex;
    let teamName = e.target[index].text;
    let teamId = e.target.value;

    updateContestTournamentHistoryMutation({
      variables: {
        contestTournamentGroupId: match.id,
        contestTeamHistoryId: topParty.id,
        opponentTeamHistoryId: bottomParty.id,
        contestTeamId: teamId,
        contestTeamName: teamName,
        groupTierId,
        contestId,
      },
    });
  };

  const onBottomSelectHandler = (e, topParty, bottomParty, match) => {
    let index = e.target.selectedIndex;
    let teamName = e.target[index].text;
    let teamId = e.target.value;
    updateContestTournamentHistoryMutation({
      variables: {
        contestTournamentGroupId: match.id,
        contestTeamHistoryId: bottomParty.id,
        opponentTeamHistoryId: topParty.id,
        contestTeamId: teamId,
        contestTeamName: teamName,
        groupTierId,
        contestId,
      },
    });
  };

  return (
    <>
      {matches !== undefined && matches !== null ? (
        <SingleEliminationBracket
          matches={matches}
          matchComponent={({
            match,
            onMatchClick,
            onPartyClick,
            onMouseEnter,
            onMouseLeave,
            topParty,
            bottomParty,
            topWon,
            bottomWon,
            topHovered,
            bottomHovered,
            topText,
            bottomText,
            connectorColor,
            computedStyles,
            teamNameFallback,
            resultFallback,
          }) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                color: "#000",
                width: "100%",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {topParty.status === "NO_PARTY" &&
                match.name === (startRound / 2).toString() ? (
                  <select
                    onChange={(e) =>
                      onTopSelectHandler(e, topParty, bottomParty, match)
                    }
                  >
                    <option value={""}>선택안함</option>
                    {contestTeam.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.contestTeam.id}
                          selected={topParty.name === item.contestTeam.teamName}
                        >
                          {item.contestTeam.teamName}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <div
                    style={{
                      color: topParty.isWinner ? "#FF8C00" : "black",
                      fontWeight: topParty.isWinner ? "600" : "400",
                    }}
                  >
                    {topParty.name || teamNameFallback}
                  </div>
                )}
                <div
                  style={{
                    color: topParty.isWinner ? "#FF8C00" : "black",
                    fontWeight: topParty.isWinner ? "600" : "400",
                  }}
                >
                  {topParty.resultText ?? resultFallback(topParty)}
                </div>
              </div>
              <div
                style={{ height: "1px", width: "100%", background: "#FF8C00" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {bottomParty.status === "NO_PARTY" &&
                match.name === (startRound / 2).toString() ? (
                  <select
                    onChange={(e) =>
                      onBottomSelectHandler(e, topParty, bottomParty, match)
                    }
                  >
                    <option value={""}>선택안함</option>
                    {contestTeam.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.contestTeam.id}
                          selected={
                            bottomParty.name === item.contestTeam.teamName
                          }
                        >
                          {item.contestTeam.teamName}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <div
                    style={{
                      color: bottomParty.isWinner ? "#FF8C00" : "black",
                      fontWeight: bottomParty.isWinner ? "600" : "400",
                    }}
                  >
                    {bottomParty.name || teamNameFallback}
                  </div>
                )}
                <div
                  style={{
                    color: bottomParty.isWinner ? "#FF8C00" : "black",
                    fontWeight: bottomParty.isWinner ? "600" : "400",
                  }}
                >
                  {bottomParty.resultText ?? resultFallback(topParty)}
                </div>
              </div>
            </div>
          )}
        />
      ) : null}
    </>
  );
}
