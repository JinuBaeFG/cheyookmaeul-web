/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BoardReCommentFragment
// ====================================================

export interface BoardReCommentFragment_boardComment {
  __typename: "BoardComment";
  id: number;
}

export interface BoardReCommentFragment_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface BoardReCommentFragment {
  __typename: "BoardReComment";
  id: number;
  boardComment: BoardReCommentFragment_boardComment;
  user: BoardReCommentFragment_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
}
