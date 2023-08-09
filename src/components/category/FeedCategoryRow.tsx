import { gql, useMutation } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface editFeedCategry {
  id?: number | undefined;
  name?: string | undefined;
  sortKey?: number | undefined;
}

const EDIT_FEED_CATEGORY = gql`
  mutation editFeedCategory($id: String, $sortKey: Int, $name: String) {
    editFeedCategory(id: $id, sortKey: $sortKey, name: $name) {
      ok
      error
    }
  }
`;

const CategoryList = styled.div`
  align-items: center;
`;

const CategoryColumn = styled.span`
  align-items: center;
  margin-right: 12px;
`;

const CategoryLabel = styled.span`
  font-weight: 600;
  margin-right: 12px;
`;

const CategoryText = styled.input``;

const CategoryBtn = styled.input``;

const FeedCategoryRow = ({ id, name, sortKey }: editFeedCategry) => {
  const [editId, setEditId] = useState(id);
  const [editName, setEditName] = useState(name);
  const [editSortKey, setEditSortKey] = useState(sortKey);

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const onEditCompleted = (cache: any, data: any) => {
    const {
      data: {
        editFeedCategory: { ok, error },
      },
    } = data;

    if (ok) {
      window.location.reload();
    }

    if (error) {
      console.log(error);
    }
  };

  const [editFeedCategoryList] = useMutation(EDIT_FEED_CATEGORY, {
    update: onEditCompleted,
  });

  const onEditValid = ({ id, name, sortKey }: editFeedCategry) => {
    editFeedCategoryList({
      variables: {
        id,
        name,
        sortKey,
      },
    });
  };

  const onChangeCategoryName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditName(e.target.value);
    },
    []
  );

  const onChangeSortKey = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
      const onlyNumber = value.replace(/[^0-9]/g, "");
      setEditSortKey(parseInt(onlyNumber));
    },
    []
  );

  useEffect(() => {
    register("id");
    register("name");
    register("sortKey");
  }, []);

  useEffect(() => {
    setValue("id", editId);
    setValue("name", editName);
    setValue("sortKey", editSortKey);
  }, [editName, editSortKey]);

  return (
    <form>
      <CategoryList>
        <CategoryColumn>
          <CategoryLabel>카테고리 명</CategoryLabel>
          <CategoryText
            defaultValue={editName}
            onChange={onChangeCategoryName}
          />
        </CategoryColumn>
        <CategoryColumn>
          <CategoryLabel>순서</CategoryLabel>
          <CategoryText defaultValue={editSortKey} onChange={onChangeSortKey} />
        </CategoryColumn>
        <CategoryColumn>
          <CategoryBtn
            type="button"
            value="수정"
            onClick={handleSubmit(onEditValid)}
            style={{
              padding: 4,
              border: "1px solid #ccc",
              borderRadius: 4,
              marginRight: 8,
            }}
          />
          <CategoryBtn
            type="button"
            value="삭제"
            onClick={() => {}}
            style={{
              padding: 4,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </CategoryColumn>
      </CategoryList>
    </form>
  );
};

export default FeedCategoryRow;
