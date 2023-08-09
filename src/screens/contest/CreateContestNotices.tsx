import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createBannerVariables } from "../../__generated__/createBanner";
import { useLocation, useNavigate } from "react-router-dom";
import ContestHeader from "../../components/contest/ContestHeader";

const CREATE_CONTEST_NOTICE_MUTATION = gql`
  mutation createContestNotice(
    $contestId: String
    $noticeTitle: String
    $noticeDiscription: String
  ) {
    createContestNotice(
      contestId: $contestId
      noticeTitle: $noticeTitle
      noticeDiscription: $noticeDiscription
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

const TitleBannerContainer = styled.div`
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
  margin-bottom: 16px;
  padding: 8px;
`;

const TextEditor = styled.div`
  position: relative;
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

const TitleBannerPreview = styled.div`
  padding: 8px;
  margin-bottom: 8px;
`;

const PreviewImage = styled.img``;

function CreateContestNotice() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onCompleted = (data: any) => {
    const {
      createContestNotice: { ok, error },
    } = data;

    if (ok) {
      navigate("/contest/contestNotice", {
        state: { contestId: location.state.contestId },
      });
    }
  };

  const [createContestNoticeMutation] = useMutation<any>(
    CREATE_CONTEST_NOTICE_MUTATION,
    {
      onCompleted,
    }
  );

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const onSubmitValid: SubmitHandler<any> = (data) => {
    createContestNoticeMutation({
      variables: {
        ...data,
        contestId: location.state.contestId,
      },
    });
  };

  const QuillRef = useRef<ReactQuill>();

  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement("input");
    const formData = new FormData();
    let url = "";

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;

      if (file !== null) {
        formData.append("file", file[0]);

        // 저의 경우 파일 이미지를 서버에 저장했기 때문에
        try {
          const res = await axios.post("/api/uploads", formData);

          url = "http://localhost:4000/" + res.data.path;

          // 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드
          // 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
            );
          }

          return { ...res, success: true };
        } catch (error) {
          const err = error as AxiosError;
          return { ...err.response, success: false };
        }
      }
    };
  };

  // quill에서 사용할 모듈을 설정하는 코드 입니다.
  // 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <Container>
      <PageTitle title="대회 공지사항 관리" />
      <HeaderTitle title="대회 공지사항 관리" />
      <ContestHeader />
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <TitleInput
            {...register("noticeTitle", { required: "제목을 입력해주세요." })}
            placeholder="제목을 입력해주세요"
          />
          <TextEditor>
            <ReactQuill
              ref={(element) => {
                if (element !== null) {
                  QuillRef.current = element;
                }
              }}
              value={contents}
              onChange={(value) => {
                setContents(value);
                setValue("noticeDiscription", value);
              }}
              modules={modules}
              theme="snow"
              placeholder="내용을 입력해주세요."
              style={{ height: 400 }}
            />
          </TextEditor>
          <ButtonContainer>
            <ButtonSubmit type="submit" value={"완료"} />
            <ButtonReset type="reset" value={"취소"} />
          </ButtonContainer>
        </form>
      </InputContainer>
    </Container>
  );
}

export default CreateContestNotice;
