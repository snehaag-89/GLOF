import { useState } from "react";
import axios from "axios";

export default function JoinVolunteer() {
  const [message, setMessage] = useState("");

  const handleJoinVolunteer = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/join-volunteer",
        {},
        { withCredentials: true } // ensures JWT cookie is sent
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending request");
      console.error("Join Volunteer Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Become a Volunteer</h1>
      <p className="mt-2 text-gray-600">
        Click the button below to send your volunteer request to the Admin.
      </p>

      <button
        onClick={handleJoinVolunteer}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Join as Volunteer
      </button>

      {message && <p className="mt-3 text-green-600 font-medium">{message}</p>}
    </div>
  );
}


