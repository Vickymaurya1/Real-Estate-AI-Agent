import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface TranscriptItem {
  role: "assistant" | "user";
  text: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const transcript: TranscriptItem[] = body.transcript || [];
    const listingTitle: string = body.listingTitle || "Property Inquiry";

    if (!transcript || transcript.length === 0) {
      return NextResponse.json(
        {
          error: "No transcript provided",
          summary: getDefaultFallbackSummary(listingTitle),
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // If OpenAI API key is configured, call OpenAI for AI extraction
    if (apiKey) {
      try {
        const transcriptText = transcript
          .map((t) => `${t.role === "assistant" ? "Alexis (Agent)" : "Customer"}: ${t.text}`)
          .join("\n");

        const prompt = `You are a real estate AI analyst. Analyze the following conversation transcript between Alexis (Voice AI Real Estate Agent) and a potential buyer discussing "${listingTitle}".
Return ONLY a valid JSON object with NO additional text or markdown formatting. The JSON must match this exact schema:

{
  "customerName": "Customer's name if mentioned, otherwise 'Anonymous Caller'",
  "location": "Preferred location or city mentioned (e.g. Sector 150 Noida), otherwise 'Not specified'",
  "propertyType": "Property type discussed (e.g. Luxury Villa, Apartment, Penthouse)",
  "configuration": "Unit configuration requested (e.g. 3 BHK, 4 BHK Villa)",
  "budgetRange": "Mentioned budget range or price range discussed",
  "purpose": "Investment or Personal Residence / End-Use",
  "timeline": "Expected possession timeline or moving date",
  "questionsAsked": ["Array of main questions asked by customer"],
  "nextStep": "Recommended next action (e.g. Site visit scheduled, Send brochure, Follow-up call)",
  "sentiment": "Must be one of: 'Highly Interested', 'Interested', 'Neutral', 'Not Interested'"
}

Transcript:
${transcriptText}`;

        const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
              {
                role: "system",
                content: "You are an expert real estate AI lead analyst. Output strict JSON only.",
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.2,
          }),
        });

        if (openAiRes.ok) {
          const data = await openAiRes.json();
          const parsed = JSON.parse(data.choices[0].message.content);
          return NextResponse.json({ summary: parsed });
        }
      } catch (err) {
        console.error("OpenAI call-summary error, falling back to rule extraction:", err);
      }
    }

    // Fallback rule-based extraction when OPENAI_API_KEY is not set or fails
    const summary = extractRuleBasedSummary(transcript, listingTitle);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Call summary route error:", error);
    return NextResponse.json(
      { summary: getDefaultFallbackSummary("Property Listing") },
      { status: 500 }
    );
  }
}

function extractRuleBasedSummary(transcript: TranscriptItem[], listingTitle: string) {
  const fullUserText = transcript
    .filter((t) => t.role === "user")
    .map((t) => t.text)
    .join(" ");

  const userQuestions = transcript
    .filter((t) => t.role === "user" && (t.text.includes("?") || t.text.toLowerCase().includes("what") || t.text.toLowerCase().includes("how")))
    .map((t) => t.text);

  let customerName = "Anonymous Caller";
  const nameMatch = fullUserText.match(/(?:my name is|i am|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (nameMatch) {
    customerName = nameMatch[1];
  }

  let sentiment: "Highly Interested" | "Interested" | "Neutral" | "Not Interested" = "Interested";
  const lower = fullUserText.toLowerCase();
  if (lower.includes("book") || lower.includes("buy") || lower.includes("schedule") || lower.includes("great") || lower.includes("perfect")) {
    sentiment = "Highly Interested";
  } else if (lower.includes("no thanks") || lower.includes("not interested") || lower.includes("too expensive")) {
    sentiment = "Not Interested";
  } else if (transcript.length < 3) {
    sentiment = "Neutral";
  }

  return {
    customerName: customerName,
    location: lower.includes("noida") ? "Sector 150, Noida" : "Property Location",
    propertyType: listingTitle.includes("Villa")
      ? "Luxury Villa"
      : listingTitle.includes("Penthouse")
      ? "Penthouse"
      : listingTitle.includes("Condo")
      ? "Condo"
      : "Residential Apartment",
    configuration: lower.includes("4 bhk") ? "4 BHK Villa" : lower.includes("3 bhk") ? "3 BHK Apartment" : "3-4 BHK Unit",
    budgetRange: lower.includes("cr") || lower.includes("million") || lower.includes("lakh") ? "As discussed during call" : "Inquired on price",
    purpose: lower.includes("invest") ? "Investment" : "End-Use / Personal Residence",
    timeline: lower.includes("2027") ? "Possession Dec 2027" : "1-3 Months",
    questionsAsked: userQuestions.length > 0 ? userQuestions.slice(0, 4) : ["Inquired about property specs and pricing."],
    nextStep: lower.includes("book") || lower.includes("viewing") ? "Follow up on scheduled site viewing." : "Send detailed floor plan & pricing sheet via WhatsApp.",
    sentiment,
  };
}

function getDefaultFallbackSummary(listingTitle: string) {
  return {
    customerName: "Anonymous Caller",
    location: "Sector 150, Noida",
    propertyType: "Residential Property",
    configuration: "3-4 BHK",
    budgetRange: "Market Price",
    purpose: "Personal Residence",
    timeline: "Near-term",
    questionsAsked: [`Inquired about ${listingTitle}`],
    nextStep: "Agent follow-up call requested.",
    sentiment: "Interested" as const,
  };
}
