import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { 
  FiBarChart2, 
  FiMap, 
  FiHeart, 
  FiHelpCircle, 
  FiChevronLeft, 
  FiChevronRight,
  FiUsers,
  FiUser
} from "react-icons/fi";

export default function Sidebar() {
  const location = useLocation();
  const [role, setRole] = useState("user"); 
  const [isCollapsed, setIsCollapsed] = useState(false);

  // ✅ User role fetch function
  async function fetchUserRole() {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/getuserdata", {
        withCredentials: true,
      });
      return res.data.role;
    } catch (err) {
      console.error("Error fetching user data:", err.response?.data || err.message);
      return "user"; // default role
    }
  }

  useEffect(() => {
    const initialize = async () => {
      const userRole = await fetchUserRole();
      setRole(userRole);
    };
    initialize();
  }, []);

  const navItems = [
    { path: "/analytics", label: "Analytics Dashboard", icon: <FiBarChart2 className="w-5 h-5" /> },
    { path: "/Evacuation", label: "Evacuation Map", icon: <FiMap className="w-5 h-5" /> },
    { path: "/services", label: "Services", icon: <FiHeart className="w-5 h-5" /> },
    { path: "/help", label: "Help", icon: <FiHelpCircle className="w-5 h-5" /> },
    { path: "/user_request", label: "User Dashboard", icon: <FiUser className="w-5 h-5" /> },
  ];

  // 🎨 Theme colors
  const bgStart = "from-white";
  const bgEnd = "to-[rgb(209,216,190)]";
  const activeBg = "bg-[rgb(129,154,145)]";
  const inactiveText = "text-[rgb(167,193,168)]";
  const hoverBg = "hover:bg-[rgb(129,154,145)] hover:text-white";

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-20 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      <aside
        className={`h-screen bg-gradient-to-b ${bgStart} ${bgEnd} text-black flex-shrink-0 fixed left-0 top-0 
        overflow-y-auto transition-all duration-300 z-30 shadow-lg
        ${isCollapsed ? "w-16" : "w-64"} lg:relative lg:z-0`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-[rgb(246,243,243)] hover:bg-[rgb(212,218,212)] text-black rounded-full w-6 h-6 
          flex items-center justify-center shadow-md z-10 transition-all mr-5 duration-300 hidden lg:flex"
        >
          {isCollapsed ? <FiChevronRight size={12} /> : <FiChevronLeft size={14} />}
        </button>

        <div className="px-3 pt-6 flex flex-col h-full">
          {/* Main Navigation */}
          <nav className="flex-1">
            <div className="mb-8 mt-8">
              {!isCollapsed && <h3 className="px-4 text-lg font-bold uppercase tracking-wider text-black mb-3">SIDEBAR</h3>}
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link to={item.path}>
                        <div
                          className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl mx-2 transition-all duration-200 group
                            ${isActive ? activeBg + " text-white shadow-inner" : inactiveText + " " + hoverBg}`}
                        >
                          <div className={`${isActive ? "text-white" : "text-black group-hover:text-white"}`}>
                            {item.icon}
                          </div>
                          {!isCollapsed && <span className="text-sm font-medium text-black">{item.label}</span>}
                          {isCollapsed && (
                            <div className="absolute left-full ml-1 mr-1 mt-5 px-2 py-6 bg-[rgb(129,154,145)] text-black text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-md whitespace-nowrap">
                              {item.label}
                            </div>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}

                {/* ✅ Volunteer Panel only for volunteer role */}
                {role === "volunteer" && (
                  <li>
                    <Link to="/volunteer">
                      <div className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl mx-2 transition-all duration-200 group bg-[rgb(129,154,145)] text-white shadow-inner">
                        <FiUsers className="w-5 h-5" />
                        {!isCollapsed && <span className="text-sm font-medium">Volunteer Panel</span>}
                      </div>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <p className="text-xs text-[rgb(167,193,168)] mt-6 px-4 text-center">
              © {new Date().getFullYear()} FlashAlert. All rights reserved.
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
