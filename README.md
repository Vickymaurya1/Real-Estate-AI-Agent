<div align="center">

# 🏡 EstateCall AI
### AI-Powered Real Estate Voice Calling Platform

> **A multilingual AI voice sales executive for real estate that qualifies leads, answers property queries, and automates customer interactions in real time.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwind-css)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?logo=openai)](https://openai.com/)
[![Vapi](https://img.shields.io/badge/Vapi-Voice%20AI-orange)](https://vapi.ai/)
[![Deepgram](https://img.shields.io/badge/Deepgram-Nova--3-13AA52)](https://deepgram.com/)

🌐 **Live Demo:** https://real-estate-ai-agent-vickymaurya1s-projects.vercel.app/dashboard

</div>

---

# ✨ Overview

**EstateCall AI** is a full-stack **AI-powered Real Estate Agency Platform** featuring a **live multilingual voice calling agent**.

Instead of filling out forms or chatting with a bot, visitors can **talk naturally** with **Alexis**, an AI real estate sales executive that can:

- 🎙️ Hold natural voice conversations
- 🏠 Answer property-specific questions
- 💰 Qualify buyers
- 📅 Schedule follow-ups
- 📋 Generate structured lead summaries
- 🌍 Speak **Hindi, Hinglish, and English**

Unlike standalone AI demos, EstateCall AI integrates the voice assistant into a complete real estate management platform including listings, marketplace, bookings, and client portal.

---

# 🚀 Key Features

## 🤖 Live AI Voice Agent

- Real-time AI voice conversations
- Human-like responses
- Multilingual support
- Instant property assistance

Powered by:

- **Vapi**
- **OpenAI GPT-4o**
- **Deepgram Nova-3**

---

## 🏡 Property-Aware Conversations

Alexis knows exactly which property the visitor is viewing.

The AI can answer questions like:

- Price
- Configuration
- Amenities
- Location
- Builder
- Nearby facilities
- Payment plans
- Possession timeline

without hallucinating or inventing information.

---

## 📝 AI Lead Qualification

During the conversation, Alexis automatically collects:

- Buyer Name
- Budget
- Preferred Location
- Property Configuration
- Timeline
- Buying Purpose
- Additional Requirements

Every call becomes a structured CRM lead.

---

## 📊 AI Call Summaries

After every conversation, EstateCall AI automatically generates:

- Customer Intent
- Budget
- Timeline
- Requirements
- Recommended Next Step

No manual note-taking required.

---

## 🏢 Complete Real Estate Agency Dashboard

The project isn't just a voice agent.

It includes an entire agency management platform:

- Dashboard
- Listings Management
- Marketplace
- Buyer Inquiries
- Viewing Bookings
- Reservation Tracking
- Client Portal
- Call Logs

---

## 📞 Call History

Every interaction is stored with:

- Call transcript
- Lead summary
- Search support
- Export to CSV
- Export to JSON

---

# 🎯 User Flow

```text
Visitor opens Property Listing
            │
            ▼
Clicks "Talk to Alexis"
            │
            ▼
Live Voice Conversation
            │
            ▼
AI Qualifies Buyer
            │
            ▼
Answers Property Questions
            │
            ▼
Call Ends
            │
            ▼
AI Generates Lead Summary
            │
            ▼
Saved in Agency Dashboard
```

---

# 🛠️ Tech Stack

| Category | Technology |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Charts | Recharts |
| Animation | Framer Motion |
| Voice Orchestration | Vapi |
| AI Model | OpenAI GPT-4o |
| Speech Recognition | Deepgram Nova-3 |
| State Management | React Context API |
| Storage | localStorage |
| Hosting | Vercel |

---

# 📂 Project Structure

```bash
src/
│
├── app/
│   ├── dashboard/          # Agency Dashboard
│   ├── portal/             # Client Portal
│   ├── listing/[id]/       # Public Property Pages
│   └── api/                # Serverless APIs
│
├── components/             # Shared UI Components
│
├── context/                # Global App State
│
├── lib/                    # Types & Seed Data
│
└── hooks/                  # Custom Hooks
```

---



---


# 🎤 Voice Agent Configuration

The assistant configuration exists in **two places**:

### 1️⃣ Vapi Dashboard

Contains:

- System Prompt
- First Message
- Model
- Voice
- Transcriber

### 2️⃣ `voice-widget.tsx`

Contains:

```ts
variableValues
```



# 🌟 Why EstateCall AI?

✅ Real-time Voice AI

✅ Property-aware conversations

✅ AI Lead Qualification

✅ Automatic CRM summaries

✅ Multilingual (Hindi • Hinglish • English)

✅ Complete Agency Dashboard

✅ Client Portal

✅ Marketplace

✅ Viewing Management

✅ Responsive UI

✅ Production-ready architecture

---

# 🔮 Future Improvements

- PostgreSQL integration
- Authentication
- CRM integrations
- WhatsApp automation
- Email follow-ups
- SMS reminders
- Analytics Dashboard
- RAG-based property knowledge
- Multi-agent support
- Admin panel
- Voice cloning

---

# 🤝 Contributing

Contributions, feature requests, and suggestions are always welcome.

Feel free to fork the project and submit a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a Star!

Built with ❤️ using **Next.js**, **OpenAI**, **Vapi**, and **Deepgram**

</div>
