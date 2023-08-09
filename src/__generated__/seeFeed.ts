/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed_feedUpload {
  __typename: "FeedUpload";
  id: number;
  imagePath: string | undefined;
}

export interface seeFeed_seeFeed_feedCategoryList {
  __typename: "FeedCategoryList";
  id: number | undefined;
  name: string | undefined;
}

export interface seeFeed_seeFeed_user {
  __typename: "User";
  username: string;
  avatar: string | undefined;
}

export interface seeFeed_seeFeed_comments_photo {
  __typename: "Photo";
  id: number;
}

export interface seeFeed_seeFeed_comments_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface seeFeed_seeFeed_comments {
  __typename: "Comment";
  id: number;
  photo: seeFeed_seeFeed_comments_photo;
  user: seeFeed_seeFeed_comments_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
}

export interface seeFeed_seeFeed {
  __typename: "Photo";
  id: number;
  feedUpload: (seeFeed_seeFeed_feedUpload | undefined)[];
  likes: number;
  commentCount: number;
  isLiked: boolean;
  feedCategoryList:
    | (seeFeed_seeFeed_feedCategoryList | undefined)[]
    | undefined;
  user: seeFeed_seeFeed_user | undefined;
  caption: string | undefined;
  comments: (seeFeed_seeFeed_comments | undefined)[];
  createdAt: string;
  isMine: boolean;
}

export interface seeFeed {
  seeFeed: (seeFeed_seeFeed | undefined)[] | undefined;
}

export interface seeFeedVariables {
  offset: number;
}
