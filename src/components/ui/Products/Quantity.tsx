'use client';

import { Button } from "@/components/ui/shadcn/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface QuantityProps {
    maxQuantity: number;
    onQuantityChange?: (quantity: number) => void;
}

export default function Quantity({ maxQuantity, onQuantityChange }: QuantityProps) {
    const [quantity, setQuantity] = useState(1);

    const updateQuantity = (newQuantity: number) => {
        setQuantity(newQuantity);
        onQuantityChange?.(newQuantity);
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-600">Quantity:</span>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-rose-300 rounded-full"
                    onClick={() => updateQuantity(Math.min(maxQuantity, quantity - 1))}
                    disabled={quantity <= 1}
                >
                    <Minus className="text-rose-950" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-rose-300 rounded-full"
                    onClick={() => updateQuantity(Math.min(maxQuantity, quantity + 1))}
                    disabled={quantity >= maxQuantity}
                >
                    <Plus className="text-rose-950" />
                </Button>
            </div>
        </div>
    );
}