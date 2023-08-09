/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BoardFragment
// ====================================================

export interface BoardFragment_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface BoardFragment_group {
  __typename: "Group";
  id: number;
}

export interface BoardFragment_tutor {
  __typename: "Tutor";
  id: number | undefined;
}

export interface BoardFragment {
  __typename: "Board";
  id: number | undefined;
  user: BoardFragment_user;
  group: BoardFragment_group | undefined;
  tutor: BoardFragment_tutor | undefined;
  title: string | undefined;
  discription: string | undefined;
  sortation: string | undefined;
  hits: number;
  createdAt: string;
  likes: number;
  boardCommentCount: number;
  isLiked: boolean;
}
