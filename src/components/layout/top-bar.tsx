"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Building2,
  Sparkles,
  PhoneCall,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopBarProps {
  title?: string;
  subtitle?: string;
  isPortal?: boolean;
}

export function TopBar({ title, subtitle, isPortal = false }: TopBarProps) {
  const pathname = usePathname();

  // Auto-generate title if not explicitly provided
  const getPageTitle = () => {
    if (title) return { title, subtitle };

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0 || pathname === "/dashboard") {
      return { title: "Overview", subtitle: "Agency performance & live metrics" };
    }

    const last = segments[segments.length - 1];
    const formatted = last
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    if (pathname.startsWith("/portal")) {
      return { title: formatted || "Client Portal", subtitle: "Manage your viewings & property inquiries" };
    }

    return { title: formatted, subtitle: `Manage ${formatted.toLowerCase()} and agency workflows` };
  };

  const pageMeta = getPageTitle();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/80 bg-background/80 px-6 backdrop-blur-md">
      {/* Title & Subtitle */}
      <div className="flex flex-col">
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          {pageMeta.title}
        </h1>
        {pageMeta.subtitle && (
          <p className="text-xs text-muted-foreground hidden sm:block">
            {pageMeta.subtitle}
          </p>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Switch Portal / Dashboard Pill Button */}
        {isPortal ? (
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 rounded-full border-primary/20 bg-primary/10 text-primary text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Agency Dashboard</span>
            </Button>
          </Link>
        ) : (
          <Link href="/portal">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 rounded-full border-accent/30 bg-accent/10 text-accent text-xs font-semibold hover:bg-accent hover:text-white transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Portal</span>
            </Button>
          </Link>
        )}

        {/* Search Bar with ⌘K */}
        <div className="relative hidden md:flex items-center w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search anything..."
            className="h-8 w-full pl-8 pr-12 text-xs rounded-lg bg-card/60 border-border focus-visible:ring-primary"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        {/* Notification Bell Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-8 w-8 rounded-full flex items-center justify-center text-foreground/80 hover:bg-muted hover:text-foreground transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent animate-pulse" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-xl border-border bg-card shadow-lg p-0 overflow-hidden">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-semibold px-4 py-3 border-b border-border flex items-center justify-between">
                <span className="text-xs text-foreground font-bold">Notifications</span>
                <Badge className="bg-accent/15 text-accent border-none text-[10px]">3 New</Badge>
              </DropdownMenuLabel>
              <div className="divide-y divide-border/60 max-h-72 overflow-y-auto">
                <DropdownMenuItem className="p-3 focus:bg-muted cursor-pointer flex gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <p className="font-semibold text-foreground">New Viewing Scheduled</p>
                    <p className="text-muted-foreground text-[11px]">Sarah M. booked 42 Wallaby Way for tomorrow at 2 PM.</p>
                    <span className="text-[10px] text-muted-foreground/70">5m ago</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-3 focus:bg-muted cursor-pointer flex gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <p className="font-semibold text-foreground">AI Call Qualified Lead</p>
                    <p className="text-muted-foreground text-[11px]">Inbound call completed. Lead score: 92/100 (Pre-approved).</p>
                    <span className="text-[10px] text-muted-foreground/70">18m ago</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-3 focus:bg-muted cursor-pointer flex gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <p className="font-semibold text-foreground">Listing Syndicated</p>
                    <p className="text-muted-foreground text-[11px]">Penthouse #4B pushed to Marketplace & Portal.</p>
                    <span className="text-[10px] text-muted-foreground/70">1h ago</span>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 gap-2 rounded-full p-1 hover:bg-muted flex items-center border border-transparent hover:border-border transition-colors">
            <Avatar className="h-7 w-7 border border-primary/20">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="User" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                VM
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-semibold text-foreground hidden sm:inline-block">
              Vicky M.
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-border bg-card shadow-lg">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none text-foreground">
                    Vicky Maurya
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    vicky@estatecall.ai
                  </p>
                  <Badge className="w-fit mt-1.5 bg-accent/15 text-accent border-none text-[10px] font-bold uppercase">
                    Agency Admin
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="gap-2 text-xs cursor-pointer focus:bg-muted">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Profile & Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-xs cursor-pointer focus:bg-muted">
                <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Agency Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="gap-2 text-xs text-rose-600 focus:bg-rose-50 focus:text-rose-700 dark:focus:bg-rose-950/40 cursor-pointer">
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
