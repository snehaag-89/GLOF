import { useState, useEffect } from "react";
import axios from "axios";

export default function JoinVolunteer() {
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/getuserdata", {
        withCredentials: true,
      });
      setRole(res.data.role);
    } catch (err) {
      console.error("Error fetching user data:", err.response?.data || err.message);
    }
  }

  const handleJoinVolunteer = async () => {
    if (role === "volunteer") {
      setMessage("✅ You are already a volunteer!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/join-volunteer",
        {},
        { withCredentials: true }
      );
      setMessage(res.data.message);
      fetchUserData();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending request");
      console.error("Join Volunteer Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="  bg-white rounded-3xl  ">
      <h1 className="text-2xl font-extrabold text-center text-[#003087] ">
        Become a Volunteer
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Send your volunteer request to the Admin and start contributing to your community.
      </p>
      <div className="flex justify-center mb-4">
  <button
    onClick={handleJoinVolunteer}
    className={`flex justify-center items-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
      role === "volunteer"
        ? "bg-gray-400 text-white cursor-not-allowed"
        : "bg-gradient-to-r from-[#11b01b] to-[#0a8c13] text-white hover:scale-105 hover:shadow-lg"
    }`}
    disabled={role === "volunteer"}
  >
    {role === "volunteer" ? "Already a Volunteer" : "Join as Volunteer"}
  </button>
</div>


      {message && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center font-medium">
          {message}
        </div>
      )}
    </div>
  );
}
