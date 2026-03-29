import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════
   ET AI-NATIVE NEWS EXPERIENCE — PS 8
   Complete Demo: All 5 Features + Comic Reels
   ET AI Hackathon 2026 × Team INNOVEX
═══════════════════════════════════════════ */

// ─── FONTS & GLOBAL STYLES ───
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bangers&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,900;1,9..40,400&family=Playfair+Display:wght@400;600;700;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.4)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideInLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
    @keyframes slideInRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes typewriter { from{width:0} to{width:100%} }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes scaleIn { from{transform:scale(0.8);opacity:0} to{transform:scale(1);opacity:1} }
    @keyframes gradientFlow { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes popIn { 0%{transform:scale(0) rotate(-10deg);opacity:0} 60%{transform:scale(1.15) rotate(2deg)} 100%{transform:scale(1) rotate(0deg);opacity:1} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes tickerScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  `}</style>
);

// ─── THEME ───
const T = {
  bg: "#0a0a0f",
  card: "#12121a",
  card2: "#1a1a25",
  accent: "#ff3333",
  gold: "#ffd700",
  green: "#00e68a",
  blue: "#4d9fff",
  purple: "#a855f7",
  text: "#ffffff",
  dim: "rgba(255,255,255,0.5)",
  dimmer: "rgba(255,255,255,0.25)",
  font: "'DM Sans', sans-serif",
  display: "'Playfair Display', serif",
  comic: "'Bangers', cursive",
  mono: "'JetBrains Mono', monospace",
};

// ─── TODAY'S REAL NEWS DATA ───
const NEWS_DATA = {
  breaking: [
    {
      id: 1, tag: "BREAKING", time: "2h ago", source: "ET",
      title: "Sensex Crashes 1,300 Points as Israel-Iran War Escalates",
      summary: "Markets in freefall as oil races towards $120/barrel. Nifty at 22,719. India VIX jumps to 22.8 indicating extreme fear.",
      impact: "high", sector: ["Markets", "Oil & Gas"], sentiment: -0.85,
      keyFigure: "₹11L Cr wiped from market cap in single day",
    },
    {
      id: 2, tag: "ALERT", time: "3h ago", source: "BS",
      title: "Rupee Crashes to Record Low of ₹93.71 Against USD",
      summary: "FII outflows + crude surge creates perfect storm. Experts warn of crisis similar to 1991 forex crunch.",
      impact: "high", sector: ["Currency", "Economy"], sentiment: -0.78,
      keyFigure: "₹93.71 — all-time low",
    },
    {
      id: 3, tag: "GEOPOLITICS", time: "4h ago", source: "BS",
      title: "Strait of Hormuz: Iran Warns Enemies Against Sovereignty Violation",
      summary: "20% of world's oil transits this chokepoint. Damaged LNG trains create structural hole in global supply before 2026-27 winter.",
      impact: "high", sector: ["Oil & Gas", "Geopolitics"], sentiment: -0.7,
      keyFigure: "$120/barrel crude oil",
    },
  ],
  markets: [
    {
      id: 4, tag: "RECOVERY", time: "1h ago", source: "ET",
      title: "Tata Steel, Infosys Lead Market Bounce",
      summary: "Steel & IT stocks surge 3-4% on value buying. Asian markets trade higher on US rebound cues.",
      impact: "medium", sector: ["Markets", "IT", "Metals"], sentiment: 0.3,
    },
    {
      id: 5, tag: "COMMODITIES", time: "4h ago", source: "BS",
      title: "Gold Drops ₹10 to ₹1,33,790 Per 10g Amid Global Chaos",
      summary: "Silver also takes a massive hit. Safe haven appeal diminishes as dollar strengthens.",
      impact: "medium", sector: ["Commodities"], sentiment: -0.3,
    },
    {
      id: 6, tag: "IPO", time: "5h ago", source: "ET",
      title: "3 Mainboard IPOs Open This Week — ₹1,900 Cr on Offer",
      summary: "Powerica leads the pack. All issues open March 24-27 amid cautious investor sentiment.",
      impact: "low", sector: ["Markets", "IPO"], sentiment: 0.1,
    },
  ],
  business: [
    {
      id: 7, tag: "AUTO", time: "Today", source: "Honda",
      title: "Honda to Expand India Motorcycle Production to 8M Units by 2028",
      summary: "₹15 billion investment in Rajasthan plant. 2,000 new jobs. Third production line for 125cc and 160cc models.",
      impact: "medium", sector: ["Auto", "Manufacturing"], sentiment: 0.5,
    },
    {
      id: 8, tag: "EV", time: "Today", source: "BW",
      title: "Tata Motors Raises ICE Portfolio Prices by 0.5% from April 2026",
      summary: "Price hike across passenger vehicle segment. Mahindra's Charge_iN & HPCL partner for EV charging at fuel stations.",
      impact: "low", sector: ["Auto", "EV"], sentiment: 0.0,
    },
  ],
};

const USER_PROFILES = {
  investor: { name: "Mutual Fund Investor", icon: "📈", sectors: ["Markets", "IPO", "Commodities"], color: T.green },
  founder: { name: "Startup Founder", icon: "🚀", sectors: ["Business", "EV", "IT", "Manufacturing"], color: T.blue },
  student: { name: "Student / Learner", icon: "🎓", sectors: ["Economy", "Geopolitics", "Auto"], color: T.purple },
};

// ─── SHARED COMPONENTS ───
const Badge = ({ text, color = T.accent, small }) => (
  <span style={{
    background: `${color}22`, color, padding: small ? "2px 8px" : "3px 12px",
    borderRadius: 4, fontSize: small ? 9 : 10, fontWeight: 700,
    fontFamily: T.font, letterSpacing: 1, textTransform: "uppercase",
    border: `1px solid ${color}44`,
  }}>{text}</span>
);

const SentimentDot = ({ val }) => {
  const c = val > 0.2 ? T.green : val < -0.2 ? T.accent : T.gold;
  return <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 }} />;
};

const Card = ({ children, style, onClick, hover = true }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.card, borderRadius: 12, padding: 18,
        border: `1px solid ${hovered && hover ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"}`,
        transition: "all 0.25s ease",
        transform: hovered && hover ? "translateY(-2px)" : "none",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >{children}</div>
  );
};

const Ticker = () => {
  const items = [
    "SENSEX -1,300 ▼", "NIFTY 22,719 ▼", "CRUDE $120 ▲",
    "₹/$ 93.71 ▼", "GOLD ₹1,33,790 ▼", "VIX 22.8 ▲",
    "TATA STEEL +4% ▲", "INFOSYS +2.1% ▲", "HDFC BANK -3% ▼",
  ];
  const txt = items.join("   •   ");
  return (
    <div style={{
      background: "#0d0d14", borderBottom: "1px solid rgba(255,255,255,0.05)",
      overflow: "hidden", height: 28, display: "flex", alignItems: "center",
    }}>
      <div style={{
        display: "flex", whiteSpace: "nowrap",
        animation: "tickerScroll 30s linear infinite",
        fontFamily: T.mono, fontSize: 11, color: T.dim, gap: 0,
      }}>
        <span>{txt}   •   {txt}   •   </span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// FEATURE 1: MY ET — PERSONALIZED NEWSROOM
// ═══════════════════════════════════════
const MyET = () => {
  const [profile, setProfile] = useState("investor");
  const [expandedId, setExpandedId] = useState(null);
  const p = USER_PROFILES[profile];
  const allNews = [...NEWS_DATA.breaking, ...NEWS_DATA.markets, ...NEWS_DATA.business];
  const relevantNews = allNews.sort((a, b) => {
    const aMatch = a.sector?.filter(s => p.sectors.some(ps => s.toLowerCase().includes(ps.toLowerCase()))).length || 0;
    const bMatch = b.sector?.filter(s => p.sectors.some(ps => s.toLowerCase().includes(ps.toLowerCase()))).length || 0;
    return bMatch - aMatch;
  });

  return (
    <div style={{ padding: "0 16px 100px" }}>
      {/* Profile selector */}
      <div style={{ padding: "16px 0 12px" }}>
        <div style={{ fontSize: 11, color: T.dim, fontFamily: T.font, marginBottom: 8, letterSpacing: 1 }}>
          YOUR PERSONA
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {Object.entries(USER_PROFILES).map(([key, val]) => (
            <button key={key} onClick={() => setProfile(key)} style={{
              flex: 1, padding: "10px 8px", borderRadius: 10,
              background: profile === key ? `${val.color}18` : T.card,
              border: `1.5px solid ${profile === key ? val.color : "rgba(255,255,255,0.06)"}`,
              cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 4, transition: "all 0.2s",
            }}>
              <span style={{ fontSize: 20 }}>{val.icon}</span>
              <span style={{
                fontSize: 10, color: profile === key ? val.color : T.dim,
                fontFamily: T.font, fontWeight: 600,
              }}>{val.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Personalized greeting */}
      <div style={{
        padding: "16px 0", borderBottom: `1px solid rgba(255,255,255,0.05)`, marginBottom: 16,
      }}>
        <div style={{
          fontFamily: T.display, fontSize: 22, color: T.text, fontWeight: 700, lineHeight: 1.3,
        }}>
          Good Morning {p.icon}
        </div>
        <div style={{ fontFamily: T.font, fontSize: 13, color: T.dim, marginTop: 4 }}>
          {profile === "investor" && "Your portfolio sectors are under pressure. 3 high-impact alerts."}
          {profile === "founder" && "Auto & EV sectors showing movement. Honda expansion may create opportunities."}
          {profile === "student" && "Major geopolitical event unfolding. Great case study for macroeconomics."}
        </div>
      </div>

      {/* Quick stats for investor */}
      {profile === "investor" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[
            { label: "SENSEX", value: "-1,300", color: T.accent },
            { label: "CRUDE", value: "$120", color: T.gold },
            { label: "₹/USD", value: "93.71", color: T.accent },
          ].map((s, i) => (
            <div key={i} style={{
              background: T.card, borderRadius: 10, padding: "12px 10px",
              textAlign: "center", border: `1px solid ${s.color}22`,
            }}>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: T.mono, letterSpacing: 1 }}>{s.label}</div>
              <div style={{ fontSize: 18, color: s.color, fontFamily: T.mono, fontWeight: 700, marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Personalized feed */}
      <div style={{ fontSize: 11, color: T.dim, fontFamily: T.font, marginBottom: 10, letterSpacing: 1 }}>
        CURATED FOR YOU — {relevantNews.length} STORIES
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {relevantNews.map((news, idx) => (
          <Card key={news.id} onClick={() => setExpandedId(expandedId === news.id ? null : news.id)}
            style={{ animation: `fadeUp 0.4s ${idx * 0.08}s both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <SentimentDot val={news.sentiment} />
                  <Badge text={news.tag} color={
                    news.impact === "high" ? T.accent : news.impact === "medium" ? T.gold : T.blue
                  } small />
                  <span style={{ fontSize: 10, color: T.dimmer, fontFamily: T.font }}>{news.time}</span>
                </div>
                <div style={{
                  fontFamily: T.font, fontSize: 14, color: T.text, fontWeight: 700, lineHeight: 1.4,
                }}>{news.title}</div>
              </div>
              <span style={{ fontSize: 10, color: T.dimmer }}>{expandedId === news.id ? "▲" : "▼"}</span>
            </div>
            {expandedId === news.id && (
              <div style={{ marginTop: 10, animation: "fadeUp 0.3s both" }}>
                <div style={{
                  fontFamily: T.font, fontSize: 13, color: T.dim, lineHeight: 1.6, marginBottom: 8,
                }}>{news.summary}</div>
                {news.keyFigure && (
                  <div style={{
                    background: `${T.accent}12`, padding: "8px 12px", borderRadius: 8,
                    borderLeft: `3px solid ${T.accent}`, marginBottom: 8,
                  }}>
                    <span style={{ fontSize: 11, color: T.accent, fontFamily: T.mono, fontWeight: 600 }}>
                      KEY: {news.keyFigure}
                    </span>
                  </div>
                )}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {news.sector?.map(s => (
                    <span key={s} style={{
                      fontSize: 10, color: T.dimmer, background: "rgba(255,255,255,0.05)",
                      padding: "2px 8px", borderRadius: 4, fontFamily: T.font,
                    }}>#{s}</span>
                  ))}
                </div>
                {/* Student explainer mode */}
                {profile === "student" && (
                  <div style={{
                    marginTop: 10, background: `${T.purple}10`, padding: 12, borderRadius: 8,
                    border: `1px solid ${T.purple}22`,
                  }}>
                    <div style={{ fontSize: 10, color: T.purple, fontFamily: T.font, fontWeight: 700, marginBottom: 4 }}>
                      🎓 EXPLAINER MODE
                    </div>
                    <div style={{ fontSize: 12, color: T.dim, fontFamily: T.font, lineHeight: 1.6 }}>
                      {news.id === 1 && "When oil prices surge, India (which imports 85% of its oil) faces higher costs → inflation rises → RBI may hike rates → markets fall. This is called imported inflation."}
                      {news.id === 2 && "The rupee weakening means India needs more rupees to buy the same barrel of oil or repay dollar-denominated debt. FII = Foreign Institutional Investors who pull money out during uncertainty."}
                      {news.id === 3 && "The Strait of Hormuz is a narrow waterway between Iran and Oman. Any disruption here can cause a global oil supply shock — similar to the 1973 oil crisis."}
                      {![1,2,3].includes(news.id) && "Tap any story for AI-generated context and simplified explanations relevant to your coursework."}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// FEATURE 2: NEWS NAVIGATOR — INTERACTIVE BRIEFINGS
// ═══════════════════════════════════════
const NewsNavigator = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "I've synthesized 12 ET articles about today's market crisis. What would you like to explore?" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [typing, setTyping] = useState(false);

  const sections = [
    {
      title: "What Happened?",
      icon: "⚡",
      content: "The Sensex crashed 1,300 points to 22,719 as the Israel-Iran conflict intensified. Oil raced towards $120/barrel after attacks on Gulf refineries. The rupee hit a record low of ₹93.71. ₹11 lakh crore was wiped from market capitalization in a single day.",
    },
    {
      title: "Why It Matters",
      icon: "🔍",
      content: "India imports 85% of its crude oil. Every $10 increase in crude widens the current account deficit by ~0.4% of GDP. The damaged LNG trains in the Gulf represent a structural supply gap that cannot be closed before winter 2026-27. The VIX at 22.8 signals extreme fear.",
    },
    {
      title: "Who's Affected?",
      icon: "👥",
      content: "Oil marketing companies face margin squeeze. Airlines and logistics companies see costs surge. IT and Metal sectors showed recovery (Tata Steel +4%, Infosys +2.1%). FII outflows accelerating — net sellers of ₹3,200 Cr today. Retail investors lost ₹11 lakh crore in market cap.",
    },
    {
      title: "What's Next?",
      icon: "🔮",
      content: "RBI emergency intervention likely if rupee crosses 94. Fuel price hike of ₹5-8/litre expected within weeks. Markets may remain volatile until ceasefire. Safe havens: IT exporters (benefit from weak rupee), FMCG (defensive), Gold (if dollar weakens). Watch: Hormuz strait shipping routes, Iran's next move, US Fed response.",
    },
  ];

  const quickQuestions = [
    "Should I sell my stocks?",
    "How does this affect SIPs?",
    "Will petrol prices increase?",
    "Compare to 2020 crash",
  ];

  const handleSend = (text) => {
    const q = text || inputVal;
    if (!q.trim()) return;
    setChatMessages(prev => [...prev, { role: "user", text: q }]);
    setInputVal("");
    setTyping(true);
    setTimeout(() => {
      let reply = "";
      if (q.toLowerCase().includes("sell") || q.toLowerCase().includes("stock")) {
        reply = "Historically, panic selling during geopolitical crises has been the worst strategy. In the 2020 COVID crash, markets recovered within 5 months. However, if you hold oil-sensitive stocks (airlines, logistics), consider reducing exposure. IT stocks may actually benefit from a weaker rupee.";
      } else if (q.toLowerCase().includes("sip")) {
        reply = "Continue your SIPs! Market crashes are when SIPs work best — you buy more units at lower prices. Data shows investors who continued SIPs through 2008, 2020 crashes earned 15-18% CAGR over 5 years. This is rupee cost averaging in action.";
      } else if (q.toLowerCase().includes("petrol") || q.toLowerCase().includes("fuel")) {
        reply = "Yes, very likely. With crude at $120, OMCs are currently absorbing losses. A ₹5-8/litre hike is expected within 2-3 weeks. CNG and LPG prices may also rise. Commercial LPG allocation was already increased after the LPG crisis reported on March 21.";
      } else if (q.toLowerCase().includes("2020") || q.toLowerCase().includes("compare")) {
        reply = "The 2020 crash was sharper (-38% in 1 month) but recovered faster. Today's crisis is different — it's supply-driven (oil) not demand-driven (COVID). Supply shocks historically take longer to resolve. However, India's forex reserves are stronger now (>$600B vs $470B in 2020).";
      } else {
        reply = "Based on today's 12 ET articles: The market correction is primarily driven by the Israel-Iran escalation and oil supply disruption. Key factors to watch are the Strait of Hormuz shipping lanes, RBI's forex intervention, and upcoming Fed meeting. Would you like me to dive deeper into any specific aspect?";
      }
      setChatMessages(prev => [...prev, { role: "ai", text: reply }]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div style={{ padding: "0 16px 100px" }}>
      <div style={{ padding: "16px 0 8px" }}>
        <div style={{
          fontFamily: T.display, fontSize: 20, color: T.text, fontWeight: 700,
        }}>📋 Today's Crisis Briefing</div>
        <div style={{ fontFamily: T.font, fontSize: 12, color: T.dim, marginTop: 4 }}>
          Synthesized from 12 ET articles • March 23, 2026
        </div>
      </div>

      {/* Section tabs */}
      <div style={{
        display: "flex", gap: 6, overflowX: "auto", padding: "12px 0",
        scrollbarWidth: "none", msOverflowStyle: "none",
      }}>
        {sections.map((s, i) => (
          <button key={i} onClick={() => setActiveSection(i)} style={{
            padding: "8px 14px", borderRadius: 20, border: "none",
            background: activeSection === i ? T.accent : T.card,
            color: activeSection === i ? "#fff" : T.dim,
            fontSize: 12, fontFamily: T.font, fontWeight: 600,
            cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <span>{s.icon}</span> {s.title}
          </button>
        ))}
      </div>

      {/* Active section content */}
      <Card style={{ marginTop: 8, borderLeft: `3px solid ${T.accent}` }}>
        <div style={{
          fontFamily: T.font, fontSize: 14, color: "rgba(255,255,255,0.85)",
          lineHeight: 1.7,
        }}>
          {sections[activeSection].content}
        </div>
      </Card>

      {/* Interactive Q&A */}
      <div style={{
        marginTop: 20, fontSize: 11, color: T.dim, fontFamily: T.font,
        letterSpacing: 1, marginBottom: 8,
      }}>
        ASK FOLLOW-UP QUESTIONS
      </div>

      {/* Quick questions */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {quickQuestions.map((q, i) => (
          <button key={i} onClick={() => handleSend(q)} style={{
            padding: "6px 12px", borderRadius: 16, border: `1px solid rgba(255,255,255,0.1)`,
            background: T.card, color: T.dim, fontSize: 11, fontFamily: T.font,
            cursor: "pointer", transition: "all 0.2s",
          }}>{q}</button>
        ))}
      </div>

      {/* Chat area */}
      <div style={{
        background: T.card, borderRadius: 12, padding: 14,
        maxHeight: 280, overflowY: "auto", display: "flex",
        flexDirection: "column", gap: 10,
        border: "1px solid rgba(255,255,255,0.05)",
      }}>
        {chatMessages.map((msg, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            animation: `fadeUp 0.3s ${i * 0.1}s both`,
          }}>
            <div style={{
              maxWidth: "85%", padding: "10px 14px", borderRadius: 14,
              background: msg.role === "user" ? T.accent : "rgba(255,255,255,0.06)",
              borderBottomRightRadius: msg.role === "user" ? 4 : 14,
              borderBottomLeftRadius: msg.role === "ai" ? 4 : 14,
            }}>
              <div style={{
                fontSize: 13, color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.8)",
                fontFamily: T.font, lineHeight: 1.5,
              }}>{msg.text}</div>
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", gap: 4, padding: "8px 14px" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: "50%", background: T.dim,
                animation: `float 0.8s ${i * 0.15}s infinite`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Ask about today's crisis..."
          style={{
            flex: 1, padding: "10px 14px", borderRadius: 20,
            background: T.card, border: "1px solid rgba(255,255,255,0.08)",
            color: T.text, fontSize: 13, fontFamily: T.font, outline: "none",
          }}
        />
        <button onClick={() => handleSend()} style={{
          width: 40, height: 40, borderRadius: "50%", border: "none",
          background: T.accent, color: "#fff", fontSize: 16, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>→</button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// FEATURE 3: AI NEWS VIDEO STUDIO (REAL AI)
// ═══════════════════════════════════════

const BG_THEMES = {
  urgent:      "linear-gradient(160deg,#1a0000 0%,#3d0000 50%,#1a0010 100%)",
  analytical:  "linear-gradient(160deg,#050d1a 0%,#0a1f3d 50%,#0d0a2e 100%)",
  informative: "linear-gradient(160deg,#030f0a 0%,#07291a 50%,#071429 100%)",
  neutral:     "linear-gradient(160deg,#0a0a14 0%,#12121e 50%,#0a0a14 100%)",
};
const SCENE_ACCENT = { urgent: T.accent, analytical: T.blue, informative: T.green, neutral: T.gold };

const PRESET_ARTICLES = [
  { label: "Sensex Crash", text: "Sensex crashes 1,300 points to 22,719 as Israel-Iran conflict escalates. Oil races towards $120/barrel. Rupee hits record low of ₹93.71 against USD. ₹11 lakh crore wiped from market cap. India VIX surges to 22.8 — extreme fear. FII outflows of ₹3,200 crore in single session." },
  { label: "Honda Expansion", text: "Honda Motorcycle & Scooter India announces ₹15 billion investment to expand production to 8 million units by 2028. New Rajasthan plant adds third production line for 125cc and 160cc models. 2,000 new jobs to be created. India is Honda's second-largest global market." },
  { label: "EV Revolution", text: "India's EV sector crosses 2 million annual sales milestone. Tata Motors dominates with 62% passenger EV share. Battery costs drop 40% in two years. Government extends FAME-III subsidy by 3 years. Charging network reaches 80,000 stations nationwide." },
];

// Animated stat counter
const StatCounter = ({ target, prefix = "", suffix = "", color }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    if (!end) { setVal(target); return; }
    const step = end / 40;
    const t = setInterval(() => {
      start += step;
      if (start >= end) { setVal(target); clearInterval(t); }
      else setVal(prefix + Number(start.toFixed(1)).toLocaleString("en-IN") + suffix);
    }, 40);
    return () => clearInterval(t);
  }, [target]);
  return <span style={{ color, fontFamily: T.mono, fontWeight: 700 }}>{val || target}</span>;
};

// Animated bar chart
const AnimatedChart = ({ data, color, visible }) => {
  const [heights, setHeights] = useState(data.values.map(() => 0));
  useEffect(() => {
    if (!visible) return;
    const min = Math.min(...data.values);
    const max = Math.max(...data.values);
    const hs = data.values.map(v => ((v - min) / (max - min || 1)) * 55 + 8);
    let i = 0;
    const t = setInterval(() => {
      if (i >= hs.length) { clearInterval(t); return; }
      setHeights(prev => { const n = [...prev]; n[i] = hs[i]; return n; });
      i++;
    }, 90);
    return () => clearInterval(t);
  }, [visible, data]);
  return (
    <div style={{ width: "100%", padding: "0 8px" }}>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: T.mono, marginBottom: 6, letterSpacing: 1 }}>
        {data.label}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 64 }}>
        {data.values.map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{
              width: "100%", height: heights[i], borderRadius: "3px 3px 0 0",
              background: `${color}${Math.round(50 + i * 25).toString(16)}`,
              transition: "height 0.4s cubic-bezier(0.16,1,0.3,1)",
            }} />
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", fontFamily: T.mono }}>
              {data.labels?.[i] || `T${i + 1}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Scene renderer
const SceneView = ({ scene, accent, visible }) => {
  const sceneTypes = {
    title: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", padding: "0 24px", textAlign: "center", gap: 16 }}>
        <span style={{ fontSize: 52, animation: "popIn 0.5s both" }}>{scene.emoji || "📺"}</span>
        <div style={{ fontFamily: T.comic, fontSize: 30, color: "#fff", letterSpacing: 3, lineHeight: 1.1, textShadow: `3px 3px 0 ${accent}44`, animation: "scaleIn 0.5s 0.2s both" }}>
          {scene.title}
        </div>
        {scene.tag && (
          <div style={{ background: accent, color: "#000", padding: "4px 16px", borderRadius: 4, fontSize: 11, fontWeight: 900, fontFamily: T.comic, letterSpacing: 2, animation: "fadeUp 0.4s 0.4s both" }}>
            {scene.tag}
          </div>
        )}
      </div>
    ),
    stat: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 24px", gap: 10 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: T.mono, letterSpacing: 2, animation: "fadeUp 0.3s both" }}>
          KEY FIGURE
        </div>
        <div style={{ fontSize: 46, fontFamily: T.mono, fontWeight: 900, lineHeight: 1, animation: "scaleIn 0.5s 0.1s both" }}>
          <StatCounter target={scene.stat?.value || "—"} color={accent} />
        </div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", fontFamily: T.font, fontWeight: 600, animation: "fadeUp 0.4s 0.2s both" }}>
          {scene.stat?.label}
        </div>
        {scene.stat?.context && (
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: T.font, lineHeight: 1.5, marginTop: 4, animation: "fadeUp 0.4s 0.35s both" }}>
            {scene.stat.context}
          </div>
        )}
      </div>
    ),
    data: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 20px", gap: 12 }}>
        <div style={{ fontSize: 15, color: "#fff", fontFamily: T.font, fontWeight: 700, animation: "fadeUp 0.4s both" }}>{scene.title}</div>
        {scene.chart && <AnimatedChart data={scene.chart} color={accent} visible={visible} />}
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: T.font, lineHeight: 1.5, animation: "fadeUp 0.4s 0.3s both" }}>{scene.narration}</div>
      </div>
    ),
    callout: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 22px", gap: 14 }}>
        <div style={{ fontSize: 12, color: accent, fontFamily: T.mono, letterSpacing: 2, fontWeight: 700, animation: "fadeUp 0.3s both" }}>
          {scene.calloutLabel || "EXPERT INSIGHT"}
        </div>
        <div style={{ fontSize: 17, color: "#fff", fontFamily: T.display, fontWeight: 700, lineHeight: 1.5, borderLeft: `3px solid ${accent}`, paddingLeft: 14, animation: "slideInLeft 0.5s 0.1s both" }}>
          "{scene.quote}"
        </div>
        {scene.attribution && (
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: T.font, animation: "fadeUp 0.4s 0.3s both" }}>
            — {scene.attribution}
          </div>
        )}
      </div>
    ),
    narration: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 22px", gap: 12 }}>
        <span style={{ fontSize: 36, animation: "popIn 0.4s both" }}>{scene.emoji || "📰"}</span>
        <div style={{ fontSize: 15, color: "#fff", fontFamily: T.font, fontWeight: 700, lineHeight: 1.4, animation: "fadeUp 0.4s 0.1s both" }}>{scene.title}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontFamily: T.font, lineHeight: 1.7, animation: "fadeUp 0.4s 0.25s both" }}>{scene.narration}</div>
      </div>
    ),
    summary: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 22px", gap: 10 }}>
        <div style={{ fontSize: 13, color: accent, fontFamily: T.mono, letterSpacing: 2, fontWeight: 700, animation: "fadeUp 0.3s both" }}>WHAT TO WATCH</div>
        {(scene.bullets || []).map((b, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", animation: `slideInLeft 0.4s ${0.1 + i * 0.12}s both` }}>
            <span style={{ color: accent, fontWeight: 900, marginTop: 1 }}>→</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: T.font, lineHeight: 1.5 }}>{b}</span>
          </div>
        ))}
      </div>
    ),
  };
  return sceneTypes[scene.type] || sceneTypes.narration;
};

