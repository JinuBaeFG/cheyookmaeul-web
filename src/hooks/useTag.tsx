import { gql, useQuery } from "@apollo/client";

const SEE_TAG_QUERY = gql`
  query seeTag($sortation: String) {
    seeTag(sortation: $sortation) {
      id
      name
    }
  }
`;

export default function useTag(
  sortation: any | undefined,
  tagDataList: any | undefined
) {
  const { data: tagList } = useQuery(SEE_TAG_QUERY, {
    variables: {
      sortation,
    },
    fetchPolicy: "cache-and-network",
  });

  const tagData: any = [];
  if (tagList) {
    tagList?.seeTag.map((tag: any) => {
      tagData.push({
        id: tag.id,
        name: tag.name,
        isUse: false,
      });
    });
  }

  if (tagDataList) {
    tagData.map((item: any, index: any) => {
      tagDataList.map((facility: any) => {
        if (item.name === facility.name) {
          tagData[index].isUse = true;
        }
      });
    });
  }
  return tagData;
}
