'use client';

import { useState } from "react";
import Quantity from "./Quantity";
import AddToCartButton from "@/components/ui/AddToCartBtn/AddToCartButton";

interface ProductProps {
    product: {
        _id: string;
        quantity: number;
    };
}

export default function ProductButtons({ product }: ProductProps) {
    const [quantity, setQuantity] = useState(1);
        return (<>
            <Quantity maxQuantity={product.quantity} onQuantityChange={setQuantity} />
            <AddToCartButton product={product._id} quantity={quantity} />
        </>
        );
}
