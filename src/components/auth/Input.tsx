import styled from "styled-components";

const Input = styled.input<{ hasError: boolean }>`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  color: #2c2c2c;
  &::placeholder {
    font-size: 12px;
    color: ${(props) => props.theme.fontColor};
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default Input;
