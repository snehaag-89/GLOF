import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const FloodMapCard = ({ data }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      map.setView([26.7606, 83.3732], 13);
    }
  }, [map]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Affected Areas</h2>
        <i className="fas fa-map-marked-alt"></i>
      </div>
      <div className="map-container">
        <MapContainer
          center={[26.7606, 83.3732]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[26.7606, 83.3732]}>
            <Popup>
              <b>MMMUT Gorakhpur</b><br />Flood Monitoring Center
            </Popup>
          </Marker>
          <Circle
            center={[26.7620, 83.3750]}
            color="red"
            fillColor="#f03"
            fillOpacity={0.5}
            radius={300}
          >
            <Popup>Flood Risk Area</Popup>
          </Circle>
          <Circle
            center={[26.7580, 83.3700]}
            color="red"
            fillColor="#f03"
            fillOpacity={0.5}
            radius={200}
          >
            <Popup>Flood Risk Area</Popup>
          </Circle>
        </MapContainer>
      </div>
      <div className="last-updated">Last updated: <span>{new Date().toLocaleTimeString()}</span></div>
    </div>
  );
};

export default FloodMapCard;