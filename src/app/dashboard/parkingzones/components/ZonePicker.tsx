"use client";

import L from "leaflet";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

export type BBox = {
  topLeft: L.LatLngLiteral;
  bottomRight: L.LatLngLiteral;
};

// type location = [BBox, BBox];

type ZonePickerProps = {
  initial: BBox | null; // Initial bounding box for the zone picker
  onReady: (bbox: BBox) => void; // Callback function to handle changes in the bounding box
};

export default function ZonePicker({ initial, onReady }: ZonePickerProps) {
  // const fgRef = useRef<L.FeatureGroup>(null); // Reference to the feature group for the drawn rectangle

  const handleCreated = (e: L.DrawEvents.Created) => {
    const rect = e.layer as L.Rectangle; // Get the drawn rectangle layer
    const bounds = rect.getBounds(); // Get the bounds of the rectangle
    console.log("topLeft: ", bounds.getNorthWest()); // Log the north-west corner
    console.log("bottomRight: ", bounds.getSouthEast()); // Log the south-east corner
    const bbox: BBox = {
      topLeft: bounds.getNorthWest(), // Get the north-west corner of the rectangle
      bottomRight: bounds.getSouthEast(), // Get the south-east corner of the rectangle
    };

    // console.log("bbox: ", bbox); // Log the bounding box
    // const location = [bbox.topLeft, bbox.bottomRight]; // Create a location array with the corners of the rectangle

    // console.log("location: ", location); // Log the location array
    onReady(bbox); // Call the onSubmit function with the new bounding box
  };

  const handleEdited = (e: L.DrawEvents.Edited) => {
    const layers = e.layers; // Get the edited layers
    layers.eachLayer((layer: L.Layer) => {
      const bounds = (layer as L.Rectangle).getBounds(); // Get the bounds of the edited rectangle
      console.log(
        "Edited --> : ",
        bounds.getNorthWest(),
        bounds.getSouthEast()
      ); // Log the north-west corner

      const bbox: BBox = {
        topLeft: bounds.getNorthWest(), // Get the north-west corner of the rectangle
        bottomRight: bounds.getSouthEast(), // Get the south-east corner of the rectangle
      };
      // console.log("Edited bbox: ", bbox); // Log the bounding box

      const location = [bbox.topLeft, bbox.bottomRight]; // Create a location array with the corners of the rectangle
      console.log("Edited location: ", location); // Log the location array

      onReady(bbox); // Call the onSubmit function with the new bounding box
    });
  };

  return (
    <MapContainer center={[60.17, 24.94]} zoom={13} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        <EditControl
          position="topright"
          draw={{
            rectangle: true, // Enable rectangle drawing
            polyline: false, // Disable polyline drawing
            polygon: false, // Disable polygon drawing
            circle: false, // Disable circle drawing
            marker: false, // Disable marker drawing
            circlemarker: false, // Disable circle marker drawing
          }}
          onCreated={handleCreated} // Handle the creation of a new rectangle
          onEdited={handleEdited} // Handle the editing of an existing rectangle
        />
      </FeatureGroup>
    </MapContainer>
  );
}
