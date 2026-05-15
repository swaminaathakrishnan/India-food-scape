import { Link } from 'react-router-dom'
import { useFoodData } from '../hooks/useFoodData'

const STATUS_STYLE = {
  pending: { background: '#f8d7da', color: '#842029' },
  review:  { background: '#fff3cd', color: '#856404' },
}

export default function AdminPanel() {
  const { data, loading } = useFoodData()
  const pending = data.filter(row => row.status === 'pending' || row.status === 'review')

  return (
    <div style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 24,
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Pending Contributions</h1>
        <Link to="/" style={{ color: '#c0392b', textDecoration: 'none', fontSize: 14 }}>
          ← Back to map
        </Link>
      </div>

      {loading ? (
        <p style={{ color: '#aaa' }}>Loading...</p>
      ) : pending.length === 0 ? (
        <p style={{ color: '#aaa' }}>No pending contributions — everything is published.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#faf9f6', textAlign: 'left' }}>
              {['State', 'Region', 'Veg dish', 'Non-veg dish', 'Contributor', 'Status', ''].map(h => (
                <th key={h} style={{ padding: '8px 12px', borderBottom: '2px solid #e0d8cf', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pending.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f0ebe3' }}>
                <td style={{ padding: '9px 12px', fontWeight: 500 }}>{row.state}</td>
                <td style={{ padding: '9px 12px', color: '#777' }}>{row.region || '—'}</td>
                <td style={{ padding: '9px 12px' }}>{row.veg_name || '—'}</td>
                <td style={{ padding: '9px 12px' }}>{row.meat_name || '—'}</td>
                <td style={{ padding: '9px 12px', color: '#777' }}>{row.contributor || '—'}</td>
                <td style={{ padding: '9px 12px' }}>
                  <span style={{
                    ...(STATUS_STYLE[row.status] ?? { background: '#eee', color: '#555' }),
                    padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600,
                  }}>
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: '9px 12px' }}>
                  <span style={{ fontSize: 12, color: '#bbb' }}>Edit in Sheet</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p style={{ marginTop: 24, fontSize: 12, color: '#bbb', lineHeight: 1.6 }}>
        To publish or reject a contribution, update the <strong>status</strong> column
        in the Google Sheet's <em>contributions</em> tab directly.
        Changes will appear here on the next data refresh.
      </p>
    </div>
  )
}
