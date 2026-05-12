"use client";

import { motion } from "framer-motion";
import { Package, ShieldCheck, Clock, MapPin, Radar, Activity, Satellite, Lock, Search, HelpCircle, Truck, Info } from "lucide-react";
import Image from "next/image";
import TrackingSearch from "@/components/TrackingSearch";
import Link from "next/link";

export default function TrackingPage() {
    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* Simple Tracking Header */}
            <section className="pt-48 pb-64 relative overflow-hidden bg-slate-50">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-24"
                        >
                            <div className="inline-flex items-center gap-3 bg-white text-primary px-5 py-2.5 rounded-full border border-slate-200 mb-10 shadow-sm">
                                <Radar size={16} className="text-primary animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-wider">Live Tracking Active</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-10 leading-[1.1]">
                                Where is my <br />
                                <span className="text-primary italic">Shipment?</span>
                            </h1>
                            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                                Enter your tracking number below to get real-time updates on your package. We track every mile so you don't have to.
                            </p>
                        </motion.div>

                        <div className="bg-white p-4 rounded-3xl shadow-3xl border border-slate-200 relative overflow-hidden group max-w-3xl mx-auto mb-32">
                             <div className="relative z-10">
                                <TrackingSearch />
                             </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: Truck, title: "Real-Time Updates", desc: "Get live updates every time your package reaches a new location." },
                                { icon: ShieldCheck, title: "Secure Delivery", desc: "Your package is protected by our global security network." },
                                { icon: Clock, title: "ETA Predictions", desc: "Know exactly when your package will arrive at your doorstep." }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="p-10 bg-white border border-slate-100 rounded-2xl group hover:border-primary/20 transition-all duration-500 shadow-sm"
                                >
                                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Baclbsround image fade */}
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
                    <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000" alt="Data" fill className="object-cover" />
                </div>
            </section>

            {/* Tracking Tips Section */}
            <section className="py-32 container mx-auto px-6 max-w-5xl">
                <div className="bg-slate-900 rounded-3xl p-16 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000" alt="Logistics" fill className="object-cover" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <HelpCircle className="text-primary" size={28} />
                            <h2 className="text-3xl font-black uppercase tracking-tight">Need Help Tracking?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold text-primary">Where can I find my tracking number?</h4>
                                <p className="text-white/60 leading-relaxed font-medium">Your tracking number can be found in your shipping confirmation email or on your physical shipping receipt. It usually starts with "VTX" followed by 9 digits.</p>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold text-primary">My tracking hasn't updated in 24 hours.</h4>
                                <p className="text-white/60 leading-relaxed font-medium">Don't worry! Sometimes tracking updates can take a little time between major hubs. If it hasn't updated in 48 hours, please contact our support team.</p>
                            </div>
                        </div>
                        <div className="mt-12 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <p className="text-white/40 font-bold italic">"Tracking made simple for everyone, everywhere."</p>
                            <Link href="/contact" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Reach Gallery */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Our Global Network</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">From sea to sky, we track your shipments through every major transportation corridor on the planet.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                           { img: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=1000", title: "Maritime Routes" },
                           { img: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1000", title: "Air Express" },
                           { img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000", title: "Ground Fleet" },
                           { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=1000", title: "Data Centers" }
                        ].map((item, i) => (
                            <div key={i} className="relative h-96 rounded-3xl overflow-hidden group shadow-xl">
                                <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-white font-black uppercase tracking-widest text-sm">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple Help CTA */}
            <section className="py-32 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-10">
                        <Info size={36} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Need More Information?</h2>
                    <p className="text-xl text-slate-500 mb-12 font-medium">Our help center is full of guides and tutorials to help you understand every part of the shipping process.</p>
                    <Link href="/resources" className="bg-slate-900 text-white px-10 py-5 rounded-full font-bold hover:bg-primary transition-all shadow-xl">
                        Explore Help Center
                    </Link>
                </div>
            </section>
        </main>
    );
}
