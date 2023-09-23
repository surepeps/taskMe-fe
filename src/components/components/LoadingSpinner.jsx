import React from 'react';
import '../../../public/assets/css/LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingSpinner;