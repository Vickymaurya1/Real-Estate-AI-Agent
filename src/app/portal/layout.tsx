import React from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopBar } from "@/components/layout/top-bar";
import { Toaster } from "sonner";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Lighter Client Portal Sidebar */}
      <SidebarNav mode="portal" />

      {/* Main Content Area */}
      <div className="pl-64 flex-1 flex flex-col min-h-screen">
        <TopBar isPortal={true} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}
