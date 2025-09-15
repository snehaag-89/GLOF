export default function Header() {
  return (
    <header className="w-full bg-gradient-to-br from-[#0f2027] to-[#203a43] shadow-lg pl-6 py-3 flex items-center justify-between">
      {/* Left - Logo / Title with reduced space */}
      <div className="text-3xl font-bold text-white flex-1 min-w-0 ">
        Flood Early Warning System
      </div>

      {/* Right - Logout button with right padding and centered text */}
      <div className="flex items-center flex-shrink-0 mr-6">
        <button className="px-5 py-2 bg-[#00bcd4] text-white font-semibold rounded-md hover:bg-[#0097a7] transition-colors duration-200 flex items-center justify-center">
          Logout
        </button>
         {/* <button className="px-5 py-2 ml-5 bg-[#00bcd4] text-white font-semibold rounded-md hover:bg-[#0097a7] transition-colors duration-200 flex items-center justify-center">
          profile
        </button> */}
      </div>
    </header>
  );
}