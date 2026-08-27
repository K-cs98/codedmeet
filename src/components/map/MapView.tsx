"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom dark map pin icon
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface MapPin {
  id: string;
  title: string;
  location: string;
  latitude: number;
  longitude: number;
  rates?: string;
}

interface MapViewProps {
  pins: MapPin[];
  center?: [number, number];
  zoom?: number;
  onPinSelect?: (pin: MapPin) => void;
}

function LocationClickHandler({ onPinSelect }: { onPinSelect?: (pin: MapPin) => void }) {
  useMapEvents({
    click(e) {
      if (onPinSelect) {
        onPinSelect({
          id: `custom-${Date.now()}`,
          title: "Selected Location",
          location: "Custom Pin",
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      }
    },
  });
  return null;
}

export default function MapView({
  pins,
  center = [51.5074, -0.1278], // Default to London coordinates
  zoom = 12,
  onPinSelect,
}: MapViewProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[400px] bg-neutral-900 border border-neutral-800 rounded-xl animate-pulse flex items-center justify-center text-neutral-500 text-sm">
        Loading interactive map...
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border border-neutral-800 relative">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <LocationClickHandler onPinSelect={onPinSelect} />

        {pins.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.latitude, pin.longitude]}
            icon={customIcon}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-1 text-neutral-900">
                <h4 className="font-bold text-sm leading-tight">{pin.title}</h4>
                <p className="text-xs text-neutral-600 mt-1">{pin.location}</p>
                {pin.rates && (
                  <span className="inline-block mt-2 text-[10px] font-semibold bg-red-100 text-red-800 px-2 py-0.5 rounded">
                    {pin.rates}
                  </span>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}