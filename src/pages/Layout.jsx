import Header from "../components/Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
      <div className="flex flex-col min-h-screen">
  {/* Header */}
  <div>
    <Header />
  </div>

  {/* Body: Sidebar + Main Content */}
  <div className="flex flex-1">
    {/* Sidebar */}
    <div className="w-64 bg-gradient-to-b from-white to-[rgb(209,216,190)] shadow-md flex flex-col">
      <Sidebar />
    </div>

    {/* Main Content */}
    <main className="flex-1 bg-white">
      <Outlet />
    </main>
  </div>
</div>
  );
}
