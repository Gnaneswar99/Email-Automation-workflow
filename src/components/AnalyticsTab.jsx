import { BarChart3, Flame, CheckCircle, MessageCircle } from "lucide-react";
import { WORKFLOW_STEPS } from "../data/constants";
import { Search, Mail, RefreshCw, Zap, Target } from "lucide-react";

const STEP_ICONS = { Search, Mail, RefreshCw, Zap, Target };

const STAT_CONFIG = [
  { label: "Total", color: "#3b82f6", icon: BarChart3 },
  { label: "Active", color: "#f59e0b", icon: Flame },
  { label: "Completed", color: "#10b981", icon: CheckCircle },
  { label: "Responded", color: "#8b5cf6", icon: MessageCircle },
];

const BEST_PRACTICES = [
  "Personalize every email — mention recruiter's name, company initiative, or recent post",
  "Keep initial email under 150 words — recruiters skim",
  "Send between Tue–Thu, 8–10 AM in recruiter's timezone",
  "Space follow-ups 3–5 business days apart",
  "Always include a clear, low-commitment CTA (15-min chat)",
  "Quantify your achievements (%, $, scale, impact)",
  "Include LinkedIn profile in every email",
  "Track opens if possible — follow up when they've opened but not replied",
];

export default function AnalyticsTab({ contacts }) {
  const stats = {
    Total: contacts.length,
    Active: contacts.filter((c) => c.status === "active").length,
    Completed: contacts.filter((c) => c.status === "completed").length,
    Responded: contacts.filter((c) => c.status === "responded").length,
  };

  return (
    <div className="fade-in">
      <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>
        Outreach Dashboard
      </h2>

      {/* Stat Cards */}
      <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
        {STAT_CONFIG.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              style={{
                textAlign: "center",
                padding: 20,
                borderRadius: 14,
                background: "linear-gradient(135deg, var(--bg-card), var(--bg-card-hover))",
                border: "1px solid var(--border)",
                flex: 1,
              }}
            >
              <Icon
                size={28}
                color={s.color}
                style={{ marginBottom: 8 }}
              />
              <div style={{ fontSize: 32, fontWeight: 700, color: s.color }}>
                {stats[s.label]}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline Distribution */}
      <div className="card" style={{ padding: 20, marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
          Pipeline Distribution
        </h3>
        {WORKFLOW_STEPS.map((step) => {
          const Icon = STEP_ICONS[step.icon];
          const count = contacts.filter(
            (c) => c.step === step.id && c.status === "active"
          ).length;
          const pct =
            stats.Active > 0 ? (count / stats.Active) * 100 : 0;
          return (
            <div
              key={step.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 10,
              }}
            >
              <Icon size={18} color="var(--accent-blue-light)" style={{ width: 30 }} />
              <span style={{ fontSize: 13, fontWeight: 500, width: 110 }}>
                {step.name}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 8,
                  background: "#1a2035",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                    borderRadius: 4,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--accent-blue-light)",
                  width: 24,
                  textAlign: "right",
                }}
              >
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {/* Best Practices */}
      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>
          🎯 Cold Email Best Practices
        </h3>
        {BEST_PRACTICES.map((tip, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              marginBottom: 10,
            }}
          >
            <span style={{ color: "var(--accent-green)", fontSize: 14, marginTop: 1 }}>
              ✓
            </span>
            <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
              {tip}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}