import React from "react";
import { PlaceholderPage } from "@/components/ui/placeholder-page";
import { Globe } from "lucide-react";

export default function WebsitePage() {
  return (
    <PlaceholderPage
      title="Agency Public Website Builder"
      description="Manage agency custom domain, landing pages, branding, and featured property showcases."
      category="Tools"
      icon={Globe}
    />
  );
}
