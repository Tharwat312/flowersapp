'use client';

import { Button } from "@/components/ui/shadcn/button";
import { useCartStore } from "@/stores/cart";
import { Loader, ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface AddToCartButtonProps {
    product: string;
    quantity: number;
}

function AddToCartButton({ product, quantity }: AddToCartButtonProps) {
    const pathName = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const addProduct = useCartStore((state) => state.addProduct);
    const { data: session } = useSession();
    const handleAddToCart = async () => {
        if (!session) {
            toast.error("Please log in to add items to cart.");
            return;
        }
        setIsLoading(true);
        try {
            await addProduct({ product, quantity });
            toast.success("Product added to cart successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to add to cart.");
        }
        finally {
            setIsLoading(false);
        }
    };
    if (pathName.includes("/product/")) return <Button
        onClick={handleAddToCart}
        className="px-6 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition"
    >
        {isLoading ? <Loader /> : 'Add to Cart'}
    </Button>
    return (
        <Button className="w-[42px] h-[42px] bg-[#8C52FF] hover:bg-[#bd9cff] rounded-full cursor-pointer"
            onClick={handleAddToCart} disabled={isLoading}
        >
            {isLoading ? <Loader /> : <ShoppingBag color="#ffffff" />}
        </Button>
    );
}

export default AddToCartButton;
