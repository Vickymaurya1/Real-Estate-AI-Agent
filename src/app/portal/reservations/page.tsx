"use client";

import React from "react";
import Link from "next/link";
import { CheckSquare, Calendar, DollarSign, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { useListingsContext } from "@/context/listings-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function PortalReservationsPage() {
  const { reservations } = useListingsContext();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" />
              <span>My Property Reservations</span>
            </h2>
            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-none text-xs font-bold uppercase">
              Client Portal
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Track hold deposits, escrow payment statuses, and reservation agreements.
          </p>
        </div>

        <Link href="/portal">
          <Button size="sm" variant="outline" className="h-9 gap-1.5 rounded-xl text-xs font-semibold">
            <span>Browse Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {reservations.length === 0 ? (
          <Card className="bg-card border-border p-12 text-center rounded-2xl">
            <CheckSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="text-base font-bold text-foreground">No active reservations</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              When you place a hold deposit on a property, your reservation status will appear here.
            </p>
          </Card>
        ) : (
          reservations.map((res) => (
            <Card
              key={res.id}
              className="bg-card border-border shadow-xs hover:shadow-md transition-all rounded-2xl overflow-hidden p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-base text-foreground">
                      {res.listingTitle}
                    </h3>
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
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Listing Price: <span className="font-bold text-primary">{res.listingPrice}</span>
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 font-semibold text-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      Reserved Date: {res.reservedDate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end justify-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-border/60">
                  <div className="text-left md:text-right">
                    <p className="text-xs text-muted-foreground">Escrow Hold Deposit</p>
                    <p className="text-lg font-extrabold text-foreground">{res.depositAmount}</p>
                  </div>

                  <Badge
                    variant="outline"
                    className={`w-fit text-[10px] font-bold gap-1 ${
                      res.depositPaid
                        ? "border-emerald-500/40 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40"
                        : "border-amber-500/40 text-amber-700 bg-amber-50 dark:bg-amber-950/40"
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>{res.depositPaid ? "Deposit Received ✓" : "Pending Escrow Wire"}</span>
                  </Badge>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
