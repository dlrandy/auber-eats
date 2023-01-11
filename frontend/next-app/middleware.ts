import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTVerifyResult, ProtectedHeaderParameters } from "jose";
import { authTokenVar, initializeApollo, isLoggedInVar } from "./lib/apolloClient";
import { gql } from "@apollo/client";
import { UserProfileQuery, UserProfileQueryVariables } from "./gql/graphql";
const apolloClient = initializeApollo();
const USER_QUERY = gql`
    query userProfile($input: Float!) {
      userProfile(userId: $input) {
      ok
      error
      user{
        id
        email
      }
    }
  }
`;

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
 
  const token = req.cookies?.get("token")?.value || '';
 
  const decoded:JWTVerifyResult|null = token ? await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET)) : null;
 
  const { pathname } = req.nextUrl;
 



  const user = decoded?.payload?.id ? await apolloClient.query<UserProfileQuery, UserProfileQueryVariables>({
    query: USER_QUERY,
    variables: {
      
      input: decoded?.payload?.id  as number

    },
  }) : null;
 
    const isLogined = !!user?.data.userProfile.user?.id;
 console.log("isLogined ", isLogined);
    isLoggedInVar(isLogined);
    authTokenVar(isLogined ? token : '');
 
  //@ts-ignore
  req['user'] = user;


  if (
    pathname.startsWith("/_next") ||
    pathname.includes("login") ||
    user?.data.userProfile.user?.email||
    pathname.includes("/static") ||
    ['favicon.ico', '/'].includes(pathname)
  ) {
    return NextResponse.next();
  }

  if ((!token || !user?.data.userProfile.user?.id) && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }

}


