# ET AI News Experience — PS8

**ET AI Hackathon 2026 | Team DHAIRYA**

---

## What this is

Most news apps just throw articles at you. This one actually helps you 
*follow* a story — across days, sources, and context — so you're not 
starting from zero every time you open the app.

Built for the Economic Times AI Hackathon 2026 (Problem Statement 8), 
this is a web app that tracks how news stories evolve over time, surfaces 
what matters, and presents it in a way that feels like a conversation 
rather than a feed.

---

## Features

- **Story Arc Tracking** — follow a news topic as it develops, not just 
  the latest headline
- **AI Summarization** — cuts through the noise so you get what matters
- **Live Web Search** — pulls current articles and synthesizes them in 
  real-time
- **Clean, readable UI** — built to be easy on the eyes, not just 
  functional
- Works fully in the browser — no backend setup needed

---

## Tech Stack

- **Frontend** — Vanilla HTML/CSS/JS (single-file app)
- **AI** — LLM API integration
- **Build** — Vite

---

## Getting Started

Clone the repo and install dependencies:
```bash
git clone https://github.com/Dheerbhatia/ET-Ai-News-PS8.git
cd ET-Ai-News-PS8
npm install
```

Add your API key — copy `.env.example` to `.env` and fill it in:
```bash
cp .env.example .env
```

Then open `.env` and set:
```
VITE_ANTHROPIC_API_KEY=your_key_here
```

Run the app:
```bash
npm run dev
```

Open `http://localhost:5173` and you're good to go.

---

## Project Structure
```
ET-Ai-News-PS8/
├── src/              # App source
├── index.html        # Entry point
├── vite.config.js    # Vite config
├── package.json
└── .env.example      # API key template
```

---

## Team

**DHAIRYA** — built this during ET AI Hackathon 2026.

---

## Notes

Built fast, under hackathon conditions — rough edges exist. The core 
idea holds up though: AI should help you *understand* news, not just 
consume more of it.

Don't commit your `.env` file.
