/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImage\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n": types.RestaurantPartsFragmentDoc,
    "\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImage\n    slug\n    restaurantCount\n  }\n": types.CategoryPartsFragmentDoc,
    "\n  fragment DishParts on Dish {\n    id\n    name\n    price\n    photo\n    description\n    options {\n      name\n      extra\n      choices {\n        name\n        extra\n      }\n    }\n  }\n": types.DishPartsFragmentDoc,
    "\n  fragment OrderParts on Order {\n    id\n    createdAt\n    total\n  }\n": types.OrderPartsFragmentDoc,
    "\n  fragment FullOrderParts on Order {\n    id\n    status\n    total\n    driver {\n      email\n    }\n    customer {\n      email\n    }\n    restaurant {\n      name\n    }\n  }\n": types.FullOrderPartsFragmentDoc,
    "\n  query meQuery {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n": types.MeQueryDocument,
    "\n  query category($input: CategoryInput!) {\n    category(input: $input) {\n      ok\n      error\n      totalPages\n      totalItems\n      restaurants {\n        ...RestaurantParts\n      }\n      category {\n        ...CategoryParts\n      }\n    }\n  }\n  \n  \n": types.CategoryDocument,
    "\n  query restaurant($input: RestaurantInput!) {\n    restaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n      }\n    }\n  }\n  \n  \n": types.RestaurantDocument,
    "\n  mutation createOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      ok\n      error\n      orderId\n    }\n  }\n": types.CreateOrderDocument,
    "\n  \n  \n  query restaurantsPageQuery($input: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    allRestaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalItems\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n": types.RestaurantsPageQueryDocument,
    "\n  query searchRestaurant($input: SearchRestaurantInput!) {\n    searchRestaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalItems\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n": types.SearchRestaurantDocument,
    "\nquery isLoggedIn {\n  isLoggedIn @client\n}": types.IsLoggedInDocument,
    "\n  mutation Login($loginInput: LoginAccountInput!) {\n    loginAccount(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n": types.LoginDocument,
    "\n  mutation SignUp($signUpInput: CreateAccountInput!) {\n    createAccount(input: $signUpInput) {\n      ok\n      error\n    }\n  }\n": types.SignUpDocument,
    "\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n": types.VerifyEmailDocument,
    "\n          fragment VerifiedUser on User {\n            verified\n          }\n        ": types.VerifiedUserFragmentDoc,
    "\n  mutation editUserProfile($input: EditUserProfileInput!) {\n    editUserProfile(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EditUserProfileDocument,
    "\n            fragment EditedUser on User {\n              verified\n              email\n            }\n          ": types.EditedUserFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImage\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n"): (typeof documents)["\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImage\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImage\n    slug\n    restaurantCount\n  }\n"): (typeof documents)["\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImage\n    slug\n    restaurantCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DishParts on Dish {\n    id\n    name\n    price\n    photo\n    description\n    options {\n      name\n      extra\n      choices {\n        name\n        extra\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment DishParts on Dish {\n    id\n    name\n    price\n    photo\n    description\n    options {\n      name\n      extra\n      choices {\n        name\n        extra\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OrderParts on Order {\n    id\n    createdAt\n    total\n  }\n"): (typeof documents)["\n  fragment OrderParts on Order {\n    id\n    createdAt\n    total\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FullOrderParts on Order {\n    id\n    status\n    total\n    driver {\n      email\n    }\n    customer {\n      email\n    }\n    restaurant {\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment FullOrderParts on Order {\n    id\n    status\n    total\n    driver {\n      email\n    }\n    customer {\n      email\n    }\n    restaurant {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query meQuery {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n"): (typeof documents)["\n  query meQuery {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query category($input: CategoryInput!) {\n    category(input: $input) {\n      ok\n      error\n      totalPages\n      totalItems\n      restaurants {\n        ...RestaurantParts\n      }\n      category {\n        ...CategoryParts\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  query category($input: CategoryInput!) {\n    category(input: $input) {\n      ok\n      error\n      totalPages\n      totalItems\n      restaurants {\n        ...RestaurantParts\n      }\n      category {\n        ...CategoryParts\n      }\n    }\n  }\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query restaurant($input: RestaurantInput!) {\n    restaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  query restaurant($input: RestaurantInput!) {\n    restaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n      }\n    }\n  }\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      ok\n      error\n      orderId\n    }\n  }\n"): (typeof documents)["\n  mutation createOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      ok\n      error\n      orderId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  \n  query restaurantsPageQuery($input: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    allRestaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalItems\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  \n  query restaurantsPageQuery($input: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    allRestaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalItems\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchRestaurant($input: SearchRestaurantInput!) {\n    searchRestaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalItems\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query searchRestaurant($input: SearchRestaurantInput!) {\n    searchRestaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalItems\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery isLoggedIn {\n  isLoggedIn @client\n}"): (typeof documents)["\nquery isLoggedIn {\n  isLoggedIn @client\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($loginInput: LoginAccountInput!) {\n    loginAccount(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation Login($loginInput: LoginAccountInput!) {\n    loginAccount(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp($signUpInput: CreateAccountInput!) {\n    createAccount(input: $signUpInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp($signUpInput: CreateAccountInput!) {\n    createAccount(input: $signUpInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          fragment VerifiedUser on User {\n            verified\n          }\n        "): (typeof documents)["\n          fragment VerifiedUser on User {\n            verified\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editUserProfile($input: EditUserProfileInput!) {\n    editUserProfile(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editUserProfile($input: EditUserProfileInput!) {\n    editUserProfile(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n            fragment EditedUser on User {\n              verified\n              email\n            }\n          "): (typeof documents)["\n            fragment EditedUser on User {\n              verified\n              email\n            }\n          "];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;