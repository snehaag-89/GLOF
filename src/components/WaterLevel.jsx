import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const WaterLevelCard = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Generate time labels for the last 24 hours
    const generateTimeLabels = () => {
      const labels = [];
      const now = new Date();
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
        labels.push(time.getHours() + ':00');
      }
      return labels;
    };

    const timeLabels = generateTimeLabels();
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: [{
          label: 'Water Level (meters)',
          data: data.waterLevelData,
          borderColor: '#4facfe',
          backgroundColor: 'rgba(79, 172, 254, 0.2)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#fff'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#fff',
              maxTicksLimit: 12
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data.waterLevelData]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Water Level Monitoring</h2>
        <i className="fas fa-water"></i>
      </div>
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
      
      <div className="last-updated">Last updated: <span>{new Date().toLocaleTimeString()}</span></div>
    </div>
  );
};

export default WaterLevelCard;