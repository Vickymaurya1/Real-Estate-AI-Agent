import React from "react";
import { PlaceholderPage } from "@/components/ui/placeholder-page";
import { PhoneCall } from "lucide-react";

export default function CallLogPage() {
  return (
    <PlaceholderPage
      title="Voice Call Log & Transcripts"
      description="Review real-time AI call recordings, sentiment analysis, audio playbacks, and lead qualification tags."
      category="Operations"
      icon={PhoneCall}
    />
  );
}
