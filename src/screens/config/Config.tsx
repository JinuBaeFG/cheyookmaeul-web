import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill-with-table";
import QuillBetterTable from "quill-better-table";
import styled from "styled-components";

interface ConfigProps {
  id?: number | undefined;
  privacyTerms?: string | undefined;
  gpsTerms?: string | undefined;
  useTerms?: string | undefined;
  businessInfo?: string | undefined;
}

const SEE_CONFIG_QUERY = gql`
  query seeConfig {
    seeConfig {
      id
      privacyTerms
      gpsTerms
      useTerms
      businessInfo
    }
  }
`;

const EDIT_CONFIG_MUTATION = gql`
  mutation editConfig(
    $id: String
    $privacyTerms: String
    $gpsTerms: String
    $useTerms: String
    $businessInfo: String
  ) {
    editConfig(
      id: $id
      privacyTerms: $privacyTerms
      gpsTerms: $gpsTerms
      useTerms: $useTerms
      businessInfo: $businessInfo
    ) {
      ok
      error
    }
  }
`;

const Container = styled.div`
  width: 100%;
`;

const InputContainer = styled.div`
  padding: 24px;
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

const Title = styled.div`
  position: relative;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
`;

Quill.register("modules/better-table", QuillBetterTable);

const Config = () => {
  const { data } = useQuery(SEE_CONFIG_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const [id, setId] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [gps, setGps] = useState("");
  const [use, setUse] = useState("");
  const [business, setBusiness] = useState("");

  const onCompleted = (data: any) => {
    const {
      editConfig: { ok, error },
    } = data;

    if (ok) {
      window.location.reload();
    }

    if (error) {
      console.log(error);
    }
  };

  const [editConfigMutation] = useMutation<ConfigProps>(EDIT_CONFIG_MUTATION, {
    onCompleted,
  });

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const onSubmitValid: SubmitHandler<ConfigProps> = (data) => {
    editConfigMutation({
      variables: {
        id: data.id,
        privacyTerms: data.privacyTerms,
        gpsTerms: data.gpsTerms,
        useTerms: data.useTerms,
        businessInfo: data.businessInfo,
      },
    });
  };

  const QuillRef = useRef<ReactQuill>();

  const insertTable = () => {
    const editor = QuillRef?.current?.getEditor();
    const tableModule = editor?.getModule("better-table");
    tableModule.insertTable(3, 3);
  };

  useEffect(() => {
    const editor = QuillRef?.current?.getEditor();
    const toolbar = editor?.getModule("toolbar");
    toolbar.addHandler("table", () => {
      insertTable();
    });
  }, []);

  // quill에서 사용할 모듈을 설정하는 코드 입니다.
  // 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.
  const modules = useMemo(
    () => ({
      table: false,
      "better-table": {
        operationMenu: {
          items: {
            unmergeCells: {
              text: "Another unmerge cells name",
            },
          },
        },
      },
      keyboard: {
        bindings: QuillBetterTable.keyboardBindings,
      },
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
          ["formula", "table"],
        ],
      },
    }),
    []
  );

  useEffect(() => {
    register("id");
    register("privacyTerms");
    register("gpsTerms");
    register("useTerms");
    register("businessInfo");
  }, [register]);

  useEffect(() => {
    setValue("id", id);
    setValue("privacyTerms", privacy);
    setValue("gpsTerms", gps);
    setValue("useTerms", use);
    setValue("businessInfo", business);
  }, [id, privacy, gps, use, business, setValue]);

  useEffect(() => {
    setId(data?.seeConfig.id || "");
    setPrivacy(data?.seeConfig.privacyTerms || "");
    setGps(data?.seeConfig.gpsTerms || "");
    setUse(data?.seeConfig.useTerms || "");
    setBusiness(data?.seeConfig.businessInfo || "");
  }, [data]);

  return (
    <Container>
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Title>개인정보처리방침 약관</Title>
          <TextEditor>
            <ReactQuill
              ref={(element) => {
                if (element !== null) {
                  QuillRef.current = element;
                }
              }}
              value={privacy || ""}
              onChange={(value) => {
                setPrivacy(value);
              }}
              modules={modules}
              theme="snow"
              placeholder="내용을 입력해주세요."
              style={{ height: 400 }}
            />
          </TextEditor>
          <Title>플레이인어스 이용 약관</Title>
          <TextEditor>
            <ReactQuill
              ref={(element) => {
                if (element !== null) {
                  QuillRef.current = element;
                }
              }}
              value={use || ""}
              onChange={(value) => {
                setUse(value);
              }}
              modules={modules}
              theme="snow"
              placeholder="내용을 입력해주세요."
              style={{ height: 400 }}
            />
          </TextEditor>
          <Title>위치정보서비스 및 위치기반서비스 이용약관</Title>
          <TextEditor>
            <ReactQuill
              ref={(element) => {
                if (element !== null) {
                  QuillRef.current = element;
                }
              }}
              value={gps || ""}
              onChange={(value) => {
                setGps(value);
              }}
              modules={modules}
              theme="snow"
              placeholder="내용을 입력해주세요."
              style={{ height: 400 }}
            />
          </TextEditor>
          <Title>사업자 정보 안내</Title>
          <TextEditor>
            <ReactQuill
              ref={(element) => {
                if (element !== null) {
                  QuillRef.current = element;
                }
              }}
              value={business || ""}
              onChange={(value) => {
                setBusiness(value);
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
};

export default Config;
