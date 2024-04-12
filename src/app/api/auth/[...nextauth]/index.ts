import { BACKEND_URL } from "@/lib/constants";
import { LOGIN_MUTATION } from "@/lib/graphql/mutations/authMutations";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
  session: {},
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return {
          id: "1",
          name: "Lee Quan-|-405|v8UtMeI2tzXF6Qdgpy7oo5iKY8wxcjjT6LpNsV6Y71962a52",
          accessToken: "405|v8UtMeI2tzXF6Qdgpy7oo5iKY8wxcjjT6LpNsV6Y71962a52",
          account: {
            provider: "email",
            type: "credentials",
          },
          email: "",
        };
        try {
          const client = new ApolloClient({
            link: new HttpLink({
              uri: `${BACKEND_URL}/graphql`,
              headers: {
                "Content-Type": "application/json",
              },
            }),
            cache: new InMemoryCache(),
          });

          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email: credentials?.email,
              password: credentials?.password,
            },
          });

          const loginResponse = data.login;
          if (loginResponse.success) {
            return {
              id: loginResponse.user.id,
              name: `${loginResponse.user.name}-|-${loginResponse.access_token}`,
              email: loginResponse.user.email,
              role: loginResponse.user.role,
              accessToken: loginResponse.access_token,
              account: {
                provider: "email",
                type: "credentials",
              },
            };
          } else {
            throw new Error(
              JSON.stringify({
                error: loginResponse.message,
                status: false,
              })
            );
          }
        } catch (e: any) {
          throw new Error(JSON.parse(e.message).error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
    }: {
      token: any;
      account: any;
      user: any;
      profile?: any;
    }) {
      if (user) {
        token.user = user;
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      session.role = token.role;
      return session;
    },
  },
};
