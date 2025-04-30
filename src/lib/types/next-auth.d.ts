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