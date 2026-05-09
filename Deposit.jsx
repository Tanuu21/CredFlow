import { useState } from "react";
import "./Deposit.css";

const METHODS = [
  { id: "upi", icon: "₹", label: "UPI / INR", desc: "Pay via UPI, bank transfer, or net banking", badge: "Popular", color: "gold" },
  { id: "usdc", icon: "U", label: "USDC", desc: "Send USDC from any wallet (Polygon, Base, Eth)", badge: "Recommended", color: "blue" },
  { id: "usdt", icon: "T", label: "USDT", desc: "Send Tether USD from MetaMask or exchange", badge: null, color: "green" },
  { id: "crypto", icon: "⬡", label: "Other Crypto", desc: "ETH, BNB, MATIC — auto-swapped to USDC", badge: null, color: "purple" },
];

const RATES = { USDC: 83.42, USDT: 83.38, ETH: 248210, INR: 1 };

const NETWORKS = {
  usdc: ["Polygon (fast, $0.001)", "Base (L2, $0.002)", "Ethereum ($2–5)"],
  usdt: ["Polygon", "Tron TRC-20", "Ethereum ERC-20"],
  crypto: ["Ethereum", "BNB Chain", "Polygon"],
};

const DEPOSIT_ADDRESSES = {
  usdc: "0x742d35Cc6634C0532925a3b8D4C9E0B9B5F3e124",
  usdt: "0x742d35Cc6634C0532925a3b8D4C9E0B9B5F3e124",
  crypto: "0x742d35Cc6634C0532925a3b8D4C9E0B9B5F3e124",
};

