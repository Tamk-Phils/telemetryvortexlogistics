"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User, Headset, Loader2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ChatMessage, ChatRoom } from "@/types";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [roomId, setRoomId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial session check
    useEffect(() => {
        let isMounted = true;

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (isMounted) setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (isMounted) {
                setUser(session?.user ?? null);
                if (!session) {
                    setRoomId(null);
                    setMessages([]);
                }
            }
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    // Load or create room on first open
    useEffect(() => {
        if (isOpen && !roomId && user) {
            const savedRoomId = localStorage.getItem(`vortex_chat_room_${user.id}`);
            if (savedRoomId) {
                setRoomId(savedRoomId);
                loadMessages(savedRoomId);
            } else {
                createRoom();
            }
        }
    }, [isOpen, user]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Subscribe to real-time updates
    useEffect(() => {
        if (!roomId) return;

        const channel = supabase
            .channel(`room-${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chat_messages',
                    filter: `room_id=eq.${roomId}`
                },
                (payload) => {
                    setMessages(prev => [...prev, payload.new as ChatMessage]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [roomId]);

    const createRoom = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('chat_rooms')
                .insert([{
                    customer_name: user.user_metadata?.full_name || user.email,
                    customer_email: user.email,
                    user_id: user.id,
                    status: 'active'
                }])
                .select()
                .single();

            if (error) throw error;
            if (data) {
                setRoomId(data.id);
                localStorage.setItem(`vortex_chat_room_${user.id}`, data.id);
                // Send initial greeting
                await sendMessage(data.id, "Welcome to Vortex Shipping Support. How can we help you with your package today?", 'admin');
            }
        } catch (err) {
            console.error("Error creating chat room:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMessages = async (id: string) => {
        const { data, error } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('room_id', id)
            .order('created_at', { ascending: true });

        if (!error && data) {
            setMessages(data);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !roomId) return;

        const content = inputValue.trim();
        setInputValue("");
        await sendMessage(roomId, content, 'customer');

        // Update room's last message
        await supabase
            .from('chat_rooms')
            .update({ last_message: content, updated_at: new Date().toISOString() })
            .eq('id', roomId);
    };

    const sendMessage = async (id: string, content: string, role: 'admin' | 'customer') => {
        const { error } = await supabase
            .from('chat_messages')
            .insert([{ room_id: id, content, sender_role: role }]);

        if (error) console.error("Error sending message:", error);
    };

    if (!user) return null;

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[70vh] sm:max-h-[600px] bg-white rounded-sm shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-sm border border-primary/20">
                                    <Headset size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="font-black text-xs uppercase tracking-widest">Customer Support</p>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
                                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Agents Online</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-sm transition-colors text-white/40 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50"
                        >
                            {isLoading ? (
                                <div className="h-full flex items-center justify-center">
                                    <Loader2 className="animate-spin text-primary" size={24} />
                                </div>
                            ) : (
                                messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.sender_role === 'customer' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] p-4 rounded-sm text-xs font-bold uppercase tracking-tight ${msg.sender_role === 'customer'
                                            ? 'bg-primary text-white shadow-md'
                                            : 'bg-white text-slate-500 border border-slate-200 shadow-sm'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={handleSendMessage}
                            className="p-4 border-t border-slate-100 bg-white flex gap-2"
                        >
                            <input
                                type="text"
                                placeholder="TYPE YOUR MESSAGE..."
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-sm py-3 px-4 text-[10px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:border-primary transition-all placeholder:text-slate-300 outline-none"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="p-3 bg-slate-900 text-white rounded-sm hover:bg-primary transition-all shadow-md"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-sm shadow-2xl flex items-center justify-center transition-all border ${isOpen ? 'bg-slate-900 text-white rotate-90 border-slate-900' : 'bg-white text-primary border-slate-200 shadow-xl'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
}
