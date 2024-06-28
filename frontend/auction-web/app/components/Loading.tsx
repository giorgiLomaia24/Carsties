import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
    <div className="loader"></div>
    <span className="ml-2">Loading...</span>
  </div>
  );
};

export default Loading;
