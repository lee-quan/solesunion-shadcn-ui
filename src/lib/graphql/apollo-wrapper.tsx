"use client";

import { ApolloLink, HttpLink, from, concat } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { BACKEND_URL } from "../constants";
import { useAuthSession } from "../auth/useAuthSession";
import { useMemo } from "react";
import { setContext } from "@apollo/client/link/context";
import { useSession } from "next-auth/react";

function makeClient(session: any) {
  let uri = `${BACKEND_URL}/graphql${session ? "/authenticated" : ""}`;
  const httpLink = new HttpLink({
    uri,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  if (session) {
    const authLink = setContext((_, { headers }) => {
      if (session) {
        const token = session?.user?.token?.access_token;
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

    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link:
        typeof window === "undefined"
          ? ApolloLink.from([
              errorLink,
              new SSRMultipartLink({
                stripDefer: true,
              }),
              authLink,
              httpLink,
            ])
          : from([errorLink, authLink, httpLink]),
    });
  }
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            errorLink,
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : from([errorLink, httpLink]),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const { data } = useSession();
  const client = useMemo(() => makeClient(data), [data]);
  return (
    <ApolloNextAppProvider makeClient={() => client}>
      {children}
    </ApolloNextAppProvider>
  );
}
