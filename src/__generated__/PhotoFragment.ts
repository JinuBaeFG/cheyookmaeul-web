/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PhotoFragment
// ====================================================

export interface PhotoFragment_feedUpload {
  __typename: "FeedUpload";
  id: number;
  imagePath: string | null;
}

export interface PhotoFragment_feedCategoryList {
  __typename: "FeedCategoryList";
  id: number | null;
  name: string | null;
}

export interface PhotoFragment {
  __typename: "Photo";
  id: number;
  feedUpload: (PhotoFragment_feedUpload | null)[] | null;
  likes: number;
  commentCount: number;
  isLiked: boolean;
  feedCategoryList: (PhotoFragment_feedCategoryList | null)[] | null;
}
