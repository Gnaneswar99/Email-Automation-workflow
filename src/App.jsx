import { useState } from "react";

const COMPANIES = ["Google", "Meta", "Apple", "Amazon", "Microsoft", "Netflix", "Stripe", "Salesforce", "Oracle", "Adobe"];

const WORKFLOW_STEPS = [
  { id: 1, name: "Research", icon: "🔍", desc: "Find recruiter contacts & personalize" },
  { id: 2, name: "Initial Email", icon: "📧", desc: "Send tailored cold email" },
  { id: 3, name: "Follow-up #1", icon: "🔄", desc: "Gentle nudge after 3-4 days" },
  { id: 4, name: "Follow-up #2", icon: "⚡", desc: "Value-add follow-up after 5-7 days" },
  { id: 5, name: "Final Follow-up", icon: "🎯", desc: "Break-up email after 7-10 days" },
];

const EMAIL_TEMPLATES = {
  initial: {
    subject: "{{role}} — Quick intro from a {{experience}}+ year {{specialty}} engineer",
    body: `Hi {{recruiterName}},

I came across your profile while researching {{company}}'s engineering team, and I was impressed by {{personalized_detail}}.

I'm a {{specialty}} engineer with {{experience}}+ years of experience, currently working on {{current_work}}. A few highlights:

- {{achievement_1}}
- {{achievement_2}}
- {{achievement_3}}

I'm particularly excited about {{company}}'s work in {{company_initiative}}, and I'd love to explore how I could contribute.

Would you be open to a quick 15-minute chat this week or next?

Best,
{{yourName}}
{{linkedin_url}}`,
  },
  followup1: {
    subject: "Re: {{role}} — Quick follow-up",
    body: `Hi {{recruiterName}},

I wanted to follow up on my previous email. I know your inbox is busy, so I'll keep this brief.

Since I last reached out, I {{recent_update}} which I think aligns well with what {{company}} is building.

I'd genuinely value even a 10-minute conversation. Would {{specific_day}} work for you?

Thanks,
{{yourName}}`,
  },
  followup2: {
    subject: "Re: {{role}} — Thought you'd find this relevant",
    body: `Hi {{recruiterName}},

I recently {{value_add}} — thought it might be relevant to your team's work at {{company}}.

{{link_or_detail}}

Still very interested in connecting if you have availability this week.

Best,
{{yourName}}`,
  },
  final: {
    subject: "Re: {{role}} — Closing the loop",
    body: `Hi {{recruiterName}},

I don't want to keep filling your inbox, so this will be my last note.

If the timing isn't right for {{company}} right now, I completely understand. I'd still love to stay connected — my door is always open if a {{specialty}} role opens up down the road.

Wishing you and the team all the best.

Cheers,
{{yourName}}
{{linkedin_url}}`,
  },
};

