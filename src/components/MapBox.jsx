import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const FloodMapCard = ({ data }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      map.setView([26.7606, 83.3732], 13);
    }
  }, [map]);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center">
          <i className="fas fa-map-marked-alt text-[#00bcd4] mr-2"></i>
          Affected Areas
        </h2>
      </div>

      {/* Map */}
      <div className="h-[400px] w-full rounded-xl overflow-hidden border border-white/20 shadow-inner">
        <MapContainer
          center={[26.7606, 83.3732]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Main Marker */}
          <Marker position={[26.7606, 83.3732]}>
            <Popup>
              <b>MMMUT Gorakhpur</b>
              <br />
              Flood Monitoring Center
            </Popup>
          </Marker>

          {/* Danger Zones */}
          <Circle
            center={[26.762, 83.375]}
            color="#ff6b6b"
            fillColor="#ff6b6b"
            fillOpacity={0.3}
            radius={300}
          >
            <Popup>
              <b className="text-red-600">Flood Risk Area</b>
            </Popup>
          </Circle>

          <Circle
            center={[26.758, 83.37]}
            color="#ff6b6b"
            fillColor="#ff6b6b"
            fillOpacity={0.3}
            radius={200}
          >
            <Popup>
              <b className="text-red-600">Flood Risk Area</b>
            </Popup>
          </Circle>
        </MapContainer>
      </div>

      {/* Footer */}
      <div className="mt-3 text-xs text-gray-300 text-right">
        Last updated:{" "}
        <span className="font-semibold text-[#00bcd4]">
          {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* Custom Styles for Popup */}
      <style jsx>{`
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          padding: 6px 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
};

export default FloodMapCard;




// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fix for default markers in react-leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const FloodMapCard = ({ data }) => {
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     if (map) {
//       map.setView([26.7606, 83.3732], 13);
//     }
//   }, [map]);

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h2>Affected Areas</h2>
//         <i className="fas fa-map-marked-alt"></i>
//       </div>
//       <div className="map-container">
//         <MapContainer
//           center={[26.7606, 83.3732]}
//           zoom={13}
//           style={{ height: '100%', width: '100%' }}
//           whenCreated={setMap}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker position={[26.7606, 83.3732]}>
//             <Popup>
//               <b>MMMUT Gorakhpur</b><br />Flood Monitoring Center
//             </Popup>
//           </Marker>
//           <Circle
//             center={[26.7620, 83.3750]}
//             color="red"
//             fillColor="#f03"
//             fillOpacity={0.5}
//             radius={300}
//           >
//             <Popup>Flood Risk Area</Popup>
//           </Circle>
//           <Circle
//             center={[26.7580, 83.3700]}
//             color="red"
//             fillColor="#f03"
//             fillOpacity={0.5}
//             radius={200}
//           >
//             <Popup>Flood Risk Area</Popup>
//           </Circle>
//         </MapContainer>
//       </div>
//       <div className="last-updated">Last updated: <span>{new Date().toLocaleTimeString()}</span></div>
//     </div>
//   );
// };

// export default FloodMapCard;