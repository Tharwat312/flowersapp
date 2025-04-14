import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useLogin({ onSuccess }: { onSuccess: () => void }) {
    const t = useTranslations();
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
            toast.success(t('login-success'))
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.message);
        }
    })

    return { isPending, error, login: mutate }
}