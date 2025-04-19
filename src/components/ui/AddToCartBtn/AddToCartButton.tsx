'use client';

import { Button } from "@/components/ui/shadcn/button";
import { Loader, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useAddToCart } from "../Products/hooks/useAddToCart";

interface AddToCartButtonProps {
    product: string;
    quantity: number;
}

function AddToCartButton({ product, quantity }: AddToCartButtonProps) {
    const pathName = usePathname();
    const { mutate, isPending } = useAddToCart();

    const addToCart = () => {
        mutate(
            { product, quantity },
            {
                onSuccess: () => toast.success("Product added to cart successfully!"),
                onError: () => toast.error("Failed to add to cart."),
            }
        );
    };
    if (pathName.includes("/product/")) return <Button
        onClick={addToCart}
        className="px-6 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition"
    >
        {isPending ? <Loader /> : 'Add to Cart'}
    </Button>
    return (
        <Button className="w-[42px] h-[42px] bg-[#8C52FF] hover:bg-[#bd9cff] rounded-full cursor-pointer"
            onClick={addToCart} disabled={isPending}
        >
            {isPending ? <Loader /> : <ShoppingBag color="#ffffff" />}
        </Button>
    );
}

export default AddToCartButton;
