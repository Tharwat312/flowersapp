import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Card, CardContent,} from "@/components/ui/shadcn/card";

export default function Page() {
    return (
        <section className="min-h-screen py-8 mt-20 flex items-center justify-center">
            <div className="container">
                <h1 className="text-3xl font-bold text-rose-950 mb-8 text-center">CONTACT US</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <Card className="bg-white border-rose-950/20 shadow-sm">
                        <CardContent className="space-y-6 p-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-rose-950/10 p-3 rounded-full">
                                    <Phone className="text-rose-950" />
                                </div>
                                <div>
                                    <p className="text-sm text-rose-950">Call Anytime</p>
                                    <p className="text-lg text-[#111111]">241-373-2123</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-rose-950/10 p-3 rounded-full">
                                    <Mail className="text-rose-950" />
                                </div>
                                <div>
                                    <p className="text-sm text-rose-950">Send Email</p>
                                    <p className="text-lg text-[#111111]">Dwight63@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-rose-950/10 p-3 rounded-full">
                                    <MapPin className="text-rose-950" />
                                </div>
                                <div>
                                    <p className="text-sm text-rose-950">Visit Us</p>
                                    <p className="text-lg text-[#111111]">
                                        20 Island Park Road,<br />
                                        New Jersey, New York, USA
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Form */}
                    <Card className="bg-white border-rose-950/20 shadow-sm">
                        <CardContent className="p-6">
                            <form className="space-y-4">
                                <Input
                                    id="name"
                                    placeholder="Name"
                                    className="bg-white border-rose-950/50 placeholder:text-rose-950/70 focus-visible:ring-rose-950 text-[#111111]"
                                />

                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    className="bg-white border-rose-950/50 placeholder:text-rose-950/70 focus-visible:ring-rose-950 text-[#111111]"
                                />

                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="Phone"
                                    className="bg-white border-rose-950/50 placeholder:text-rose-950/70 focus-visible:ring-rose-950 text-[#111111]"
                                />

                                <Textarea
                                    id="message"
                                    placeholder="Your Message"
                                    className="bg-white border-rose-950/50 placeholder:text-rose-950/70 focus-visible:ring-rose-950 text-[#111111] min-h-[120px]"
                                />

                                <Button type="submit" className="bg-rose-950 hover:bg-rose-900 w-full">
                                    Send <span className="ml-1">→</span>
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}