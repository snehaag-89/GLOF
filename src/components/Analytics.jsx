import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Analytics() {
  const [dataPoints, setDataPoints] = useState([50, 55, 60, 58, 62]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => [...prev.slice(-9), Math.floor(50 + Math.random() * 20)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: Array.from({ length: dataPoints.length }, (_, i) => i + 1),
    datasets: [
      {
        label: "Water Level",
        data: dataPoints,
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">📊 Water Level Trend</h2>
      <Line data={data} />
      <p className="mt-2 text-sm text-gray-600">
        Current Level: <span className="font-bold">{dataPoints[dataPoints.length - 1]} m</span>
      </p>
    </div>
  );
}
