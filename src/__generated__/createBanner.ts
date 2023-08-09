/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createBanner
// ====================================================

export interface createBanner_createBanner {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | undefined;
}

export interface createBanner {
  createBanner: createBanner_createBanner | undefined;
}

export interface createBannerVariables {
  title?: string | undefined;
  discription?: string | undefined;
  titleBannerImage?: any | undefined;
}
