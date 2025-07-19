import React, { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { ProgressBar } from './components/ProgressBar';
import { PatientInfoForm } from './components/PatientInfoForm';
import { SymptomInput } from './components/SymptomInput';
import { DiagnosisResults } from './components/DiagnosisResults';
import { PatientInfo, DiagnosisResult } from './types';
import { diagnoseSymptoms } from './utils/diagnosis';
import { Heart } from 'lucide-react';

type Step = 'info' | 'symptoms' | 'results';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);

  const handlePatientInfoSubmit = (info: PatientInfo) => {
    setPatientInfo(info);
    setCurrentStep('symptoms');
  };

  const handleSymptomsSubmit = (symptomsData: string[]) => {
    setSymptoms(symptomsData);
    const result = diagnoseSymptoms(symptomsData);
    setDiagnosisResult(result);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('info');
    setPatientInfo(null);
    setSymptoms([]);
    setDiagnosisResult(null);
  };

  const handleBack = () => {
    if (currentStep === 'symptoms') {
      setCurrentStep('info');
    }
  };

  const getStepNumber = () => {
    switch (currentStep) {
      case 'info': return 1;
      case 'symptoms': return 2;
      case 'results': return 3;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-600 rounded-full flex items-center justify-center mr-3">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
              HealthCare Diagnosis
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Advanced healthcare diagnosis assistant with comprehensive symptom analysis and treatment recommendations.
          </p>
        </div>

        {/* Progress Bar - only show during info and symptoms steps */}
        {currentStep !== 'results' && (
          <ProgressBar currentStep={getStepNumber()} totalSteps={3} />
        )}

        {/* Main Content */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 transition-all duration-500">
          {currentStep === 'info' && (
            <PatientInfoForm onNext={handlePatientInfoSubmit} />
          )}

          {currentStep === 'symptoms' && (
            <SymptomInput onNext={handleSymptomsSubmit} onBack={handleBack} />
          )}

          {currentStep === 'results' && patientInfo && diagnosisResult && (
            <DiagnosisResults
              result={diagnosisResult}
              patientInfo={patientInfo}
              symptoms={symptoms}
              onRestart={handleRestart}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            Built with modern web technologies • Always consult healthcare professionals for medical decisions
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;