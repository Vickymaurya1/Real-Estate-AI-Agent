"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Store,
  Eye,
  MessageSquare,
  CheckSquare,
  DollarSign,
  Building2,
  ArrowRight,
  Send,
  CheckCircle2,
  Clock,
  User,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { useListingsContext } from "@/context/listings-context";
import { MarketplaceInquiry } from "@/lib/mock-data";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function MarketplacePage() {
  const { listings, inquiries, reservations, stats, addInquiryReply } = useListingsContext();

  // Reply Dialog State
  const [selectedInquiry, setSelectedInquiry] = useState<MarketplaceInquiry | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleOpenReply = (inquiry: MarketplaceInquiry) => {
    setSelectedInquiry(inquiry);
    setReplyText("");
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !replyText.trim()) return;

    addInquiryReply(selectedInquiry.id, replyText);
    setSelectedInquiry(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Store className="w-5 h-5 text-accent" />
              <span>Property Marketplace</span>
            </h2>
            <Badge className="bg-accent/15 text-accent border-none text-xs font-bold uppercase">
              Syndicated Hub
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time public property listing syndicate, direct client buyer inquiries, and viewing reservations.
          </p>
        </div>

        <Link href="/portal">
          <Button size="sm" variant="outline" className="h-9 gap-1.5 rounded-xl border-accent/30 text-accent hover:bg-accent hover:text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>View Public Portal</span>
          </Button>
        </Link>
      </div>

      {/* 2. 5-Card Stat Row */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Views 30D"
          value="24.5k"
          change="+34.2%"
          trend="up"
          description="Unique listing hits"
          icon={Eye}
          iconBg="bg-primary/10 text-primary"
        />
        <StatCard
          title="Total Inquiries"
          value={inquiries.length}
          change="+14 new"
          trend="up"
          description="Buyer lead messages"
          icon={MessageSquare}
          iconBg="bg-accent/10 text-accent"
        />
        <StatCard
          title="Reservations"
          value={reservations.length}
          change="12 active"
          trend="up"
          description="Viewing & hold deposits"
          icon={CheckSquare}
          iconBg="bg-emerald-500/10 text-emerald-600"
        />
        <StatCard
          title="Deposits Earned"
          value="$45,000"
          change="+$15k this wk"
          trend="up"
          description="Escrow & reservation holds"
          icon={DollarSign}
          iconBg="bg-amber-500/10 text-amber-600"
        />
        <StatCard
          title="Live Listings"
          value={stats.availableCount}
          change={`${stats.totalCount} total`}
          trend="neutral"
          description="Synchronized properties"
          icon={Building2}
          iconBg="bg-indigo-500/10 text-indigo-600"
        />
      </div>

      {/* 3. Live on Marketplace Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <span>Live Marketplace Listings</span>
              <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-none text-xs font-bold">
                {stats.availableCount} Active
              </Badge>
            </h3>
            <p className="text-xs text-muted-foreground">
              Properties synchronized live across the public client portal and search portals.
            </p>
          </div>

          <Link href="/dashboard/listings">
            <Button variant="ghost" size="sm" className="text-xs font-semibold text-primary hover:bg-primary/10 gap-1">
              <span>Manage Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((listing) => (
            <Card
              key={listing.id}
              className="bg-card border-border/80 shadow-xs hover:shadow-md transition-all rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 w-full overflow-hidden bg-muted">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <Badge
                      className={`border-none text-[9px] font-extrabold uppercase ${
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
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-background/90 text-foreground backdrop-blur-md border-border text-[10px] font-bold">
                      {listing.propertyType}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-3.5 space-y-1.5">
                  <h4 className="font-bold text-xs text-foreground truncate">
                    {listing.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {listing.address}, {listing.city}
                  </p>
                  <p className="text-sm font-extrabold text-primary pt-1">
                    {listing.formattedPrice}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. Two-Tab Panel: Inquiries & Reservations */}
      <Card className="bg-card border-border shadow-xs rounded-2xl overflow-hidden">
        <Tabs defaultValue="inquiries" className="w-full">
          <CardHeader className="border-b border-border/60 pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold text-foreground">
                  Marketplace Activity
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Direct client inquiries and viewing/hold reservations.
                </CardDescription>
              </div>

              <TabsList className="bg-muted p-1 rounded-xl h-9">
                <TabsTrigger value="inquiries" className="text-xs font-semibold rounded-lg px-4">
                  Inquiries ({inquiries.length})
                </TabsTrigger>
                <TabsTrigger value="reservations" className="text-xs font-semibold rounded-lg px-4">
                  Reservations ({reservations.length})
                </TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>

          {/* TAB 1: INQUIRIES */}
          <TabsContent value="inquiries" className="p-0 m-0">
            <div className="divide-y divide-border/60">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-foreground">{inquiry.buyerName}</span>
                      <Badge
                        className={`border-none text-[10px] font-bold ${
                          inquiry.status === "new"
                            ? "bg-accent text-white"
                            : "bg-emerald-500 text-white"
                        }`}
                      >
                        {inquiry.status === "new" ? "New Lead" : "Replied"}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-semibold">
                        re: <span className="text-primary font-bold">{inquiry.listingTitle}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground/70" />
                        {inquiry.buyerEmail}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground/70" />
                        {inquiry.buyerPhone}
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground/70" />
                        {inquiry.createdAt}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-muted/50 border border-border/50 text-xs text-foreground mt-2">
                      "{inquiry.message}"
                    </div>

                    {/* Replies Thread */}
                    {inquiry.replies.length > 0 && (
                      <div className="pl-4 border-l-2 border-primary/30 space-y-2 mt-2">
                        {inquiry.replies.map((rep) => (
                          <div key={rep.id} className="text-xs space-y-0.5">
                            <span className="font-bold text-primary">{rep.senderName}</span>
                            <span className="text-[10px] text-muted-foreground ml-2">{rep.createdAt}</span>
                            <p className="text-muted-foreground">{rep.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0">
                    <Button
                      onClick={() => handleOpenReply(inquiry)}
                      size="sm"
                      className="h-8 gap-1.5 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary/90"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply to Buyer</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2: RESERVATIONS */}
          <TabsContent value="reservations" className="p-0 m-0">
            <div className="divide-y divide-border/60">
              {reservations.map((res) => (
                <div
                  key={res.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-foreground">{res.buyerName}</span>
                      <Badge
                        className={`border-none text-[10px] font-bold ${
                          res.status === "Confirmed"
                            ? "bg-emerald-500 text-white"
                            : res.status === "Pending Deposit"
                            ? "bg-amber-500 text-white"
                            : "bg-rose-500 text-white"
                        }`}
                      >
                        {res.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-semibold">
                        Property: <span className="text-primary font-bold">{res.listingTitle}</span> ({res.listingPrice})
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground/70" />
                        {res.buyerEmail}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground/70" />
                        {res.buyerPhone}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-foreground">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        Reserved Date: {res.reservedDate}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    <p className="text-sm font-bold text-foreground">
                      Hold Deposit: {res.depositAmount}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold ${
                        res.depositPaid
                          ? "border-emerald-500/40 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40"
                          : "border-amber-500/40 text-amber-700 bg-amber-50 dark:bg-amber-950/40"
                      }`}
                    >
                      {res.depositPaid ? "Deposit Received ✓" : "Pending Escrow Wire"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* 5. Reply Dialog */}
      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="max-w-lg rounded-2xl bg-card border-border p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Reply to Buyer Inquiry</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Send an instant response to {selectedInquiry?.buyerName} regarding "{selectedInquiry?.listingTitle}".
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSendReply} className="space-y-4 py-2 text-xs">
            <div className="p-3 rounded-xl bg-muted/50 border border-border/50 space-y-1">
              <p className="font-semibold text-foreground">Buyer Message:</p>
              <p className="text-muted-foreground italic">"{selectedInquiry?.message}"</p>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">Your Reply Message *</label>
              <textarea
                rows={4}
                placeholder="Type your answer, offer viewing times, or attach brochure..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-3 text-xs focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedInquiry(null)}
                className="h-9 text-xs font-semibold rounded-xl"
              >
                Cancel
              </Button>
              <Button type="submit" className="h-9 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>Send Reply</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
