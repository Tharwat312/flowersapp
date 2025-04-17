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
import { LoaderCircle } from "lucide-react"
import trimWhiteSpaces from "@/lib/utils/trimstring"
import useRegister from "./hooks/useregister"
import { createRegisterSchema } from "@/lib/validations/auth/register-schema"
export function RegisterModal({
    open,
    onOpenChange,
    onLoginClick
}: RegisterModalProps) {
    const t = useTranslations();
    const Schema = createRegisterSchema(t)
    type Inputs = z.infer<typeof Schema>
    const form = useForm<Inputs>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            rePassword: "",
            gender: "",
        },
        mode: 'onChange',
        resolver: zodResolver(Schema)
    })
    const { isPending, register } = useRegister();
    const onSubmit: SubmitHandler<Inputs> = (values) => {
        register(trimWhiteSpaces(values));
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-rose-950 main-hover text-white rounded-[30px] px-[20px] py-[8px]">{t('create-account')}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create account</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* First Name */}
                        <FormField control={form.control}
                            name="firstName"
                            render={({ field }) => <FormItem className="mb-4">
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} name="firstName" placeholder={t('first-name')} className="col-span-3" type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                        />
                        {/* Last Name */}
                        <FormField control={form.control}
                            name="lastName"
                            render={({ field }) => <FormItem className="mb-4">
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} name="lastName" placeholder={t('last-name')} className="col-span-3" type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                        />
                        {/* Email */}
                        <FormField control={form.control}
                            name="email"
                            render={({ field }) => <FormItem className="mb-4">
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} name="email" placeholder={t('email-placeholder')} className="col-span-3" type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                        />
                        {/* Password */}
                        <FormField control={form.control}
                            name="password"
                            render={({ field }) => <FormItem className="mb-4">
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} name="password" placeholder={t('password-placeholder')} className="col-span-3" type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                        />
                        {/* RePassword */}
                        <FormField control={form.control}
                            name="rePassword"
                            render={({ field }) => <FormItem className="mb-4">
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} name="rePassword" placeholder={t('repassword')} className="col-span-3" type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                        />
                        {/* Phone */}
                        <FormField control={form.control}
                            name="phone"
                            render={({ field }) => <FormItem className="mb-4">
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} name="phone" placeholder={t('mobile-number')} className="col-span-3" type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                        />
                        {/* Gender */}
                        <FormField control={form.control}
                            name="gender"
                            render={({ field }) => <FormItem className="mb-4">
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} name="gender" placeholder={t('gender')} className="col-span-3" type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                        />
                        <DialogFooter className="items-center sm:flex-col gap-2">
                            <p className="text-sm text-center text-gray-600">
                                {t('already-have-an-account')}
                                <span
                                    className="ms-1 text-rose-950 underline cursor-pointer font-medium"
                                    onClick={() => {
                                        onOpenChange(false);
                                        onLoginClick?.();
                                    }}
                                >
                                    {t('login')}
                                </span>
                            </p>
                            <Button
                                disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
                                className="bg-rose-950 main-hover block w-full" type="submit">{isPending ? <LoaderCircle className="loader" /> : t('create-account')}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
