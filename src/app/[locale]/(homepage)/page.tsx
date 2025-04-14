import { useTranslations } from "next-intl"
import Test from "../_test/test";
import Products from "@/components/ui/Products/Products";

export default function Page() {

    const t = useTranslations();
    return (<>
        <div className="flex items-center justify-center">
            <div className="container text-center">
                <h1 className="text-5xl text-green-800">{t('hello')}</h1>
                <Test />
                <Products />
            </div>
        </div>
    </>)
}