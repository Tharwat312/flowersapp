import { NextIntlClientProvider, useLocale, useMessages, useNow, useTimeZone } from "next-intl";
import NextAuthProvider from "./components/next-auth-provider";
import ReactQueryProvider from "./components/react-query-provider";
import ProtectedRouteHandler from "@/components/Protected-Route-Handler";

export default function Providers({ children }: { children: React.ReactNode }) {
    const messages = useMessages();
    const locale = useLocale();
    const timezone = useTimeZone();
    const now = useNow();
    return (
        <ReactQueryProvider>
            <NextIntlClientProvider messages={messages} locale={locale} timeZone={timezone} now={now}>
                <NextAuthProvider>
                    <ProtectedRouteHandler />
                    {children}
                </NextAuthProvider>
            </NextIntlClientProvider>
        </ReactQueryProvider>
    )
}