import FoodCard from './FoodCard'

export default function StatePanel({ state, data, loading, onClose }) {
  return (
    <div style={{
      width: 360,
      minWidth: 300,
      background: '#fff',
      borderLeft: '1px solid #e0d8cf',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    }}>
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid #e0d8cf',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        background: '#faf9f6',
        zIndex: 1,
      }}>
        <h2 style={{ fontSize: 17, fontWeight: 600 }}>{state}</h2>
        <button
          onClick={onClose}
          aria-label="Close panel"
          style={{
            border: 'none', background: 'none', cursor: 'pointer',
            fontSize: 22, color: '#888', lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      <div style={{ padding: 16 }}>
        {loading ? (
          <p style={{ color: '#aaa', fontSize: 14 }}>Loading...</p>
        ) : data.length === 0 ? (
          <p style={{ color: '#aaa', fontSize: 14 }}>
            No food data yet for {state}.<br />
            <a
              href="https://docs.google.com/spreadsheets"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#c0392b', fontSize: 13, marginTop: 8, display: 'inline-block' }}
            >
              Contribute via Google Sheet →
            </a>
          </p>
        ) : (
          data.map((item, i) => <FoodCard key={i} item={item} />)
        )}
      </div>
    </div>
  )
}
