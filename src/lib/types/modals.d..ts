type AuthModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRegisterClick?: () => void;
    onLoginClick?: () => void;
};
type LoginModalProps = AuthModalProps;
type RegisterModalProps = AuthModalProps;
type AuthModalsProps = AuthModalProps;