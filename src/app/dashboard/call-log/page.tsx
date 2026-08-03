"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  Download,
  Search,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  MessageSquare,
  Clock,
  Calendar,
  User,
  CheckCircle2,
  Building2,
  Filter,
  Sparkles,
  FileSpreadsheet,
  FileCode,
} from "lucide-react";
import { useListingsContext } from "@/context/listings-context";
import { CallRecord } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function CallLogPage() {
  const { calls } = useListingsContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");
  const [expandedCallId, setExpandedCallId] = useState<string | null>(null);

  // Filtered calls
  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      call.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (call.summary?.location || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSentiment =
      sentimentFilter === "all" || call.summary?.sentiment === sentimentFilter;

    return matchesSearch && matchesSentiment;
  });

  const toggleExpand = (id: string) => {
    setExpandedCallId(expandedCallId === id ? null : id);
  };

  // CSV Export
  const handleExportCSV = () => {
    if (calls.length === 0) {
      toast.error("No calls to export.");
      return;
    }

    const headers = [
      "Call ID",
      "Date",
      "Customer Name",
      "Property Title",
      "Duration",
      "Sentiment",
      "Location",
      "Configuration",
      "Budget Range",
      "Purpose",
      "Timeline",
      "Next Step",
    ];

    const rows = calls.map((c) => [
      c.id,
      `"${c.createdAt}"`,
      `"${c.customerName || "Anonymous Caller"}"`,
      `"${c.listingTitle}"`,
      `"${c.duration}"`,
      `"${c.summary?.sentiment || "N/A"}"`,
      `"${c.summary?.location || "N/A"}"`,
      `"${c.summary?.configuration || "N/A"}"`,
      `"${c.summary?.budgetRange || "N/A"}"`,
      `"${c.summary?.purpose || "N/A"}"`,
      `"${c.summary?.timeline || "N/A"}"`,
      `"${c.summary?.nextStep || "N/A"}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `estatecall_call_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Call log exported as CSV!");
  };

  // JSON Export
  const handleExportJSON = () => {
    if (calls.length === 0) {
      toast.error("No calls to export.");
      return;
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(calls, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `estatecall_call_logs_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Call log exported as JSON!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-primary" />
              <span>Voice AI Call Logs</span>
            </h2>
            <Badge className="bg-primary/15 text-primary border-none text-xs font-bold uppercase">
              {calls.length} Calls Recorded
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Review complete transcripts, AI summary extraction, lead sentiment, and export records.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 rounded-xl text-xs font-semibold"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </Button>

          <Button
            onClick={handleExportJSON}
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 rounded-xl text-xs font-semibold"
          >
            <FileCode className="w-3.5 h-3.5 text-primary" />
            <span>Export JSON</span>
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card border border-border p-4 rounded-2xl shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer, property, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs rounded-xl bg-background border-border"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Sentiment:</span>
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="h-9 px-3 text-xs rounded-xl border border-border bg-background text-foreground focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Sentiments</option>
            <option value="Highly Interested">Highly Interested</option>
            <option value="Interested">Interested</option>
            <option value="Neutral">Neutral</option>
            <option value="Not Interested">Not Interested</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <Card className="bg-card border-border shadow-xs rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/60 text-muted-foreground border-b border-border/80 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Caller Contact</th>
                <th className="py-3 px-4">Property Listing</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Sentiment</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60">
              {filteredCalls.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <PhoneCall className="w-10 h-10 mx-auto mb-2 text-muted-foreground/40" />
                    <p className="font-semibold text-sm">No call logs found</p>
                    <p className="text-xs mt-0.5">Start a call from any property listing to record voice conversations.</p>
                  </td>
                </tr>
              ) : (
                filteredCalls.map((call) => {
                  const isExpanded = expandedCallId === call.id;

                  return (
                    <React.Fragment key={call.id}>
                      <tr className="hover:bg-muted/30 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-foreground">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-primary/10 text-primary font-extrabold flex items-center justify-center text-[11px]">
                              {(call.customerName || "A")[0]}
                            </div>
                            <span>{call.customerName || "Anonymous Caller"}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-foreground">
                          <span className="truncate max-w-[200px] block">{call.listingTitle}</span>
                        </td>

                        <td className="py-3.5 px-4 text-muted-foreground font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            {call.duration}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-muted-foreground font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {call.createdAt}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <Badge
                            className={`border-none text-[10px] font-bold ${
                              call.summary?.sentiment === "Highly Interested"
                                ? "bg-emerald-500 text-white"
                                : call.summary?.sentiment === "Interested"
                                ? "bg-emerald-600/20 text-emerald-700 dark:text-emerald-300"
                                : call.summary?.sentiment === "Neutral"
                                ? "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                                : "bg-rose-500 text-white"
                            }`}
                          >
                            {call.summary?.sentiment || "Interested"}
                          </Badge>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <Button
                            onClick={() => toggleExpand(call.id)}
                            variant="secondary"
                            size="sm"
                            className="h-8 gap-1 text-[11px] font-semibold rounded-xl"
                          >
                            <span>{isExpanded ? "Hide Details" : "View Transcript"}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </Button>
                        </td>
                      </tr>

                      {/* Expandable Row */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={6} className="bg-muted/20 p-4 border-b border-border/80">
                            <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-top-2 duration-200">
                              {/* Left Column: Full Transcript Thread */}
                              <div className="space-y-3">
                                <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                  <MessageSquare className="w-4 h-4 text-primary" />
                                  <span>Full Call Transcript</span>
                                </h4>

                                <div className="p-4 rounded-xl bg-card border border-border max-h-72 overflow-y-auto space-y-2.5">
                                  {call.transcript.map((t, idx) => (
                                    <div
                                      key={idx}
                                      className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                      <div
                                        className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                                          t.role === "assistant"
                                            ? "bg-[#7a1f2b] text-white rounded-bl-sm"
                                            : "bg-muted text-foreground rounded-br-sm"
                                        }`}
                                      >
                                        <p className="font-medium">{t.text}</p>
                                        {t.timestamp && (
                                          <p className={`text-[9px] mt-0.5 ${t.role === "assistant" ? "opacity-60" : "text-muted-foreground"}`}>
                                            {t.timestamp}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Right Column: AI Structured Summary Grid */}
                              <div className="space-y-3">
                                <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                  <BrainCircuit className="w-4 h-4 text-primary" />
                                  <span>Structured AI Summary</span>
                                </h4>

                                <Card className="bg-card border-border p-4 rounded-xl space-y-3 text-xs">
                                  <div className="grid grid-cols-2 gap-3 border-b border-border/60 pb-3">
                                    <div>
                                      <span className="text-[10px] font-bold text-muted-foreground uppercase block">Customer Name</span>
                                      <span className="font-bold text-foreground">{call.summary?.customerName || "Anonymous Caller"}</span>
                                    </div>
                                    <div>
                                      <span className="text-[10px] font-bold text-muted-foreground uppercase block">Location</span>
                                      <span className="font-bold text-foreground">{call.summary?.location || "Not specified"}</span>
                                    </div>
                                    <div>
                                      <span className="text-[10px] font-bold text-muted-foreground uppercase block">Property Type</span>
                                      <span className="font-bold text-foreground">{call.summary?.propertyType}</span>
                                    </div>
                                    <div>
                                      <span className="text-[10px] font-bold text-muted-foreground uppercase block">Configuration</span>
                                      <span className="font-bold text-foreground">{call.summary?.configuration}</span>
                                    </div>
                                    <div>
                                      <span className="text-[10px] font-bold text-muted-foreground uppercase block">Budget Range</span>
                                      <span className="font-bold text-foreground text-primary">{call.summary?.budgetRange}</span>
                                    </div>
                                    <div>
                                      <span className="text-[10px] font-bold text-muted-foreground uppercase block">Timeline</span>
                                      <span className="font-bold text-foreground">{call.summary?.timeline}</span>
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase block">Questions Asked</span>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-0.5 pl-1 text-[11px]">
                                      {call.summary?.questionsAsked?.map((q, qIdx) => (
                                        <li key={qIdx} className="text-foreground">{q}</li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="pt-2 border-t border-border/60">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase block">Next Recommended Step</span>
                                    <p className="font-bold text-primary flex items-center gap-1.5 mt-0.5">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                      <span>{call.summary?.nextStep}</span>
                                    </p>
                                  </div>
                                </Card>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
