import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FacilityHeader from "../../components/facility/FacilityHeader";
import HeaderTitle from "../../components/HeaderTitle";
import PageTitle from "../../components/PageTitle";
import { gql, useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import AddressModal from "../../components/AddressModal";
import Checkbox from "../../components/shared/CheckBox";
import useTag from "../../hooks/useTag";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import moment from "moment";
import useSportsEvent from "../../hooks/useSportsEvent";

interface locationType {
  loaded: boolean;
  coordinates?:
    | { lat?: number | undefined; lng?: number | undefined }
    | undefined;
  error?: { code: number; message: string };
}

export interface createFacilityVariables {
  title?: string | undefined;
  discription?: string | undefined;
  titleFacilityImage?: any | undefined;
}

const CREATE_FACILITY_MUTATION = gql`
  mutation createFacility(
    $name: String!
    $discription: String
    $sidoName: String
    $gusiName: String
    $dongEubMyunName: String
    $riName: String
    $roadName: String
    $buildingNumber: String
    $zipcode: String
    $activeArea: String
    $address: String
    $addrRoad: String
    $areaLatitude: String
    $areaLongitude: String
    $detailAddress: String
    $operTime: String
    $facilitySports: [FacilitySportsInput]
    $facilityImage: [Upload]
    $facilityInfo: [FacilityInfoInput]
    $facilityTag: [FacilityTagInput]
  ) {
    createFacility(
      name: $name
      discription: $discription
      sidoName: $sidoName
      gusiName: $gusiName
      dongEubMyunName: $dongEubMyunName
      riName: $riName
      roadName: $roadName
      buildingNumber: $buildingNumber
      zipcode: $zipcode
      activeArea: $activeArea
      address: $address
      addrRoad: $addrRoad
      areaLatitude: $areaLatitude
      areaLongitude: $areaLongitude
      detailAddress: $detailAddress
      operTime: $operTime
      facilitySports: $facilitySports
      facilityImage: $facilityImage
      facilityInfo: $facilityInfo
      facilityTag: $facilityTag
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
  height: 100%;
`;

const TitleFacilityContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const InputContainer = styled.div`
  padding: 24px;
  height: 100%;
`;

const TitleInput = styled.input`
  border: 1px solid #ccc;
  padding: 8px;
  width: 50%;
`;

const ActiveInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextWrap = styled.div`
  padding: 8px;
  flex-direction: row;
`;

const Text = styled.span`
  font-size: 16px;
  margin-right: 12px;
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

const InputTitle = styled.div`
  padding: 8px;
  background-color: ${(props) => props.theme.menuColor};
  color: ${(props) => props.theme.whiteColor};
  font-weight: 600;
  margin-right: 12px;
`;

const TitleFacilityPreview = styled.div`
  position: relative;
  padding: 8px;
  border: 1px solid #ccc;
  width: 150px;
  height: 150px;
  margin-right: 8px;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  position: relative;
  width: 100%;
`;

const PreviewDelete = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 8px;
`;

const calendarStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function AddFacility() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showImages, setShowImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const navigate = useNavigate();

  const [isModal, setIsModal] = useState(false);

  const onCompleted = (data: any) => {
    const {
      createFacility: { ok, error },
    } = data;

    if (error) {
      console.log(error);
    }
    if (ok) {
      navigate("/facility/FacilityList");
    }
  };

  const [createFacilityMutation] = useMutation<createFacilityVariables>(
    CREATE_FACILITY_MUTATION,
    {
      onCompleted,
    }
  );

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onSubmitValid: SubmitHandler<createFacilityVariables> = (data) => {
    createFacilityMutation({
      variables: {
        ...data,
      },
    });
  };

  // 이미지 상대경로 저장

  const handleAddImages = (event: any) => {
    const imageLists = event.target.files;
    let imageUrlLists: any = [...showImages];
    let uploadUrlList: any = [...uploadImages];

    for (let i = 0; i < imageLists.length; i++) {
      uploadUrlList.push(imageLists[i]);
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
      uploadUrlList = uploadUrlList.slice(0, 10);
    }

    setShowImages(imageUrlLists);
    setUploadImages(uploadUrlList);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: any) => {
    setShowImages(showImages.filter((_, index) => index !== id));
    setUploadImages(uploadImages.filter((_, index) => index !== id));
  };

  // 시설 종목 체크박스 세팅
  let eventList = useSportsEvent(undefined);

  const onSportsEventPress = (id: number | undefined) => {
    let temp = eventList.map((item: any) => {
      if (id === item.id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    eventList = temp;
    setValue("facilitySports", eventList);
  };

  // 시설 태그 체크박스 세팅
  let tagList = useTag("facility", undefined);
  const onTagList = (id: number | undefined) => {
    let temp = tagList.map((item: any) => {
      if (id === item.id) {
        return { ...item, isUse: !item.isUse };
      }
      return item;
    });
    tagList = temp;
    setValue("facilityTag", tagList);
  };

  // 시설 이력 등록
  const [selectDay, setSelectDay] = useState<any>(new Date());
  const [activeInfo, setActiveInfo] = useState<any>("");
  const [calendarModal, setCalendarModal] = useState<any>(false);
  const [facilityActiveInfo, setFacilityActiveInfo] = useState<any>([]);

  const sortActiveHist = (activeHist: any) => {
    activeHist.sort((a: any, b: any) => {
      if (a.awardDate > b.awardDate) return 1;
      if (a.awardDate === b.awardDate) return 0;
      if (a.awardDate < b.awardDate) return -1;
    });
    setFacilityActiveInfo(activeHist);
    setValue("facilityInfo", facilityActiveInfo);
  };

  // 시설 정보 수정에서 시설 이력 초기 정보 세팅을 위한
  const setFacilityInfo = (facilityInfo: any | undefined) => {
    let infoArr: any = [];
    facilityInfo.map((item: any) => {
      let info = {
        id: item.id,
        awardDate: item.awardDate,
        discription: item.discription,
        isNew: item.isNew !== undefined ? item.isNew : false,
        isDelete: item.isDelete !== undefined ? item.isDelete : false,
      };
      infoArr.push(info);
    });
    // 날짜 오름차순으로 정렬
    infoArr.sort((a: any, b: any) => {
      if (a.awardDate > b.awardDate) return 1;
      if (a.awardDate === b.awardDate) return 0;
      if (a.awardDate < b.awardDate) return -1;
    });
    setFacilityActiveInfo(infoArr);
    setValue("facilityInfo", facilityActiveInfo);
  };

  const removeActiveInfo = (index: number) => {
    if (facilityActiveInfo[index].isNew === true) {
      facilityActiveInfo.splice(index, 1);
      setFacilityActiveInfo(facilityActiveInfo);
      setFacilityInfo(facilityActiveInfo);
      setValue("facilityInfo", facilityActiveInfo);
    } else {
      facilityActiveInfo[index].isDelete = true;
      setFacilityActiveInfo(facilityActiveInfo);
      setFacilityInfo(facilityActiveInfo);
      setValue("facilityInfo", facilityActiveInfo);
    }
  };

  const onAddActiveInfo = ({ selectDay, activeInfo }: any) => {
    const newHistory: any = {
      discription: activeInfo,
      awardDate: moment(selectDay).format("YYYY.MM.DD"),
      isNew: true,
      isDelete: false,
    };
    setFacilityActiveInfo([newHistory, ...facilityActiveInfo]);
    setSelectDay(new Date());
    setActiveInfo("");
    sortActiveHist([newHistory, ...facilityActiveInfo]);
  };

  useEffect(() => {
    setValue("facilityInfo", facilityActiveInfo);
    setValue("facilityImage", uploadImages);
  }, [facilityActiveInfo, uploadImages]);

  useEffect(() => {
    register("sidoName");
    register("gusiName");
    register("dongEubMyunName");
    register("riName");
    register("roadName");
    register("buildingNumber");
    register("zipcode");
    register("address");
    register("addrRoad");
    register("areaLongitude");
    register("areaLatitude");
    register("facilityInfo");
    register("facilityTag");
    register("facilitySports");
  }, []);

  return (
    <Container>
      <PageTitle title="배너관리" />
      <HeaderTitle title="배너관리" />
      <FacilityHeader />
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <TitleFacilityContainer>
            <InputTitle>시설명</InputTitle>
            <TitleInput
              {...register("name", { required: "시설명을 입력해주세요." })}
              placeholder="시설명을 입력해주세요"
            />
          </TitleFacilityContainer>
          <TitleFacilityContainer>
            <InputTitle>시설 설명</InputTitle>
            <TitleInput
              {...register("discription", {
                required: "시설 설명을 입력해주세요.",
              })}
              placeholder="시설 설명을 입력해주세요"
            />
          </TitleFacilityContainer>
          <TitleFacilityContainer>
            <InputTitle>시설 운영 시간</InputTitle>
            <TitleInput
              {...register("operTime", {
                required: "시설 운영 시간을 입력해주세요.",
              })}
              placeholder="시설 운영 시간을 입력해주세요"
            />
          </TitleFacilityContainer>
          <TitleFacilityContainer>
            <InputTitle>시설 종목</InputTitle>
            {eventList.map((item: any) => {
              return (
                <Checkbox
                  key={item.id}
                  id={item.id}
                  checked={item.isChecked}
                  onChange={onSportsEventPress}
                >
                  {item.name}
                </Checkbox>
              );
            })}
          </TitleFacilityContainer>
          <TitleFacilityContainer>
            <InputTitle>시설 태그</InputTitle>
            {tagList.map((item: any) => {
              return (
                <Checkbox
                  key={item.id}
                  id={item.id}
                  checked={item.isUse}
                  onChange={onTagList}
                >
                  {item.name}
                </Checkbox>
              );
            })}
          </TitleFacilityContainer>
          <TitleFacilityContainer>
            <InputTitle>시설 이력</InputTitle>
            <TitleInput
              placeholder="날짜 선택"
              value={moment(selectDay).format("YYYY.MM.DD")}
              onClick={() => setCalendarModal(true)}
              style={{ width: 100 }}
            />
            <TitleInput
              placeholder="이력 입력"
              value={activeInfo}
              onChange={(e) => setActiveInfo(e.target.value)}
            />
            <input
              type="button"
              value="추가"
              onClick={() => {
                onAddActiveInfo({ selectDay, activeInfo });
              }}
              style={{
                cursor: "pointer",
                padding: 8,
                border: "1px solid #ccc",
                marginLeft: 4,
              }}
            />
            <Modal
              isOpen={calendarModal}
              onRequestClose={() => setCalendarModal(false)}
              ariaHideApp={false}
              style={calendarStyle}
            >
              <Calendar
                onClickDay={() => setCalendarModal(false)}
                onChange={setSelectDay}
                value={moment(selectDay).format("YYYY.MM.DD")}
                formatDay={(locale, date) => moment(date).format("DD")}
              />
            </Modal>
          </TitleFacilityContainer>
          {facilityActiveInfo !== undefined &&
          facilityActiveInfo !== null &&
          facilityActiveInfo.length > 0 ? (
            <TitleFacilityContainer>
              <InputTitle>시설 이력</InputTitle>
              <ActiveInfoWrap>
                {facilityActiveInfo.map((item: any, index: number) => {
                  return (
                    <TextWrap key={index}>
                      <Text>{item.awardDate}</Text>
                      <Text>{item.discription}</Text>
                      <input
                        type="button"
                        value="삭제"
                        onClick={() => {
                          removeActiveInfo(index);
                        }}
                        style={{
                          cursor: "pointer",
                          padding: 8,
                          border: "1px solid #ccc",
                          marginLeft: 4,
                        }}
                      />
                    </TextWrap>
                  );
                })}
              </ActiveInfoWrap>
            </TitleFacilityContainer>
          ) : null}
          <TitleFacilityContainer>
            <InputTitle
              onClick={() => {
                setIsModal(true);
              }}
              style={{ cursor: "pointer" }}
            >
              시설 주소 검색
            </InputTitle>
          </TitleFacilityContainer>
          {getValues("addrRoad") !== undefined ? (
            <>
              <TitleFacilityContainer>
                <InputTitle>시설 주소</InputTitle>

                <TitleInput
                  placeholder="시설명을 입력해주세요"
                  value={getValues("addrRoad")}
                />
              </TitleFacilityContainer>
              <TitleFacilityContainer>
                <InputTitle>상세 주소</InputTitle>

                <TitleInput
                  {...register("detailAddress")}
                  placeholder="상세 주소를 입력해주세요.(예 : 7층, 702호)"
                />
              </TitleFacilityContainer>
            </>
          ) : null}
          <TitleFacilityContainer>
            <InputTitle>메인 이미지</InputTitle>
            <label
              htmlFor="input-file"
              onChange={handleAddImages}
              style={{ cursor: "pointer" }}
            >
              <input
                {...register("facilityImage")}
                id="input-file"
                type="file"
                multiple
                accept="image/*"
                ref={inputRef}
                onChange={handleAddImages}
                style={{ width: 1, visibility: "hidden" }}
              />
              <span>사진추가</span>
            </label>
          </TitleFacilityContainer>
          <TitleFacilityContainer>
            {showImages !== undefined
              ? showImages.map((image, id) => (
                  <TitleFacilityPreview key={id}>
                    <PreviewImage src={image} alt={`${image}-${id}`} />
                    <PreviewDelete>
                      <input
                        type="button"
                        value="삭제"
                        onClick={() => {
                          handleDeleteImage(id);
                        }}
                      />
                    </PreviewDelete>
                  </TitleFacilityPreview>
                ))
              : null}
          </TitleFacilityContainer>
          <ButtonContainer>
            <ButtonSubmit type="submit" value={"완료"} />
            <ButtonReset type="reset" value={"취소"} />
          </ButtonContainer>
        </form>
      </InputContainer>
      <AddressModal
        setValue={setValue}
        setIsModal={setIsModal}
        isModal={isModal}
      />
    </Container>
  );
}

export default AddFacility;
