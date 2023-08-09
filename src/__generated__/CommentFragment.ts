/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentFragment
// ====================================================

export interface CommentFragment_photo {
  __typename: "Photo";
  id: number;
}

export interface CommentFragment_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface CommentFragment {
  __typename: "Comment";
  id: number;
  photo: CommentFragment_photo;
  user: CommentFragment_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
}
