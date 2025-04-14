import Providers from "@/components/providers/root";
import Navbar from "@/components/ui/Navbar/navbar";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";
import { Inter, Roboto } from 'next/font/google'
import { Toaster } from "@/components/ui/shadcn/sonner";
import { Check, Info } from "lucide-react";
import Footer from "@/components/ui/Footer/footer";
const roboto = Roboto({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    const title = t('flowers');
    const description = t("flowers-ecommerce-application")
    return {
        title,
        description
    }
}
export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    return (
        <html lang={locale} className={inter.variable} >
            <body className={roboto.className}>
                <Providers>
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Toaster position="top-center" icons={{
                        success: <Check className="text-rose-950" />,
                        error: <Info className="text-rose-950" />
                    }} />
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
