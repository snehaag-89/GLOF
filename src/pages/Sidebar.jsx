import React from "react";
import { Link } from "react-router-dom";

function Icon({ name }) {
  switch (name) {
    case "chart":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M5 3v18M12 12v9M19 8v13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "map":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "medical":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 7v10M7 12h10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="9" strokeWidth="1.2" />
        </svg>
      );
    case "help":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="1.2" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 17h.01" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-[#2c4b57] to-[#3a7184] text-white flex-shrink-0 fixed left-0 top-0 pt-8 overflow-y-auto">
      {/* Header with increased top margin */}
      <div className="px-5 pb-7">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#00bcd4] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-md font-semibold">Flood Early Warning System</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-3">
        <div className="space-y-2">
          <Link to="/analytics">
            <div className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-white hover:bg-[#3a7184] transition-colors duration-200">
              <Icon name="chart" />
              <span className="text-sm font-medium">Analytics Dashboard</span>
            </div>
          </Link>
          
          <Link to="/Evacuation">
            <div className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-white hover:bg-[#3a7184] transition-colors duration-200">
              <Icon name="map" />
              <span className="text-sm font-medium">Evacuation Map</span>
            </div>
          </Link>
          
          <Link to="/services">
            <div className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-white hover:bg-[#3a7184] transition-colors duration-200">
              <Icon name="medical" />
              <span className="text-sm font-medium">Services</span>
            </div>
          </Link>
          
          <Link to="/help">
            <div className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-white hover:bg-[#3a7184] transition-colors duration-200">
              <Icon name="help" />
              <span className="text-sm font-medium">Help</span>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}