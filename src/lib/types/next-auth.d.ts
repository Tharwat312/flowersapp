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
}



