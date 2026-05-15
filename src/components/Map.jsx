import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useFoodData } from '../hooks/useFoodData'
import StatePanel from './StatePanel'
import FilterBar from './FilterBar'

const INDIA_CENTER = [22.5, 82.3]
const INDIA_ZOOM = 5

function getColor(count) {
  if (count >= 5) return '#9b2335'
  if (count >= 3) return '#c0392b'
  if (count >= 1) return '#e07b54'
  return '#e8e0d5'
}

export default function MapView() {
  const { data, loading, error } = useFoodData()
  const [selectedState, setSelectedState] = useState(null)
  const [geoJson, setGeoJson] = useState(null)
  const [filter, setFilter] = useState({ region: '' })

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}india-states.geojson`)
      .then(r => r.json())
      .then(setGeoJson)
      .catch(err => console.error('Failed to load GeoJSON:', err))
  }, [])

  const filteredData = filter.region
    ? data.filter(row => row.region === filter.region)
    : data

  const dataByState = filteredData.reduce((acc, row) => {
    if (!acc[row.state]) acc[row.state] = []
    acc[row.state].push(row)
    return acc
  }, {})

  const stateName = feature =>
    feature.properties.NAME_1 ||
    feature.properties.ST_NM ||
    feature.properties.name ||
    ''

  function styleFeature(feature) {
    const name = stateName(feature)
    const count = dataByState[name]?.length ?? 0
    return {
      fillColor: getColor(count),
      weight: 1,
      color: '#a89880',
      fillOpacity: 0.7,
    }
  }

  function onEachFeature(feature, layer) {
    const name = stateName(feature)
    layer.bindTooltip(name, { sticky: true, className: 'state-tooltip' })
    layer.on({
      click: () => setSelectedState(name),
      mouseover: e => e.target.setStyle({ weight: 2, fillOpacity: 0.9 }),
      mouseout: e => e.target.setStyle({ weight: 1, fillOpacity: 0.7 }),
    })
  }

  if (error) {
    return (
      <div style={{ padding: 24, color: '#c0392b' }}>
        Failed to load data: {error.message}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <FilterBar filter={filter} onChange={setFilter} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <MapContainer
          center={INDIA_CENTER}
          zoom={INDIA_ZOOM}
          style={{ flex: 1 }}
          minZoom={4}
          maxZoom={10}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          {geoJson && (
            <GeoJSON
              key={filter.region}
              data={geoJson}
              style={styleFeature}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>

        {selectedState && (
          <StatePanel
            state={selectedState}
            data={dataByState[selectedState] ?? []}
            loading={loading}
            onClose={() => setSelectedState(null)}
          />
        )}
      </div>

      <div style={{
        position: 'absolute', bottom: 32, left: 16, zIndex: 1000,
        background: '#fff', borderRadius: 8, padding: '10px 14px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)', fontSize: 12,
      }}>
        {[
          { color: '#9b2335', label: '5+ dishes' },
          { color: '#c0392b', label: '3–4 dishes' },
          { color: '#e07b54', label: '1–2 dishes' },
          { color: '#e8e0d5', label: 'No data yet' },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <div style={{ width: 14, height: 14, borderRadius: 2, background: color }} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
