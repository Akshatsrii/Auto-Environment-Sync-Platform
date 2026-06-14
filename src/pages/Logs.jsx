function Logs() {
  const logs = [
    { repo: 'Banking System',    status: 'Completed', health: '92%', date: 'Today' },
    { repo: 'E-Commerce App',    status: 'Running',   health: '--',  date: 'Yesterday' },
    { repo: 'Portfolio Website', status: 'Failed',    health: '65%', date: '2 Days Ago' },
  ]

  const statusStyle = (status) => {
    if (status === 'Completed') return { background: '#dcfce7', color: '#16a34a' }
    if (status === 'Running')   return { background: '#fef9c3', color: '#ca8a04' }
    return                             { background: '#fef2f2', color: '#dc2626' }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1e40af', marginBottom: '4px' }}>
          Logs
        </h1>
        <p style={{ color: '#64748b', fontSize: '13px' }}>
          Repository analysis history and activity logs.
        </p>
      </div>

      {/* Table */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af' }}>
            Repository Activity
          </h2>
          <button style={{
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}>
            Export Logs
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              {['Repository', 'Status', 'Health Score', 'Date'].map(col => (
                <th key={col} style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#64748b',
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 12px', fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>
                  {log.repo}
                </td>
                <td style={{ padding: '14px 12px' }}>
                  <span style={{
                    ...statusStyle(log.status),
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    {log.status}
                  </span>
                </td>
                <td style={{ padding: '14px 12px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                  {log.health}
                </td>
                <td style={{ padding: '14px 12px', fontSize: '13px', color: '#64748b' }}>
                  {log.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { label: 'Completed Scans', value: '18', color: '#16a34a', bg: '#dcfce7' },
          { label: 'Running Scans',   value: '3',  color: '#ca8a04', bg: '#fef9c3' },
          { label: 'Failed Scans',    value: '2',  color: '#dc2626', bg: '#fef2f2' },
        ].map(card => (
          <div key={card.label} style={{
            background: '#ffffff',
            border: '1px solid #bfdbfe',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
          }}>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>{card.label}</p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Logs