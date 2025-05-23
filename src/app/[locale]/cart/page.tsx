import ClearCart from "@/components/ui/cart/ClearCart";
import DeleteItem from "@/components/ui/cart/deleteitem";
import QuantityCartButtons from "@/components/ui/cart/Quantity";
import { Button } from "@/components/ui/shadcn/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/shadcn/table"
import { getServerHeaders } from "@/lib/utils/token-cookies-headers";
import { CircleX } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
const getUserCart = async () => {
    const headers = await getServerHeaders();
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cart/get`, headers);
        const payload = await res.json();
        const { cart } = payload.data;
        console.log(cart.cartItems.length);
        return cart;
    } catch (error) {
        console.error('Failed to fetch cart:', error);
        return null;
    }
}
export default async function Page() {
    const cart = await getUserCart();
    const t = await getTranslations();
    return (
        <section className="min-h-screen py-8 mt-20">
            {cart.cartItems.length === 0 ? <p className="text-center flex flex-col items-center justify-center mt-56 text-5xl">
                <CircleX className="text-rose-950" size={100} />
                No Products In Your Cart
            </p> :
                <div className="container grid grid-cols-1 lg:grid-cols-3 gap-x-32 items-center">
                    {/* Cart Table - spans 2 columns on large screens */}
                    <div className="lg:col-span-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">IMAGE</TableHead>
                                    <TableHead className="text-center">PRODUCT NAME</TableHead>
                                    <TableHead className="text-center">PRICE</TableHead>
                                    <TableHead className="text-center">QUANTITY</TableHead>
                                    <TableHead className="text-center">SUB TOTAL</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.cartItems.map((item: CartItem) => (
                                    <TableRow className="text-center" key={item.product._id}>
                                        <TableCell>
                                            <Image src={item.product.imgCover} width={200} height={200} className="rounded-2xl" alt={item.product.description} />
                                        </TableCell>
                                        <TableCell>{item.product.title}</TableCell>
                                        <TableCell>{item.product.price} {t('egp')}</TableCell>
                                        <TableCell><QuantityCartButtons maxQuantity={5000} productId={item.product._id} quantity={item?.quantity} /></TableCell>
                                        <TableCell>{item.product.price * item.quantity} {t('egp')}</TableCell>
                                        <TableCell>
                                            <DeleteItem productId={item.product._id} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Cart Summary */}
                    <div className="bg-pink-100 rounded-xl p-6 h-fit">
                        <h2 className="text-lg font-semibold mb-4">{t('cart-header')}</h2>
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                                <span>{t('price-discount')}</span>
                                <span>{cart.totalPriceAfterDiscount} {t('egp')}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>{t('discount')}</span>
                                <span>{cart.discount}%</span>
                            </li>
                            <li className="flex justify-between">
                                <span>{t('shipping')}</span>
                                <span>{t('free')}</span>
                            </li>
                            <li className="flex justify-between font-bold text-pink-600">
                                <span>{t('total-price')}</span>
                                <span>{cart.totalPrice} {t('egp')}</span>
                            </li>
                        </ul>
                        <Button className="cursor-pointer mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full transition">
                            {t('checkout-now')} →
                        </Button>
                        <ClearCart />
                    </div>
                </div>}
        </section >
    );
}
