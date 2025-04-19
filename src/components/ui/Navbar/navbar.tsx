'use client'
import Image from 'next/image'
// import logo from './public/images/logo-bg.png'
import Link from 'next/link'
import useBasePath from '../../hooks/useBasePath'
import { Menu, Search } from 'lucide-react'
import LangaugeMenu from '../language-menu/language-menu'
import { useLocale, useTranslations } from 'use-intl'
import { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Button } from "@/components/ui/shadcn/button"
import { AuthModals } from '../AuthModals/authmodals'
import { toast } from 'sonner'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/shadcn/sheet"



export default function Navbar() {
    const t = useTranslations()
    const baseBase = useBasePath();
    const [open, setIsOpen] = useState(false);
    const { data: session, status } = useSession();
    const locale = useLocale();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const pathNames = [
        { name: t('home'), href: '/' },
        { name: t('all-category'), href: '/categories' },
        { name: t('about'), href: '/about' },
        { name: t('contact'), href: '/contact' },
    ]
    const logUserOut = async () => {
        try {
            const response = await fetch(`/api/auth/signoutapi`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const payload = await response.json();
            if (payload.success) {
                toast.success(t('logged-out-succesfully'))
                setTimeout(() => {
                    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/` }) //nextauth
                }, 1000);
            }
            else {
                console.error("Backend logout failed:", payload.error);
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <nav className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
            <div className="container flex items-center justify-between py-3">
                <div className="flex items-center gap-x-2">
                    <Image
                        src="/images/logo-bg.png"
                        alt="Rose Website Logo"
                        width={86}
                        height={86}
                    />
                </div>

                {/* Desktop Nav Links */}
                <ul className="hidden md:flex items-center justify-center">
                    {pathNames.map((path, index) => (
                        <li key={index} className="p-3">
                            <Link
                                className={`${baseBase === path.href ? 'text-rose-950' : 'text-[#160E4B]'}`}
                                href={`/${locale}${path.href}`}
                            >
                                {path.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu - Hamburger + Sheet */}
                <div className="md:hidden flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger>
                            <Menu className="w-6 h-6 text-rose-950" />
                        </SheetTrigger>
                        <SheetContent side="right" className='w-[250px] px-2'>
                            <SheetHeader>
                                <Image
                                    src="/images/logo-bg.png"
                                    alt="Logo"
                                    width={50}
                                    height={50}
                                    className="mx-auto"
                                />
                            </SheetHeader>
                            <ul className="flex flex-col mt-6 space-y-4">
                                {pathNames.map((path, index) => (
                                    <li key={index}>
                                        <Link
                                            className="text-lg font-medium text-[#160E4B]"
                                            href={`${locale}${path.href}`}
                                        >
                                            {path.name}
                                        </Link>
                                    </li>
                                ))}
                                {status !== 'loading' && !session && (
                                    <AuthModals open={open} onOpenChange={setIsOpen} />
                                )}
                                {status === 'authenticated' && (
                                    <Button
                                        onClick={logUserOut}
                                        className="bg-rose-950 hover:bg-rose-900 text-white rounded-[30px] px-[20px] py-[8px]"
                                    >
                                        {t('sign-out')}
                                    </Button>
                                )}
                                <LangaugeMenu />
                            </ul>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Right Side Utilities for Desktop */}
                <div className="hidden md:flex items-center gap-x-2">
                    <Search color="#F82BA9" />
                    {status !== 'loading' && !session && (
                        <AuthModals open={open} onOpenChange={setIsOpen} />
                    )}
                    {status === 'authenticated' && (
                        <Button
                            onClick={logUserOut}
                            className="bg-rose-950 hover:bg-rose-900 text-white rounded-[30px] px-[20px] py-[8px]"
                        >
                            {t('sign-out')}
                        </Button>
                    )}
                    <LangaugeMenu />
                </div>
            </div>
        </nav>

    )
}
