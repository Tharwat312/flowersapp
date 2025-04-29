import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function PUT(req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    try {
        const token = await getToken({ req });
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const body = await req.json();
        const { quantity } = body;
        if (!quantity) {
            return NextResponse.json({ error: 'Missing quantity' }, { status: 400 });
        }
        const response = await fetch(`${process.env.APIBaseURL}/cart/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`,
            },
            body: JSON.stringify({
                quantity: quantity
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json({ error: data.message || 'Failed to update product to cart' }, { status: response.status });
        }
        return NextResponse.json({ status: true, data });
    } catch (error) {
        console.error('Error updating product to cart:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
