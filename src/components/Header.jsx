import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="w-full bg-[#30465c] py-7 flex justify-between">
      {/* Left - Logo/Title aligned to the left with no padding */}
      <div className="ml-6 flex flex-col">
  <div className="text-3xl font-bold text-white">
    JeevanSetu
  </div>
  <div className="text-sm text-gray-200 italic">
    Your Bridge to Safety
  </div>
</div>


      {/* Right - Home + Logout buttons */}
      <div className="flex  place-items-center flex-shrink-0 gap-4 mr-6">
        <Link
          to="/"
          className="px-6 py-3 bg-[#3db251] text-white font-semibold rounded-lg hover:bg-[#2e7d32] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Home
        </Link>
        <Link
          to="/Us"
          className="px-6 py-3 bg-[#3db251] text-white font-semibold rounded-lg hover:bg-[#2e7d32] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          About Us
        </Link>
        <button className="px-6 py-3 bg-[#2db0f2] text-white font-semibold rounded-lg hover:bg-[#0f63a7] transition-all duration-300 shadow-md hover:shadow-lg">
          Logout
        </button>
      </div>
    </header>
  );
}
