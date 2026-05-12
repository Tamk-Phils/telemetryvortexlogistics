"use client";

import { useState } from "react";
import { Search, Package, MapPin, Truck, Clock, AlertCircle, User, Calendar, FileText, Mail, Phone, Copy, Check, Radar, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Shipment, ShipmentUpdate } from "@/types";
import dynamic from "next/dynamic";

const LiveMap = dynamic(() => import("@/components/LiveMap"), { ssr: false });

export default function TrackingSearch() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState<Shipment | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isCopying, setIsCopying] = useState(false);

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingNumber.trim()) return;

        setIsSearching(true);
        setResult(null);
        setError(null);

        try {
            const { data, error: sbError } = await supabase
                .from('shipments')
                .select('*')
                .eq('tracking_number', trackingNumber.trim())
                .eq('is_deleted', false)
                .single();

            if (sbError) {
                if (sbError.code === 'PGRST116') {
                    // Not found, try fallback for demo
                    const saved = localStorage.getItem("vortex_shipments");
                    const localShipments: Shipment[] = saved ? JSON.parse(saved) : [];
                    const found = localShipments.find(s =>
                        s.tracking_number.toLowerCase() === trackingNumber.trim().toLowerCase() && !s.is_deleted
                    );
                    if (found) {
                        setResult(found);
                    } else {
                        setError("TRACKING NUMBER NOT FOUND. PLEASE CHECK AND TRY AGAIN.");
                    }
                } else {
                    throw sbError;
                }
            } else {
                setResult(data);
            }
        } catch (err) {
            const errorObj = err as { message?: string };
            console.error(errorObj);
            setError("COULD NOT CONNECT TO OUR SYSTEM. PLEASE CHECK YOUR INTERNET.");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-0 relative group shadow-2xl">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <Radar size={20} className="text-slate-300 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => {
                            setTrackingNumber(e.target.value);
                            if (error) setError(null);
                        }}
                        placeholder="ENTER YOUR TRACKING NUMBER..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-sm py-6 px-8 pl-14 text-sm font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-300 outline-none"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full md:w-auto bg-slate-900 hover:bg-primary text-white px-12 py-6 rounded-sm font-black text-xs uppercase tracking-[0.3em] transition-all disabled:opacity-50 whitespace-nowrap shadow-md"
                >
                    {isSearching ? "SEARCHING..." : "TRACK NOW"}
                </button>
            </form>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-6 p-8 rounded-sm bg-red-50 border border-red-100 flex items-start gap-6"
                    >
                        <AlertCircle className="text-red-500 shrink-0" size={24} />
                        <div>
                            <p className="font-black text-red-500 text-[10px] uppercase tracking-widest">ERROR</p>
                            <p className="text-slate-600 mt-2 font-bold text-sm uppercase tracking-tight">{error}</p>
                        </div>
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 bg-white rounded-sm border border-slate-200 shadow-2xl overflow-hidden"
                    >
                        {/* Top Banner Status */}
                        <div className="bg-slate-900 p-10 flex flex-wrap justify-between items-center gap-8 border-b border-slate-800">
                             <div className="space-y-2">
                                <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">SHIPMENT STATUS</p>
                                <div className="flex items-center gap-4">
                                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase">{result.current_status || "PROCESSING"}</h2>
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,242,255,0.8)]" />
                                </div>
                             </div>
                             <div className="flex flex-col items-end gap-2">
                                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest text-right">TRACKING NUMBER</p>
                                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-sm group/copy">
                                    <span className="text-white font-mono font-black text-lg">{result.tracking_number}</span>
                                    <button
                                        onClick={() => handleCopy(result.tracking_number)}
                                        className={`p-1.5 transition-all ${isCopying ? 'text-primary' : 'text-white/20 hover:text-white'}`}
                                    >
                                        {isCopying ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                             </div>
                        </div>

                        <div className="p-10 md:p-16">
                            {/* Interactive Journey Pulse */}
                            <div className="mb-20 relative px-4">
                                <div className="flex flex-col md:flex-row items-center gap-12 justify-between relative z-10">
                                    <div className="text-center md:text-left space-y-2">
                                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">SHIPPED FROM</p>
                                       <p className="text-slate-900 text-xl font-black uppercase tracking-tight">{result.origin}</p>
                                    </div>

                                    <div className="flex-1 w-full max-w-2xl relative">
                                        <div className="h-0.5 bg-slate-100 w-full relative">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: "65%" }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-primary shadow-sm"
                                            />
                                            <div className="absolute top-1/2 left-[65%] -translate-y-1/2 w-3 h-3 bg-slate-900 border border-primary rotate-45 shadow-lg" />
                                        </div>
                                        <div className="flex justify-center mt-6">
                                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                                                <Zap size={14} className="animate-pulse" />
                                                ON ITS WAY
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center md:text-right space-y-2">
                                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">DESTINATION</p>
                                       <p className="text-slate-900 text-xl font-black uppercase tracking-tight">{result.destination}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Live Map */}
                            {result.latitude && result.longitude && (
                                <div className="mb-20 h-[500px] w-full rounded-sm overflow-hidden shadow-2xl relative border border-slate-200 group">
                                    <div className="absolute top-8 left-8 z-[400] bg-slate-900 text-white px-6 py-3 rounded-sm shadow-2xl flex items-center gap-4">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">LIVE LOCATION</span>
                                    </div>
                                    <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-80 group-hover:opacity-100">
                                        <LiveMap lat={result.latitude} lng={result.longitude} zoom={13} />
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                                <div className="lg:col-span-2 space-y-12">
                                    {/* Sender and Receiver Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] border-b border-slate-100 pb-4">
                                                <User size={16} className="text-primary" />
                                                SENDER
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">NAME</p>
                                                    <p className="font-black text-slate-900 text-lg uppercase tracking-tight">{result.sender_name || 'N/A'}</p>
                                                </div>
                                                <div className="flex items-center gap-3 text-slate-500 font-bold text-xs uppercase tracking-tight">
                                                    <Mail size={14} className="text-primary" />
                                                    {result.sender_email || 'NOT PROVIDED'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] border-b border-slate-100 pb-4">
                                                <MapPin size={16} className="text-primary" />
                                                RECIPIENT
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">NAME</p>
                                                    <p className="font-black text-slate-900 text-lg uppercase tracking-tight">{result.recipient_name || 'N/A'}</p>
                                                </div>
                                                <div className="p-5 bg-slate-50 border-l-2 border-primary text-[10px] font-bold text-slate-500 uppercase tracking-tight leading-relaxed italic">
                                                    {result.recipient_address || 'ADDRESS TBD'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="p-10 bg-slate-50 border border-slate-100 rounded-sm space-y-6">
                                        <div className="flex items-center gap-3 text-slate-900 font-black text-[10px] uppercase tracking-[0.3em]">
                                            <FileText size={16} className="text-primary" />
                                            PACKAGE DETAILS
                                        </div>
                                        <p className="text-lg font-bold text-slate-500 leading-relaxed uppercase tracking-tight">
                                            {result.description || 'No additional description provided.'}
                                        </p>
                                    </div>
                                </div>

                                {/* Sidebar Metrics */}
                                <div className="space-y-8">
                                    <div className="bg-slate-50 p-10 rounded-sm text-slate-900 space-y-8 shadow-sm border border-slate-200">
                                        <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] border-b border-slate-200 pb-6 text-primary">
                                            <Package size={18} />
                                            INFO
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                                <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">WEIGHT</span>
                                                <span className="font-black text-primary uppercase text-sm">{result.weight} LBS</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                                <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">TYPE</span>
                                                <span className="font-black uppercase text-sm">{result.item_type || 'GENERAL'}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                                <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">ETA</span>
                                                <span className="font-black text-primary uppercase text-sm">{result.estimated_delivery ? new Date(result.estimated_delivery).toLocaleDateString() : 'TBD'}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">PAYMENT</span>
                                                <span className="font-black uppercase text-[10px] bg-primary/10 px-3 py-1 rounded-sm text-primary border border-primary/20">{result.payment_status || 'PAID'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full bg-white border border-slate-200 text-slate-400 py-5 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-50 hover:text-slate-900 transition-all shadow-md">
                                        DOWNLOAD PDF RECEIPT
                                    </button>
                                </div>
                            </div>

                            {/* History Timeline */}
                            <div className="mt-32 space-y-16 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[1px] before:bg-slate-100">
                                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
                                    <div className="w-10 h-[1px] bg-primary" />
                                    DELIVERY HISTORY
                                </h3>
                                {result.updates.map((update: ShipmentUpdate, idx: number) => (
                                    <div key={idx} className="relative pl-16 group">
                                        <div className={`absolute left-0 top-0 w-10 h-10 flex items-center justify-center border transition-all duration-500 ${idx === 0 ? 'bg-primary border-primary text-white rotate-45 shadow-lg' : 'bg-white border-slate-200 text-slate-300'}`}>
                                            <div className={idx === 0 ? '-rotate-45' : ''}>
                                                {idx === 0 ? <Zap size={18} /> : <Clock size={16} />}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-6">
                                                <p className={`font-black text-xl uppercase tracking-tighter ${idx === 0 ? 'text-slate-900' : 'text-slate-300'}`}>{update.status}</p>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 border border-slate-100">{new Date(update.created_at).toLocaleString()}</span>
                                            </div>
                                            <p className="text-slate-500 font-bold text-sm uppercase tracking-tight leading-relaxed max-w-4xl">{update.description}</p>
                                            <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-[0.3em] pt-2">
                                                <MapPin size={12} />
                                                {update.location}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
