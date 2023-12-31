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
import axios, { AxiosError } from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./contest.css";
import { ko } from "date-fns/esm/locale";
import Modal from "react-modal";
import AddressModal from "../../components/AddressModal";
import moment from "moment";

const CREATE_CONTEST_MUTATION = gql`
  mutation createContest(
    $contestName: String
    $contestStartDate: String
    $contestEndDate: String
    $contestRecruitStart: String
    $contestRecruitEnd: String
    $buildingNumber: String
    $dongEubMyunName: String
    $gusiName: String
    $riName: String
    $roadName: String
    $sidoName: String
    $zipcode: String
    $areaLatitude: String
    $areaLongitude: String
    $contestPlaceAddress: String
    $contestStadium: String
    $contestHost: String
    $contestSponsorShip: String
    $contestSports: String
    $contestSportsDetail: String
    $contestDiscription: String
    $contestTerms: String
    $contestAwardDetails: String
    $contestEntryFee: String
    $address: String
    $addrRoad: String
    $activeArea: String
    $contestRecruitNumber: Int
    $contestBanner: Upload
  ) {
    createContest(
      contestName: $contestName
      contestStartDate: $contestStartDate
      contestEndDate: $contestEndDate
      contestRecruitStart: $contestRecruitStart
      contestRecruitEnd: $contestRecruitEnd
      contestHost: $contestHost
      buildingNumber: $buildingNumber
      dongEubMyunName: $dongEubMyunName
      gusiName: $gusiName
      riName: $riName
      roadName: $roadName
      sidoName: $sidoName
      zipcode: $zipcode
      areaLatitude: $areaLatitude
      areaLongitude: $areaLongitude
      contestPlaceAddress: $contestPlaceAddress
      contestStadium: $contestStadium
      contestSponsorShip: $contestSponsorShip
      contestSports: $contestSports
      contestSportsDetail: $contestSportsDetail
      contestDiscription: $contestDiscription
      contestTerms: $contestTerms
      contestAwardDetails: $contestAwardDetails
      contestEntryFee: $contestEntryFee
      contestBanner: $contestBanner
      activeArea: $activeArea
      addrRoad: $addrRoad
      address: $address
      contestRecruitNumber: $contestRecruitNumber
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
  min-width: 100px;
  text-align: center;
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

function CreateContest() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [contents, setContents] = useState("");
  const [terms, setTerms] = useState("");
  const [award, setAward] = useState("");
  const [imgSrc, setImgSrc] = useState<any>("");
  const navigate = useNavigate();

  const onCompleted = (data: any) => {
    const {
      createContest: { ok, error },
    } = data;

    if (ok) {
      navigate("/contest/ContestList");
    }
  };

  const [createContestMutation] = useMutation<any>(CREATE_CONTEST_MUTATION, {
    onCompleted,
  });

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onSubmitValid: SubmitHandler<any> = (data) => {
    data.contestRecruitNumber = parseInt(data.contestRecruitNumber);
    createContestMutation({
      variables: {
        ...data,
      },
    });
  };

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        let url = reader.result;
        setImgSrc(url);
      };

      setValue("contestBanner", e.target.files);
    },
    []
  );

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

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

  const QuillRef2 = useRef<ReactQuill>();

  // 이미지를 업로드 하기 위한 함수
  const imageHandler2 = () => {
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
          const range = QuillRef2.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef2.current?.getEditor();

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

  const QuillRef3 = useRef<ReactQuill>();

  // 이미지를 업로드 하기 위한 함수
  const imageHandler3 = () => {
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
          const range = QuillRef2.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef2.current?.getEditor();

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

  const modules2 = useMemo(
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
          image: imageHandler2,
        },
      },
    }),
    []
  );

  const modules3 = useMemo(
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
          image: imageHandler3,
        },
      },
    }),
    []
  );

  useEffect(() => {
    register("contestName");
    register("contestStartDate");
    register("contestEndDate");
    register("contestRecruitStart");
    register("contestRecruitEnd");
    register("buildingNumber");
    register("dongEubMyunName");
    register("gusiName");
    register("riName");
    register("roadName");
    register("sidoName");
    register("zipcode");
    register("areaLatitude");
    register("areaLongitude");
    register("contestPlaceAddress");
    register("contestStadium");
    register("contestHost");
    register("contestSponsorShip");
    register("contestSports");
    register("contestSportsDetail");
    register("contestDiscription");
    register("contestTerms");
    register("contestEntryFee");
    register("contestRecruitNumber");
    register("contestAwardDetails");
  }, []);

  const [recruitStart, setRecruitStart] = useState<any>(new Date());
  const [recruitEnd, setRecruitEnd] = useState<any>(new Date());
  const [contestStart, setContestStart] = useState<any>(new Date());
  const [contestEnd, setContestEnd] = useState<any>(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Container>
      <PageTitle title="배너관리" />
      <HeaderTitle title="배너관리" />
      <ContestHeader />
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <TitleContestContainer>
            <InputTitle>대회명</InputTitle>
            <TitleInput
              {...register("contestName", { required: "제목을 입력해주세요." })}
              placeholder="제목을 입력해주세요"
              style={{ width: "80%" }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>종목</InputTitle>
            <TitleInput
              {...register("contestSports", {
                required: "종목을 입력해주세요.",
              })}
              placeholder="종목을 입력해주세요."
              style={{ width: 200 }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>종목 상세</InputTitle>
            <TitleInput
              {...register("contestSportsDetail", {
                required: "상세 종목을 입력해주세요.",
              })}
              placeholder="상세 종목을 입력해주세요.(여러개일 경우 '/' 로 구분하여 작성해주세요.)"
              style={{ width: "80%" }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>배너 이미지</InputTitle>
            <input
              {...register("contestBanner")}
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={onUploadImage}
            />
            <input type="button" onClick={onUploadImageButtonClick} />
          </TitleContestContainer>
          {imgSrc !== "" ? (
            <TitleContestPreview>
              <PreviewImage src={imgSrc} />
            </TitleContestPreview>
          ) : null}
          <TitleContestContainer>
            <InputTitle>대회 장소</InputTitle>
            <TitleInput
              {...register("contestPlaceAddress")}
              placeholder="대회 장소를 입력해주세요."
              style={{ width: "80%" }}
              onClick={toggleVisible}
              value={getValues("contestPlaceAddress")}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>대회 경기장</InputTitle>
            <TitleInput
              {...register("contestStadium")}
              placeholder="경기장 이름을 입력해주세요."
              style={{ width: "80%" }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>대회 모집 기간</InputTitle>
            <DatePicker
              selected={recruitStart}
              selectsStart
              style={{ width: 500 }}
              value={recruitStart}
              className="input-datepicker"
              startDate={recruitStart}
              onChange={(date) => {
                setRecruitStart(date);
                setValue("contestRecruitStart", date);
              }}
              dateFormat="yyyy-MM-dd h:mm aa"
              locale={ko}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
            />
            {" ~ "}
            <DatePicker
              selected={recruitEnd}
              selectsEnd
              style={{ width: 500 }}
              value={recruitEnd}
              className="input-datepicker"
              endDate={recruitEnd}
              onChange={(date) => {
                setRecruitEnd(date);
                setValue("contestRecruitEnd", date);
              }}
              dateFormat="yyyy-MM-dd h:mm aa"
              locale={ko}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>대회 일정 기간</InputTitle>
            <DatePicker
              selected={contestStart}
              selectsStart
              value={contestStart}
              className="input-datepicker"
              startDate={contestStart}
              onChange={(date) => {
                setContestStart(date);
                setValue("contestStartDate", date);
              }}
              dateFormat="yyyy-MM-dd h:mm aa"
              locale={ko}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
            />
            {" ~ "}
            <DatePicker
              selected={contestEnd}
              selectsEnd
              value={contestEnd}
              className="input-datepicker"
              endDate={contestEnd}
              onChange={(date) => {
                setContestEnd(date);
                setValue("contestEndDate", date);
              }}
              dateFormat="yyyy-MM-dd h:mm aa"
              locale={ko}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>대회주최</InputTitle>
            <TitleInput
              {...register("contestHost")}
              placeholder="대회주최을 입력해주세요"
              style={{ width: "80%" }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>대회후원</InputTitle>
            <TitleInput
              {...register("contestSponsorShip")}
              placeholder="대회후원을 입력해주세요"
              style={{ width: "80%" }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>참가비</InputTitle>
            <TitleInput
              {...register("contestEntryFee")}
              type="number"
              min={0}
              placeholder="참가비를 입력해주세요"
              style={{ width: "80%" }}
            />
          </TitleContestContainer>
          <TitleContestContainer>
            <InputTitle>모집인원</InputTitle>
            <TitleInput
              {...register("contestRecruitNumber")}
              type="number"
              min={0}
              placeholder="모집인원을 입력해주세요"
              style={{ width: "80%" }}
            />
          </TitleContestContainer>
          <div>
            <TitleContestContainer>
              <InputTitle>대회설명</InputTitle>
            </TitleContestContainer>
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
                  setValue("contestDiscription", value);
                }}
                modules={modules}
                theme="snow"
                placeholder="내용을 입력해주세요."
                style={{ height: 400 }}
              />
            </TextEditor>
          </div>
          <div>
            <TitleContestContainer>
              <InputTitle>대회약관</InputTitle>
            </TitleContestContainer>
            <TextEditor>
              <ReactQuill
                ref={(element) => {
                  if (element !== null) {
                    QuillRef2.current = element;
                  }
                }}
                value={terms}
                onChange={(value) => {
                  setTerms(value);
                  setValue("contestTerms", value);
                }}
                modules={modules2}
                theme="snow"
                placeholder="내용을 입력해주세요."
                style={{ height: 400 }}
              />
            </TextEditor>
          </div>
          <div>
            <TitleContestContainer>
              <InputTitle>상금안내</InputTitle>
            </TitleContestContainer>
            <TextEditor>
              <ReactQuill
                ref={(element) => {
                  if (element !== null) {
                    QuillRef3.current = element;
                  }
                }}
                value={award}
                onChange={(value) => {
                  setAward(value);
                  setValue("contestAwardDetails", value);
                }}
                modules={modules3}
                theme="snow"
                placeholder="내용을 입력해주세요."
                style={{ height: 400 }}
              />
            </TextEditor>
          </div>
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
      <AddressModal
        setValue={setValue}
        setIsModal={setIsVisible}
        isModal={isVisible}
      />
    </Container>
  );
}

export default CreateContest;
