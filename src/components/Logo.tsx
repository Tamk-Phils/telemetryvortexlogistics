"use client";

import { motion } from "framer-motion";

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <motion.div 
            className={`relative ${className}`}
            whileHover={{ scale: 1.05 }}
        >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0070F3" />
                        <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                </defs>
                
                {/* Outer Ring */}
                <motion.circle 
                    cx="50" cy="50" r="45" 
                    stroke="#e2e8f0" 
                    strokeWidth="1" 
                />

                {/* Pulsing Data Rings */}
                <motion.circle 
                    cx="50" cy="50" r="35" 
                    stroke="#0070F3" 
                    strokeWidth="0.5"
                    strokeDasharray="4 8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Vortex T-Shape (for Data) */}
                <path 
                    d="M30 35H70M50 35V75" 
                    stroke="url(#logoGradient)" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                />
                
                {/* Precision Center Office */}
                <motion.circle 
                    cx="50" cy="50" r="4" 
                    fill="#0070F3"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </svg>
        </motion.div>
    );
}
