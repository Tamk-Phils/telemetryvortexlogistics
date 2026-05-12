"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, User, ShieldCheck, Globe, ChevronDown, Bell, Zap, Radar, Truck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Track", href: "/tracking" },
        { name: "Services", href: "/usage" },
        { name: "About Us", href: "/about" },
        { name: "Help Center", href: "/resources" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-2' : 'py-6'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <nav className={`transition-all duration-500 rounded-full border ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-2xl px-10 py-4 border-slate-100' : 'px-6 py-4 border-transparent'}`}>
                    <div className="flex items-center justify-between">
                        {/* Brand */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                                <Truck size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-xl font-black tracking-tighter leading-none text-slate-900`}>Vortex</span>
                                <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase leading-none mt-1">Shipping</span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-bold transition-all hover:text-primary relative group ${pathname === link.href ? 'text-primary' : 'text-slate-500'}`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </Link>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="hidden lg:flex items-center gap-6">
                            <Link href="/login" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Login</Link>
                            <Link href="/signup" className="bg-primary text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-slate-900 transition-all shadow-xl shadow-primary/20">
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <button 
                            className="lg:hidden text-slate-900 p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden bg-white border-b border-slate-100 overflow-hidden mt-4 mx-6 rounded-3xl shadow-3xl"
                    >
                        <div className="p-10 flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-bold text-slate-900 hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-slate-50 flex flex-col gap-4">
                                <Link href="/login" className="text-center py-4 font-bold text-slate-500">Login</Link>
                                <Link 
                                    href="/signup"
                                    className="bg-primary text-white py-5 rounded-full font-bold text-center shadow-2xl"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
