import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const FloodAnalyticsDashboard = () => {
  const [alertShown, setAlertShown] = useState(false);
  const [waterLevelData, setWaterLevelData] = useState(
    Array(24).fill(0).map(() => Math.random() * 4 + 1)
  );
  const [rainfallData, setRainfallData] = useState(
    Array(24).fill(0).map(() => Math.random() * 60)
  );
  const [currentWaterLevel, setCurrentWaterLevel] = useState("3.2m");
  const [currentRainfall, setCurrentRainfall] = useState("42mm");
  const [affectedAreas, setAffectedAreas] = useState(5);
  const [lastUpdated, setLastUpdated] = useState({
    waterLevel: "--:--:--",
    rainfall: "--:--:--",
    map: "--:--:--",
    stats: "--:--:--"
  });
  const [connectionStatus, setConnectionStatus] = useState("Connected to data source");
  const [isConnected, setIsConnected] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const waterLevelChartRef = useRef(null);
  const rainfallChartRef = useRef(null);
  const historicalChartRef = useRef(null);
  const waterLevelChartInstance = useRef(null);
  const rainfallChartInstance = useRef(null);
  const historicalChartInstance = useRef(null);

  // Initialize charts
  useEffect(() => {
    const initializeCharts = () => {
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

      // Water Level Chart
      if (waterLevelChartInstance.current) {
        waterLevelChartInstance.current.destroy();
      }
      
      waterLevelChartInstance.current = new Chart(waterLevelChartRef.current, {
        type: 'line',
        data: {
          labels: timeLabels,
          datasets: [{
            label: 'Water Level (meters)',
            data: waterLevelData,
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

      // Rainfall Chart
      if (rainfallChartInstance.current) {
        rainfallChartInstance.current.destroy();
      }
      
      rainfallChartInstance.current = new Chart(rainfallChartRef.current, {
        type: 'bar',
        data: {
          labels: timeLabels,
          datasets: [{
            label: 'Rainfall (mm)',
            data: rainfallData,
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

      // Historical Chart
      if (historicalChartInstance.current) {
        historicalChartInstance.current.destroy();
      }
      
      historicalChartInstance.current = new Chart(historicalChartRef.current, {
        type: 'line',
        data: {
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
          datasets: [{
            label: 'Water Level (m)',
            data: [2.8, 3.1, 2.9, 3.5, 3.2, 3.8, 3.2],
            borderColor: '#4facfe',
            backgroundColor: 'rgba(79, 172, 254, 0.2)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          }, {
            label: 'Rainfall (mm)',
            data: [35, 42, 28, 50, 38, 45, 42],
            borderColor: '#00f2fe',
            backgroundColor: 'rgba(0, 242, 254, 0.2)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
                color: '#fff'
              }
            }
          }
        }
      });
    };

    initializeCharts();
  }, [waterLevelData, rainfallData]);

  // Simulate WebSocket connection for real-time data
  useEffect(() => {
    const updateData = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      
      // Generate new data points
      const newWaterLevel = (Math.random() * 4 + 1).toFixed(1);
      const newRainfall = (Math.random() * 60).toFixed(0);
      const newAffectedAreas = Math.floor(Math.random() * 10) + 1;
      
      // Update data arrays (shift out oldest, add newest)
      const newWaterLevelData = [...waterLevelData.slice(1), parseFloat(newWaterLevel)];
      const newRainfallData = [...rainfallData.slice(1), parseFloat(newRainfall)];
      
      setWaterLevelData(newWaterLevelData);
      setRainfallData(newRainfallData);
      setCurrentWaterLevel(newWaterLevel + 'm');
      setCurrentRainfall(newRainfall + 'mm');
      setAffectedAreas(newAffectedAreas);
      
      // Update timestamps
      setLastUpdated({
        waterLevel: timeString,
        rainfall: timeString,
        map: timeString,
        stats: timeString
      });
      
      // Update status indicator based on water level
      if (newWaterLevel > 4) {
        document.getElementById('statusDot').className = 'status-dot status-high';
        document.getElementById('statusText').textContent = 'Current Status: High Risk';
        if (!alertShown) {
          setAlertShown(true);
        }
      } else if (newWaterLevel > 3) {
        document.getElementById('statusDot').className = 'status-dot status-medium';
        document.getElementById('statusText').textContent = 'Current Status: Medium Risk';
        if (alertShown) {
          setAlertShown(false);
        }
      } else {
        document.getElementById('statusDot').className = 'status-dot status-low';
        document.getElementById('statusText').textContent = 'Current Status: Low Risk';
        if (alertShown) {
          setAlertShown(false);
        }
      }
    };
    
    // Initial update
    updateData();
    
    // Set interval to simulate real-time updates
    const dataInterval = setInterval(updateData, 3000);
    
    // Simulate connection issues randomly
    const connectionInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance of connection issue
        setConnectionStatus('Connection lost - attempting to reconnect');
        setIsConnected(false);
        
        setTimeout(() => {
          setConnectionStatus('Connected to data source');
          setIsConnected(true);
        }, 3000);
      }
    }, 10000);
    
    return () => {
      clearInterval(dataInterval);
      clearInterval(connectionInterval);
    };
  }, [waterLevelData, rainfallData, alertShown]);

  const showEvacuationMap = () => {
    setShowModal(true);
  };

  const closeEvacuationMap = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <header>
        <h1>Flood Analytics Dashboard</h1>
        <p>Real-time monitoring of flood data for MMMUT Gorakhpur region using NASA satellite imagery</p>
      </header>

      <div id="alertBanner" className="alert-banner" style={{ display: alertShown ? 'flex' : 'none' }}>
        <div className="alert-content">
          <div className="alert-icon"><i className="fas fa-exclamation-triangle"></i></div>
          <div>
            <h3>Flood Warning: High Risk Area</h3>
            <p>Immediate evacuation recommended. View evacuation routes and shelters.</p>
          </div>
        </div>
        <button className="alert-button" onClick={showEvacuationMap}>View Evacuation Plan</button>
      </div>

      <div className="dashboard">
        <div className="card">
          <div className="card-header">
            <h2>Water Level Monitoring</h2>
            <i className="fas fa-water"></i>
          </div>
          <div className="chart-container">
            <canvas ref={waterLevelChartRef} id="waterLevelChart"></canvas>
          </div>
          <div className="status-indicator">
            <div className="status-dot status-low" id="statusDot"></div>
            <span id="statusText">Current Status: Low Risk</span>
          </div>
          <div className="last-updated">Last updated: <span id="waterLevelTime">{lastUpdated.waterLevel}</span></div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Rainfall Measurement</h2>
            <i className="fas fa-cloud-rain"></i>
          </div>
          <div className="chart-container">
            <canvas ref={rainfallChartRef} id="rainfallChart"></canvas>
          </div>
          <div className="last-updated">Last updated: <span id="rainfallTime">{lastUpdated.rainfall}</span></div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Affected Areas</h2>
            <i className="fas fa-map-marked-alt"></i>
          </div>
          <div className="map-container" id="floodMap">
            {/* Map will be rendered here */}
          </div>
          <div className="last-updated">Last updated: <span id="mapTime">{lastUpdated.map}</span></div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Current Statistics</h2>
            <i className="fas fa-chart-bar"></i>
          </div>
          <div className="stats">
            <div className="stat-box">
              <i className="fas fa-ruler-combined"></i>
              <div className="stat-value" id="waterLevelValue">{currentWaterLevel}</div>
              <div className="stat-label">Water Level</div>
            </div>
            <div className="stat-box">
              <i className="fas fa-tint"></i>
              <div className="stat-value" id="rainfallValue">{currentRainfall}</div>
              <div className="stat-label">Rainfall (24h)</div>
            </div>
            <div className="stat-box">
              <i className="fas fa-exclamation-triangle"></i>
              <div className="stat-value" id="affectedValue">{affectedAreas}</div>
              <div className="stat-label">Affected Areas</div>
            </div>
          </div>
          <div className="chart-container">
            <canvas ref={historicalChartRef} id="historicalChart"></canvas>
          </div>
          <div className="last-updated">Last updated: <span id="statsTime">{lastUpdated.stats}</span></div>
        </div>
      </div>

      <div className="connection-status">
        <div className={`connection-dot ${isConnected ? 'connected' : 'disconnected'}`} id="connectionDot"></div>
        <span id="connectionStatus">{connectionStatus}</span>
      </div>

      <div className="footer">
        <p>Data sourced from NASA satellite imagery • MMMUT Gorakhpur Flood Monitoring System</p>
        <p>This is a demonstration interface. In a real implementation, data would come from NASA APIs.</p>
      </div>

      <div id="evacuationModal" className="evacuation-modal" style={{ display: showModal ? 'flex' : 'none' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Evacuation Plan for High-Risk Areas</h2>
            <button className="close-modal" onClick={closeEvacuationMap}>&times;</button>
          </div>
          <div className="evacuation-map" id="detailedEvacuationMap">
            {/* Detailed evacuation map will be rendered here */}
          </div>
          <h3>Nearest Shelters</h3>
          <div className="shelter-list">
            <div className="shelter-item">
              <div className="shelter-name">MMMUT Main Building</div>
              <div className="shelter-address">Deoria Road, Gorakhpur</div>
              <div className="shelter-capacity">
                <span className="capacity-dot capacity-high"></span>
                Capacity: High (500 people)
              </div>
              <div className="distance-info">Distance: On campus (0 km)</div>
            </div>
            <div className="shelter-item">
              <div className="shelter-name">Gorakhpur Railway Station</div>
              <div className="shelter-address">Station Road, Gorakhpur</div>
              <div className="shelter-capacity">
                <span className="capacity-dot capacity-medium"></span>
                Capacity: Medium (300 people)
              </div>
              <div className="distance-info">Distance: 7.2 km • 15 min drive</div>
            </div>
            <div className="shelter-item">
              <div className="shelter-name">City Convention Center</div>
              <div className="shelter-address">Civil Lines, Gorakhpur</div>
              <div className="shelter-capacity">
                <span className="capacity-dot capacity-high"></span>
                Capacity: High (600 people)
              </div>
              <div className="distance-info">Distance: 5.8 km • 12 min drive</div>
            </div>
            <div className="shelter-item">
              <div className="shelter-name">Public Library</div>
              <div className="shelter-address">University Road, Gorakhpur</div>
              <div className="shelter-capacity">
                <span className="capacity-dot capacity-low"></span>
                Capacity: Low (150 people)
              </div>
              <div className="distance-info">Distance: 3.5 km • 8 min drive</div>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <h3>Evacuation Instructions</h3>
            <ul>
              <li>Follow the marked evacuation routes (blue dashed lines)</li>
              <li>Avoid areas marked in red (flood danger zones)</li>
              <li>Bring essential items only: documents, medicines, water</li>
              <li>Assist children, elderly, and people with disabilities</li>
              <li>Listen to emergency broadcasts for updates</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
          background: linear-gradient(135deg, #1a2a6c, #2a5298);
          color: #fff;
          min-height: 100vh;
          padding: 20px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        header {
          text-align: center;
          padding: 20px 0;
          margin-bottom: 30px;
        }

        header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          background: linear-gradient(to right, #4facfe, #00f2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        header p {
          font-size: 1.2rem;
          opacity: 0.8;
        }

        .dashboard {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .dashboard {
            grid-template-columns: 1fr;
          }
        }

        .card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .card-header h2 {
          font-size: 1.5rem;
        }

        .card-header i {
          font-size: 1.8rem;
          color: #4facfe;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .stat-box {
          text-align: center;
          padding: 15px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          margin: 10px 0;
          color: #00f2fe;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .chart-container {
          position: relative;
          height: 300px;
          width: 100%;
        }

        .map-container {
          height: 300px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 15px;
        }

        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 8px;
        }

        .status-low {
          background-color: #4cd964;
        }

        .status-medium {
          background-color: #ffcc00;
        }

        .status-high {
          background-color: #ff3b30;
        }

        .footer {
          text-align: center;
          margin-top: 40px;
          padding: 20px;
          opacity: 0.7;
          font-size: 0.9rem;
        }

        .last-updated {
          text-align: right;
          font-size: 0.8rem;
          opacity: 0.7;
          margin-top: 10px;
        }

        .connection-status {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 10px;
          font-size: 0.9rem;
        }

        .connection-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 5px;
        }

        .connected {
          background-color: #4cd964;
        }

        .disconnected {
          background-color: #ff3b30;
        }

        .alert-banner {
          background: linear-gradient(90deg, #ff4b2b, #ff416c);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }

        .alert-content {
          display: flex;
          align-items: center;
        }

        .alert-icon {
          font-size: 2rem;
          margin-right: 15px;
        }

        .alert-button {
          background: white;
          color: #ff4b2b;
          border: none;
          padding: 10px 20px;
          border-radius: 50px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .alert-button:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .evacuation-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: #1a2a6c;
          padding: 30px;
          border-radius: 15px;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .close-modal {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .evacuation-map {
          height: 400px;
          border-radius: 10px;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }

        .shelter-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
        }

        .shelter-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 10px;
        }

        .shelter-name {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .shelter-address {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 10px;
        }

        .shelter-capacity {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
        }

        .capacity-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 5px;
        }

        .capacity-high {
          background-color: #4cd964;
        }

        .capacity-medium {
          background-color: #ffcc00;
        }

        .capacity-low {
          background-color: #ff3b30;
        }

        .distance-info {
          margin-top: 5px;
          font-size: 0.85rem;
          color: #4facfe;
        }

        /* Leaflet map customization */
        .leaflet-container {
          background: #2a5298;
          border-radius: 10px;
        }

        .custom-marker {
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        }

        .shelter-marker {
          background: #4cd964;
          width: 24px;
          height: 24px;
        }

        .danger-marker {
          background: #ff4b2b;
          width: 20px;
          height: 20px;
        }

        .mmmut-marker {
          background: #4facfe;
          width: 28px;
          height: 28px;
        }

        .route-info {
          background: white;
          padding: 10px;
          border-radius: 5px;
          color: #1a2a6c;
          font-size: 0.9rem;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default FloodAnalyticsDashboard;