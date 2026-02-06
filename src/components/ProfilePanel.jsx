export default function ProfilePanel({ userProfile, setUserProfile }) {
  return (
    <div
      className="fade-in"
      style={{
        padding: "16px 28px",
        borderBottom: "1px solid var(--border)",
        background: "#0d1220",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        {Object.entries(userProfile).map(([key, val]) => (
          <div key={key}>
            <label
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 4,
                display: "block",
              }}
            >
              {key.replace(/_/g, " ")}
            </label>
            <input
              className="input"
              value={val}
              onChange={(e) =>
                setUserProfile({ ...userProfile, [key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}