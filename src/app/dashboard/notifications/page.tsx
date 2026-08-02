import React from "react";
import { PlaceholderPage } from "@/components/ui/placeholder-page";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <PlaceholderPage
      title="Agency Notifications & Alerts"
      description="Configure real-time SMS, WhatsApp, and Slack alerts for hot leads and urgent viewing requests."
      category="System"
      icon={Bell}
    />
  );
}
