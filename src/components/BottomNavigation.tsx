
import React from 'react';
import { Home, Sprout, Camera, IndianRupee, Shield } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface BottomNavigationProps {
  activeItem: string;
  onItemClick: (itemId: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeItem, onItemClick }) => {
  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="h-6 w-6" />
    },
    {
      id: 'crops',
      label: 'My Crops',
      icon: <Sprout className="h-6 w-6" />
    },
    {
      id: 'disease',
      label: 'Disease',
      icon: <Camera className="h-6 w-6" />
    },
    {
      id: 'market',
      label: 'Market',
      icon: <IndianRupee className="h-6 w-6" />
    },
    {
      id: 'schemes',
      label: 'Schemes',
      icon: <Shield className="h-6 w-6" />
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
      <div className="grid grid-cols-5 h-16">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 active:scale-95 ${
              activeItem === item.id
                ? 'text-green-600 bg-green-50'
                : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            <div className={`${activeItem === item.id ? 'scale-110' : ''} transition-transform duration-200`}>
              {item.icon}
            </div>
            <span className={`text-xs font-medium ${
              activeItem === item.id ? 'text-green-600' : 'text-gray-500'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
