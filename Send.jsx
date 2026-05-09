import { useState } from "react";
import "./Send.css";

const CONTACTS = [
  { name: "Rahul Sharma", addr: "0xAB12...9F34", coin: "USDC", avatar: "RS" },
  { name: "Priya Menon", addr: "0xCD56...7E12", coin: "USDT", avatar: "PM" },
  { name: "Acme Corp", addr: "0xEF90...3A56", coin: "USDC", avatar: "AC" },
];

export default function Send({ onNavigate }) {
  const [step, setStep] = useState(1); // 1: form, 2: confirm, 3: success
  const [mode, setMode] = useState("address"); // address | scan
  const [coin, setCoin] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");
  const [note, setNote] = useState("");
  const [scanning, setScanning] = useState(false);
  const [toast, setToast] = useState(null);

  const rate = coin === "USDC" ? 83.42 : coin === "USDT" ? 83.38 : 248210;
  const inrVal = (parseFloat(amount) * rate).toFixed(2);
  const fee = (parseFloat(amount) * 0.005).toFixed(4);
  const youGet = (parseFloat(amount) - parseFloat(fee)).toFixed(4);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setTo("0x742d35Cc6634C0532925a3b8D4C9E0B9B5F3e124");
      setScanning(false);
      setMode("address");
      showToast("Address scanned!", "success");
    }, 2000);
  };

  const handleConfirm = () => {
    if (!amount || !to) return showToast("Fill all fields", "error");
    setStep(2);
  };

  const handleSend = () => {
    setStep(3);
  };

  if (step === 3) return (
    <div className="page">
      <div className="mesh-bg" />
      <div className="success-screen anim-scale-in">
        <div className="success-icon">✓</div>
        <h2>Sent Successfully!</h2>
        <div className="success-amount">{amount} {coin}</div>
        <div className="success-sub">≈ ₹{parseFloat(inrVal).toLocaleString()}</div>
        <div className="success-details">
          <div className="success-row"><span>To</span><span style={{ fontFamily: "monospace", fontSize: 12 }}>{to.slice(0, 8)}...{to.slice(-6)}</span></div>
          <div className="success-row"><span>Fee</span><span>{fee} {coin}</span></div>
          <div className="success-row"><span>Network</span><span>Polygon</span></div>
          <div className="success-row"><span>Status</span><span className="tag tag-green">Confirmed</span></div>
        </div>
        <button className="btn btn-primary btn-full" style={{ marginTop: 24 }} onClick={() => { setStep(1); setAmount(""); setTo(""); }}>
          Send Another
        </button>
        <button className="btn btn-ghost btn-full" style={{ marginTop: 10 }} onClick={() => onNavigate("dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="mesh-bg" />
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="page-header anim-fade-up">
        <button className="back-btn" onClick={() => step === 2 ? setStep(1) : onNavigate("dashboard")}>← Back</button>
        <h1 className="page-title">Send</h1>
        <div />
      </div>

      {step === 1 && (
        <>
          {/* Mode switch */}
          <div className="tabs anim-fade-up" style={{ animationDelay: "0.1s" }}>
            <button className={`tab ${mode === "address" ? "active" : ""}`} onClick={() => setMode("address")}>📋 Enter Address</button>
            <button className={`tab ${mode === "scan" ? "active" : ""}`} onClick={() => setMode("scan")}>📷 Scan QR</button>
          </div>

          {/* SCAN MODE */}
          {mode === "scan" && (
            <div className="scan-area anim-scale-in">
              <div className="scan-frame">
                {scanning ? (
                  <>
                    <div className="scan-line" />
                    <div className="scan-corners" />
                    <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center", color: "white", fontSize: 13, fontWeight: 600 }}>Scanning...</div>
                  </>
                ) : (
                  <div className="scan-placeholder">
                    <div style={{ fontSize: 48 }}>📷</div>
                    <div style={{ color: "var(--text2)", fontSize: 14, marginTop: 12 }}>Camera will appear here</div>
                    <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>Point at recipient's QR code</div>
                  </div>
                )}
              </div>
              <button className="btn btn-primary btn-full" style={{ marginTop: 16 }} onClick={handleScan}>
                {scanning ? "Scanning..." : "📷 Start Scanning"}
              </button>
              {scanning && (
                <div style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: "var(--text3)" }}>
                  Hold camera steady over the QR code
                </div>
              )}
            </div>
          )}

          {/* ADDRESS MODE */}
          {mode === "address" && (
            <div className="anim-fade-up" style={{ animationDelay: "0.15s" }}>
              {/* Quick contacts */}
              <div style={{ marginBottom: 20 }}>
                <div className="label" style={{ marginBottom: 10 }}>Recent Contacts</div>
                <div className="contacts-scroll">
                  {CONTACTS.map((c, i) => (
                    <button key={i} className="contact-chip" onClick={() => setTo(c.addr)}>
                      <div className="contact-avatar">{c.avatar}</div>
                      <div className="contact-name">{c.name.split(" ")[0]}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card">
                {/* Coin selector */}
                <div className="label">Asset to Send</div>
                <div className="coin-select-row">
                  {["USDC", "USDT", "ETH"].map(c => (
                    <button key={c} className={`coin-select-btn ${coin === c ? "active" : ""}`} onClick={() => setCoin(c)}>
                      <div className={`coin coin-${c.toLowerCase()}`} style={{ width: 28, height: 28, fontSize: 12 }}>
                        {c === "ETH" ? "E" : c[0]}
                      </div>
                      {c}
                    </button>
                  ))}
                </div>

                <div className="divider" />

                <div className="input-wrap">
                  <label>Recipient Address or ENS</label>
                  <input
                    type="text" placeholder="0x... or name.eth"
                    value={to} onChange={e => setTo(e.target.value)}
                  />
                </div>

                <div className="input-wrap">
                  <label>Amount ({coin})</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="number" placeholder="0.00" value={amount}
                      onChange={e => setAmount(e.target.value)} style={{ paddingRight: 80 }}
                    />
                    <div style={{
                      position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                      fontSize: 13, fontWeight: 700, color: "var(--text3)"
                    }}>{coin}</div>
                  </div>
                  {amount && (
                    <div style={{ marginTop: 8, fontSize: 13, color: "var(--text3)" }}>
                      ≈ ₹{parseFloat(inrVal).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="input-wrap">
                  <label>Note (optional)</label>
                  <input type="text" placeholder="Invoice #123, freelance work..." value={note} onChange={e => setNote(e.target.value)} />
                </div>

                {/* Fee preview */}
                {amount && (
                  <div className="fee-box">
                    <div className="fee-row"><span>You send</span><span>{amount} {coin}</span></div>
                    <div className="fee-row"><span>Platform fee (0.5%)</span><span style={{ color: "var(--text3)" }}>−{fee} {coin}</span></div>
                    <div className="fee-row"><span>Gas (Polygon)</span><span style={{ color: "var(--text3)" }}>~$0.001</span></div>
                    <div style={{ height: 1, background: "var(--border)", margin: "10px 0" }} />
                    <div className="fee-row" style={{ fontWeight: 700 }}><span>Recipient gets</span><span style={{ color: "var(--green2)" }}>{youGet} {coin}</span></div>
                  </div>
                )}

                <button className="btn btn-primary btn-full" style={{ marginTop: 16 }} onClick={handleConfirm}>
                  Review Transaction →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* CONFIRM STEP */}
      {step === 2 && (
        <div className="anim-scale-in">
          <div className="confirm-card">
            <div className="label" style={{ textAlign: "center", marginBottom: 12 }}>Review & Confirm</div>
            <div className="confirm-amount-big">{amount} <span style={{ color: "var(--text3)", fontSize: 24 }}>{coin}</span></div>
            <div style={{ textAlign: "center", color: "var(--text3)", fontSize: 14, marginBottom: 24 }}>≈ ₹{parseFloat(inrVal).toLocaleString()}</div>

            <div className="confirm-details">
              {[
                ["From", "Arjun Mehta (0x742d...e124)"],
                ["To", to.length > 20 ? `${to.slice(0, 12)}...${to.slice(-8)}` : to],
                ["Asset", coin],
                ["Network", "Polygon"],
                ["Fee", `${fee} ${coin}`],
                ["You receive", `${youGet} ${coin}`],
                ["Note", note || "—"],
              ].map(([k, v]) => (
                <div className="confirm-row" key={k}>
                  <span>{k}</span>
                  <span style={{ fontWeight: 600, textAlign: "right", maxWidth: 200, wordBreak: "break-all" }}>{v}</span>
                </div>
              ))}
            </div>

            <div className="warning-box" style={{ marginTop: 20, marginBottom: 16 }}>
              ⚠️ Crypto transactions are irreversible. Double-check the address before confirming.
            </div>

            <button className="btn btn-green btn-full" onClick={handleSend}>
              ✓ Confirm & Send {amount} {coin}
            </button>
            <button className="btn btn-ghost btn-full" style={{ marginTop: 10 }} onClick={() => setStep(1)}>
              Edit Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
