
import { Button } from "@/components/ui/shadcn/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { ArrowBigDown } from "lucide-react";

export default function LangaugeMenu() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const changeLanguage = (locale: string) => {
        router.replace(`/${locale}${pathname}`);
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = locale;
    }
    const t = useTranslations();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-rose-950 main-hover rounded-[30px] px-[20px] py-[8px] text-white">{t('language')} <ArrowBigDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <DropdownMenuRadioGroup value={locale} onValueChange={changeLanguage}>
                    <DropdownMenuRadioItem value="en" className="text-main">{t('english')}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="ar">{t('arabic')}</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
