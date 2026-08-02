"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Building,
  Store,
  PhoneCall,
  Eye,
  Calendar,
  Users,
  Bot,
  Wrench,
  BookOpen,
  Code2,
  Globe,
  CreditCard,
  Bell,
  LogOut,
  ChevronDown,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Home,
  CheckSquare,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

// Agency Dashboard Nav Groups
const agencyNavGroups: NavGroup[] = [
  {
    title: "OPERATIONS",
    items: [
      { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      { label: "Listings", href: "/dashboard/listings", icon: Building, badge: "12" },
      { label: "Marketplace", href: "/dashboard/marketplace", icon: Store },
      { label: "Call Log", href: "/dashboard/call-log", icon: PhoneCall, badge: "LIVE" },
      { label: "Viewings", href: "/dashboard/viewings", icon: Eye },
      { label: "Schedule", href: "/dashboard/schedule", icon: Calendar },
      { label: "Clients", href: "/dashboard/clients", icon: Users },
    ],
  },
  {
    title: "TOOLS",
    items: [
      { label: "AI Agents", href: "/dashboard/ai-agents", icon: Bot, badge: "AI" },
      { label: "Services", href: "/dashboard/services", icon: Wrench },
      { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen },
      { label: "Widget", href: "/dashboard/widget", icon: Code2 },
      { label: "Website", href: "/dashboard/website", icon: Globe },
    ],
  },
];

// Client Portal Nav Group
const portalNavGroup: NavGroup = {
  title: "PORTAL NAVIGATION",
  items: [
    { label: "Browse Properties", href: "/portal", icon: Home },
    { label: "My Viewings", href: "/portal/viewings", icon: Eye },
    { label: "My Reservations", href: "/portal/reservations", icon: CheckSquare },
    { label: "My Inquiries", href: "/portal/inquiries", icon: MessageSquare },
    { label: "Support", href: "/portal/support", icon: HelpCircle },
  ],
};

interface SidebarNavProps {
  mode?: "agency" | "portal";
}

export function SidebarNav({ mode = "agency" }: SidebarNavProps) {
  const pathname = usePathname();
  const isAgency = mode === "agency";

  const isLinkActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    if (href === "/portal") {
      return pathname === "/portal";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r transition-colors duration-200",
        isAgency
          ? "bg-sidebar border-sidebar-border text-sidebar-foreground"
          : "bg-card border-border text-foreground shadow-xs"
      )}
    >
      {/* 1. Header & Logo */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
        <Link href={isAgency ? "/dashboard" : "/portal"} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white font-bold shadow-md shadow-accent/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className={cn("text-base font-extrabold tracking-tight leading-none", isAgency ? "text-white" : "text-primary")}>
              EstateCall
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-accent uppercase mt-0.5">
              AI PLATFORM
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Org Switcher Chip (Agency Mode) */}
      {isAgency && (
        <div className="px-4 py-3">
          <button className="flex w-full items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white/90 hover:bg-white/15 transition-all">
            <div className="flex items-center gap-2 truncate">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="truncate font-semibold">Prestige Estates</span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </button>
        </div>
      )}

      {/* 3. Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6 custom-scrollbar">
        {isAgency ? (
          agencyNavGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <p className="px-3 text-[11px] font-bold tracking-wider text-white/40 uppercase">
                {group.title}
              </p>
              <div className="space-y-0.5 mt-1">
                {group.items.map((item) => {
                  const active = isLinkActive(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150",
                        active
                          ? "bg-accent text-white font-semibold shadow-sm"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={cn("h-4 w-4 transition-transform duration-150 group-hover:scale-110", active ? "text-white" : "text-white/60 group-hover:text-white")} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "h-4 px-1.5 text-[9px] font-extrabold rounded-full border-none",
                            active
                              ? "bg-white text-accent"
                              : item.badge === "LIVE"
                              ? "bg-rose-500 text-white animate-pulse"
                              : "bg-white/20 text-white"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              {portalNavGroup.title}
            </p>
            <div className="space-y-0.5 mt-1">
              {portalNavGroup.items.map((item) => {
                const active = isLinkActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150",
                      active
                        ? "bg-primary text-white font-semibold shadow-sm"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={cn("h-4 w-4 transition-transform duration-150 group-hover:scale-110", active ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Pinned Section */}
      <div className={cn("border-t p-3", isAgency ? "border-white/10" : "border-border")}>
        {isAgency ? (
          <div className="space-y-0.5">
            <p className="px-3 text-[11px] font-bold tracking-wider text-white/40 uppercase mb-1">
              ACCOUNT
            </p>
            <Link
              href="/dashboard/plan"
              className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="h-4 w-4 text-white/60" />
                <span>Plan & Billing</span>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-none text-[9px]">Pro</Badge>
            </Link>

            <Link
              href="/dashboard/notifications"
              className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Bell className="h-4 w-4 text-white/60" />
                <span>Notifications</span>
              </div>
              <span className="h-2 w-2 rounded-full bg-accent" />
            </Link>

            <button
              onClick={() => alert("Signing out...")}
              className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition-all text-left mt-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <Link
            href="/dashboard"
            className="flex items-center justify-between rounded-xl bg-primary/10 p-3 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all group"
          >
            <span>Switch to Agent Dashboard</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </aside>
  );
}
