/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me {
  __typename: "User";
  username: string;
  avatar: string | undefined;
  totalFollowing: number;
  totalFollowers: number;
}

export interface me {
  me: me_me | undefined;
}
