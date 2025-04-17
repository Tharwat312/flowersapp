import * as z from 'zod';
import { useTranslations } from 'next-intl';

export const createRegisterSchema = (t: ReturnType<typeof useTranslations>) => {
    return z.object({
        firstName: z.string({ required_error: t('fname-required') })
            .min(1, t('fname-required'))
            .max(10, t('name-long')),
        lastName: z.string({ required_error: t('fname-required') })
            .min(1, t('fname-required'))
            .max(10, t('name-long')),
        email: z.string({ required_error: t('email-error') })
            .min(1, t('email-error'))
            .email(t('invalid-email-address')),
        password: z.string({ required_error: t('password-required') })
            .min(1, t('password-required'))
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, t('password-validation')),
        rePassword: z.string({ required_error: t('password-required') }),
        gender: z.string().trim()
            .refine(value => value.toLowerCase() === 'male' || value.toLowerCase() === 'female', {
                message: t('gender-invalid'),
            })
            .transform(value => value.toLowerCase().trim()),
        phone: z.string().regex(
            /^(\+2)01\d{9}$/,
            { message: t('invalid-phone') }
        )
    }).refine((data) => data.password === data.rePassword, {
        message: t('password-match'),
        path: ['rePassword']
    });
};

export type RegisterSchema = z.infer<ReturnType<typeof createRegisterSchema>>;