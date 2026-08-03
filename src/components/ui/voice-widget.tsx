"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Mic, Phone, PhoneOff, X, Sparkles, Volume2, CheckCircle2, RotateCw, FileText, User, Calendar, MapPin, DollarSign, BrainCircuit } from "lucide-react";
import { PropertyListing, CallSummary } from "@/lib/mock-data";
import { useListingsContext } from "@/context/listings-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TranscriptEntry {
  id: string;
  role: "assistant" | "user";
  text: string;
  timestamp: string;
}

interface VoiceWidgetProps {
  listing: PropertyListing;
}

function getDemoResponses(listing: PropertyListing): string[] {
  return [
    `Namaste! I'm Alexis, your residential specialist for ${listing.title}. How can I help you today?`,
    `Great question! This ${listing.propertyType.toLowerCase()} is located at ${listing.address}, ${listing.city}. It features ${listing.beds} bedrooms, ${listing.baths} bathrooms, and ${listing.sqft} sq ft of living space.`,
    `The listed price is ${listing.formattedPrice}. ${listing.priceDisplay === "Price on Request" ? "We can discuss flexible payment options." : "I can share detailed payment plans and financing options."}`,
    `This property also includes ${listing.parking} parking spots and was built in ${listing.yearBuilt}. ${listing.virtualTourUrl ? "We also have a 3D virtual tour available!" : ""}`,
    `Would you like to schedule an in-person viewing? I can help book a time that works for you. We have slots available this week.`,
    `Is there anything else you'd like to know about ${listing.title}? I'm here to help with any questions about the property, neighborhood, or financing.`,
  ];
}

