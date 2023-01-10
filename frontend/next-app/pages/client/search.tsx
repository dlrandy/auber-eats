import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";

import { useRouter } from "next/router";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  SearchRestaurantQuery,
  SearchRestaurantQueryVariables,
} from "../../gql/graphql";
import Head from "next/head";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurants(input: $input) {
      ok
      error
      totalPages
      totalItems
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

 const Search = () => {
  const router = useRouter();
  const [callQuery, { loading, data, called }] = useLazyQuery<
    SearchRestaurantQuery,
    SearchRestaurantQueryVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const query = router.query.term as string;
    if (!query) {
      router.replace("/");
      return;
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [callQuery, router, router.query]);
  console.log(loading, data, called);
  return (
    <div>
      <Head>
        <title>Search | Nuber Eats</title>
      </Head>
      <h1>Search page</h1>
    </div>
  );
};
export default Search;