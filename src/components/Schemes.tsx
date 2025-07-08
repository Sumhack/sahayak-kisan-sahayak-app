
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  IndianRupee, 
  FileText, 
  Download,
  AlertCircle,
  Volume2,
  User
} from 'lucide-react';

interface Scheme {
  id: string;
  name: string;
  nameKannada: string;
  department: string;
  maxBenefit: number;
  eligibility: string[];
  documents: string[];
  deadline: string;
  status: 'eligible' | 'applied' | 'not_eligible';
  description: string;
  applicationMethod: 'online' | 'offline' | 'both';
}

const Schemes = () => {
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  
  const [schemes] = useState<Scheme[]>([
    {
      id: '1',
      name: 'PM-KISAN',
      nameKannada: 'ಪ್ರಧಾನಮಂತ್ರಿ ಕಿಸಾನ್',
      department: 'Ministry of Agriculture',
      maxBenefit: 6000,
      eligibility: ['Small & marginal farmers', 'Land ownership required', 'Valid Aadhaar'],
      documents: ['Aadhaar Card', 'Land Records', 'Bank Passbook'],
      deadline: '31st March 2024',
      status: 'eligible',
      description: 'Direct income support to farmers with landholding up to 2 hectares',
      applicationMethod: 'online'
    },
    {
      id: '2',
      name: 'Pradhan Mantri Fasal Bima Yojana',
      nameKannada: 'ಪ್ರಧಾನಮಂತ್ರಿ ಫಸಲ್ ಬೀಮಾ ಯೋಜನೆ',
      department: 'Ministry of Agriculture',
      maxBenefit: 200000,
      eligibility: ['All farmers', 'Crop insurance premium payment', 'Registered crops'],
      documents: ['Aadhaar Card', 'Bank Details', 'Land Records', 'Crop Details'],
      deadline: '31st December 2024',
      status: 'applied',
      description: 'Crop insurance scheme providing coverage against crop losses',
      applicationMethod: 'both'
    },
    {
      id: '3',
      name: 'Soil Health Card Scheme',
      nameKannada: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಯೋಜನೆ',
      department: 'Department of Agriculture',
      maxBenefit: 0,
      eligibility: ['All farmers', 'Land ownership', 'Soil testing required'],
      documents: ['Aadhaar Card', 'Land Records'],
      deadline: 'Ongoing',
      status: 'eligible',
      description: 'Free soil testing and nutrient recommendations for better crop yield',
      applicationMethod: 'offline'
    },
    {
      id: '4',
      name: 'Kisan Credit Card',
      nameKannada: 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್',
      department: 'Ministry of Agriculture',
      maxBenefit: 300000,
      eligibility: ['Active farmers', 'Good credit history', 'Land ownership/lease'],
      documents: ['Aadhaar Card', 'PAN Card', 'Land Records', 'Bank Statements'],
      deadline: 'Ongoing',
      status: 'not_eligible',
      description: 'Credit facility for farmers to meet agricultural expenses',
      applicationMethod: 'offline'
    },
    {
      id: '5',
      name: 'Raitha Bandhu',
      nameKannada: 'ರೈತ ಬಂಧು',
      department: 'Government of Karnataka',
      maxBenefit: 10000,
      eligibility: ['Karnataka farmers', 'Land ownership', 'Valid survey number'],
      documents: ['Aadhaar Card', 'Land Records', 'Survey Settlement'],
      deadline: '31st March 2024',
      status: 'eligible',
      description: 'Karnataka state scheme providing financial assistance to farmers',
      applicationMethod: 'online'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'eligible': return 'bg-green-100 text-green-800';
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'not_eligible': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'eligible': return <CheckCircle className="h-4 w-4" />;
      case 'applied': return <Clock className="h-4 w-4" />;
      case 'not_eligible': return <AlertCircle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'eligible': return 'Eligible';
      case 'applied': return 'Applied';
      case 'not_eligible': return 'Not Eligible';
      default: return 'Unknown';
    }
  };

  const handleApply = (schemeId: string) => {
    console.log('Applying for scheme:', schemeId);
    // Application logic would go here
  };

  const totalBenefit = schemes
    .filter(s => s.status === 'eligible')
    .reduce((total, s) => total + s.maxBenefit, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-800 mb-2">
            🛡️ Government Schemes
          </h1>
          <p className="text-green-600 text-sm">
            Discover schemes you're eligible for and apply easily
          </p>
        </div>

        {/* Summary Card */}
        <Card className="mb-6 bg-gradient-to-r from-green-100 to-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-green-800">Your Benefits</h3>
                <p className="text-sm text-green-600">Total potential benefit</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-800">₹{totalBenefit.toLocaleString()}</p>
                <p className="text-sm text-green-600">per year</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-green-600">
                  {schemes.filter(s => s.status === 'eligible').length}
                </p>
                <p className="text-xs text-gray-600">Eligible</p>
              </div>
              <div>
                <p className="text-lg font-bold text-blue-600">
                  {schemes.filter(s => s.status === 'applied').length}
                </p>
                <p className="text-xs text-gray-600">Applied</p>
              </div>
              <div>
                <p className="text-lg font-bold text-orange-600">
                  {schemes.filter(s => s.status === 'not_eligible').length}
                </p>
                <p className="text-xs text-gray-600">Not Eligible</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schemes List */}
        <div className="space-y-4">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-800 mb-1">
                      {scheme.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-2">{scheme.nameKannada}</p>
                    <p className="text-xs text-gray-500">{scheme.department}</p>
                  </div>
                  <Badge className={getStatusColor(scheme.status)}>
                    {getStatusIcon(scheme.status)}
                    <span className="ml-1">{getStatusText(scheme.status)}</span>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {/* Benefit Amount */}
                  {scheme.maxBenefit > 0 && (
                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                      <span className="text-sm text-orange-700">Max Benefit:</span>
                      <span className="font-bold text-orange-800 flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {scheme.maxBenefit.toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600">{scheme.description}</p>
                  
                  {/* Deadline */}
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Deadline: {scheme.deadline}
                  </div>
                  
                  {/* Quick Eligibility */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Key Requirements:</h4>
                    <div className="flex flex-wrap gap-1">
                      {scheme.eligibility.slice(0, 2).map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {scheme.eligibility.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{scheme.eligibility.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    {scheme.status === 'eligible' && (
                      <Button 
                        onClick={() => handleApply(scheme.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        Apply Now
                      </Button>
                    )}
                    {scheme.status === 'applied' && (
                      <Button variant="outline" className="flex-1" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Track Status
                      </Button>
                    )}
                    {scheme.status === 'not_eligible' && (
                      <Button variant="outline" className="flex-1" size="sm" disabled>
                        <User className="h-4 w-4 mr-1" />
                        Not Eligible
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </div>
                  
                  {/* Voice Support */}
                  <Button variant="link" className="text-green-600 p-0 h-auto text-xs">
                    <Volume2 className="h-3 w-3 mr-1" />
                    Listen to scheme details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-green-800">🤝 Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Document Checklist
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Application Forms
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Volume2 className="h-4 w-4 mr-2" />
                Application Guide (Audio)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schemes;
