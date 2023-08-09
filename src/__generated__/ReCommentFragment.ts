/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReCommentFragment
// ====================================================

export interface ReCommentFragment_comment {
  __typename: "Comment";
  id: number;
}

export interface ReCommentFragment_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface ReCommentFragment {
  __typename: "ReComment";
  id: number;
  comment: ReCommentFragment_comment;
  user: ReCommentFragment_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
}
