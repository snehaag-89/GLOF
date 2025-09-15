import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icons
const createCustomIcon = (className, html) => {
  return L.divIcon({
    className: `custom-marker ${className}`,
    html,
    iconSize: [className === 'mmmut-marker' ? 28 : 24, className === 'mmmut-marker' ? 28 : 24]
  });
};

const EvacuationModal = ({ visible, onClose }) => {
  const [map, setMap] = useState(null);
  
  useEffect(() => {
    if (map && visible) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [map, visible]);

  if (!visible) return null;

  const shelters = [
    {lat: 26.7606, lng: 83.3732, name: "MMMUT Main Building", capacity: "High", distance: "0 km"},
    {lat: 26.7640, lng: 83.3780, name: "Public Library", capacity: "Low", distance: "3.5 km"},
    {lat: 26.7550, lng: 83.3650, name: "City Convention Center", capacity: "High", distance: "5.8 km"},
    {lat: 26.7500, lng: 83.3800, name: "Gorakhpur Railway Station", capacity: "Medium", distance: "7.2 km"}
  ];

  const routes = [
    [[26.7606, 83.3732], [26.7640, 83.3780]], // To Public Library
    [[26.7606, 83.3732], [26.7550, 83.3650]], // To Convention Center
    [[26.7606, 83.3732], [26.7500, 83.3800]]  // To Railway Station
  ];

  return (
    <div className="evacuation-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Evacuation Plan for High-Risk Areas</h2>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        
        <div className="evacuation-map">
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
            
            {/* MMMUT Marker */}
            <Marker 
              position={[26.7606, 83.3732]} 
              icon={createCustomIcon('mmmut-marker', '<i class="fas fa-university"></i>')}
            >
              <Popup><b>MMMUT Gorakhpur</b><br />Starting Point</Popup>
            </Marker>
            
            {/* Shelter Markers */}
            {shelters.map((shelter, index) => (
              <Marker
                key={index}
                position={[shelter.lat, shelter.lng]}
                icon={createCustomIcon('shelter-marker', '<i class="fas fa-home"></i>')}
              >
                <Popup>
                  <b>{shelter.name}</b><br />
                  Capacity: {shelter.capacity}<br />
                  Distance: {shelter.distance}
                </Popup>
              </Marker>
            ))}
            
            {/* Danger Zones */}
            <Circle
              center={[26.7620, 83.3750]}
              color="red"
              fillColor="#f03"
              fillOpacity={0.3}
              radius={300}
            >
              <Popup>Danger Zone - Avoid Area</Popup>
            </Circle>
            
            <Circle
              center={[26.7580, 83.3700]}
              color="red"
              fillColor="#f03"
              fillOpacity={0.3}
              radius={200}
            >
              <Popup>Danger Zone - Avoid Area</Popup>
            </Circle>
            
            {/* Evacuation Routes */}
            {routes.map((route, index) => (
              <Polyline
                key={index}
                positions={route}
                color="blue"
                dashArray="5, 10"
              />
            ))}
          </MapContainer>
        </div>
        
        <h3>Nearest Shelters</h3>
        <div className="shelter-list">
          {shelters.map((shelter, index) => (
            <div key={index} className="shelter-item">
              <div className="shelter-name">{shelter.name}</div>
              <div className="shelter-address">Deoria Road, Gorakhpur</div>
              <div className="shelter-capacity">
                <span className={`capacity-dot capacity-${shelter.capacity.toLowerCase()}`}></span>
                Capacity: {shelter.capacity} ({shelter.capacity === 'High' ? '500' : shelter.capacity === 'Medium' ? '300' : '150'} people)
              </div>
              <div className="distance-info">Distance: {shelter.distance}</div>
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h3>Evacuation Instructions</h3>
          <ul>
            <li>Follow the marked evacuation routes (blue dashed lines)</li>
            <li>Avoid areas marked in red (flood danger zones)</li>
            <li>Bring essential items only: documents, medicines, water</li>
            <li>Assist children, elderly, and people with disabilities</li>
            <li>Listen to emergency broadcasts for updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EvacuationModal;