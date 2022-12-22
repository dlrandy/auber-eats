import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import styles from "../styles/login.module.css";
import { graphql } from "../gql/gql";
import { LoginMutation, LoginMutationVariables } from "../gql/graphql";
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
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
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
          loginAccount:{
            ok, error, token
          }
        } = data;
        if (ok) {
          
        } else {
          
        }
    },
    onError(error, clientOptions?) {
        alert(JSON.stringify(error));
    },
  });
  const onSubmit = async () => {
    const { email, password } = getValues();
    await loginMutation(
      {
      variables: {
        loginInput: {
          email,
          password,
        },
      }
    });
    console.log(data?.loginAccount);
  };
  return (
    <div className="h-screen flex items-center flex-col  justify-center  bg-gray-800">
      <div className="bg-white px-10 py-5 w-full max-w-lg rounded-lg text-center">
        <h3 className=" bord text-3xl text-gray-800 ">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 w-full mb-5"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
          <button className="mt-3  ">submit</button>
          {data?.loginAccount?.error && <FormError errorMessage={data.loginAccount.error} />}
        </form>
      </div>
    </div>
  );
}
