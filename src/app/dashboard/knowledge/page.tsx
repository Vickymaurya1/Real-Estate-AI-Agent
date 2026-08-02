"use client";

import React, { useState } from "react";
import {
  BookOpen,
  MapPin,
  Building2,
  IndianRupee,
  Trees,
  CalendarCheck,
  Landmark,
  Save,
  RotateCw,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface KnowledgeSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  fields: { label: string; value: string; key: string }[];
}

export default function KnowledgeBasePage() {
  const [knowledgeData, setKnowledgeData] = useState<Record<string, string>>({
    // Project Overview
    projectName: "Riverdale Greens",
    developer: "Horizon Realty",
    projectType: "Integrated Township – Residential Apartments & Plots",
    reraStatus: "RERA Registered (Demo Project)",

    // Location
    location: "Sector 150, Noida",
    landmark: "Noida–Greater Noida Expressway",
    city: "Noida, Uttar Pradesh",
    pincode: "201310",

    // Unit Configurations & Pricing
    config2bhk: "2 BHK Apartments — ₹65–78 Lakhs",
    config3bhk: "3 BHK Apartments — ₹92 Lakhs – ₹1.2 Crore",
    config4bhk: "4 BHK Apartments — ₹1.45–1.8 Crore",
    configPlots: "Plots 120–200 sq yd — Starting from ₹55 Lakhs",
    priceNote: "All prices are indicative and subject to change. GST as applicable.",

    // Amenities & Facilities
    amenities:
      "Clubhouse, Swimming Pool, Gymnasium, Landscaped Gardens, 24×7 Security with CCTV, Children's Play Area, EV Charging Stations, Jogging & Cycling Track, Multi-purpose Sports Court, Yoga & Meditation Zone",

    // Possession & Registration
    possessionDate: "December 2027",
    bookingAmount: "₹2 Lakhs (refundable within 30 days)",
    paymentPlan: "Construction-Linked Plan available; Bank loan pre-approved by SBI, HDFC, ICICI",

    // Location Advantages
    expressway: "10 minutes from Noida Expressway",
    metro: "Walking distance to the upcoming Aqua Line Metro extension",
    school: "Near Delhi Public School, Noida",
    hospital: "Near Jaypee Hospital",
    delhiBorder: "25 minutes from Delhi border via Noida–Greater Noida Expressway",
    airport: "45 minutes from Indira Gandhi International Airport",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleFieldChange = (key: string, value: string) => {
    setKnowledgeData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save delay
    await new Promise((res) => setTimeout(res, 600));
    setIsSaving(false);
    toast.success("Knowledge base saved! Your AI agents will use these updated facts on the next call.");
  };

  const sections: KnowledgeSection[] = [
    {
      id: "overview",
      icon: <Building2 className="w-4 h-4 text-primary" />,
      title: "Project Overview",
      fields: [
        { label: "Project Name", value: knowledgeData.projectName, key: "projectName" },
        { label: "Developer", value: knowledgeData.developer, key: "developer" },
        { label: "Project Type", value: knowledgeData.projectType, key: "projectType" },
        { label: "RERA Status", value: knowledgeData.reraStatus, key: "reraStatus" },
      ],
    },
    {
      id: "location",
      icon: <MapPin className="w-4 h-4 text-accent" />,
      title: "Location Details",
      fields: [
        { label: "Sector / Address", value: knowledgeData.location, key: "location" },
        { label: "Nearest Landmark", value: knowledgeData.landmark, key: "landmark" },
        { label: "City & State", value: knowledgeData.city, key: "city" },
        { label: "Pin Code", value: knowledgeData.pincode, key: "pincode" },
      ],
    },
    {
      id: "pricing",
      icon: <IndianRupee className="w-4 h-4 text-emerald-600" />,
      title: "Unit Configurations & Pricing",
      fields: [
        { label: "2 BHK", value: knowledgeData.config2bhk, key: "config2bhk" },
        { label: "3 BHK", value: knowledgeData.config3bhk, key: "config3bhk" },
        { label: "4 BHK", value: knowledgeData.config4bhk, key: "config4bhk" },
        { label: "Plots", value: knowledgeData.configPlots, key: "configPlots" },
        { label: "Price Disclaimer", value: knowledgeData.priceNote, key: "priceNote" },
      ],
    },
    {
      id: "amenities",
      icon: <Trees className="w-4 h-4 text-emerald-600" />,
      title: "Amenities & Facilities",
      fields: [
        { label: "Full Amenities List", value: knowledgeData.amenities, key: "amenities" },
      ],
    },
    {
      id: "possession",
      icon: <CalendarCheck className="w-4 h-4 text-blue-600" />,
      title: "Possession & Registration",
      fields: [
        { label: "Expected Possession", value: knowledgeData.possessionDate, key: "possessionDate" },
        { label: "Booking Amount", value: knowledgeData.bookingAmount, key: "bookingAmount" },
        { label: "Payment Plans", value: knowledgeData.paymentPlan, key: "paymentPlan" },
      ],
    },
    {
      id: "advantages",
      icon: <Landmark className="w-4 h-4 text-primary" />,
      title: "Location Advantages",
      fields: [
        { label: "Expressway Access", value: knowledgeData.expressway, key: "expressway" },
        { label: "Metro Connectivity", value: knowledgeData.metro, key: "metro" },
        { label: "Nearest School", value: knowledgeData.school, key: "school" },
        { label: "Nearest Hospital", value: knowledgeData.hospital, key: "hospital" },
        { label: "Delhi Border", value: knowledgeData.delhiBorder, key: "delhiBorder" },
        { label: "Airport", value: knowledgeData.airport, key: "airport" },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Knowledge Base</span>
            </h2>
            <Badge className="bg-primary/15 text-primary border-none text-xs font-bold uppercase">
              AI Training Data
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Edit the facts your voice agents reference when answering buyer questions. Changes take effect on the next call.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          size="sm"
          className="h-9 gap-1.5 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary/90"
        >
          {isSaving ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>{isSaving ? "Saving..." : "Save Knowledge Base"}</span>
        </Button>
      </div>

      {/* Project Banner */}
      <Card className="bg-gradient-to-r from-primary/8 via-accent/8 to-primary/4 border-primary/20 p-5 rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-primary text-white shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-foreground">
              Active Project: {knowledgeData.projectName} by {knowledgeData.developer}
            </h4>
            <p className="text-[11px] text-muted-foreground">
              {knowledgeData.location} • Possession: {knowledgeData.possessionDate} • {knowledgeData.reraStatus}
            </p>
          </div>
        </div>
      </Card>

      {/* Editable Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.id} className="bg-card border-border shadow-xs rounded-2xl overflow-hidden">
            <CardHeader className="p-4 pb-2 border-b border-border/60">
              <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                {section.icon}
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              {section.fields.map((field) => (
                <div key={field.key} className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {field.label}
                  </label>
                  {field.key === "amenities" || field.key === "paymentPlan" ? (
                    <textarea
                      value={field.value}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground focus:ring-1 focus:ring-primary resize-none"
                    />
                  ) : (
                    <Input
                      type="text"
                      value={field.value}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      className="h-9 text-xs rounded-xl bg-background border-border"
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Save Button */}
      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl shadow-xs">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>All knowledge base edits are saved locally and synced to your AI agent&apos;s system prompt variables.</span>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          size="sm"
          className="h-9 gap-1.5 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary/90"
        >
          {isSaving ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>{isSaving ? "Saving..." : "Save Knowledge Base"}</span>
        </Button>
      </div>
    </div>
  );
}
