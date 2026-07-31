import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import BackToTop from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "SwiftLink Shipping | Global Freight & Package Tracking",
    template: "%s | SwiftLink Shipping"
  },
  description: "Global logistics, express air transit, ocean freight, and real-time package tracking. Fast, secure delivery with SwiftLink Shipping.",
  keywords: ["package tracking", "swiftlink shipping", "swiftlink", "shipping company", "express delivery", "global freight", "cargo tracking"],
  authors: [{ name: "SwiftLink Shipping Team" }],
  creator: "SwiftLink Shipping",
  publisher: "SwiftLink Shipping Logistics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://swiftlinkshipping.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SwiftLink Shipping | Global Freight & Package Tracking",
    description: "Global logistics, express air transit, ocean freight, and real-time package tracking. Fast, secure delivery with SwiftLink Shipping.",
    url: "https://swiftlinkshipping.com",
    siteName: "SwiftLink Shipping Logistics",
    images: [
      {
        url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "SwiftLink Shipping Logistics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SwiftLink Shipping | Global Freight & Package Tracking",
    description: "Global logistics, express air transit, ocean freight, and real-time package tracking with SwiftLink Shipping.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LogisticsService",
  "name": "SwiftLink Shipping Logistics",
  "url": "https://swiftlinkshipping.com",
  "logo": "https://swiftlinkshipping.com/favicon.ico",
  "description": "Global freight forwarding, air transit, and real-time package tracking portal.",
  "email": "support@swiftlinkshipping.com",
  "sameAs": [
    "https://swiftlinkshipping.com"
  ],
  "areaServed": "Worldwide"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
