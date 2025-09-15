import React from 'react';

const AlertBanner = ({ visible, onViewPlan }) => {
  if (!visible) return null;
  
  return (
    <div className="alert-banner">
      <div className="alert-content">
        <div className="alert-icon"><i className="fas fa-exclamation-triangle"></i></div>
        <div>
          <h3>Flood Warning: High Risk Area</h3>
          <p>Immediate evacuation recommended. View evacuation routes and shelters.</p>
        </div>
      </div>
      <button className="alert-button" onClick={onViewPlan}>
        View Evacuation Plan
      </button>
    </div>
  );
};

export default AlertBanner;
