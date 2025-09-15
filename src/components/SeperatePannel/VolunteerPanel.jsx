// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:4000", { withCredentials: true });

// async function fetchUserRole() {
//   try {
//     const res = await axios.get("http://localhost:4000/api/auth/getuserdata", {
//       withCredentials: true,
//     });
// console.log(res.data)
// console.log(res.data.role);
//     if (!res.data || !res.data.role) return null;

//     return res.data.role; // सिर्फ role return कर रहे हैं
//   } catch (err) {
//     console.error("Error fetching user data:", err.response?.data || err.message);
//     return null;
//   }
// }

// function VolunteerPanel() {
//   const [requests, setRequests] = useState([]);
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initialize = async () => {
//       const userRole = await fetchUserRole();
//       setRole(userRole);
//       setLoading(false);

//       if (userRole === "volunteer") {
//         try {
//           const res = await axios.get("http://localhost:4000/api/request/get_request", {
//             withCredentials: true,
//           });
//           if (res.data.requests) setRequests(res.data.requests);
//         } catch (err) {
//           console.error("Error fetching requests:", err.response?.data || err.message);
//         }

//         socket.on("new_request", (data) => {
//           setRequests((prev) => [data, ...prev]);
//         });
//       }
//     };

//     initialize();

//     return () => socket.off("new_request");
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (role !== "volunteer") return <p>Access denied: Volunteers only</p>;

//   return (
//     <div>
//       <h1>Volunteer Panel</h1>
//       {requests.map((req) => (
//         <div key={req._id}>
//           <h3>{req.category}</h3>
//           <p>{req.details}</p>
//           <p>
//             {req.userId?.name} | {req.userId?.phone} | {req.userId?.address}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default VolunteerPanel;

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000", { withCredentials: true });

async function fetchUserRole() {
  try {
    const res = await axios.get("http://localhost:4000/api/auth/getuserdata", {
      withCredentials: true,
    });
    return res.data.role;
  } catch (err) {
    console.error("Error fetching user data:", err.response?.data || err.message);
    return null;
  }
}

function VolunteerPanel() {
  const [requests, setRequests] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");

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

  // Filter requests based on selected category and status
  const filteredRequests = requests.filter(request => {
    const categoryMatch = activeCategory === "all" || request.category === activeCategory;
    const statusMatch = activeStatus === "all" || request.status === activeStatus;
    return categoryMatch && statusMatch;
  });

  // Count requests by category
  const requestCounts = {
    all: requests.length,
    Food: requests.filter(req => req.category === "Food").length,
    Medical: requests.filter(req => req.category === "Medical").length,
    Shelter: requests.filter(req => req.category === "Shelter").length,
  };

  // Count requests by status
  const statusCounts = {
    all: requests.length,
    Pending: requests.filter(req => req.status === "Pending").length,
    Accepted: requests.filter(req => req.status === "Accepted").length,
    Completed: requests.filter(req => req.status === "Completed").length,
    Rejected: requests.filter(req => req.status === "Rejected").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (role !== "volunteer") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">This area is for volunteers only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Dashboard</h1>
          <p className="text-gray-600">Manage and respond to assistance requests</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500">Total Requests</div>
            <div className="text-2xl font-bold text-gray-900">{requests.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.Pending}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500">Accepted</div>
            <div className="text-2xl font-bold text-blue-600">{statusCounts.Accepted}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500">Completed</div>
            <div className="text-2xl font-bold text-green-600">{statusCounts.Completed}</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            {["all", "Food", "Medical", "Shelter"].map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? category === "all"
                      ? "bg-gray-800 text-white"
                      : category === "Food"
                      ? "bg-green-100 text-green-800"
                      : category === "Medical"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category} ({requestCounts[category]})
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Filter by Status</h2>
          <div className="flex flex-wrap gap-2">
            {["all", "Pending", "Accepted", "Completed", "Rejected"].map(status => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeStatus === status
                    ? status === "all"
                      ? "bg-gray-800 text-white"
                      : status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : status === "Accepted"
                      ? "bg-blue-100 text-blue-800"
                      : status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {status} ({statusCounts[status]})
              </button>
            ))}
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`p-4 ${
                  request.category === "Food" ? "bg-green-50" : 
                  request.category === "Medical" ? "bg-red-50" : "bg-blue-50"
                }`}>
                  <div className="flex justify-between items-start">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      request.category === "Food" ? "bg-green-100 text-green-800" : 
                      request.category === "Medical" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {request.category}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                      request.status === "Accepted" ? "bg-blue-100 text-blue-800" : 
                      request.status === "Completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-gray-900">
                    {request.details || "No details provided"}
                  </h3>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                        {request.userId?.name?.charAt(0) || "U"}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{request.userId?.name || "Unknown User"}</p>
                      <p className="text-xs text-gray-500">{request.userId?.email || "No email"}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {request.userId?.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        {request.userId.phone}
                      </div>
                    )}
                    
                    {request.userId?.address && (
                      <div className="flex items-start text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>{request.userId.address}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-medium py-2 px-4 rounded-lg transition-colors">
                      Accept
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2 px-4 rounded-lg transition-colors">
                      Details
                    </button>
                  </div>
                </div>
                
                <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500">
                  Created {new Date(request.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No requests found</h3>
              <p className="mt-1 text-gray-500">Try changing your filters or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VolunteerPanel;
