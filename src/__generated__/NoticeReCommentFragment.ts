/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NoticeReCommentFragment
// ====================================================

export interface NoticeReCommentFragment_noticeComment {
  __typename: "NoticeComment";
  id: number;
}

export interface NoticeReCommentFragment_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface NoticeReCommentFragment {
  __typename: "NoticeReComment";
  id: number;
  noticeComment: NoticeReCommentFragment_noticeComment;
  user: NoticeReCommentFragment_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
}
