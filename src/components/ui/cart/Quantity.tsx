'use client';

import { Button } from "@/components/ui/shadcn/button";
import { useCartStore } from "@/stores/cart";
import { Loader, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface QuantityProps {
    maxQuantity: number;
    quantity: number;
    productId: string
}

export default function QuantityCartButtons({ quantity, maxQuantity, productId }: QuantityProps) {
    const [quantityUpdate, setQuantity] = useState(quantity);
    const router = useRouter();
    const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
    const [loading, setIsLoading] = useState(false);
    const handleUpdateProduct = async (quantity: number, id: string) => {
        setIsLoading(true);
        try {
            await updateProductQuantity(id, quantity);
            toast.success("Product Quantity Updated Successfully");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.success("Failed To Update Product Quantity");
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-rose-300 rounded-full"
                    onClick={() => {
                        const newQuantity = quantityUpdate - 1;
                        setQuantity(newQuantity);
                        handleUpdateProduct(newQuantity, productId);
                    }}
                    disabled={quantity <= 1 || loading === true}
                >
                    {loading ? <Loader className="text-black" /> : <Minus className="text-rose-950" />}
                </Button>
                <span className="w-8 text-center">{quantityUpdate}</span>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-rose-300 rounded-full"
                    onClick={() => {
                        const newQuantity = quantityUpdate + 1;
                        setQuantity(newQuantity);
                        handleUpdateProduct(newQuantity, productId);
                    }}

                    disabled={quantityUpdate >= maxQuantity || loading === true}
                >
                    {loading ? <Loader className="text-black" /> : <Plus className="text-rose-950" />}
                </Button>
            </div >
        </div >
    );
}