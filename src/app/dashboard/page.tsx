"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  PhoneCall,
  Eye,
  Percent,
  Clock,
  RotateCw,
  ArrowRight,
  Bed,
  Bath,
  Maximize2,
  Sparkles,
  Phone,
  CalendarCheck,
  UserCheck,
  Building,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useListingsContext } from "@/context/listings-context";
import { mockTrendData, mockDashboardStats } from "@/lib/mock-data";

export default function OverviewPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { listings, stats: listingStats } = useListingsContext();

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.info("Refreshing dashboard metrics...");

    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dashboard metrics synced with live store!");
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Greeting Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Good morning, {mockDashboardStats.agencyName}
            </h2>
            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 gap-1.5 px-2.5 py-0.5 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{mockDashboardStats.activeAgentsCount} agents live</span>
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Here is your agency's real-time AI performance and conversation analytics overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-9 gap-2 rounded-xl border-border bg-card text-xs font-semibold text-foreground hover:bg-muted"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-accent" : ""}`} />
            <span>Refresh Data</span>
          </Button>

          <Link href="/dashboard/ai-agents">
            <Button size="sm" className="h-9 gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Settings</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Row of 5 Stat Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Active Listings"
          value={listingStats.activeListingsCount}
          change={`${listingStats.totalCount} total`}
          trend="up"
          description="Available inventory"
          icon={Building2}
          iconBg="bg-primary/10 text-primary"
        />
        <StatCard
          title="Total Conversations"
          value={mockDashboardStats.totalConversations.toLocaleString()}
          change="+18.4%"
          trend="up"
          description="Voice & web chats"
          icon={PhoneCall}
          iconBg="bg-accent/10 text-accent"
        />
        <StatCard
          title="Viewings Booked"
          value={mockDashboardStats.viewingsBooked}
          change="+12.5%"
          trend="up"
          description="32 upcoming"
          icon={Eye}
          iconBg="bg-emerald-500/10 text-emerald-600"
        />
        <StatCard
          title="Conversion Rate"
          value={`${mockDashboardStats.conversionRate}%`}
          change="+3.2%"
          trend="up"
          description="Lead to viewing ratio"
          icon={Percent}
          iconBg="bg-amber-500/10 text-amber-600"
        />
        <StatCard
          title="Avg. Call Duration"
          value={mockDashboardStats.avgCallDuration}
          change="-12s"
          trend="neutral"
          description="Efficient AI resolution"
          icon={Clock}
          iconBg="bg-indigo-500/10 text-indigo-600"
        />
      </div>

      {/* 3. Two-Column Section: 14-Day Trend Chart + Today's Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Recharts Line Chart (2 Cols) */}
        <Card className="lg:col-span-2 bg-card border-border shadow-xs rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-border/60 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-foreground">
                  Conversation Trend
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-0.5">
                  Daily AI voice calls and scheduled viewings over the last 14 days
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs border-border text-muted-foreground font-medium">
                Last 14 Days
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.6} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "0.75rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      fontSize: "12px",
                      color: "var(--foreground)",
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: 15, fontSize: 12 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="calls"
                    name="AI Calls"
                    stroke="#7a1f2b"
                    strokeWidth={2.5}
                    dot={{ fill: "#7a1f2b", r: 3 }}
                    activeDot={{ r: 6, stroke: "#7a1f2b", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="viewings"
                    name="Viewings Booked"
                    stroke="#e04832"
                    strokeWidth={2.5}
                    dot={{ fill: "#e04832", r: 3 }}
                    activeDot={{ r: 6, stroke: "#e04832", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Today's Activity Card (1 Col) */}
        <Card className="bg-card border-border shadow-xs rounded-2xl overflow-hidden flex flex-col justify-between">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold text-foreground">
              Today's Activity
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Live operational metrics for {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4 flex-1">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Today's Calls</p>
                  <p className="text-[11px] text-muted-foreground">Inbound & automated</p>
                </div>
              </div>
              <span className="text-base font-bold text-foreground">
                {mockDashboardStats.todaysActivity.todaysCalls}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">This Week</p>
                  <p className="text-[11px] text-muted-foreground">Total call volume</p>
                </div>
              </div>
              <span className="text-base font-bold text-foreground">
                {mockDashboardStats.todaysActivity.thisWeekCalls}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Callbacks Requested</p>
                  <p className="text-[11px] text-muted-foreground">Pending agent action</p>
                </div>
              </div>
              <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300 border-none font-bold text-xs">
                {mockDashboardStats.todaysActivity.callbacksRequested}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Active Agents</p>
                  <p className="text-[11px] text-muted-foreground">Voice instances live</p>
                </div>
              </div>
              <span className="text-base font-bold text-foreground">
                {mockDashboardStats.todaysActivity.activeAgents}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Available Listings</p>
                  <p className="text-[11px] text-muted-foreground">Synchronized inventory</p>
                </div>
              </div>
              <span className="text-base font-bold text-foreground">
                {listingStats.availableCount}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Property Listings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <span>Property Listings</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-xs font-bold">
                {listingStats.availableCount} available
              </Badge>
            </h3>
            <p className="text-xs text-muted-foreground">
              Featured property inventory available for AI voice bookings and client inquiries.
            </p>
          </div>

          <Link href="/dashboard/listings">
            <Button variant="ghost" size="sm" className="text-xs font-semibold text-primary hover:bg-primary/10 gap-1.5">
              <span>Manage Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {listings.slice(0, 4).map((listing) => (
            <Card
              key={listing.id}
              className="group bg-card border-border/80 shadow-xs hover:shadow-md transition-all duration-200 rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Image with Badges */}
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    {listing.featured && (
                      <Badge className="bg-accent text-white border-none text-[10px] font-extrabold uppercase shadow-xs">
                        Featured
                      </Badge>
                    )}
                    <Badge
                      className={`border-none text-[10px] font-bold ${
                        listing.status === "Available"
                          ? "bg-emerald-500 text-white"
                          : listing.status === "Pending"
                          ? "bg-amber-500 text-white"
                          : listing.status === "Rented"
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {listing.status}
                    </Badge>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5">
                    <Badge className="bg-background/90 text-foreground backdrop-blur-md border-border text-[11px] font-bold">
                      {listing.propertyType}
                    </Badge>
                  </div>
                </div>

                {/* Content Details */}
                <CardContent className="p-4 space-y-2.5">
                  <div>
                    <h4 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {listing.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {listing.address}, {listing.city}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-base font-extrabold text-primary">
                      {listing.formattedPrice}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {listing.priceDisplay}
                    </span>
                  </div>

                  {/* Bed / Bath / Sqft Specs */}
                  <div className="grid grid-cols-3 gap-1 pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-primary/70" />
                      <span>{listing.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-primary/70" />
                      <span>{listing.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-primary/70" />
                      <span>{listing.sqft} sqft</span>
                    </div>
                  </div>
                </CardContent>
              </div>

              {/* Card Footer Button */}
              <div className="p-4 pt-0">
                <Link href={`/listing/${listing.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-8 text-xs font-semibold border-border hover:border-primary hover:bg-primary/10 hover:text-primary transition-all gap-1 rounded-xl"
                  >
                    <span>View Listing Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
