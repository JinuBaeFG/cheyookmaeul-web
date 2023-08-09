/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NoticeFragment
// ====================================================

export interface NoticeFragment_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface NoticeFragment_group {
  __typename: "Group";
  id: number;
}

export interface NoticeFragment_tutor {
  __typename: "Tutor";
  id: number | undefined;
}

export interface NoticeFragment {
  __typename: "Notice";
  id: number | undefined;
  user: NoticeFragment_user;
  group: NoticeFragment_group | undefined;
  tutor: NoticeFragment_tutor | undefined;
  title: string | undefined;
  discription: string | undefined;
  sortation: string | undefined;
  hits: number;
  createdAt: string;
  likes: number;
  noticeCommentCount: number;
  isLiked: boolean;
}
