function Environments() {
  const services = ['Node.js', 'MongoDB', 'Redis', 'Docker']

  const files = ['Dockerfile', 'docker-compose.yml', '.env.example', 'README.md']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1e40af', marginBottom: '4px' }}>
          Environment Overview
        </h1>
        <p style={{ color: '#64748b', fontSize: '13px' }}>
          Generated environment configuration and repository details.
        </p>
      </div>

      {/* Health Score */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#1e40af', marginBottom: '6px' }}>
            Health Score
          </h2>
          <p style={{ color: '#64748b', fontSize: '13px' }}>
            Environment is ready for deployment
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '48px', fontWeight: 700, color: '#16a34a', lineHeight: 1 }}>
            92%
          </div>
          <span style={{
            fontSize: '12px', fontWeight: 600,
            color: '#16a34a',
            background: '#dcfce7',
            padding: '3px 10px',
            borderRadius: '20px',
            marginTop: '6px',
            display: 'inline-block',
          }}>
            Ready
          </span>
        </div>
      </div>

      {/* Services + Files */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        {/* Services */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
            Detected Services
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {services.map(service => (
              <span key={service} style={{
                padding: '6px 14px',
                borderRadius: '20px',
                background: '#dbeafe',
                color: '#1d4ed8',
                fontSize: '13px',
                fontWeight: 500,
              }}>
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Files */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
            Generated Files
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {files.map(file => (
              <div key={file} style={{
                background: '#f0f9ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '13px',
                color: '#334155',
              }}>
                📄 {file}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Issues */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
          Detected Issues
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: '8px', padding: '10px 14px',
            fontSize: '13px', color: '#dc2626',
          }}>
            ⚠ MongoDB service not found
          </div>
          <div style={{
            background: '#fefce8', border: '1px solid #fef08a',
            borderRadius: '8px', padding: '10px 14px',
            fontSize: '13px', color: '#ca8a04',
          }}>
            ⚠ Node version mismatch
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
          AI Recommendations
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'Use Node.js 22 for better compatibility',
            'Add Redis container to docker-compose.yml',
            'Create .env.example for onboarding developers',
          ].map((rec, i) => (
            <div key={i} style={{
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              borderRadius: '8px', padding: '10px 14px',
              fontSize: '13px', color: '#16a34a',
            }}>
              ✓ {rec}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Environments