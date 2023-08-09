import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { gql, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";

const SEARCH_USER_QUERY = gql`
  query searchContestUser(
    $email: String
    $username: String
    $phoneNumber: String
  ) {
    searchContestUser(
      email: $email
      username: $username
      phoneNumber: $phoneNumber
    ) {
      id
      username
      avatar
      email
    }
  }
`;

const ModalContainer = styled.div``;

const SearchFilterBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchFilterSelect = styled.select`
  padding: 4px;
  font-size: 16px;
  margin-right: 4px;
`;

const SearchFilterInput = styled.input`
  padding: 3.5px;
  font-size: 16px;
  margin-right: 4px;
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
  margin-right: 8px;
`;

const SearchResultEmail = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`;

export default function FindUserModal({
  find,
  setPartner,
  setUsername,
  setValues,
  setIsModal,
  isModal,
}: any) {
  const [search, setSearch] = useState({});
  const [searchKey, setSearchKey] = useState("username");
  const [searchValue, setSearchValue] = useState("");
  const { setValue, register, watch, handleSubmit, getValues } = useForm();
  const [startQueryFn, { data }] = useLazyQuery(SEARCH_USER_QUERY, {
    fetchPolicy: "network-only",
  });
  let findUser = data?.searchContestUser;
  const onSearch = (data: any) => {
    startQueryFn({
      variables: {
        ...data,
      },
    });
  };

  const filterChange = (e) => {
    initSetValue();
    setSearchKey(e.target.value);
    setSearch(`${searchKey} : ${searchValue}`);
    setValue(`${searchKey}`, searchValue);
  };

  const searchChange = (e) => {
    initSetValue();
    setSearchValue(e.target.value);
    setSearch(`${searchKey} : ${searchValue}`);
    setValue(`${searchKey}`, e.target.value);
  };

  const initSetValue = () => {
    setValue("username", null);
    setValue("email", null);
    setValue("phoneNumber", null);
  };

  useEffect(() => {
    register("username");
    register("email");
    register("phoneNumber");
  }, [register]);

  return (
    <Modal
      isOpen={isModal}
      onRequestClose={() => setIsModal(false)}
      ariaHideApp={false}
    >
      <ModalContainer>
        <SearchFilterBox>
          <SearchFilterSelect onChange={filterChange}>
            <option key="username" value="username">
              이름
            </option>
            <option key="email" value="email">
              이메일
            </option>
            <option key="phoneNumber" value="phoneNumber">
              휴대전화번호
            </option>
          </SearchFilterSelect>
          <SearchFilterInput onChange={searchChange} />
          <input
            type="submit"
            value={"검색"}
            onClick={handleSubmit(onSearch)}
            style={{ padding: 4 }}
          />
        </SearchFilterBox>
        {findUser !== null && findUser !== undefined
          ? findUser.map((item: any) => {
              return (
                <SearchResultBox
                  key={item.id}
                  onClick={() => {
                    setValues(find, item.username);
                    if (find == "username") {
                      setUsername(item.username);
                      setValues("userId", item.id);
                    } else {
                      setPartner(item.username);
                      setValues("partnerId", item.id);
                    }
                    initSetValue();
                    setIsModal(!isModal);
                  }}
                >
                  <SearchResultRow>
                    <SearchResultName>{item.username}</SearchResultName>
                    <SearchResultEmail>{item.email}</SearchResultEmail>
                  </SearchResultRow>
                </SearchResultBox>
              );
            })
          : null}
      </ModalContainer>
    </Modal>
  );
}
