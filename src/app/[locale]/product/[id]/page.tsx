import ProductButtons from "@/components/ui/Products/ProductButtons";
import ProductsCarousel from "@/components/ui/ProductsCarousel/ProductsCarousel";
async function getProductDetails(id: string) {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`);
        if (!res.ok) return null
        const payload = await res.json();
        return payload;
    } catch (error) {
        console.log(error);
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { payload } = await getProductDetails(id);
    return (
        <>
            <section className="min-h-screen py-8 mt-20">
                <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="w-full">
                        <ProductsCarousel
                            mainImage={payload.product.imgCover}
                            thumbnails={payload.product.images}
                            alt={payload.product.title}
                        />
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-3xl font-semibold">{payload.product.title}</h1>
                        <div className="flex items-center gap-4">
                            {payload.product.priceAfterDiscount && (
                                <span className="text-lg text-gray-500 line-through">${payload.product.priceAfterDiscount}</span>
                            )}
                            <span className="text-2xl font-bold text-rose-500">${payload.product.price}</span>
                        </div>
                        <p className="text-gray-600">{payload.product.description}</p>
                        <ProductButtons product={payload.product} />
                    </div>
                </div>
            </section>
        </>
    )
}