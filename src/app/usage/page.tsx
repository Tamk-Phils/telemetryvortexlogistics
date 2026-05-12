"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Cpu, Database, Activity, Radar, Lock, Server, CheckCircle2, List, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UsagePage() {
    return (
        <main className="bg-white min-h-screen">
            {/* Simple Systems Header */}
            <div className="relative pt-48 pb-32 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-3 bg-white text-primary px-4 py-2 rounded-full border border-slate-200 mb-10 shadow-sm">
                            <span className="text-xs font-bold uppercase tracking-wider">How it Works</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-10 leading-[1.1]">
                            Platform <br />
                            <span className="text-primary italic">Guidelines.</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
                            Everything you need to know about using the Vortex Express platform safely and effectively. We've simplified our rules to help you get moving faster.
                        </p>
                    </motion.div>
                </div>
                {/* Baclbsround image fade */}
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
                    <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=2000" alt="Tech" fill className="object-cover" />
                </div>
            </div>

            {/* Step by Step Guide */}
            <section className="py-32 container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <div className="space-y-16">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Getting Started</h2>
                            <p className="text-lg text-slate-500 font-medium">Follow these simple steps to start shipping with Vortex Express today.</p>
                        </div>
                        
                        <div className="space-y-12">
                            {[
                                { step: "1", title: "Create Your Account", desc: "Sign up with your email and basic business details to access the dashboard." },
                                { step: "2", title: "Set Your Preferences", desc: "Choose your preferred shipping methods, insurance levels, and notification settings." },
                                { step: "3", title: "Book a Shipment", desc: "Enter your package details and destination to get instant rates and labels." },
                                { step: "4", title: "Track & Manage", desc: "Monitor all your active shipments from a single, easy-to-use dashboard." }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl shrink-0 group-hover:scale-110 transition-transform">
                                        {step.step}
                                    </div>
                                    <div className="space-y-2 pt-2">
                                        <h4 className="text-xl font-bold text-slate-900">{step.title}</h4>
                                        <p className="text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-8 pt-12 lg:pt-0">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                           <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000" alt="Dashboard Use" fill className="object-cover" />
                        </div>
                        <div className="bg-slate-900 p-12 rounded-3xl text-white shadow-2xl">
                           <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><ShieldCheck className="text-primary" /> Security First</h3>
                           <p className="text-white/60 text-lg leading-relaxed mb-8">We use enterprise-grade encryption to protect your data. Your tracking and personal information are always secure with us.</p>
                           <ul className="space-y-4">
                              <li className="flex items-center gap-3 text-sm font-bold"><CheckCircle2 size={18} className="text-primary" /> 2FA Authentication</li>
                              <li className="flex items-center gap-3 text-sm font-bold"><CheckCircle2 size={18} className="text-primary" /> Encrypted Data Storage</li>
                              <li className="flex items-center gap-3 text-sm font-bold"><CheckCircle2 size={18} className="text-primary" /> Regular Security Audits</li>
                           </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rules of Engagement Section */}
            <section className="py-32 bg-slate-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Platform Rules</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">To ensure the best experience for everyone, we ask all our users to follow these simple guidelines.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Fair Usage", desc: "Please avoid making excessive automated requests to our tracking system. Our standard API limits are generous for all users." },
                            { title: "Accurate Data", desc: "Ensure all package dimensions and weights are accurate to avoid delays and extra charges during transit." },
                            { title: "Prohibited Items", desc: "We strictly prohibit shipping hazardous materials or illegal goods. Please check our restricted items list." }
                        ].map((rule, i) => (
                            <div key={i} className="bg-white p-12 rounded-3xl border border-slate-100 shadow-xl hover:-translate-y-2 transition-all">
                                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-10">
                                    <List size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-6">{rule.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{rule.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image Gallery: Logistics in Motion */}
            <section className="py-32 container mx-auto px-6 max-w-7xl">
               <div className="text-center mb-24">
                   <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Vortex Express in Action</h2>
                   <p className="text-lg text-slate-500 max-w-2xl mx-auto">See how we move millions of packages across the globe every single day.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-[600px]">
                   <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <Image src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=1000" alt="Ship" fill className="object-cover" />
                   </div>
                   <div className="relative rounded-3xl overflow-hidden shadow-2xl lg:col-span-2">
                      <Image src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1500" alt="Truck" fill className="object-cover" />
                   </div>
                </div>
            </section>

            {/* Support CTA */}
            <section className="py-40 bg-white text-center">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl">
                        <HelpCircle size={36} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Need More Help?</h2>
                    <p className="text-xl text-slate-500 mb-12 font-medium">Our help center has everything you need to know about shipping, tracking, and account management.</p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Link href="/resources" className="bg-primary text-white px-12 py-6 rounded-full font-black text-lg hover:bg-slate-900 transition-all shadow-2xl">
                            Visit Help Center
                        </Link>
                        <Link href="/contact" className="bg-white border-2 border-slate-200 text-slate-900 px-12 py-6 rounded-full font-black text-lg hover:bg-slate-50 transition-all shadow-sm">
                            Talk to an Expert
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
