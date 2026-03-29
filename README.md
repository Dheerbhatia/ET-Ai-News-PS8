# 📰 ET AI News Experience — PS8
### ET AI Hackathon 2026 | Team INNOVEX

> An AI-native news platform that transforms how 50M+ Economic Times readers consume, understand, and interact with financial news — powered by Claude (Anthropic API).

---

## 🚀 Live Demo
🔗 **[View Live App →](https://claude.ai)** *(Claude Artifact — no deployment needed)*

---

## 🧠 Problem Statement (PS8)
Traditional news is static, one-size-fits-all, and jargon-heavy. ET's 50M+ readers range from seasoned investors to first-time market participants — yet everyone gets the same article. We built an AI-native layer that makes every story personal, interactive, visual, and multilingual.

---

## ✨ Features

| Feature | Description |
|---|---|
| **My ET** | Personalized newsroom — investor, founder, or student personas with curated feeds |
| **News Navigator** | AI synthesizes 12+ articles into structured briefings with interactive Q&A |
| **AI Video Studio** | Paste any article → AI generates a 60–90 sec broadcast video with animated data visuals |
| **Story Arc Tracker** | Full narrative timeline, key player positions, sentiment trajectory, predictions |
| **Vernacular Engine** | Culturally adapted translations in Hindi, Tamil, Telugu, Bengali with jargon busters |
| **Comic Reels** | TikTok-style swipeable comic strip news reels |

---

## 🛠️ Tech Stack

```
Frontend       React (JSX) + Tailwind utility classes
AI Engine      Anthropic Claude API (claude-sonnet-4-20250514)
Web Search     Anthropic Web Search Tool (real-time news grounding)
Deployment     Claude Artifacts (zero-infrastructure demo)
Fonts          DM Sans, Playfair Display, Bangers, JetBrains Mono
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- Anthropic API Key ([get one here](https://console.anthropic.com))

### 1. Clone the Repository
```bash
git clone https://github.com/INNOVEX-team/et-ai-news-ps8.git
cd et-ai-news-ps8
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
```
Edit `.env`:
```env
VITE_ANTHROPIC_API_KEY=your_api_key_here
VITE_MODEL=claude-sonnet-4-20250514
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
et-ai-news-ps8/
├── src/
│   ├── components/
│   │   ├── MyET.jsx              # Personalized newsroom
│   │   ├── NewsNavigator.jsx     # AI briefing + chat Q&A
│   │   ├── VideoStudio.jsx       # AI broadcast video generator
│   │   ├── StoryArcTracker.jsx   # Narrative timeline
│   │   ├── VernacularEngine.jsx  # Multilingual adaptation
│   │   └── ComicReels.jsx        # Swipeable news reels
│   ├── lib/
│   │   ├── anthropic.js          # API client + prompt templates
│   │   └── newsData.js           # Sample ET news data
│   ├── App.jsx                   # Main shell + tab navigation
│   └── main.jsx
├── public/
├── .env.example
├── package.json
└── README.md
```

---

## 🤖 AI Architecture

```
User Input (article / profile / query)
        ↓
  Anthropic Claude API
  (claude-sonnet-4-20250514)
        ↓
  Structured JSON Output
  (scenes / translations / Q&A)
        ↓
  React UI Renderer
  (animated visuals / charts / lower-thirds)
```

### Key Prompting Strategies
- **Structured JSON output** with explicit schema in system prompt
- **Role-based persona prompting** for vernacular adaptation
- **Chain-of-thought** for story arc prediction confidence scores
- **Web search grounding** for real-time news verification

---

## 🌐 API Usage

### Video Studio — Script Generation
```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{
      role: "user",
      content: VIDEO_SCRIPT_PROMPT(articleText)
    }]
  })
});
```

### News Navigator — Interactive Q&A
```javascript
// Maintains conversation history for multi-turn Q&A
const messages = [...history, { role: "user", content: userQuestion }];
```

---

## 👥 Team INNOVEX

| Member | Role |
|---|---|
| [Your Name] | Full-Stack + AI Integration |
| [Member 2] | UI/UX Design |
| [Member 3] | Data & Research |

**Institution:** Dayalbagh Educational Institute, Agra
**Hackathon:** ET AI Hackathon 2026 — Problem Statement 8

---

## 📄 License
MIT License — built for ET AI Hackathon 2026

---

*Built with ❤️ using Anthropic Claude API*
