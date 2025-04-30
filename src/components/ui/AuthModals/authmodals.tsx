import { useState } from 'react';
import { LoginModal } from './login/loginmodal';
import { RegisterModal } from './register/registermodal';

export function AuthModals() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <>
            <LoginModal
                open={isLoginOpen}
                onOpenChange={(open) => {
                    setIsLoginOpen(open);
                    if (!open) setIsRegisterOpen(false);
                }}
                onRegisterClick={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                }}
            />
            <RegisterModal
                open={isRegisterOpen}
                onOpenChange={(open) => {
                    setIsRegisterOpen(open);
                    if (!open) setIsLoginOpen(false);
                }}
                onLoginClick={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                }}
            />
        </>
    );
}