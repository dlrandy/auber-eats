/* eslint-disable react/no-unescaped-entities */
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormError } from "../components/form-error";
import styles from "../styles/login.module.css";
import { graphql } from "../gql/gql";
import { SignUpMutation, SignUpMutationVariables, UserRole } from "../gql/graphql";
import { Button } from "../components/Button/button";
import { isLoggedInVar } from '../lib/apolloClient';
import { emailPatern } from '../common/patterns';
interface ICreateAccountForm {
  email: string;
  password: string;
  role:UserRole;
}
const SIGNUP_MUTATION = graphql(/* GraphQL */ `
  mutation SignUp($signUpInput: CreateAccountInput!) {
    createAccount(input: $signUpInput) {
      ok
      error
    }
  }
`);
export default function SignUp() {
  const { register, getValues, watch, handleSubmit, formState } =
    useForm<ICreateAccountForm>({
        mode: "onChange",
        defaultValues: {
            role: UserRole.Owner
        },
    });
    const router = useRouter();
  const { errors } = formState;
  const [signUpMutation, { loading, error, data }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGNUP_MUTATION, {
    onCompleted(data, clientOptions?) {
      const {
        createAccount: { ok, error, },
      } = data;
      if (ok) {
        alert("Account Created! Log in now!");
        router.push("/");
      } 
    },
    onError(error, clientOptions?) {
      alert(JSON.stringify(error));
    },
  });
  const onSubmit = async () => {
    if (!loading) {
      const { email, password, role } = getValues();
      await signUpMutation({
        variables: {
            signUpInput: {
            email,
            password,
            role,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col  justify-center  bg-gray-800">
      <Head>
        <title>SignUp | Auber Eats</title>
        <meta name="description" content={`Auber eats`} />
      </Head>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <Image
          src={"/static/images/logo.svg"}
          width={60}
          height={36}
          className="w-52 mb-10"
          alt="Auber Eats"
        />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 w-full mb-5 mt-5"
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
            <select
            {...register('role',{ required: true })}
            className={styles.input}
          >
            {Object.keys(UserRole).filter(r => r !== 'Any').map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={formState.isValid && !loading}
            loading={loading}
            actionText="Sign Up"
          />
          {data?.createAccount?.error && (
            <FormError errorMessage={data.createAccount.error} />
          )}
        </form>
        <div>
        Already have an account?{" "}
          <Link href="/" className="text-lime-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
}
