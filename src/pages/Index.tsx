
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import CropManagement from '@/components/CropManagement';
import DiseaseDetection from '@/components/DiseaseDetection';
import MarketPrices from '@/components/MarketPrices';
import Schemes from '@/components/Schemes';
import BottomNavigation from '@/components/BottomNavigation';

const Index = () => {
  const [activeScreen, setActiveScreen] = useState('home');

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <Dashboard />;
      case 'crops':
        return <CropManagement />;
      case 'disease':
        return <DiseaseDetection />;
      case 'market':
        return <MarketPrices />;
      case 'schemes':
        return <Schemes />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-auto">
        {renderActiveScreen()}
      </div>
      <BottomNavigation 
        activeItem={activeScreen} 
        onItemClick={setActiveScreen} 
      />
    </div>
  );
};

export default Index;
