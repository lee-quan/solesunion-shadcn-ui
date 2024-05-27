import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { BACKEND_URL } from "../constants";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    },
    link: new HttpLink({
      uri: `${BACKEND_URL}/graphql`,
      fetch: function (uri, options) {
        return fetch(uri, {
          ...(options ?? {}),
          headers: {
            ...(options?.headers ?? {}),
          },
          next: {
            revalidate: 0,
          },
        });
      },
    }),
  });
});

// export const getClient = () => {
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       uri: `${BACKEND_URL}/graphql`,
//     }),
//   });
// };
