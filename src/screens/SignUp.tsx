import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";
import {
  createAccountVariables,
  createAccount,
} from "../__generated__/createAccount";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
`;

const SIGNUP_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;
const SignUp = () => {
  const navigate = useNavigate();
  const onCompleted = (data: createAccount) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    navigate(routes.home, {
      state: { message: "Account created. Please log in.", username, password },
    });
  };
  const [signupMutation, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, formState, getValues } =
    useForm<createAccountVariables>({
      mode: "onChange",
    });
  const onSubmitValid: SubmitHandler<createAccountVariables> = (data) => {
    if (loading) {
      return;
    }
    signupMutation({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title={"회원가입 Sign Up"} />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: "name is required",
            })}
            name="firstName"
            type="text"
            placeholder="First name"
            hasError={Boolean(formState.errors?.firstName?.message)}
          />
          <FormError message={formState.errors?.firstName?.message} />
          <Input
            {...register("lastName")}
            name="lastName"
            type="text"
            placeholder="Last name"
            hasError={Boolean(formState.errors?.lastName?.message)}
          />
          <FormError message={formState.errors?.lastName?.message} />
          <Input
            {...register("email", {
              required: "email is required",
            })}
            type="email"
            placeholder="Email"
            hasError={Boolean(formState.errors?.email?.message)}
          />
          <FormError message={formState.errors?.email?.message} />
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 2,
                message: "Username should be longer than 2 chars.",
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username?.message)}
          />
          <FormError message={formState.errors?.username?.message} />
          <Input
            {...register("password", {
              required: "password is required",
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
        <Separator />
      </FormBox>
      <BottomBox
        cta={"Have an Account?"}
        link={routes.home}
        linkText={"Log In"}
      />
    </AuthLayout>
  );
};
export default SignUp;
