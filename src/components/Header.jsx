import { Mail, Settings } from "lucide-react";

export default function Header({ showProfile, setShowProfile }) {
  return (
    <div
      style={{
        padding: "20px 28px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Mail size={20} color="white" />
        </div>
        <div>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#f1f5f9",
              letterSpacing: "-0.3px",
            }}
          >
            ColdReach
          </h1>
          <p style={{ fontSize: 12, color: "var(--text-dim)", fontWeight: 500 }}>
            Automated Recruiter Outreach Workflow
          </p>
        </div>
      </div>
      <button
        className="btn btn-ghost"
        style={{ padding: "8px 16px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
        onClick={() => setShowProfile(!showProfile)}
      >
        <Settings size={14} />
        My Profile
      </button>
    </div>
  );
}