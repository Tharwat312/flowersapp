'use client';

import { CircleX } from "lucide-react";
import { Button } from "../shadcn/button";
import { useRouter } from "next/navigation";


export default function DeleteItem({ productId }: { productId: string }) {
    const router = useRouter();
    const deleteItem = async (id: string) => {
        try {
            const res = await fetch(`/api/cart/delete/${id}`, { method: 'DELETE' });
            if (!res.ok) return null
            const payload = await res.json();
            console.log(payload);
            router.refresh();
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button
            className="bg-white hover:bg-rose-200 cursor-pointer"
            onClick={() => deleteItem(productId)}><CircleX className="text-rose-950" /></Button>
    )
}