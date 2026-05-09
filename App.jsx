import { useState } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Send from "./pages/Send";
import Invoice from "./pages/Invoice";
import MyQR from "./pages/MyQR";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import "./styles/global.css";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home": return <Home onNavigate={setPage} />;
      case "dashboard": return <Dashboard onNavigate={setPage} />;
      case "deposit": return <Deposit onNavigate={setPage} />;
      case "send": return <Send onNavigate={setPage} />;
      case "invoice": return <Invoice onNavigate={setPage} />;
      case "myqr": return <MyQR onNavigate={setPage} />;
      case "about": return <About onNavigate={setPage} />;
      default: return <Home onNavigate={setPage} />;
    }
  };

  return (
    <div className="app-root">
      {page !== "home" && <Navbar current={page} onNavigate={setPage} />}
      <main className={page === "home" ? "no-nav" : "with-nav"}>
        {renderPage()}
      </main>
    </div>
  );
}
