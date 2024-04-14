"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { BACKEND_URL } from "../constants";
import { useAuthSession } from "../auth/useAuthSession";
import { useMemo } from "react";

function makeClient(session: any) {
  let uri = `${BACKEND_URL}/graphql${session ? "/a_v1" : ""}`;

  console.log(uri);
  const httpLink = new HttpLink({
    uri,
    headers: {
      Authorization: session ? `Bearer ${session.user.token.access_token}` : "",
    },
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const session = useAuthSession();

  const client = useMemo(() => {
    console.log(session);
    return makeClient(session);
  }, [session]);
  return (
    <ApolloNextAppProvider makeClient={() => client}>
      {children}
    </ApolloNextAppProvider>
  );
}
function setContext(
  arg0: (_: any, { headers }: { headers: any }) => { headers: any }
) {
  throw new Error("Function not implemented.");
}
