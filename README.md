# 🏰 EstateCall — Voice AI Real Estate Platform

EstateCall is a modern, high-conversion Real Estate AI Agent platform built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, Vapi Web SDK, OpenAI, and shadcn/ui.

---

## 🚀 Quick Start (Local Setup)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables (`.env.local`)
Create a `.env.local` file in the root directory:

```env
# Vapi AI Web SDK (Public Key safe for browser execution)
NEXT_PUBLIC_VAPI_PUBLIC_KEY=508a553a-5b92-45d0-a732-43af737d39d9

# Vapi Assistant ID (Server-side + client fallback)
VAPI_ASSISTANT_ID=52fb87ec-087c-4f46-8a55-e4a684ebdc75
NEXT_PUBLIC_VAPI_ASSISTANT_ID=52fb87ec-087c-4f46-8a55-e4a684ebdc75

# OpenAI API Key (For AI Call Summarization in /api/call-summary)
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚠️ CRITICAL TECHNICAL REQUIREMENT: Vapi Variable Naming Synchronization

> **DEVELOPMENT LESSON & BUG PREVENTION NOTICE**
> 
> During development, we encountered an issue where property metadata variables were not substituting in Vapi calls because the object keys in `vapi.start()` did not match the placeholders expected by the Vapi assistant system prompt.

When configuring your Vapi assistant prompt in the Vapi Dashboard, your system prompt **MUST** reference the exact variable names sent by [src/components/ui/voice-widget.tsx](file:///c:/Users/vicky/Downloads/Real%20Estate%20AI%20Agent/src/components/ui/voice-widget.tsx):

| Vapi System Prompt Placeholder | `voice-widget.tsx` Key | Description |
|--------------------------------|------------------------|-------------|
| `{{listingTitle}}` | `listingTitle` | Property Title (e.g. "The Grand Horizon Villa") |
| `{{listingPrice}}` | `listingPrice` | Formatted Price (e.g. "$3,450,000") |
| `{{propertyType}}` | `propertyType` | Type (e.g. "House", "Apartment") |
| `{{listingBeds}}` | `listingBeds` | Bedrooms count (e.g. "5") |
| `{{listingBaths}}` | `listingBaths` | Bathrooms count (e.g. "6") |
| `{{listingSqft}}` | `listingSqft` | Area in sq ft (e.g. "5800") |
| `{{listingParking}}` | `listingParking` | Parking spaces count (e.g. "3") |
| `{{propertyYearBuilt}}` | `propertyYearBuilt` | Year built (e.g. "2023") |
| `{{listingAddress}}` | `listingAddress` | Full property address |
| `{{listingDescription}}` | `listingDescription` | Property description summary |
| `{{propertyListingType}}` | `propertyListingType` | "For Sale" or "For Rent" |
| `{{listingPriceDisplay}}` | `listingPriceDisplay` | "Fixed Price", "Starting From", or "Price on Request" |

If you alter variable names in your Vapi system prompt, you **must** update `voice-widget.tsx` to match, otherwise placeholders like `{{listingTitle}}` will render empty or un-substituted during voice calls.

---

## 🌐 Deploying to Vercel

### Step 1: Push Repository
Push your project to GitHub/GitLab.

### Step 2: Configure Environment Variables in Vercel
In Vercel Dashboard → **Project Settings** → **Environment Variables**, add:

1. `NEXT_PUBLIC_VAPI_PUBLIC_KEY` — Value: `508a553a-5b92-45d0-a732-43af737d39d9` (Select **Production**, **Preview**, **Development**)
2. `VAPI_ASSISTANT_ID` — Value: `52fb87ec-087c-4f46-8a55-e4a684ebdc75`
3. `NEXT_PUBLIC_VAPI_ASSISTANT_ID` — Value: `52fb87ec-087c-4f46-8a55-e4a684ebdc75`
4. `OPENAI_API_KEY` — Value: `your_openai_api_key_here` (Kept server-only, never exposed to client)

### Step 3: Trigger Redeploy
After adding or modifying environment variables in Vercel, click **Redeploy** on your latest deployment (or push a new commit) for Next.js to inject the environment variables.

---

## 📱 Feature Highlights

- **Agency Dashboard (`/dashboard`)**: Analytics, Listings CRUD with local drag-and-drop file uploads, Marketplace inquiry replies, AI Voice Agent management, Knowledge Base editor (pre-filled with Riverdale Greens, Sector 150 Noida facts).
- **Client Portal (`/portal`)**: My Viewings (with 30-min date/time slot rescheduling panel), My Hold Deposits, My Inquiries thread viewer.
- **Dynamic Property Detail (`/listing/[id]`)**: Full photo gallery, pre-filled "Book a Viewing" & "Ask a Question" modals, and interactive 24/7 **Voice AI Widget** with real-time audio calling & automated AI lead summary generation.
- **Voice AI Call Logs (`/dashboard/call-log`)**: Full transcripts, structured AI Lead summaries, sentiment badges, and CSV / JSON export actions.
