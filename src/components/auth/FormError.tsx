import styled from "styled-components";

interface IForm {
  message: string | undefined;
}

const SFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

function FormError({ message }: IForm) {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;
