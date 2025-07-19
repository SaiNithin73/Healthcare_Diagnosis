export interface PatientInfo {
  name: string;
  age: string;
  gender: string;
}

export interface Diagnosis {
  name: string;
  symptoms: string[];
  treatment: string;
  severity: 'mild' | 'moderate' | 'severe';
  icon: string;
}

export interface DiagnosisResult {
  diagnoses: string[];
  treatments: string[];
  hasEmergency: boolean;
  emergencySymptoms: string[];
}