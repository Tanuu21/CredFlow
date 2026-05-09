import { useState } from "react";
import "./Dashboard.css";

const TRANSACTIONS = [
  { id: 1, type: "received", from: "Acme Corp", coin: "USDC", amount: 850, inr: 70907, date: "Today, 2:14 PM", status: "confirmed" },
  { id: 2, type: "received", from: "TechStart GmbH", coin: "USDT", amount: 1200, inr: 100056, date: "Yesterday, 9:41 AM", status: "confirmed" },
  { id: 3, type: "sent", from: "Rahul Sharma", coin: "USDC", amount: 50, inr: 4171, date: "May 8, 6:30 PM", status: "confirmed" },
  { id: 4, type: "converted", from: "Auto-convert", coin: "INR", amount: 83420, inr: 83420, date: "May 7, 11:00 AM", status: "confirmed" },
  { id: 5, type: "received", from: "Freelance HQ", coin: "USDC", amount: 320, inr: 26694, date: "May 6, 3:22 PM", status: "confirmed" },
  { id: 6, type: "sent", from: "Priya Menon", coin: "USDT", amount: 200, inr: 16676, date: "May 5, 7:45 PM", status: "confirmed" },
];

const CHART_DATA = [28, 45, 32, 67, 55, 89, 72, 94, 80, 110, 98, 130];
const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

