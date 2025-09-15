import Header from "../components/Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header Top */}
     <div>
       <Header/>
       </div>

      {/* Below Header → Sidebar + Content */}
      <div className="flex  ">
        {/* Sidebar Left */}
        <div className="w-64 bg-gradient-to-b from-white to-[rgb(209,216,190)] shadow-md">
          <Sidebar />
        </div>

        {/* Content Right */}
        <main className=" bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
