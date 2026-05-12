"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Facebook, Mail, Phone, MapPin, ArrowRight, Instagram, Zap, Globe, Shield, Terminal, Cpu, Truck, Headphones, HelpCircle } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-100 pt-32 pb-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
                    {/* Brand Column */}
                    <div className="space-y-10">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                                <Truck size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">Vortex</span>
                                <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase leading-none mt-1">Shipping</span>
                            </div>
                        </Link>
                        <p className="text-slate-500 font-medium leading-relaxed text-sm">
                            Making global shipping simple, fast, and secure. We move your world with precision and care.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                                <Link key={i} href="#" className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                                    <Icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-10 border-b border-slate-200 pb-4">
                            Our Services
                        </h4>
                        <ul className="space-y-4">
                            {['Air Freight', 'Ocean Shipping', 'Road Transport', 'Warehouse Solutions', 'Customs Clearance'].map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-500 hover:text-primary font-bold text-sm transition-all flex items-center gap-2 group">
                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-10 border-b border-slate-200 pb-4">
                            Help & Support
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Track a Package', href: '/tracking' },
                                { name: 'Help Center', href: '/resources' },
                                { name: 'Shipping Tips', href: '/usage' },
                                { name: 'Contact Us', href: '/contact' },
                                { name: 'Service Status', href: '/alerts' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-500 hover:text-primary font-bold text-sm transition-all flex items-center gap-2 group">
                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-10 border-b border-slate-200 pb-4">
                            Contact Us
                        </h4>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    Level 88, Cyber District,<br />
                                    Singapore 018989
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm shrink-0">
                                    <Phone size={20} />
                                </div>
                                <p className="text-slate-900 text-sm font-black">+1 (800) VORTEX-LOG</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="pt-16 border-t border-slate-200 flex flex-col lg:flex-row justify-between items-center gap-12">
                    <div className="flex-1 max-w-sm">
                        <h5 className="text-sm font-black text-slate-900 mb-4">Subscribe to our Newsletter</h5>
                        <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-full shadow-inner">
                            <input type="email" placeholder="Your email address" className="flex-1 bg-transparent py-3 px-6 text-slate-900 text-sm font-medium outline-none" />
                            <button className="bg-primary text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-slate-900 transition-all shadow-lg">Join</button>
                        </div>
                    </div>
                    <div className="text-center lg:text-right">
                        <p className="text-slate-400 font-bold text-xs mb-4">© 2026 Vortex Express. All rights reserved.</p>
                        <div className="flex gap-8 justify-center lg:justify-end">
                            <Link href="/privacy" className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">Terms of Service</Link>
                            <Link href="/cookies" className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">Cookie Settings</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
