import { gql, useMutation, useQuery } from "@apollo/client";
import { TableCell, TableRow } from "@material-ui/core";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

const UPDATE_CONTEST_TOURNAMENT_END = gql`
  mutation updateContestTournamentEnd(
    $id: String
    $contestId: String
    $contestMatchGroupId: String
    $contestTeamId: String
    $contestCourtId: String
    $nextMatchId: String
    $matchNo: Int
    $startTimeHour: String
    $startTimeMin: String
    $opponentTeamId: String
    $contestTeamScore: Int
    $opponentTeamScore: Int
    $topPartyTeamId: String
    $bottomPartyTeamId: String
    $topPartyTeamName: String
    $bottomPartyTeamName: String
  ) {
    updateContestTournamentEnd(
      id: $id
      contestId: $contestId
      contestMatchGroupId: $contestMatchGroupId
      contestTeamId: $contestTeamId
      contestCourtId: $contestCourtId
      nextMatchId: $nextMatchId
      matchNo: $matchNo
      startTimeHour: $startTimeHour
      startTimeMin: $startTimeMin
      opponentTeamId: $opponentTeamId
      contestTeamScore: $contestTeamScore
      opponentTeamScore: $opponentTeamScore
      topPartyTeamId: $topPartyTeamId
      bottomPartyTeamId: $bottomPartyTeamId
      topPartyTeamName: $topPartyTeamName
      bottomPartyTeamName: $bottomPartyTeamName
    ) {
      ok
      error
    }
  }
`;

const UPDATE_CONTEST_TOURNAMENT_START = gql`
  mutation updateContestTournamentStart(
    $id: String
    $contestTeamId: String
    $opponentTeamId: String
  ) {
    updateContestTournamentStart(
      id: $id
      contestTeamId: $contestTeamId
      opponentTeamId: $opponentTeamId
    ) {
      ok
      error
    }
  }
`;

const UPDATE_CONTEST_TOURNAMENT_SETTING = gql`
  mutation updateContestTournamentSetting(
    $id: String
    $contestId: String
    $contestTeamId: String
    $contestCourtId: String
    $matchNo: Int
    $startTimeHour: String
    $startTimeMin: String
    $opponentTeamId: String
    $contestTeamScore: Int
    $opponentTeamScore: Int
  ) {
    updateContestTournamentSetting(
      contestId: $contestId
      id: $id
      contestTeamId: $contestTeamId
      contestCourtId: $contestCourtId
      matchNo: $matchNo
      startTimeHour: $startTimeHour
      startTimeMin: $startTimeMin
      opponentTeamId: $opponentTeamId
      contestTeamScore: $contestTeamScore
      opponentTeamScore: $opponentTeamScore
    ) {
      ok
      error
    }
  }
`;

const SEE_CONTEST_COURT = gql`
  query seeContestCourt($contestId: String) {
    seeContestCourt(contestId: $contestId) {
      id
      courtName
    }
  }
`;

const Row = styled.div``;

const TeamName = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-right: 24px;
`;

const SpanRow = styled.span`
  margin-right: 12px;
`;

const CourtNameSelect = styled.select`
  padding: 8px;
`;

const MatchNoInput = styled.input`
  width: 50px;
  padding: 8px;
`;

const PlayTimeHour = styled.select`
  padding: 8px;
`;
const PlayTimeMin = styled.select`
  padding: 8px;
`;

const ContestTeamScore = styled.input`
  width: 50px;
  padding: 8px;
`;

const OpponentTeamScore = styled.input`
  width: 50px;
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

const ButtonComplete = styled.button`
  padding: 8px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  border: 1px solid ${(props) => props.theme.menuColor};
  border-radius: 8px;
  cursor: pointer;
  margin: 4px;
`;

