EstateCall AI — Real Estate Voice Calling Agent

A live AI voice-calling agent for real estate, built as a full agency platform. A visitor on any property listing can talk to Alexis, an AI sales executive who greets them, qualifies their requirements, answers questions about the property, and hands off a structured lead summary — in Hindi, Hinglish, or English.

Live demo: real-estate-ai-agent-vickymaurya1s-projects.vercel.app/dashboard

What it does
A visitor opens a property page and talks to Alexis via a floating voice widget — a real, live voice call, not a chatbot.
Alexis greets them, asks whether they're buying for self-use or investment, gathers location/configuration/budget/timeline, and answers questions about the property or a sample project (Riverdale Greens, Sector 150, Noida) using only real, provided facts.
After the call, an AI-generated summary (lead intent, budget, timeline, next step) is saved to a searchable call log.
The same platform includes the agency side of the business — listings, marketplace inquiries, viewing bookings, and a client portal — so the voice agent sits inside a working product, not a standalone demo page.
Feature highlights
Live multilingual voice agent — real-time Hindi/Hinglish/English conversation via Vapi, powered by OpenAI for reasoning and Deepgram for speech recognition
Property-aware conversations — the agent is given the exact listing a visitor is viewing (price, specs, address) and answers questions specific to it
AI call summarization — every finished call is automatically distilled into a structured lead record (name, requirements, budget, next step)
Full listings management — add/edit/delete properties with photo uploads, filters, and search
Marketplace & client portal — buyer inquiries, replies, viewing scheduling with reschedule flow, and reservation tracking, all live-synced across the app
Call log with export — searchable transcript history with CSV/JSON export
Tech stack
Framework: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
UI: shadcn/ui, Radix primitives, lucide-react, recharts, framer-motion
Voice: Vapi Web SDK (orchestration) + OpenAI GPT-4o (conversation model) + Deepgram Nova-3 (multilingual transcription)
State: React Context + localStorage (no database — the app is intentionally frontend-first)
Hosting: Vercel, with two small serverless routes for anything that needs a server (Vapi session credentials, call-summary generation)
Getting started
1. Install dependencies
bash
npm install
2. Set up environment variables

Create .env.local in the project root:

env
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
VAPI_ASSISTANT_ID=your_vapi_assistant_id
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_vapi_assistant_id
OPENAI_API_KEY=your_openai_api_key

OPENAI_API_KEY is optional — without it, call summaries fall back to a rule-based extraction instead of an LLM-generated one; nothing else in the app is affected.

3. Run locally
bash
npm run dev

Open http://localhost:3000.

Deploying to Vercel
Push the repo to GitHub and import it into Vercel.
Add the same four environment variables above under Project Settings → Environment Variables, scoped to Production (and Preview/Development if needed).
Redeploy after adding or changing any environment variable — Next.js bakes them in at build time, so a plain git push alone won't pick up a newly added variable until a fresh build runs.
Configuring the voice agent

The assistant's behavior lives in two places that must stay in sync:

Vapi Dashboard — the assistant's system prompt, first message, model, and transcriber settings.
src/components/ui/voice-widget.tsx — the variableValues object passed into vapi.start(), which fills in {{placeholders}} in the system prompt with the specific listing's live data.

If you rename a variable in one place, rename it in the other — a mismatch fails silently (the placeholder just never gets filled) rather than throwing an error, so it's worth double-checking after any prompt edit. See the code comments in voice-widget.tsx for the current variable names in use.

Project structure
src/
├─ app/
│  ├─ dashboard/     # Agency-side pages (overview, listings, marketplace, call log, etc.)
│  ├─ portal/        # Client-facing pages (viewings, reservations, inquiries)
│  ├─ listing/[id]/  # Public property detail page with the voice widget
│  └─ api/           # Serverless routes (Vapi session, call summary)
├─ components/       # Shared UI (sidebar, top bar, voice widget, stat cards)
├─ context/          # Shared app state (listings, viewings, inquiries, calls)
└─ lib/              # Seed data and types
