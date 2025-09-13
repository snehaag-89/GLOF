import React from "react";
import Alerts from "../components/Alerts";
import AlertComponent from "../components/Alerts";
import Analytics from "../components/Analytics";
import MapBox from "../components/MapBox";
import Volunteers from "../components/Volunteers";
import Donations from "../components/Donations";

function Dashboard() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <AlertComponent />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <Analytics />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <MapBox />
        </div>
      </div>

      {/* Bottom 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold mb-3">Volunteer Registration</h2>
          <Volunteers />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold mb-3">Food Donation</h2>
          <Donations />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
