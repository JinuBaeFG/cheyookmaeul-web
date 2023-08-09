/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedPhoto
// ====================================================

export interface FeedPhoto_feedUpload {
  __typename: "FeedUpload";
  id: number;
  imagePath: string | undefined;
}

export interface FeedPhoto_feedCategoryList {
  __typename: "FeedCategoryList";
  id: number | undefined;
  name: string | undefined;
}

export interface FeedPhoto_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface FeedPhoto {
  __typename: "Photo";
  id: number;
  feedUpload: (FeedPhoto_feedUpload | undefined)[] | undefined;
  likes: number;
  commentCount: number;
  isLiked: boolean;
  feedCategoryList: (FeedPhoto_feedCategoryList | undefined)[] | undefined;
  user: FeedPhoto_user;
  caption: string | undefined;
  createdAt: string;
  isMine: boolean;
}
