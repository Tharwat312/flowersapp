// declare module "next-auth" {
//     interface User {
//         "user": {
//             "firstName": string,
//             "lastName": string,
//             "email": string,
//             "gender": "male" | "female",
//             "phone": string,
//             "photo": string | null,
//             "role": "user" | "admin",
//             "wishlist": [],
//             "addresses": [],
//         } & DataBaseRecords,
//         "token": string
//     }
//     interface Session extends Omit<User, "token"> {

//     }
// }

// import NextAuth from "next-auth";

// declare module "next-auth" {
//     interface Session {
//         user: {
//             id: string;
//             email: string;
//             name?: string;
//             "firstName": string,
//             "lastName": string,
//             "email": string,
//             "gender": "male" | "female",
//             "phone": string,
//             "photo": string | null,
//             "role": "user" | "admin",
//             "wishlist": [],
//             "addresses": [],

//             // any other custom fields
//         };
//     }
// }

// declare module "next-auth/jwt" {
//     interface JWT {
//         user?: {
//             id: string;
//             email: string;
//             token?: string;
//         };
//     }
// }

// types/next-auth.d.ts
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
            wishlist: string[]; // Replace 'any' with proper type if possible
            addresses: string[]; // Replace 'any' with proper type if possible
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

// Shared API response type
export interface APIResponse<T> {
    data?: T;
    error?: string;
}

// Login response type
export interface LoginResponse {
    user: Session["user"];
    token: string;
}