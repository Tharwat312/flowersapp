"use client"
import useProducts from "./hooks/useProducts";
import { Button } from "@/components/ui/shadcn/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/shadcn/card"
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";

export default function Products() {
    const { data, isError, isLoading } = useProducts();
    return (
        <div className="min-h-screen">
            <div className="mb-10">
                <h2 className="text-3xl font-bold inline-block relative pb-2">
                    Popular Items
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-rose-400 rounded-full"></span>
                </h2>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.payload?.products?.map((product: Product) => (
                    <Card key={product._id} className="relative group overflow-hidden transition duration-30 border-0 shadow-transparent">
                        <CardContent className="p-0">
                            <div className="relative aspect-square m-2 rounded-[20px] overflow-hidden bg-product-background">
                                <Image
                                    src={product.imgCover}
                                    alt={product.title}
                                    fill
                                    className="object-contain transition-transform duration-300 group-hover:scale-110 p-10"
                                />
                                <button className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-rose-50">
                                    <Heart className="w-5 h-5 text-rose-500" />
                                </button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-2 p-3">
                            <h3 className="font-semibold text-base">{product.title}</h3>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-[#F05454] font-bold text-lg">${product.price}</span>
                                <Button className="w-[42px] h-[42px] bg-[#8C52FF] hover:bg-[#bd9cff] rounded-full cursor-pointer"><ShoppingBag color="#ffffff" /></Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}