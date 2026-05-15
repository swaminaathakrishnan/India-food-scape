import { Link } from 'react-router-dom'

const REGIONS = ['North', 'South', 'East', 'West', 'Northeast', 'Central']

export default function FilterBar({ filter, onChange }) {
  return (
    <div style={{
      padding: '10px 16px',
      background: '#fff',
      borderBottom: '1px solid #e0d8cf',
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      flexWrap: 'wrap',
      zIndex: 1000,
    }}>
      <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px' }}>
        India Food Scape
      </span>

      <div style={{ flex: 1 }} />

      <select
        value={filter.region}
        onChange={e => onChange({ ...filter, region: e.target.value })}
        style={{
          padding: '5px 10px', borderRadius: 6,
          border: '1px solid #ddd', fontSize: 13,
          background: '#faf9f6', cursor: 'pointer',
        }}
      >
        <option value="">All Regions</option>
        {REGIONS.map(r => <option key={r} value={r}>{r} India</option>)}
      </select>

      <Link
        to="/admin"
        style={{ fontSize: 13, color: '#c0392b', textDecoration: 'none', fontWeight: 500 }}
      >
        Admin
      </Link>
    </div>
  )
}