export default function Deposit({ onNavigate }) {
  const [method, setMethod] = useState(null);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [network, setNetwork] = useState(0);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    showToast("Address copied!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const usdAmt = parseFloat(amount) || 0;
  const inrEquiv = currency === "USD" ? (usdAmt * 83.42).toFixed(2) : (usdAmt / 83.42).toFixed(2);

  return (
    <div className="page">
      <div className="mesh-bg" />
      {toast && <div className={`toast ${toast.type}`}>✓ {toast.msg}</div>}

      <div className="page-header anim-fade-up">
        <button className="back-btn" onClick={() => onNavigate("dashboard")}>← Back</button>
        <h1 className="page-title">Deposit</h1>
        <div />
      </div>

      {/* Method selection */}
      {!method && (
        <>
          <p className="page-sub anim-fade-up" style={{ animationDelay: "0.1s" }}>
            Choose how you want to fund your CredFlow wallet
          </p>
          <div className="method-grid anim-fade-up" style={{ animationDelay: "0.15s" }}>
            {METHODS.map(m => (
              <button key={m.id} className="method-card" onClick={() => setMethod(m.id)}>
                <div className={`method-icon method-icon-${m.color}`}>{m.icon}</div>
                {m.badge && <span className={`tag tag-${m.color === "gold" ? "gold" : m.color === "blue" ? "blue" : "green"}`} style={{ position: "absolute", top: 16, right: 16, fontSize: 11 }}>{m.badge}</span>}
                <div className="method-label">{m.label}</div>
                <div className="method-desc">{m.desc}</div>
              </button>
            ))}
          </div>

          {/* Live rates */}
          <div className="card anim-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="label" style={{ marginBottom: 14 }}>Live Rates (INR)</div>
            {Object.entries(RATES).map(([sym, rate]) => (
              <div key={sym} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
                  <div className={`coin coin-${sym.toLowerCase()}`}>{sym === "INR" ? "₹" : sym[0]}</div>
                  {sym}
                </div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "var(--text2)" }}>
                  ₹{rate.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* UPI / INR Flow */}
      {method === "upi" && (
        <div className="anim-scale-in">
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="method-header">
              <div className="coin coin-inr">₹</div>
              <div>
                <div style={{ fontWeight: 700 }}>Deposit via UPI / INR</div>
                <div style={{ fontSize: 13, color: "var(--text3)" }}>Bank transfer or UPI payment</div>
              </div>
            </div>
            <div className="divider" />
            <div className="input-wrap">
              <label>Amount</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="number" placeholder="0.00" value={amount}
                  onChange={e => setAmount(e.target.value)} style={{ flex: 1 }}
                />
                <select value={currency} onChange={e => setCurrency(e.target.value)}
                  style={{ width: 90, background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 12px", color: "var(--text)", fontFamily: "DM Sans, sans-serif" }}>
                  <option>INR</option>
                  <option>USD</option>
                </select>
              </div>
              {amount && (
                <div style={{ marginTop: 8, fontSize: 13, color: "var(--text3)" }}>
                  ≈ {currency === "INR" ? `$${inrEquiv}` : `₹${inrEquiv}`}
                </div>
              )}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="label" style={{ marginBottom: 16 }}>Payment Options</div>
            {[
              { name: "UPI ID", value: "credflow@ybl", icon: "📱" },
              { name: "Account Number", value: "1234 5678 9012 3456", icon: "🏦" },
              { name: "IFSC Code", value: "HDFC0001234", icon: "🔢" },
            ].map((item, i) => (
              <div key={i} className="bank-row">
                <span className="bank-icon">{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div className="label" style={{ margin: 0 }}>{item.name}</div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15 }}>{item.value}</div>
                </div>
                <button className="copy-btn" onClick={() => handleCopy(item.value)}>Copy</button>
              </div>
            ))}
          </div>

          <div className="info-box">
            <div style={{ fontWeight: 600, marginBottom: 6 }}>ℹ️ How it works</div>
            <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>
              Send INR to the above account. We detect the transfer and credit equivalent USDC to your wallet within 15–30 minutes at live rate. Min deposit: ₹500.
            </div>
          </div>
          <button className="btn btn-gold btn-full" style={{ marginTop: 16 }} onClick={() => showToast("Payment instruction sent to your email!")}>
            Send Payment Instructions →
          </button>
          <button className="btn btn-ghost btn-full" style={{ marginTop: 10 }} onClick={() => setMethod(null)}>← Change Method</button>
        </div>
      )}

      {/* USDC / USDT / Crypto flow */}
      {(method === "usdc" || method === "usdt" || method === "crypto") && (
        <div className="anim-scale-in">
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="method-header">
              <div className={`coin ${method === "usdc" ? "coin-usdc" : method === "usdt" ? "coin-usdt" : "coin-eth"}`}>
                {method === "usdc" ? "U" : method === "usdt" ? "T" : "⬡"}
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>Deposit {method.toUpperCase()}</div>
                <div style={{ fontSize: 13, color: "var(--text3)" }}>Send from any wallet or exchange</div>
              </div>
            </div>

            <div className="divider" />

            {/* Network selector */}
            <div className="label">Select Network</div>
            <div className="network-tabs">
              {(NETWORKS[method] || []).map((net, i) => (
                <button key={i} className={`network-tab ${network === i ? "active" : ""}`} onClick={() => setNetwork(i)}>
                  {net}
                </button>
              ))}
            </div>

            {/* Address */}
            <div className="label" style={{ marginTop: 20 }}>Your Deposit Address</div>
            <div className="address-box">
              <div className="address-text">{DEPOSIT_ADDRESSES[method]}</div>
              <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={() => handleCopy(DEPOSIT_ADDRESSES[method])}>
                {copied ? "✓" : "Copy"}
              </button>
            </div>

            {/* QR */}
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <div className="deposit-qr">
                <QRBlock address={DEPOSIT_ADDRESSES[method]} />
              </div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 8 }}>Scan with your wallet to send</div>
            </div>
          </div>

          <div className="warning-box">
            ⚠️ Only send <strong>{method.toUpperCase()}</strong> on the selected network.
            Sending wrong asset or network may result in permanent loss.
          </div>

          <button className="btn btn-ghost btn-full" style={{ marginTop: 16 }} onClick={() => setMethod(null)}>← Change Method</button>
        </div>
      )}
    </div>
  );
}

function QRBlock({ address }) {
  // SVG QR-like pattern for demo
  const cells = [];
  const seed = address.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  for (let r = 0; r < 13; r++) {
    for (let c = 0; c < 13; c++) {
      const isCorner = (r < 3 && c < 3) || (r < 3 && c > 9) || (r > 9 && c < 3);
      const filled = isCorner || ((seed * (r + 1) * (c + 1)) % 3 !== 0);
      cells.push({ r, c, filled });
    }
  }
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" style={{ display: "block", margin: "0 auto" }}>
      <rect width="130" height="130" rx="12" fill="white" />
      {cells.map(({ r, c, filled }) => filled && (
        <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="8" height="8" rx="1" fill="#0d1420" />
      ))}
    </svg>
  );
}
