import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// const authOptions: NextAuthOptions = {
//   debug: true,
//   session: {},
//   logger: {
//     error: console.error,
//     warn: console.warn,
//     debug: console.log,
//     info: console.info,
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Email and Password",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         return {
//           id: "1",
//           name: "Lee Quan-|-405|v8UtMeI2tzXF6Qdgpy7oo5iKY8wxcjjT6LpNsV6Y71962a52",
//           accessToken: "405|v8UtMeI2tzXF6Qdgpy7oo5iKY8wxcjjT6LpNsV6Y71962a52",
//           account: {
//             provider: "email",
//             type: "credentials",
//           },
//           email: "",
//         };
//         // let headers = null;
//         // const res = await fetch(
//         //   `${process.env.FRONTEND_URL}/api/sanctum/csrf-token`
//         // );
//         // if (res.ok) {
//         //   const header = await res.json();
//         //   headers = new Headers({
//         //     ...header,
//         //   });
//         // }
//         // const data = {
//         //   email: credentials?.email,
//         //   password: credentials?.password,
//         // };
//         // const options = {
//         //   method: "POST",
//         //   headers,
//         //   body: JSON.stringify(data),
//         // };

//         // try {
//         //   const response = await fetch(
//         //     "https://dev-api.solesunion.com/auth/login",
//         //     {
//         //       method: "POST",
//         //       headers: {
//         //         "Content-Type": "application/json",
//         //       },
//         //       body: JSON.stringify(data),
//         //     }
//         //   );
//         //   if (response.ok) {
//         //     const responseData = await response.json();

//         //     const user = {
//         //       id: responseData.user.id,
//         //       name: `${responseData.user.name}-|-${responseData.access_token}`,
//         //       email: responseData.user.email,
//         //       accessToken: responseData.access_token,
//         //       account: {
//         //         provider: "email",
//         //         type: "credentials",
//         //       },
//         //     };
//         //     return {
//         //       ...user,
//         //       accessToken: responseData.access_token,
//         //       account: {
//         //         provider: "email",
//         //         type: "credentials",
//         //       },
//         //     };
//         //   } else {
//         //     throw new Error("HTTP error! Status:" + response.status);
//         //   }
//         // } catch (error) {
//         //   throw new Error("HTTP error! Status:" + error);
//         // }
//       },
//     }),
//   ],
//   secret: "OM2aNLORR46RW/N8GE6+EdbY4u3dnF3eLENopihbUvo=",
//   callbacks: {
//     async jwt({
//       token,
//       user,
//       account,
//       profile,
//     }: {
//       token: any;
//       account: any;
//       user: any;
//       profile?: any;
//     }) {
//       if (user) {
//         token.user = user;
//         token.accessToken = user.accessToken;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       session.accessToken = token.accessToken;
//       session.user = token.user;
//       session.role = token.role;
//       return session;
//     },
//   },
// };

const handler = NextAuth({
  debug: true,
  session: {},
  secret: "OM2aNLORR46RW/N8GE6+EdbY4u3dnF3eLENopihbUvo=",
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // const user = {
        //     id: responseData.user.id,
        //     name: responseData.user.name,
        //     email: responseData.user.email,
        //     accessToken: responseData.access_token,
        //     account: {
        //       provider: "email",
        //       type: "credentials",
        //     },
        //   };
        //   return {
        //     ...user,
        //     accessToken: responseData.access_token,
        //     account: {
        //       provider: "email",
        //       type: "credentials",
        //     },
        //   };
        const user = {
          id: "1",
          name: "Lee Quan-|-405|v8UtMeI2tzXF6Qdgpy7oo5iKY8wxcjjT6LpNsV6Y71962a52",
          accessToken: "405|v8UtMeI2tzXF6Qdgpy7oo5iKY8wxcjjT6LpNsV6Y71962a52",
          email: "leequan2000@outlook.com",
          account: {
            provider: "email",
            type: "credentials",
          },
        };
        return {
          ...user,
          accessToken: user.accessToken,
          account: {
            provider: "email",
            type: "credentials",
          },
        };
        // let headers = null;
        // const res = await fetch(
        //   `${process.env.FRONTEND_URL}/api/sanctum/csrf-token`
        // );
        // if (res.ok) {
        //   const header = await res.json();
        //   headers = new Headers({
        //     ...header,
        //   });
        // }
        // const data = {
        //   email: credentials?.email,
        //   password: credentials?.password,
        // };
        // const options = {
        //   method: "POST",
        //   headers,
        //   body: JSON.stringify(data),
        // };

        // try {
        //   const response = await fetch(
        //     "https://dev-api.solesunion.com/auth/login",
        //     {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify(data),
        //     }
        //   );
        //   if (response.ok) {
        //     const responseData = await response.json();

        //     const user = {
        //       id: responseData.user.id,
        //       name: `${responseData.user.name}-|-${responseData.access_token}`,
        //       email: responseData.user.email,
        //       accessToken: responseData.access_token,
        //       account: {
        //         provider: "email",
        //         type: "credentials",
        //       },
        //     };
        //     return {
        //       ...user,
        //       accessToken: responseData.access_token,
        //       account: {
        //         provider: "email",
        //         type: "credentials",
        //       },
        //     };
        //   } else {
        //     throw new Error("HTTP error! Status:" + response.status);
        //   }
        // } catch (error) {
        //   throw new Error("HTTP error! Status:" + error);
        // }
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
});

export { handler as GET, handler as POST };
