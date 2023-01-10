import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../../fragments";
import { Category as CategoryQuery, CategoryQueryVariables } from "../../../gql/graphql";
import { GetServerSideProps } from "next";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalItems
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  categoryId: string;
}

import { addApolloState, initializeApollo } from "../../../lib/apolloClient";

const apolloClient = initializeApollo();
export const getServerSideProps: GetServerSideProps<{ params: ICategoryParams }> = async(context) => {
  let params: ICategoryParams = {
    categoryId: context.params?.categoryId as string || '',
  };
  await apolloClient.query<CategoryQuery, CategoryQueryVariables>({
    query: CATEGORY_QUERY,
    variables: {
      input: {
        page: 1,
        slug:params.categoryId,
      },
    },
  });

  console.log({ params });
  
  return addApolloState(apolloClient, {
    props: { params }, // will be passed to the page component as props
  });
  }

 const Category:React.FC<{params:ICategoryParams}> = ({params}) => {

  const { data, loading } = useQuery<CategoryQuery, CategoryQueryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.categoryId,
        },
      },
    }
  );
  return <div><h1>Category</h1>{
    JSON.stringify(data)
  }</div>;
};
export default Category;