// src/App.jsx
import Navbar from "./components/Navbar";
import Alerts from "./components/Alerts";
import Analytics from "./components/Analytics";
import MapBox from "./components/MapBox";

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <Alerts />

        {/* Analytics */}
        <Analytics />

        {/* Map */}
        <MapBox />
      </div>
    </div>
  );
}
