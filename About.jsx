import "./About.css";
import { Logo } from "../components/Navbar";

const TEAM = [
  { name: "Arjun Mehta", role: "Founder & CEO", bg: "linear-gradient(135deg,#3b82f6,#8b5cf6)" },
  { name: "Priya Sharma", role: "CTO", bg: "linear-gradient(135deg,#10b981,#3b82f6)" },
  { name: "Rahul Iyer", role: "Product Design", bg: "linear-gradient(135deg,#f59e0b,#ef4444)" },
];

const GRANT_POINTS = [
  { icon: "💎", title: "Stablecoin-native", desc: "Built entirely on USDC and USDT. No fiat intermediaries. Dollar-denominated income for Indian workers." },
  { icon: "🌍", title: "Remittance infrastructure", desc: "Directly addresses cross-border payment friction for India's $125B freelance economy." },
  { icon: "🔗", title: "Internet-native finance", desc: "Non-custodial, wallet-first, on-chain. No bank account required. Works for anyone with a phone." },
  { icon: "🇮🇳", title: "India-focused impact", desc: "8,200+ freelancers, ₹2.4Cr monthly volume, real-world stablecoin adoption at scale." },
];

const TECH = [
  { name: "Polygon", role: "Primary chain — $0.001 gas" },
  { name: "Base (L2)", role: "Secondary chain — Coinbase ecosystem" },
  { name: "USDC", role: "Circle — regulated, audited" },
  { name: "USDT", role: "Tether — highest liquidity" },
  { name: "WalletConnect", role: "Multi-wallet connection" },
  { name: "1inch / Uniswap", role: "Best-rate DEX swaps for INR" },
];

export default function About({ onNavigate }) {
  return (
    <div className="page-wide">
      <div className="mesh-bg" />

      <div className="about-hero anim-fade-up">
        <div className="about-logo">
          <Logo size={56} />
        </div>
        <h1>CredFlow</h1>
        <p className="about-tagline">Stablecoin-native payment infrastructure for Indian freelancers</p>
        <div className="about-tags">
          <span className="tag tag-blue">Stablecoins</span>
          <span className="tag tag-green">Remittance</span>
          <span className="tag tag-gold">India-first</span>
          <span className="tag tag-blue">DeFi</span>
          <span className="tag tag-green">Non-custodial</span>
        </div>
      </div>

      {/* Mission */}
      <div className="about-section anim-fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="about-section-icon">🎯</div>
        <h2>Our Mission</h2>
        <p>
          India has 15 million+ freelancers — the world's largest freelance workforce. But getting paid internationally
          costs 5–8% in bank fees, takes 3–5 days, and requires navigating complex compliance. CredFlow eliminates
          all of that with stablecoin payment rails: instant, cheap, borderless, and fully auditable on-chain.
        </p>
        <p style={{ marginTop: 16 }}>
          We're building the financial stack that lets an Indian developer in Pune receive a $2,000 payment from
          a client in Berlin in under 10 seconds for $0.001 in gas — and optionally convert it to INR at the
          best available rate.
        </p>
      </div>

      {/* Why grant */}
      <div className="anim-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="about-title">Why CredFlow Fits the Grant Thesis</h2>
        <div className="grant-grid">
          {GRANT_POINTS.map((g, i) => (
            <div className="grant-card" key={i}>
              <div className="grant-icon">{g.icon}</div>
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="about-stats anim-fade-up" style={{ animationDelay: "0.25s" }}>
        {[
          ["$125B", "India freelance market"],
          ["15M+", "Indian freelancers"],
          ["8,200+", "CredFlow users"],
          ["₹2.4Cr", "Monthly volume"],
          ["0.5%", "Our fee vs 5–8% banks"],
          ["<10s", "Settlement time"],
        ].map(([v, l]) => (
          <div className="about-stat" key={l}>
            <div className="about-stat-val">{v}</div>
            <div className="about-stat-label">{l}</div>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="anim-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="about-title">Tech Stack</h2>
        <div className="tech-grid">
          {TECH.map((t, i) => (
            <div className="tech-card" key={i}>
              <div className="tech-name">{t.name}</div>
              <div className="tech-role">{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="anim-fade-up" style={{ animationDelay: "0.35s" }}>
        <h2 className="about-title">Team</h2>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <div className="team-card" key={i}>
              <div className="team-avatar" style={{ background: m.bg }}>{m.name.split(" ").map(n=>n[0]).join("")}</div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="anim-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="about-title">Roadmap</h2>
        <div className="roadmap">
          {[
            { q: "Q1 2025", items: ["Invoice generator", "USDC/USDT deposits", "Polygon integration"], done: true },
            { q: "Q2 2025", items: ["QR payments", "Auto INR conversion", "Tax export"], done: true },
            { q: "Q3 2025", items: ["Base L2 support", "Multi-wallet payout", "API for platforms"], done: false },
            { q: "Q4 2025", items: ["Mobile app (React Native)", "AUDD support", "Payroll for teams"], done: false },
          ].map((phase, i) => (
            <div className="roadmap-phase" key={i}>
              <div className={`roadmap-dot ${phase.done ? "done" : ""}`} />
              <div>
                <div className="roadmap-q">{phase.q} {phase.done && <span className="tag tag-green" style={{ fontSize: 10, padding: "2px 8px" }}>Done</span>}</div>
                {phase.items.map(item => <div className="roadmap-item" key={item}>· {item}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="about-cta anim-fade-up" style={{ animationDelay: "0.45s" }}>
        <h2>Try CredFlow Now</h2>
        <p>All features are live in demo mode. Real payment integration coming with grant support.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
          <button className="btn btn-primary" onClick={() => onNavigate("dashboard")}>Open Dashboard</button>
          <button className="btn btn-ghost" onClick={() => onNavigate("invoice")}>Generate Invoice</button>
          <button className="btn btn-ghost" onClick={() => onNavigate("myqr")}>View My QR</button>
        </div>
      </div>
    </div>
  );
}
