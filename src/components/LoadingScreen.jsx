import React from 'react';
import { Loader2 } from 'lucide-react';
import './LoadingScreen.css';

export const LoadingScreen = () => {
  return (
    <div className="loading-screen animate-fade-in">
      <div className="loading-content">
        <Loader2 className="spinner" size={48} />
        <h2>Loading Invoice Tracker...</h2>
      </div>
    </div>
  );
};