export default function Dashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = TRANSACTIONS.filter(t =>
    activeTab === "all" ? true : t.type === activeTab
  );

  return (
    <div className="page">
      <div className="mesh-bg" />

      {/* WELCOME */}
      <div className="dash-welcome anim-fade-up">
        <div>
          <div className="label">Good afternoon</div>
          <h1 className="dash-name">Arjun Mehta 👋</h1>
        </div>
        <button className="btn btn-ghost" style={{ padding: "10px 16px", fontSize: 13 }}>
          ⚙ Settings
        </button>
      </div>

      {/* BALANCE CARD */}
      <div className="balance-card anim-fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="balance-card-glow" />
        <div className="label" style={{ color: "rgba(255,255,255,0.5)" }}>Total Portfolio Value</div>
        <div className="balance-amount">$4,280.00</div>
        <div className="balance-inr">≈ ₹3,56,976 INR</div>
        <div className="balance-change">
          <span className="tag tag-green">↑ +$240 today (+5.9%)</span>
        </div>
        <div className="balance-actions">
          <button className="balance-btn" onClick={() => onNavigate("deposit")}>
            <span>↓</span> Deposit
          </button>
          <button className="balance-btn" onClick={() => onNavigate("send")}>
            <span>↑</span> Send
          </button>
          <button className="balance-btn" onClick={() => onNavigate("invoice")}>
            <span>◻</span> Invoice
          </button>
          <button className="balance-btn" onClick={() => onNavigate("myqr")}>
            <span>⬡</span> My QR
          </button>
        </div>
      </div>

      {/* ASSETS */}
      <div className="section-title" style={{ animationDelay: "0.2s" }}>
        My Assets
      </div>
      <div className="assets-list anim-fade-up" style={{ animationDelay: "0.2s" }}>
        {[
          { coin: "USDC", l: "U", cls: "coin-usdc", balance: 3100, inr: 258602, change: "+5.2%", pct: 72, up: true },
          { coin: "USDT", l: "T", cls: "coin-usdt", balance: 1180, inr: 98384, change: "+0.1%", pct: 28, up: true },
          { coin: "ETH", l: "E", cls: "coin-eth", balance: "0.00 ETH", inr: 0, change: "—", pct: 0, up: null },
        ].map((a, i) => (
          <div className="asset-row" key={i}>
            <div className="coin-circle">
              <div className={`coin ${a.cls}`}>{a.l}</div>
            </div>
            <div className="asset-info">
              <div className="asset-name">{a.coin}</div>
              <div className="asset-net">via Polygon</div>
            </div>
            <div className="asset-bar-wrap">
              <div className="progress">
                <div className="progress-bar" style={{ width: `${a.pct}%`, background: a.up ? "var(--accent)" : "var(--text3)" }} />
              </div>
            </div>
            <div className="asset-vals">
              <div className="asset-bal">{typeof a.balance === "number" ? `$${a.balance.toLocaleString()}` : a.balance}</div>
              <div className="asset-inr">{a.inr ? `₹${a.inr.toLocaleString()}` : "₹0"}</div>
            </div>
            <div className={`asset-change ${a.up === true ? "up" : a.up === false ? "dn" : "na"}`}>{a.change}</div>
          </div>
        ))}
      </div>

      {/* MINI CHART */}
      <div className="card anim-fade-up" style={{ animationDelay: "0.3s", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div className="section-title" style={{ margin: 0, fontSize: 16 }}>Income History</div>
          <span className="tag tag-blue">USD/month</span>
        </div>
        <MiniChart data={CHART_DATA} />
        <div className="chart-months">
          {MONTHS.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>

      {/* PENDING INVOICES */}
      <div className="card anim-fade-up" style={{ animationDelay: "0.35s", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div className="section-title" style={{ margin: 0, fontSize: 16 }}>Pending Invoices</div>
          <button className="btn btn-ghost" style={{ padding: "6px 14px", fontSize: 12 }} onClick={() => onNavigate("invoice")}>View all</button>
        </div>
        {[
          { client: "Acme Corp", amount: "$1,500", due: "May 15", status: "pending" },
          { client: "TechStart GmbH", amount: "$800", due: "May 18", status: "overdue" },
        ].map((inv, i) => (
          <div className="invoice-row" key={i}>
            <div className="invoice-avatar">{inv.client[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{inv.client}</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>Due {inv.due}</div>
            </div>
            <div style={{ fontWeight: 700, fontFamily: "Syne, sans-serif" }}>{inv.amount}</div>
            <span className={`tag ${inv.status === "overdue" ? "tag-red" : "tag-gold"}`}>
              {inv.status}
            </span>
          </div>
        ))}
      </div>

      {/* TRANSACTIONS */}
      <div className="section-title anim-fade-up" style={{ animationDelay: "0.4s" }}>Transactions</div>
      <div className="tabs anim-fade-up" style={{ animationDelay: "0.4s" }}>
        {["all", "received", "sent", "converted"].map(t => (
          <button key={t} className={`tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="tx-list anim-fade-up" style={{ animationDelay: "0.45s" }}>
        {filtered.map(tx => (
          <div className="tx-row" key={tx.id}>
            <div className={`tx-icon ${tx.type}`}>
              {tx.type === "received" ? "↓" : tx.type === "sent" ? "↑" : "↻"}
            </div>
            <div className="tx-info">
              <div className="tx-from">{tx.from}</div>
              <div className="tx-date">{tx.date}</div>
            </div>
            <div className="tx-amount-wrap">
              <div className={`tx-amount ${tx.type === "received" ? "pos" : tx.type === "sent" ? "neg" : "neu"}`}>
                {tx.type === "received" ? "+" : tx.type === "sent" ? "-" : ""}
                {tx.coin === "INR" ? "₹" : "$"}{tx.coin === "INR" ? tx.inr.toLocaleString() : tx.amount}
              </div>
              <div className="tx-coin-tag">{tx.coin}</div>
            </div>
          </div>
        ))}
      </div>

      {/* TAX EXPORT */}
      <div className="card anim-fade-up" style={{ animationDelay: "0.5s", marginTop: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 32 }}>🧾</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Tax Report — FY 2024-25</div>
            <div style={{ fontSize: 13, color: "var(--text2)" }}>Export GST-ready income statement for CA filing</div>
          </div>
          <button className="btn btn-outline" style={{ padding: "10px 16px", fontSize: 13, flexShrink: 0 }}>
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniChart({ data }) {
  const max = Math.max(...data);
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (v / max) * 85,
  }));
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${path} L 100 100 L 0 100 Z`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: 100, display: "block" }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#chartGrad)" />
      <path d={path} fill="none" stroke="var(--accent2)" strokeWidth="1.5" />
      {points.map((p, i) => i === points.length - 1 && (
        <circle key={i} cx={p.x} cy={p.y} r="2" fill="var(--accent2)" />
      ))}
    </svg>
  );
}
