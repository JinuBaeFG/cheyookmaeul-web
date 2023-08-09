import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import ContestHeader from "../../components/contest/ContestHeader";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import FindUserModal from "../../components/contest/FindUserModal";

const SEARCH_TEAM = gql`
  mutation findTeam($contestId: String, $teamName: String) {
    findTeam(contestId: $contestId, teamName: $teamName) {
      ok
      info
      contestTeamId
    }
  }
`;

const CREATE_CONTEST_USER_MUTATION = gql`
  mutation createContestUser(
    $teamName: String
    $userAge: String
    $userGender: String
    $userTier: String
    $contestSports: String
    $contestSportsType: String
    $contestId: String
    $userId: String
  ) {
    createContestUser(
      teamName: $teamName
      userAge: $userAge
      userGender: $userGender
      userTier: $userTier
      contestSports: $contestSports
      contestSportsType: $contestSportsType
      contestId: $contestId
      userId: $userId
    ) {
      ok
      error
    }
  }
`;

const Container = styled.div`
  flex: 1;
  flex-direction: row;
  width: 100%;
`;

const TitleContestContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputContainer = styled.div`
  padding: 24px;
`;

const InputBox = styled.div`
  position: relative;
  margin-right: 8px;
`;

const TitleInput = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
`;

const DeleteInput = styled.span`
  position: absolute;
  right: 0;
  top: 10px;
  width: 24px;
  height: 24px;
  font-size: 8px;
  border-radius: 16px;
  cursor: pointer;
`;

const TextEditor = styled.div`
  position: relative;
  margin-bottom: 100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 48px;
`;

const ButtonSubmit = styled.input`
  padding: 8px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  border: 1px solid ${(props) => props.theme.menuColor};
  cursor: pointer;
  margin: 4px;
`;

const ButtonReset = styled.input`
  padding: 8px;
  background-color: ${(props) => props.theme.whiteColor};
  color: ${(props) => props.theme.menuColor};
  border: 1px solid ${(props) => props.theme.menuColor};
  cursor: pointer;
  margin: 4px;
`;

const SearchButton = styled.div`
  padding: 8px;
  background-color: ${(props) => props.theme.whiteColor};
  color: ${(props) => props.theme.menuColor};
  border: 1px solid ${(props) => props.theme.menuColor};
  cursor: pointer;
  margin: 4px;
`;

const RadioContainer = styled.div`
  margin-bottom: 16px;
`;

const RadioFieldSet = styled.fieldset`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RadioLabel = styled.label`
  margin: 0 8px;
`;

const RadioBtn = styled.input``;

const InputTitle = styled.div`
  padding: 8px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  font-weight: 600;
  margin-right: 8px;
`;

function CreateContestUser() {
  const navigate = useNavigate();
  const location = useLocation();

  // 등록 완료 뒤 리스트로 이동
  const onCompleted = (data: any) => {
    const {
      createContestUser: { ok, error },
    } = data;

    if (ok) {
      navigate("/contest/contestUserList", {
        state: {
          contestId: location.state.contestId,
          contestSports: location.state.contestSports,
          contestSportsDetail: location.state.contestSportsDetail,
        },
      });
    }
  };

  // 등록
  const [createContestMutation] = useMutation<any>(
    CREATE_CONTEST_USER_MUTATION,
    {
      onCompleted,
    }
  );

  // 등록 폼
  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onSubmitValid: SubmitHandler<any> = (data) => {
    createContestMutation({
      variables: {
        ...data,
      },
    });
  };

  // 참가자 이름
  const [username, setUsername] = useState("");
  const [partnername, setPartnername] = useState("");

  // 모달 창 토글
  const [isVisible, setIsVisible] = useState(false);
  const [find, setFind] = useState("");

  const toggleVisible = (findname) => {
    setFind(findname);
    setIsVisible(!isVisible);
  };

  // 대회 아이디 세팅
  useEffect(() => {
    register("contestId");
    register("partnerId");
    setValue("contestId", location.state.contestId);
    setValue("contestSports", location.state.contestSports);
  }, []);

  const [sportsType, setSportsType] = useState<any>([]);

  const settingSportsType = () => {
    const sportsDetail = location.state.contestSportsDetail;
    const sportsType = sportsDetail.split("/");
    setSportsType(sportsType);
  };

  useEffect(() => {
    settingSportsType();
  }, []);

  const onSearchCompleted = (data: any) => {
    const {
      findTeam: { ok, info },
    } = data;

    if (ok) {
      window.confirm(info);
    } else {
      alert(info);
      setValue("teamName", "");
    }
  };

  const [findTeamMutation] = useMutation(SEARCH_TEAM, {
    onCompleted: onSearchCompleted,
  });

  const onSearchTeam = ({ teamName }) => {
    findTeamMutation({
      variables: { contestId: location.state.contestId, teamName },
    });
  };

  return (
    <Container>
      <PageTitle title="참가자 등록" />
      <HeaderTitle title="참가자 등록" />
      <ContestHeader />
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <TitleContestContainer>
            <InputTitle>대회코드</InputTitle>
            <TitleInput
              {...register("contestId")}
              defaultValue={location.state.contestId}
              style={{ width: 200 }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>참가자</InputTitle>
            <TitleInput
              readOnly
              {...register("username")}
              value={username}
              placeholder="클릭하여 참가자를 검색하세요."
              style={{ width: 200 }}
              onClick={() => toggleVisible("username")}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>종목</InputTitle>
            <TitleInput
              {...register("contestSports")}
              placeholder="종목을 입력해주세요."
              style={{ width: 200 }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>종목 타입</InputTitle>
            <RadioFieldSet>
              {sportsType.map((item) => {
                return (
                  <>
                    <RadioBtn
                      {...register("contestSportsType")}
                      id={item}
                      type="radio"
                      name="contestSportsType"
                      value={item}
                    />
                    <RadioLabel htmlFor={item}>{item}</RadioLabel>
                  </>
                );
              })}
            </RadioFieldSet>
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>팀명</InputTitle>
            <TitleInput
              {...register("teamName", { required: true })}
              placeholder="팀명을 입력해주세요."
              style={{ width: 200 }}
            />
            <SearchButton
              onClick={() => {
                onSearchTeam({ teamName: getValues("teamName") });
              }}
            >
              중복확인
            </SearchButton>
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>참가자 등급</InputTitle>
            <TitleInput
              {...register("userTier")}
              placeholder="참가자 등급을 입력해주세요."
              style={{ width: 200 }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>참가자 나이</InputTitle>
            <TitleInput
              {...register("userAge")}
              onChange={(e) => {
                setValue("userAge", parseInt(e.target.value));
                console.log(e.target.value);
              }}
              placeholder="참가자 나이를 입력해주세요."
              style={{ width: 200 }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>참가자 성별</InputTitle>
            <TitleInput
              {...register("userGender")}
              placeholder="참가자 셩별을 입력해주세요."
              style={{ width: 200 }}
            />
          </TitleContestContainer>
          <ButtonContainer>
            <ButtonSubmit type="submit" value={"완료"} />
            <ButtonReset
              type="reset"
              value={"취소"}
              onClick={() => navigate(-1)}
            />
          </ButtonContainer>
        </form>
      </InputContainer>
      <FindUserModal
        find={find}
        setPartner={setPartnername}
        setUsername={setUsername}
        setValues={setValue}
        isModal={isVisible}
        setIsModal={setIsVisible}
      />
    </Container>
  );
}

export default CreateContestUser;
