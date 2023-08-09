import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontColor: string;
    bgColor: string;
    accent: string;
    borderColor: string;
    menuColor: string;
    whiteColor: string;
    blackColor: string;
  }
}
