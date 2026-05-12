"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, ShieldCheck, Home, Radar } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Hardcoded demo auth match
        setTimeout(() => {
            if (username === "admin" && password === "admin123") {
                router.push("/admin/dashboard");
            } else {
                alert("Verification failed. Please check your administrative credentials.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-6 bg-white relative overflow-hidden">
            {/* Baclbsround glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg bg-white p-12 md:p-16 rounded-sm shadow-3xl border border-slate-200 relative z-10"
            >
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 bg-white text-primary px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-[0.4em] border border-slate-200 mb-10 shadow-sm">
                        <Radar size={14} className="animate-spin-slow" />
                        <span className="text-slate-500">Command Center Uplink</span>
                    </div>
                    <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-[0.9]">VORTEX <br/><span className="text-primary italic">COMMAND.</span></h2>
                    <p className="text-slate-400 font-bold uppercase tracking-tight text-xs mt-4">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-10">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">ADMIN IDENTITY</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-sm py-5 px-6 pl-14 focus:outline-none focus:border-primary transition-all font-black text-[10px] uppercase tracking-widest text-slate-900 outline-none"
                                placeholder="USERNAME"
                                required
                            />
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">SECURE PASSKEY</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-sm py-5 px-6 pl-14 focus:outline-none focus:border-primary transition-all font-black text-[10px] uppercase tracking-widest text-slate-900 outline-none"
                                placeholder="••••••••"
                                required
                            />
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 hover:bg-primary text-white py-6 rounded-sm font-black transition-all shadow-xl flex items-center justify-center gap-4 group text-[10px] uppercase tracking-[0.4em]"
                        >
                            {isLoading ? "SYNCHRONIZING..." : (
                                <>
                                    AUTHORIZE UPLINK <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-16 pt-10 border-t border-slate-100 text-center">
                    <Link href="/" className="inline-flex items-center gap-3 text-slate-400 hover:text-primary transition-colors font-black text-[10px] uppercase tracking-widest">
                        <Home size={16} /> RETURN TO PUBLIC TERMINAL
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
