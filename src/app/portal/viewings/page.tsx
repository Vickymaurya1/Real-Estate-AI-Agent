"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RotateCw,
  Building2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useListingsContext } from "@/context/listings-context";
import { ClientViewing } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
];

export default function PortalViewingsPage() {
  const { viewings, rescheduleViewing } = useListingsContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Form states per viewing
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleToggleExpand = (viewing: ClientViewing) => {
    if (expandedId === viewing.id) {
      setExpandedId(null);
    } else {
      setExpandedId(viewing.id);
      setSelectedDate(viewing.date);
      setSelectedTime(viewing.time);
    }
  };

  const handleReschedule = async (id: string) => {
    if (!selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    await rescheduleViewing(id, selectedDate, selectedTime);
    setIsSubmitting(false);
    setExpandedId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              <span>My Scheduled Viewings</span>
            </h2>
            <Badge className="bg-primary/15 text-primary border-none text-xs font-bold uppercase">
              Client Portal
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Track your property walkthroughs, manage appointment dates, or request a reschedule.
          </p>
        </div>

        <Link href="/portal">
          <Button size="sm" variant="outline" className="h-9 gap-1.5 rounded-xl text-xs font-semibold">
            <span>Browse More Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {viewings.length === 0 ? (
          <Card className="bg-card border-border p-12 text-center rounded-2xl">
            <Eye className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="text-base font-bold text-foreground">No viewing appointments yet</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Browse available listings and click "Book a Viewing" to schedule your first tour.
            </p>
            <Link href="/portal">
              <Button size="sm" className="mt-4 text-xs font-semibold gap-1.5">
                Browse Properties
              </Button>
            </Link>
          </Card>
        ) : (
          viewings.map((viewing) => {
            const isExpanded = expandedId === viewing.id;

            return (
              <Card
                key={viewing.id}
                className="bg-card border-border shadow-xs hover:shadow-md transition-all rounded-2xl overflow-hidden"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Image & Title */}
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
                        <img
                          src={viewing.listingImage}
                          alt={viewing.listingTitle}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base text-foreground leading-snug">
                            {viewing.listingTitle}
                          </h3>

                          {/* Status Pill */}
                          <Badge
                            className={`border-none text-[10px] font-bold gap-1 ${
                              viewing.status === "Confirmed"
                                ? "bg-emerald-500 text-white"
                                : viewing.status === "Pending"
                                ? "bg-amber-500 text-white"
                                : "bg-rose-500 text-white"
                            }`}
                          >
                            {viewing.status === "Confirmed" && <CheckCircle2 className="w-3 h-3" />}
                            {viewing.status === "Pending" && <AlertCircle className="w-3 h-3" />}
                            {viewing.status === "Cancelled" && <XCircle className="w-3 h-3" />}
                            {viewing.status}
                          </Badge>

                          {viewing.paid && (
                            <Badge variant="outline" className="border-emerald-500/40 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-[10px] font-bold">
                              Paid ✓
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground/70 shrink-0" />
                          <span className="truncate">{viewing.listingAddress}</span>
                        </p>

                        <div className="flex items-center gap-4 text-xs font-semibold text-primary pt-0.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {viewing.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {viewing.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expand / Reschedule Toggle Button */}
                    <div className="shrink-0 flex items-center gap-2">
                      <Link href={`/listing/${viewing.listingId}`}>
                        <Button variant="outline" size="sm" className="h-9 text-xs font-semibold rounded-xl">
                          View Listing
                        </Button>
                      </Link>

                      <Button
                        onClick={() => handleToggleExpand(viewing)}
                        variant="secondary"
                        size="sm"
                        className="h-9 gap-1.5 text-xs font-semibold rounded-xl"
                      >
                        <span>{isExpanded ? "Close Panel" : "Reschedule"}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </Button>
                    </div>
                  </div>

                  {/* Expandable Reschedule Panel */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-border/60 space-y-4 animate-in slide-in-from-top-2 duration-200 bg-muted/30 p-4 rounded-xl">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-foreground">Choose a new date & time</h4>
                        <p className="text-[11px] text-muted-foreground">
                          Status resets to Pending — the agency will re-approve your new time slot.
                        </p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Date Picker */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground">Select New Date</label>
                          <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="h-9 text-xs rounded-xl bg-card border-border"
                          />
                        </div>

                        {/* Selected Time Display */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground">Selected Time Slot</label>
                          <div className="h-9 px-3 rounded-xl bg-card border border-border flex items-center justify-between text-xs font-bold text-primary">
                            <span>{selectedTime || "Select a time below"}</span>
                            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                        </div>
                      </div>

                      {/* Time Slots Grid */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">Available Time Slots (30-min increments)</label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-1.5">
                          {TIME_SLOTS.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg border transition-all ${
                                selectedTime === slot
                                  ? "bg-primary text-white border-primary shadow-xs"
                                  : "bg-card text-foreground border-border hover:bg-muted"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Panel Action Buttons */}
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedId(null)}
                          className="h-8 text-xs font-semibold rounded-xl"
                        >
                          Discard
                        </Button>
                        <Button
                          onClick={() => handleReschedule(viewing.id)}
                          disabled={isSubmitting || !selectedDate || !selectedTime}
                          size="sm"
                          className="h-8 gap-1.5 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary/90"
                        >
                          {isSubmitting && <RotateCw className="w-3.5 h-3.5 animate-spin" />}
                          <span>{isSubmitting ? "Rescheduling..." : "Reschedule Viewing"}</span>
                        </Button>
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
