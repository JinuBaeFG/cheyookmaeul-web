/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TutorFragment
// ====================================================

export interface TutorFragment_user {
  __typename: "User";
  id: string;
  username: string;
}

export interface TutorFragment_tutorImage {
  __typename: "TutorImage";
  id: number;
  imagePath: string | undefined;
}

export interface TutorFragment_group_groupTag {
  __typename: "GroupTag";
  id: number;
  name: string | undefined;
  imagePath: string | undefined;
}

export interface TutorFragment_group {
  __typename: "Group";
  id: number;
  name: string | undefined;
  sportsEvent: string | undefined;
  discription: string | undefined;
  maxMember: string | undefined;
  groupTag: (TutorFragment_group_groupTag | undefined)[] | undefined;
}

export interface TutorFragment_facility {
  __typename: "Facility";
  id: number | undefined;
  name: string | undefined;
}

export interface TutorFragment_tutorInfo {
  __typename: "TutorInfo";
  id: number;
  discription: string | undefined;
  awardDate: string | undefined;
}

export interface TutorFragment_tutorTag {
  __typename: "TutorTag";
  id: number;
  name: string | undefined;
  imagePath: string | undefined;
}

export interface TutorFragment_tutorInquiry_user {
  __typename: "User";
  id: string;
}

export interface TutorFragment_tutorInquiry_tutor {
  __typename: "Tutor";
  id: number | undefined;
}

export interface TutorFragment_tutorInquiry {
  __typename: "TutorInquiry";
  id: number;
  user: TutorFragment_tutorInquiry_user | undefined;
  tutor: TutorFragment_tutorInquiry_tutor | undefined;
  inquiryTitle: string | undefined;
  inquiryDiscription: string | undefined;
}

export interface TutorFragment_tutorSportsEvent {
  __typename: "TutorSportsEvent";
  id: number;
  name: string | undefined;
}

export interface TutorFragment {
  __typename: "Tutor";
  id: number | undefined;
  user: TutorFragment_user | undefined;
  name: string | undefined;
  discription: string | undefined;
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
  addAddr: string | undefined;
  areaLatitude: string | undefined;
  areaLongitude: string | undefined;
  tutorImage: TutorFragment_tutorImage | undefined;
  group: (TutorFragment_group | undefined)[] | undefined;
  facility: (TutorFragment_facility | undefined)[] | undefined;
  tutorInfo: (TutorFragment_tutorInfo | undefined)[] | undefined;
  tutorTag: (TutorFragment_tutorTag | undefined)[] | undefined;
  tutorInquiry: (TutorFragment_tutorInquiry | undefined)[] | undefined;
  tutorSportsEvent: (TutorFragment_tutorSportsEvent | undefined)[] | undefined;
  isTutor: boolean | undefined;
}
