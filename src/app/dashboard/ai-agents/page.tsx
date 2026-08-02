"use client";

import React, { useState } from "react";
import {
  Bot,
  Phone,
  Clock,
  Activity,
  Zap,
  Globe,
  Settings,
  Volume2,
  TrendingUp,
  BarChart3,
  Users,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface AIAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "Active" | "Idle" | "Offline";
  language: string;
  voiceProvider: string;
  callsHandled: number;
  avgDuration: string;
  conversionRate: number;
  lastActive: string;
  description: string;
}

const mockAgents: AIAgent[] = [
  {
    id: "agent-001",
    name: "Alexis",
    role: "Residential Specialist",
    avatar: "AX",
    status: "Active",
    language: "English, Hindi",
    voiceProvider: "ElevenLabs – Aria",
    callsHandled: 482,
    avgDuration: "3m 42s",
    conversionRate: 28.4,
    lastActive: "Live Now",
    description:
      "Primary voice agent for all residential property inquiries. Handles buyer greetings, requirement gathering, project Q&A (Riverdale Greens knowledge base), and appointment scheduling.",
  },
  {
    id: "agent-002",
    name: "Priya",
    role: "Luxury Estate Advisor",
    avatar: "PR",
    status: "Active",
    language: "English, Hindi, Punjabi",
    voiceProvider: "ElevenLabs – Maya",
    callsHandled: 312,
    avgDuration: "4m 15s",
    conversionRate: 34.1,
    lastActive: "2 min ago",
    description:
      "Specialized in high-net-worth client interactions. Handles luxury villa tours, premium condo inquiries, and VIP investor consultations with white-glove service protocols.",
  },
  {
    id: "agent-003",
    name: "Marcus",
    role: "Commercial & Investment Specialist",
    avatar: "MK",
    status: "Idle",
    language: "English",
    voiceProvider: "ElevenLabs – Adam",
    callsHandled: 184,
    avgDuration: "2m 50s",
    conversionRate: 19.6,
    lastActive: "1h ago",
    description:
      "Handles commercial real estate inquiries, plot sales, investment analysis questions, and ROI calculation walkthroughs for developer partners.",
  },
];

// Summary stats
const totalCalls = mockAgents.reduce((sum, a) => sum + a.callsHandled, 0);
const activeAgents = mockAgents.filter((a) => a.status === "Active").length;

