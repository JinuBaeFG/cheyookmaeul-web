import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";

const TitleInput = styled.input`
  border: 1px solid #ccc;
  padding: 8px;
  width: 50%;
`;

const AddressSearchResultContainer = styled.div`
  padding: 16px;
  border: 1px solid #ccc;
  margin-top: 20px;
  width: 100%;
  height: calc(100% - 16px);
`;

const SearchResultContainer = styled.div`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #01aa73;
  margin-bottom: 8px;
  cursor: pointer;
  &:hover {
    background-color: #01aa73;
  }
`;
const SearchResultTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-item: flex-end;
  margin-bottom: 8px;
`;

const SearchResultTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const SearchResultZipcode = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #cccccc;
`;

const SearhResultAddress = styled.div`
  font-size: 16px;
  margin-bottom: 4px;
`;

const SearchInfo = styled.div`
  padding: 16px;
`;

const SearchTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const SearchUl = styled.ul`
  margin-top: 12px;
`;

const Searchlist = styled.li`
  margin: 4px;
  color: "#cccccc";
`;

const SearchBold = styled.b`
  font-weight: 600;
  color: ${(props) => props.theme.blackColor};
`;

export default function AddressModal({ setValue, setIsModal, isModal }: any) {
  const [address, setAddress] = useState("");
  const [res, setRes] = useState<any>(null);
  const [searchResult, setSearchResult] = useState<any>([]);

  const onSelectAddress = (item: any) => {
    setValue("sidoName", item.sidoName);
    setValue("gusiName", item.gusiName);
    setValue("dongEubMyunName", item.dongEubMyunName);
    setValue("activeArea", item.dongEubMyunName);
    setValue("riName", item.riName);
    setValue("roadName", item.roadName);
    setValue("buildingNumber", item.buildingNumber);
    setValue("zipcode", item.zipcode);
    setValue("address", item.address);
    setValue("addrRoad", item.addrRoad);
    setValue("contestPlaceAddress", item.addrRoad);
    setValue("areaLongitude", item.longitude);
    setValue("areaLatitude", item.latitude);
    setIsModal(false);
  };

  const onAddressChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(e.target.value);
    },
    []
  );

  const searchAddressToCoordinate = async (address: any) => {
    axios
      .get("/api/navermaps", {
        params: {
          query: address,
        },
      })
      .then((response: any) => {
        setRes(response);
      });
  };

  useEffect(() => {
    if (res !== null && res !== undefined) {
      const addresses = res?.data?.addresses;
      let addrArr: any = [];
      if (addresses.length === 0) {
        let newResults = {
          dongEubMyunName: "검색결과가 없습니다.",
        };
        addrArr.push(newResults);
      } else {
        for (let i = 0; i < addresses.length; i++) {
          let newResults = {
            sidoName: addresses[i].addressElements[0].shortName,
            gusiName: addresses[i].addressElements[1].shortName,
            dongEubMyunName: addresses[i].addressElements[2].shortName,
            riName: addresses[i].addressElements[3].shortName,
            roadName: addresses[i].addressElements[4].shortName,
            buildingNumber: addresses[i].addressElements[5].shortName,
            zipcode: addresses[i].addressElements[8].shortName,
            address: addresses[i].jibunAddress,
            addrRoad: addresses[i].roadAddress,
            longitude: addresses[i].x,
            latitude: addresses[i].y,
            merge: true,
          };
          addrArr.push(newResults);
        }
      }
      setSearchResult(addrArr);
    }
  }, [res]);

  return (
    <Modal
      isOpen={isModal}
      onRequestClose={() => setIsModal(false)}
      ariaHideApp={false}
    >
      <TitleInput
        placeholder="시설 주소를 입력해주세요"
        value={address}
        onChange={onAddressChange}
      />
      <input
        type="button"
        value="검색"
        onClick={() => {
          searchAddressToCoordinate(address);
        }}
        style={{
          cursor: "pointer",
          padding: 8,
          border: "1px solid #ccc",
          marginLeft: 4,
        }}
      />
      <AddressSearchResultContainer>
        {res !== null && res !== undefined ? (
          searchResult.map((item: any, index: number) => {
            return (
              <SearchResultContainer
                key={index}
                onClick={() => {
                  onSelectAddress(item);
                }}
              >
                <SearchResultTitleWrap>
                  <SearchResultTitle>{item.dongEubMyunName}</SearchResultTitle>
                  {item.zipcode !== "" &&
                  item.zipcode !== undefined &&
                  item.zipcode !== null ? (
                    <SearchResultZipcode>[{item.zipcode}]</SearchResultZipcode>
                  ) : null}
                </SearchResultTitleWrap>
                {item.addrRoad !== "" &&
                item.addrRoad !== undefined &&
                item.addrRoad !== null ? (
                  <SearhResultAddress>
                    도로명 주소 : {item.addrRoad}
                  </SearhResultAddress>
                ) : null}
                {item.address !== "" &&
                item.address !== undefined &&
                item.address !== null ? (
                  <SearhResultAddress>
                    지번 주소 : {item.address}
                  </SearhResultAddress>
                ) : null}
              </SearchResultContainer>
            );
          })
        ) : (
          <SearchInfo>
            <SearchTitle>주소 검색 방법</SearchTitle>
            <SearchUl>
              <Searchlist>
                도로명 + <SearchBold>건물번호</SearchBold> (예: 송파대로 570)
              </Searchlist>
              <Searchlist>
                동/읍/면/리 + <SearchBold>번지</SearchBold> (예: 신천동 7-30)
              </Searchlist>
            </SearchUl>
          </SearchInfo>
        )}
      </AddressSearchResultContainer>
    </Modal>
  );
}
