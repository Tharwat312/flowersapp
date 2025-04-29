import { create } from 'zustand';

export const useCartStore = create<CartStore>((set) => ({
    cart: null,
    numOfCartItems: 0,
    getUserCart: async () => {
        try {
            const res = await fetch('/api/cart/get');
            const payload = await res.json();
            const { cart, numOfCartItems } = payload.data;
            set({ cart, numOfCartItems });
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        }
    },
    addProduct: async ({ product, quantity }) => {
        try {
            const res = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product, quantity }),
            });
            const payload = await res.json();
            if (!res.ok || payload.status !== true) {
                throw new Error(payload?.message || 'Failed to add to cart');
            }
            const { cart, numOfCartItems } = payload.data;
            set({ cart, numOfCartItems });
        } catch (error) {
            console.error('Failed to add product to cart:', error);
            throw error;
        }
    },
    deleteProduct: async (productId) => {
        try {
            const res = await fetch(`/api/cart/delete/${productId}`, { method: 'DELETE' });
            if (!res.ok) return null
            const payload = await res.json();
            console.log(payload);
            const { cart, numOfCartItems } = payload.payload;
            set({ cart, numOfCartItems });
        } catch (error) {
            console.log(error);
        }
    },
    clearCart: async () => {
        try {
            const res = await fetch(`/api/cart/clear`, { method: 'DELETE' });
            if (!res.ok) return null
            const payload = await res.json();
            console.log(payload);
            set({ cart: null, numOfCartItems: null })
        } catch (error) {
            console.log(error);
        }
    },
    updateProductQuantity: async (id: string, quantity: number) => {
        try {
            const res = await fetch(`/api/cart/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            });
            if (!res.ok) return null
            const payload = await res.json();
            console.log(payload.data);
            const { cart, numOfCartItems } = payload.data;
            set({ cart, numOfCartItems });
        } catch (error) {
            console.log(error);
        }
    },
}));
