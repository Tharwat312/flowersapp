import { useCartStore } from "@/stores/cart";
import { useMutation } from "@tanstack/react-query";

type AddToCartPayload = {
    product: string;
    quantity: number;
}

export function useAddToCart() {
    const getUserCart = useCartStore((state) => state.getUserCart);
    return useMutation({
        mutationFn: async ({ product, quantity }: AddToCartPayload) => {
            const res = await fetch("/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ product, quantity }),
            });
            const data = await res.json();
            console.log(data);
            getUserCart();
            if (!res.ok || data.status !== true) {
                throw new Error(data?.message || "Failed to add to cart");
            }
            return data;
        },
    });
}
