export default function Header() {
  return (
    <header className="w-full  bg-gradient-to-br from-blue-100 to to-indigo-100 shadow-sm px-6 py-6 flex items-center justify-between ">
      {/* Left - Logo / Title */}
      <div className="text-xl font-semibold text-gray-800 px-5">
        Glof Early Warning System
      </div>

      {/* Right - Account + Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
         
          <span className="text-m font-semibold text-gray-800">Account </span>
        </div>
        <button className="px-6 py-2 bg-red-500 text-white mr-3 text-sm rounded-md hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </header>
  );
}
