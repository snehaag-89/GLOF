

import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import AlertBanner from '../components/Alerts';
import WaterLevelCard from '../components/WaterLevel';
import RainfallCard from '../components/RainfallCard';
import FloodMapCard from '../components/MapBox';
import StatisticsCard from '../components/StatisticsCard';
import ConnectionStatus from '../components/ConnectionStatus';
import Footer from '../components/Footer';
import EvacuationModal from '../components/EvacuationModel';
import './Home.css'

function Home() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [data, setData] = useState({
    waterLevel: 3.2,
    rainfall: 42,
    affectedAreas: 5,
    status: 'low',
    waterLevelData: Array(24).fill(0).map(() => Math.random() * 4 + 1),
    rainfallData: Array(24).fill(0).map(() => Math.random() * 60)
  });

  // Use refs to store the latest data to avoid dependency issues in useEffect
  const dataRef = useRef(data);
  const alertVisibleRef = useRef(alertVisible);

  // Update refs when state changes
  useEffect(() => {
    dataRef.current = data;
    alertVisibleRef.current = alertVisible;
  }, [data, alertVisible]);

  const showEvacuationMap = () => setModalVisible(true);
  const closeEvacuationMap = () => setModalVisible(false);

  // Simulate WebSocket data updates every 5-6 seconds
  useEffect(() => {
    let intervalId;

    const simulateWebSocket = () => {
      const updateData = () => {
        const currentData = dataRef.current;
        const currentAlertVisible = alertVisibleRef.current;
        
        // Generate more realistic water level data (tends to change gradually)
        const waterLevelChange = (Math.random() - 0.5) * 0.8; // -0.4 to +0.4
        const newWaterLevel = Math.max(0.5, Math.min(6, parseFloat(currentData.waterLevel) + waterLevelChange)).toFixed(1);
        
        // Generate more realistic rainfall data
        const rainfallChange = (Math.random() - 0.3) * 20; // -6 to +14
        const newRainfall = Math.max(0, Math.min(100, parseInt(currentData.rainfall) + rainfallChange));
        
        // Affected areas change more slowly
        const areaChange = Math.random() < 0.3 ? (Math.random() < 0.5 ? -1 : 1) : 0;
        const newAffectedAreas = Math.max(1, Math.min(15, currentData.affectedAreas + areaChange));
        
        // Update data arrays (shift out oldest, add newest)
        const newWaterLevelData = [...currentData.waterLevelData.slice(1), parseFloat(newWaterLevel)];
        const newRainfallData = [...currentData.rainfallData.slice(1), newRainfall];
        
        // Determine status based on water level
        let newStatus = 'low';
        if (newWaterLevel > 4.5) newStatus = 'high';
        else if (newWaterLevel > 3.2) newStatus = 'medium';
        
        setData({
          waterLevel: newWaterLevel,
          rainfall: newRainfall,
          affectedAreas: newAffectedAreas,
          status: newStatus,
          waterLevelData: newWaterLevelData,
          rainfallData: newRainfallData
        });

        // Show alert if water level becomes high and alert isn't already visible
        if (newWaterLevel > 4.5 && !currentAlertVisible) {
          setAlertVisible(true);
        }
        
        // Hide alert if water level drops to medium or low and alert is visible
        if (newWaterLevel <= 4.5 && currentAlertVisible) {
          setAlertVisible(false);
        }
      };

      // Initial call
      updateData();
      
      // Set interval with random time between 5-6 seconds (5000-6000ms)
      const intervalTime = 5000 + Math.random() * 1000;
      intervalId = setInterval(updateData, intervalTime);
    };

    simulateWebSocket();
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []); // Empty dependency array since we're using refs

  // Simulate connection issues
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        setConnectionStatus('disconnected');
        setTimeout(() => setConnectionStatus('connected'), 3000);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="container">
        
        
        <AlertBanner 
          visible={alertVisible} 
          onViewPlan={showEvacuationMap} 
        />
        
        <div className="dashboard">
          <WaterLevelCard data={data} />
          <RainfallCard data={data} />
          <FloodMapCard data={data} />
          <StatisticsCard data={data} />
        </div>
        
        <ConnectionStatus status={connectionStatus} />
        <Footer />
      </div>
      
      <EvacuationModal 
        visible={modalVisible} 
        onClose={closeEvacuationMap} 
      />
    </div>
  );
}

export default Home;