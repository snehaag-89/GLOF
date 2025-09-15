import React from 'react';

const ConnectionStatus = ({ status }) => {
  return (
    <div className="connection-status">
      <div className={`connection-dot ${status === 'connected' ? 'connected' : 'disconnected'}`}></div>
      <span>
        {status === 'connected' 
          ? 'Connected to data source' 
          : 'Connection lost - attempting to reconnect'}
      </span>
    </div>
  );
};

export default ConnectionStatus;