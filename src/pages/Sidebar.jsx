import React from "react";

const navItems = [
  { id: "analytics", label: "Analytics Dashboard", icon: "chart" },
  { id: "evac", label: "Evacuation Map", icon: "map" },
  { id: "medical", label: "Medical Assistance", icon: "medical" },
  { id: "shelter", label: "Shelter Information", icon: "home" },
  { id: "food", label: "Food Assistance", icon: "food" },
  { id: "volunteer", label: "Volunteer Coordination", icon: "hands" },
];

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
    case "home":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M3 11.5L12 4l9 7.5M5 21V12h14v9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "food":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M7 3v12M17 3v12M3 21h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "hands":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 20s-4-4-8-4v-3s4 1 8 5c4-4 8-5 8-5v3c-4 0-8 4-8 4z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ onNavigate = () => {} }) {
  return (
    <aside className="w-72 min-h-screen bg-white pt-0 text-black flex-shrink-0">
      {/* Header */}
      <div className="px-6 py-7">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-md bg-gray-200 flex items-center justify-center">
            <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none">
              <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-lg font-semibold">Glof Early Warning System</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-black hover:bg-gray-200 transition"
              >
                <Icon name={item.icon} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

    
    </aside>
  );
}
