"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Save, Package, User, MapPin, Scale, AlertCircle, Clock, CreditCard, FileText, Calendar, Copy, Check, Mail, Radar, Zap, Box } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { notifyShipmentCreated } from "@/app/actions/email";

export default function AddShipment() {
    const router = useRouter();
    const [isCopying, setIsCopying] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        tracking_number: "",
        item_type: "",
        description: "",
        sender_name: "",
        sender_email: "",
        recipient_name: "",
        recipient_address: "",
        recipient_email: "",
        origin: "New York Hub",
        destination: "",
        weight: "",
        dimensions: "",
        current_status: "Pending",
        payment_method: "Credit Card",
        payment_status: "Paid",
        estimated_delivery: ""
    });

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Generate tracking number
        setFormData(prev => ({
            ...prev,
            tracking_number: `VTX${Math.floor(100000000 + Math.random() * 900000000)}`
        }));
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(formData.tracking_number);
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSaving(true);

        const newShipment = {
            ...formData,
            weight: parseFloat(formData.weight) || 0,
            estimated_delivery: formData.estimated_delivery ? new Date(formData.estimated_delivery).toISOString() : null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            updates: [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    status: formData.current_status,
                    location: formData.origin,
                    description: `Shipment Registered: ${formData.description || 'New package created'}. Type: ${formData.item_type}`,
                    created_at: new Date().toISOString()
                }
            ]
        };

        try {
            const { error: sbError } = await supabase
                .from('shipments')
                .insert([newShipment]);

            if (sbError) throw sbError;

            // Cache fallback
            const existingRaw = localStorage.getItem("vortex_shipments");
            const existing: any[] = existingRaw ? JSON.parse(existingRaw) : [];
            existing.push({ ...newShipment, id: Math.random().toString(36).substr(2, 9) });
            localStorage.setItem("vortex_shipments", JSON.stringify(existing));

            if (formData.recipient_email) {
                await notifyShipmentCreated({
                    to: formData.recipient_email,
                    subject: `Vortex Shipping: Package ${formData.tracking_number}`,
                    trackingNumber: formData.tracking_number,
                    senderName: formData.sender_name || 'Vortex Customer',
                    recipientName: formData.recipient_name || 'Recipient',
                    origin: formData.origin || 'Source Hub',
                    destination: formData.destination || 'Destination Hub'
                });
            }

            router.push("/admin/dashboard/shipments");
        } catch (err: any) {
            console.error("Full Supabase Error:", err);
            setError(`Something went wrong: ${err.message || "Could not save the shipment."}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-12 max-w-6xl pb-24">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/admin/dashboard/shipments" className="p-5 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all shadow-sm group">
                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">NEW <span className="text-primary italic">SHIPMENT.</span></h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Create a new package delivery</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 p-8 rounded-2xl flex items-center gap-6 text-red-600 animate-in fade-in slide-in-from-top-4">
                    <AlertCircle size={28} />
                    <p className="font-bold">Error: {error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">
                <div className="bg-white p-12 md:p-20 rounded-3xl border border-slate-200 shadow-3xl space-y-16 relative overflow-hidden">
                    
                    {/* Tracking ID Header */}
                    <div className="flex flex-wrap gap-12 justify-between items-end pb-16 border-b border-slate-100 relative z-10">
                        <div className="space-y-4">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">TRACKING NUMBER</p>
                            <div className="flex items-center gap-6">
                                <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic">
                                    {formData.tracking_number}
                                </h2>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className={`p-4 rounded-xl transition-all ${isCopying ? 'bg-primary text-white' : 'bg-slate-50 border border-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                                >
                                    {isCopying ? <Check size={24} /> : <Copy size={24} />}
                                </button>
                            </div>
                        </div>
                        <div className="bg-primary text-white p-10 rounded-3xl shadow-2xl flex items-center gap-8">
                             <div className="text-right">
                                <p className="text-xs font-bold opacity-60 uppercase mb-1">Status</p>
                                <p className="text-2xl font-black uppercase italic tracking-tighter">Ready to Ship</p>
                             </div>
                             <Box size={40} />
                        </div>
                    </div>

                    {/* Section 1: Package Info */}
                    <div className="space-y-10 relative z-10">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Package size={20} />
                            </div>
                            PACKAGE INFO
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">WHAT IS IN THE BOX?</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Clothes, Electronics, Books"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-5 px-8 focus:border-primary font-bold text-slate-900 outline-none"
                                    value={formData.item_type}
                                    onChange={(e) => setFormData({ ...formData, item_type: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">DELIVERY DATE</label>
                                <input
                                    type="datetime-local"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-5 px-8 focus:border-primary font-bold text-slate-900 outline-none"
                                    value={formData.estimated_delivery}
                                    onChange={(e) => setFormData({ ...formData, estimated_delivery: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">DESCRIPTION</label>
                            <textarea
                                required
                                rows={3}
                                placeholder="Add any extra notes about the package here..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-6 px-8 focus:border-primary font-bold text-slate-500 text-sm outline-none resize-none"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Section 2: Shipping Addresses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
                        {/* From */}
                        <div className="space-y-10">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <MapPin size={20} />
                                </div>
                                FROM (SENDER)
                            </h3>
                            <div className="space-y-8">
                                <input
                                    type="text"
                                    required
                                    placeholder="SENDER FULL NAME"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-5 px-8 focus:border-primary font-bold text-slate-900 outline-none"
                                    value={formData.sender_name}
                                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    required
                                    placeholder="SENDER EMAIL"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-5 px-8 focus:border-primary font-bold text-slate-900 outline-none"
                                    value={formData.sender_email}
                                    onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    required
                                    placeholder="SENDER ADDRESS"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-5 px-8 focus:border-primary font-bold text-slate-900 outline-none"
                                    value={formData.origin}
                                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* To */}
                        <div className="space-y-10">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <User size={20} />
                                </div>
                                TO (RECIPIENT)
                            </h3>
                            <div className="space-y-8">
                                <input
                                    type="text"
                                    required
                                    placeholder="RECIPIENT FULL NAME"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-5 px-8 focus:border-primary font-bold text-slate-900 outline-none"
                                    value={formData.recipient_name}
                                    onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    required
                                    placeholder="RECIPIENT EMAIL"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-5 px-8 focus:border-primary font-bold text-slate-900 outline-none"
                                    value={formData.recipient_email}
                                    onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                                />
                                <textarea
                                    required
                                    rows={2}
                                    placeholder="RECIPIENT FULL ADDRESS"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-5 px-8 focus:border-primary font-bold text-slate-900 outline-none resize-none"
                                    value={formData.recipient_address}
                                    onChange={(e) => setFormData({ ...formData, recipient_address: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Measurements */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-16 border-t border-slate-100 relative z-10">
                        <div className="space-y-10">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Scale size={20} />
                                </div>
                                WEIGHT & SIZE
                            </h3>
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">WEIGHT (IN LBS)</label>
                                    <input
                                        type="number"
                                        required
                                        placeholder="0 lbs"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-5 px-8 focus:border-primary font-bold text-slate-900 outline-none"
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">SIZE (LxWxH)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 12x12x12"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-5 px-8 focus:border-primary font-bold text-slate-900 outline-none"
                                        value={formData.dimensions}
                                        onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10 md:col-span-2">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <CreditCard size={20} />
                                </div>
                                PAYMENT & STATUS
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">PAYMENT METHOD</label>
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-5 px-8 focus:border-primary font-bold text-slate-900 outline-none appearance-none cursor-pointer"
                                            value={formData.payment_method}
                                            onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                                        >
                                            <option value="Credit Card">Credit Card</option>
                                            <option value="Debit Card">Debit Card</option>
                                            <option value="PayPal">PayPal</option>
                                            <option value="Bank Transfer">Bank Transfer</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">SHIPPING STATUS</label>
                                        <select
                                            className="w-full bg-slate-900 text-white border-none rounded-xl py-5 px-8 focus:bg-primary font-bold outline-none cursor-pointer"
                                            value={formData.current_status}
                                            onChange={(e) => setFormData({ ...formData, current_status: e.target.value })}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Delivery">In Delivery</option>
                                            <option value="Out for Delivery">Out for Delivery</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-center">
                                    <p className="text-xs font-bold text-slate-400 uppercase leading-relaxed">
                                        Double check all info before saving. Labels will be printed in LBS.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 border-t border-slate-100 flex flex-wrap justify-end gap-10 items-center relative z-10">
                        <Link href="/admin/dashboard/shipments" className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors">CANCEL</Link>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`bg-slate-900 hover:bg-primary text-white px-16 py-6 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-3xl flex items-center gap-6 disabled:opacity-50`}
                        >
                            {isSaving ? <Clock className="animate-spin" size={20} /> : <Save size={20} />}
                            {isSaving ? "SAVING..." : "CREATE SHIPMENT"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
