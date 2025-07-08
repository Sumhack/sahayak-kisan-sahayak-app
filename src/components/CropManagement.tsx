
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sprout, 
  Plus, 
  Calendar, 
  Droplets, 
  IndianRupee,
  TrendingUp,
  Volume2,
  Camera,
  Edit,
  Trash2,
  AlertTriangle
} from 'lucide-react';

interface Crop {
  id: string;
  name: string;
  nameKannada: string;
  icon: string;
  area: number;
  plantedDate: string;
  stage: string;
  healthScore: number;
  expectedHarvest: string;
  totalInvestment: number;
  expectedRevenue: number;
  lastWatered: string;
  nextAction: string;
  issues: string[];
}

const CropManagement = () => {
  const [crops] = useState<Crop[]>([
    {
      id: '1',
      name: 'Tomato',
      nameKannada: 'ಟೊಮಾಟೊ',
      icon: '🍅',
      area: 0.5,
      plantedDate: '2024-01-15',
      stage: 'Flowering',
      healthScore: 85,
      expectedHarvest: '2024-03-20',
      totalInvestment: 15000,
      expectedRevenue: 35000,
      lastWatered: '2024-02-10',
      nextAction: 'Apply fertilizer in 2 days',
      issues: ['Leaf curl noticed', 'Some pest activity']
    },
    {
      id: '2',
      name: 'Brinjal',
      nameKannada: 'ಬದನೆಕಾಯಿ',
      icon: '🍆',
      area: 0.3,
      plantedDate: '2024-01-10',
      stage: 'Ready for Harvest',
      healthScore: 95,
      expectedHarvest: '2024-02-15',
      totalInvestment: 8000,
      expectedRevenue: 18000,
      lastWatered: '2024-02-11',
      nextAction: 'Harvest in 3 days',
      issues: []
    },
    {
      id: '3',
      name: 'Chili',
      nameKannada: 'ಮೆಣಸಿನಕಾಯಿ',
      icon: '🌶️',
      area: 0.2,
      plantedDate: '2024-01-20',
      stage: 'Growing',
      healthScore: 78,
      expectedHarvest: '2024-04-10',
      totalInvestment: 5000,
      expectedRevenue: 12000,
      lastWatered: '2024-02-09',
      nextAction: 'Watering needed tomorrow',
      issues: ['Slow growth', 'Nutrient deficiency suspected']
    }
  ]);

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'ready for harvest': return 'bg-orange-100 text-orange-800';
      case 'flowering': return 'bg-purple-100 text-purple-800';
      case 'growing': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getDaysUntilHarvest = (harvestDate: string) => {
    const today = new Date();
    const harvest = new Date(harvestDate);
    const diffTime = harvest.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProfitability = (investment: number, revenue: number) => {
    const profit = revenue - investment;
    const percentage = ((profit / investment) * 100).toFixed(1);
    return { profit, percentage };
  };

  const totalArea = crops.reduce((sum, crop) => sum + crop.area, 0);
  const totalInvestment = crops.reduce((sum, crop) => sum + crop.totalInvestment, 0);
  const totalExpectedRevenue = crops.reduce((sum, crop) => sum + crop.expectedRevenue, 0);
  const totalProfit = totalExpectedRevenue - totalInvestment;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-800">
              🌾 My Crops
            </h1>
            <p className="text-green-600 text-sm">
              Manage your {crops.length} crops across {totalArea} acres
            </p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-1" />
            Add Crop
          </Button>
        </div>

        {/* Farm Summary */}
        <Card className="mb-6 bg-gradient-to-r from-green-100 to-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Farm Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-800">
                  ₹{totalInvestment.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">Total Investment</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-800">
                  ₹{totalExpectedRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-orange-600">Expected Revenue</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Expected Profit:</span>
                <span className={`font-bold ${totalProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{totalProfit.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-500">Profit Margin:</span>
                <span className={`text-sm font-medium ${totalProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {((totalProfit / totalInvestment) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crops List */}
        <div className="space-y-4">
          {crops.map((crop) => {
            const daysUntilHarvest = getDaysUntilHarvest(crop.expectedHarvest);
            const profitability = getProfitability(crop.totalInvestment, crop.expectedRevenue);
            
            return (
              <Card key={crop.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{crop.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{crop.name}</h3>
                        <p className="text-sm text-gray-600">{crop.nameKannada}</p>
                        <p className="text-xs text-gray-500">{crop.area} acres</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={getStageColor(crop.stage)}>
                        {crop.stage}
                      </Badge>
                      <Badge className={getHealthBadgeColor(crop.healthScore)}>
                        {crop.healthScore}% Health
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {/* Timeline */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Planted:</p>
                        <p className="font-medium">{formatDate(crop.plantedDate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Harvest:</p>
                        <p className="font-medium">
                          {daysUntilHarvest > 0 ? `${daysUntilHarvest} days` : 'Ready now'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Financial Info */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Investment:</span>
                        <span className="font-medium">₹{crop.totalInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Expected Revenue:</span>
                        <span className="font-medium">₹{crop.expectedRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Profit:</span>
                        <span className={`font-bold ${profitability.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹{profitability.profit.toLocaleString()} ({profitability.percentage}%)
                        </span>
                      </div>
                    </div>
                    
                    {/* Next Action */}
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Next Action:</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">{crop.nextAction}</p>
                    </div>
                    
                    {/* Issues */}
                    {crop.issues.length > 0 && (
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <div className="flex items-center space-x-2 mb-1">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">Issues:</span>
                        </div>
                        <ul className="space-y-1">
                          {crop.issues.map((issue, index) => (
                            <li key={index} className="text-sm text-yellow-700 flex items-center">
                              <span className="w-1 h-1 bg-yellow-600 rounded-full mr-2" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Camera className="h-4 w-4 mr-1" />
                        Photo
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Update
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Stats
                      </Button>
                    </div>
                    
                    {/* Voice Support */}
                    <Button variant="link" className="text-green-600 p-0 h-auto text-xs">
                      <Volume2 className="h-3 w-3 mr-1" />
                      Listen to crop summary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-green-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 flex-col space-y-1">
                <Droplets className="h-5 w-5" />
                <span className="text-sm">Water Log</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col space-y-1">
                <IndianRupee className="h-5 w-5" />
                <span className="text-sm">Add Expense</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col space-y-1">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Schedule</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col space-y-1">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CropManagement;
