"use client";

import { motion } from "framer-motion";
import { Globe, Target, ShieldCheck, Zap, Cpu, Radar, Database, Network, Users, Award, Landmark } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="bg-white min-h-screen">
            {/* Simple Hero Header */}
            <div className="relative pt-48 pb-32 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-3 bg-white text-primary px-4 py-2 rounded-full border border-slate-200 mb-10 shadow-sm">
                            <span className="text-xs font-bold uppercase tracking-wider">About Vortex Express</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-10 leading-[1.1]">
                            Simplifying Global <br />
                            <span className="text-primary italic">Shipping.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl">
                            Since 2026, Vortex Express has been on a mission to make world trade accessible to everyone. We combine advanced technology with a human touch to deliver your packages safely and on time.
                        </p>
                    </motion.div>
                </div>
                {/* Decorative image background */}
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                   <Image src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1500" alt="Warehouse" fill className="object-cover" />
                </div>
            </div>

            {/* Our Story Section */}
            <section className="py-32 container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                        <Image 
                            src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=2000" 
                            alt="Our Team in Action" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Story</h2>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                Vortex Express started with a simple idea: shipping shouldn't be complicated. What began as a small regional delivery service has grown into a global network that connects businesses and people across continents.
                            </p>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                We believe that behind every package is a story—a gift for a loved one, a critical part for a factory, or a new product for a growing business. That's why we treat every delivery with the utmost care and precision.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-6">
                            <div>
                                <p className="text-5xl font-black text-primary mb-2">10M+</p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Delivered</p>
                            </div>
                            <div>
                                <p className="text-5xl font-black text-primary mb-2">500+</p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Partners</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-32 bg-slate-900 text-white">
               <div className="container mx-auto px-6 max-w-7xl text-center">
                  <h2 className="text-4xl md:text-5xl font-black mb-24 tracking-tight">What We Stand For</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                     {[
                        { icon: ShieldCheck, title: "Trust & Safety", desc: "Your cargo's safety is our top priority. We use advanced tracking and secure handling for every shipment." },
                        { icon: Zap, title: "Speed & Efficiency", desc: "We constantly optimize our routes and processes to ensure your packages arrive as fast as possible." },
                        { icon: Users, title: "Customer First", desc: "Our global support team is always ready to help you, no matter where you are or what time it is." }
                     ].map((value, i) => (
                        <div key={i} className="space-y-8">
                           <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                              <value.icon size={36} />
                           </div>
                           <h3 className="text-2xl font-bold">{value.title}</h3>
                           <p className="text-white/60 text-lg leading-relaxed">{value.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Why Choose Us Gallery */}
            <section className="py-32 container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-24">
                   <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Built for the Modern World</h2>
                   <p className="text-lg text-slate-500 max-w-2xl mx-auto">We invest in the latest technology and infrastructure to provide you with a world-class shipping experience.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[800px]">
                   <div className="md:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl">
                      <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000" alt="Tech Center" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      <div className="absolute bottom-12 left-12">
                         <h3 className="text-3xl font-black text-white mb-4">Smart Warehousing</h3>
                         <p className="text-white/70 max-w-md">Our automated hubs ensure fast processing and accurate sorting for every single package.</p>
                      </div>
                   </div>
                   <div className="md:col-span-4 grid grid-rows-2 gap-8">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                         <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=1000" alt="Data" fill className="object-cover" />
                         <div className="absolute inset-0 bg-slate-900/20" />
                      </div>
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                         <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000" alt="Global" fill className="object-cover" />
                         <div className="absolute inset-0 bg-slate-900/20" />
                      </div>
                   </div>
                </div>
            </section>

            {/* Meet Our Founders / Team (Simplified) */}
            <section className="py-32 bg-slate-50">
               <div className="container mx-auto px-6 max-w-7xl">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                     <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Our Global Team</h2>
                        <p className="text-lg text-slate-500 max-w-xl">We are a diverse group of logistics experts, engineers, and support professionals dedicated to moving your world.</p>
                     </div>
                     <Link href="/careers" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-slate-900 transition-all shadow-xl">Join Our Team</Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     {[
                        { name: "Alex Rivera", role: "CEO & Founder", img: "https://i.pravatar.cc/150?u=a" },
                        { name: "Elena Petrova", role: "Head of Operations", img: "https://i.pravatar.cc/150?u=b" },
                        { name: "Marcus Thorne", role: "Tech Director", img: "https://i.pravatar.cc/150?u=c" },
                        { name: "Sumi Lee", role: "Customer Success", img: "https://i.pravatar.cc/150?u=d" }
                     ].map((member, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                           <div className="w-24 h-24 rounded-full overflow-hidden relative mx-auto mb-6 border-4 border-slate-50">
                              <Image src={member.img} alt={member.name} fill />
                           </div>
                           <h4 className="text-xl font-bold text-slate-900">{member.name}</h4>
                           <p className="text-slate-400 font-medium">{member.role}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Join Us CTA */}
            <section className="py-40 container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-10">
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight">Be Part of the Journey.</h2>
                    <p className="text-xl text-slate-500 leading-relaxed font-medium">
                        Whether you're shipping a single package or managing a global supply chain, we're here to help you grow.
                    </p>
                    <div className="pt-8">
                        <Link href="/signup" className="bg-primary text-white px-12 py-6 rounded-full font-black text-lg hover:bg-slate-900 transition-all shadow-2xl">
                            Start Shipping with Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
