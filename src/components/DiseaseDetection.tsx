
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Upload, 
  Mic, 
  Volume2, 
  AlertTriangle, 
  CheckCircle, 
  Leaf,
  MapPin,
  Clock
} from 'lucide-react';

interface DiagnosisResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  symptoms: string[];
  remedies: {
    type: 'organic' | 'chemical';
    treatment: string;
    instructions: string;
  }[];
}

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceDescription, setVoiceDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setDiagnosis({
        disease: 'Leaf Blight',
        confidence: 87,
        severity: 'medium',
        symptoms: ['Brown spots on leaves', 'Yellowing around edges', 'Dry patches'],
        remedies: [
          {
            type: 'organic',
            treatment: 'Neem Oil Spray',
            instructions: 'Mix 10ml neem oil with 1L water. Spray in evening every 3 days.'
          },
          {
            type: 'organic',
            treatment: 'Copper Fungicide',
            instructions: 'Apply copper-based fungicide as per package instructions.'
          },
          {
            type: 'chemical',
            treatment: 'Mancozeb 75% WP',
            instructions: 'Mix 2g per liter of water. Spray weekly until symptoms reduce.'
          }
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate voice input
    setTimeout(() => {
      setVoiceDescription('I see brown spots on my tomato leaves and they are turning yellow');
      setIsListening(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-800 mb-2">
            🔬 Disease Detection
          </h1>
          <p className="text-green-600 text-sm">
            Take a photo or describe the problem to get instant diagnosis
          </p>
        </div>

        {/* Image Upload Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              Upload Plant Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedImage ? (
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Plant disease" 
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2"
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <p className="text-green-600 font-medium">Take Photo</p>
                  <p className="text-sm text-green-500 mt-1">or tap to upload from gallery</p>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <div className="flex space-x-2">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Camera
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voice Description */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Mic className="h-5 w-5 mr-2" />
              Describe the Problem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={handleVoiceInput}
                className={`w-full h-12 bg-earth-gradient text-white hover:shadow-lg transition-all ${
                  isListening ? 'animate-gentle-pulse' : ''
                }`}
              >
                <Mic className={`h-5 w-5 mr-2 ${isListening ? 'animate-voice-wave' : ''}`} />
                {isListening ? 'Listening...' : 'Tap to speak'}
              </Button>
              
              {voiceDescription && (
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm">{voiceDescription}</p>
                  <Button variant="link" className="text-green-600 p-0 h-auto text-xs mt-1">
                    <Volume2 className="h-3 w-3 mr-1" />
                    Play back
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Button */}
        {selectedImage && (
          <Button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full h-12 bg-saffron-gradient text-white hover:shadow-lg transition-all mb-6"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Leaf className="h-5 w-5 mr-2" />
                Analyze Plant
              </>
            )}
          </Button>
        )}

        {/* Diagnosis Results */}
        {diagnosis && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Diagnosis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Disease Info */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{diagnosis.disease}</h3>
                    <p className="text-sm text-gray-600">Disease detected</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getSeverityColor(diagnosis.severity)}>
                      {diagnosis.severity.toUpperCase()}
                    </Badge>
                    <p className={`text-sm font-medium mt-1 ${getConfidenceColor(diagnosis.confidence)}`}>
                      {diagnosis.confidence}% confidence
                    </p>
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Symptoms:</h4>
                  <ul className="space-y-1">
                    {diagnosis.symptoms.map((symptom, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Remedies */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Recommended Treatments:</h4>
                  <div className="space-y-3">
                    {diagnosis.remedies.map((remedy, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-800">{remedy.treatment}</h5>
                          <Badge variant={remedy.type === 'organic' ? 'default' : 'secondary'}>
                            {remedy.type === 'organic' ? '🌿 Organic' : '⚗️ Chemical'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{remedy.instructions}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Shops
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Clock className="h-4 w-4 mr-2" />
                    Set Reminder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Photography Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Take photos in good natural light</p>
              <p>• Focus on affected leaves/parts</p>
              <p>• Include multiple angles if possible</p>
              <p>• Clean the camera lens for clarity</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;
