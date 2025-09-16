import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-[#f1f8e9] via-[#f9fbe7] to-[#f1f8e9] py-5 flex items-center justify-between border-b border-[#c5e1a5]">
      {/* Left - Logo/Title aligned to the left with no padding */}
      <div className="text-3xl font-bold text-[#33691e] ml-6">
        Flood Warning System
      </div>

      {/* Right - Home + Logout buttons */}
      <div className="flex items-center flex-shrink-0 gap-4 mr-6">
        <Link
          to="/"
          className="px-6 py-3 bg-[#33691e] text-white font-semibold rounded-lg hover:bg-[#2e7d32] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Home
        </Link>
        <button className="px-6 py-3 bg-[#33691e] text-white font-semibold rounded-lg hover:bg-[#2e7d32] transition-all duration-300 shadow-md hover:shadow-lg">
          Logout
        </button>
      </div>
    </header>
  );
}
