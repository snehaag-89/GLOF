import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 px-6 py-5 bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200 rounded-t-xl shadow-inner">
      <div className="text-center space-y-2">
        <p className="text-sm text-slate-700">
          Data sourced from{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer">
            NASA satellite imagery
          </span>{" "}
          •{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer">
            MMMUT Gorakhpur Flood Monitoring System
          </span>
        </p>
        <p className="text-xs text-slate-500">
          This is a <span className="italic text-slate-600">demonstration interface</span>. In a real implementation, data would come from NASA APIs.
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