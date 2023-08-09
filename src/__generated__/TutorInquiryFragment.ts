/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TutorInquiryFragment
// ====================================================

export interface TutorInquiryFragment_user {
  __typename: "User";
  id: string;
}

export interface TutorInquiryFragment_tutor {
  __typename: "Tutor";
  id: number | undefined;
}

export interface TutorInquiryFragment_tutorInquiryComment {
  __typename: "TutorInquiryComment";
  id: number;
  responseTitle: string | undefined;
  responseDiscription: string | undefined;
  answerOk: boolean | undefined;
  createdAt: string;
}

export interface TutorInquiryFragment {
  __typename: "TutorInquiry";
  id: number;
  user: TutorInquiryFragment_user | undefined;
  tutor: TutorInquiryFragment_tutor | undefined;
  tutorInquiryComment:
    | (TutorInquiryFragment_tutorInquiryComment | undefined)[]
    | undefined;
  inquiryTitle: string | undefined;
  inquiryDiscription: string | undefined;
  inquiryResponse: boolean | undefined;
  createdAt: string;
}
