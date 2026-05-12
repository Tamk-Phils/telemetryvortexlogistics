"use client";

import { useEffect, useState } from "react";
import { Package, TrendingUp, AlertCircle, CheckCircle, ArrowUpRight, Radar, Activity, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Shipment {
    tracking_number: string;
    current_status: string;
    status?: string; // Backwards compatibility
    created_at: string;
}

export default function DashboardOverview() {
    const [stats, setStats] = useState([
        { label: "TOTAL DELIVERYS", value: "0", icon: Package, color: "text-primary", bg: "bg-primary/5" },
        { label: "ACTIVE SYNC", value: "0", icon: Activity, color: "text-primary", bg: "bg-primary/5" },
        { label: "VERIFIED OFFICES", value: "0", icon: CheckCircle, color: "text-primary", bg: "bg-primary/5" },
        { label: "EXCEPTIONS", value: "0", icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
    ]);
    const [recentShipments, setRecentShipments] = useState<Shipment[]>([]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const timer = setTimeout(() => {
            const saved = localStorage.getItem("vortex_shipments");
            const shipments: Shipment[] = saved ? JSON.parse(saved) : [];

            const total = shipments.length;
            const inDelivery = shipments.filter(s => (s.current_status || s.status) === "In Delivery").length;
            const delivered = shipments.filter(s => (s.current_status || s.status) === "Delivered").length;
            const exceptions = shipments.filter(s => (s.current_status || s.status) === "Held").length;

            setStats([
                { label: "TOTAL DELIVERYS", value: total.toLocaleString(), icon: Package, color: "text-primary", bg: "bg-primary/5" },
                { label: "ACTIVE SYNC", value: inDelivery.toLocaleString(), icon: Activity, color: "text-primary", bg: "bg-primary/5" },
                { label: "VERIFIED OFFICES", value: delivered.toLocaleString(), icon: CheckCircle, color: "text-primary", bg: "bg-primary/5" },
                { label: "EXCEPTIONS", value: exceptions.toLocaleString(), icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
            ]);

            setRecentShipments(shipments.slice(-5).reverse());
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Radar size={20} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Operational Intelligence</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">GLOBAL <br/><span className="text-primary italic">DATA.</span></h1>
                </div>
                <Link href="/admin/dashboard/shipments" className="bg-slate-900 text-white px-8 py-4 rounded-sm font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-primary transition-all shadow-xl">
                    ALL DELIVERY SYSTEMS <ArrowUpRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-10 rounded-sm border border-slate-200 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />
                        <div className={`w-14 h-14 rounded-sm ${stat.bg} ${stat.color} flex items-center justify-center mb-8 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                            <stat.icon size={28} />
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                        <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 bg-white p-10 rounded-sm border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.02] grayscale pointer-events-none">
                         <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000" alt="Data" fill className="object-cover" />
                    </div>
                    <h3 className="text-[10px] font-black text-slate-900 mb-10 flex items-center gap-3 uppercase tracking-[0.4em]">
                        <Activity className="text-primary" size={18} />
                        RECENT DATA UPDATES
                    </h3>
                    <div className="space-y-6 relative z-10">
                        {recentShipments.length === 0 ? (
                            <div className="py-20 text-center text-slate-300 font-black text-[10px] uppercase tracking-widest italic bg-slate-50 border border-dashed border-slate-200 rounded-sm">NO RECENT DATA DETECTED</div>
                        ) : recentShipments.map((shipment) => (
                            <div key={shipment.tracking_number} className="flex gap-6 items-center p-6 rounded-sm border border-slate-50 hover:border-primary/20 hover:bg-slate-50/50 transition-all group bg-white/50 backdrop-blur-sm">
                                <div className="w-12 h-12 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                    <Package size={22} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-slate-900 text-sm uppercase tracking-tight">DELIVERY <span className="text-primary">#{shipment.tracking_number}</span> SYNC COMPLETE</p>
                                    <p className="text-slate-400 font-bold text-[10px] mt-1 uppercase tracking-widest">STATUS: {shipment.current_status} • OFFICE SYNC: {new Date(shipment.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-sm">LOGS</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 p-10 rounded-sm text-white shadow-3xl relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
                             <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000" alt="Hero" fill className="object-cover" />
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
                        <h3 className="text-[10px] font-black text-primary mb-10 flex items-center gap-3 uppercase tracking-[0.4em] relative z-10">
                            <Zap size={18} />
                            SYSTEM INTEGRITY
                        </h3>
                        <div className="space-y-8 relative z-10">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/40 font-black uppercase text-[10px] tracking-widest">DATABASE CLUSTER</span>
                                    <div className="flex items-center gap-2 font-black text-primary text-[10px] uppercase tracking-widest">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        SYNCED
                                    </div>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-full shadow-[0_0_8px_rgba(0,112,243,0.5)]" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/40 font-black uppercase text-[10px] tracking-widest">DATA API</span>
                                    <div className="flex items-center gap-2 font-black text-primary text-[10px] uppercase tracking-widest">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        OPTIMAL
                                    </div>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[98%] shadow-[0_0_8px_rgba(0,112,243,0.5)]" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-10 border-t border-white/5 text-center relative z-10">
                            <p className="text-[9px] font-black text-white/20 mb-2 uppercase tracking-[0.3em]">Institutional Access</p>
                            <p className="font-black text-sm uppercase tracking-widest mb-8">Vortex Command Hotline</p>
                            <button className="w-full bg-white text-slate-900 py-4 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl">INITIATE UPLINK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
