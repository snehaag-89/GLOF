import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapBox() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">🗺️ Evacuation Map</h2>
      <MapContainer center={[28.3949, 84.1240]} zoom={7} style={{ height: "250px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={[28.3949, 84.1240]}>
          <Popup>Safe Zone</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
