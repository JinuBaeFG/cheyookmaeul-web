import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import ContestCheckBox from "../ContestCheckBox";
import useCheckGroup from "../../hooks/useCheckGroup";

const CREATE_CONTEST_GROUP_MATCH_HISTORY = gql`
  mutation createContestGroupMatchHistory(
    $contestId: String
    $contestTeam: [InputContestTeam]
    $contestMatchGroupId: String
  ) {
    createContestGroupMatchHistory(
      contestId: $contestId
      contestTeam: $contestTeam
      contestMatchGroupId: $contestMatchGroupId
    ) {
      ok
      error
    }
  }
`;

const SEARCH_CONTEST_TEAM_QUERY = gql`
  query seeContestTeams($contestId: String) {
    seeContestTeams(contestId: $contestId) {
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
`;

const ModalContainer = styled.div`
  position: relative;
`;

const SearchResultBox = styled.div`
  width: 100%;
  height: calc(100% - 16px);
  padding: 8px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const SearchResultRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

const SearchResultName = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
`;

const SearchResultEmail = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`;

const ContestListButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
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
const ModalStyles = {
  content: {
    width: "50%",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function AddMatchTable({
  groupNo,
  contestId,
  contestMatchGroupId,
  match,
  setIsModal,
  isModal,
}: any) {
  const [contestTeam, setContestTeam] = useState<any>([]);

  const onCompleted = (data: any) => {
    const {
      createContestGroupMatchHistory: { ok, error },
    } = data;

    if (ok) {
      window.location.reload();
    }
  };

  const [createContestGroupMatchHistoryMutation] = useMutation<any>(
    CREATE_CONTEST_GROUP_MATCH_HISTORY,
    {
      onCompleted,
    }
  );

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onSubmitValid: SubmitHandler<any> = (data) => {
    createContestGroupMatchHistoryMutation({
      variables: {
        ...data,
      },
    });
  };

  const { data } = useQuery(SEARCH_CONTEST_TEAM_QUERY, {
    variables: {
      contestId,
    },
    fetchPolicy: "network-only",
  });
  let [searchTeam, setSearchTeam] = useState([]);

  const { checkedSet, addToSet, deleteToSet, clearSet, replaceSet } =
    useCheckGroup();

  const onCheckHandler = (checked, id) => {
    if (checked) {
      addToSet(id);
      setContestTeam([{ id }, ...contestTeam]);

      return;
    }
    setContestTeam(contestTeam.filter((contestTeam) => contestTeam.id !== id));
    deleteToSet(id);
  };

  useEffect(() => {
    register("contestId");
    register("contestTeam");
    register("contestMatchGroupId");
  }, []);

  useEffect(() => {
    setSearchTeam(data?.seeContestTeams);
    setValue("contestId", contestId);
    setValue("contestMatchGroupId", contestMatchGroupId);
  }, [data]);

  useEffect(() => {
    setValue("contestTeam", contestTeam);
  }, [contestTeam]);

  return (
    <Modal
      isOpen={isModal}
      onRequestClose={() => setIsModal(false)}
      ariaHideApp={false}
      style={ModalStyles}
    >
      <ContestListButtonWrap>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <ButtonSubmit type="submit" value={"추가"} />
        </form>
      </ContestListButtonWrap>
      <ModalContainer>
        {searchTeam !== null && searchTeam !== undefined
          ? searchTeam.map((item: any) => {
              return (
                <SearchResultBox key={item.id}>
                  <SearchResultRow>
                    <ContestCheckBox
                      id={item.id}
                      onCheck={onCheckHandler}
                      checked={checkedSet.has(item.id)}
                    />
                    <SearchResultName>{item.teamName}</SearchResultName>
                    {item.contestUser.map((item) => {
                      return (
                        <SearchResultEmail key={item.id}>
                          팀원 : {item.user.username}
                        </SearchResultEmail>
                      );
                    })}
                  </SearchResultRow>
                </SearchResultBox>
              );
            })
          : null}
      </ModalContainer>
    </Modal>
  );
}
