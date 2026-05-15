export default function FoodCard({ item }) {
  return (
    <div style={{
      border: '1px solid #e0d8cf',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      background: '#fff',
    }}>
      {item.veg_name && (
        <div style={{ marginBottom: item.meat_name ? 12 : 0 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 0.8,
            textTransform: 'uppercase', color: '#2e7d32',
          }}>
            Veg
          </span>
          <p style={{ fontWeight: 600, marginTop: 3, fontSize: 15 }}>{item.veg_name}</p>
          {item.veg_style && (
            <p style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{item.veg_style}</p>
          )}
          {item.veg_note && (
            <p style={{ fontSize: 12, color: '#888', marginTop: 4, fontStyle: 'italic' }}>
              {item.veg_note}
            </p>
          )}
        </div>
      )}

      {item.meat_name && (
        <div>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 0.8,
            textTransform: 'uppercase', color: '#b71c1c',
          }}>
            Non-veg
          </span>
          <p style={{ fontWeight: 600, marginTop: 3, fontSize: 15 }}>{item.meat_name}</p>
          {item.meat_style && (
            <p style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{item.meat_style}</p>
          )}
        </div>
      )}

      {item.story && (
        <p style={{
          fontSize: 13, color: '#444', lineHeight: 1.6, marginTop: 10,
          borderTop: '1px solid #f0ebe3', paddingTop: 10,
        }}>
          {item.story}
        </p>
      )}

      {item.source_label && (
        <p style={{ fontSize: 11, color: '#aaa', marginTop: 10 }}>
          Source:{' '}
          {item.source_url
            ? <a href={item.source_url} target="_blank" rel="noreferrer" style={{ color: '#c0392b' }}>{item.source_label}</a>
            : item.source_label}
        </p>
      )}
    </div>
  )
}
