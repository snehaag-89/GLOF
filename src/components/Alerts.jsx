// import React from "react";

// const AlertBanner = ({ visible, onViewPlan }) => {
//   if (!visible) return null;

//   return (
//     <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-red-400 px-6 py-4 rounded-xl mb-6 shadow-lg border border-white/10 animate-pulse">
//       {/* Left Content */}
//       <div className="flex items-center">
//         <div className="text-3xl mr-4 text-white">
//           <i className="fas fa-exclamation-triangle"></i>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-white">
//             Flood Warning: High Risk Area
//           </h3>
//           <p className="text-sm text-gray-100 opacity-90">
//             Immediate evacuation recommended. View evacuation routes and shelters.
//           </p>
//         </div>
//       </div>

//       {/* Button */}
//       <button
//         onClick={onViewPlan}
//         className="bg-white text-red-600 font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
//       >
//         View Evacuation Plan
//       </button>
//     </div>
//   );
// };

// export default AlertBanner;









// css ka code


// import React from 'react';

// const AlertBanner = ({ visible, onViewPlan }) => {
//   if (!visible) return null;
  
//   return (
//     <div className="alert-banner">
//       <div className="alert-content">
//         <div className="alert-icon"><i className="fas fa-exclamation-triangle"></i></div>
//         <div>
//           <h3>Flood Warning: High Risk Area</h3>
//           <p>Immediate evacuation recommended. View evacuation routes and shelters.</p>
//         </div>
//       </div>
//       <button className="alert-button" onClick={onViewPlan}>
//         View Evacuation Plan
//       </button>
//     </div>
//   );
// };

// export default AlertBanner;











//buzzle ka code

// import React, { useEffect } from "react";

// const AlertBanner = ({ visible, onViewPlan }) => {
//   useEffect(() => {
//     if (visible) {
//       const siren = new Audio("/siren.mp3"); // public folder me rakho
//       siren.loop = true;
//       siren.play().catch((err) => console.log("Audio play error:", err));

//       return () => siren.pause();
//     }
//   }, [visible]);

//   if (!visible) return null;

//   return (
//     <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-red-400 px-6 py-4 rounded-xl mb-6 shadow-lg border border-white/10 animate-pulse">
//       {/* Left Content */}
//       <div className="flex items-center">
//         <div className="text-3xl mr-4 text-white">
//           <i className="fas fa-exclamation-triangle"></i>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-white">
//             Flood Warning: High Risk Area
//           </h3>
//           <p className="text-sm text-gray-100 opacity-90">
//             Immediate evacuation recommended. View evacuation routes and shelters.
//           </p>
//         </div>
//       </div>

//       {/* Button */}
//       <button
//         onClick={onViewPlan}
//         className="bg-white text-red-600 font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
//       >
//         View Evacuation Plan
//       </button>
//     </div>
//   );
// };

// export default AlertBanner;



// siren code bina restriction

import React, { useEffect } from "react";

const AlertBanner = ({ visible, onViewPlan, soundEnabled, audioRef }) => {
  useEffect(() => {
    if (soundEnabled && audioRef?.current) {
      if (visible) {
        audioRef.current.play().catch((err) => {
          console.warn("Sound play failed:", err);
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [visible, soundEnabled, audioRef]);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-red-400 px-6 py-4 rounded-xl mb-6 shadow-lg border border-white/10 animate-pulse">
      <div className="flex items-center">
        <div className="text-3xl mr-4 text-white">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Flood Warning: High Risk Area
          </h3>
          <p className="text-sm text-gray-100 opacity-90">
            Immediate evacuation recommended. View evacuation routes and shelters.
          </p>
        </div>
      </div>

      <button
        onClick={onViewPlan}
        className="bg-white text-red-600 font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
      >
        View Evacuation Plan
      </button>
    </div>
  );
};

export default AlertBanner;
