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

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
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

    const link = from([errorLink, authLink, httpLink]);
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
