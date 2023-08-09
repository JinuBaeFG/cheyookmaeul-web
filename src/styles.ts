import { DefaultTheme, createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  fontColor: "rgb(38, 38, 38)",
  bgColor: "#FAFAFA",
  accent: "#0095f6",
  borderColor: "rgb(219,219,219)",
  menuColor: "#01AA73",
  whiteColor: "#FFFFFF",
  blackColor: "#222222",
};

export const darkTheme: DefaultTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
  accent: "#0095f6",
  borderColor: "rgb(219,219,219)",
  menuColor: "#01AA73",
  whiteColor: "#FFFFFF",
  blackColor: "#222222",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    html {
      width:100%;
      height:100%;
    }
    input[type="button"] {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
      width:100%;
      height:100%;
      background-color: ${(props) => props.theme.bgColor};
      font-size:14px;
      font-family:'Open Sans', sans-serif;
      color : ${(props) => props.theme.fontColor};
    }
    a {
      text-decoration: none;
      color:inherit;
    }
    #root {
      width:100%;
      height:100%;
    }
    button {
      border:0 none;
      vertical-align: -webkit-baseline-middle;
    }
    .ck-editor__editable:not(.ck-editor__nested-editable) {
      height: 400px;
      overflow : scroll;
  }
`;
