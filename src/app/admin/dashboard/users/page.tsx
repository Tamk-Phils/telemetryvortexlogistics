"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, Search, Filter, MoreVertical, Mail, Shield, ShieldCheck, Radar, Activity, Fingerprint } from "lucide-react";
import { useState } from "react";

export default function UserManagement() {
    const [users, setUsers] = useState([
        { id: 1, name: "COMMAND ADMIN", email: "ADMIN@VORTEX-SHIPPING.COM", role: "SUPER USER", status: "ACTIVE", lastLogin: "2 MINS AGO" },
        { id: 2, name: "SARAH JENKINS", email: "S.JENKINS@SWIFT.IO", role: "OPERATOR", status: "ACTIVE", lastLogin: "1 HOUR AGO" },
        { id: 3, name: "ROBERT CHEN", email: "R.CHEN@GLOBALPORT.IO", role: "MANAGER", status: "OFFLINE", lastLogin: "3 DAYS AGO" },
        { id: 4, name: "MICHAEL TORRES", email: "M.TORRES@APEX.IO", role: "OPERATOR", status: "ACTIVE", lastLogin: "5 HOURS AGO" },
    ]);

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Radar size={20} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Office Personnel</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">USER <br/><span className="text-primary italic">DIRECTORY.</span></h1>
                </div>
                <button className="bg-slate-900 hover:bg-primary text-white px-10 py-5 rounded-sm font-black text-[10px] uppercase tracking-widest flex items-center gap-4 shadow-xl transition-all">
                    <UserPlus size={20} /> AUTHORIZE NEW OFFICE
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: "PLANETARY OFFICES", val: "1,280", icon: Users, color: "text-primary", bg: "bg-primary/5" },
                    { label: "ACTIVE SYNC", val: "42", icon: Activity, color: "text-primary", bg: "bg-primary/5" },
                    { label: "PENDING UPLINK", val: "15", icon: Fingerprint, color: "text-primary", bg: "bg-primary/5" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm hover:shadow-2xl transition-all group flex items-center gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full pointer-events-none" />
                        <div className={`w-16 h-16 rounded-sm ${stat.bg} ${stat.color} flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                            <stat.icon size={32} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-sm border border-slate-200 shadow-3xl overflow-hidden">
                <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10 bg-slate-50/50">
                    <div className="relative flex-1 w-full max-w-xl">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input 
                            type="text" 
                            placeholder="SEARCH BY IDENTITY, UPLINK OR SYSTEM..." 
                            className="w-full bg-white border border-slate-200 rounded-sm py-4 px-8 pl-16 text-[10px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:border-primary transition-all placeholder:text-slate-300 outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-8">
                        <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-all">
                            <Filter size={18} /> FILTER SYSTEMS
                        </button>
                        <div className="h-6 w-[1px] bg-slate-200" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SHOWING 4 / 1,280 AUTHORIZED OFFICES</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-900 text-white">
                                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em]">OFFICE IDENTITY</th>
                                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em]">SYSTEM ROLE</th>
                                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em]">SYNC STATUS</th>
                                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em]">LAST UPLINK</th>
                                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-all group">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-sm bg-slate-50 border border-slate-100 flex items-center justify-center text-primary font-black group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{user.name}</p>
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-sm text-[9px] font-black text-slate-600 uppercase tracking-widest">{user.role}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'ACTIVE' ? 'bg-primary animate-pulse shadow-[0_0_8px_rgba(0,112,243,0.5)]' : 'bg-slate-300'}`} />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${user.status === 'ACTIVE' ? 'text-primary' : 'text-slate-400'}`}>{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.lastLogin}</p>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button className="p-3 text-slate-200 hover:text-slate-900 transition-all">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
