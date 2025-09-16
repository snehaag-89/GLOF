import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const StatisticsCard = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
          {
            label: "Water Level (m)",
            data: [2.8, 3.1, 2.9, 3.5, 3.2, 3.8, 3.2],
            borderColor: "#3498db",
            backgroundColor: "rgba(52, 152, 219, 0.2)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
          {
            label: "Rainfall (mm)",
            data: [35, 42, 28, 50, 38, 45, 42],
            borderColor: "#2ecc71",
            backgroundColor: "rgba(46, 204, 113, 0.2)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#2c3e50",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              color: "#2c3e50",
            },
          },
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              color: "#2c3e50",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-blue-100">
        <h2 className="text-xl font-semibold text-blue-800">Current Statistics</h2>
        <i className="fas fa-chart-bar text-blue-500 text-2xl"></i>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col items-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition border border-blue-100">
          <i className="fas fa-ruler-combined text-blue-500 text-xl mb-2"></i>
          <div className="text-lg font-bold text-blue-800">{data.waterLevel}m</div>
          <div className="text-sm text-blue-600">Water Level</div>
        </div>

        <div className="flex flex-col items-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition border border-blue-100">
          <i className="fas fa-tint text-blue-500 text-xl mb-2"></i>
          <div className="text-lg font-bold text-blue-800">{data.rainfall.toFixed(1)}mm</div>
          <div className="text-sm text-blue-600">Rainfall (24h)</div>
        </div>

        <div className="flex flex-col items-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition border border-blue-100">
          <i className="fas fa-exclamation-triangle text-amber-500 text-xl mb-2"></i>
          <div className="text-lg font-bold text-blue-800">{data.affectedAreas}</div>
          <div className="text-sm text-blue-600">Affected Areas</div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[320px] w-full rounded-xl overflow-hidden bg-white p-2 border border-blue-100">
        <canvas ref={chartRef}></canvas>
      </div>

      {/* Last Updated */}
      <div className="text-right text-sm text-blue-600/80 mt-4">
        Last updated:{" "}
        <span className="font-medium">{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default StatisticsCard;



// css ka code

// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const StatisticsCard = ({ data }) => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }
    
//     const ctx = chartRef.current.getContext('2d');
//     chartInstance.current = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//         datasets: [{
//           label: 'Water Level (m)',
//           data: [2.8, 3.1, 2.9, 3.5, 3.2, 3.8, 3.2],
//           borderColor: '#4facfe',
//           backgroundColor: 'rgba(79, 172, 254, 0.2)',
//           borderWidth: 2,
//           tension: 0.4,
//           fill: true
//         }, {
//           label: 'Rainfall (mm)',
//           data: [35, 42, 28, 50, 38, 45, 42],
//           borderColor: '#00f2fe',
//           backgroundColor: 'rgba(0, 242, 254, 0.2)',
//           borderWidth: 2,
//           tension: 0.4,
//           fill: true
//         }]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             labels: {
//               color: '#fff'
//             }
//           }
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//             grid: {
//               color: 'rgba(255, 255, 255, 0.1)'
//             },
//             ticks: {
//               color: '#fff'
//             }
//           },
//           x: {
//             grid: {
//               color: 'rgba(255, 255, 255, 0.1)'
//             },
//             ticks: {
//               color: '#fff'
//             }
//           }
//         }
//       }
//     });

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h2>Current Statistics</h2>
//         <i className="fas fa-chart-bar"></i>
//       </div>
//       <div className="stats">
//         <div className="stat-box">
//           <i className="fas fa-ruler-combined"></i>
//           <div className="stat-value">{data.waterLevel}m</div>
//           <div className="stat-label">Water Level</div>
//         </div>
//         <div className="stat-box">
//           <i className="fas fa-tint"></i>
//           <div className="stat-value">{data.rainfall}mm</div>
//           <div className="stat-label">Rainfall (24h)</div>
//         </div>
//         <div className="stat-box">
//           <i className="fas fa-exclamation-triangle"></i>
//           <div className="stat-value">{data.affectedAreas}</div>
//           <div className="stat-label">Affected Areas</div>
//         </div>
//       </div>
//       <div className="chart-container">
//         <canvas ref={chartRef}></canvas>
//       </div>
//       <div className="last-updated">Last updated: <span>{new Date().toLocaleTimeString()}</span></div>
//     </div>
//   );
// };

// export default StatisticsCard;