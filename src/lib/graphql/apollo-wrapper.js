"use client";

import { onError } from "@apollo/client/link/error";
import { ApolloLink, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { BACKEND_URL } from "../constants";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const removeTypeNameLink = removeTypenameFromVariables();

const removeTypenameFromResponseLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const data = response.data;
    const removeTypename = (value) => {
      if (value !== null && typeof value === "object") {
        delete value.__typename; // Delete __typename property
        Object.values(value).forEach(removeTypename); // Recursively delete __typename
      }
    };
    removeTypename(data);
    return response;
  });
});

function makeClient(session) {
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
          // "graphql-schema": "authenticated_user", // Custom header to indicate the desired schema
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

  const link = from([
    errorLink,
    authLink,
    removeTypeNameLink,
    // removeTypenameFromResponseLink,
    httpLink,
  ]);
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    headers: {
      "Content-Type": "application/json",
    },
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : link,
  });
}

export function ApolloWrapper({ children }) {
  const { data: session } = useSession(); // Or getSession() if outside a component

  const client = useMemo(() => makeClient(session), [session]);
  return (
    <ApolloNextAppProvider
      makeClient={() => {
        return makeClient(session);
      }}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
