import { gql, useQuery } from "@apollo/client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import  Link from "next/link";
import Head from "next/head";
import {useRouter} from "next/router";
import { Restaurant } from "../../../components/Restaurant/Restaurant";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../../fragments";
import {
  RestaurantsPageQueryQuery,
  RestaurantsPageQueryQueryVariables,
} from "../../../gql/graphql";

const RESTAURANTS_QUERY = gql`
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    allRestaurants(input: $input) {
      ok
      error
      totalPages
      totalItems
      restaurants {
        ...RestaurantParts
      }
    }
  }
`;

interface IFormProps {
  searchTerm: string;
}

const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    RestaurantsPageQueryQuery,
    RestaurantsPageQueryQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const router = useRouter();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    router.push(`/client/search/?term=${searchTerm}`);
  };
  return (
    <div>
      <Head>
        <title>Home | Nuber Eats</title>
      </Head>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
      >
        <input
          {...register("searchTerm",{ required: true, min: 3 })}
          name="searchTerm"
          type="Search"
          className="input rounded-md border-0 w-3/4 md:w-3/12"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto ">
            {data?.allCategories.categories?.map((category) => (
              <Link key={category.id} href={`/client/category/${category.slug}`}>
                <div className=" group flex flex-col  items-center cursor-pointer">
                  <div
                    className=" w-16 h-16 bg-cover group-hover:bg-red-100  rounded-full"
                    style={{ backgroundImage: `url(${category.coverImage})` }}
                  ></div>
                  <span className=" group-hover:text-red-600 mt-1 text-sm text-center font-medium">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.allRestaurants.restaurants?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ""}
                coverImg={restaurant.coverImage}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.allRestaurants.totalPages}
            </span>
            {page !== data?.allRestaurants.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;