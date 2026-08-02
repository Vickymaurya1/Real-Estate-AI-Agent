"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  Building2,
  Bed,
  Bath,
  Maximize2,
  Car,
  Calendar,
  Phone,
  Mail,
  Sparkles,
  ArrowLeft,
  Eye,
  MessageSquare,
  Mic,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  User,
} from "lucide-react";
import { useListingsContext } from "@/context/listings-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { VoiceWidget } from "@/components/ui/voice-widget";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ListingDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { listings, bookViewing, addInquiry } = useListingsContext();

  const listing = listings.find((l) => l.id === id) || listings[0];

  // Gallery Active Image
  const [activeImage, setActiveImage] = useState(listing?.image || "");

  // Modal States
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);

  // Book Viewing Pre-filled Form
  const [bookForm, setBookForm] = useState({
    buyerName: "Elena Rostova",
    buyerEmail: "elena.r@example.com",
    date: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0], // 3 days from now
    time: "10:30 AM",
  });

  // Ask Question Pre-filled Form
  const [askForm, setAskForm] = useState({
    buyerName: "Elena Rostova",
    buyerEmail: "elena.r@example.com",
    buyerPhone: "+1 (555) 234-5678",
    message: `Hi, I am interested in ${listing?.title || "this property"}. Could you share the floor plan and HOA rules?`,
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listing) return;

    bookViewing(
      listing.id,
      listing.title,
      listing.image,
      `${listing.address}, ${listing.city}, ${listing.state}`,
      bookForm.buyerName,
      bookForm.buyerEmail,
      bookForm.date,
      bookForm.time
    );

    setIsBookModalOpen(false);
    toast.success("Viewing booked! Redirecting to My Viewings...");
    setTimeout(() => router.push("/portal/viewings"), 600);
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listing) return;

    addInquiry(
      listing.id,
      listing.title,
      askForm.buyerName,
      askForm.buyerEmail,
      askForm.buyerPhone,
      askForm.message
    );

    setIsAskModalOpen(false);
  };

  if (!listing) {
    return (
      <div className="min-h-screen bg-background p-12 text-center">
        <h2 className="text-xl font-bold text-foreground">Listing not found</h2>
        <Link href="/dashboard/listings">
          <Button className="mt-4">Back to Listings</Button>
        </Link>
      </div>
    );
  }

  // Thumbnail Gallery Images (Use primary image + fallback architecture photos)
  const galleryImages = [
    listing.image,
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/80 px-6 py-3.5 flex items-center justify-between">
        <Link href="/dashboard/listings">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Badge className="bg-primary/10 text-primary border-none text-xs font-bold">
            {listing.status}
          </Badge>
          <Badge variant="outline" className="text-xs font-semibold">
            ID: #{listing.id}
          </Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in duration-300">
        {/* 1. Header Title & Price */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-accent text-white border-none text-[10px] font-extrabold uppercase">
                {listing.listingType}
              </Badge>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {listing.propertyType}
              </Badge>
              {listing.featured && (
                <Badge className="bg-amber-500 text-white border-none text-[10px] font-bold">
                  Featured★
                </Badge>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              {listing.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              {listing.address}, {listing.city}, {listing.state} {listing.zip}
            </p>
          </div>

          <div className="text-left md:text-right space-y-0.5">
            <p className="text-2xl md:text-3xl font-black text-primary">
              {listing.formattedPrice}
            </p>
            <p className="text-xs text-muted-foreground font-semibold">
              {listing.priceDisplay}
            </p>
          </div>
        </div>

        {/* 2. Photo Gallery & Thumbnail Strip */}
        <div className="space-y-3">
          <div className="relative h-96 md:h-[450px] w-full overflow-hidden rounded-2xl bg-muted border border-border shadow-sm">
            <img
              src={activeImage || listing.image}
              alt={listing.title}
              className="h-full w-full object-cover transition-all duration-300"
            />
            {listing.virtualTourUrl && (
              <a
                href={listing.virtualTourUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute top-4 right-4 bg-background/90 hover:bg-background text-foreground backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-primary" />
                <span>3D Virtual Tour</span>
              </a>
            )}
          </div>

          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative h-20 w-full overflow-hidden rounded-xl border-2 transition-all ${
                  (activeImage || listing.image) === img
                    ? "border-primary shadow-md ring-2 ring-primary/20"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Gallery ${idx}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* 3. Action Buttons & AI Hint Card */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left 2 Cols: Main Details & Specs */}
          <div className="md:col-span-2 space-y-6">
            {/* AI Agent Hint Banner */}
            <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border-primary/20 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-accent text-white font-bold shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-foreground">
                    24/7 Voice AI Agent Available
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Click the microphone icon at the bottom-right of your screen to speak live with Alexis (Residential Specialist) about this property.
                  </p>
                </div>
              </div>
            </Card>

            {/* Spec Boxes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <Card className="bg-card border-border p-3 text-center rounded-xl">
                <Bed className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-sm font-bold text-foreground">{listing.beds}</p>
                <p className="text-[10px] text-muted-foreground">Bedrooms</p>
              </Card>
              <Card className="bg-card border-border p-3 text-center rounded-xl">
                <Bath className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-sm font-bold text-foreground">{listing.baths}</p>
                <p className="text-[10px] text-muted-foreground">Bathrooms</p>
              </Card>
              <Card className="bg-card border-border p-3 text-center rounded-xl">
                <Maximize2 className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-sm font-bold text-foreground">{listing.sqft}</p>
                <p className="text-[10px] text-muted-foreground">Sq Ft Area</p>
              </Card>
              <Card className="bg-card border-border p-3 text-center rounded-xl">
                <Car className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-sm font-bold text-foreground">{listing.parking}</p>
                <p className="text-[10px] text-muted-foreground">Parking Slots</p>
              </Card>
              <Card className="bg-card border-border p-3 text-center rounded-xl col-span-2 sm:col-span-1">
                <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-sm font-bold text-foreground">{listing.yearBuilt}</p>
                <p className="text-[10px] text-muted-foreground">Year Built</p>
              </Card>
            </div>

            {/* About Property */}
            <Card className="bg-card border-border p-6 rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-foreground">About This Property</h3>
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </Card>
          </div>

          {/* Right 1 Col: Booking Summary & Agent Card */}
          <div className="space-y-6">
            {/* Primary Action Card */}
            <Card className="bg-card border-border p-6 rounded-2xl shadow-sm space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">Schedule a Viewing</h3>
                <p className="text-xs text-muted-foreground">
                  Book an in-person tour or talk to our instant voice assistant.
                </p>
              </div>

              <div className="space-y-2.5">
                <Button
                  onClick={() => setIsBookModalOpen(true)}
                  className="w-full h-10 gap-2 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>Book a Viewing</span>
                </Button>

                <Button
                  onClick={() => setIsAskModalOpen(true)}
                  variant="outline"
                  className="w-full h-10 gap-2 text-xs font-semibold rounded-xl border-border hover:bg-muted"
                >
                  <MessageSquare className="w-4 h-4 text-accent" />
                  <span>Ask a Question</span>
                </Button>
              </div>

              <div className="pt-2 border-t border-border/60 text-[11px] text-muted-foreground space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Instant Booking Confirmation</span>
                </div>
                <p>Scheduled viewings appear immediately under your Client Portal.</p>
              </div>
            </Card>

            {/* Listed By Agent Card */}
            <Card className="bg-card border-border p-6 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Listed By Agency
              </h4>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                  SJ
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{listing.agentName}</p>
                  <p className="text-xs text-muted-foreground">Prestige Estates Lead Agent</p>
                </div>
              </div>

              <div className="pt-2 space-y-2 text-xs">
                <a href="tel:+15550192831" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>+1 (555) 019-2831</span>
                </a>
                <a href="mailto:sarah@prestigeestates.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>sarah@prestigeestates.com</span>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Vapi Voice Widget */}
      <VoiceWidget listing={listing} />

      {/* Book Viewing Dialog */}
      <Dialog open={isBookModalOpen} onOpenChange={setIsBookModalOpen}>
        <DialogContent className="max-w-md rounded-2xl bg-card border-border p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Book a Property Viewing</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Schedule your walkthrough for "{listing.title}".
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookSubmit} className="space-y-3 py-2 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Your Name</label>
              <Input
                type="text"
                value={bookForm.buyerName}
                onChange={(e) => setBookForm({ ...bookForm, buyerName: e.target.value })}
                className="h-9 text-xs rounded-xl"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">Email Address</label>
              <Input
                type="email"
                value={bookForm.buyerEmail}
                onChange={(e) => setBookForm({ ...bookForm, buyerEmail: e.target.value })}
                className="h-9 text-xs rounded-xl"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Date</label>
                <Input
                  type="date"
                  value={bookForm.date}
                  onChange={(e) => setBookForm({ ...bookForm, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="h-9 text-xs rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Time Slot</label>
                <Input
                  type="text"
                  value={bookForm.time}
                  onChange={(e) => setBookForm({ ...bookForm, time: e.target.value })}
                  className="h-9 text-xs rounded-xl"
                  required
                />
              </div>
            </div>

            <DialogFooter className="pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsBookModalOpen(false)}
                className="h-9 text-xs font-semibold rounded-xl"
              >
                Cancel
              </Button>
              <Button type="submit" className="h-9 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary/90">
                Confirm & Book Viewing
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Ask Question Dialog */}
      <Dialog open={isAskModalOpen} onOpenChange={setIsAskModalOpen}>
        <DialogContent className="max-w-md rounded-2xl bg-card border-border p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Ask a Question</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Send your inquiry to Prestige Estates regarding "{listing.title}".
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAskSubmit} className="space-y-3 py-2 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Your Name</label>
              <Input
                type="text"
                value={askForm.buyerName}
                onChange={(e) => setAskForm({ ...askForm, buyerName: e.target.value })}
                className="h-9 text-xs rounded-xl"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Email</label>
                <Input
                  type="email"
                  value={askForm.buyerEmail}
                  onChange={(e) => setAskForm({ ...askForm, buyerEmail: e.target.value })}
                  className="h-9 text-xs rounded-xl"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Phone</label>
                <Input
                  type="tel"
                  value={askForm.buyerPhone}
                  onChange={(e) => setAskForm({ ...askForm, buyerPhone: e.target.value })}
                  className="h-9 text-xs rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">Message</label>
              <textarea
                rows={3}
                value={askForm.message}
                onChange={(e) => setAskForm({ ...askForm, message: e.target.value })}
                className="w-full rounded-xl border border-border bg-background p-2.5 text-xs focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <DialogFooter className="pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAskModalOpen(false)}
                className="h-9 text-xs font-semibold rounded-xl"
              >
                Cancel
              </Button>
              <Button type="submit" className="h-9 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary/90">
                Send Question
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
