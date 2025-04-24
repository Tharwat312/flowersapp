import { getServerTokenFromRequest } from "@/lib/utils/get-token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = await getServerTokenFromRequest(req);
    try {
        const res = await fetch(`${process.env.APIBaseURL}cart`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const payload = await res.json();
        return NextResponse.json({ data: payload, success: true });
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ error: error.message }, { status: 401 });
    }
}