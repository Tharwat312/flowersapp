import * as z from 'zod';
import { useTranslations } from 'next-intl';

export const createLoginSchema = (t: ReturnType<typeof useTranslations>) => {
    return z.object({
        email: z.string({ required_error: t('email-error') })
            .min(1, t('email-error'))
            .email(t('invalid-email-address')),
        password: z.string({ required_error: t('password-required') })
            .min(1, t('password-required'))
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                t('password-validation'))
    });
};

export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>;