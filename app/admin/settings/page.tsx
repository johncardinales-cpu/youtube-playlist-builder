export default function SettingsPage() {
  const rows = [
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
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 42 }}>Best Settings</h1>
      <p style={{ color: '#475569' }}>Launch settings for safe curated playlist discovery.</p>
      <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
        {rows.map(([name, value]) => (
          <div key={name} style={{ display: 'flex', justifyContent: 'space-between', background: 'white', padding: 18, borderRadius: 16 }}>
            <span style={{ fontWeight: 700 }}>{name}</span>
            <span style={{ background: '#cffafe', color: '#155e75', padding: '6px 10px', borderRadius: 999, fontWeight: 700 }}>{value}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
