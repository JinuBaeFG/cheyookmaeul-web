import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import FeedCategoryRow from "../../components/category/FeedCategoryRow";

interface addFeedCategory {
  name?: string | undefined;
  sortKey?: number | undefined;
}

const SEE_FEED_CATEGORY_LIST = gql`
  query seeFeedCategoryList {
    seeFeedCategoryList {
      id
      name
      sortKey
    }
  }
`;

const ADD_FEED_CATEGORY = gql`
  mutation addFeedCategory($sortKey: String, $name: String) {
    addFeedCategory(sortKey: $sortKey, name: $name) {
      ok
      id
    }
  }
`;

const Container = styled.div`
  padding: 16px;
`;

const CategroyTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
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

const Category = () => {
  const { data } = useQuery(SEE_FEED_CATEGORY_LIST);

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const categoryList = data?.seeFeedCategoryList;
  let count = 0;

  if (categoryList !== undefined) {
    count = categoryList.length;
  }

  const [name, setName] = useState("");
  const [sortKey, setSortKey] = useState(count + 1);

  useEffect(() => {
    setSortKey(count + 1);
  }, [count]);

  const onChangeAddCategoryName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    []
  );

  const onChangeAddSortKey = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
      const onlyNumber = value.replace(/[^0-9]/g, "");
      setSortKey(parseInt(onlyNumber));
    },
    []
  );

  const onAddCompleted = (cache: any, data: any) => {
    const {
      data: {
        addFeedCategory: { ok, id },
      },
    } = data;

    if (ok) {
      window.location.reload();
    }
  };

  const [addFeedCategoryList] = useMutation(ADD_FEED_CATEGORY, {
    update: onAddCompleted,
  });

  const onAddValid: SubmitHandler<addFeedCategory> = ({ name, sortKey }) => {
    addFeedCategoryList({
      variables: {
        name,
        sortKey,
      },
    });
  };

  useEffect(() => {
    register("sortKey");
    register("name");
  }, []);

  useEffect(() => {
    setValue("name", name);
    setValue("sortKey", sortKey);
  }, [name, sortKey]);

  return (
    <Container>
      <CategroyTitle>카테고리</CategroyTitle>
      <form>
        <CategoryList style={{ marginBottom: 16 }}>
          <CategoryColumn>
            <CategoryLabel>카테고리 명</CategoryLabel>
            <CategoryText value={name} onChange={onChangeAddCategoryName} />
          </CategoryColumn>
          <CategoryColumn>
            <CategoryLabel>순서</CategoryLabel>
            <CategoryText value={sortKey} onChange={onChangeAddSortKey} />
          </CategoryColumn>
          <CategoryColumn>
            <CategoryBtn
              type="button"
              value="추가"
              onClick={handleSubmit(onAddValid)}
              style={{ padding: 4, border: "1px solid #ccc", borderRadius: 4 }}
            />
          </CategoryColumn>
        </CategoryList>
      </form>

      {count > 0
        ? categoryList.map((item: any, index: any) => {
            return (
              <FeedCategoryRow
                key={index}
                id={item.id}
                name={item.name}
                sortKey={item.sortKey}
              />
            );
          })
        : null}
    </Container>
  );
};

export default Category;
