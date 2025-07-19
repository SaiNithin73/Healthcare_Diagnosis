import React from 'react';
import { AlertTriangle, Heart, Thermometer, Zap, Shield, Wind, CheckCircle, Clock, Printer, Share2, Download, Brain, Coffee, Droplets, Activity, Users, Mic, Layers, Eye } from 'lucide-react';
import { DiagnosisResult, PatientInfo } from '../types';
import { diagnosisRules } from '../data/diagnosisRules';

interface DiagnosisResultsProps {
  result: DiagnosisResult;
  patientInfo: PatientInfo;
  symptoms: string[];
  onRestart: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'Thermometer': <Thermometer className="w-6 h-6" />,
  'Zap': <Zap className="w-6 h-6" />,
  'Shield': <Shield className="w-6 h-6" />,
  'Wind': <Wind className="w-6 h-6" />,
  'Heart': <Heart className="w-6 h-6" />,
  'Brain': <Brain className="w-6 h-6" />,
  'Coffee': <Coffee className="w-6 h-6" />,
  'Droplets': <Droplets className="w-6 h-6" />,
  'Activity': <Activity className="w-6 h-6" />,
  'Users': <Users className="w-6 h-6" />,
  'Mic': <Mic className="w-6 h-6" />,
  'Layers': <Layers className="w-6 h-6" />,
  'Eye': <Eye className="w-6 h-6" />,
  'Clock': <Clock className="w-6 h-6" />
};

const severityColors = {
  mild: 'from-green-500 to-emerald-600',
  moderate: 'from-yellow-500 to-orange-600',
  severe: 'from-red-500 to-rose-600'
};

export const DiagnosisResults: React.FC<DiagnosisResultsProps> = ({
  result,
  patientInfo,
  symptoms,
  onRestart
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Healthcare Diagnosis Results',
          text: `Diagnosis results for ${patientInfo.name}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      const text = `Healthcare Diagnosis Results\nPatient: ${patientInfo.name}\nDiagnoses: ${result.diagnoses.join(', ')}`;
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  const handleDownload = () => {
    const content = `
Healthcare Diagnosis Report
=========================

Patient Information:
- Name: ${patientInfo.name}
- Age: ${patientInfo.age}
- Gender: ${patientInfo.gender}

Symptoms Reported:
${symptoms.map(s => `- ${s}`).join('\n')}

Diagnosis Results:
${result.diagnoses.length > 0 
  ? result.diagnoses.map(d => `- ${d}: ${diagnosisRules[d]?.treatment || 'Consult a doctor'}`).join('\n')
  : '- No specific diagnosis found. Please consult a healthcare provider.'
}

${result.hasEmergency ? 'EMERGENCY ALERT: Immediate medical attention recommended!' : ''}

Follow-up Advice:
- If symptoms worsen or persist beyond 3 days, consult a doctor
- Maintain good hygiene, stay hydrated, and rest well
- Follow prescribed treatment recommendations

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagnosis-report-${patientInfo.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Diagnosis Results</h2>
        <p className="text-gray-600 dark:text-gray-400">Based on your reported symptoms</p>
      </div>

      {/* Emergency Alert */}
      {result.hasEmergency && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Emergency Alert</h3>
              <p className="text-red-700 dark:text-red-300">
                Your symptoms may require immediate medical attention. Please seek emergency care.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                Emergency symptoms detected: {result.emergencySymptoms.join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Patient Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Patient Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Name:</span>
            <p className="font-medium text-gray-900 dark:text-white">{patientInfo.name}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Age:</span>
            <p className="font-medium text-gray-900 dark:text-white">{patientInfo.age} years</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Gender:</span>
            <p className="font-medium text-gray-900 dark:text-white">{patientInfo.gender}</p>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-gray-500 dark:text-gray-400">Reported Symptoms:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {symptoms.map((symptom) => (
              <span
                key={symptom}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {symptom}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Diagnosis Cards */}
      {result.diagnoses.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Possible Conditions</h3>
          {result.diagnoses.map((diagnosis) => {
            const rule = diagnosisRules[diagnosis];
            return (
              <div
                key={diagnosis}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${severityColors[rule.severity]} rounded-full flex items-center justify-center text-white`}>
                    {iconMap[rule.icon]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{diagnosis}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rule.severity === 'mild' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        rule.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {rule.severity}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      <strong>Treatment:</strong> {rule.treatment}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <strong>Matching symptoms:</strong> {rule.symptoms.filter(s => 
                        symptoms.some(userSymptom => userSymptom.toLowerCase().includes(s.toLowerCase()))
                      ).join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-gray-600 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Exact Match Found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Unable to determine a specific condition based on your symptoms. Consider these general recommendations:
          </p>
          <div className="mt-4 text-left bg-white dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">General Health Tips:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Stay hydrated and get adequate rest</li>
              <li>• Monitor symptoms and note any changes</li>
              <li>• Consider over-the-counter remedies for comfort</li>
              <li>• Consult a healthcare provider if symptoms persist</li>
            </ul>
          </div>
        </div>
      )}

      {/* Possible Related Conditions */}
      {result.diagnoses.length === 0 && symptoms.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">Possible Related Conditions</h3>
          <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-3">
            Based on your symptoms, you might want to consider these conditions and their basic remedies:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-white dark:bg-yellow-900/30 rounded-lg p-3">
              <p className="font-medium text-yellow-900 dark:text-yellow-100">General Viral Infection</p>
              <p className="text-yellow-700 dark:text-yellow-300">Rest, fluids, monitor temperature</p>
            </div>
            <div className="bg-white dark:bg-yellow-900/30 rounded-lg p-3">
              <p className="font-medium text-yellow-900 dark:text-yellow-100">Stress-Related Symptoms</p>
              <p className="text-yellow-700 dark:text-yellow-300">Relaxation, adequate sleep, stress management</p>
            </div>
          </div>
        </div>
      )}

      {/* Follow-up Advice */}
      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800">
        <div className="flex items-start space-x-3">
          <Clock className="w-6 h-6 text-teal-600 dark:text-teal-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100 mb-2">Follow-up Advice</h3>
            <ul className="space-y-2 text-teal-800 dark:text-teal-200">
              <li>• If symptoms worsen or persist beyond 3 days, consult a doctor</li>
              <li>• Maintain good hygiene and wash hands frequently</li>
              <li>• Stay hydrated and get adequate rest</li>
              <li>• Follow any prescribed treatment recommendations</li>
              <li>• Seek immediate medical attention if emergency symptoms develop</li>
              <li>• Keep a symptom diary to track changes over time</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handlePrint}
          className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Report
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Save PDF Report
        </button>
        <button
          onClick={onRestart}
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          New Diagnosis
        </button>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="font-medium mb-1">Medical Disclaimer</p>
        <p>
          This tool is for informational purposes only and should not replace professional medical advice. 
          Always consult with a qualified healthcare provider for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
};