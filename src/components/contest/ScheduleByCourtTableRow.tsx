import { gql, useMutation, useQuery } from "@apollo/client";
import { TableCell, TableRow } from "@material-ui/core";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

const UPDATE_CONTEST_GROUP_END = gql`
  mutation updateContestGroupEnd(
    $id: String
    $contestId: String
    $contestMatchGroupId: String
    $contestTeamId: String
    $contestCourtId: String
    $matchNo: Int
    $matchTimeHour: String
    $matchTimeMin: String
    $opponentTeamId: String
    $contestTeamScore: Int
    $opponentTeamScore: Int
  ) {
    updateContestGroupEnd(
      id: $id
      contestId: $contestId
      contestMatchGroupId: $contestMatchGroupId
      contestTeamId: $contestTeamId
      contestCourtId: $contestCourtId
      matchNo: $matchNo
      matchTimeHour: $matchTimeHour
      matchTimeMin: $matchTimeMin
      opponentTeamId: $opponentTeamId
      contestTeamScore: $contestTeamScore
      opponentTeamScore: $opponentTeamScore
    ) {
      ok
      error
    }
  }
`;

const UPDATE_CONTEST_GROUP_START = gql`
  mutation updateContestGroupStart(
    $id: String
    $contestTeamId: String
    $opponentTeamId: String
  ) {
    updateContestGroupStart(
      id: $id
      contestTeamId: $contestTeamId
      opponentTeamId: $opponentTeamId
    ) {
      ok
      error
    }
  }
`;

