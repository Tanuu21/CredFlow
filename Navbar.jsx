import "./Navbar.css";

const NAV_ITEMS = [
  { id: "dashboard", icon: "⊞", label: "Dashboard" },
  { id: "deposit", icon: "↓", label: "Deposit" },
  { id: "send", icon: "↑", label: "Send" },
  { id: "invoice", icon: "◻", label: "Invoice" },
  { id: "myqr", icon: "⬡", label: "My QR" },
];

export default function Navbar({ current, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate("home")}>
        <Logo size={28} />
        <span>CredFlow</span>
      </div>
      <div className="navbar-links">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`nav-link ${current === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
      <button className="nav-about" onClick={() => onNavigate("about")}>About</button>
    </nav>
  );
}

export function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="9" fill="url(#lg1)"/>
      <path d="M16 7L23 11V21L16 25L9 21V11L16 7Z" fill="none" stroke="white" strokeWidth="1.5"/>
      <path d="M16 11L20 13V19L16 21L12 19V13L16 11Z" fill="rgba(255,255,255,0.9)"/>
      <circle cx="16" cy="16" r="2" fill="#0d1420"/>
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#3b82f6"/>
          <stop offset="0.5" stopColor="#2563eb"/>
          <stop offset="1" stopColor="#1d4ed8"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
