import { cookies } from "next/headers";

export async function getServerHeaders(): Promise<RequestInit> {
    return {
        headers: {
            Cookie: (await cookies()).toString(),
        },
        cache: "no-store",
    };
}
