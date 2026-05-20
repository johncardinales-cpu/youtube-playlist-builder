export default function SettingsPage() {
  const rows = [
    ['Theme direction', 'Professional social-inspired'],
    ['License mode', 'Strict'],
    ['Search interval', 'Every 30 minutes'],
    ['Video discovery', 'On'],
    ['License check', 'On'],
    ['Embed check', 'On'],
    ['Auto publish', 'Off'],
    ['Manual approval', 'On'],
    ['Review score', '70'],
    ['Publish threshold', '90']
  ];

  return (
    <main className="shell page">
      <div className="section-head">
        <div>
          <h1 className="section-title">Best Settings</h1>
          <p className="section-copy">Safe defaults for launch while the app is still growing.</p>
        </div>
        <span className="pill pill-success">Current launch preset</span>
      </div>
      <div className="grid" style={{ gap: 12 }}>
        {rows.map(([name, value]) => (
          <div key={name} className="row-card">
            <strong>{name}</strong>
            <span className="row-card-value">{value}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
