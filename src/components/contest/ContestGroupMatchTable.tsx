import React, { useEffect, useState } from "react";
import { TableContainer, Paper } from "@material-ui/core";
import { gql, useMutation, useQuery } from "@apollo/client";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import GroupMatchTable from "./GroupMatchTable";
import CreateTournament from "./CreateTournament";

const UPDATE_CONTEST_MATCH_YN = gql`
  mutation updateContestMatch($contestGroupId: String) {
    updateContestMatch(contestGroupId: $contestGroupId) {
      ok
      error
    }
  }
`;

const CREATE_CONTEST_GROUP = gql`
  mutation createContestGroupMatch(
    $groupNo: Int
    $contestId: String
    $contestGroupId: String
  ) {
    createContestGroupMatch(
      groupNo: $groupNo
      contestId: $contestId
      contestGroupId: $contestGroupId
    ) {
      ok
      error
    }
  }
`;

const SEE_CONTEST_MATCH_GROUP_LIST = gql`
  query seeContestGroupMatch($contestGroupId: String) {
    seeContestGroupMatch(contestGroupId: $contestGroupId) {
      id
      groupNo
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

const HeaderColumnWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContestColumnWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContestHeaderColumn = styled.div`
  margin-left: 8px;
  cursor: pointer;
`;

const ContestHeaderText = styled.span`
  font-size: 14px;
  padding: 8px;
  border-radius: 8px;
  text-align: center;
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

export default function ContestGroupMatchTable() {
  const location = useLocation();
  const navigate = useNavigate();

  const onCompleted = (data: any) => {
    const {
      createContestGroupMatch: { ok, error },
    } = data;

    if (ok) {
      window.location.reload();
    }
  };

  const [createContestMatchGroupMutation] = useMutation<any>(
    CREATE_CONTEST_GROUP,
    {
      onCompleted,
    }
  );

  const onCompletedContestMatchYN = (data: any) => {
    const {
      updateContestMatch: { ok, error },
    } = data;

    if (ok) {
      navigate("/contest/contestGroupList", {
        state: { contestId: location.state.contestId },
      });
    }
  };

  const [updateContestMatchYNMutation] = useMutation<any>(
    UPDATE_CONTEST_MATCH_YN,
    {
      onCompleted: onCompletedContestMatchYN,
    }
  );

  const onContestMatchYN = () => {
    updateContestMatchYNMutation({
      variables: {
        contestGroupId: location.state.contestGroupId,
      },
    });
  };

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onSubmitValid: SubmitHandler<any> = (data) => {
    createContestMatchGroupMutation({
      variables: {
        ...data,
      },
    });
  };

  const { data } = useQuery(SEE_CONTEST_MATCH_GROUP_LIST, {
    variables: {
      contestGroupId: location.state.contestGroupId,
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    register("groupName");
    register("contestId");
    register("contestGroupId");
    register("groupNo");
    register("createMatchYN");
    setValue("contestId", location.state.contestId);
    setValue("contestGroupId", location.state.contestGroupId);
    setValue("groupNo", data?.seeContestGroupMatch.length + 1);
    setValue("createMatchYN", location.state.createMatchYN);
  }, [data]);

  const [visible, setVisible] = useState(false);
  let contestTeamList;

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <TableContainer component={Paper} style={{ padding: 16 }}>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <ColumnWrap>
          <ContestColumnWrap>
            <HeaderHistoryBack
              onClick={() =>
                navigate("/contest/contestGroupList", {
                  state: { contestId: location.state.contestId },
                })
              }
            >
              <IoIosArrowBack size={24} />
            </HeaderHistoryBack>
            <ContestHeaderText>
              {location.state.contestGroupName}
            </ContestHeaderText>
          </ContestColumnWrap>
          <HeaderColumnWrap>
            <ContestHeaderColumn>
              <ContestHeaderText
                style={{
                  backgroundColor: "#01AA73",
                  color: "white",
                }}
                onClick={toggleVisible}
              >
                본선 토너먼트 생성
              </ContestHeaderText>
            </ContestHeaderColumn>
            {location.state.createMatchYN ? null : (
              <>
                <ContestHeaderColumn>
                  <ContestHeaderText
                    style={{
                      backgroundColor: "#01AA73",
                      color: "white",
                    }}
                    onClick={onContestMatchYN}
                  >
                    조별경기 확정
                  </ContestHeaderText>
                </ContestHeaderColumn>

                <ContestHeaderColumn>
                  <ButtonSubmit type="submit" value={"조 추가"} />
                </ContestHeaderColumn>
              </>
            )}
          </HeaderColumnWrap>
        </ColumnWrap>
      </form>
      {data?.seeContestGroupMatch.map((item) => {
        return (
          <GroupMatchTable
            key={item.id}
            contestTeam={item.contestTeam}
            groupNo={item.groupNo}
            contestId={location.state.contestId}
            contestMatchGroupId={item.id}
            createMatchListYN={item.createMatchListYN}
          />
        );
      })}
      <CreateTournament
        contestId={location.state.contestId}
        contestGroupId={location.state.contestGroupId}
        isModal={visible}
        setIsModal={setVisible}
      />
    </TableContainer>
  );
}
