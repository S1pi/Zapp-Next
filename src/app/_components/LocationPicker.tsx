"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

type LatLng = { latitude: number; longitude: number };

type LocationPickerProps = {
  onSelectedLocation: (location: LatLng) => void; // Callback function to handle selected location
  initialPosition?: LatLng; // Optional initial position for the map
};

const icon = new L.Icon({
  iconUrl: "/icons/ZAPP-car-pointer.png", // Path to the marker icon image
  iconSize: [36, 36], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
  className: "drop-shadow", // Class name for the icon
});

export default function LocationPicker({
  onSelectedLocation,
  initialPosition,
}: LocationPickerProps) {
  const [position, setPosition] = useState<LatLng>(
    initialPosition ?? { latitude: 60.1695, longitude: 24.9354 } // Default to Helsinki if no initial position is provided
  );

  function ClickHandler() {
    useMapEvents({
      click(e: any) {
        const { lat, lng } = e.latlng; // Get latitude and longitude from the click event
        const p = { lat, lng };

        const pos = {
          latitude: p.lat,
          longitude: p.lng,
        }; // Create a new position object with the clicked coordinates

        setPosition(pos); // Update the position state with the clicked coordinates
        onSelectedLocation(pos); // Call the callback function with the new coordinates
      },
    });
    return null; // Return null as this component does not render anything
  }

  return (
    <MapContainer
      center={[position.latitude, position.longitude]}
      zoom={12}
      scrollWheelZoom
      style={{ height: "400px", width: "100%" }} // Set the map container size
      className="rounded-lg shadow-md max-h-full" // Add some styling to the map container
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap tile layer URL
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Marker at the selected position */}
      <Marker position={[position.latitude, position.longitude]} icon={icon} />
      <ClickHandler />
    </MapContainer>
  );
}
