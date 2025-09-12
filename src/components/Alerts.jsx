import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // path check karo

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Supabase se latest alerts fetch karna
  const fetchAlerts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("alerts")
      .select("*")
      .order("created_at", { ascending: false }) // latest sabse upar
      .limit(5);

    if (error) {
      console.error("❌ Error fetching alerts:", error.message);
    } else {
      console.log("✅ Alerts fetched:", data);
      setAlerts(data);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <h2 className="text-lg font-bold mb-2">⚠️ Latest Alerts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : alerts.length === 0 ? (
        <p>No alerts available</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {alerts.map((alert) => (
            <li key={alert.id} className="text-red-600 font-medium">
              {alert.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