const DEFAULT_CONTACTS = [
  { id: 1, name: "Sarah Chen", company: "Google", role: "Senior Tech Recruiter", email: "example@google.com", step: 1, status: "active", notes: "", lastAction: null },
  { id: 2, name: "James Wilson", company: "Meta", role: "Engineering Recruiter", email: "example@meta.com", step: 2, status: "active", notes: "", lastAction: "2026-02-03" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("workflow");
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS);
  const [selectedTemplate, setSelectedTemplate] = useState("initial");
  const [showAddContact, setShowAddContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newContact, setNewContact] = useState({ name: "", company: "", role: "", email: "", notes: "" });
  const [userProfile, setUserProfile] = useState({
    yourName: "Your Name",
    specialty: "Full-Stack",
    experience: "5",
    linkedin_url: "linkedin.com/in/yourprofile",
  });
  const [showProfile, setShowProfile] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const addContact = () => {
    if (!newContact.name || !newContact.company) return;
    setContacts([...contacts, { ...newContact, id: Date.now(), step: 1, status: "active", lastAction: null }]);
    setNewContact({ name: "", company: "", role: "", email: "", notes: "" });
    setShowAddContact(false);
  };

  const advanceStep = (id) => {
    setContacts(contacts.map((c) => {
      if (c.id === id && c.step < 5) return { ...c, step: c.step + 1, lastAction: new Date().toISOString().split("T")[0] };
      if (c.id === id && c.step >= 5) return { ...c, status: "completed" };
      return c;
    }));
  };

  const removeContact = (id) => setContacts(contacts.filter((c) => c.id !== id));

  const getFilledTemplate = (templateKey, contact) => {
    const tmpl = EMAIL_TEMPLATES[templateKey];
    return {
      subject: tmpl.subject.replace(/\{\{(\w+)\}\}/g, (_, k) => contact?.[k] || userProfile[k] || `[${k}]`),
      body: tmpl.body.replace(/\{\{(\w+)\}\}/g, (_, k) => {
        if (k === "recruiterName") return contact?.name?.split(" ")[0] || "[Name]";
        return contact?.[k] || userProfile[k] || `[${k}]`;
      }),
    };
  };

  const copyTemplate = (templateKey, contact) => {
    const t = getFilledTemplate(templateKey, contact);
    navigator.clipboard.writeText(`Subject: ${t.subject}\n\n${t.body}`);
    setCopiedId(templateKey);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const stepToTemplate = { 2: "initial", 3: "followup1", 4: "followup2", 5: "final" };

  const stats = {
    total: contacts.length,
    active: contacts.filter((c) => c.status === "active").length,
    completed: contacts.filter((c) => c.status === "completed").length,
    responded: contacts.filter((c) => c.status === "responded").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e17", color: "#e2e8f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #141927; }
        ::-webkit-scrollbar-thumb { background: #2a3352; border-radius: 3px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .card { background: linear-gradient(135deg, #141927 0%, #1a2035 100%); border: 1px solid #1e2a45; border-radius: 14px; transition: all 0.25s ease; }
        .card:hover { border-color: #2e4a7a; box-shadow: 0 4px 24px rgba(59,130,246,0.06); }
        .btn { border: none; cursor: pointer; border-radius: 10px; font-family: inherit; font-weight: 600; transition: all 0.2s ease; }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; }
        .btn-primary:hover { box-shadow: 0 4px 16px rgba(59,130,246,0.35); }
        .btn-ghost { background: transparent; color: #94a3b8; border: 1px solid #1e2a45; }
        .btn-ghost:hover { color: #e2e8f0; border-color: #3b82f6; background: rgba(59,130,246,0.06); }
        .input { background: #0f1525; border: 1px solid #1e2a45; border-radius: 10px; padding: 10px 14px; color: #e2e8f0; font-family: inherit; font-size: 14px; width: 100%; outline: none; transition: border-color 0.2s; }
        .input:focus { border-color: #3b82f6; }
        .tab { padding: 10px 20px; border: none; background: transparent; color: #64748b; cursor: pointer; font-family: inherit; font-weight: 600; font-size: 14px; border-bottom: 2px solid transparent; transition: all 0.2s; }
        .tab:hover { color: #94a3b8; }
        .tab.active { color: #3b82f6; border-bottom-color: #3b82f6; }
        .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .template-box { background: #0c1120; border: 1px solid #1a2540; border-radius: 12px; padding: 18px; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; line-height: 1.7; white-space: pre-wrap; color: #94a3b8; max-height: 360px; overflow-y: auto; }
        .template-box .var { color: #f59e0b; font-weight: 500; }
        .stat-card { text-align: center; padding: 20px; border-radius: 14px; background: linear-gradient(135deg, #141927, #1a2035); border: 1px solid #1e2a45; flex: 1; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "20px 28px", borderBottom: "1px solid #1a2035", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📬</div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.3px" }}>ColdReach</h1>
            <p style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>Automated Recruiter Outreach Workflow</p>
          </div>
        </div>
        <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => setShowProfile(!showProfile)}>⚙️ My Profile</button>
      </div>

      {/* Profile Panel */}
      {showProfile && (
        <div className="fade-in" style={{ padding: "16px 28px", borderBottom: "1px solid #1a2035", background: "#0d1220" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {Object.entries(userProfile).map(([key, val]) => (
              <div key={key}>
                <label style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4, display: "block" }}>{key.replace(/_/g, " ")}</label>
                <input className="input" value={val} onChange={(e) => setUserProfile({ ...userProfile, [key]: e.target.value })} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, padding: "0 28px", borderBottom: "1px solid #1a2035" }}>
        {[
          { id: "workflow", label: "📋 Workflow" },
          { id: "contacts", label: "👥 Contacts" },
          { id: "templates", label: "✉️ Templates" },
          { id: "analytics", label: "📊 Dashboard" },
        ].map((t) => (
          <button key={t.id} className={`tab ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: 28 }}>
        {/* WORKFLOW TAB */}
        {activeTab === "workflow" && (
          <div className="fade-in">
            <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Outreach Pipeline</h2>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>Your 5-step cold email sequence for recruiter outreach</p>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 32, gap: 0 }}>
              {WORKFLOW_STEPS.map((step, i) => (
                <div key={step.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <div style={{ textAlign: "center", flex: "0 0 auto" }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #1a2035, #1e2a45)", border: "2px solid #2e4a7a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, margin: "0 auto 8px" }}>{step.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{step.name}</div>
                    <div style={{ fontSize: 10, color: "#475569", maxWidth: 100, margin: "0 auto" }}>{step.desc}</div>
                  </div>
                  {i < WORKFLOW_STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: "#1e2a45", margin: "0 8px", marginBottom: 32 }} />}
                </div>
              ))}
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Active Contacts in Pipeline</h3>
            {contacts.filter((c) => c.status === "active").length === 0 ? (
              <div className="card" style={{ padding: 32, textAlign: "center", color: "#475569" }}>No active contacts. Add some in the Contacts tab!</div>
            ) : (
              contacts.filter((c) => c.status === "active").map((contact) => (
                <div key={contact.id} className="card fade-in" style={{ padding: 18, marginBottom: 12, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${["#3b82f6","#8b5cf6","#ec4899","#f59e0b","#10b981"][contact.id % 5]}, ${["#2563eb","#7c3aed","#db2777","#d97706","#059669"][contact.id % 5]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "white", flexShrink: 0 }}>{contact.name[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{contact.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{contact.role} · {contact.company}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, flex: "0 0 260px" }}>
                    {WORKFLOW_STEPS.map((s, i) => (
                      <div key={s.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", fontSize: 10, background: contact.step > i ? "linear-gradient(135deg,#3b82f6,#2563eb)" : contact.step === i + 1 ? "#1e2a45" : "#141927", border: contact.step === i + 1 ? "2px solid #3b82f6" : "1px solid #1e2a45", display: "flex", alignItems: "center", justifyContent: "center", color: contact.step > i ? "white" : "#475569", animation: contact.step === i + 1 ? "pulse 2s infinite" : "none" }}>{contact.step > i ? "✓" : i + 1}</div>
                        {i < 4 && <div style={{ flex: 1, height: 3, background: "#1e2a45", borderRadius: 2, margin: "0 4px", overflow: "hidden", position: "relative" }}>{contact.step > i + 1 && <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "100%", background: "linear-gradient(90deg, #3b82f6, #60a5fa)", borderRadius: 2 }} />}</div>}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    {stepToTemplate[contact.step] && (
                      <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 11 }} onClick={() => { setSelectedContact(contact); setSelectedTemplate(stepToTemplate[contact.step]); setActiveTab("templates"); }}>📝 View Email</button>
                    )}
                    <button className="btn btn-primary" style={{ padding: "6px 12px", fontSize: 11 }} onClick={() => advanceStep(contact.id)}>{contact.step < 5 ? "Next Step →" : "✓ Complete"}</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* CONTACTS TAB */}
        {activeTab === "contacts" && (
          <div className="fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Recruiter Contacts</h2>
                <p style={{ fontSize: 13, color: "#64748b" }}>Manage your target list of big tech recruiters</p>
              </div>
              <button className="btn btn-primary" style={{ padding: "10px 20px", fontSize: 13 }} onClick={() => setShowAddContact(!showAddContact)}>{showAddContact ? "✕ Cancel" : "+ Add Contact"}</button>
            </div>
            {showAddContact && (
              <div className="card fade-in" style={{ padding: 20, marginBottom: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4, display: "block" }}>Name *</label>
                    <input className="input" placeholder="e.g. Sarah Chen" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4, display: "block" }}>Company *</label>
                    <select className="input" value={newContact.company} onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}>
                      <option value="">Select company</option>
                      {COMPANIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4, display: "block" }}>Role</label>
                    <input className="input" placeholder="e.g. Senior Tech Recruiter" value={newContact.role} onChange={(e) => setNewContact({ ...newContact, role: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4, display: "block" }}>Email</label>
                    <input className="input" placeholder="recruiter@company.com" value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <label style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4, display: "block" }}>Notes</label>
                  <input className="input" placeholder="Any personalization notes..." value={newContact.notes} onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })} />
                </div>
                <button className="btn btn-primary" style={{ padding: "10px 24px", fontSize: 13, marginTop: 14 }} onClick={addContact}>Add to Pipeline</button>
              </div>
            )}
            {contacts.map((c) => (
              <div key={c.id} className="card" style={{ padding: 16, marginBottom: 10, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${["#3b82f6","#8b5cf6","#ec4899","#f59e0b","#10b981"][c.id % 5]}, ${["#2563eb","#7c3aed","#db2777","#d97706","#059669"][c.id % 5]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "white" }}>{c.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{c.role} · {c.company} {c.email && `· ${c.email}`}</div>
                </div>
                <span className="badge" style={{ background: c.status === "active" ? "rgba(59,130,246,0.12)" : c.status === "completed" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)", color: c.status === "active" ? "#60a5fa" : c.status === "completed" ? "#34d399" : "#fbbf24" }}>Step {c.step}/5 · {c.status}</span>
                <button className="btn btn-ghost" style={{ padding: "6px 10px", fontSize: 12, color: "#ef4444", borderColor: "#3b1111" }} onClick={() => removeContact(c.id)}>✕</button>
              </div>
            ))}
          </div>
        )}

        {/* TEMPLATES TAB */}
        {activeTab === "templates" && (
          <div className="fade-in">
            <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Email Templates</h2>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Ready-to-use sequences — variables in <span style={{ color: "#f59e0b", fontFamily: "JetBrains Mono", fontSize: 12 }}>{"{{yellow}}"}</span> need your input</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {[
                { key: "initial", label: "📧 Initial Email" },
                { key: "followup1", label: "🔄 Follow-up #1" },
                { key: "followup2", label: "⚡ Follow-up #2" },
                { key: "final", label: "🎯 Final Email" },
              ].map((t) => (
                <button key={t.key} className={`btn ${selectedTemplate === t.key ? "btn-primary" : "btn-ghost"}`} style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => setSelectedTemplate(t.key)}>{t.label}</button>
              ))}
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Subject Line</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#e2e8f0" }}>{getFilledTemplate(selectedTemplate, selectedContact).subject}</div>
                </div>
                <button className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 12 }} onClick={() => copyTemplate(selectedTemplate, selectedContact)}>{copiedId === selectedTemplate ? "✓ Copied!" : "📋 Copy Email"}</button>
              </div>
              <div className="template-box">
                {getFilledTemplate(selectedTemplate, selectedContact).body.split(/(\{\{[^}]+\}\})/).map((part, i) =>
                  part.match(/^\{\{/) ? <span key={i} className="var">{part}</span> : <span key={i}>{part}</span>
                )}
              </div>
              <div style={{ marginTop: 14, padding: 14, background: "#0d1525", borderRadius: 10, border: "1px solid #1a2540" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#f59e0b", marginBottom: 6 }}>💡 Pro Tips for this step</div>
                <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
                  {selectedTemplate === "initial" && "Research the recruiter's recent LinkedIn posts or company news. Mention something specific to show you've done your homework. Keep achievements quantified (e.g., 'reduced latency by 40%')."}
                  {selectedTemplate === "followup1" && "Wait 3-4 business days. Reference your original email briefly. Add a new data point or achievement they haven't seen."}
                  {selectedTemplate === "followup2" && "Share something of value — a relevant blog post you wrote, an open-source project, or an industry insight. Make this about giving, not asking."}
                  {selectedTemplate === "final" && "Keep it warm and professional. Leave the door open. Many recruiters reply to break-up emails because of the implied scarcity."}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div className="fade-in">
            <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Outreach Dashboard</h2>
            <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
              {[
                { label: "Total", value: stats.total, color: "#3b82f6", icon: "📊" },
                { label: "Active", value: stats.active, color: "#f59e0b", icon: "🔥" },
                { label: "Completed", value: stats.completed, color: "#10b981", icon: "✅" },
                { label: "Responded", value: stats.responded, color: "#8b5cf6", icon: "💬" },
              ].map((s) => (
                <div key={s.label} className="stat-card">
                  <div style={{ fontSize: 28, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 20, marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Pipeline Distribution</h3>
              {WORKFLOW_STEPS.map((step) => {
                const count = contacts.filter((c) => c.step === step.id && c.status === "active").length;
                const pct = stats.active > 0 ? (count / stats.active) * 100 : 0;
                return (
                  <div key={step.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: 18, width: 30, textAlign: "center" }}>{step.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, width: 110 }}>{step.name}</span>
                    <div style={{ flex: 1, height: 8, background: "#1a2035", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #3b82f6, #60a5fa)", borderRadius: 4, transition: "width 0.5s ease" }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#60a5fa", width: 24, textAlign: "right" }}>{count}</span>
                  </div>
                );
              })}
            </div>
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>🎯 Cold Email Best Practices</h3>
              {[
                "Personalize every email — mention recruiter's name, company initiative, or recent post",
                "Keep initial email under 150 words — recruiters skim",
                "Send between Tue–Thu, 8–10 AM in recruiter's timezone",
                "Space follow-ups 3–5 business days apart",
                "Always include a clear, low-commitment CTA (15-min chat)",
                "Quantify your achievements (%, $, scale, impact)",
                "Include LinkedIn profile in every email",
                "Track opens if possible — follow up when they've opened but not replied",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ color: "#10b981", fontSize: 14, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}