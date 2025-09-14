import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000", { withCredentials: true });

async function fetchUserRole() {
  try {
    const res = await axios.get("http://localhost:4000/api/auth/getuserdata", {
      withCredentials: true,
    });
console.log(res.data)
console.log(res.data.role);
    if (!res.data || !res.data.role) return null;

    return res.data.role; // सिर्फ role return कर रहे हैं
  } catch (err) {
    console.error("Error fetching user data:", err.response?.data || err.message);
    return null;
  }
}

function VolunteerPanel() {
  const [requests, setRequests] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const userRole = await fetchUserRole();
      setRole(userRole);
      setLoading(false);

      if (userRole === "volunteer") {
        try {
          const res = await axios.get("http://localhost:4000/api/request/get_request", {
            withCredentials: true,
          });
          if (res.data.requests) setRequests(res.data.requests);
        } catch (err) {
          console.error("Error fetching requests:", err.response?.data || err.message);
        }

        socket.on("new_request", (data) => {
          setRequests((prev) => [data, ...prev]);
        });
      }
    };

    initialize();

    return () => socket.off("new_request");
  }, []);

  if (loading) return <p>Loading...</p>;
  if (role !== "volunteer") return <p>Access denied: Volunteers only</p>;

  return (
    <div>
      <h1>Volunteer Panel</h1>
      {requests.map((req) => (
        <div key={req._id}>
          <h3>{req.category}</h3>
          <p>{req.details}</p>
          <p>
            {req.userId?.name} | {req.userId?.phone} | {req.userId?.address}
          </p>
        </div>
      ))}
    </div>
  );
}

export default VolunteerPanel;
