import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth } = NextAuth({
    secret: process.env.SECRET,
    // debug: true,
    session: {},
    // trustHost: true,
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
                return {
                    id: "1",
                    name: "John Doe",
                    email: "credentials.email",
                    image: "https://www.gravatar.com/avatar/",
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
});
