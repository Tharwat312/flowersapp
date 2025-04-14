import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(`${process.env.APIBaseURL}/products`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorMsg = await response.json();
            throw new Error(errorMsg.message);
        }
        const payload = await response.json();
        return NextResponse.json({ success: true, payload })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message })
        }
    }
}