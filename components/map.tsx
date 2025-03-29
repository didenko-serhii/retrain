'use client'

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

const icon = L.divIcon({
  className: "relative",
  html: `<div class="w-3 h-3 rounded-full bg-red-500 border border-white shadow-xl"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  popupAnchor: [0, -10],
})

function FlyToTrain({ train }: { train: any }) {
  const map = useMap()

  useEffect(() => {
    if (train?.trainLocations?.[0]) {
      const [lng, lat] = train.trainLocations[0].location
      map.flyTo([lat, lng], 12)
    }
  }, [train, map])

  return null
}

export default function Map({
  trains,
  focusedTrain,
}: {
  trains: any[]
  focusedTrain?: any
}) {
  return (
    <MapContainer
      center={[60.1699, 24.9384]}
      zoom={11}
      className="h-full w-full z-0"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {trains.map((train: any) => {
        const loc = train.trainLocations?.[0]
        if (!loc) return null
        return (
          <Marker
            key={`${train.trainNumber}-${train.departureDate}`}
            position={[loc.location[1], loc.location[0]]}
            icon={icon}
          >
            <Popup>
              <div className="text-sm space-y-1">
                <div className="font-medium">Train: {train.trainNumber}</div>
                <div className="text-xs text-gray-500">
                  Speed: {loc.speed} km/h
                </div>
                <div className="text-xs text-gray-500">
                  Time: {new Date(loc.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
      {focusedTrain && <FlyToTrain train={focusedTrain} />}
    </MapContainer>
  )
}
