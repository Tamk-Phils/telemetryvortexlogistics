"use client";

import { motion } from "framer-motion";
import { Calculator, Package, Globe, Ruler, Send, ArrowRight, CheckCircle2, Radar, Zap, Box, MapPin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function QuotePage() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-white pt-48 pb-20">
                <div className="container mx-auto px-6 text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto bg-slate-50 p-16 rounded-3xl border border-slate-200 shadow-3xl"
                    >
                        <div className="w-24 h-24 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-2xl">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter">WE GOT IT!</h2>
                        <p className="text-slate-500 font-bold text-lg mb-12 leading-relaxed">
                            We are checking the best prices for your shipment. We will email you a quote in just a few minutes.
                        </p>
                        <Link 
                            href="/"
                            className="bg-slate-900 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-xl"
                        >
                            GO BACK HOME
                        </Link>
                    </motion.div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white pt-32 pb-48 text-slate-900">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-24">
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <div className="inline-flex items-center gap-3 bg-primary/5 text-primary px-6 py-2.5 rounded-full border border-primary/10 mb-10 shadow-sm">
                                <span className="text-xs font-bold uppercase tracking-wider">Free Price Check</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-10">
                                Get a <br/>
                                <span className="text-primary italic">Price.</span>
                            </h1>
                            <p className="text-xl text-slate-500 font-bold leading-relaxed">
                                See how much it costs to ship your package across the country. Just tell us a bit about your box.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { icon: Globe, title: "COAST TO COAST", desc: "We deliver to all 50 states, including Alaska and Hawaii." },
                                { icon: Box, title: "ANY SIZE BOX", desc: "From small envelopes to large heavy crates." },
                                { icon: Zap, title: "FASTEST SPEED", desc: "Next-day delivery options available for urgent stuff." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start group">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary shrink-0 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <item.icon size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-sm mb-1">{item.title}</h4>
                                        <p className="text-sm text-slate-400 font-bold leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-50 p-12 md:p-16 rounded-3xl border border-slate-200 shadow-3xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
                            
                            <form onSubmit={handleSubmit} className="relative z-10">
                                {step === 1 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                                        <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tighter">WHERE IS IT GOING?</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">FROM (CITY OR ZIP)</label>
                                                <input type="text" placeholder="e.g. New York, NY" className="w-full bg-white border border-slate-200 rounded-xl py-5 px-8 font-bold text-slate-900 outline-none focus:border-primary transition-all" required />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">TO (CITY OR ZIP)</label>
                                                <input type="text" placeholder="e.g. Los Angeles, CA" className="w-full bg-white border border-slate-200 rounded-xl py-5 px-8 font-bold text-slate-900 outline-none focus:border-primary transition-all" required />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">HOW FAST DO YOU NEED IT?</label>
                                            <select className="w-full bg-white border border-slate-200 rounded-xl py-5 px-8 font-bold text-slate-900 outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                                                <option>Ground Shipping (3-5 Days)</option>
                                                <option>Priority (2 Days)</option>
                                                <option>Overnight (Next Morning)</option>
                                            </select>
                                        </div>
                                        <button type="button" onClick={nextStep} className="w-full bg-slate-900 text-white py-6 rounded-full font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 group shadow-xl">
                                            NEXT STEP <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                        </button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                                        <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tighter">BOX DETAILS</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">WEIGHT (IN LBS)</label>
                                                <input type="number" placeholder="e.g. 10 lbs" className="w-full bg-white border border-slate-200 rounded-xl py-5 px-8 font-bold text-slate-900 outline-none focus:border-primary transition-all" required />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">VALUE (FOR INSURANCE)</label>
                                                <input type="number" placeholder="e.g. $100" className="w-full bg-white border border-slate-200 rounded-xl py-5 px-8 font-bold text-slate-900 outline-none focus:border-primary transition-all" required />
                                            </div>
                                        </div>
                                        <div className="flex gap-6">
                                            <button type="button" onClick={prevStep} className="w-1/3 bg-white text-slate-400 py-6 rounded-full font-bold border border-slate-200 hover:text-slate-900 transition-all">
                                                BACK
                                            </button>
                                            <button type="submit" className="w-2/3 bg-primary text-white py-6 rounded-full font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 shadow-xl shadow-primary/20 hover:bg-slate-900 transition-all">
                                                GET MY PRICE <Send size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>

                        <div className="mt-12 p-10 bg-slate-900 rounded-3xl text-white flex items-center justify-between shadow-3xl">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">BUSINESS PRO</p>
                                    <p className="font-bold text-sm">Shipping 100+ boxes a month?</p>
                                </div>
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest underline cursor-pointer hover:text-primary transition-colors">GET BUSINESS RATES</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
