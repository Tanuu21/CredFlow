import { useState } from "react";
import "./Invoice.css";

const INVOICE_LIST = [
  { id: "CF-2025-001", client: "Acme Corp", amount: 1500, coin: "USDC", date: "May 1", due: "May 15", status: "pending" },
  { id: "CF-2025-002", client: "TechStart GmbH", amount: 800, coin: "USDT", date: "Apr 28", due: "May 18", status: "overdue" },
  { id: "CF-2025-003", client: "Freelance HQ", amount: 320, coin: "USDC", date: "Apr 20", due: "Apr 30", status: "paid" },
  { id: "CF-2025-004", client: "Webdev Ltd", amount: 2400, coin: "USDC", date: "Apr 15", due: "Apr 25", status: "paid" },
];

export default function Invoice({ onNavigate }) {
  const [view, setView] = useState("list"); // list | create | preview
  const [form, setForm] = useState({ client: "", email: "", amount: "", coin: "USDC", desc: "", due: "", notes: "" });
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const showToast = (msg, type = "success") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 2500);
  };

  const filtered = INVOICE_LIST.filter(inv => activeTab === "all" ? true : inv.status === activeTab);
  const total = { pending: INVOICE_LIST.filter(i=>i.status==="pending").reduce((a,b)=>a+b.amount,0), paid: INVOICE_LIST.filter(i=>i.status==="paid").reduce((a,b)=>a+b.amount,0) };

  if (view === "preview") return <InvoicePreview form={form} onBack={() => setView("create")} onSend={() => { showToast("Invoice sent!"); setView("list"); }} />;

  return (
    <div className="page">
      <div className="mesh-bg" />
      {toast && <div className={`toast ${toast.type}`}>✓ {toast.msg}</div>}

      <div className="page-header anim-fade-up">
        <button className="back-btn" onClick={() => view === "create" ? setView("list") : onNavigate("dashboard")}>
          {view === "create" ? "← Invoices" : "← Back"}
        </button>
        <h1 className="page-title">{view === "create" ? "New Invoice" : "Invoices"}</h1>
        {view === "list" && (
          <button className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => setView("create")}>
            + New
          </button>
        )}
        {view === "create" && <div />}
      </div>

      {view === "list" && (
        <>
          {/* Summary */}
          <div className="invoice-summary anim-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="inv-stat">
              <div className="label">Pending</div>
              <div className="inv-stat-val" style={{ color: "var(--gold2)" }}>${total.pending.toLocaleString()}</div>
              <div className="inv-stat-sub">2 invoices</div>
            </div>
            <div className="inv-stat-divider" />
            <div className="inv-stat">
              <div className="label">Paid (this month)</div>
              <div className="inv-stat-val" style={{ color: "var(--green2)" }}>${total.paid.toLocaleString()}</div>
              <div className="inv-stat-sub">2 invoices</div>
            </div>
          </div>

          <div className="tabs anim-fade-up" style={{ animationDelay: "0.2s" }}>
            {["all", "pending", "overdue", "paid"].map(t => (
              <button key={t} className={`tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="inv-list anim-fade-up" style={{ animationDelay: "0.25s" }}>
            {filtered.map(inv => (
              <div className="inv-card" key={inv.id}>
                <div className="inv-card-top">
                  <div className="inv-client-avatar">{inv.client[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div className="inv-client">{inv.client}</div>
                    <div className="inv-id">{inv.id}</div>
                  </div>
                  <span className={`tag ${inv.status === "paid" ? "tag-green" : inv.status === "overdue" ? "tag-red" : "tag-gold"}`}>
                    {inv.status}
                  </span>
                </div>
                <div className="inv-card-bottom">
                  <div className="inv-amount">${inv.amount.toLocaleString()} <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text3)" }}>{inv.coin}</span></div>
                  <div className="inv-dates">
                    <span>Issued {inv.date}</span>
                    <span>·</span>
                    <span>Due {inv.due}</span>
                  </div>
                  <div className="inv-actions">
                    <button className="btn btn-ghost" style={{ padding: "7px 14px", fontSize: 12 }}>View</button>
                    {inv.status !== "paid" && (
                      <button className="btn btn-primary" style={{ padding: "7px 14px", fontSize: 12 }}>Send Reminder</button>
                    )}
                    <button className="btn btn-ghost" style={{ padding: "7px 14px", fontSize: 12 }}>PDF</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {view === "create" && (
        <div className="anim-fade-up">
          <div className="card">
            <div className="section-title" style={{ fontSize: 16, marginBottom: 20 }}>Client Details</div>

            <div className="input-wrap">
              <label>Client / Company Name</label>
              <input type="text" placeholder="Acme Corp" value={form.client} onChange={e => setForm({...form, client: e.target.value})} />
            </div>
            <div className="input-wrap">
              <label>Client Email</label>
              <input type="email" placeholder="client@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>

            <div className="divider" />
            <div className="section-title" style={{ fontSize: 16, marginBottom: 20 }}>Invoice Details</div>

            <div className="input-wrap">
              <label>Work Description</label>
              <input type="text" placeholder="UI design, website development..." value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} />
            </div>

            <div className="grid-2">
              <div className="input-wrap">
                <label>Amount</label>
                <input type="number" placeholder="0.00" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
              </div>
              <div className="input-wrap">
                <label>Currency</label>
                <select value={form.coin} onChange={e => setForm({...form, coin: e.target.value})}>
                  <option>USDC</option>
                  <option>USDT</option>
                  <option>USD (INR)</option>
                </select>
              </div>
            </div>

            {form.amount && (
              <div className="info-box" style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "var(--text2)" }}>
                  Client pays: <strong>{form.amount} {form.coin}</strong> ≈ ₹{(parseFloat(form.amount) * 83.42).toLocaleString()}
                </div>
              </div>
            )}

            <div className="input-wrap">
              <label>Due Date</label>
              <input type="date" value={form.due} onChange={e => setForm({...form, due: e.target.value})} />
            </div>

            <div className="input-wrap">
              <label>Notes (optional)</label>
              <textarea
                placeholder="Payment terms, bank details..."
                value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                style={{ height: 80, resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setView("preview")}>
                Preview Invoice
              </button>
              <button className="btn btn-primary" style={{ flex: 1 }}
                onClick={() => {
                  if (!form.client || !form.amount) return showToast("Fill required fields", "error");
                  showToast("Invoice sent to " + (form.email || "client") + "!");
                  setView("list");
                }}>
                Send Invoice →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InvoicePreview({ form, onBack, onSend }) {
  const invoiceNum = `CF-2025-00${Math.floor(Math.random() * 10) + 5}`;
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="page">
      <div className="page-header anim-fade-up">
        <button className="back-btn" onClick={onBack}>← Edit</button>
        <h1 className="page-title">Preview</h1>
        <div />
      </div>

      <div className="invoice-preview anim-scale-in">
        {/* Header */}
        <div className="inv-preview-header">
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 22 }}>INVOICE</div>
            <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 4 }}>{invoiceNum}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, color: "var(--accent2)" }}>CredFlow</div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>credflow.io</div>
          </div>
        </div>
        <div style={{ height: 1, background: "var(--border)", margin: "20px 0" }} />

        {/* Parties */}
        <div className="grid-2" style={{ marginBottom: 20 }}>
          <div>
            <div className="label">From</div>
            <div style={{ fontWeight: 700 }}>Arjun Mehta</div>
            <div style={{ fontSize: 13, color: "var(--text3)" }}>arjun@credflow.io</div>
          </div>
          <div>
            <div className="label">Bill To</div>
            <div style={{ fontWeight: 700 }}>{form.client || "Client Name"}</div>
            <div style={{ fontSize: 13, color: "var(--text3)" }}>{form.email || "client@company.com"}</div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid-2" style={{ marginBottom: 20 }}>
          <div>
            <div className="label">Issue Date</div>
            <div style={{ fontWeight: 600 }}>{today}</div>
          </div>
          <div>
            <div className="label">Due Date</div>
            <div style={{ fontWeight: 600 }}>{form.due || "—"}</div>
          </div>
        </div>

        {/* Line item */}
        <div className="inv-line-header">
          <span>Description</span><span>Amount</span>
        </div>
        <div className="inv-line-item">
          <span>{form.desc || "Freelance work"}</span>
          <span>{form.amount} {form.coin}</span>
        </div>
        <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />
        <div className="inv-total">
          <span>Total Due</span>
          <span>{form.amount} {form.coin}</span>
        </div>
        {form.amount && (
          <div style={{ textAlign: "right", fontSize: 12, color: "var(--text3)", marginTop: 4 }}>
            ≈ ₹{(parseFloat(form.amount) * 83.42).toLocaleString()}
          </div>
        )}

        {/* Pay link */}
        <div className="inv-pay-link">
          <span className="label" style={{ margin: 0 }}>Payment Link</span>
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--accent2)" }}>credflow.io/pay/{invoiceNum.toLowerCase()}</span>
        </div>

        {form.notes && (
          <div style={{ marginTop: 16, fontSize: 13, color: "var(--text3)" }}>
            <div className="label">Notes</div>
            {form.notes}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button className="btn btn-ghost" style={{ flex: 1 }}>Download PDF</button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={onSend}>Send Invoice →</button>
      </div>
    </div>
  );
}
