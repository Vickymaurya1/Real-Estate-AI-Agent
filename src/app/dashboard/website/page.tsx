"use client";

import React, { useState } from "react";
import {
  Globe,
  CheckCircle2,
  Save,
  RotateCw,
  ExternalLink,
  ShieldCheck,
  Building2,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface IntegrationPlatform {
  id: string;
  name: string;
  category: string;
  status: "Connected" | "Available";
  icon: string;
}

const platforms: IntegrationPlatform[] = [
  { id: "wp", name: "WordPress / Elementor", category: "CMS", status: "Connected", icon: "WP" },
  { id: "webflow", name: "Webflow", category: "No-Code", status: "Available", icon: "WF" },
  { id: "shopify", name: "Shopify Real Estate", category: "E-commerce", status: "Available", icon: "SH" },
  { id: "nextjs", name: "React / Next.js", category: "Framework", status: "Connected", icon: "NX" },
  { id: "custom", name: "Custom HTML5 Website", category: "Standard", status: "Connected", icon: "HT" },
];

export default function WebsiteSettingsPage() {
  const [siteUrl, setSiteUrl] = useState("https://prestigeestates.ai");
  const [agencyDomain, setAgencyDomain] = useState("prestigeestates.ai");
  const [webhookUrl, setWebhookUrl] = useState("https://prestigeestates.ai/api/webhooks/vapi");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((res) => setTimeout(res, 500));
    setIsSaving(false);
    toast.success("Website integration settings saved successfully!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <span>Website Integration</span>
            </h2>
            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-none text-xs font-bold uppercase gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Verified Domain
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Connect your primary agency domain, webhooks, and website platforms for real-time lead sync.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          size="sm"
          className="h-9 gap-1.5 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary/90"
        >
          {isSaving ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>{isSaving ? "Saving..." : "Save Settings"}</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left 2 Cols: Settings Form */}
        <div className="md:col-span-2 space-y-4">
          <Card className="bg-card border-border shadow-xs rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>Primary Website Credentials</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Agency Website URL</label>
                <Input
                  type="url"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="h-9 text-xs rounded-xl bg-background border-border"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Allowed Origin Domain</label>
                <Input
                  type="text"
                  value={agencyDomain}
                  onChange={(e) => setAgencyDomain(e.target.value)}
                  className="h-9 text-xs rounded-xl bg-background border-border font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Lead Capture Webhook Endpoint</label>
                <Input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="h-9 text-xs rounded-xl bg-background border-border font-mono"
                />
              </div>
            </div>
          </Card>

          {/* Integration Platforms Grid */}
          <Card className="bg-card border-border shadow-xs rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-foreground">Supported Platforms</h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="p-3.5 rounded-xl border border-border bg-background/50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                      {platform.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">{platform.name}</p>
                      <p className="text-[10px] text-muted-foreground">{platform.category}</p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={`text-[9px] font-bold ${
                      platform.status === "Connected"
                        ? "border-emerald-500/40 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {platform.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Status Summary */}
        <div className="space-y-4">
          <Card className="bg-card border-border shadow-xs rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Integration Status
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <span className="text-muted-foreground">SSL Certificate</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <span className="text-muted-foreground">Widget Injection</span>
                <span className="font-bold text-emerald-600">Enabled</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <span className="text-muted-foreground">CORS Policy</span>
                <span className="font-mono text-[11px] text-foreground">strict-origin</span>
              </div>
            </div>

            <Button
              onClick={() => toast.info("Re-verifying domain SSL handshake...")}
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs font-semibold rounded-xl gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Test Connection</span>
            </Button>
          </Card>

          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border-primary/20 p-5 rounded-2xl space-y-1">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Auto-Sync Active</span>
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Any property edits on your dashboard immediately sync with your connected website widgets and Vapi AI assistant.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
