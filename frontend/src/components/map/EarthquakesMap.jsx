import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Legend from './Legend'

function formatUTC(iso) {
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
  } catch {
    return iso
  }
}

function magnitudeColor(mag) {
  if (mag >= 6) return '#991b1b'
  if (mag >= 5) return '#ef4444'
  if (mag >= 4) return '#f59e0b'
  if (mag >= 2) return '#fbbf24'
  return '#34d399'
}

function magnitudeRadius(mag) {
  const r = 2 + Math.pow(Math.max(0, Number(mag) || 0), 1.6)
  return Math.max(3, Math.min(18, r))
}

function computeBounds(points) {
  let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180
  for (const p of points) {
    if (p.lat < minLat) minLat = p.lat
    if (p.lat > maxLat) maxLat = p.lat
    if (p.lng < minLng) minLng = p.lng
    if (p.lng > maxLng) maxLng = p.lng
  }
  return [[minLat, minLng], [maxLat, maxLng]]
}

function FitBounds({ points }) {
  const map = useMap()
  useEffect(() => {
    if (!points?.length) return
    const b = computeBounds(points)
    if (Number.isFinite(b[0][0]) && Number.isFinite(b[0][1]) && Number.isFinite(b[1][0]) && Number.isFinite(b[1][1])) {
      try { map.fitBounds(b, { padding: [30, 30] }) } catch {}
    }
  }, [points, map])
  return null
}

export default function EarthquakesMap({ features = [], height = '500px', cluster = false }) {
  const mapKeyRef = useRef('map-' + Math.random().toString(36).slice(2))
  const points = useMemo(() => {
    const arr = []
    for (const f of features || []) {
      const coords = f?.geometry?.coordinates
      const props = f?.properties || {}
      if (Array.isArray(coords) && coords.length >= 2) {
        const lng = Number(coords[0])
        const lat = Number(coords[1])
        const depth = Number(coords[2] ?? 0)
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
          arr.push({ lat, lng, depth, props })
        }
      }
    }
    return arr
  }, [features])

  const center = useMemo(() => ({ lat: 41.8719, lng: 12.5674, zoom: 5 }), [])

  return (
    <div style={{ width: '100%', height }}>
      <MapContainer key={mapKeyRef.current} center={[center.lat, center.lng]} zoom={center.zoom} style={{ width: '100%', height: '100%' }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <FitBounds points={points} />

        {points.map((p, idx) => {
          const mag = p.props?.mag ?? p.props?.magnitude
          const color = magnitudeColor(mag)
          const radius = magnitudeRadius(mag)
          return (
            <CircleMarker
              key={`${p.lat},${p.lng},${idx}`}
              center={[p.lat, p.lng]}
              radius={radius}
              pathOptions={{ color: '#111827', weight: 1, fillColor: color, fillOpacity: 0.8 }}
            >
              <Tooltip direction='top' offset={[0, -4]} opacity={0.9}>
                <div>
                  <div><strong>Mag:</strong> {mag}</div>
                  <div><strong>Depth:</strong> {Number.isFinite(p.depth) ? `${p.depth} km` : '-'}</div>
                  <div><strong>Place:</strong> {p.props?.place || '-'}</div>
                </div>
              </Tooltip>
              <Popup>
                <div style={{ minWidth: 180 }}>
                  <div><strong>Magnitude:</strong> {mag}</div>
                  <div><strong>Depth:</strong> {Number.isFinite(p.depth) ? `${p.depth} km` : '-'}</div>
                  <div><strong>Place:</strong> {p.props?.place || '-'}</div>
                  <div><strong>Time:</strong> {p.props?.time ? formatUTC(p.props.time) : '-'}</div>
                  <div><strong>Coords:</strong> {p.lat.toFixed(4)}, {p.lng.toFixed(4)}</div>
                  {p.props?.eventId ? <div><strong>ID:</strong> {p.props.eventId}</div> : null}
                </div>
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
      <Legend />
    </div>
  )
}


