"use client";

import { ApolloLink, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { BACKEND_URL } from "../constants";

function makeClient(session: any) {
  let uri = `${BACKEND_URL}/graphql`;
  const httpLink = new HttpLink({
    uri,
    headers: {
      "Content-Type": "application/json",
      "X-Frontend-URL": window.location.href,
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
