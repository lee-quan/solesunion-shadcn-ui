import { setContext } from "@apollo/client/link/context";
import { BACKEND_URL } from "../constants";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  NextSSRApolloClient,
  // NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr";
import { getServerSession } from "next-auth/next";
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export function makeClient(session: any) {
  let uri = `${BACKEND_URL}/graphql`;
  if (session) {
    uri += "/authenticated";
  }
  const authLink = setContext((_, { headers }) => {
    if (session) {
      const token = session?.user?.name?.split("-|-")[1];
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      return { headers };
    }
  });

  const httpLink = new HttpLink({
    uri,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const link = from([errorLink, authLink, httpLink]);
  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
}

export async function useClient() {
  const session = await getServerSession();
  return makeClient(session);
}
