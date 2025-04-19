import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const body = await req.json();
        const { product, quantity } = body;
        if (!product || !quantity) {
            return NextResponse.json({ error: 'Missing product or quantity' }, { status: 400 });
        }
        const response = await fetch(`${process.env.APIBaseURL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`,
            },
            body: JSON.stringify({
                product: product,
                quantity: quantity,
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json({ error: data.message || 'Failed to add to cart' }, { status: response.status });
        }
        return NextResponse.json({ status: true, data });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
