import React, { useEffect, useState, useRef } from "react";

const AlertComponent = () => {
  const [alerts, setAlerts] = useState([]);
  const [started, setStarted] = useState(false);
  const audioRef = useRef(null);
  const wsRef = useRef(null);

  const startAlerts = () => {
    // Create audio on user interaction
    audioRef.current = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
    audioRef.current.loop = true;

    // Connect WebSocket
    wsRef.current = new WebSocket("ws://localhost:4000");

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAlerts(prev => [...prev, data.message]);

      if (data.message.includes("crossed 5")) {
        audioRef.current.play().catch(err => console.log(err));
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };

    setStarted(true);
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Real-time Alerts</h2>
      {!started && <button onClick={startAlerts}>Start Alerts</button>}
      <ul>
        {alerts.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlertComponent;
