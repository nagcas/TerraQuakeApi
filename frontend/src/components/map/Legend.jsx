export default function Legend() {
  const rows = [
    { label: 'M < 2.0', color: '#34d399', size: 5 },
    { label: '2.0 – 3.9', color: '#fbbf24', size: 6 },
    { label: '4.0 – 4.9', color: '#f59e0b', size: 8 },
    { label: '5.0 – 5.9', color: '#ef4444', size: 10 },
    { label: '>= 6.0', color: '#991b1b', size: 12 },
  ];

  return (
    <div
      className='legend'
      style={{
        position: 'absolute',
        bottom: 20,
        right: 12,
        background: 'rgba(0,0,0,0.7)',
        color: '#fff',
        padding: '16px',
        borderRadius: 12,
        fontSize: 16,
        lineHeight: 1.5,
        zIndex: 1000,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 18 }}>
        Magnitude Legend
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {rows.map((r) => (
          <div
            key={r.label}
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <span
              style={{
                width: r.size,
                height: r.size,
                borderRadius: 999,
                background: r.color,
                display: 'inline-block',
                border: '1px solid #111827',
              }}
            />
            <span style={{ fontSize: 16 }}>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
