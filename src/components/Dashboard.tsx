
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  Sun, 
  Droplets, 
  TrendingUp, 
  AlertTriangle, 
  Sprout,
  Camera,
  IndianRupee,
  Shield,
  Volume2,
  Bell
} from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  icon: string;
}

interface CropAlert {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  crop: string;
  timestamp: string;
}

const Dashboard = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather] = useState<WeatherData>({
    temperature: 28,
    humidity: 65,
    condition: 'Partly Cloudy',
    icon: '⛅'
  });
  
  const [alerts] = useState<CropAlert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'Tomato plants may need water in 2 days',
      crop: 'Tomato',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'success',
      message: 'Brinjal harvest ready in 3 days',
      crop: 'Brinjal',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'info',
      message: 'New government scheme available',
      crop: 'General',
      timestamp: '1 day ago'
    }
  ]);

  const [crops] = useState([
    { name: 'Tomato', stage: 'Flowering', health: 85, icon: '🍅' },
    { name: 'Brinjal', stage: 'Ready', health: 95, icon: '🍆' },
    { name: 'Chili', stage: 'Growing', health: 78, icon: '🌶️' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    setTimeout(() => setIsListening(false), 3000);
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'success': return 'bg-green-100 border-green-300 text-green-800';
      case 'info': return 'bg-blue-100 border-blue-300 text-blue-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const greetingMessage = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* App Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-green-800">
                🌾 Sahayak
              </h1>
              <p className="text-green-600 text-sm">
                {greetingMessage()}, Farmer! • {formatTime(currentTime)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" className="border-green-300">
                <Bell className="h-4 w-4 mr-1" />
                <Badge variant="destructive" className="ml-1 h-4 w-4 p-0 text-xs">
                  {alerts.length}
                </Badge>
              </Button>
              <Button size="sm" variant="outline" className="border-green-300">
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 pb-24">
        {/* Voice Input */}
        <Card className="bg-gradient-to-r from-green-100 to-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleVoiceInput}
                className={`h-16 w-16 rounded-full bg-earth-gradient text-white hover:shadow-lg transition-all duration-200 ${
                  isListening ? 'animate-gentle-pulse' : ''
                }`}
              >
                <Mic className={`h-8 w-8 ${isListening ? 'animate-voice-wave' : ''}`} />
              </Button>
              <div className="flex-1">
                <p className="text-green-800 font-medium mb-1">
                  {isListening ? 'Listening...' : 'Ask Sahayak Anything'}
                </p>
                <p className="text-green-600 text-sm">
                  {isListening ? 'Speak now about your crops, diseases, or market prices' : 'Tap the mic to speak in Kannada or English'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather & Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-sky-gradient text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-white">
                <Sun className="h-5 w-5 mr-2" />
                Today's Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{weather.temperature}°C</p>
                  <p className="text-sm opacity-90 text-white">{weather.condition}</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl">{weather.icon}</p>
                  <div className="flex items-center text-sm mt-1 text-white">
                    <Droplets className="h-4 w-4 mr-1" />
                    {weather.humidity}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-saffron-gradient text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-white">
                <TrendingUp className="h-5 w-5 mr-2" />
                Market Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-white">
                  <span>Tomato</span>
                  <span className="font-mono">₹25/kg ↑</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Brinjal</span>
                  <span className="font-mono">₹18/kg ↓</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Chili</span>
                  <span className="font-mono">₹45/kg ↑</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sahayak Says */}
        <Card className="border-l-4 border-l-green-500 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-full p-2">
                <Sprout className="h-5 w-5 text-green-600 animate-leaf-sway" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-800 mb-1">Sahayak Says:</h3>
                <p className="text-green-700 text-sm">
                  Your brinjal crop is looking excellent! Consider harvesting in 2-3 days when prices are expected to rise. 
                  The weather is perfect for the next few days.
                </p>
                <Button variant="link" className="text-green-600 p-0 h-auto font-normal text-sm mt-2">
                  <Volume2 className="h-4 w-4 mr-1" />
                  Listen to tip
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Crops */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Sprout className="h-5 w-5 mr-2" />
              My Crops
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {crops.map((crop, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{crop.icon}</span>
                      <span className="font-medium">{crop.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {crop.stage}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Health:</span>
                    <span className={`font-semibold ${getHealthColor(crop.health)}`}>
                      {crop.health}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alerts & Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{alert.message}</p>
                      <p className="text-xs mt-1 opacity-70">{alert.crop} • {alert.timestamp}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-2">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-20 bg-green-600 hover:bg-green-700 flex-col space-y-2 text-white">
            <Camera className="h-6 w-6" />
            <span className="text-sm">Disease Check</span>
          </Button>
          <Button className="h-20 bg-orange-600 hover:bg-orange-700 flex-col space-y-2 text-white">
            <IndianRupee className="h-6 w-6" />
            <span className="text-sm">Market Prices</span>
          </Button>
          <Button className="h-20 bg-blue-600 hover:bg-blue-700 flex-col space-y-2 text-white">
            <Shield className="h-6 w-6" />
            <span className="text-sm">Schemes</span>
          </Button>
          <Button className="h-20 bg-purple-600 hover:bg-purple-700 flex-col space-y-2 text-white">
            <Sprout className="h-6 w-6" />
            <span className="text-sm">Add Crop</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
