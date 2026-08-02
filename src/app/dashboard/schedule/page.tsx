import React from "react";
import { PlaceholderPage } from "@/components/ui/placeholder-page";
import { Calendar } from "lucide-react";

export default function SchedulePage() {
  return (
    <PlaceholderPage
      title="Master Schedule & Calendar"
      description="Interactive calendar sync for agency staff, open house slots, and AI appointment booking windows."
      category="Operations"
      icon={Calendar}
    />
  );
}
