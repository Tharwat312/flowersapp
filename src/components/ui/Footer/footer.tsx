import { useTranslations } from "next-intl"
import Link from "next/link";

export default function Footer() {
    const t = useTranslations();
    const pathNames = [
        { name: t('all-category'), href: '/about' },
        { name: t('store-location'), href: '/storelocation' },
        { name: t('contact'), href: '/contact' },
        { name: t('delivery'), href: '/delivery' },
        { name: t('policy'), href: '/policy' },
        { name: t('faqs'), href: '/faqs' },
    ]
    return (
        <footer className="text-center">
            <ul className="flex items-center justify-center text-main">
                {pathNames.map((path, index) => <li key={index}>
                    <Link href={path.href}>{path.name}</Link>
                </li>)}
            </ul>
            <h3>Get <span> 20% </span> Off Discount Coupon</h3>
            <h4>By Subscribe Our Newsletter</h4>
        </footer>
    )
}
