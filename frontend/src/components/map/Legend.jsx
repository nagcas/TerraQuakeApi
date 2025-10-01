export default function Legend() {
  const rows = [
    { label: 'M < 2.0', color: '#34d399' },
    { label: '2.0 – 3.9', color: '#fbbf24' },
    { label: '4.0 – 4.9', color: '#f59e0b' },
    { label: '5.0 – 5.9', color: '#ef4444' },
    { label: '>= 6.0', color: '#991b1b' },
  ]
  return (
    <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '8px 10px', borderRadius: 12, fontSize: 12, lineHeight: 1.3, zIndex: 1000 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Magnitude</div>
      <div style={{ display: 'grid', gap: 6 }}>
        {rows.map(r => (
          <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, background: r.color, display: 'inline-block', border: '1px solid #111827' }} />
            <span>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


