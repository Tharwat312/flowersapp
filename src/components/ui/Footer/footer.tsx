import { Button } from "@/components/ui/shadcn/button"
import { Input } from "@/components/ui/shadcn/input"
import Link from "next/link"
export function Footer() {
    const pathNames = [
        { name: "About US", href: "/about" },
        { name: "Store Location", href: "/locations" },
        { name: "Contact", href: "/contact" },
        { name: "Delivery", href: "/delivery" },
        { name: "Policy", href: "/policy" },
        { name: "FAQS", href: "/faqs" },
    ]

    return (
        <footer
            className="relative py-12 px-4 text-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/footer-bg.png')" }}
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-white/50 z-0" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Navigation Links */}
                <ul className="flex flex-wrap items-center justify-center gap-14 text-main mb-8">
                    {pathNames.map((path, index) => (
                        <li key={index}>
                            <Link
                                href={path.href}
                                className="font-medium"
                            >
                                {path.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Newsletter Section */}
                <div className="max-w-md mx-auto mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                        Get <span className="text-primary">20% Off</span> Discount Coupon Test
                    </h3>
                    <h4 className="text-gray-300 mb-4">By Subscribe Our Newsletter</h4>

                    <form className="relative max-w-md mx-auto">
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="Enter Your Email"
                                className="rounded-full w-full pl-4 pr-24 py-6 bg-white/90 focus:bg-white border-none"
                            />
                            <Button
                                type="submit"
                                className="rounded-full absolute right-2 top-1/2 -translate-y-1/2 bg-rose-950 hover:bg-rose-900 text-white h-10 px-6">
                                Subscribe
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Copyright/Additional Info */}
                <div className="text-gray-400 text-sm mt-8">
                    © {new Date().getFullYear()} Your Company. All rights reserved.
                </div>
            </div>
        </footer>
    )
}