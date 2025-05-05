"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

type LatLng = { lat: number; lng: number };

type LocationPickerProps = {
  onSelectedLocation: (location: LatLng) => void; // Callback function to handle selected location
  initialPosition?: LatLng; // Optional initial position for the map
};

export default function LocationPicker({
  onSelectedLocation,
  initialPosition,
}: LocationPickerProps) {
  const [position, setPosition] = useState<LatLng>(
    initialPosition ?? { lat: 60.1695, lng: 24.9354 } // Default to Helsinki if no initial position is provided
  );

  useMapEvents({
    click(e: any) {
      const { lat, lng } = e.latlng; // Get latitude and longitude from the click event
      setPosition({ lat, lng }); // Update the position state with the clicked coordinates
      onSelectedLocation({ lat, lng }); // Call the callback function with the new coordinates
    },
  });
}
