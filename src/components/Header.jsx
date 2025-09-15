import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-br from-[#0f2027] to-[#203a43] shadow-lg pl-6 py-3 flex items-center justify-between">
      {/* Left - Logo / Title */}
      <div className="text-3xl font-bold text-white flex-1 min-w-0">
        Flood Early Warning System
      </div>

      {/* Right - Home + Logout buttons */}
      <div className="flex items-center flex-shrink-0 gap-4 mr-4">
        <Link
          to="/"
          className="px-5 py-2 bg-[#4caf50] text-white font-semibold rounded-md hover:bg-[#388e3c] transition-colors duration-200"
        >
          Home
        </Link>
        <button className="px-5 py-2 h-10 w-24 bg-[#00bcd4] text-white font-semibold rounded-md hover:bg-[#0097a7] transition-colors duration-200">
          Logout
        </button>
         {/* <button className="px-5 py-2 ml-5 bg-[#00bcd4] text-white font-semibold rounded-md hover:bg-[#0097a7] transition-colors duration-200 flex items-center justify-center">
          profile
        </button> */}
      </div>
    </header>
  );
}
