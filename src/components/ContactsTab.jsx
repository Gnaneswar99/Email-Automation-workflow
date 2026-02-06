import { ClipboardList, Users, Mail, BarChart3 } from "lucide-react";

const TABS = [
  { id: "workflow", label: "Workflow", icon: ClipboardList },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "templates", label: "Templates", icon: Mail },
  { id: "analytics", label: "Dashboard", icon: BarChart3 },
];

export default function TabBar({ activeTab, setActiveTab }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        padding: "0 28px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {TABS.map((t) => {
        const Icon = t.icon;
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "12px 20px",
              border: "none",
              background: "transparent",
              color: isActive ? "var(--accent-blue)" : "var(--text-muted)",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 600,
              fontSize: 14,
              borderBottom: `2px solid ${isActive ? "var(--accent-blue)" : "transparent"}`,
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon size={15} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}