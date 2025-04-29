import { useCartStore } from "@/stores/cart";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useLogin({ }) {
    const t = useTranslations();
    const getUserCart = useCartStore((state) => state.getUserCart);
    const { isPending, error, mutate } = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            const response = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if (response?.error) {
                console.log(response);
                throw new Error(response.error);
            }

            return response;
        },
        onSuccess: () => {
            toast.success(t('login-success'));
            getUserCart();
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.message);
        }
    })

    return { isPending, error, login: mutate }
}