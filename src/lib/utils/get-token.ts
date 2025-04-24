import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getServerTokenFromRequest(req: NextRequest) {
    const token = await getToken({ req });
    if (!token) {
        throw new Error("Unauthenticated");
    }
    return token.token;
}