export function VoiceWidget({ listing }: VoiceWidgetProps) {
  const { addCallRecord } = useListingsContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "listening" | "speaking">("idle");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [vapiReady, setVapiReady] = useState(false);

  // AI Summary State
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [callSummary, setCallSummary] = useState<CallSummary | null>(null);

  const vapiRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const demoIndexRef = useRef(0);
  const demoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptRef = useRef<TranscriptEntry[]>([]);

  // Keep transcriptRef in sync
  useEffect(() => {
    transcriptRef.current = transcript;
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  // Generate Call Summary & Save Record
  const generateSummaryAndSave = useCallback(
    async (currentTranscript: TranscriptEntry[]) => {
      if (currentTranscript.length === 0) return;

      setIsGeneratingSummary(true);
      toast.info("Generating AI Call Summary...");

      try {
        const res = await fetch("/api/call-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transcript: currentTranscript.map((t) => ({ role: t.role, text: t.text })),
            listingTitle: listing.title,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.summary) {
            setCallSummary(data.summary);
            addCallRecord({
              listingId: listing.id,
              listingTitle: listing.title,
              customerName: data.summary.customerName || "Anonymous Caller",
              duration: `${Math.max(1, Math.ceil(currentTranscript.length / 2))}m 15s`,
              transcript: currentTranscript,
              summary: data.summary,
            });
            toast.success("AI Call Summary generated & logged!");
          }
        }
      } catch (err) {
        console.error("Error generating call summary:", err);
      } finally {
        setIsGeneratingSummary(false);
      }
    },
    [listing, addCallRecord]
  );

  // Initialize Vapi SDK
  const initVapi = useCallback(async () => {
    try {
      let publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "";
      let assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "";
      let isDemo = !publicKey || !assistantId;

      try {
        const res = await fetch("/api/vapi/session");
        if (res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            if (data.publicKey && data.assistantId && !data.demo) {
              publicKey = data.publicKey;
              assistantId = data.assistantId;
              isDemo = false;
            }
          }
        }
      } catch (fetchErr) {
        console.warn("Session API fetch error, using client env vars fallback:", fetchErr);
      }

      if (isDemo || !publicKey || !assistantId) {
        setIsDemoMode(true);
        return;
      }

      const VapiModule = await import("@vapi-ai/web");
      const VapiClass = VapiModule.default || VapiModule;
      const vapi = new VapiClass(publicKey);

      vapi.on("call-start", () => {
        setCallStatus("listening");
        setIsCallActive(true);
        setCallSummary(null);
      });

      vapi.on("speech-start", () => {
        setCallStatus("speaking");
      });

      vapi.on("speech-end", () => {
        setCallStatus("listening");
      });

      vapi.on("message", (msg: any) => {
        if (msg.type === "transcript") {
          if (msg.transcriptType === "final") {
            const entry: TranscriptEntry = {
              id: `t-${Date.now()}-${Math.random()}`,
              role: msg.role === "assistant" ? "assistant" : "user",
              text: msg.transcript,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setTranscript((prev) => [...prev, entry]);
          }
        }
      });

      vapi.on("call-end", () => {
        setIsCallActive(false);
        setCallStatus("idle");
        generateSummaryAndSave(transcriptRef.current);
      });

      vapi.on("error", (err: any) => {
        console.error("Vapi error:", err);
        setIsCallActive(false);
        setCallStatus("idle");
      });

      vapiRef.current = vapi;
      setVapiReady(true);
      setIsDemoMode(false);
      (vapi as any).__assistantId = assistantId;
    } catch (err) {
      console.error("Failed to initialize Vapi:", err);
      setIsDemoMode(true);
    }
  }, [generateSummaryAndSave]);

  useEffect(() => {
    initVapi();
    return () => {
      if (vapiRef.current) {
        try { vapiRef.current.stop(); } catch {}
      }
      if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
    };
  }, [initVapi]);

  const startCall = async () => {
    setTranscript([]);
    setCallSummary(null);
    demoIndexRef.current = 0;

    if (isDemoMode) {
      setIsCallActive(true);
      setCallStatus("connecting");

      setTimeout(() => {
        setCallStatus("speaking");
        const demoResponses = getDemoResponses(listing);

        const addDemoMessage = (index: number) => {
          if (index >= demoResponses.length) return;

          setCallStatus("speaking");
          const entry: TranscriptEntry = {
            id: `demo-${Date.now()}-${index}`,
            role: "assistant",
            text: demoResponses[index],
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          setTranscript((prev) => [...prev, entry]);

          demoTimerRef.current = setTimeout(() => {
            setCallStatus("listening");

            if (index < demoResponses.length - 1) {
              const userResponses = [
                "Tell me more about this property.",
                "What's the price?",
                "What about parking and amenities?",
                "Can I book a viewing?",
                "Thanks, that's helpful!",
              ];
              if (index < userResponses.length) {
                const userEntry: TranscriptEntry = {
                  id: `demo-user-${Date.now()}-${index}`,
                  role: "user",
                  text: userResponses[index],
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                };
                setTranscript((prev) => [...prev, userEntry]);
              }

              demoTimerRef.current = setTimeout(() => {
                addDemoMessage(index + 1);
              }, 2000);
            } else {
              setCallStatus("idle");
              setIsCallActive(false);
              generateSummaryAndSave(transcriptRef.current);
            }
          }, 2500);
        };

        addDemoMessage(0);
      }, 1200);
    } else if (vapiRef.current) {
      setIsCallActive(true);
      setCallStatus("connecting");

      const assistantId = (vapiRef.current as any).__assistantId;

      try {
        await vapiRef.current.start(assistantId, {
          variableValues: {
            listingTitle: listing.title,
            listingPrice: listing.formattedPrice,
            propertyType: listing.propertyType,
            listingBeds: String(listing.beds),
            listingBaths: String(listing.baths),
            listingSqft: String(listing.sqft),
            listingParking: String(listing.parking),
            propertyYearBuilt: String(listing.yearBuilt),
            listingAddress: `${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`,
            listingDescription: listing.description,
            propertyListingType: listing.listingType,
            listingPriceDisplay: listing.priceDisplay,
          },
        });
      } catch (err) {
        console.error("Failed to start Vapi call:", err);
        setIsCallActive(false);
        setCallStatus("idle");
      }
    }
  };

  const endCall = () => {
    if (demoTimerRef.current) clearTimeout(demoTimerRef.current);

    if (!isDemoMode && vapiRef.current) {
      try { vapiRef.current.stop(); } catch {}
    }

    setIsCallActive(false);
    setCallStatus("idle");
    generateSummaryAndSave(transcriptRef.current);
  };

  const toggleWidget = () => {
    if (isOpen && isCallActive) {
      endCall();
    }
    setIsOpen(!isOpen);
  };

  const statusLabel =
    callStatus === "connecting"
      ? "Connecting..."
      : callStatus === "speaking"
      ? "Speaking..."
      : callStatus === "listening"
      ? "Listening..."
      : "Ready";

  const statusColor =
    callStatus === "connecting"
      ? "bg-amber-400"
      : callStatus === "speaking"
      ? "bg-accent"
      : callStatus === "listening"
      ? "bg-emerald-400"
      : "bg-gray-400";

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleWidget}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full
            bg-gradient-to-r from-[#7a1f2b] to-[#4a0d16] text-white shadow-2xl
            hover:shadow-[0_8px_30px_rgba(122,31,43,0.4)] hover:scale-[1.03]
            transition-all duration-300 group"
        >
          <div className="relative">
            <Mic className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse border-2 border-[#7a1f2b]" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold leading-tight">Alexis</p>
            <p className="text-[10px] opacity-80 font-medium">Residential Specialist</p>
          </div>
        </button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] rounded-2xl overflow-hidden
            bg-card/95 backdrop-blur-xl border border-border shadow-2xl
            animate-in slide-in-from-bottom-4 fade-in duration-300 flex flex-col max-h-[600px]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#7a1f2b] to-[#4a0d16] text-white px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center text-sm font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                {isCallActive && (
                  <span className={`absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full ${statusColor} animate-pulse border-2 border-[#7a1f2b]`} />
                )}
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">Alexis – Residential Specialist</p>
                <div className="flex items-center gap-1.5">
                  <span className={`block h-1.5 w-1.5 rounded-full ${statusColor}`} />
                  <p className="text-[10px] opacity-90 font-medium">{statusLabel}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {isDemoMode && (
                <Badge className="bg-amber-500/90 text-white border-none text-[8px] font-bold px-1.5 py-0.5">
                  DEMO
                </Badge>
              )}
              <button
                onClick={toggleWidget}
                className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isDemoMode && (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 text-center shrink-0">
              <p className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold">
                Demo Mode — connect Vapi for live calls
              </p>
            </div>
          )}

          {/* Property Context Bar */}
          <div className="px-4 py-2 bg-muted/50 border-b border-border/60 flex items-center gap-2.5 shrink-0">
            <div className="h-7 w-10 rounded-lg overflow-hidden bg-muted shrink-0">
              <img src={listing.image} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-foreground truncate">{listing.title}</p>
              <p className="text-[9px] text-primary font-semibold">{listing.formattedPrice}</p>
            </div>
          </div>

          {/* Transcript & Summary Scroll Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 bg-background/80 min-h-[200px]">
            {transcript.length === 0 && !isCallActive && !callSummary && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-2 py-8 opacity-60">
                <Volume2 className="w-8 h-8 text-muted-foreground/50" />
                <p className="text-[11px] text-muted-foreground font-medium">
                  Click the mic button below to start talking with Alexis about this property.
                </p>
              </div>
            )}

            {transcript.map((entry) => (
              <div
                key={entry.id}
                className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                    entry.role === "assistant"
                      ? "bg-[#7a1f2b] text-white rounded-bl-sm"
                      : "bg-muted text-foreground rounded-br-sm"
                  }`}
                >
                  <p className="font-medium">{entry.text}</p>
                  <p className={`text-[9px] mt-0.5 ${entry.role === "assistant" ? "opacity-60" : "text-muted-foreground"}`}>
                    {entry.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {isGeneratingSummary && (
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-2 text-xs text-primary font-semibold">
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Generating AI Call Summary & Lead Insights...</span>
              </div>
            )}

            {/* Generated Summary Card */}
            {callSummary && !isCallActive && (
              <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-br from-card to-muted/80 border border-primary/20 space-y-2.5 text-xs animate-in fade-in duration-300 shadow-xs">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <BrainCircuit className="w-4 h-4 text-primary" />
                    AI Call Summary
                  </span>
                  <Badge className={`border-none text-[9px] font-bold ${
                    callSummary.sentiment === "Highly Interested"
                      ? "bg-emerald-500 text-white"
                      : callSummary.sentiment === "Interested"
                      ? "bg-emerald-600/20 text-emerald-700"
                      : "bg-gray-500 text-white"
                  }`}>
                    {callSummary.sentiment}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase font-bold">Caller</span>
                    <span className="font-semibold text-foreground">{callSummary.customerName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase font-bold">Location</span>
                    <span className="font-semibold text-foreground">{callSummary.location}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase font-bold">Config / Budget</span>
                    <span className="font-semibold text-foreground">{callSummary.configuration} ({callSummary.budgetRange})</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase font-bold">Timeline</span>
                    <span className="font-semibold text-foreground">{callSummary.timeline}</span>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-border/60">
                  <span className="text-muted-foreground block text-[9px] uppercase font-bold mb-0.5">Next Recommended Step</span>
                  <p className="font-semibold text-primary text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{callSummary.nextStep}</span>
                  </p>
                </div>
              </div>
            )}

            <div ref={transcriptEndRef} />
          </div>

          {/* Footer Controls */}
          <div className="px-4 py-3 border-t border-border/60 bg-card flex items-center justify-between shrink-0">
            {!isCallActive ? (
              <Button
                onClick={startCall}
                className="w-full h-10 gap-2 rounded-xl bg-gradient-to-r from-[#7a1f2b] to-[#4a0d16] text-white font-semibold text-xs hover:opacity-90 transition-all"
              >
                <Mic className="w-4 h-4" />
                <span>{transcript.length > 0 ? "Start New Conversation" : "Start Conversation"}</span>
              </Button>
            ) : (
              <div className="flex items-center justify-between w-full gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`relative h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                    callStatus === "listening"
                      ? "bg-emerald-500/15"
                      : callStatus === "speaking"
                      ? "bg-primary/15"
                      : "bg-muted"
                  }`}>
                    {callStatus === "listening" ? (
                      <Mic className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-primary" />
                    )}
                    {isCallActive && (
                      <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                        callStatus === "listening" ? "bg-emerald-400" : "bg-primary"
                      }`} />
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-foreground">{statusLabel}</p>
                    <p className="text-[9px] text-muted-foreground">
                      {callStatus === "listening" ? "Speak now..." : "Alexis is talking"}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={endCall}
                  variant="destructive"
                  size="sm"
                  className="h-9 gap-1.5 rounded-xl text-xs font-semibold px-4"
                >
                  <PhoneOff className="w-3.5 h-3.5" />
                  <span>End Call</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
