import React from "react";
import { PlaceholderPage } from "@/components/ui/placeholder-page";
import { Wrench } from "lucide-react";

export default function ServicesPage() {
  return (
    <PlaceholderPage
      title="Agency Services Integration"
      description="Connect telephony providers (Twilio/Retell), CRM tools, email gateways, and calendar APIs."
      category="Tools"
      icon={Wrench}
    />
  );
}
