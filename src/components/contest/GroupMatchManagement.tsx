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
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { gql, useQuery } from "@apollo/client";
import MatchTable from "./MatchTable";
import MatchScheduleTable from "./MatchScheduleTable";
import MatchResultTable from "./MatchResultTable";
import GroupTournament from "./GroupTournament";
import TournamentScheduleTable from "./TournamentScheduleTable";

const SEE_CONTEST_MATCH_GROUP = gql`
  query seeContestMatchGroup($contestGroupId: String) {
    seeContestMatchGroup(contestGroupId: $contestGroupId) {
      id
      groupNo
      contestTierGroup {
        id
        roundAdvance
        startRound
      }
    }
  }
`;

const SEE_CONTEST_TOURNAMENT_GROUP = gql`
  query seeContestTournamentGroup($contestGroupId: String) {
    seeContestTournamentGroup(contestGroupId: $contestGroupId) {
      id
      name
      nextMatchId
      matchNo
      tournamentRoundText
      startTime
      startTimeHour
      startTimeMin
      state
      participants {
        id
        name
        isWinner
        status
        resultText
        matchNo
        contestCourt {
          id
          courtName
        }
        contestTeam {
          id
          teamName
        }
      }
    }
  }
`;

const Container = styled.div`
  padding: 16px;
`;

const TabMenu = styled.ul`
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-top: 10px;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    /* justify-content: space-between; */
    width: 100px;
    heigth: 30px;
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
    text-align: center;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(255, 255, 255);
    color: rgb(21, 20, 20);
  }

  & div.desc {
    text-align: center;
  }
`;

const ColumnWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`;

const ContestColumnWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderHistoryBack = styled.div`
  cursor: pointer;
  margin-right: 16px;
`;

let lastIndex = 0;
export default function GroupMatchManagement() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentTab, clickTab] = useState(0);
  const [visibleTournament, setVisibleTournament] = useState(false);

  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
    if (lastIndex + 1 !== index) {
      setVisibleTournament(false);
      setGroupMatchId(contestGroupNo.seeContestMatchGroup[index].id);
    } else {
      setVisibleTournament(true);
    }
  };

  const { data: contestGroupNo } = useQuery(SEE_CONTEST_MATCH_GROUP, {
    variables: { contestGroupId: location.state.contestGroupId },
  });

  const { data: contestTournament } = useQuery(SEE_CONTEST_TOURNAMENT_GROUP, {
    variables: {
      contestGroupId: location.state.contestGroupId,
    },
  });

  const [groupMatchId, setGroupMatchId] = useState();
  const [groupTierId, setGroupTierId] = useState();
  const [startRound, setStartRound] = useState();
  const [tournament, setTournament] = useState<any>([]);

  useEffect(() => {
    if (
      contestGroupNo?.seeContestMatchGroup !== undefined &&
      contestGroupNo?.seeContestMatchGroup !== null
    ) {
      setGroupMatchId(contestGroupNo.seeContestMatchGroup[0].id);
      setGroupTierId(
        contestGroupNo.seeContestMatchGroup[0].contestTierGroup.id
      );
      setStartRound(
        contestGroupNo.seeContestMatchGroup[0].contestTierGroup.startRound
      );
    }
  }, [contestGroupNo]);

  useEffect(() => {
    let array: any = [];
    let participantsArray: any = [];
    contestTournament?.seeContestTournamentGroup.map((item) => {
      participantsArray = item.participants.map((it) => {
        return {
          id: it.id,
          isWinner: it.isWinner,
          name: it.name,
          resultText: it.resultText,
          status: it.status,
          contestCourtId: it.contestCourt?.id || "",
          contestCourtName: it.contestCourt?.courtName || "",
          teamId: it.contestTeam?.id || "",
        };
      });

      let newItem = {
        id: item.id,
        name: item.name,
        nextMatchId: item.nextMatchId,
        participants: participantsArray,
        matchNo: item.matchNo,
        contestCourtId: participantsArray[0].contestCourtId,
        contestCourtName: participantsArray[0].contestCourtName,
        roundAdvance: item.roundAdvance,
        startTime: item.startTime,
        startTimeHour: item.startTimeHour,
        startTimeMin: item.startTimeMin,
        state: item.state,
        tournamentRoundText: item.tournamentRoundText,
      };
      array.push(newItem);
      setTournament(array);
    });
  }, [contestTournament]);

  return (
    <Container>
      <ColumnWrap>
        <ContestColumnWrap>
          <HeaderHistoryBack onClick={() => navigate(-1)}>
            <IoIosArrowBack size={24} />
          </HeaderHistoryBack>
        </ContestColumnWrap>
      </ColumnWrap>
      <TabMenu>
        {contestGroupNo?.seeContestMatchGroup !== undefined &&
        contestGroupNo?.seeContestMatchGroup !== null
          ? contestGroupNo?.seeContestMatchGroup?.map((item, index) => {
              lastIndex = index;
              return (
                <li
                  key={item.id}
                  className={
                    index === currentTab ? "submenu focused" : "submenu"
                  }
                  onClick={() => selectMenuHandler(index)}
                >
                  {item.groupNo + "조"}
                </li>
              );
            })
          : null}
        {contestTournament?.seeContestTournamentGroup !== undefined &&
        contestTournament?.seeContestTournamentGroup !== null ? (
          <li
            className={
              lastIndex + 1 === currentTab ? "submenu focused" : "submenu"
            }
            onClick={() => selectMenuHandler(lastIndex + 1)}
          >
            {"본선"}
          </li>
        ) : null}
      </TabMenu>
      {contestGroupNo?.seeContestMatchGroup !== undefined &&
      contestGroupNo?.seeContestMatchGroup !== null &&
      !visibleTournament ? (
        <>
          <MatchTable groupMatchId={groupMatchId} />
          <MatchResultTable
            groupMatchId={groupMatchId}
            contestId={location.state.contestId}
          />
          <MatchScheduleTable
            groupMatchId={groupMatchId}
            contestId={location.state.contestId}
          />
        </>
      ) : visibleTournament &&
        contestTournament?.seeContestTournamentGroup !== undefined &&
        contestTournament?.seeContestTournamentGroup !== null ? (
        <>
          <GroupTournament
            matches={tournament}
            groupMatchId={groupMatchId}
            contestId={location.state.contestId}
            groupTierId={groupTierId}
            roundAdvance={location.state.roundAdvance}
            startRound={startRound}
          />
          <TournamentScheduleTable
            matches={tournament}
            groupMatchId={groupMatchId}
            contestId={location.state.contestId}
          />
        </>
      ) : null}
    </Container>
  );
}
