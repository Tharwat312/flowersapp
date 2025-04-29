declare type CartStore = {
    cart: Cart | null;
    numOfCartItems: number | null;
    getUserCart: () => void;
    addProduct: ({ product, quantity }: { product: string, quantity: number }) => void;
    deleteProduct: (productId: string) => void;
    updateProductQuantity: (qunatity,id) => void;
    clearCart: () => void;
};