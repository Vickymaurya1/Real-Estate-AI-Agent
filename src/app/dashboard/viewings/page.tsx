import React from "react";
import { PlaceholderPage } from "@/components/ui/placeholder-page";
import { Eye } from "lucide-react";

export default function ViewingsPage() {
  return (
    <PlaceholderPage
      title="Viewing Appointments"
      description="Track property viewings, agent assignments, client confirmations, and automated SMS reminders."
      category="Operations"
      icon={Eye}
    />
  );
}
