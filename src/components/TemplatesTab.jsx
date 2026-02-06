import { useState } from "react";
import { Mail, RefreshCw, Zap, Target, Copy, Check } from "lucide-react";
import { EMAIL_TEMPLATES } from "../data/constants";

const TEMPLATE_TABS = [
  { key: "initial", label: "Initial Email", icon: Mail },
  { key: "followup1", label: "Follow-up #1", icon: RefreshCw },
  { key: "followup2", label: "Follow-up #2", icon: Zap },
  { key: "final", label: "Final Email", icon: Target },
];

const TIPS = {
  initial:
    "Research the recruiter's recent LinkedIn posts or company news. Mention something specific to show you've done your homework. Keep achievements quantified (e.g., 'reduced latency by 40%').",
  followup1:
    "Wait 3-4 business days. Reference your original email briefly. Add a new data point or achievement they haven't seen.",
  followup2:
    "Share something of value — a relevant blog post you wrote, an open-source project, or an industry insight. Make this about giving, not asking.",
  final:
    "Keep it warm and professional. Leave the door open. Many recruiters reply to break-up emails because of the implied scarcity.",
};

export default function TemplatesTab({ selectedTemplate, setSelectedTemplate, selectedContact, userProfile }) {
  const [copiedId, setCopiedId] = useState(null);

  const getFilledTemplate = (templateKey) => {
    const tmpl = EMAIL_TEMPLATES[templateKey];
    const fill = (str) =>
      str.replace(/\{\{(\w+)\}\}/g, (_, k) => {
        if (k === "recruiterName")
          return selectedContact?.name?.split(" ")[0] || "[Name]";
        return selectedContact?.[k] || userProfile[k] || `[${k}]`;
      });
    return { subject: fill(tmpl.subject), body: fill(tmpl.body) };
  };

  const copyTemplate = () => {
    const t = getFilledTemplate(selectedTemplate);
    const text = `Subject: ${t.subject}\n\n${t.body}`;
    navigator.clipboard.writeText(text);
    setCopiedId(selectedTemplate);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filled = getFilledTemplate(selectedTemplate);

  return (
    <div className="fade-in">
      <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>
        Email Templates
      </h2>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
        Ready-to-use sequences — variables in{" "}
        <span
          style={{
            color: "var(--accent-yellow)",
            fontFamily: "JetBrains Mono",
            fontSize: 12,
          }}
        >
          {"{{yellow}}"}
        </span>{" "}
        need your input
      </p>

      {/* Template Selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {TEMPLATE_TABS.map((t) => {
          const Icon = t.icon;
          const isActive = selectedTemplate === t.key;
          return (
            <button
              key={t.key}
              className={`btn ${isActive ? "btn-primary" : "btn-ghost"}`}
              style={{
                padding: "8px 16px",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              onClick={() => setSelectedTemplate(t.key)}
            >
              <Icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Template Card */}
      <div className="card" style={{ padding: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 4,
              }}
            >
              Subject Line
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
              {filled.subject}
            </div>
          </div>
          <button
            className="btn btn-primary"
            style={{
              padding: "8px 16px",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            onClick={copyTemplate}
          >
            {copiedId === selectedTemplate ? (
              <>
                <Check size={14} /> Copied!
              </>
            ) : (
              <>
                <Copy size={14} /> Copy Email
              </>
            )}
          </button>
        </div>

        {/* Template Body */}
        <div className="template-box">
          {filled.body.split(/(\{\{[^}]+\}\})/).map((part, i) =>
            part.match(/^\{\{/) ? (
              <span key={i} className="var">{part}</span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>

        {/* Pro Tips */}
        <div
          style={{
            marginTop: 14,
            padding: 14,
            background: "#0d1525",
            borderRadius: 10,
            border: "1px solid #1a2540",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--accent-yellow)",
              marginBottom: 6,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            💡 Pro Tips for this step
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
            {TIPS[selectedTemplate]}
          </div>
        </div>
      </div>
    </div>
  );
}