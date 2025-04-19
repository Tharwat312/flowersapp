import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    try {
        const res = await fetch(`${process.env.APIBaseURL}products/${id}`);
        if (!res.ok) {
            const errorMsg = await res.json();
            throw new Error(errorMsg.error);
        }
        const payload = await res.json();
        return NextResponse.json({ payload, status: true })

    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ success: false, message: error.message })
    }

}