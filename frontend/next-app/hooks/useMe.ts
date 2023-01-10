import { MeQueryQuery } from './../gql/graphql';
import { gql, useQuery } from "@apollo/client";

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useQuery<MeQueryQuery>(ME_QUERY);
};