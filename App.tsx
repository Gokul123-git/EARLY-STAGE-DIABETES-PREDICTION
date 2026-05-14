import { useState } from 'react';
import { AssessmentForm } from './components/AssessmentForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { AssessmentHistory } from './components/AssessmentHistory';
import { AuthModal } from './components/AuthModal';
import { DataImportModal } from './components/DataImportModal';
import { AIChatbot } from './components/AIChatbot';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { Activity, History, LogIn, LogOut, User, Upload } from 'lucide-react';

export interface HealthData {
  age: number;
  bmi: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  fastingGlucose: number;
  physicalActivity: number; // hours per week
  familyHistory: boolean;
}

export interface AssessmentResult {
  riskScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendations: string[];
  factorContributions: {
    factor: string;
    contribution: number;
    value: string;
  }[];
}

function AppContent() {
  const { user, signOut } = useAuth();
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [view, setView] = useState<'assessment' | 'history'>('assessment');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importedData, setImportedData] = useState<Partial<HealthData> | null>(null);

  const handleAssessmentComplete = (data: HealthData, result: AssessmentResult) => {
    setHealthData(data);
    setAssessmentResult(result);
  };

  const handleNewAssessment = () => {
    setAssessmentResult(null);
    setHealthData(null);
    setImportedData(null);
    setView('assessment');
  };

  const handleSignOut = async () => {
    await signOut();
    setView('assessment');
  };

  const handleDataImport = (data: Partial<HealthData>) => {
    setImportedData(data);
    setShowImportModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <div className="flex items-center justify-center gap-3">
              <div className="bg-blue-600 p-3 rounded-2xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-blue-900">DiabetesAI Risk Assessment</h1>
            </div>
            <div className="flex-1 flex justify-end items-center gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">{user.email}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Advanced machine learning-powered early detection system for Type 2 diabetes risk assessment
          </p>

          {/* View Toggle */}
          <div className="flex gap-2 justify-center">
            <Button
              variant={view === 'assessment' ? 'default' : 'outline'}
              onClick={() => setView('assessment')}
            >
              <Activity className="w-4 h-4 mr-2" />
              New Assessment
            </Button>
            {user && (
              <Button
                variant={view === 'history' ? 'default' : 'outline'}
                onClick={() => setView('history')}
              >
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
            )}
            {view === 'assessment' && !assessmentResult && (
              <Button
                variant="outline"
                onClick={() => setShowImportModal(true)}
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        {view === 'history' ? (
          <AssessmentHistory />
        ) : !assessmentResult ? (
          <AssessmentForm 
            onComplete={handleAssessmentComplete} 
            initialData={importedData}
          />
        ) : (
          <ResultsDashboard
            result={assessmentResult}
            healthData={healthData!}
            onNewAssessment={handleNewAssessment}
            onSavePrompt={() => setShowAuthModal(true)}
          />
        )}

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-500 max-w-3xl mx-auto">
          <p>
            <strong>Medical Disclaimer:</strong> This tool is for educational purposes only and should not replace professional medical advice. 
            Please consult with a healthcare provider for proper diagnosis and treatment.
          </p>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      
      {/* Data Import Modal */}
      <DataImportModal 
        open={showImportModal} 
        onClose={() => setShowImportModal(false)}
        onImport={handleDataImport}
      />
      
      {/* AI Chatbot */}
      <AIChatbot 
        healthData={healthData}
        assessmentResult={assessmentResult}
      />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
