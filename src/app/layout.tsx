import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ListingsProvider } from "@/context/listings-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EstateCall — AI Real Estate Agent & Operations Platform",
  description: "Autonomous voice AI agents, automated viewing bookings, lead qualification & real estate CRM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen bg-background font-sans">
        <ListingsProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ListingsProvider>
      </body>
    </html>
  );
}
