'use client';

import { CircleX, Loader } from "lucide-react";
import { Button } from "../shadcn/button";
import { useCartStore } from "@/stores/cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function DeleteItem({ productId }: { productId: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const deleteProduct = useCartStore((state) => state.deleteProduct);
    const handleDelete = async (id: string) => {
        setIsLoading(true);
        try {
            await deleteProduct(id);
            toast.success("Producted Deleted Succesfully");
            router.refresh();
        } catch (error) {
            console.error("Error in handleDelete:", error);
            alert("An error occurred while deleting the product.");
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <Button
            className="bg-white hover:bg-rose-200 cursor-pointer"
            disabled={isLoading}
            onClick={() => handleDelete(productId)}>
            {isLoading ? <Loader className="text-black" /> :
                <CircleX className="text-rose-950" />}</Button>
    )
}