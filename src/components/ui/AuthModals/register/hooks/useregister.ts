import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { RegisterAction } from "../_actions/register-action";
export default function useRegister() {
    const t = useTranslations();
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (values: FormValues) => RegisterAction(values),
        onSuccess: async (values) => {
            await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password
            });
            toast.success(t('account-registered'))

        },
        onError: (error) => {
            toast.error(error.message || t('something-wrong-happened'));
        }
    })

    return { isPending, error, register: mutate }
}