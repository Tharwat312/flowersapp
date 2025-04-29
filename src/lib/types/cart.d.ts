type Cart = {
    _id: string;
    user: string;
    cartItems: CartItem[];
    discount: number;
    totalPrice: number;
    totalPriceAfterDiscount: number;
    numOfCartItems: number;
};
