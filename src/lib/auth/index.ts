import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getClient } from "../graphql/apollo-client";
import { LOGIN_MUTATION } from "../graphql/mutations/authMutations";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { BACKEND_URL } from "../constants";
import { cookies } from "next/headers";
import { encrypt } from "../utils";

declare module "next-auth" {
  interface Session {
    user: {
      token: {
        access_token: string;
        expires_at: number;
        refresh_token: string;
      };
    } & DefaultSession["user"];
    token: {
      user: {
        id: string;
        email: string;
        name: string;
        role: string;
      };
    };
    expires: string;
  }
}

export const { handlers, auth, signOut } = NextAuth({
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const client = new ApolloClient({
          cache: new InMemoryCache(),
          link: new HttpLink({
            uri: `${BACKEND_URL}/graphql`,
          }),
        });

        try {
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email,
              password,
            },
          });
          if (data.LoginMutation.success) {
            const { access_token, user } = data.LoginMutation;
            cookies().set("s_v1", encrypt(access_token));
            return {
              id: user.id,
              name: user.name,
              access_token,
              email: user.email,
            };
          } else {
            return null;
          }
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return false;
    },
    session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          token: {
            access_token: token.access_token,
            expires_at: token.expires_at,
            refresh_token: token.refresh_token,
          },
        },
      };
    },
    async jwt(test) {
      const { token, user, account, profile, ...props } = test;

      if (account && user) {
        const tempUser: any = { ...user };
        token.access_token = tempUser.access_token + "access";
        token.expires_at = 0;
        token.id = user.id;
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          token: account.access_token,
        };
      }

      return token;
    },
  },
});
