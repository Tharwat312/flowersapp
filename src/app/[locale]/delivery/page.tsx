import { useTranslations } from "next-intl"

export default function Page() {
    const t = useTranslations();
    return <>
        <section className="min-h-screen py-8 mt-20 flex items-center justify-center">
            <div className="container">
                <h2 className="text-main text-[30px]">{t('delivery')}</h2>
                <h2 className="text-main text-[30px]">Shipments and <br /> returns</h2>
                <h3 className="text-main text-[26px]">Your pack shipment</h3>
                <p className="text-text line text-[20px]/[36px] mb-3">Ipsam optio qui ut sit minima eveniet voluptatem molestiae distinctio. Magnam nulla qui doloremque voluptatem eum dolorem cum expedita.Ipsam optio qui ut sit minima eveniet voluptatem molestiae distinctio. Magnam nulla qui doloremque voluptatem eum dolorem cum expedita.Ipsam optio qui ut sit minima eveniet voluptatem molestiae distinctio. Magnam nulla qui doloremque voluptatem eum dolorem cum expedita.</p>
                <p className="text-text line text-[20px]/[36px] mb-3">Ipsam optio qui ut sit minima eveniet voluptatem molestiae distinctio. Magnam nulla qui doloremque voluptatem eum dolorem cum expedita.Ipsam optio qui ut sit minima eveniet voluptatem molestiae distinctio. Magnam nulla qui doloremque voluptatem eum dolorem cum expedita.Ipsam optio qui ut sit minima eveniet voluptatem molestiae distinctio. Magnam nulla qui doloremque voluptatem eum dolorem cum expedita.</p>
                <p className="text-text line text-[20px]/[36px]">Ipsam optio qui ut sit minima eveniet voluptatem molestiae distinctio. Magnam nulla qui doloremque voluptatem eum dolorem cum expedita.Ipsam optio qui ut sit minima eveniet voluptatem molestiae distinctio. Magnam nulla qui doloremque voluptatem eum dolorem cum expedita.Ipsam optio qui ut sit minima eveniet voluptatem molestiae distinctio. Magnam nulla qui doloremque voluptatem eum dolorem cum expedita.</p>
            </div>
        </section>
    </>
}