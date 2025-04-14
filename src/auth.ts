import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "./lib/types/auth";
export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/",
        error: "/"
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.APIBaseURL}/auth/signin`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                })
                const payload: APIResponse<LoginResponse> = await response.json();
                if ('error' in payload) {
                    throw new Error(payload.error);
                }
                return payload;
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = user.user
                token.token = user.token
            }
            return token;
        },
        session: ({ session, token }) => {
            session.user = token.user
            return session;
        }
    },
    session: {
        strategy: "jwt"
    }
}