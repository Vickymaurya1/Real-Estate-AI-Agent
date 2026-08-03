"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Mail, Phone, ChevronDown, ChevronUp, ArrowRight, Building2, Sparkles, CheckCircle2 } from "lucide-react";
import { useListingsContext } from "@/context/listings-context";
import { MarketplaceInquiry } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function PortalInquiriesPage() {
  const { inquiries, listings } = useListingsContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-accent" />
              <span>My Property Inquiries</span>
            </h2>
            <Badge className="bg-accent/15 text-accent border-none text-xs font-bold uppercase">
              Client Portal
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Review your sent property questions, AI assistant responses, and agency replies.
          </p>
        </div>

        <Link href="/portal">
          <Button size="sm" variant="outline" className="h-9 gap-1.5 rounded-xl text-xs font-semibold">
            <span>Browse Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <Card className="bg-card border-border p-12 text-center rounded-2xl">
            <MessageSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="text-base font-bold text-foreground">No inquiries submitted yet</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Have questions about a property? Visit any property listing and click "Ask a Question".
            </p>
          </Card>
        ) : (
          inquiries.map((inquiry) => {
            const isExpanded = expandedId === inquiry.id;
            const matchedListing = listings.find((l) => l.id === inquiry.listingId);

            return (
              <Card
                key={inquiry.id}
                className="bg-card border-border shadow-xs hover:shadow-md transition-all rounded-2xl overflow-hidden"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Property & Inquiry Info */}
                    <div className="flex items-center gap-4">
                      {matchedListing && (
                        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                          <img
                            src={matchedListing.image}
                            alt={matchedListing.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base text-foreground">
                            {inquiry.listingTitle}
                          </h3>

                          <Badge
                            className={`border-none text-[10px] font-bold ${
                              inquiry.status === "replied"
                                ? "bg-emerald-500 text-white"
                                : "bg-accent text-white"
                            }`}
                          >
                            {inquiry.status === "replied" ? "Replied ✓" : "Pending Response"}
                          </Badge>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Submitted on: {inquiry.createdAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/listing/${inquiry.listingId}`}>
                        <Button variant="outline" size="sm" className="h-9 text-xs font-semibold rounded-xl gap-1">
                          <span>View Listing</span>
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>

                      <Button
                        onClick={() => toggleExpand(inquiry.id)}
                        variant="secondary"
                        size="sm"
                        className="h-9 gap-1 text-xs font-semibold rounded-xl"
                      >
                        <span>{isExpanded ? "Hide Message" : "View Message & Reply"}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </Button>
                    </div>
                  </div>

                  {/* Expandable Thread Drawer */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-border/60 space-y-4 animate-in slide-in-from-top-2 duration-200 bg-muted/30 p-4 rounded-xl">
                      {/* Buyer Message */}
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-foreground">Your Original Message:</p>
                        <div className="p-3 rounded-xl bg-card border border-border/80 text-xs text-foreground">
                          "{inquiry.message}"
                        </div>
                      </div>

                      {/* Agency Reply Thread */}
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-accent" />
                          <span>Reply from Prestige Estates:</span>
                        </p>

                        {inquiry.replies.length === 0 ? (
                          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                            Our AI agent and human team are reviewing your inquiry. We typically respond within 15 minutes!
                          </div>
                        ) : (
                          inquiry.replies.map((reply) => (
                            <div key={reply.id} className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 space-y-1 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-primary">{reply.senderName}</span>
                                <span className="text-[10px] text-muted-foreground">{reply.createdAt}</span>
                              </div>
                              <p className="text-foreground leading-relaxed">{reply.message}</p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Agency Contact Card */}
                      <div className="p-3 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <p className="font-bold text-foreground">Need urgent assistance?</p>
                          <p className="text-muted-foreground text-[11px]">Speak directly with Prestige Estates Concierge</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-semibold">
                          <a href="tel:+919876543210" className="flex items-center gap-1 text-primary hover:underline">
                            <Phone className="w-3.5 h-3.5" />
                            +91 98765 43210
                          </a>
                          <a href="mailto:concierge@estatecall.ai" className="flex items-center gap-1 text-primary hover:underline">
                            <Mail className="w-3.5 h-3.5" />
                            Email Support
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
