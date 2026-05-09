import { useState, useEffect } from "react";
import { Logo } from "../components/Navbar";
import "./Home.css";

const TICKER_ITEMS = [
  "USDC/INR ₹83.42", "USDT/INR ₹83.38", "ETH/INR ₹2,48,210", "BTC/INR ₹68,42,000", "AUDD/INR ₹54.12",
  "USDC/INR ₹83.42", "USDT/INR ₹83.38", "ETH/INR ₹2,48,210", "BTC/INR ₹68,42,000", "AUDD/INR ₹54.12",
];

const FEATURES = [
  { icon: "📄", title: "Smart Invoices", desc: "Generate professional invoices in seconds. Auto-fill client details, add payment links, export as PDF.", color: "blue" },
  { icon: "🔗", title: "Payment Links", desc: "One-click payment links your clients can pay from anywhere in the world via USDC or USDT.", color: "green" },
  { icon: "📊", title: "Salary Dashboard", desc: "Track all your stablecoin income in one place. See INR equivalent, conversion history, and tax-ready reports.", color: "purple" },
  { icon: "⚡", title: "Instant Convert", desc: "Auto-detect incoming USDC/USDT and convert to INR at best rates. No manual steps needed.", color: "gold" },
  { icon: "📱", title: "QR Payments", desc: "Your personal QR code lets clients pay you instantly. Works like UPI but for stablecoins globally.", color: "blue" },
  { icon: "🧾", title: "Tax Export", desc: "Export GST-ready reports, income statements, and transaction history for CA or filing.", color: "green" },
  { icon: "🌍", title: "Multi-wallet", desc: "Connect MetaMask, Coinbase Wallet, or any EVM wallet. Route payouts to multiple addresses.", color: "purple" },
  { icon: "🔒", title: "Non-custodial", desc: "We never hold your funds. All transactions happen directly on-chain. Your keys, your crypto.", color: "gold" },
];

const STATS = [
  { value: "₹2.4Cr+", label: "Processed monthly" },
  { value: "8,200+", label: "Active freelancers" },
  { value: "48ms", label: "Avg confirmation" },
  { value: "0.5%", label: "Platform fee" },
];

const HOW = [
  { step: "01", title: "Create your account", desc: "Sign up with email. Connect your crypto wallet in 30 seconds." },
  { step: "02", title: "Generate invoice or QR", desc: "Add your client's email, amount in USD or INR, and share." },
  { step: "03", title: "Client pays via USDC", desc: "They click your link or scan QR. Payment hits your wallet on-chain." },
  { step: "04", title: "Auto-convert to INR", desc: "We auto-swap to INR via best DEX route or hold in stablecoin — your choice." },
];

