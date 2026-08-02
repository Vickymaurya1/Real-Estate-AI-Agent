import React from "react";
import { PlaceholderPage } from "@/components/ui/placeholder-page";
import { CreditCard } from "lucide-react";

export default function PlanPage() {
  return (
    <PlaceholderPage
      title="Plan & Billing"
      description="Manage agency subscription tiers, voice AI usage minutes, and payment methods."
      category="System"
      icon={CreditCard}
    />
  );
}
