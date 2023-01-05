import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useMe } from "../../hooks/useMe";
import Head from "next/head";
import {
  VerifyEmailMutation,
  VerifyEmailMutationVariables,
} from "../../gql/graphql";
import { useRouter } from "next/router";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

 const ConfirmEmail = () => {
  const { data: userData, refetch } = useMe();
  const client = useApolloClient();
  const router = useRouter();
  const onCompleted = async (data: VerifyEmailMutation) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      // await refetch();
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      router.push("/");
    }
  };
  const [verifyEmail] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted,
  });
  useEffect(() => {
    if(router.isReady == false){
      return;
    }
    const {code} = router.query;
    verifyEmail({
      variables: {
        input: {
          code:code as string,
        },
      },
    });
  }, [verifyEmail, router.isReady]);
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <Head>
        <title>Verify Email | Nuber Eats</title>
      </Head>
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
export default ConfirmEmail;