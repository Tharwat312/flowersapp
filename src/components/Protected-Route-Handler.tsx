'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LoginModal } from './ui/AuthModals/login/loginmodal';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';


export default function ProtectedRouteHandler() {
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const router = useRouter();
    const t = useTranslations();
    const redirect = searchParams.get('redirect');
    const showLogin = searchParams.get('showLogin') === 'true';
    useEffect(() => {
        if (showLogin && !session && status === 'unauthenticated') {
            toast.error(t('not-logged-in'));
        }
    }, [showLogin, session, status, t]);
    useEffect(() => {
        if (status !== 'loading' && session && redirect) {
            router.push(redirect);
        }
    }, [session, status, redirect, router]);

    if (!showLogin) return null;

    return (
        <LoginModal
            open={showLogin}
            onOpenChange={(open) => {
                if (!open && !session) {
                    // Remove the query params if user closes the modal
                    router.replace(window.location.pathname);
                }
            }}
        />
    );
}