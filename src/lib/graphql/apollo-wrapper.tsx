"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { makeClient } from "./client";
import { ApolloProvider } from "@apollo/client";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession(); // Or getSession() if outside a component

  const client = useMemo(() => makeClient(session), [session]);
  // return (

  //   <ApolloNextAppProvider
  //     makeClient={() => {
  //       return client;
  //     }}
  //   >
  //     {children}
  //   </ApolloNextAppProvider>
  // );
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