const UPDATE_CONTEST_GROUP_HISTORY = gql`
  mutation updateContestGroupHistory(
    $id: String
    $contestId: String
    $contestMatchGroupId: String
    $contestTeamId: String
    $contestCourtId: String
    $matchNo: Int
    $matchTimeHour: String
    $matchTimeMin: String
    $opponentTeamId: String
    $contestTeamScore: Int
    $opponentTeamScore: Int
  ) {
    updateContestGroupHistory(
      id: $id
      contestId: $contestId
      contestMatchGroupId: $contestMatchGroupId
      contestTeamId: $contestTeamId
      contestCourtId: $contestCourtId
      matchNo: $matchNo
      matchTimeHour: $matchTimeHour
      matchTimeMin: $matchTimeMin
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
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

export default function ScheduleByCourtTableRow({
  contestTeam,
  contestId,
  groupMatchId,
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
      updateContestGroupHistory: { ok },
    } = data;

    if (ok) {
      alert("적용되었습니다.");
      //window.location.reload();
    }
  };

  const [updateContestGroupHistoryMutation] = useMutation<any>(
    UPDATE_CONTEST_GROUP_HISTORY,
    {
      onCompleted,
    }
  );

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onSubmitValid: SubmitHandler<any> = (data) => {
    data.contestCourtId = selected;
    data.contestTeamScore = parseInt(data.contestTeamScore);
    data.opponentTeamScore = parseInt(data.opponentTeamScore);
    data.matchNo = parseInt(data.matchNo);

    updateContestGroupHistoryMutation({
      variables: {
        ...data,
      },
    });
  };

  const onStartCompleted = (data: any) => {
    const {
      updateContestGroupStart: { ok },
    } = data;

    if (ok) {
      alert("적용되었습니다.");
      //window.location.reload();
    }
  };

  const [updateContestGroupStartMutation] = useMutation<any>(
    UPDATE_CONTEST_GROUP_START,
    {
      onCompleted: onStartCompleted,
    }
  );

  const onStartContest = () => {
    const { id, contestTeamId, opponentTeamId } = getValues();
    setStatus("경기중");

    updateContestGroupStartMutation({
      variables: {
        id,
        contestTeamId,
        opponentTeamId,
      },
    });
  };

  const onEndCompleted = (data: any) => {
    const {
      updateContestGroupEnd: { ok },
    } = data;

    if (ok) {
      alert("적용되었습니다.");
      //window.location.reload();
    }
  };

  const [updateContestGroupEndMutation] = useMutation<any>(
    UPDATE_CONTEST_GROUP_END,
    {
      onCompleted: onEndCompleted,
    }
  );

  const onEndContest = () => {
    if (
      window.confirm("경기 완료 처리 시 수정이 불가능합니다. 적용하시겠습니까?")
    ) {
      const {
        contestId,
        contestMatchGroupId,
        contestTeamId,
        contestCourtId,
        matchNo,
        matchTimeHour,
        matchTimeMin,
        opponentTeamId,
        contestTeamScore,
        opponentTeamScore,
      } = getValues();
      setStatus("경기완료");

      updateContestGroupEndMutation({
        variables: {
          contestId,
          contestMatchGroupId,
          contestTeamId,
          contestCourtId,
          matchNo,
          matchTimeHour,
          matchTimeMin,
          opponentTeamId,
          contestTeamScore: parseInt(contestTeamScore),
          opponentTeamScore: parseInt(opponentTeamScore),
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
    setValue("id", contestTeam?.id);
    setValue("contestId", contestId);
    setValue("contestMatchGroupId", groupMatchId);
    setValue("contestTeamId", contestTeam?.contestTeam.id);
    setValue("opponentTeamId", contestTeam?.opponentTeam.id);
    setValue("contestTeamScore", contestTeam?.winScore || 0);
    setValue("opponentTeamScore", contestTeam?.loseScore || 0);
    setValue("matchNo", contestTeam?.matchNo);
    setValue("matchTimeHour", contestTeam.matchTimeHour || "00");
    setValue("matchTimeMin", contestTeam.matchTimeMin || "00");
    setValue(
      "contestCourtId",
      contestTeam?.contestCourt?.id || contestCourt?.seeContestCourt[0].id
    );
    setWinScore(contestTeam?.winScore || 0);
    setLoseScore(contestTeam?.loseScore || 0);
    setSelected(
      contestTeam?.contestCourt?.id || contestCourt?.seeContestCourt[0].id
    );
  }, [register, setValue, contestId, groupMatchId, contestTeam]);

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
  const [viewHour, setViewHour] = useState(contestTeam.matchTimeHour || "00");
  const [timeMin, setTimemin] = useState<any>([]);
  const [viewMin, setViewMin] = useState(contestTeam.matchTimeMin || "00");
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
    switch (contestTeam?.status) {
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
        setStatus("미정");
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
        <TableCell align="left">
          <Row>
            <TeamName>{contestTeam?.contestTeam.teamName}</TeamName>
            {contestTeam?.contestTeam.contestUser.map((ct, index) => {
              return (
                <SpanRow key={ct.id}>{`팀원 ${index + 1} : ${
                  ct.user.username
                }`}</SpanRow>
              );
            })}
          </Row>
          <Row>
            <TeamName>{contestTeam?.opponentTeam.teamName}</TeamName>
            {contestTeam?.opponentTeam.contestUser.map((ct, index) => {
              return (
                <SpanRow key={ct.id}>{`팀원 ${index + 1} : ${
                  ct.user.username
                }`}</SpanRow>
              );
            })}
          </Row>
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
            contestTeam?.contestCourt?.courtName
          )}
        </TableCell>
        <TableCell align="center" style={{ width: 100 }}>
          {status !== "경기중" && status !== "경기완료" ? (
            <MatchNoInput {...register("matchNo")} />
          ) : (
            contestTeam?.matchNo
          )}
        </TableCell>
        <TableCell align="center" style={{ width: 175 }}>
          {status !== "경기중" && status !== "경기완료" ? (
            <PlayTimeHour
              {...register("matchTimeHour")}
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
              {...register("matchTimeMin")}
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
          <form onSubmit={handleSubmit(onSubmitValid)}>
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
      </TableRow>
    </>
  );
}