export default function AIAgentsPage() {
  const [agents, setAgents] = useState(mockAgents);

  const toggleAgentStatus = (id: string) => {
    setAgents((prev) =>
      prev.map((agent) => {
        if (agent.id === id) {
          const nextStatus = agent.status === "Active" ? "Idle" : "Active";
          toast.info(`${agent.name} is now ${nextStatus}`);
          return {
            ...agent,
            status: nextStatus,
            lastActive: nextStatus === "Active" ? "Live Now" : "Just now",
          };
        }
        return agent;
      })
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <span>AI Voice Agents</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Manage, configure, and monitor your Vapi-powered voice agents. Each agent has its own personality, knowledge base, and calling parameters.
          </p>
        </div>

        <Button
          onClick={() => toast.info("Agent creation wizard coming in Phase 5!")}
          size="sm"
          className="h-9 gap-1.5 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary/90"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Create New Agent</span>
        </Button>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-card border-border p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-foreground">{agents.length}</p>
              <p className="text-[10px] text-muted-foreground font-medium">Total Agents</p>
            </div>
          </div>
        </Card>
        <Card className="bg-card border-border p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-foreground">
                {agents.filter((a) => a.status === "Active").length}
              </p>
              <p className="text-[10px] text-muted-foreground font-medium">Active Now</p>
            </div>
          </div>
        </Card>
        <Card className="bg-card border-border p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Phone className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-foreground">{totalCalls.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground font-medium">Total Calls</p>
            </div>
          </div>
        </Card>
        <Card className="bg-card border-border p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-foreground">
                {(mockAgents.reduce((s, a) => s + a.conversionRate, 0) / mockAgents.length).toFixed(1)}%
              </p>
              <p className="text-[10px] text-muted-foreground font-medium">Avg Conversion</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className="bg-card border-border shadow-xs hover:shadow-md transition-all rounded-2xl overflow-hidden"
          >
            {/* Agent Header */}
            <div className="bg-gradient-to-r from-[#7a1f2b] to-[#4a0d16] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center text-sm font-bold backdrop-blur-sm">
                  {agent.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">{agent.name}</h3>
                  <p className="text-[10px] opacity-80 font-medium">{agent.role}</p>
                </div>
              </div>

              <Badge
                className={`border-none text-[10px] font-bold ${
                  agent.status === "Active"
                    ? "bg-emerald-400 text-emerald-950"
                    : agent.status === "Idle"
                    ? "bg-amber-400 text-amber-950"
                    : "bg-gray-400 text-gray-950"
                }`}
              >
                <span
                  className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${
                    agent.status === "Active"
                      ? "bg-emerald-700 animate-pulse"
                      : agent.status === "Idle"
                      ? "bg-amber-700"
                      : "bg-gray-600"
                  }`}
                />
                {agent.status}
              </Badge>
            </div>

            <CardContent className="p-5 space-y-4">
              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {agent.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-muted/60 text-center">
                  <Phone className="w-3.5 h-3.5 text-primary mx-auto mb-0.5" />
                  <p className="text-sm font-extrabold text-foreground">{agent.callsHandled}</p>
                  <p className="text-[9px] text-muted-foreground">Calls</p>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/60 text-center">
                  <Clock className="w-3.5 h-3.5 text-primary mx-auto mb-0.5" />
                  <p className="text-sm font-extrabold text-foreground">{agent.avgDuration}</p>
                  <p className="text-[9px] text-muted-foreground">Avg Duration</p>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/60 text-center">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-0.5" />
                  <p className="text-sm font-extrabold text-foreground">{agent.conversionRate}%</p>
                  <p className="text-[9px] text-muted-foreground">Conversion</p>
                </div>
              </div>

              {/* Agent Details */}
              <div className="space-y-2 pt-1 border-t border-border/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Globe className="w-3 h-3" />
                    Languages
                  </span>
                  <span className="font-semibold text-foreground">{agent.language}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Volume2 className="w-3 h-3" />
                    Voice Provider
                  </span>
                  <span className="font-semibold text-foreground text-[11px]">{agent.voiceProvider}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Activity className="w-3 h-3" />
                    Last Active
                  </span>
                  <span className={`font-semibold ${agent.lastActive === "Live Now" ? "text-emerald-600" : "text-foreground"}`}>
                    {agent.lastActive}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <Button
                  onClick={() => toggleAgentStatus(agent.id)}
                  size="sm"
                  variant={agent.status === "Active" ? "outline" : "default"}
                  className="flex-1 h-8 text-[11px] font-semibold rounded-xl gap-1"
                >
                  {agent.status === "Active" ? (
                    <>
                      <Activity className="w-3 h-3" />
                      <span>Deactivate</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3 h-3" />
                      <span>Activate</span>
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => toast.info(`Opening ${agent.name}'s prompt editor...`)}
                  size="sm"
                  variant="secondary"
                  className="h-8 text-[11px] font-semibold rounded-xl gap-1"
                >
                  <Settings className="w-3 h-3" />
                  <span>Configure</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vapi Integration Info Banner */}
      <Card className="bg-gradient-to-r from-primary/8 via-accent/8 to-primary/4 border-primary/20 p-5 rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-primary text-white shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-foreground">Powered by Vapi AI</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Each agent connects to the Vapi voice platform for real-time conversational AI. Configure your assistant ID and public key in environment variables to enable live calling from property listing pages. Agents use dynamic <code className="bg-muted px-1 py-0.5 rounded text-primary text-[10px] font-mono">assistantOverrides</code> to inject property-specific context into every call.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
