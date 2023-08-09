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
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import FindUserModal from "../../components/contest/FindUserModal";

const SEARCH_TEAM = gql`
  mutation findTeam($teamName: String) {
    findTeam(teamName: $teamName) {
      ok
      info
      contestTeamId
    }
  }
`;

const SEE_CONTEST_USER = gql`
  query seeEditContestUser($id: String) {
    seeEditContestUser(id: $id) {
      id
      contest {
        contestId
        contestName
      }
      contestTeam {
        id
        teamName
        contestUser {
          user {
            id
            username
            avatar
          }
        }
      }
      user {
        id
        username
        avatar
        phoneNumber
      }
      userAge
      userGender
      userTier
      contestSports
      contestSportsType
      contestPaymentStatus
    }
  }
`;

const EDIT_CONTEST_USER_MUTATION = gql`
  mutation editContestUser(
    $id: String
    $teamName: String
    $userAge: Int
    $userGender: String
    $userTier: String
    $contestSports: String
    $contestSportsType: String
    $userId: Int
  ) {
    editContestUser(
      id: $id
      teamName: $teamName
      userAge: $userAge
      userGender: $userGender
      userTier: $userTier
      contestSports: $contestSports
      contestSportsType: $contestSportsType
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

const TitleInput = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
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

const InputTitle = styled.div`
  padding: 8px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  font-weight: 600;
  margin-right: 8px;
`;

const RadioLabel = styled.label`
  margin: 0 8px;
`;

const RadioBtn = styled.input``;

const TitleContestPreview = styled.div`
  padding: 8px;
  margin-bottom: 8px;
`;

const PreviewImage = styled.img``;

function EditContestUser() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useQuery(SEE_CONTEST_USER, {
    variables: {
      id: location.state.id,
    },
  });

  const onCompleted = (data: any) => {
    const {
      editContestUser: { ok, error },
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

    if (error) {
      alert(error);
    }
  };

  const [editContestMutation] = useMutation<any>(EDIT_CONTEST_USER_MUTATION, {
    onCompleted,
  });

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onSubmitValid: SubmitHandler<any> = (data) => {
    editContestMutation({
      variables: {
        ...data,
      },
    });
  };

  const [username, setUsername] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [findTeamVisible, setFindTeamVisible] = useState(false);
  const [find, setFind] = useState("");
  const toggleVisible = (findname) => {
    setFind(findname);
    setIsVisible(!isVisible);
  };

  const [sportsType, setSportsType] = useState<any>([]);

  const settingSportsType = () => {
    const sportsDetail = location.state.contestSportsDetail;
    const sportsType = sportsDetail.split("/");
    setSportsType(sportsType);
  };

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
      variables: {
        teamName,
      },
    });
  };

  useEffect(() => {
    register("id");
    register("contestId");
    setValue("contestId", location.state.contestId);
    setValue("id", location.state.id);
    setValue("username", data?.seeEditContestUser?.user?.username || "");
    setValue("contestSports", data?.seeEditContestUser.contestSports || "");
    setValue(
      "contestSportsType",
      data?.seeEditContestUser.contestSportsType || ""
    );
    settingSportsType();
    setValue("teamName", data?.seeEditContestUser.contestTeam?.teamName || "");
    setValue("userTier", data?.seeEditContestUser?.userTier || "");
    setValue("userAge", data?.seeEditContestUser?.userAge || "");
    setValue("userGender", data?.seeEditContestUser?.userGender || "");
  }, [data]);

  return (
    <Container>
      <PageTitle title="참가자 정보 수정" />
      <HeaderTitle title="참가자 정보 수정" />
      <ContestHeader />
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <TitleContestContainer>
            <InputTitle>대회코드</InputTitle>
            <TitleInput
              {...register("contestId")}
              defaultValue={location.state.contestId}
              disabled={true}
              style={{ width: 200 }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>대회명</InputTitle>
            <TitleInput
              defaultValue={data?.seeEditContestUser.contest.contestName}
              disabled={true}
              style={{ width: 200 }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>참가자</InputTitle>
            <TitleInput
              {...register("username")}
              disabled={true}
              defaultValue={username}
              placeholder="클릭하여 참가자를 검색하세요."
              style={{ width: 200 }}
              onClick={() => toggleVisible("username")}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>종목 타입</InputTitle>
            <RadioFieldSet>
              {sportsType.map((item) => {
                return (
                  <span key={item}>
                    <RadioBtn
                      {...register("contestSportsType")}
                      id={item}
                      type="radio"
                      name="contestSportsType"
                      value={item}
                    />
                    <RadioLabel htmlFor={item}>{item}</RadioLabel>
                  </span>
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
              placeholder="참가자 셩별을 입력해주세요."
              style={{ width: 200 }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>참가자 나이</InputTitle>
            <TitleInput
              {...register("userAge")}
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
        setUsername={setUsername}
        setValues={setValue}
        isModal={isVisible}
        setIsModal={setIsVisible}
      />
    </Container>
  );
}

export default EditContestUser;