export default function Home({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="home">
      <div className="mesh-bg" />

      {/* HEADER */}
      <header className={`home-header ${scrolled ? "scrolled" : ""}`}>
        <div className="home-header-inner">
          <div className="home-logo">
            <Logo size={30} />
            <span>CredFlow</span>
          </div>
          <nav className="home-nav">
            <button onClick={() => onNavigate("about")}>About</button>
            <button onClick={() => onNavigate("dashboard")}>Dashboard</button>
          </nav>
          <div className="home-header-cta">
            <button className="btn btn-primary" onClick={() => onNavigate("dashboard")}>
              Launch App →
            </button>
          </div>
        </div>
      </header>

      {/* TICKER */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {TICKER_ITEMS.map((t, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-dot" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Built for India · Powered by Stablecoins
        </div>
        <h1 className="hero-title">
          Get Paid in <span className="hero-highlight">USDC</span><br />
          Like a <span className="hero-highlight2">Global Pro</span>
        </h1>
        <p className="hero-sub">
          CredFlow is the financial layer for Indian freelancers receiving international payments.
          Invoice clients in USD, receive stablecoins, auto-convert to INR — all in one dashboard.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={() => onNavigate("dashboard")}>
            Start Receiving Payments
          </button>
          <button className="btn btn-ghost" onClick={() => onNavigate("about")}>
            How it works
          </button>
        </div>
        <div className="hero-trust">
          <span>🔒 Non-custodial</span>
          <span>·</span>
          <span>⚡ Polygon + Base</span>
          <span>·</span>
          <span>🇮🇳 India-first</span>
          <span>·</span>
          <span>💸 0.5% fee only</span>
        </div>

        {/* Hero card mockup */}
        <div className="hero-card">
          <div className="hero-card-top">
            <div>
              <div className="label">Total Balance</div>
              <div className="hero-card-amount">$4,280.00</div>
              <div className="hero-card-inr">≈ ₹3,56,976</div>
            </div>
            <div className="hero-card-logo">
              <Logo size={40} />
            </div>
          </div>
          <div className="hero-card-divider" />
          <div className="hero-card-row">
            <div className="hero-card-coin">
              <div className="coin coin-usdc">U</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>USDC</div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>3,100.00</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--green2)", fontWeight: 600, fontSize: 13 }}>+$240 today</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>₹20,021</div>
            </div>
          </div>
          <div className="hero-card-row">
            <div className="hero-card-coin">
              <div className="coin coin-usdt">T</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>USDT</div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>1,180.00</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--text2)", fontWeight: 600, fontSize: 13 }}>$1,180.00</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>₹98,384</div>
            </div>
          </div>
          <div className="hero-card-btns">
            <button className="btn btn-primary" style={{ flex: 1, padding: "10px" }} onClick={() => onNavigate("deposit")}>Deposit</button>
            <button className="btn btn-green" style={{ flex: 1, padding: "10px" }} onClick={() => onNavigate("send")}>Send</button>
            <button className="btn btn-ghost" style={{ flex: 1, padding: "10px" }} onClick={() => onNavigate("myqr")}>My QR</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        {STATS.map((s, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="section-header">
          <div className="tag tag-blue" style={{ marginBottom: 12 }}>Everything you need</div>
          <h2>Built for Indian Freelancers</h2>
          <p>Stop losing 5–8% on traditional wire transfers. CredFlow gives you dollar-native infrastructure with seamless INR off-ramp.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
              <div className={`feature-icon feature-icon-${f.color}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="section-header">
          <div className="tag tag-green" style={{ marginBottom: 12 }}>Simple process</div>
          <h2>Start in 4 Steps</h2>
        </div>
        <div className="how-steps">
          {HOW.map((h, i) => (
            <div className="how-step" key={i}>
              <div className="how-step-number">{h.step}</div>
              <div className="how-step-line" />
              <div className="how-step-body">
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COINS SUPPORTED */}
      <section className="coins-section">
        <div className="section-header">
          <h2>Supported Assets</h2>
          <p>Accept payments in the most liquid stablecoins and crypto assets.</p>
        </div>
        <div className="coins-grid">
          {[
            { sym: "USDC", name: "USD Coin", net: "Polygon, Base, Eth", c: "coin-usdc", l: "U" },
            { sym: "USDT", name: "Tether USD", net: "Polygon, Tron, Eth", c: "coin-usdt", l: "T" },
            { sym: "ETH", name: "Ethereum", net: "Ethereum, Base", c: "coin-eth", l: "E" },
            { sym: "INR", name: "Indian Rupee", net: "Auto-converted output", c: "coin-inr", l: "₹" },
          ].map((coin, i) => (
            <div className="coin-card" key={i}>
              <div className={`coin ${coin.c}`} style={{ width: 48, height: 48, fontSize: 20 }}>{coin.l}</div>
              <div className="coin-card-info">
                <div className="coin-card-sym">{coin.sym}</div>
                <div className="coin-card-name">{coin.name}</div>
                <div className="coin-card-net">{coin.net}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-banner-glow" />
        <div className="tag tag-blue" style={{ marginBottom: 16 }}>Start free today</div>
        <h2>Ready to get paid like a global freelancer?</h2>
        <p>Join 8,200+ Indian freelancers already using CredFlow to receive stablecoin payments.</p>
        <button className="btn btn-primary" style={{ marginTop: 24, padding: "16px 40px", fontSize: 16 }} onClick={() => onNavigate("dashboard")}>
          Open your CredFlow account →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="home-footer-brand">
          <Logo size={24} />
          <span>CredFlow</span>
        </div>
        <p>Stablecoin-native payment infrastructure for Indian freelancers. Not a bank. Not a broker. Just rails.</p>
        <div className="home-footer-links">
          <button onClick={() => onNavigate("about")}>About</button>
          <button onClick={() => onNavigate("dashboard")}>Dashboard</button>
          <button onClick={() => onNavigate("invoice")}>Invoice</button>
          <button onClick={() => onNavigate("myqr")}>My QR</button>
        </div>
        <p className="home-footer-legal">© 2025 CredFlow. Demo app. Not financial advice. All transactions are simulated.</p>
      </footer>
    </div>
  );
}
