import Header from "../components/Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (

    <div className="flex flex-col h-screen">
      {/* Header Top */}
      <Header />

      {/* Below Header → Sidebar + Content */}
      <div className="flex  overflow-hidden">
        {/* Sidebar Left */}
        <div className="bg-gradient-to-b from-white to-[rgb(209,216,190)] shadow-md">
          <Sidebar />
        </div>

        {/* Content Right */}
        <main className="flex-1 bg-white overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>

   
  );
}
