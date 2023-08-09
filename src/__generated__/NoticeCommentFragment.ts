/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NoticeCommentFragment
// ====================================================

export interface NoticeCommentFragment_notice {
  __typename: "Notice";
  id: number | undefined;
}

export interface NoticeCommentFragment_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface NoticeCommentFragment {
  __typename: "NoticeComment";
  id: number;
  notice: NoticeCommentFragment_notice;
  user: NoticeCommentFragment_user;
  payload: string;
  isMine: boolean;
  noticeReCommentCount: number | undefined;
  createdAt: string;
}
