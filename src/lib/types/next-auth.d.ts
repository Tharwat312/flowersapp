
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user?: {
            id: string;
            email: string;
            name?: string;
            firstName: string;
            lastName: string;
            gender: "male" | "female";
            phone: string;
            photo: string | null;
            role: "user" | "admin";
            wishlist: string[];
            addresses: string[];
        };
    }

    interface User extends DefaultUser {
        user: Session["user"];
        token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        user?: User["user"];
        token?: string;
    }
}

export interface APIResponse<T> {
    data?: T;
    error?: string;
}

export interface LoginResponse {
    user: Session["user"];
    token: string;
}