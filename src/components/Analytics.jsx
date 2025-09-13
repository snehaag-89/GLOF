import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- Metric Card ---
const MetricCard = ({ title, value, sparkline, color }) => (
  <div style={{
    flex: "1",
    background: "#f5f5f5",
    borderRadius: "10px",
    padding: "15px",
    margin: "10px",
    textAlign: "center",
    minWidth: "150px",
  }}>
    <h4>{title}</h4>
    <h2 style={{ color: color || "black" }}>{value}</h2>
    {sparkline && <Line data={sparkline} options={{
      responsive: true,
      plugins: { legend: { display: false } },
      elements: { point: { radius: 0 } },
      scales: { x: { display: false }, y: { display: false } }
    }} />}
  </div>
);

// --- Alert Banner ---
const AlertBanner = ({ risk, riskScore }) => {
  let bg = "#d4f4dd";
  if (risk === "Warning") bg = "#fff1c2";
  if (risk === "Critical") bg = "#ffd6d6";
  return (
    <div style={{
      background: bg,
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "20px",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "1.2rem"
    }}>
      Current Status: {risk.toUpperCase()} — Risk Score: {riskScore.toFixed(2)}
    </div>
  );
};

// --- Main Dashboard ---
export default function DynamicAnalyticsDashboard() {
  const [history, setHistory] = useState([]); // last N updates

  const generateCurrentData = () => {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0] + " " + now.toTimeString().slice(0,5); // yyyy-mm-dd HH:MM
    return {
      date: dateStr,
      lake_area: +(1.8 + Math.random() * 1).toFixed(2),
      water_level: +(48 + Math.random() * 20).toFixed(2),
      rainfall: +(Math.random() * 20).toFixed(2),
      snow_melt: +(Math.random() * 1).toFixed(2)
    };
  };

  const calculateRisk = (entry) => {
    const wl = (entry.water_level / 70) * 100;
    const rf = (entry.rainfall / 20) * 100;
    const sm = entry.snow_melt * 100;
    const riskScore = wl * 0.5 + rf * 0.3 + sm * 0.2;
    let riskLabel = "Safe";
    if (riskScore > 70) riskLabel = "Critical";
    else if (riskScore > 40) riskLabel = "Warning";
    return { ...entry, riskScore, riskLabel };
  };

  // --- Update every 5 min ---
  useEffect(() => {
    const updateData = () => {
      const currentData = calculateRisk(generateCurrentData());
      setHistory(prev => {
        const newHistory = [currentData, ...prev];
        return newHistory.slice(0, 10); // keep last 10 updates
      });
    };
    updateData();
    const interval = setInterval(updateData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (history.length === 0) return <p>Loading current data...</p>;

  const latest = history[0];

  // --- Sparkline data for cards ---
  const sparklineData = (key) => ({
    labels: history.map(d => d.date).reverse(),
    datasets: [{
      data: history.map(d => d[key]).reverse(),
      borderColor: "#0077b6",
      fill: false,
      tension: 0.3
    }]
  });

  // --- Chart Data ---
  const waterData = { labels: history.map(d => d.date).reverse(), datasets: [{ label: "Water Level", data: history.map(d => d.water_level).reverse(), borderColor: "#0077b6", fill: false }] };
  const rainfallData = { labels: history.map(d => d.date).reverse(), datasets: [{ label: "Rainfall", data: history.map(d => d.rainfall).reverse(), backgroundColor: "rgba(255,99,132,0.5)" }] };
  const riskData = { labels: history.map(d => d.date).reverse(), datasets: [{ label: "Risk Score", data: history.map(d => d.riskScore).reverse(), borderColor: "#d00000", fill: false }] };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "900px", margin: "auto" }}>
      <h2>🌊 Glacier Flood Risk Dashboard (Dynamic)</h2>

      <AlertBanner risk={latest.riskLabel} riskScore={latest.riskScore} />

      {/* Metric Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "30px" }}>
        <MetricCard title="Water Level (m)" value={latest.water_level} sparkline={sparklineData("water_level")} />
        <MetricCard title="Rainfall (mm)" value={latest.rainfall} sparkline={sparklineData("rainfall")} />
        <MetricCard title="Snow Melt" value={latest.snow_melt} sparkline={sparklineData("snow_melt")} />
        <MetricCard title="Risk Index" value={latest.riskScore.toFixed(2)} sparkline={sparklineData("riskScore")} color={latest.riskLabel === "Critical" ? "red" : latest.riskLabel === "Warning" ? "orange" : "green"} />
      </div>

      {/* Detailed Charts */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Water Level Trend</h3>
        <Line data={waterData} />
      </div>
      <div style={{ marginBottom: "30px" }}>
        <h3>Rainfall Trend</h3>
        <Bar data={rainfallData} />
      </div>
      <div style={{ marginBottom: "30px" }}>
        <h3>Risk Score Trend</h3>
        <Line data={riskData} />
      </div>

      {/* Current Data Table */}
      <h3>Latest Data</h3>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Lake Area (km²)</th>
            <th>Water Level (m)</th>
            <th>Rainfall (mm)</th>
            <th>Snow Melt</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: "#f0f8ff", fontWeight: "bold" }}>
            <td>{latest.date}</td>
            <td>{latest.lake_area}</td>
            <td>{latest.water_level}</td>
            <td>{latest.rainfall}</td>
            <td>{latest.snow_melt}</td>
            <td style={{ color: latest.riskLabel === "Critical" ? "red" : latest.riskLabel === "Warning" ? "orange" : "green" }}>{latest.riskLabel}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
