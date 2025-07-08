
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, 
  Mic, 
  Search,
  MapPin,
  Clock,
  Volume2
} from 'lucide-react';

interface MarketPrice {
  crop: string;
  icon: string;
  currentPrice: number;
  previousPrice: number;
  market: string;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
  forecast: string;
}

const MarketPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  
  const [marketPrices] = useState<MarketPrice[]>([
    {
      crop: 'Tomato',
      icon: '🍅',
      currentPrice: 25,
      previousPrice: 22,
      market: 'APMC Bangalore',
      lastUpdated: '2 hours ago',
      trend: 'up',
      forecast: 'Prices expected to rise for next 3 days'
    },
    {
      crop: 'Brinjal',
      icon: '🍆',
      currentPrice: 18,
      previousPrice: 20,
      market: 'APMC Bangalore',
      lastUpdated: '1 hour ago',
      trend: 'down',
      forecast: 'Good time to sell, prices may drop further'
    },
    {
      crop: 'Chili',
      icon: '🌶️',
      currentPrice: 45,
      previousPrice: 42,
      market: 'APMC Bangalore',
      lastUpdated: '30 minutes ago',
      trend: 'up',
      forecast: 'High demand expected, hold for better prices'
    },
    {
      crop: 'Onion',
      icon: '🧅',
      currentPrice: 15,
      previousPrice: 15,
      market: 'APMC Bangalore',
      lastUpdated: '1 hour ago',
      trend: 'stable',
      forecast: 'Steady demand, good time to sell'
    },
    {
      crop: 'Potato',
      icon: '🥔',
      currentPrice: 12,
      previousPrice: 14,
      market: 'APMC Bangalore',
      lastUpdated: '45 minutes ago',
      trend: 'down',
      forecast: 'Seasonal decline, wait for festival demand'
    },
    {
      crop: 'Carrot',
      icon: '🥕',
      currentPrice: 22,
      previousPrice: 20,
      market: 'APMC Bangalore',
      lastUpdated: '2 hours ago',
      trend: 'up',
      forecast: 'Winter demand increasing'
    }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriceChange = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage };
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    setTimeout(() => setIsListening(false), 2000);
  };

  const getRecommendation = (crop: MarketPrice) => {
    if (crop.trend === 'up') {
      return {
        action: 'HOLD',
        color: 'bg-green-100 text-green-800',
        message: 'Consider holding for better prices'
      };
    } else if (crop.trend === 'down') {
      return {
        action: 'SELL',
        color: 'bg-red-100 text-red-800',
        message: 'Consider selling soon'
      };
    } else {
      return {
        action: 'NEUTRAL',
        color: 'bg-gray-100 text-gray-800',
        message: 'Good time to sell'
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-800 mb-2">
            📊 Market Prices
          </h1>
          <p className="text-green-600 text-sm">
            Live prices from APMC markets across Karnataka
          </p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleVoiceSearch}
                className={`bg-earth-gradient text-white hover:shadow-lg transition-all ${
                  isListening ? 'animate-gentle-pulse' : ''
                }`}
              >
                <Mic className={`h-4 w-4 ${isListening ? 'animate-voice-wave' : ''}`} />
              </Button>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">
                  {isListening ? 'Listening...' : 'Search for crop prices'}
                </p>
                <p className="text-gray-600 text-sm">
                  {isListening ? 'Say crop name...' : 'Tap mic to search by voice'}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Market Summary */}
        <Card className="mb-6 bg-gradient-to-r from-orange-100 to-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center">
              <IndianRupee className="h-5 w-5 mr-2" />
              Market Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">5</p>
                <p className="text-sm text-gray-600">Prices Up</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">3</p>
                <p className="text-sm text-gray-600">Prices Down</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">2</p>
                <p className="text-sm text-gray-600">Stable</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price List */}
        <div className="space-y-4">
          {marketPrices.map((price, index) => {
            const priceChange = getPriceChange(price.currentPrice, price.previousPrice);
            const recommendation = getRecommendation(price);
            
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{price.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{price.crop}</h3>
                        <p className="text-sm text-gray-600">{price.market}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <span className="text-lg font-bold text-gray-800">
                          ₹{price.currentPrice}/kg
                        </span>
                        {getTrendIcon(price.trend)}
                      </div>
                      <div className={`text-sm font-medium ${getTrendColor(price.trend)}`}>
                        {priceChange.change > 0 ? '+' : ''}₹{priceChange.change} ({priceChange.percentage}%)
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={recommendation.color}>
                      {recommendation.action}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {price.lastUpdated}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-2 rounded text-sm">
                    <p className="text-gray-700">{price.forecast}</p>
                    <Button variant="link" className="text-green-600 p-0 h-auto text-xs mt-1">
                      <Volume2 className="h-3 w-3 mr-1" />
                      Listen to forecast
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      View Markets
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Price History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-green-800">💡 Market Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Prices are updated every 30 minutes</p>
              <p>• Festival seasons usually see price spikes</p>
              <p>• Morning hours have better prices</p>
              <p>• Check transport costs before deciding</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;
