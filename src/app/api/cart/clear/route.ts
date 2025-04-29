import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(req: NextRequest) {
    try {
        const token = await getToken({ req });
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const res = await fetch(`${process.env.APIBaseURL}cart`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`,
            },
            method: 'DELETE'
        });
        if (!res.ok) {
            const errorMsg = await res.json();
            throw new Error(errorMsg.error);
        }
        const payload = await res.json();
        return NextResponse.json({ payload, status: true })
    } catch (error) {
        console.log(error);
        if (error instanceof Error)
            return NextResponse.json({ success: false, message: error.message })
    }
}