import React from "react";
import { PlaceholderPage } from "@/components/ui/placeholder-page";
import { Users } from "lucide-react";

export default function ClientsPage() {
  return (
    <PlaceholderPage
      title="Client Directory & CRM"
      description="Unified buyer, seller, and renter client profiles, interaction histories, and lead scores."
      category="Operations"
      icon={Users}
    />
  );
}
