"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, MapPin, Globe, Sparkles, Radar, Send } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white relative overflow-hidden py-32 text-slate-900">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 bg-white text-primary px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-[0.4em] border border-slate-200 mb-10 shadow-sm"
                    >
                        <Radar size={14} className="animate-spin-slow" />
                        <span className="text-slate-500">Customer Support System</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-[0.85]"
                    >
                        GET IN <br/><span className="text-primary italic">TOUCH.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 font-bold max-w-3xl mx-auto uppercase tracking-tight leading-relaxed"
                    >
                        Our team is here to help you with anything you need. Whether you have a question about a shipment or want to start a business account, we're ready to chat.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
                    {[
                        { 
                            icon: MessageSquare, 
                            title: "LIVE CHAT", 
                            desc: "Talk to a real person right now through our website chat box.", 
                            action: "OPEN CHAT", 
                            color: "text-primary" 
                        },
                        { 
                            icon: Mail, 
                            title: "EMAIL US", 
                            desc: "Send us a detailed message and we'll get back to you within 2 hours.", 
                            action: "HELP@VORTEX.COM", 
                            color: "text-primary" 
                        },
                        { 
                            icon: Phone, 
                            title: "CALL US", 
                            desc: "Our friendly support team is available by phone 24/7.", 
                            action: "+1 (800) VORTEX-NOW", 
                            color: "text-primary" 
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="bg-slate-50 p-12 rounded-sm border border-slate-200 shadow-sm hover:shadow-2xl hover:bg-white transition-all group"
                        >
                            <div className={`w-16 h-16 bg-primary/5 ${item.color} rounded-sm flex items-center justify-center mb-8 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                                <item.icon size={32} />
                            </div>
                            <h3 className="text-[10px] font-black text-slate-900 mb-4 uppercase tracking-[0.3em]">{item.title}</h3>
                            <p className="text-slate-500 font-bold text-sm mb-8 uppercase tracking-tight leading-relaxed">{item.desc}</p>
                            <button className="text-primary font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-2">
                                {item.action} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200"
                >
                    <div className="md:w-2/5 p-16 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden">
                        {/* Background institutional image */}
                        <div className="absolute inset-0 opacity-[0.07] z-0 pointer-events-none grayscale">
                             <Image 
                                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000" 
                                alt="Support Center" 
                                fill 
                                className="object-cover"
                            />
                        </div>
                        
                        <div className="relative z-10">
                            <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter leading-tight">SEND A <br/><span className="text-primary">MESSAGE.</span></h3>
                            <p className="text-white/40 font-bold leading-relaxed mb-16 uppercase tracking-tight text-sm">Fill out the form and we'll route your message to the right department.</p>
                            <div className="space-y-10">
                                <div className="flex items-start gap-6">
                                    <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-sm flex items-center justify-center text-primary shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="font-black text-white text-[10px] uppercase tracking-widest mb-1">MAIN OFFICE</p>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-tight">123 Logistics Way, Dallas, TX 75201</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-sm flex items-center justify-center text-primary shrink-0">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <p className="font-black text-white text-[10px] uppercase tracking-widest mb-1">OUR NETWORK</p>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-tight">Hubs in NYC, Chicago, LA, and Miami</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-3/5 p-16 bg-white">
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">First Name</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-sm px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:border-primary transition-all placeholder:text-slate-200 outline-none" placeholder="e.g. John" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Last Name</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-sm px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:border-primary transition-all placeholder:text-slate-200 outline-none" placeholder="e.g. Smith" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Your Email</label>
                                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-sm px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:border-primary transition-all placeholder:text-slate-200 outline-none" placeholder="name@email.com" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Message</label>
                                <textarea rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:border-primary transition-all resize-none placeholder:text-slate-200 outline-none" placeholder="How can we help?" />
                            </div>
                            <button className="w-full bg-slate-900 hover:bg-primary text-white font-black text-[10px] uppercase tracking-[0.4em] py-6 rounded-sm transition-all shadow-xl flex items-center justify-center gap-3 group">
                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                SEND MESSAGE
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
