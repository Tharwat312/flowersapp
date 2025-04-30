import { User } from "next-auth"
declare module "next-auth" {
    interface User {
        "user": {
            "firstName": string,
            "lastName": string,
            "email": string,
            "gender": "male" | "female",
            "phone": string,
            "photo": string | null,
            "role": "user" | "admin",
            "wishlist": [],
            "addresses": [],
        } & DataBaseRecords,
        "token": string
    }
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends Omit<User, "token"> {

    }
}