const VideoStudio = () => {
  const [article, setArticle] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState("");
  const [playing, setPlaying] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [error, setError] = useState("");
  const [sceneDur, setSceneDur] = useState(0);
  const timerRef = useRef(null);

  const SCENE_SECS = 5;

  // Auto-advance scenes
  useEffect(() => {
    clearInterval(timerRef.current);
    if (!playing || !videoData) return;
    setSceneDur(0);
    timerRef.current = setInterval(() => {
      setSceneDur(p => {
        if (p >= SCENE_SECS - 0.05) {
          setSceneIdx(prev => {
            if (prev >= videoData.scenes.length - 1) { setPlaying(false); return prev; }
            return prev + 1;
          });
          return 0;
        }
        return p + 0.05;
      });
    }, 50);
    return () => clearInterval(timerRef.current);
  }, [playing, sceneIdx, videoData]);

  const handleGenerate = async () => {
    if (!article.trim()) return;
    setGenerating(true); setError(""); setVideoData(null); setSceneIdx(0); setPlaying(false);

    const steps = ["Parsing article...", "Writing script...", "Building scenes...", "Generating visuals..."];
    let si = 0;
    setGenStep(steps[si]);
    const stepTimer = setInterval(() => { si = Math.min(si + 1, steps.length - 1); setGenStep(steps[si]); }, 900);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are an AI broadcast news video producer for Economic Times. Transform this news article into a structured broadcast video script.

Article: ${article}

Return ONLY valid JSON (no markdown, no explanation):
{
  "videoTitle": "short punchy title",
  "duration": "60-90 sec",
  "tone": "urgent|analytical|informative",
  "scenes": [
    { "type": "title", "title": "ALL CAPS HEADLINE", "tag": "BREAKING|MARKET|ANALYSIS", "emoji": "relevant emoji" },
    { "type": "stat", "title": "scene heading", "stat": { "value": "₹93.71", "label": "Rupee hits record low", "context": "1-line context" }, "narration": "brief narration" },
    { "type": "data", "title": "chart title", "narration": "narration text", "chart": { "label": "DATA LABEL", "values": [80,90,100,110,115,120], "labels": ["Jan","Feb","Mar","Apr","May","Jun"] } },
    { "type": "narration", "title": "section heading", "narration": "2-3 sentence narration", "emoji": "emoji" },
    { "type": "callout", "calloutLabel": "EXPERT INSIGHT", "quote": "impactful quote or insight max 20 words", "attribution": "Source or Analyst type" },
    { "type": "summary", "title": "What To Watch", "bullets": ["bullet 1", "bullet 2", "bullet 3"] }
  ]
}

Rules: 5-6 scenes total. Use real numbers from article. Make narration punchy broadcast-style. Chart values must be 5-6 realistic numbers.`
          }],
        }),
      });

      clearInterval(stepTimer);
      const d = await res.json();
      const raw = d.content?.[0]?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setVideoData(parsed);
      setSceneIdx(0);
      setPlaying(true);
    } catch (e) {
      clearInterval(stepTimer);
      setError("Generation failed. Check article input and try again.");
    } finally {
      setGenerating(false);
    }
  };

  const scene = videoData?.scenes?.[sceneIdx];
  const tone = videoData?.tone || "analytical";
  const accent = SCENE_ACCENT[tone] || T.accent;
  const bg = BG_THEMES[tone] || BG_THEMES.neutral;
  const progress = videoData ? (sceneIdx / videoData.scenes.length) + (sceneDur / SCENE_SECS) / videoData.scenes.length : 0;

  return (
    <div style={{ padding: "0 16px 100px" }}>
      <div style={{ padding: "16px 0 8px" }}>
        <div style={{ fontFamily: T.display, fontSize: 20, color: T.text, fontWeight: 700 }}>🎬 AI Video Studio</div>
        <div style={{ fontFamily: T.font, fontSize: 12, color: T.dim, marginTop: 3 }}>
          Paste any ET article → AI generates broadcast-quality video
        </div>
      </div>

      {/* Input area */}
      {!videoData && !generating && (
        <div style={{ marginBottom: 14 }}>
          {/* Quick presets */}
          <div style={{ fontSize: 11, color: T.dim, fontFamily: T.font, letterSpacing: 1, marginBottom: 6 }}>
            QUICK LOAD
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
            {PRESET_ARTICLES.map((p, i) => (
              <button key={i} onClick={() => setArticle(p.text)} style={{
                padding: "5px 12px", borderRadius: 16, border: `1px solid ${accent}44`,
                background: `${accent}10`, color: accent, fontSize: 11, fontFamily: T.font,
                cursor: "pointer", fontWeight: 600,
              }}>{p.label}</button>
            ))}
          </div>
          <textarea
            value={article}
            onChange={e => setArticle(e.target.value)}
            placeholder="Paste any ET news article here, or use a quick preset above…"
            style={{
              width: "100%", minHeight: 90, padding: "12px 14px", borderRadius: 12,
              background: T.card, border: `1px solid ${article ? accent + "44" : "rgba(255,255,255,0.07)"}`,
              color: T.text, fontSize: 13, fontFamily: T.font, outline: "none",
              resize: "none", lineHeight: 1.6, transition: "border 0.2s",
            }}
          />
          {error && <div style={{ color: T.accent, fontSize: 12, fontFamily: T.font, marginTop: 6 }}>{error}</div>}
          <button onClick={handleGenerate} disabled={!article.trim()} style={{
            width: "100%", marginTop: 10, padding: "14px", borderRadius: 12, border: "none",
            background: article.trim() ? `linear-gradient(135deg,${T.accent},${T.gold})` : "rgba(255,255,255,0.07)",
            color: article.trim() ? "#000" : T.dimmer, fontFamily: T.font, fontSize: 14,
            fontWeight: 800, cursor: article.trim() ? "pointer" : "not-allowed",
            letterSpacing: 1, transition: "all 0.3s",
          }}>
            ✦ GENERATE AI VIDEO
          </button>
        </div>
      )}

      {/* Generation loader */}
      {generating && (
        <div style={{
          height: 360, display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", background: T.card, borderRadius: 16, gap: 16,
          border: `1px solid ${T.accent}22`,
        }}>
          <div style={{ fontSize: 42, animation: "float 1s infinite" }}>🎬</div>
          <div style={{ fontFamily: T.font, fontWeight: 700, color: T.text, fontSize: 16 }}>Producing your video...</div>
          <div style={{ fontFamily: T.mono, fontSize: 12, color: accent }}>{genStep}</div>
          <div style={{
            width: 200, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden",
          }}>
            <div style={{
              height: "100%", borderRadius: 2,
              backgroundImage: `linear-gradient(90deg,${T.accent},${T.gold},${T.accent})`,
              backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite",
            }} />
          </div>
        </div>
      )}

      {/* Video player */}
      {videoData && scene && !generating && (
        <>
          {/* Screen */}
          <div style={{
            borderRadius: 18, overflow: "hidden", height: 380, position: "relative",
            background: bg, border: `1.5px solid ${accent}33`,
            boxShadow: `0 0 40px ${accent}18`,
          }}>
            {/* Halftone texture */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)",
              backgroundSize: "7px 7px",
            }} />

            {/* Scene content */}
            <div style={{ position: "absolute", inset: 0 }}>
              {videoData.scenes.map((s, i) => (
                <div key={i} style={{
                  position: "absolute", inset: 0,
                  opacity: i === sceneIdx ? 1 : 0,
                  transition: "opacity 0.6s ease",
                  pointerEvents: i === sceneIdx ? "auto" : "none",
                }}>
                  <SceneView scene={s} accent={accent} visible={i === sceneIdx} />
                </div>
              ))}
            </div>

            {/* Progress bar — scene segments */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, display: "flex", gap: 2, padding: "0 10px", zIndex: 10 }}>
              {videoData.scenes.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 2, background: "#fff",
                    width: i < sceneIdx ? "100%" : i === sceneIdx ? `${(sceneDur / SCENE_SECS) * 100}%` : "0%",
                    transition: i === sceneIdx ? "none" : "width 0.2s",
                  }} />
                </div>
              ))}
            </div>

            {/* Watermark */}
            <div style={{
              position: "absolute", top: 12, right: 14, zIndex: 10,
              fontFamily: T.comic, fontSize: 14, color: accent,
              letterSpacing: 2, opacity: 0.7,
            }}>ET AI</div>

            {/* Lower third */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
              background: "linear-gradient(to top,rgba(0,0,0,0.85),transparent)",
              padding: "24px 16px 14px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 9, color: accent, fontFamily: T.mono, letterSpacing: 2, fontWeight: 700 }}>
                    {videoData.videoTitle?.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontFamily: T.font, marginTop: 2 }}>
                    Scene {sceneIdx + 1} of {videoData.scenes.length} • {videoData.duration}
                  </div>
                </div>
                {/* Play/pause */}
                <button onClick={() => setPlaying(p => !p)} style={{
                  width: 38, height: 38, borderRadius: "50%", border: "none",
                  background: accent, color: "#000", fontSize: 14, cursor: "pointer",
                  fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {playing ? "⏸" : "▶"}
                </button>
              </div>
            </div>
          </div>

          {/* Scene selector scrubber */}
          <div style={{ display: "flex", gap: 6, marginTop: 12, overflowX: "auto", paddingBottom: 4 }}>
            {videoData.scenes.map((s, i) => (
              <button key={i} onClick={() => { setSceneIdx(i); setPlaying(true); setSceneDur(0); }} style={{
                flexShrink: 0, padding: "8px 12px", borderRadius: 10,
                background: sceneIdx === i ? `${accent}22` : T.card,
                border: `1px solid ${sceneIdx === i ? accent : "rgba(255,255,255,0.06)"}`,
                cursor: "pointer", display: "flex", flexDirection: "column", gap: 2, alignItems: "center",
              }}>
                <span style={{ fontSize: 16 }}>{s.emoji || { title: "📺", stat: "📊", data: "📈", callout: "💬", narration: "📰", summary: "✅" }[s.type]}</span>
                <span style={{ fontSize: 9, color: sceneIdx === i ? accent : T.dimmer, fontFamily: T.mono, textTransform: "uppercase" }}>
                  {s.type}
                </span>
              </button>
            ))}
          </div>

          {/* Regenerate */}
          <button onClick={() => { setVideoData(null); setPlaying(false); }} style={{
            width: "100%", marginTop: 12, padding: "11px", borderRadius: 12, border: `1px solid rgba(255,255,255,0.08)`,
            background: T.card, color: T.dim, fontFamily: T.font, fontSize: 13, cursor: "pointer",
          }}>
            ↩ New Article
          </button>
        </>
      )}
    </div>
  );
};

// ═══════════════════════════════════════
// FEATURE 4: STORY ARC TRACKER
// ═══════════════════════════════════════
const StoryArcTracker = () => {
  const [activePlayer, setActivePlayer] = useState(null);

  const timeline = [
    { date: "Mar 1", event: "Israel strikes Iranian nuclear facility", sentiment: -0.6, type: "escalation" },
    { date: "Mar 5", event: "Crude oil crosses $80/barrel, Brent hits one-year high", sentiment: -0.4, type: "market" },
    { date: "Mar 10", event: "Iran retaliates — drone attack on Saudi Aramco refinery", sentiment: -0.8, type: "escalation" },
    { date: "Mar 15", event: "US joins airstrikes; Strait of Hormuz shipping disrupted", sentiment: -0.9, type: "escalation" },
    { date: "Mar 19", event: "Sensex drops 2,497 points in worst single-day crash", sentiment: -0.85, type: "market" },
    { date: "Mar 21", event: "Rupee crashes to 93.71; LPG crisis hits India", sentiment: -0.8, type: "market" },
    { date: "Mar 23", event: "Sensex -1300 pts; Oil races to $120; VIX at 22.8", sentiment: -0.9, type: "crisis" },
  ];

  const keyPlayers = [
    { name: "Iran", role: "Conflict Party", stance: "Warns against sovereignty violation. Claims Hormuz remains open.", emoji: "🇮🇷" },
    { name: "Israel", role: "Conflict Party", stance: "Netanyahu vows continued strikes on 'Ayatollah terror regime'.", emoji: "🇮🇱" },
    { name: "RBI", role: "India Regulator", stance: "Expected emergency intervention if rupee crosses 94.", emoji: "🏦" },
    { name: "OPEC", role: "Oil Alliance", stance: "Damaged LNG trains create gap that can't close before winter.", emoji: "🛢️" },
    { name: "FIIs", role: "Foreign Investors", stance: "Net sellers of ₹3,200 Cr today. Outflows accelerating.", emoji: "💸" },
  ];

  const predictions = [
    { text: "Fuel price hike of ₹5-8/litre within 2-3 weeks", confidence: 90, type: "likely" },
    { text: "RBI emergency forex intervention this week", confidence: 75, type: "likely" },
    { text: "Ceasefire or de-escalation within 30 days", confidence: 25, type: "unlikely" },
    { text: "Oil stabilizes below $100 by April end", confidence: 20, type: "unlikely" },
  ];

  return (
    <div style={{ padding: "0 16px 100px" }}>
      <div style={{ padding: "16px 0 12px" }}>
        <div style={{ fontFamily: T.display, fontSize: 20, color: T.text, fontWeight: 700 }}>
          🧭 Story Arc: Israel-Iran Oil Crisis
        </div>
        <div style={{ fontFamily: T.font, fontSize: 12, color: T.dim, marginTop: 4 }}>
          Complete narrative timeline • 23 days tracking
        </div>
      </div>

      {/* Sentiment overview */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: T.dim, fontFamily: T.font, letterSpacing: 1, marginBottom: 10 }}>
          SENTIMENT TRAJECTORY
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 60 }}>
          {timeline.map((t, i) => {
            const h = Math.abs(t.sentiment) * 55 + 5;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: "100%", height: h, borderRadius: "4px 4px 0 0",
                  background: t.sentiment < -0.7 ? T.accent :
                    t.sentiment < -0.3 ? T.gold : T.green,
                  opacity: 0.7 + i * 0.04,
                  transition: "height 0.5s ease",
                }} />
                <span style={{ fontSize: 8, color: T.dimmer, fontFamily: T.mono }}>{t.date.split(" ")[1]}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Timeline */}
      <div style={{ fontSize: 11, color: T.dim, fontFamily: T.font, letterSpacing: 1, marginBottom: 8 }}>
        TIMELINE
      </div>
      <div style={{ position: "relative", paddingLeft: 20, marginBottom: 20 }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute", left: 5, top: 0, bottom: 0, width: 2,
          background: "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,51,51,0.5))",
        }} />
        {timeline.map((t, i) => (
          <div key={i} style={{
            position: "relative", marginBottom: 14,
            animation: `slideInLeft 0.4s ${i * 0.08}s both`,
          }}>
            <div style={{
              position: "absolute", left: -18, top: 4, width: 10, height: 10,
              borderRadius: "50%", border: `2px solid ${t.type === "crisis" ? T.accent : t.type === "escalation" ? T.gold : T.blue}`,
              background: i === timeline.length - 1 ? T.accent : T.bg,
            }} />
            <div style={{
              background: i === timeline.length - 1 ? `${T.accent}12` : T.card,
              padding: "10px 14px", borderRadius: 10,
              border: i === timeline.length - 1 ? `1px solid ${T.accent}33` : "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: T.dimmer, fontFamily: T.mono }}>{t.date}</span>
                <Badge text={t.type} color={t.type === "crisis" ? T.accent : t.type === "escalation" ? T.gold : T.blue} small />
              </div>
              <div style={{ fontSize: 13, color: T.text, fontFamily: T.font, fontWeight: 500, lineHeight: 1.4 }}>
                {t.event}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Players */}
      <div style={{ fontSize: 11, color: T.dim, fontFamily: T.font, letterSpacing: 1, marginBottom: 8 }}>
        KEY PLAYERS
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
        {keyPlayers.map((p, i) => (
          <Card key={i} onClick={() => setActivePlayer(activePlayer === i ? null : i)}
            style={{ minWidth: 130, padding: 14, flexShrink: 0 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{p.emoji}</div>
              <div style={{ fontSize: 13, color: T.text, fontFamily: T.font, fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>{p.role}</div>
            </div>
            {activePlayer === i && (
              <div style={{
                marginTop: 8, fontSize: 11, color: T.dim, fontFamily: T.font,
                lineHeight: 1.5, textAlign: "center", animation: "fadeUp 0.3s both",
              }}>{p.stance}</div>
            )}
          </Card>
        ))}
      </div>

      {/* Predictions */}
      <div style={{ fontSize: 11, color: T.dim, fontFamily: T.font, letterSpacing: 1, marginBottom: 8 }}>
        🔮 WHAT TO WATCH NEXT
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {predictions.map((p, i) => (
          <Card key={i} style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1, fontSize: 13, color: T.text, fontFamily: T.font, lineHeight: 1.4 }}>
                {p.text}
              </div>
              <div style={{
                marginLeft: 12, minWidth: 48, textAlign: "center",
                padding: "4px 8px", borderRadius: 8,
                background: p.confidence > 50 ? `${T.green}18` : `${T.accent}18`,
                color: p.confidence > 50 ? T.green : T.accent,
                fontSize: 13, fontFamily: T.mono, fontWeight: 700,
              }}>{p.confidence}%</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// FEATURE 5: VERNACULAR ENGINE
// ═══════════════════════════════════════
const VernacularEngine = () => {
  const [lang, setLang] = useState("hi");
  const [translating, setTranslating] = useState(false);

  const languages = [
    { code: "hi", name: "हिन्दी", flag: "🇮🇳", label: "Hindi" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳", label: "Tamil" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳", label: "Telugu" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳", label: "Bengali" },
  ];

  const translations = {
    hi: {
      title: "बाज़ार में भारी गिरावट",
      subtitle: "सेंसेक्स 1,300 अंक टूटा — तेल संकट और ईरान-इज़राइल तनाव",
      body: "आज भारतीय शेयर बाज़ार में भूचाल आ गया। बीएसई सेंसेक्स 1,300 अंक गिरकर 22,719 पर बंद हुआ। इसकी सबसे बड़ी वजह है ईरान-इज़राइल युद्ध की वजह से कच्चे तेल की कीमतें $120 प्रति बैरल तक पहुँचना। भारत अपनी ज़रूरत का 85% तेल बाहर से मँगाता है, इसलिए तेल महँगा होने का सीधा असर हमारी अर्थव्यवस्था पर पड़ता है।",
      localContext: "💡 आसान भाषा में: मान लीजिए आपके घर में रसोई गैस का सिलेंडर ₹900 से बढ़कर ₹1,200 हो जाए — तो जैसे आपके बजट पर असर पड़ता है, वैसे ही देश की अर्थव्यवस्था पर पड़ रहा है। पेट्रोल-डीज़ल 2-3 हफ्तों में ₹5-8 महँगा हो सकता है।",
      jargon: [
        { term: "सेंसेक्स", explain: "बॉम्बे स्टॉक एक्सचेंज के टॉप 30 कंपनियों का औसत — ये गिरे तो बाज़ार गिरा" },
        { term: "कच्चा तेल (Crude Oil)", explain: "ज़मीन से निकलने वाला तेल जिससे पेट्रोल-डीज़ल बनता है" },
        { term: "FII (विदेशी निवेशक)", explain: "विदेश से भारत में पैसा लगाने वाले — जब ये बेचते हैं तो बाज़ार गिरता है" },
      ],
    },
    ta: {
      title: "சந்தையில் பேரிடி",
      subtitle: "சென்செக்ஸ் 1,300 புள்ளிகள் சரிவு — எண்ணெய் நெருக்கடி",
      body: "இன்று இந்திய பங்குச்சந்தையில் பெரும் சரிவு ஏற்பட்டது. BSE சென்செக்ஸ் 1,300 புள்ளிகள் வீழ்ந்து 22,719 ஆக முடிவடைந்தது. ஈரான்-இஸ்ரேல் மோதலால் கச்சா எண்ணெய் விலை பீப்பாய்க்கு $120 வரை உயர்ந்தது இதற்கு முக்கிய காரணம்.",
      localContext: "💡 எளிமையாகச் சொன்னால்: உங்கள் வீட்டு சமையல் எரிவாயு சிலிண்டர் ₹900-லிருந்து ₹1,200 ஆக உயர்ந்தால் எப்படி பாதிக்கும் என்று நினையுங்கள் — அதே போல் நாட்டின் பொருளாதாரம் பாதிக்கப்படுகிறது.",
      jargon: [
        { term: "சென்செக்ஸ்", explain: "மும்பை பங்குச்சந்தையின் முதல் 30 நிறுவனங்களின் சராசரி" },
        { term: "கச்சா எண்ணெய்", explain: "பூமியிலிருந்து எடுக்கப்படும் எண்ணெய் — பெட்ரோல், டீசல் இதிலிருந்தே தயாரிக்கப்படுகிறது" },
      ],
    },
    te: {
      title: "మార్కెట్‌లో భారీ పతనం",
      subtitle: "సెన్సెక్స్ 1,300 పాయింట్లు కుప్పకూలింది",
      body: "ఈరోజు భారత స్టాక్ మార్కెట్‌లో భారీ పతనం నమోదైంది. BSE సెన్సెక్స్ 1,300 పాయింట్లు పడిపోయి 22,719 వద్ద ముగిసింది. ఇరాన్-ఇజ్రాయెల్ యుద్ధం వల్ల ముడి చమురు ధర బ్యారెల్‌కు $120కి చేరుకోవడమే ప్రధాన కారణం.",
      localContext: "💡 సరళంగా చెప్పాలంటే: మీ ఇంట్లో గ్యాస్ సిలిండర్ ₹900 నుండి ₹1,200కి పెరిగితే మీ బడ్జెట్‌పై ఎలా ప్రభావం చూపుతుందో, అదే విధంగా దేశ ఆర్థిక వ్యవస్థపై ప్రభావం పడుతోంది.",
      jargon: [
        { term: "సెన్సెక్స్", explain: "ముంబై స్టాక్ ఎక్స్ఛేంజ్‌లో టాప్ 30 కంపెనీల సగటు" },
      ],
    },
    bn: {
      title: "বাজারে ভয়ানক ধস",
      subtitle: "সেনসেক্স ১,৩০০ পয়েন্ট পতন",
      body: "আজ ভারতীয় শেয়ার বাজারে বিশাল পতন হয়েছে। BSE সেনসেক্স ১,৩০০ পয়েন্ট পড়ে ২২,৭১৯-এ বন্ধ হয়েছে। ইরান-ইজরায়েল যুদ্ধের কারণে অপরিশোধিত তেলের দাম ব্যারেল প্রতি $১২০-তে পৌঁছেছে।",
      localContext: "💡 সহজ ভাষায়: আপনার বাড়ির রান্নার গ্যাসের সিলিন্ডার ₹৯০০ থেকে ₹১,২০০ হয়ে গেলে যেমন বাজেটে প্রভাব পড়ে, তেমনি দেশের অর্থনীতিতেও প্রভাব পড়ছে।",
      jargon: [
        { term: "সেনসেক্স", explain: "মুম্বাই স্টক এক্সচেঞ্জের সেরা ৩০টি কোম্পানির গড়" },
      ],
    },
  };

  const t = translations[lang];

  const handleLangChange = (code) => {
    setTranslating(true);
    setTimeout(() => {
      setLang(code);
      setTranslating(false);
    }, 800);
  };

  return (
    <div style={{ padding: "0 16px 100px" }}>
      <div style={{ padding: "16px 0 12px" }}>
        <div style={{ fontFamily: T.display, fontSize: 20, color: T.text, fontWeight: 700 }}>
          🌐 Vernacular News Engine
        </div>
        <div style={{ fontFamily: T.font, fontSize: 12, color: T.dim, marginTop: 4 }}>
          Culturally adapted, not literally translated
        </div>
      </div>

      {/* Language selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {languages.map(l => (
          <button key={l.code} onClick={() => handleLangChange(l.code)} style={{
            flex: 1, padding: "10px 6px", borderRadius: 10,
            background: lang === l.code ? `${T.gold}18` : T.card,
            border: `1.5px solid ${lang === l.code ? T.gold : "rgba(255,255,255,0.06)"}`,
            cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 3, transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 18 }}>{l.name.charAt(0)}</span>
            <span style={{
              fontSize: 10, color: lang === l.code ? T.gold : T.dim,
              fontFamily: T.font, fontWeight: 600,
            }}>{l.label}</span>
          </button>
        ))}
      </div>

      {/* Original English */}
      <Card style={{ marginBottom: 12, opacity: 0.5 }}>
        <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font, marginBottom: 4, letterSpacing: 1 }}>
          ORIGINAL (ENGLISH)
        </div>
        <div style={{ fontSize: 13, color: T.dim, fontFamily: T.font, lineHeight: 1.5 }}>
          Sensex Crashes 1,300 Points as Israel-Iran War Escalates. Markets in freefall as oil races towards $120/barrel...
        </div>
      </Card>

      <div style={{
        textAlign: "center", padding: "6px 0", color: T.gold,
        fontFamily: T.font, fontSize: 12, fontWeight: 600,
      }}>
        ↓ AI-Translated & Culturally Adapted ↓
      </div>

      {/* Translated content */}
      {translating ? (
        <Card style={{ textAlign: "center", padding: 40 }}>
          <div style={{ animation: "float 1s infinite", fontSize: 30, marginBottom: 8 }}>🌐</div>
          <div style={{ color: T.dim, fontFamily: T.font, fontSize: 13 }}>Translating with cultural context...</div>
        </Card>
      ) : (
        <div style={{ animation: "fadeUp 0.4s both" }}>
          <Card style={{
            marginBottom: 12,
            borderLeft: `3px solid ${T.gold}`,
          }}>
            <div style={{
              fontSize: 20, color: T.text, fontWeight: 700, lineHeight: 1.4,
              marginBottom: 6,
            }}>{t.title}</div>
            <div style={{ fontSize: 13, color: T.gold, marginBottom: 12, fontWeight: 500 }}>
              {t.subtitle}
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              {t.body}
            </div>
          </Card>

          {/* Local context adaptation */}
          <Card style={{
            marginBottom: 12, background: `${T.gold}08`,
            border: `1px solid ${T.gold}22`,
          }}>
            <div style={{ fontSize: 11, color: T.gold, fontFamily: T.font, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>
              LOCAL CONTEXT ADAPTATION
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
              {t.localContext}
            </div>
          </Card>

          {/* Jargon explainer */}
          {t.jargon && (
            <>
              <div style={{ fontSize: 11, color: T.dim, fontFamily: T.font, letterSpacing: 1, marginBottom: 8 }}>
                JARGON BUSTER
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {t.jargon.map((j, i) => (
                  <Card key={i} style={{ padding: 12 }}>
                    <div style={{ fontSize: 13, color: T.gold, fontWeight: 700, marginBottom: 3 }}>
                      {j.term}
                    </div>
                    <div style={{ fontSize: 12, color: T.dim, fontFamily: T.font, lineHeight: 1.5 }}>
                      {j.explain}
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════
// FEATURE 6: COMIC REELS (BONUS)
// ═══════════════════════════════════════
const REELS = [
  {
    id: 1, headline: "MARKET\nMELTDOWN", tag: "BREAKING",
    panels: [
      { emoji: "📉", text: "Sensex nosedives to 22,719 as panic grips Dalal Street" },
      { emoji: "🛢️", text: "Oil races towards $120/barrel" },
    ],
    bg: "linear-gradient(135deg, #1a0000, #4a0000, #8b0000)",
    accent: "#ff3333", source: "ET • 2h ago",
  },
  {
    id: 2, headline: "STRAIT OF\nHORMUZ", tag: "GEOPOLITICS",
    panels: [
      { emoji: "⛽", text: "20% of world's oil passes through this narrow strait" },
      { emoji: "💥", text: "Iran warns enemies — sovereignty non-negotiable" },
    ],
    bg: "linear-gradient(135deg, #0a0a2e, #1a1a4e, #2d1b69)",
    accent: "#ffd700", source: "BS • 3h ago",
  },
  {
    id: 3, headline: "₹93.71\nRECORD LOW", tag: "RUPEE CRASH",
    panels: [
      { emoji: "💸", text: "FII outflows + crude surge = perfect storm" },
      { emoji: "🏦", text: "Experts compare to 1991 forex crisis" },
    ],
    bg: "linear-gradient(135deg, #0d1b2a, #1b2838, #2c3e50)",
    accent: "#00e68a", source: "News24 • 5h ago",
  },
  {
    id: 4, headline: "₹11 LAKH CR\nWIPED OUT", tag: "BLOODBATH",
    panels: [
      { emoji: "🔥", text: "BSE market cap drops to ₹427 lakh crore" },
      { emoji: "📊", text: "India VIX jumps to 22.8 — extreme fear" },
    ],
    bg: "linear-gradient(135deg, #1a0a2e, #2d1b4e, #4a1942)",
    accent: "#ff6b6b", source: "ET • Today",
  },
];

const ComicReels = () => {
  const [current, setCurrent] = useState(0);
  const [trans, setTrans] = useState(false);
  const [panelVis, setPanelVis] = useState([false, false]);
  const [touchY, setTouchY] = useState(null);

  const go = useCallback((dir) => {
    if (trans) return;
    setTrans(true);
    if (dir === "up" && current < REELS.length - 1) setCurrent(p => p + 1);
    else if (dir === "down" && current > 0) setCurrent(p => p - 1);
    setTimeout(() => setTrans(false), 500);
  }, [current, trans]);

  useEffect(() => {
    setPanelVis([false, false]);
    const t1 = setTimeout(() => setPanelVis([true, false]), 300);
    const t2 = setTimeout(() => setPanelVis([true, true]), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [current]);

  useEffect(() => {
    const h = (e) => {
      e.preventDefault();
      if (e.deltaY > 15) go("up");
      else if (e.deltaY < -15) go("down");
    };
    window.addEventListener("wheel", h, { passive: false });
    return () => window.removeEventListener("wheel", h);
  }, [go]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); go("up"); }
      if (e.key === "ArrowUp") { e.preventDefault(); go("down"); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go]);

  const r = REELS[current];

  return (
    <div
      onTouchStart={e => setTouchY(e.touches[0].clientY)}
      onTouchEnd={e => {
        if (!touchY) return;
        const d = touchY - e.changedTouches[0].clientY;
        if (Math.abs(d) > 40) go(d > 0 ? "up" : "down");
        setTouchY(null);
      }}
      style={{
        height: "100%", background: r.bg, position: "relative",
        overflow: "hidden", touchAction: "none",
        transition: "background 0.5s ease",
      }}
    >
      {/* Halftone */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "8px 8px", zIndex: 1,
      }} />

      {/* Speed lines */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", right: 0, top: `${10 + i * 9}%`,
            width: `${25 + Math.random() * 35}%`, height: "1px",
            background: `linear-gradient(to left, ${r.accent}18, transparent)`,
          }} />
        ))}
      </div>

      {/* Action word */}
      <div style={{
        position: "absolute", left: "12%", top: "18%",
        fontFamily: T.comic, fontSize: 55, color: r.accent,
        opacity: 0.12, transform: "rotate(-10deg)",
        textShadow: `3px 3px 0 ${r.accent}33`,
        pointerEvents: "none",
      }}>CRASH!</div>

      {/* Tag */}
      <div style={{ position: "absolute", top: 16, left: 20, zIndex: 10 }}>
        <span style={{
          background: r.accent, color: "#000", padding: "4px 14px",
          borderRadius: 4, fontSize: 11, fontWeight: 900,
          fontFamily: T.comic, letterSpacing: 2, transform: "skewX(-5deg)",
          display: "inline-block", boxShadow: `3px 3px 0 ${r.accent}44`,
        }}>{r.tag}</span>
      </div>

      {/* Main content */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 24px", gap: 20, zIndex: 5,
      }}>
        <h1 style={{
          fontFamily: T.comic, fontSize: "clamp(36px, 9vw, 52px)",
          color: "#fff", lineHeight: 1, letterSpacing: 3,
          textShadow: `4px 4px 0 ${r.accent}44, -2px -2px 0 rgba(0,0,0,0.5)`,
          whiteSpace: "pre-line",
        }}>{r.headline}</h1>

        {r.panels.map((p, i) => (
          <div key={i} style={{
            opacity: panelVis[i] ? 1 : 0,
            transform: panelVis[i] ? "translateX(0)" : `translateX(${i % 2 ? 30 : -30}px)`,
            transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
            padding: "14px 16px", borderRadius: i % 2 ? "8px 24px 8px 24px" : "24px 8px 24px 8px",
            background: `${r.accent}15`, border: `2px solid ${r.accent}55`,
            boxShadow: `${i % 2 ? 4 : -4}px 4px 0 ${r.accent}22`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 26 }}>{p.emoji}</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", fontFamily: T.font, fontWeight: 500, lineHeight: 1.5 }}>
                {p.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ position: "absolute", bottom: 80, left: 24, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: `linear-gradient(135deg, ${r.accent}, ${r.accent}88)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 900, color: "#000", fontFamily: T.comic,
          }}>ET</div>
          <span style={{ fontSize: 12, color: T.dim, fontFamily: T.font }}>{r.source}</span>
        </div>
        <div style={{
          marginTop: 8, fontSize: 11, color: T.dimmer, fontFamily: T.font,
          display: "flex", alignItems: "center", gap: 4,
        }}>▲ Swipe up for next</div>
      </div>

      {/* Side dots */}
      <div style={{
        position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 6, zIndex: 10,
      }}>
        {REELS.map((_, i) => (
          <div key={i} style={{
            width: i === current ? 5 : 4, height: i === current ? 18 : 4,
            borderRadius: 3, background: i === current ? "#fff" : "rgba(255,255,255,0.25)",
            transition: "all 0.3s",
          }} />
        ))}
      </div>

      {/* Side actions */}
      <div style={{
        position: "absolute", right: 14, bottom: 140,
        display: "flex", flexDirection: "column", gap: 18, alignItems: "center", zIndex: 10,
      }}>
        {["🤍", "💬", "🔄", "📑"].map((e, i) => (
          <span key={i} style={{ fontSize: 24, cursor: "pointer" }}>{e}</span>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// MAIN APP SHELL
// ═══════════════════════════════════════
export default function ETNewsAI() {
  const [tab, setTab] = useState("myET");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(t);
  }, []);

  const tabs = [
    { id: "myET", icon: "🏠", label: "My ET", color: T.green },
    { id: "navigator", icon: "📋", label: "Briefing", color: T.blue },
    { id: "video", icon: "🎬", label: "Video", color: T.accent },
    { id: "arc", icon: "🧭", label: "Story Arc", color: T.gold },
    { id: "lang", icon: "🌐", label: "भाषा", color: T.purple },
    { id: "reels", icon: "📰", label: "Reels", color: T.accent },
  ];

  if (showSplash) {
    return (
      <div style={{
        width: "100%", height: "100vh", background: "#000",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <GlobalStyles />
        <div style={{
          fontFamily: "'Bangers', cursive", fontSize: 48, color: T.accent,
          letterSpacing: 6, animation: "popIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
          textShadow: `4px 4px 0 ${T.accent}44`,
        }}>ET NEWS AI</div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: T.gold,
          marginTop: 8, animation: "fadeUp 0.6s 0.4s both", letterSpacing: 4, fontWeight: 600,
        }}>AI-NATIVE NEWS EXPERIENCE</div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: T.dimmer,
          marginTop: 16, animation: "fadeUp 0.6s 0.8s both",
        }}>PS 8 • ET AI Hackathon 2026 • Team INNOVEX</div>
        <div style={{
          marginTop: 30, display: "flex", gap: 12,
          animation: "fadeUp 0.6s 1.2s both",
        }}>
          {["📱", "🤖", "🎬", "🌐", "📰"].map((e, i) => (
            <span key={i} style={{
              fontSize: 24, animation: `float 2s ${i * 0.2}s infinite`,
            }}>{e}</span>
          ))}
        </div>
      </div>
    );
  }

  const isReels = tab === "reels";

  return (
    <div style={{
      width: "100%", height: "100vh", background: T.bg,
      display: "flex", flexDirection: "column", overflow: "hidden",
      fontFamily: T.font, color: T.text,
    }}>
      <GlobalStyles />

      {!isReels && (
        <>
          {/* Header */}
          <div style={{
            padding: "10px 16px", display: "flex", justifyContent: "space-between",
            alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: T.bg, flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: T.comic, fontSize: 20, color: T.accent, letterSpacing: 2 }}>ET</span>
              <span style={{ fontSize: 13, color: T.dim, fontWeight: 600 }}>News AI</span>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%", background: T.accent,
                animation: "pulse 1.5s infinite",
              }} />
              <span style={{ fontSize: 11, color: T.dim }}>LIVE</span>
              <span style={{ fontSize: 16 }}>🔔</span>
            </div>
          </div>
          <Ticker />
        </>
      )}

      {/* Content */}
      <div style={{ flex: 1, overflowY: isReels ? "hidden" : "auto", overflowX: "hidden" }}>
        {tab === "myET" && <MyET />}
        {tab === "navigator" && <NewsNavigator />}
        {tab === "video" && <VideoStudio />}
        {tab === "arc" && <StoryArcTracker />}
        {tab === "lang" && <VernacularEngine />}
        {tab === "reels" && <ComicReels />}
      </div>

      {/* Bottom Tab Bar */}
      <div style={{
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "8px 0 10px", borderTop: "1px solid rgba(255,255,255,0.06)",
        background: isReels ? "rgba(0,0,0,0.85)" : T.bg,
        flexShrink: 0, position: isReels ? "fixed" : "relative",
        bottom: 0, left: 0, right: 0, zIndex: 50,
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            opacity: tab === t.id ? 1 : 0.4, transition: "all 0.2s",
            padding: "2px 6px",
          }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span style={{
              fontSize: 9, color: tab === t.id ? t.color : "#fff",
              fontFamily: "'DM Sans', sans-serif", fontWeight: tab === t.id ? 700 : 400,
            }}>{t.label}</span>
            {tab === t.id && (
              <div style={{
                width: 4, height: 4, borderRadius: "50%", background: t.color, marginTop: 1,
              }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
