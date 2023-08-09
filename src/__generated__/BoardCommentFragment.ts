/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BoardCommentFragment
// ====================================================

export interface BoardCommentFragment_board {
  __typename: "Board";
  id: number | undefined;
}

export interface BoardCommentFragment_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface BoardCommentFragment {
  __typename: "BoardComment";
  id: number;
  board: BoardCommentFragment_board;
  user: BoardCommentFragment_user;
  payload: string;
  isMine: boolean;
  boardReCommentCount: number | undefined;
  createdAt: string;
}
