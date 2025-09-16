
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 px-6 py-4 bg-white/10 border-t border-white/20 backdrop-blur-lg rounded-t-xl shadow-md">
      <div className="text-center space-y-1">
        <p className="text-sm text-gray-200">
          Data sourced from{" "}
          <span className="font-semibold text-[#00bcd4]">NASA satellite imagery</span> •{" "}
          <span className="font-semibold text-[#00bcd4]">MMMUT Gorakhpur Flood Monitoring System</span>
        </p>
        <p className="text-xs text-gray-400">
          This is a <span className="italic">demonstration interface</span>. In a real implementation, data would come from NASA APIs.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


// import React from 'react';

// const Footer = () => {
//   return (
//     <div className="footer">
//       <p>Data sourced from NASA satellite imagery • MMMUT Gorakhpur Flood Monitoring System</p>
//       <p>This is a demonstration interface. In a real implementation, data would come from NASA APIs.</p>
//     </div>
//   );
// };

// export default Footer;