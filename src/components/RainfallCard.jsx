import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RainfallCard = ({ data }) => {
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
      type: 'bar',
      data: {
        labels: timeLabels,
        datasets: [{
          label: 'Rainfall (mm)',
          data: data.rainfallData,
          backgroundColor: 'rgba(0, 242, 254, 0.5)',
          borderColor: 'rgba(0, 242, 254, 1)',
          borderWidth: 1
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
  }, [data.rainfallData]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Rainfall Measurement</h2>
        <i className="fas fa-cloud-rain"></i>
      </div>
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="last-updated">Last updated: <span>{new Date().toLocaleTimeString()}</span></div>
    </div>
  );
};

export default RainfallCard;