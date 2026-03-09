import React, { useState } from 'react';
import { Brain, Send, AlertCircle, User, Bot, ArrowRight, Activity, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { symptomAPI } from '../../services/api';
import { toast } from 'sonner';

interface DiseaseMatch {
  diseaseId: number;
  diseaseName: string;
  confidenceScore: number;
  confidencePercentage: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recommendation: string;
  matchedSymptoms: string[];
  matchedCount: number;
  totalSymptoms: number;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  matches?: DiseaseMatch[];
}

const SymptomChecker: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI Symptom Checker. Please describe your symptoms, and I\'ll analyze them using our advanced rule-based engine. Remember, this is not a medical diagnosis - always consult a healthcare professional.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-600 text-white';
      case 'HIGH':
        return 'bg-orange-500 text-white';
      case 'MEDIUM':
        return 'bg-yellow-500 text-black';
      case 'LOW':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
      case 'HIGH':
        return <AlertCircle className="w-4 h-4" />;
      case 'MEDIUM':
        return <TrendingUp className="w-4 h-4" />;
      case 'LOW':
        return <Shield className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Call backend API
      const response = await symptomAPI.analyze(input);
      const analysis = response.data.data;

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: analysis.success 
          ? `Based on your symptoms, I found ${analysis.matches.length} potential condition(s). Here are the results:`
          : analysis.message,
        matches: analysis.matches,
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      toast.error('Failed to analyze symptoms. Please try again.');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'I apologize, but I encountered an error while analyzing your symptoms. Please try again or contact support if the issue persists.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <Brain className="w-8 h-8 mr-3 text-pink-500" />
            AI Symptom Checker
          </h1>
          <p className="text-gray-600">
            Describe your symptoms and get AI-powered analysis with confidence scores. 
            Our rule-based engine uses weighted symptom mapping for accurate results.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-800 font-medium">Medical Disclaimer</p>
            <p className="text-sm text-red-700">
              This AI Symptom Checker uses rule-based analysis for educational purposes only. 
              It cannot provide medical diagnoses. If you have serious symptoms, please seek immediate medical attention.
            </p>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id}>
                  <div
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-[#1e88e5] to-[#43a047] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 mr-2" />
                        ) : (
                          <Bot className="w-4 h-4 mr-2" />
                        )}
                        <span className="text-xs font-medium">
                          {message.type === 'user' ? 'You' : 'AI Assistant'}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>

                  {/* Results Cards */}
                  {message.matches && message.matches.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {message.matches.map((match, idx) => (
                        <Card key={idx} className="border-0 shadow-md overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-800">{match.diseaseName}</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className={getSeverityColor(match.severity)}>
                                    {getSeverityIcon(match.severity)}
                                    <span className="ml-1">{match.severity}</span>
                                  </Badge>
                                  <span className="text-sm text-gray-500">
                                    {match.matchedCount}/{match.totalSymptoms} symptoms matched
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-2xl font-bold text-[#1e88e5]">
                                  {match.confidencePercentage}%
                                </span>
                                <p className="text-xs text-gray-500">Confidence</p>
                              </div>
                            </div>
                            
                            {/* Confidence Progress Bar */}
                            <div className="mb-3">
                              <Progress 
                                value={match.confidencePercentage} 
                                className="h-2"
                              />
                            </div>

                            {/* Matched Symptoms */}
                            <div className="mb-3">
                              <p className="text-xs text-gray-500 mb-1">Matched Symptoms:</p>
                              <div className="flex flex-wrap gap-1">
                                {match.matchedSymptoms.slice(0, 5).map((symptom, sIdx) => (
                                  <span 
                                    key={sIdx}
                                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                                  >
                                    {symptom}
                                  </span>
                                ))}
                                {match.matchedSymptoms.length > 5 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    +{match.matchedSymptoms.length - 5} more
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Recommendation */}
                            <div className="bg-amber-50 rounded-lg p-3">
                              <p className="text-sm text-amber-800">
                                <strong>Recommendation:</strong> {match.recommendation}
                              </p>
                            </div>

                            {/* View Disease Link */}
                            {match.diseaseId && (
                              <div className="mt-3">
                                <Link to="/diseases">
                                  <Button variant="link" className="p-0 h-auto text-[#1e88e5]">
                                    Learn more about {match.diseaseName}
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your symptoms (e.g., 'I have headache, fever, and fatigue')..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Tip: Be specific and list multiple symptoms for better accuracy
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-[#1e88e5]" />
              How Our AI Works
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-1">Symptom Parsing</h4>
                <p className="text-sm text-gray-600">Your input is analyzed and matched against our symptom database</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-1">Weighted Scoring</h4>
                <p className="text-sm text-gray-600">Each matched symptom contributes to a weighted confidence score</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-1">Results Ranking</h4>
                <p className="text-sm text-gray-600">Top matching conditions are ranked by confidence percentage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomChecker;
