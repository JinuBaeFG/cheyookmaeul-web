import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import ContestCheckBox from "../ContestCheckBox";
import useCheckGroup from "../../hooks/useCheckGroup";

const CREATE_CONTEST_TOURNAMENT = gql`
  mutation createContestTournament(
    $contestId: String
    $contestGroupId: String
    $totalRound: Int
    $roundAdvance: Int
  ) {
    createContestTournament(
      contestId: $contestId
      contestGroupId: $contestGroupId
      totalRound: $totalRound
      roundAdvance: $roundAdvance
    ) {
      ok
      error
    }
  }
`;

const ModalContainer = styled.div`
  position: relative;
`;

const RadioContainer = styled.div`
  margin-bottom: 16px;
`;

const RadioFieldSet = styled.fieldset`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputTitle = styled.div`
  padding: 8px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  font-weight: 600;
`;

const RadioLabel = styled.label`
  margin: 0 8px;
`;

const RadioBtn = styled.input``;

const ContestListButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ContestHeaderColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonSubmit = styled.input`
  padding: 8px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  border: 1px solid ${(props) => props.theme.menuColor};
  border-radius: 8px;
  cursor: pointer;
  margin: 8px;
`;

const ModalStyles = {
  content: {
    width: "50%",
    height: "25%",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function CreateTournament({
  contestId,
  contestGroupId,
  setIsModal,
  isModal,
}: any) {
  const onCompleted = (data: any) => {
    const {
      createContestTournament: { ok, error },
    } = data;

    if (ok) {
      window.location.reload();
    }
  };

  const [createContestTournamentMutation] = useMutation<any>(
    CREATE_CONTEST_TOURNAMENT,
    {
      onCompleted,
    }
  );

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onSubmitValid: SubmitHandler<any> = (data) => {
    data.totalRound = parseInt(data.totalRound);
    data.roundAdvance = parseInt(data.roundAdvance);
    createContestTournamentMutation({
      variables: {
        ...data,
      },
    });
  };

  useEffect(() => {
    register("contestId");
    register("contestGroupId");
    register("totalRound");
    register("roundAdvance");
    setValue("contestId", contestId);
    setValue("contestGroupId", contestGroupId);
  }, []);

  const onTournamentChange = (e) => {
    setValue("totalRound", parseInt(e.target.value));
    e.target.checked = true;
  };

  const onRoundAdvanceChange = (e) => {
    setValue("roundAdvance", parseInt(e.target.value));
    e.target.checked = true;
  };

  return (
    <Modal
      isOpen={isModal}
      onRequestClose={() => setIsModal(false)}
      ariaHideApp={false}
      style={ModalStyles}
    >
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <ContestListButtonWrap>
          <RadioContainer>
            <RadioFieldSet onChange={onTournamentChange}>
              <InputTitle>토너먼트</InputTitle>
              <RadioBtn
                {...register("totalRound")}
                id="final"
                type="radio"
                name="tournament"
                value={2}
                defaultChecked
              />
              <RadioLabel htmlFor="final">결승</RadioLabel>
              <RadioBtn
                {...register("totalRound")}
                id="semi"
                type="radio"
                name="tournament"
                value={4}
              />
              <RadioLabel htmlFor="semi">4강</RadioLabel>
              <RadioBtn
                {...register("totalRound")}
                id="quarter"
                type="radio"
                name="tournament"
                value={8}
              />
              <RadioLabel htmlFor="quarter">8강</RadioLabel>
              <RadioBtn
                {...register("totalRound")}
                id="roundsixteen"
                type="radio"
                name="tournament"
                value={16}
              />
              <RadioLabel htmlFor="roundsixteen">16강</RadioLabel>
              <RadioBtn
                {...register("totalRound")}
                id="roundthirtytwo"
                type="radio"
                name="tournament"
                value={32}
              />
              <RadioLabel htmlFor="roundthirtytwo">32강</RadioLabel>
              <RadioBtn
                {...register("totalRound")}
                id="roundsixrtfour"
                type="radio"
                name="tournament"
                value={64}
              />
              <RadioLabel htmlFor="roundsixrtfour">64강</RadioLabel>
            </RadioFieldSet>
          </RadioContainer>
          <RadioContainer>
            <RadioFieldSet onChange={onRoundAdvanceChange}>
              <InputTitle>진출순위</InputTitle>
              <RadioBtn
                {...register("roundAdvance")}
                id="first"
                type="radio"
                name="round"
                value={1}
                defaultChecked
              />
              <RadioLabel htmlFor="first">조별1위</RadioLabel>
              <RadioBtn
                {...register("roundAdvance")}
                id="second"
                type="radio"
                name="round"
                value={2}
              />
              <RadioLabel htmlFor="second">조별2위</RadioLabel>
            </RadioFieldSet>
          </RadioContainer>
          <ContestHeaderColumn>
            <ButtonSubmit type="submit" value={"생성"} />
          </ContestHeaderColumn>
        </ContestListButtonWrap>
      </form>
    </Modal>
  );
}
