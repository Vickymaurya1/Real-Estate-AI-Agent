import React from "react";
import { PlaceholderPage } from "@/components/ui/placeholder-page";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <PlaceholderPage
      title="Analytics & Reports"
      description="Deep operational insights into voice conversion, lead pipeline, and property viewing trends."
      category="Operations"
      icon={BarChart3}
    />
  );
}
