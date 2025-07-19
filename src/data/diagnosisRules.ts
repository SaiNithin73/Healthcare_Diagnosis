import { Diagnosis } from '../types';

export const diagnosisRules: Record<string, Diagnosis> = {
  "Common Cold": {
    name: "Common Cold",
    symptoms: ["cough", "sore throat", "runny nose"],
    treatment: "Rest, fluids, steam inhalation, throat lozenges",
    severity: 'mild',
    icon: 'Thermometer'
  },
  "Flu": {
    name: "Flu",
    symptoms: ["fever", "chills", "muscle aches", "fatigue"],
    treatment: "Antiviral medications, rest, hydration, pain relievers",
    severity: 'moderate',
    icon: 'Zap'
  },
  "COVID-19": {
    name: "COVID-19",
    symptoms: ["fever", "dry cough", "loss of taste", "loss of smell"],
    treatment: "Isolation, consult doctor immediately, fluids, monitor symptoms",
    severity: 'severe',
    icon: 'Shield'
  },
  "Allergy": {
    name: "Allergy",
    symptoms: ["sneezing", "itchy eyes", "nasal congestion"],
    treatment: "Antihistamines, avoid allergens, nasal sprays, eye drops",
    severity: 'mild',
    icon: 'Wind'
  },
  "Pneumonia": {
    name: "Pneumonia",
    symptoms: ["fever", "chest pain", "shortness of breath"],
    treatment: "Antibiotics (if bacterial), rest, oxygen therapy if needed",
    severity: 'severe',
    icon: 'Heart'
  },
  "Migraine": {
    name: "Migraine",
    symptoms: ["headache", "nausea", "sensitivity to light"],
    treatment: "Painkillers, rest in dark quiet room, cold compress",
    severity: 'moderate',
    icon: 'Brain'
  },
  "Indigestion": {
    name: "Indigestion",
    symptoms: ["bloating", "nausea", "stomach pain"],
    treatment: "Antacids, ginger tea, avoid spicy food, small meals",
    severity: 'mild',
    icon: 'Coffee'
  },
  "Dehydration": {
    name: "Dehydration",
    symptoms: ["dizziness", "dry mouth", "fatigue"],
    treatment: "Drink water, electrolyte solution, rest in cool place",
    severity: 'moderate',
    icon: 'Droplets'
  },
  "Diarrhea": {
    name: "Diarrhea",
    symptoms: ["loose stools", "cramping", "stomach pain"],
    treatment: "ORS (oral rehydration solution), banana/rice diet, hydration",
    severity: 'mild',
    icon: 'Activity'
  },
  "Constipation": {
    name: "Constipation",
    symptoms: ["hard stools", "infrequent bowel movements", "bloating"],
    treatment: "Increase fiber intake, drink more water, exercise regularly",
    severity: 'mild',
    icon: 'Clock'
  },
  "Sinus Infection": {
    name: "Sinus Infection",
    symptoms: ["facial pressure", "nasal congestion", "headache"],
    treatment: "Steam inhalation, warm compress, nasal rinse, decongestants",
    severity: 'mild',
    icon: 'Users'
  },
  "Sore Throat": {
    name: "Sore Throat",
    symptoms: ["pain while swallowing", "dry throat", "throat irritation"],
    treatment: "Saltwater gargle, throat lozenges, warm tea with honey",
    severity: 'mild',
    icon: 'Mic'
  },
  "Skin Rash": {
    name: "Skin Rash",
    symptoms: ["itchy skin", "red patches", "skin irritation"],
    treatment: "Aloe vera gel, antihistamines, avoid scratching, cool compress",
    severity: 'mild',
    icon: 'Layers'
  },
  "Eye Strain": {
    name: "Eye Strain",
    symptoms: ["tired eyes", "blurry vision", "eye discomfort"],
    treatment: "Rest eyes, follow 20-20-20 rule, cold compress, reduce screen time",
    severity: 'mild',
    icon: 'Eye'
  }
};

export const emergencySymptoms = [
  "chest pain", 
  "shortness of breath", 
  "loss of consciousness", 
  "severe difficulty breathing",
  "severe chest pressure",
  "fainting",
  "unconsciousness"
];

export const commonSymptoms = [
  "fever", "cough", "sore throat", "runny nose", "muscle aches", "chills", 
  "fatigue", "shortness of breath", "loss of taste", "loss of smell", "sneezing", 
  "itchy eyes", "nasal congestion", "chest pain", "headache", "nausea", 
  "sensitivity to light", "bloating", "stomach pain", "dizziness", "dry mouth",
  "loose stools", "cramping", "hard stools", "infrequent bowel movements",
  "facial pressure", "pain while swallowing", "dry throat", "throat irritation",
  "itchy skin", "red patches", "skin irritation", "tired eyes", "blurry vision",
  "eye discomfort", "vomiting", "loss of consciousness", "body ache", "dry cough"
];