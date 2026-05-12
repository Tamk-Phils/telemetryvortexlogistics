"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Filter, Edit2, Trash2, ArrowUpRight, Package, RefreshCw, X, Save, MapPin, Clock, Copy, Check, Radar, Activity, Zap } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const MapPicker = dynamic(() => import("@/components/MapPicker"), { ssr: false });
import { notifyShipmentUpdate } from "@/app/actions/email";
import { Shipment, ShipmentUpdate } from "@/types";

export default function ShipmentsList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleted, setShowDeleted] = useState(false);
    const [copyId, setCopyId] = useState<string | null>(null);

    // Status Update Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);
    const [newUpdate, setNewUpdate] = useState({
        status: "Pending",
        location: "",
        description: "",
        lat: 52.5200,
        lng: 13.4050
    });

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopyId(id);
        setTimeout(() => setCopyId(null), 2000);
    };

    const loadShipments = async () => {
        // Optimistic Load
        const cached = localStorage.getItem("vortex_shipments");
        if (cached) {
            setShipments(JSON.parse(cached) as Shipment[]);
        }

        setIsLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        try {
            const { data, error } = await supabase
                .from('shipments')
                .select('*')
                .order('created_at', { ascending: false })
                .abortSignal(controller.signal);

            clearTimeout(timeoutId);
            if (error) throw error;

            if (data) {
                setShipments(data as Shipment[]);
                localStorage.setItem("vortex_shipments", JSON.stringify(data));
            }
        } catch (err: any) {
            clearTimeout(timeoutId);
            console.error("Supabase Load Error:", err.message || "Connection error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadShipments();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm(`Are you sure you want to archive transit ${id}? It will be hidden from public view.`)) return;

        try {
            const { error } = await supabase
                .from('shipments')
                .update({ is_deleted: true, updated_at: new Date().toISOString() })
                .eq('tracking_number', id);

            if (error) throw error;

            const updated = shipments.map(s => {
                if (s.tracking_number === id) return { ...s, is_deleted: true, updated_at: new Date().toISOString() };
                return s;
            });
            setShipments(updated);
            localStorage.setItem("vortex_shipments", JSON.stringify(updated));
        } catch (err) {
            console.error(err);
            alert("Failed to archive transit.");
        }
    };

    const handleRestore = async (id: string) => {
        try {
            const { error } = await supabase
                .from('shipments')
                .update({ is_deleted: false, updated_at: new Date().toISOString() })
                .eq('tracking_number', id);

            if (error) throw error;

            const updated = shipments.map(s => {
                if (s.tracking_number === id) return { ...s, is_deleted: false, updated_at: new Date().toISOString() };
                return s;
            });
            setShipments(updated);
            localStorage.setItem("vortex_shipments", JSON.stringify(updated));
            alert(`Delivery ${id} restored successfully.`);
        } catch (err) {
            console.error(err);
            alert("Failed to restore transit.");
        }
    };

    const handleEditClick = (shipment: Shipment) => {
        setEditingShipment(shipment);
        setNewUpdate({
            status: shipment.current_status || "Pending",
            location: "",
            description: "",
            lat: shipment.latitude || 52.5200,
            lng: shipment.longitude || 13.4050
        });
        setIsModalOpen(true);
    };

    const handleUpdateStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingShipment) return;

        const updateRecord = {
            id: Math.random().toString(36).substr(2, 9),
            shipment_id: editingShipment.tracking_number,
            status: newUpdate.status,
            location: newUpdate.location,
            description: newUpdate.description,
            created_at: new Date().toISOString()
        };

        const updatedUpdates = [updateRecord, ...(editingShipment.updates || [])];

        try {
            const { error } = await supabase
                .from('shipments')
                .update({
                    current_status: newUpdate.status,
                    updates: updatedUpdates,
                    latitude: newUpdate.lat,
                    longitude: newUpdate.lng,
                    updated_at: new Date().toISOString()
                })
                .eq('tracking_number', editingShipment.tracking_number);

            if (error) throw error;

            const updatedShipments = shipments.map(s => {
                if (s.tracking_number === editingShipment.tracking_number) {
                    return {
                        ...s,
                        current_status: newUpdate.status as any,
                        latitude: newUpdate.lat,
                        longitude: newUpdate.lng,
                        updates: updatedUpdates,
                        updated_at: new Date().toISOString()
                    };
                }
                return s;
            });

            setShipments(updatedShipments);
            localStorage.setItem("vortex_shipments", JSON.stringify(updatedShipments));

            if (editingShipment.recipient_email) {
                await notifyShipmentUpdate({
                    to: editingShipment.recipient_email,
                    subject: `Vortex Express: Delivery Update ${editingShipment.tracking_number}`,
                    trackingNumber: editingShipment.tracking_number,
                    recipientName: editingShipment.recipient_name || 'Operator',
                    newStatus: newUpdate.status,
                    location: newUpdate.location,
                    description: newUpdate.description
                });
            }

            setIsModalOpen(false);
            setEditingShipment(null);
        } catch (err) {
            console.error(err);
            alert("Failed to update transit telemetry.");
        }
    };

    const filteredShipments = shipments.filter(s => {
        const matchesSearch =
            s.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.recipient_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.item_type || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesVisibility = showDeleted ? s.is_deleted : !s.is_deleted;

        return matchesSearch && matchesVisibility;
    });

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-end">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Radar size={20} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Fleet Management</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">DELIVERY <br/><span className="text-primary italic">SYSTEMS.</span></h1>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={loadShipments}
                        className="p-5 rounded-sm bg-white border border-slate-200 text-slate-400 hover:text-primary transition-all shadow-sm"
                        title="Sync Database"
                    >
                        <RefreshCw size={24} className={isLoading ? "animate-spin" : ""} />
                    </button>
                    <Link
                        href="/admin/dashboard/add"
                        className="bg-slate-900 hover:bg-primary text-white px-10 py-5 rounded-sm font-black text-[10px] uppercase tracking-widest transition-all shadow-xl flex items-center gap-4"
                    >
                        <Plus size={20} /> INITIALIZE DELIVERY
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-3xl relative">
                <div className="absolute top-0 right-0 w-full h-full opacity-[0.015] grayscale pointer-events-none">
                     <Image src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000" alt="Warehouse" fill className="object-cover" />
                </div>
                <div className="p-10 border-b border-slate-100 flex flex-wrap gap-8 justify-between items-center bg-slate-50/50 relative z-10">
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="SEARCH BY SIGNATURE OR NODE..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-sm py-5 px-8 pl-14 text-[10px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:border-primary transition-all placeholder:text-slate-300 outline-none"
                        />
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowDeleted(!showDeleted)}
                            className={`flex items-center gap-3 px-8 py-5 rounded-sm border transition-all text-[10px] font-black uppercase tracking-widest shadow-sm ${showDeleted
                                ? "bg-amber-50 border-amber-200 text-amber-700"
                                : "bg-white border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                                }`}
                        >
                            <Trash2 size={18} /> {showDeleted ? "VIEWING ARCHIVED" : "VIEW ARCHIVE"}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto relative z-10">
                    {isLoading && shipments.length === 0 ? (
                        <div className="p-32 text-center text-slate-300 font-black text-[10px] uppercase tracking-widest animate-pulse">CONNECTING TO GLOBAL DATA CLUSTER...</div>
                    ) : (
                        <>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-900 text-white">
                                        <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em]">DELIVERY SIGNATURE</th>
                                        <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em] hidden md:table-cell">NODE TOPOLOGY</th>
                                        <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em]">OPERATIONAL STATUS</th>
                                        <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-right">COMMANDS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredShipments.length > 0 ? (
                                        filteredShipments.map((shipment, i) => (
                                            <tr key={i} className="hover:bg-slate-50 transition-colors group bg-white/40">
                                                <td className="px-10 py-8">
                                                    <div className="flex items-center gap-5">
                                                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-sm text-slate-300 group-hover:text-primary group-hover:border-primary/20 transition-all">
                                                            <Package size={22} />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-3">
                                                                <p className="text-slate-900 font-black text-lg tracking-tighter uppercase">{shipment.tracking_number}</p>
                                                                <button
                                                                    onClick={() => handleCopy(shipment.tracking_number)}
                                                                    className={`p-1.5 transition-all ${copyId === shipment.tracking_number ? 'text-primary' : 'text-slate-200 hover:text-slate-900'}`}
                                                                >
                                                                    {copyId === shipment.tracking_number ? <Check size={16} /> : <Copy size={16} />}
                                                                </button>
                                                            </div>
                                                            <p className="text-slate-400 text-[9px] font-black mt-1 uppercase tracking-widest">{shipment.item_type || 'GENERAL ASSET'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8 hidden md:table-cell">
                                                    <p className="font-black text-slate-900 text-[10px] uppercase tracking-widest">{shipment.recipient_name}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-slate-400 text-[9px] font-black uppercase tracking-tight">{shipment.origin}</span>
                                                        <ArrowUpRight size={12} className="text-primary opacity-50" />
                                                        <span className="text-slate-400 text-[9px] font-black uppercase tracking-tight">{shipment.destination}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <span className={`px-4 py-2 rounded-sm text-[9px] font-black uppercase tracking-widest border ${shipment.current_status === 'Delivered' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                                        shipment.current_status === 'Held' ? 'bg-red-50 border-red-100 text-red-600' :
                                                            shipment.current_status === 'Pending' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                                                                'bg-primary/5 border-primary/20 text-primary'
                                                        }`}>
                                                        {shipment.current_status}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-8 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button
                                                            onClick={() => handleEditClick(shipment)}
                                                            className="p-3 bg-white border border-slate-200 text-slate-400 rounded-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                                                            title="Push Update"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        {shipment.is_deleted ? (
                                                            <button
                                                                onClick={() => handleRestore(shipment.tracking_number)}
                                                                className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-500 rounded-sm hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm"
                                                                title="Restore"
                                                            >
                                                                <RefreshCw size={18} />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleDelete(shipment.tracking_number)}
                                                                className="p-3 bg-red-50 border border-red-200 text-red-400 rounded-sm hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm"
                                                                title="Archive"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-10 py-32 text-center bg-slate-50/50">
                                                <p className="text-slate-300 font-black text-[10px] uppercase tracking-[0.4em]">NO DELIVERY RECORDS DISCOVERED</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="p-10 bg-slate-50/50 border-t border-slate-200 relative z-10">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SYNCHRONIZED WITH {filteredShipments.length} ACTIVE GLOBAL ASSET PACKETS</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Status Update Modal */}
            {isModalOpen && editingShipment && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-xl max-h-[90vh] flex flex-col rounded-sm shadow-3xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-300">
                        <div className="p-12 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">PUSH DATA</h3>
                                <p className="text-[10px] font-black text-primary mt-2 uppercase tracking-widest">ID: {editingShipment.tracking_number}</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-3 rounded-sm hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateStatus} className="p-12 space-y-10 overflow-y-auto">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">NEW MILESTONE</label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm py-5 px-8 focus:outline-none focus:border-primary font-black text-[10px] uppercase tracking-widest text-slate-900 appearance-none cursor-pointer outline-none"
                                        value={newUpdate.status}
                                        onChange={(e) => setNewUpdate({ ...newUpdate, status: e.target.value })}
                                        required
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Delivery">In Delivery</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Held">Held at Customs</option>
                                        <option value="Postponed">Postponed</option>
                                    </select>
                                    <Clock className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={20} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">GEOSPATIAL LOCK</label>
                                <div className="rounded-sm overflow-hidden border border-slate-200 shadow-inner">
                                    <MapPicker 
                                        initialLat={newUpdate.lat} 
                                        initialLng={newUpdate.lng} 
                                        onChange={(lat, lng) => setNewUpdate({ ...newUpdate, lat, lng })} 
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">DATA LOG</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-sm py-6 px-8 focus:outline-none focus:border-primary font-bold text-slate-500 text-xs min-h-[120px] outline-none resize-none uppercase tracking-tight"
                                    placeholder="ENTER DESCRIPTIVE VARIANCE LOG..."
                                    value={newUpdate.description}
                                    onChange={(e) => setNewUpdate({ ...newUpdate, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="pt-6 flex gap-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-white border border-slate-200 text-slate-400 py-6 rounded-sm font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-all"
                                >
                                    TERMINATE
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-slate-900 hover:bg-primary text-white py-6 rounded-sm font-black text-[10px] uppercase tracking-[0.4em] shadow-xl flex items-center justify-center gap-4 transition-all"
                                >
                                    <Save size={20} /> SYNC SYSTEM
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
