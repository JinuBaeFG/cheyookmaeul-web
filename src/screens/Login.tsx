import { gql, useMutation } from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import { login, loginVariables } from "../__generated__/login";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
  margin-top: 10px;
`;

const LOGIN_MUTATION = gql`
  mutation adminLogin($id: String!, $password: String!) {
    adminLogin(id: $id, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<loginVariables>({
    mode: "onChange",
    defaultValues: {
      id: location?.state?.id || "",
      password: location?.state?.password || "",
    },
  });

  const onCompleted = (data: any) => {
    const {
      adminLogin: { ok, error, token },
    } = data;

    if (!ok) {
      setError("result", { message: error });
    }
    if (token) {
      logUserIn(token);
    }
  };

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid: SubmitHandler<loginVariables> = () => {
    if (loading) {
      return;
    }
    const { id, password } = getValues();
    loginMutation({
      variables: {
        id,
        password,
      },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("id", {
              required: "Username is required",
              minLength: {
                value: 2,
                message: "Username should be longer than 2 chars.",
              },
            })}
            onFocus={() => clearLoginError()}
            name="id"
            type="text"
            placeholder="ID"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.id?.message} />
          <Input
            {...register("password", {
              required: "Password is required.",
            })}
            onFocus={() => clearLoginError()}
            name="password"
            type="password"
            placeholder="password"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
        </form>
        <Separator />
      </FormBox>
    </AuthLayout>
  );
};
export default Login;
