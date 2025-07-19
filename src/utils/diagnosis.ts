import { diagnosisRules, emergencySymptoms } from '../data/diagnosisRules';
import { DiagnosisResult } from '../types';

export const diagnoseSymptoms = (symptoms: string[]): DiagnosisResult => {
  const normalizedSymptoms = symptoms.map(s => s.toLowerCase().trim());
  const possibleDiagnoses: string[] = [];
  const treatments: string[] = [];
  
  // Check for emergency symptoms
  const foundEmergencySymptoms = normalizedSymptoms.filter(symptom => 
    emergencySymptoms.some(emergency => 
      symptom.includes(emergency) || emergency.includes(symptom)
    )
  );

  // Diagnose based on symptom matching
  Object.entries(diagnosisRules).forEach(([disease, data]) => {
    const matchCount = normalizedSymptoms.filter(symptom =>
      data.symptoms.some(diseaseSymptom =>
        symptom.includes(diseaseSymptom) || diseaseSymptom.includes(symptom)
      )
    ).length;

    // If at least half of the disease symptoms match
    if (matchCount >= Math.ceil(data.symptoms.length / 2)) {
      possibleDiagnoses.push(disease);
      treatments.push(data.treatment);
    }
  });

  return {
    diagnoses: possibleDiagnoses,
    treatments,
    hasEmergency: foundEmergencySymptoms.length > 0,
    emergencySymptoms: foundEmergencySymptoms
  };
};