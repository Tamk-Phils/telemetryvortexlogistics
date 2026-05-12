import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import BackToTop from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Vortex Shipping | Fast & Easy US Delivery",
    template: "%s | Vortex Shipping"
  },
  description: "The simplest way to ship and track your packages across America. Reliable delivery you can count on with Vortex Shipping.",
  keywords: ["package tracking", "vortex shipping", "shipping company", "us delivery", "send a box", "fast shipping"],
  authors: [{ name: "Vortex Team" }],
  creator: "Vortex Shipping",
  publisher: "Vortex Shipping Inc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vortex-shipping.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vortex Shipping | Fast & Easy US Delivery",
    description: "The simplest and most reliable way to ship and track your packages across America. Move your world with Vortex Shipping.",
    url: "https://vortex-shipping.com",
    siteName: "Vortex Shipping",
    images: [
      {
        url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Vortex Shipping Center",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vortex Shipping | Fast & Easy US Delivery",
    description: "The simplest and most reliable way to ship and track your packages across America. Move your world with Vortex Shipping.",
    images: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground shrink-0`}>
        <div className="min-h-screen flex flex-col relative overflow-x-hidden">
          {/* Subtle Light Glow Effect */}
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,112,243,0.02)_0%,transparent_50%)] pointer-events-none z-0" />
          
          <Header />
          <main className="flex-1 relative z-10">
            {children}
          </main>
          <Footer />
          <ChatWidget />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
