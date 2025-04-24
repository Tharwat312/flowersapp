import { Button } from "@/components/ui/shadcn/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn/dialog"
import { Input } from "@/components/ui/shadcn/input"
import { useTranslations } from "next-intl"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/shadcn/form'
import useLogin from "./hooks/uselogin"
import { Loader } from "lucide-react"
import trimWhiteSpaces from "@/lib/utils/trimstring"
import { createLoginSchema } from "@/lib/validations/auth/login-schema"
export function LoginModal({
    open,
    onOpenChange,
    onRegisterClick
}: LoginModalProps) {


    const t = useTranslations();
    const Schema = createLoginSchema(t);
    type Inputs = z.infer<typeof Schema>
    const form = useForm<Inputs>({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: 'onChange',
        resolver: zodResolver(Schema)
    });
    const { isPending, login } = useLogin({
        onSuccess: () => {
            onOpenChange?.(false);
        }
    });
    const onSubmit: SubmitHandler<Inputs> = (values) => {
        login(trimWhiteSpaces(values))
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-rose-950 main-hover text-white rounded-[30px] px-[20px] py-[8px]">{t('login')}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login to your account</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control}
                            name="email"
                            render={({ field }) => <FormItem className="mb-4">
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} id="email" name="email" placeholder={t('email-placeholder')} className="col-span-3" type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                        />

                        <FormField control={form.control}
                            name="password"
                            render={({ field }) => <FormItem className="mb-4">
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} id="password" name="password" placeholder={t('password-placeholder')} className="col-span-3" type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                        />
                        <DialogFooter className="items-center sm:flex-col gap-2">
                            <p className="text-sm text-center text-gray-600">
                                {t('no-account')}
                                <span
                                    className="ms-1 text-rose-950 underline cursor-pointer font-medium"
                                    onClick={() => {
                                        onOpenChange(false);
                                        onRegisterClick?.();
                                    }}
                                >
                                    {t('create-account-now')}
                                </span>
                            </p>
                            <Button
                                disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
                                className="bg-rose-950 main-hover flex w-full justify-center" type="submit">{isPending ? <Loader color="#000000" /> : t('login')}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
