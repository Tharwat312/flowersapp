'use client';

import { Loader } from "lucide-react";
import { Button } from "../shadcn/button";
import { useCartStore } from "@/stores/cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";


export default function ClearCart() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const clearCart = useCartStore((state) => state.clearCart);
    const t = useTranslations();
    const handleClear = async () => {
        setIsLoading(true);
        try {
            await clearCart();
            toast.success("Cart Cleared Succesfully");
            router.refresh();
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <Button className="cursor-pointer mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full transition"
            onClick={handleClear}
            disabled={isLoading}>
            {isLoading ?
                <Loader className="text-white" /> :
                t('clear-cart')
            }
        </Button>
    )
}