
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    console.log(token)
    if (!token || !token.token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const logoutRes = await fetch(`${process.env.APIBaseURL}/auth/logout`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token.token}`,
                "Content-Type": "application/json",
            },
        });
        if (!logoutRes.ok) {
            return NextResponse.json({ error: "Logout failed" }, { status: 500 });
        }
        const payload = await logoutRes.json();
        console.log(payload);
        return NextResponse.json({ success: true, payload });
    }
    catch (error) {
        console.log(error);
    }

}