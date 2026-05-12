"use client";

import { MoveRight, ShieldCheck, Globe, Zap, Star, ChevronDown, CheckCircle2, TrendingUp, Boxes, Briefcase, Camera, Play, Layers, Activity, Cpu, Radio, Radar, Shield, ArrowUpRight, BarChart3, Database, Truck, Ship, Plane, Clock, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import TrackingSearch from "@/components/TrackingSearch";

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left group"
      >
        <span className="text-lg font-bold text-slate-900 group-hover:text-primary transition-all tracking-tight">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-slate-400 group-hover:text-primary transition-colors"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-slate-500 text-base leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  return (
    <main className="relative bg-white min-h-screen overflow-hidden text-slate-900 font-sans">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-blue-50 rounded-l-full -mr-20 z-0 opacity-50" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Fast Shipping Across America</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tighter text-slate-900">
                Ship Your Stuff <br />
                With <span className="text-primary">Vortex.</span>
              </h1>
              
              <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-medium">
                The easiest way to send and track your boxes. Whether it's across town or coast-to-coast, we get your packages there safe and on time.
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                <Link href="/tracking" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-bold text-base hover:bg-slate-900 transition-all shadow-xl shadow-primary/20 group">
                  Track Your Box <MoveRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/quote" className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-full font-bold text-base hover:bg-slate-50 transition-all border border-slate-200 shadow-sm">
                  Get a Free Price
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-10 border-t border-slate-100">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden relative bg-slate-200">
                        <Image src={`https://i.pravatar.cc/150?u=${i}`} alt="User" fill />
                      </div>
                    ))}
                 </div>
                 <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-1">
                       {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-sm font-bold text-slate-900">Loved by thousands of families & businesses</p>
                 </div>
              </div>
            </motion.div>

            <div className="lg:col-span-5 relative">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1 }}
                 className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-2xl group"
               >
                  <Image 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000" 
                    alt="Vortex Warehouse" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  
                  {/* Floating Box Count */}
                  <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Packages Today</p>
                     <p className="text-4xl font-black text-primary tracking-tighter">25,481</p>
                  </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-slate-50">
         <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-24">
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">How We Deliver</h2>
               <p className="text-lg text-slate-500 font-medium">We have many ways to get your stuff where it needs to go, fast and safe.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { icon: Truck, title: "Local Delivery", desc: "For things moving within your city or state. Fast and cheap.", img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000" },
                  { icon: Plane, title: "Air Express", desc: "Need it tomorrow? We'll fly it anywhere in the country.", img: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1000" },
                  { icon: Boxes, title: "Business Shipping", desc: "Special rates and tools for stores and online sellers.", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000" }
               ].map((service, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group"
                  >
                     <div className="relative h-64 overflow-hidden">
                        <Image src={service.img} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-slate-900/20" />
                        <div className="absolute bottom-6 left-6">
                           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-xl">
                              <service.icon size={24} />
                           </div>
                        </div>
                     </div>
                     <div className="p-10">
                        <h3 className="text-2xl font-black text-slate-900 mb-4">{service.title}</h3>
                        <p className="text-slate-500 leading-relaxed mb-8">{service.desc}</p>
                        <Link href="/services" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                           See Details <MoveRight size={18} />
                        </Link>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Simple How it Works */}
      <section className="py-32 bg-white">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=1000" alt="Shipping" fill className="object-cover" />
               </div>

               <div className="space-y-12">
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Easy as 1, 2, 3...</h2>
                  <div className="space-y-10">
                     {[
                        { step: "1", title: "Tell us about your box", desc: "Enter where it's going and how much it weighs in lbs." },
                        { step: "2", title: "Print your label", desc: "Pay a low price and print your shipping label at home." },
                        { step: "3", title: "Hand it to us", desc: "Drop it off or we'll come pick it up from your house." },
                        { step: "4", title: "Relax", desc: "Watch your package move on our live map until it's delivered." }
                     ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xl shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                              {item.step}
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                              <p className="text-slate-500 font-medium">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="pt-4">
                     <Link href="/signup" className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-base hover:bg-primary transition-all shadow-2xl">
                        Get Your First Label
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-slate-900 text-white text-center">
         <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tight">We Love Moving Boxes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
               <div>
                  <p className="text-5xl font-black text-primary mb-2">50</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-white/50">States Covered</p>
               </div>
               <div>
                  <p className="text-5xl font-black text-primary mb-2">15M+</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-white/50">LBS Shipped</p>
               </div>
               <div>
                  <p className="text-5xl font-black text-primary mb-2">24/7</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-white/50">Support</p>
               </div>
               <div>
                  <p className="text-5xl font-black text-primary mb-2">100%</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-white/50">Reliable</p>
               </div>
            </div>
         </div>
      </section>

      {/* Simple FAQ */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-slate-900 mb-12 text-center tracking-tight">Common Questions</h2>
            <div className="bg-white rounded-3xl shadow-xl p-10 space-y-2 border border-slate-100">
              <FAQItem
                question="How much does it cost?"
                answer="Prices depend on how heavy your box is in lbs and how far it's going. You can get a free price check right now on our home page."
              />
              <FAQItem
                 question="How do I track my stuff?"
                 answer="Just put your tracking number into the box on our website. We'll show you exactly where your package is on a map."
               />
               <FAQItem
                 question="Do you pick up from my house?"
                 answer="Yes! You can schedule a pickup and our driver will come right to your front door to take your package."
               />
               <FAQItem
                 question="What if my package is lost?"
                 answer="We have a money-back guarantee and every shipment includes basic insurance for your peace of mind."
               />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-primary text-center">
         <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight mb-12">Start Your Shipment Today</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
               <Link href="/signup" className="bg-white text-primary px-12 py-6 rounded-full font-black text-lg shadow-2xl hover:bg-slate-900 hover:text-white transition-all">
                  Create Free Account
               </Link>
               <Link href="/contact" className="bg-transparent border-2 border-white text-white px-12 py-6 rounded-full font-black text-lg hover:bg-white hover:text-primary transition-all">
                  Call Our Team
               </Link>
            </div>
         </div>
      </section>
    </main>
  );
}
