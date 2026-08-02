import React from "react";
import { PlaceholderPage } from "@/components/ui/placeholder-page";
import { Home } from "lucide-react";

export default function PortalBrowsePage() {
  return (
    <PlaceholderPage
      title="Browse Properties & Featured Listings"
      description="Explore available luxury residences, schedule viewing appointments directly, or talk to AI concierge."
      category="Client Portal"
      icon={Home}
    />
  );
}
