
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
      icon: <Home className="h-5 w-5" />
    },
    {
      id: 'crops',
      label: 'My Crops',
      icon: <Sprout className="h-5 w-5" />
    },
    {
      id: 'disease',
      label: 'Disease Check',
      icon: <Camera className="h-5 w-5" />
    },
    {
      id: 'market',
      label: 'Market',
      icon: <IndianRupee className="h-5 w-5" />
    },
    {
      id: 'schemes',
      label: 'Schemes',
      icon: <Shield className="h-5 w-5" />
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center py-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 min-w-[60px] ${
              activeItem === item.id
                ? 'text-green-600 bg-green-50'
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            <div className={`${activeItem === item.id ? 'scale-110' : ''} transition-transform duration-200`}>
              {item.icon}
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
