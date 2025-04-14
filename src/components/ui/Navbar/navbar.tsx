'use client'
import Image from 'next/image'
// import logo from './public/images/logo-bg.png'
import Link from 'next/link'
import useBasePath from '../../hooks/useBasePath'
import { Search } from 'lucide-react'
import LangaugeMenu from '../language-menu/language-menu'
import { useLocale, useTranslations } from 'use-intl'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Button } from "@/components/ui/shadcn/button"
import { AuthModals } from '../AuthModals/authmodals'
import { toast } from 'sonner'
export default function Navbar() {
    const t = useTranslations()
    const baseBase = useBasePath();
    const [open, setIsOpen] = useState(false);
    const { data: session, status } = useSession();
    const locale = useLocale();
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
        <nav className="fixed top-0 left-0 right-0 bg-stone-200 z-10">
            <div className="container flex items-center justify-between">
                <Image src='/images/logo-bg.png' alt='Rose Website Logo'
                    width={87}
                    height={87}
                />
                <ul className='flex items-center justify-center'>
                    {pathNames.map((path, index) => <li key={index} className='p-3'>
                        <Link className={`${baseBase === path.href ? 'text-rose-950' : 'text-[#160E4B]'}`} href={`${locale}${path.href}`}>{path.name}</Link>
                    </li>)}
                </ul>
                <div className="utilities flex items-center justify-center gap-x-1">
                    <Search color={'#F82BA9'} />
                    {/* Login button */}
                    {status !== 'loading' && !session && (
                        <AuthModals open={open} onOpenChange={setIsOpen} />
                    )}
                    {/* Signout button */}
                    {status === 'authenticated' && (
                        <Button
                            onClick={logUserOut}
                            className="bg-rose-950 hover:bg-rose-900 text-white rounded-[30px] px-[20px] py-[8px] cursor-pointer"
                        >
                            {t('sign-out')}
                        </Button>
                    )}
                    <LangaugeMenu />
                </div>
            </div>
        </nav >
    )
}
