import React, { useState } from 'react';
import { Search, Plus, X, AlertTriangle } from 'lucide-react';
import { commonSymptoms } from '../data/diagnosisRules';

interface SymptomInputProps {
  onNext: (symptoms: string[]) => void;
  onBack: () => void;
}

export const SymptomInput: React.FC<SymptomInputProps> = ({ onNext, onBack }) => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.length > 0) {
      const filtered = commonSymptoms.filter(symptom =>
        symptom.toLowerCase().includes(value.toLowerCase()) &&
        !symptoms.includes(symptom)
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const addSymptom = (symptom: string) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setInputValue('');
      setFilteredSuggestions([]);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue && !symptoms.includes(inputValue)) {
      addSymptom(inputValue);
    }
    if (symptoms.length > 0) {
      onNext(symptoms);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Describe Your Symptoms</h2>
        <p className="text-gray-600 dark:text-gray-400">Add all symptoms you're experiencing</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
              placeholder="Type a symptom (e.g., fever, cough)"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => addSymptom(inputValue)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-teal-500 hover:text-teal-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>

          {filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => addSymptom(suggestion)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-150"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {symptoms.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Selected Symptoms:</h3>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200"
                >
                  {symptom}
                  <button
                    type="button"
                    onClick={() => removeSymptom(symptom)}
                    className="ml-2 text-teal-600 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={symptoms.length === 0}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Get Diagnosis
          </button>
        </div>
      </form>
    </div>
  );
};