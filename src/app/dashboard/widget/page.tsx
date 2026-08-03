"use client";

import React, { useState } from "react";
import {
  Code,
  Copy,
  Check,
  Sparkles,
  Layout,
  Palette,
  Eye,
  Sliders,
  ShieldCheck,
  Bot,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function WidgetConfigPage() {
  const [copied, setCopied] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState<"bottom-right" | "bottom-left">("bottom-right");
  const [buttonText, setButtonText] = useState("Alexis – Residential Specialist");
  const [primaryColor, setPrimaryColor] = useState("#7a1f2b");

  const embedScript = `<!-- EstateCall Voice AI Agent Widget -->
<script
  src="https://cdn.estatecall.ai/widget/v1/estatecall-voice.js"
  data-agency-id="ag_prestige_estates_90210"
  data-assistant-id="52fb87ec-087c-4f46-8a55-e4a684ebdc75"
  data-position="${widgetPosition}"
  data-color="${primaryColor}"
  data-label="${buttonText}"
  async>
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedScript);
    setCopied(true);
    toast.success("Widget embed snippet copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              <span>Embeddable Voice Widget</span>
            </h2>
            <Badge className="bg-primary/15 text-primary border-none text-xs font-bold uppercase">
              Website Integration
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Customize and deploy your 24/7 AI Voice Agent widget to any website or web application with a single line of script.
          </p>
        </div>

        <Button
          onClick={handleCopyCode}
          size="sm"
          className="h-9 gap-1.5 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary/90"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied!" : "Copy Embed Snippet"}</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column: Customization Controls */}
        <div className="space-y-4">
          <Card className="bg-card border-border shadow-xs rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" />
              <span>Widget Customization</span>
            </h3>

            {/* Launcher Text */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Launcher Pill Label</label>
              <Input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="h-9 text-xs rounded-xl bg-background border-border"
              />
              <p className="text-[10px] text-muted-foreground">Text displayed on the floating launcher pill.</p>
            </div>

            {/* Position Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Screen Position</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWidgetPosition("bottom-right")}
                  className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                    widgetPosition === "bottom-right"
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-background text-foreground border-border hover:bg-muted"
                  }`}
                >
                  Bottom Right (Default)
                </button>
                <button
                  type="button"
                  onClick={() => setWidgetPosition("bottom-left")}
                  className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                    widgetPosition === "bottom-left"
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-background text-foreground border-border hover:bg-muted"
                  }`}
                >
                  Bottom Left
                </button>
              </div>
            </div>

            {/* Primary Theme Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Primary Brand Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-9 w-12 rounded-lg border border-border cursor-pointer bg-background p-0.5"
                />
                <Input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-9 text-xs rounded-xl bg-background border-border font-mono max-w-[120px]"
                />
              </div>
            </div>
          </Card>

          {/* Quick Setup Instructions */}
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border-primary/20 p-5 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>How It Works</span>
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Paste the script snippet before the closing <code className="bg-muted px-1 py-0.5 rounded font-mono text-primary text-[10px]">&lt;/body&gt;</code> tag on your website. The widget automatically detects property metadata tags on your site or uses default property context.
            </p>
          </Card>
        </div>

        {/* Right Column: Interactive Embed Preview & Snippet */}
        <div className="space-y-4">
          {/* Live Preview Container */}
          <Card className="bg-card border-border shadow-xs rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <span>Live Widget Preview</span>
              </h3>
              <Badge variant="outline" className="text-[10px] font-bold">
                Interactive Mockup
              </Badge>
            </div>

            {/* Preview Frame */}
            <div className="relative h-64 w-full rounded-xl bg-gradient-to-br from-muted/40 to-muted/80 border border-border/80 p-4 flex flex-col justify-between overflow-hidden">
              <div className="space-y-1 opacity-40">
                <div className="h-4 w-32 bg-foreground/20 rounded" />
                <div className="h-3 w-48 bg-foreground/15 rounded" />
                <div className="h-24 w-full bg-foreground/10 rounded-lg mt-3" />
              </div>

              {/* Floating Pill Mockup */}
              <div
                className={`absolute bottom-4 ${
                  widgetPosition === "bottom-right" ? "right-4" : "left-4"
                } flex items-center gap-2.5 px-4 py-2.5 rounded-full text-white text-xs font-bold shadow-xl transition-all`}
                style={{ backgroundColor: primaryColor }}
              >
                <Bot className="w-4 h-4" />
                <span>{buttonText}</span>
              </div>
            </div>
          </Card>

          {/* Copy-Pasteable Script Block */}
          <Card className="bg-card border-border shadow-xs rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <span>Embed Code Snippet</span>
              </h3>
              <Button
                onClick={handleCopyCode}
                size="sm"
                variant="ghost"
                className="h-7 text-xs gap-1 font-semibold"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>

            <pre className="p-4 rounded-xl bg-muted/90 border border-border text-[11px] font-mono text-foreground overflow-x-auto leading-relaxed">
              {embedScript}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}
