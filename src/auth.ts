import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "./lib/types/auth";
import { NextAuthOptions, User } from "next-auth";
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
                const customUser = user as User & { user: any; token: string };
                token.user = customUser.user
                token.token = customUser.token
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token.user) {
                session.user = token.user as {
                    id: string;
                    email: string;
                    name?: string;
                    firstName: string;
                    lastName: string;
                    gender: "male" | "female";
                    phone: string;
                    photo: string | null;
                    role: "user" | "admin";
                    wishlist: [];
                    addresses: [];
                };
            }
            return session;
        }
    },
    session: {
        strategy: "jwt"
    }
}