import { create } from 'zustand';
export const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));