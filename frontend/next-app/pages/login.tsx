import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { FormError } from "../components/form-error";
import styles from "../styles/login.module.css";
import { graphql } from "../gql/gql";
import { LoginMutation, LoginMutationVariables } from "../gql/graphql";
import { Button } from "../components/Button/button";
import { isLoggedInVar } from '../lib/apolloClient';
import { emailPatern } from '../common/patterns';
interface ILoginForm {
  email: string;
  password: string;
}
const LOGIN_MUTATION = graphql(/* GraphQL */ `
  mutation Login($loginInput: LoginAccountInput!) {
    loginAccount(input: $loginInput) {
      ok
      token
      error
    }
  }
`);
export default function Login() {
  const { register, getValues, watch, handleSubmit, formState } =
    useForm<ILoginForm>({
      mode: "onChange",
    });
  const { errors } = formState;
  const [loginMutation, { loading, error, data }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    // variables: {
    //   loginInput: {
    //     email: watch("email"),
    //     password: watch("password"),
    //   },
    // },
    onCompleted(data, clientOptions?) {
      const {
        loginAccount: { ok, error, token },
      } = data;
      if (ok && token) {
        isLoggedInVar(true);
      } else {
        isLoggedInVar(false);
      }
    },
    onError(error, clientOptions?) {
      alert(JSON.stringify(error));
    },
  });
  const onSubmit = async () => {
    if (!loading) {
      const { email, password } = getValues();
      await loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col  justify-center  bg-gray-800">
      <Head>
        <title>Login | Auber Eats</title>
        <meta name="description" content={`Auber eats`} />
      </Head>
      <div className="bg-white px-10 py-5 w-full max-w-lg rounded-lg text-center">
        <Image
          src={"/static/images/logo.svg"}
          width={60}
          height={36}
          className="w-52 mb-10"
          alt="Auber Eats"
        />
        <h3 className=" bord text-3xl text-gray-800 ">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 w-full mb-5"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern: emailPatern,
            })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className={styles.input}
          />
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("password", { required: "Password is required" })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className={styles.input}
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <Button
            canClick={formState.isValid && !loading}
            loading={loading}
            actionText="Log In"
          />
          {data?.loginAccount?.error && (
            <FormError errorMessage={data.loginAccount.error} />
          )}
        </form>
        <div>
          New to Auber?{" "}
          <Link href="/sign-up" className="text-lime-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