export default function ScheduleTableRow({
  tournament,
  contestId,
  groupMatchId,
  state,
}) {
  const { data: contestCourt } = useQuery(SEE_CONTEST_COURT, {
    variables: {
      contestId,
    },
  });
  const [selected, setSelected] = useState(
    contestCourt?.seeContestCourt[0].id || ""
  );

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const onCompleted = (data: any) => {
    const {
      updateContestTournamentSetting: { ok },
    } = data;

    if (ok) {
      alert("적용되었습니다.");
      //window.location.reload();
    }
  };

  const [updateContestTournamentSettingMutation] = useMutation<any>(
    UPDATE_CONTEST_TOURNAMENT_SETTING,
    {
      onCompleted,
    }
  );

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onTournamentSubmitValid: SubmitHandler<any> = (data) => {
    data.contestCourtId = selected;
    data.contestTeamScore = parseInt(data.contestTeamScore);
    data.opponentTeamScore = parseInt(data.opponentTeamScore);
    data.matchNo = parseInt(data.matchNo);
    console.log(data);

    updateContestTournamentSettingMutation({
      variables: {
        ...data,
      },
    });
  };

  const showRoundName = (name) => {
    switch (name) {
      case "1":
        return "결승";
        break;
      case "2":
        return "4강";
        break;
      case "3":
        return "8강";
        break;
      case "4":
        return "16강";
        break;
      case "5":
        return "32강";
        break;
      case "6":
        return "64강";
        break;
    }
  };

  const onStartCompleted = (data: any) => {
    const {
      updateContestTournamentStart: { ok },
    } = data;

    if (ok) {
      alert("적용되었습니다.");
      //window.location.reload();
    }
  };

  const [updateContestTournamentStartMutation] = useMutation<any>(
    UPDATE_CONTEST_TOURNAMENT_START,
    {
      onCompleted: onStartCompleted,
    }
  );

  const onStartContest = () => {
    const { id, contestTeamId, opponentTeamId } = getValues();
    setStatus("경기중");

    updateContestTournamentStartMutation({
      variables: {
        id,
        contestTeamId,
        opponentTeamId,
      },
    });
  };

  const onEndCompleted = (data: any) => {
    const {
      updateContestTournamentEnd: { ok },
    } = data;

    if (ok) {
      alert("적용되었습니다.");
      //window.location.reload();
    }
  };

  const [updateContestTournamentEndMutation] = useMutation<any>(
    UPDATE_CONTEST_TOURNAMENT_END,
    {
      onCompleted: onEndCompleted,
    }
  );

  const onEndContest = () => {
    if (
      window.confirm("경기 완료 처리 시 수정이 불가능합니다. 적용하시겠습니까?")
    ) {
      const {
        id,
        contestId,
        contestMatchGroupId,
        contestTeamId,
        contestCourtId,
        nextMatchId,
        matchNo,
        startTimeHour,
        startTimeMin,
        opponentTeamId,
        contestTeamScore,
        opponentTeamScore,
        topPartyTeamId,
        bottomPartyTeamId,
        topPartyTeamName,
        bottomPartyTeamName,
      } = getValues();
      setStatus("경기완료");

      updateContestTournamentEndMutation({
        variables: {
          id,
          contestId,
          contestMatchGroupId,
          contestTeamId,
          contestCourtId,
          nextMatchId,
          matchNo,
          startTimeHour,
          startTimeMin,
          opponentTeamId,
          contestTeamScore: parseInt(contestTeamScore),
          opponentTeamScore: parseInt(opponentTeamScore),
          topPartyTeamId,
          bottomPartyTeamId,
          topPartyTeamName,
          bottomPartyTeamName,
        },
      });
    } else {
      return;
    }
  };
  useEffect(() => {
    register("id");
    register("contestId");
    register("contestMatchGroupId");
    register("contestTeamId");
    register("opponentTeamId");
    register("topPartyTeamId");
    register("bottomPartyTeamId");
    register("nextMatchId");
    setValue("id", tournament?.id);
    setValue("nextMatchId", tournament.nextMatchId || "");
    setValue("contestId", contestId);
    setValue("contestMatchGroupId", groupMatchId);
    setValue("contestTeamId", tournament?.participants[0].id);
    setValue("opponentTeamId", tournament?.participants[1].id);
    setValue("contestTeamScore", tournament?.participants[0].resultText || 0);
    setValue("opponentTeamScore", tournament?.participants[1].resultText || 0);
    setValue("topPartyTeamId", tournament?.participants[0].teamId || "");
    setValue("bottomPartyTeamId", tournament?.participants[1].teamId || "");
    setValue("topPartyTeamName", tournament?.participants[0].name || "");
    setValue("bottomPartyTeamName", tournament?.participants[1].name || "");
    setValue("matchNo", tournament?.matchNo);
    setValue("startTimeHour", tournament.startTimeHour || "00");
    setValue("startTimeMin", tournament.startTimeMin || "00");
    setValue(
      "contestCourtId",
      tournament?.contestCourtId || contestCourt?.seeContestCourt[0].id
    );
    setWinScore(tournament?.participants[0].resultText || 0);
    setLoseScore(tournament?.participants[1].resultText || 0);
    setSelected(
      tournament?.contestCourtId || contestCourt?.seeContestCourt[0].id
    );
  }, [register, setValue, contestId, groupMatchId, tournament]);

  const [winScore, setWinScore] = useState(0);
  const [loseScore, setLoseScore] = useState(0);

  const setWinScoreChange = (e) => {
    if (e.target.value > 99) {
      setWinScore(99);
    } else {
      setWinScore(e.target.value);
    }
  };

  const setLoseScoreChange = (e) => {
    if (e.target.value > 99) {
      setLoseScore(99);
    } else {
      setLoseScore(e.target.value);
    }
  };

  const [timeHour, setTimehour] = useState<any>([]);
  const [viewHour, setViewHour] = useState(tournament.startTimeHour || "00");
  const [timeMin, setTimemin] = useState<any>([]);
  const [viewMin, setViewMin] = useState(tournament.startTimeMin || "00");
  const [status, setStatus] = useState("");

  const handleSelectHour = (e) => {
    setViewHour(e.target.value);
  };

  const handleSelectMin = (e) => {
    setViewMin(e.target.value);
  };

  const setPlayTime = () => {
    for (var i = 0; i < 24; i++) {
      let hour = i.toString().padStart(2, "0");
      setTimehour((timeHour) => [...timeHour, { hour: hour }]);
    }
    for (var j = 0; j < 12; j++) {
      let min = (j * 5).toString().padStart(2, "0");
      setTimemin((timeMin) => [...timeMin, { min: min }]);
    }
  };

  const setCondition = () => {
    switch (state) {
      case null:
        setStatus("예정");
        break;
      case "NO_SHOW":
        setStatus("불참");
        break;
      case "WALK_OVER":
        setStatus("부전승");
        break;
      case "NO_PARTY":
        setStatus("준비중");
        break;
      case "DONE":
        setStatus("경기완료");
        break;
      case "SCORE_DONE":
        setStatus("경기중");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setPlayTime();
    setCondition();
  }, []);

  return (
    <>
      <TableRow>
        <TableCell align="center">{showRoundName(tournament.name)}</TableCell>
        <TableCell align="left">
          {tournament?.participants.map((item) => {
            return (
              <Row key={item.id}>
                <TeamName>{item.name}</TeamName>
              </Row>
            );
          })}
        </TableCell>
        <TableCell align="center" style={{ width: 110 }}>
          {status !== "경기중" && status !== "경기완료" ? (
            <CourtNameSelect
              {...register("contestCourtId")}
              onChange={handleSelect}
              value={selected}
            >
              {contestCourt?.seeContestCourt.map((court) => {
                return (
                  <option key={court.id} value={court.id}>
                    {court.courtName}
                  </option>
                );
              })}
            </CourtNameSelect>
          ) : (
            tournament?.contestCourtName
          )}
        </TableCell>
        <TableCell align="center" style={{ width: 100 }}>
          {status !== "경기중" && status !== "경기완료" ? (
            <MatchNoInput {...register("matchNo")} />
          ) : (
            tournament?.matchNo
          )}
        </TableCell>
        <TableCell align="center" style={{ width: 175 }}>
          {status !== "경기중" && status !== "경기완료" ? (
            <PlayTimeHour
              {...register("startTimeHour")}
              onChange={handleSelectHour}
              value={viewHour}
            >
              {timeHour.map((hour, index) => {
                return (
                  <option key={hour.hour + index} value={hour.hour}>
                    {hour.hour}
                  </option>
                );
              })}
            </PlayTimeHour>
          ) : (
            viewHour
          )}
          {" : "}
          {status !== "경기중" && status !== "경기완료" ? (
            <PlayTimeMin
              {...register("startTimeMin")}
              onChange={handleSelectMin}
              value={viewMin}
            >
              {timeMin.map((min, index) => {
                return (
                  <option key={min.min + index} value={min.min}>
                    {min.min}
                  </option>
                );
              })}
            </PlayTimeMin>
          ) : (
            viewMin
          )}
        </TableCell>
        <TableCell align="center" style={{ width: 175 }}>
          <ContestTeamScore
            type="number"
            {...register("contestTeamScore")}
            disabled={status !== "경기중" ? true : false}
            value={winScore}
            onChange={setWinScoreChange}
            min={0}
            max={99}
          />
          {" : "}
          <OpponentTeamScore
            type="number"
            {...register("opponentTeamScore")}
            disabled={status !== "경기중" ? true : false}
            value={loseScore}
            onChange={setLoseScoreChange}
            min={0}
            max={99}
          />
        </TableCell>
        <TableCell align="center" style={{ width: 100 }}>
          {status}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          align="left"
          colSpan={6}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <form onSubmit={handleSubmit(onTournamentSubmitValid)}>
            <ButtonSubmit
              type="submit"
              disabled={status === "경기완료" ? true : false}
              value={"수정적용"}
            />
          </form>

          {status !== "경기중" &&
          status !== "부전승" &&
          status !== "경기완료" ? (
            <ButtonComplete
              onClick={() => {
                onStartContest();
              }}
            >
              경기시작
            </ButtonComplete>
          ) : status === "경기중" ? (
            <ButtonComplete
              onClick={() => {
                onEndContest();
              }}
            >
              경기완료
            </ButtonComplete>
          ) : null}
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
    </>
  );
}
