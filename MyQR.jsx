import { useState } from "react";
import "./MyQR.css";

const MY_ADDRESS = "0x742d35Cc6634C0532925a3b8D4C9E0B9B5F3e124";
const MY_PAYMENT_LINK = "credflow.io/pay/arjun-mehta";

export default function MyQR({ onNavigate }) {
  const [coin, setCoin] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000); };
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(label);
    showToast(`${label} copied!`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="page">
      <div className="mesh-bg" />
      {toast && <div className="toast success">✓ {toast}</div>}

      <div className="page-header anim-fade-up">
        <button className="back-btn" onClick={() => onNavigate("dashboard")}>← Back</button>
        <h1 className="page-title">My QR Code</h1>
        <div />
      </div>

      <p className="page-sub anim-fade-up" style={{ animationDelay: "0.1s" }}>
        Share your QR or payment link so anyone can send you stablecoins instantly.
      </p>

      {/* Profile card */}
      <div className="qr-profile-card anim-fade-up" style={{ animationDelay: "0.15s" }}>
        <div className="qr-profile-avatar">AM</div>
        <div>
          <div className="qr-profile-name">Arjun Mehta</div>
          <div className="qr-profile-handle">@arjun-mehta · CredFlow</div>
        </div>
        <span className="tag tag-green" style={{ marginLeft: "auto" }}>Verified</span>
      </div>

      {/* Coin selector */}
      <div className="qr-coin-row anim-fade-up" style={{ animationDelay: "0.2s" }}>
        {["USDC", "USDT", "ETH"].map(c => (
          <button key={c} className={`qr-coin-btn ${coin === c ? "active" : ""}`} onClick={() => setCoin(c)}>
            <div className={`coin coin-${c.toLowerCase()}`} style={{ width: 28, height: 28, fontSize: 13 }}>{c[0]}</div>
            {c}
          </button>
        ))}
      </div>

      {/* Amount (optional) */}
      <div className="input-wrap anim-fade-up" style={{ animationDelay: "0.22s" }}>
        <label>Request Amount (optional)</label>
        <div style={{ position: "relative" }}>
          <input
            type="number" placeholder="Leave blank for any amount"
            value={amount} onChange={e => setAmount(e.target.value)}
            style={{ paddingRight: 80 }}
          />
          <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 13, fontWeight: 700, color: "var(--text3)" }}>{coin}</div>
        </div>
        {amount && (
          <div style={{ marginTop: 6, fontSize: 12, color: "var(--text3)" }}>
            ≈ ₹{(parseFloat(amount) * 83.42).toLocaleString()}
          </div>
        )}
      </div>

      {/* Main QR */}
      <div className="qr-main-card anim-scale-in" style={{ animationDelay: "0.25s" }}>
        <div className="qr-label-row">
          <span className="label" style={{ margin: 0 }}>Scan to pay · {coin}</span>
          {amount && <span className="tag tag-blue">{amount} {coin}</span>}
        </div>
        <div className="qr-container">
          <div className="qr-glow" />
          <div className="qr-wrapper">
            <BigQR address={MY_ADDRESS + coin + amount} />
          </div>
          <div className="qr-logo-center">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#3b82f6"/>
              <path d="M16 7L23 11V21L16 25L9 21V11L16 7Z" fill="none" stroke="white" strokeWidth="1.5"/>
              <path d="M16 11L20 13V19L16 21L12 19V13L16 11Z" fill="rgba(255,255,255,0.9)"/>
              <circle cx="16" cy="16" r="2" fill="#0d1420"/>
            </svg>
          </div>
        </div>
        <div className="qr-network-hint">Polygon · Base · Ethereum accepted</div>
      </div>

      {/* Share options */}
      <div className="qr-share-section anim-fade-up" style={{ animationDelay: "0.3s" }}>
        <div className="label" style={{ marginBottom: 14 }}>Share Options</div>

        {/* Payment link */}
        <div className="qr-share-row">
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>Payment Link</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "var(--accent2)" }}>
              {MY_PAYMENT_LINK}{amount ? `?amount=${amount}&coin=${coin}` : ""}
            </div>
          </div>
          <button className={`copy-btn ${copied === "Link" ? "copied" : ""}`}
            onClick={() => handleCopy(MY_PAYMENT_LINK, "Link")}>
            {copied === "Link" ? "✓" : "Copy"}
          </button>
        </div>

        {/* Wallet address */}
        <div className="qr-share-row">
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>Wallet Address</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "var(--text2)", wordBreak: "break-all" }}>
              {MY_ADDRESS}
            </div>
          </div>
          <button className={`copy-btn ${copied === "Address" ? "copied" : ""}`}
            onClick={() => handleCopy(MY_ADDRESS, "Address")}>
            {copied === "Address" ? "✓" : "Copy"}
          </button>
        </div>

        {/* Share buttons */}
        <div className="qr-share-btns">
          <button className="btn btn-ghost" style={{ flex: 1, fontSize: 13, padding: "10px" }}
            onClick={() => showToast("QR saved to gallery!")}>
            📷 Save QR
          </button>
          <button className="btn btn-ghost" style={{ flex: 1, fontSize: 13, padding: "10px" }}
            onClick={() => showToast("Copied to clipboard!")}>
            🔗 Share Link
          </button>
          <button className="btn btn-ghost" style={{ flex: 1, fontSize: 13, padding: "10px" }}
            onClick={() => showToast("Opening WhatsApp...")}>
            💬 WhatsApp
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="card anim-fade-up" style={{ animationDelay: "0.35s", marginTop: 0 }}>
        <div className="section-title" style={{ fontSize: 15, marginBottom: 14 }}>How does it work?</div>
        {[
          ["Share", "Send your QR or payment link to any client worldwide."],
          ["Client pays", "They scan or click the link and pay in USDC/USDT from any wallet."],
          ["You receive", "Stablecoins land in your wallet instantly. Auto-convert to INR optionally."],
        ].map(([t, d], i) => (
          <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
            <div className="badge" style={{ marginTop: 2, flexShrink: 0, width: 26, height: 26, borderRadius: 8 }}>{i + 1}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{t}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BigQR({ address }) {
  const cells = [];
  const seed = address.split("").reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  const size = 21;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const topLeft = r < 7 && c < 7;
      const topRight = r < 7 && c >= size - 7;
      const botLeft = r >= size - 7 && c < 7;
      const isFinderOuter = (topLeft || topRight || botLeft) &&
        (r === 0 || r === 6 || r === size - 1 || r === size - 7 ||
         c === 0 || c === 6 || c === size - 7 || c === size - 1);
      const isFinderInner = (topLeft && r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
        (topRight && r >= 2 && r <= 4 && c >= size - 5 && c <= size - 3) ||
        (botLeft && r >= size - 5 && r <= size - 3 && c >= 2 && c <= 4);
      const isFinder = isFinderOuter || isFinderInner;
      const hash = (seed * (r * 23 + c * 17 + 7)) % 100;
      const filled = isFinder || hash > 40;
      cells.push({ r, c, filled });
    }
  }
  const cellSize = 200 / size;
  return (
    <svg width="200" height="200" viewBox={`0 0 ${size * cellSize} ${size * cellSize}`} style={{ display: "block" }}>
      {cells.map(({ r, c, filled }) => filled && (
        <rect
          key={`${r}-${c}`}
          x={c * cellSize + 0.5} y={r * cellSize + 0.5}
          width={cellSize - 1} height={cellSize - 1}
          rx="1.5" fill="#0d1420"
        />
      ))}
    </svg>
  );
}
