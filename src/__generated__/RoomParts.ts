/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RoomParts
// ====================================================

export interface RoomParts_users {
  __typename: "User";
  username: string;
  avatar: string | undefined;
}

export interface RoomParts {
  __typename: "Room";
  id: number;
  unreadTotal: number;
  users: (RoomParts_users | undefined)[] | undefined;
}
