"use client";

import { motion } from "framer-motion";
import { Radar, ShieldCheck, Lock, Eye, Database } from "lucide-react";

export default function PrivacyPage() {
    const sections = [
        {
            title: "DATA OVERVIEW",
            icon: Eye,
            content: "At Vortex Express, we prioritize the integrity of your transit data. This protocol describes how we synchronize, secure, and manage your telemetry when you utilize our planetary tracking services."
        },
        {
            title: "DATA ACQUISITION",
            icon: Database,
            content: "We acquire telemetry directly through node registration, shipment initialization, and system synchronization. This includes tracking signatures, node identifiers, and logistics flow data."
        },
        {
            title: "SYSTEM EXECUTION",
            icon: Radar,
            content: "Acquired telemetry is utilized to maintain network performance, optimize transit routes, and establish real-time synchronization between global logistics endpoints."
        },
        {
            title: "ENCRYPTION STANDARDS",
            icon: ShieldCheck,
            content: "Vortex Express implements enterprise-grade cryptographic measures. All data packets are encrypted at rest and during transit between nodes using advanced secure protocols."
        },
        {
            title: "IDENTITY RIGHTS",
            icon: Lock,
            content: "You retain the right to access, rectify, or terminate your telemetry packets at any time through our command interfaces or by contacting our support uplink."
        }
    ];

    return (
        <main className="min-h-screen bg-white pt-32 pb-48 text-slate-900">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-3 bg-white text-primary px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-[0.4em] border border-slate-200 mb-10 shadow-sm">
                            <Radar size={14} className="animate-spin-slow" />
                            <span className="text-slate-500">Security & Privacy System</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6 uppercase leading-[0.9]">PRIVACY <br/><span className="text-primary italic">LEDGER.</span></h1>
                        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">SYSTEM REVISION: MAY 2026</p>
                    </div>

                    <div className="bg-slate-50 p-12 md:p-20 rounded-sm border border-slate-200 shadow-3xl space-y-16">
                        {sections.map((section, i) => (
                            <section key={i} className="space-y-6 group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white border border-slate-100 rounded-sm text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <section.icon size={20} />
                                    </div>
                                    <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase">{section.title}</h2>
                                </div>
                                <p className="text-slate-500 leading-relaxed font-bold text-sm uppercase tracking-tight pl-14">
                                    {section.content}
                                </p>
                            </section>
                        ))}
                    </div>

                    <div className="mt-24 p-12 bg-slate-900 rounded-sm text-white text-center shadow-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
                        <p className="text-white/40 font-black uppercase text-[10px] tracking-widest mb-4">UPLINK SUPPORT</p>
                        <p className="text-slate-400 font-bold mb-4 uppercase tracking-tight text-lg">If you require manual protocol clarification, contact our compliance node:</p>
                        <p className="text-primary font-black text-2xl uppercase tracking-tighter hover:text-white transition-colors cursor-pointer">PRIVACY@VORTEX-GLOBAL.IO</p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
