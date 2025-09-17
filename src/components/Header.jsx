import { Link } from "react-router-dom";
import { RiHome6Line, RiLogoutBoxRLine, RiTeamLine } from "react-icons/ri";

export const logout = async () => {
  try {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
    
    // Redirect to login page
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

export default function Header() {
  return (
    <header className="w-full bg-[#30465c] py-5 flex justify-between items-center shadow-lg border-b border-gray-600">
      {/* Left - Logo/Title */}
      <div className="ml-8 flex flex-col">
        <div className="text-3xl font-bold text-white">
          JeevanSetu
        </div>
        <div className="text-sm text-gray-200 italic">
          Your Bridge to Safety
        </div>
      </div>

      {/* Right - Navigation buttons */}
      <div className="flex items-center gap-4 mr-4">
        <Link
          to="/"
          className=" text-white font-medium rounded-md  transition-all duration-200  hover:shadow-md flex items-center"
        >
          <RiHome6Line className="h-5 w-5 mr-2" />
          Home
        </Link>
        
        <Link
          to="/Us"
          className="px-5 py-2.5  text-white font-medium rounded-md   transition-all duration-200  hover:shadow-md flex items-center"
        >
          <RiTeamLine className="h-5 w-5 mr-2" />
          About Us
        </Link>
        
        <button 
          onClick={logout}
          className="px-5 py-2.5 bg-[#ea3232] text-white font-medium rounded-md hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center"
        >
          <RiLogoutBoxRLine className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
}