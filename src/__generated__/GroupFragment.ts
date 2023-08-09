/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupFragment
// ====================================================

export interface GroupFragment_groupImage {
  __typename: "GroupImage";
  id: number;
  imagePath: string | undefined;
}

export interface GroupFragment_users {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface GroupFragment_groupInfo {
  __typename: "GroupInfo";
  id: number;
  discription: string | undefined;
  awardDate: string | undefined;
}

export interface GroupFragment_facility_facilityTag {
  __typename: "FacilityTag";
  id: number | undefined;
  name: string | undefined;
}

export interface GroupFragment_facility_facilitySports {
  __typename: "FacilitySports";
  id: number | undefined;
  name: string | undefined;
}

export interface GroupFragment_facility {
  __typename: "Facility";
  id: number | undefined;
  address: string | undefined;
  discription: string | undefined;
  name: string | undefined;
  facilityTag: (GroupFragment_facility_facilityTag | undefined)[] | undefined;
  facilitySports:
    | (GroupFragment_facility_facilitySports | undefined)[]
    | undefined;
}

export interface GroupFragment_groupTag {
  __typename: "GroupTag";
  id: number;
  name: string | undefined;
}

export interface GroupFragment_groupJoinRequest_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface GroupFragment_groupJoinRequest {
  __typename: "GroupJoinRequest";
  id: number;
  user: GroupFragment_groupJoinRequest_user | undefined;
}

export interface GroupFragment_groupPresident_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | undefined;
}

export interface GroupFragment_groupPresident {
  __typename: "GroupPresident";
  id: number;
  user: GroupFragment_groupPresident_user;
}

export interface GroupFragment {
  __typename: "Group";
  id: number;
  name: string | undefined;
  sidoName: string | undefined;
  gusiName: string | undefined;
  dongEubMyunName: string | undefined;
  riName: string | undefined;
  roadName: string | undefined;
  buildingNumber: string | undefined;
  zipcode: string | undefined;
  activeArea: string | undefined;
  address: string | undefined;
  addrRoad: string | undefined;
  areaLatitude: string | undefined;
  areaLongitude: string | undefined;
  sportsEvent: string | undefined;
  groupImage: (GroupFragment_groupImage | undefined)[] | undefined;
  discription: string | undefined;
  users: (GroupFragment_users | undefined)[] | undefined;
  groupInfo: (GroupFragment_groupInfo | undefined)[] | undefined;
  facility: (GroupFragment_facility | undefined)[] | undefined;
  groupTag: (GroupFragment_groupTag | undefined)[] | undefined;
  userCount: number | undefined;
  maxMember: string | undefined;
  createdAt: string;
  isJoin: boolean | undefined;
  isJoining: boolean | undefined;
  groupJoinRequest: (GroupFragment_groupJoinRequest | undefined)[] | undefined;
  isPresident: boolean | undefined;
  groupPresident: GroupFragment_groupPresident | undefined;
}
