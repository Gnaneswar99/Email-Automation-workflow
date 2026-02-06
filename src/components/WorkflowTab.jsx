import { Search, Mail, RefreshCw, Zap, Target } from "lucide-react";
import { WORKFLOW_STEPS, STEP_TO_TEMPLATE } from "../data/constants";

const STEP_ICONS = {
  Search, Mail, RefreshCw, Zap, Target,
};

const AVATAR_COLORS = [
  ["#3b82f6", "#2563eb"],
  ["#8b5cf6", "#7c3aed"],
  ["#ec4899", "#db2777"],
  ["#f59e0b", "#d97706"],
  ["#10b981", "#059669"],
];

export default function WorkflowTab({ contacts, advanceStep, setSelectedContact, setSelectedTemplate, setActiveTab }) {
  const activeContacts = contacts.filter((c) => c.status === "active");

  return (
    <div className="fade-in">
      <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Outreach Pipeline</h2>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
        Your 5-step cold email sequence for recruiter outreach
      </p>

      {/* Step Indicators */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
        {WORKFLOW_STEPS.map((step, i) => {
          const Icon = STEP_ICONS[step.icon];
          return (
            <div key={step.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ textAlign: "center", flex: "0 0 auto" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1a2035, #1e2a45)",
                    border: "2px solid var(--border-active)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px",
                  }}
                >
                  <Icon size={22} color="var(--accent-blue-light)" />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>
                  {step.name}
                </div>
                <div style={{ fontSize: 10, color: "var(--text-dim)", maxWidth: 100, margin: "0 auto" }}>
                  {step.desc}
                </div>
              </div>
              {i < WORKFLOW_STEPS.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: "var(--border)",
                    margin: "0 8px",
                    marginBottom: 32,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Active Contacts */}
      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Active Contacts in Pipeline</h3>

      {activeContacts.length === 0 ? (
        <div className="card" style={{ padding: 32, textAlign: "center", color: "var(--text-dim)" }}>
          No active contacts. Add some in the Contacts tab!
        </div>
      ) : (
        activeContacts.map((contact) => {
          const [c1, c2] = AVATAR_COLORS[contact.id % 5];
          return (
            <div
              key={contact.id}
              className="card fade-in"
              style={{
                padding: 18,
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${c1}, ${c2})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {contact.name[0]}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{contact.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {contact.role} · {contact.company}
                </div>
              </div>

              {/* Step Progress */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, flex: "0 0 260px" }}>
                {WORKFLOW_STEPS.map((s, i) => (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        fontSize: 10,
                        background:
                          contact.step > i
                            ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                            : contact.step === i + 1
                            ? "#1e2a45"
                            : "var(--bg-card)",
                        border:
                          contact.step === i + 1
                            ? "2px solid var(--accent-blue)"
                            : "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: contact.step > i ? "white" : "var(--text-dim)",
                        animation: contact.step === i + 1 ? "pulse 2s infinite" : "none",
                      }}
                    >
                      {contact.step > i ? "✓" : i + 1}
                    </div>
                    {i < 4 && (
                      <div
                        style={{
                          flex: 1,
                          height: 3,
                          background: "var(--border)",
                          borderRadius: 2,
                          margin: "0 4px",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {contact.step > i + 1 && (
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              height: "100%",
                              width: "100%",
                              background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                              borderRadius: 2,
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                {STEP_TO_TEMPLATE[contact.step] && (
                  <button
                    className="btn btn-ghost"
                    style={{ padding: "6px 12px", fontSize: 11 }}
                    onClick={() => {
                      setSelectedContact(contact);
                      setSelectedTemplate(STEP_TO_TEMPLATE[contact.step]);
                      setActiveTab("templates");
                    }}
                  >
                    📝 View Email
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  style={{ padding: "6px 12px", fontSize: 11 }}
                  onClick={() => advanceStep(contact.id)}
                >
                  {contact.step < 5 ? "Next Step →" : "✓ Complete"}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}