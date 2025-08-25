import React, { useState, useRef } from 'react';
import { Camera, Upload, X, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';
import { HealthRecord, Pet } from '../types';
import { analyzeHealthPhoto, VisionAnalysisResult } from '../services/visionService';

interface PhotoDiagnosisProps {
  pet: Pet;
  onSave: (record: Omit<HealthRecord, 'id'>) => void;
  onClose: () => void;
}

const PhotoDiagnosis: React.FC<PhotoDiagnosisProps> = ({ pet, onSave, onClose }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<VisionAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPhotos(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const analyzePhotos = async () => {
    if (photos.length === 0) return;
    
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeHealthPhoto(photos[0], pet.name);
      setAnalysisResult(result);
    } catch (error) {
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    const record: Omit<HealthRecord, 'id'> = {
      petId: pet.id,
      type: 'photo_diagnosis',
      title: `Photo Analysis - ${new Date().toLocaleDateString()}`,
      description,
      photos,
      aiAnalysis: analysisResult?.overallAssessment,
      severity: 'medium',
      createdAt: new Date()
    };
    
    onSave(record);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gpt-darker rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gpt-border">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gpt-text">Photo Diagnosis</h2>
              <p className="text-gpt-text-secondary">Upload photos for AI analysis of {pet.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gpt-light rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gpt-text" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-semibold text-gpt-text mb-3">
              Upload Photos
            </label>
            <div className="border-2 border-dashed border-gpt-border rounded-lg p-6 text-center">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="space-y-2">
                <Upload className="w-8 h-8 text-gpt-text-secondary mx-auto" />
                <p className="text-gpt-text">Click to upload photos</p>
                <p className="text-sm text-gpt-text-secondary">
                  Support JPG, PNG files. Max 5 photos.
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gpt-accent text-white px-4 py-2 rounded-lg hover:bg-gpt-accent-hover transition-colors"
                >
                  Choose Files
                </button>
              </div>
            </div>
          </div>

          {/* Photo Preview */}
          {photos.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gpt-text mb-3">
                Uploaded Photos ({photos.length})
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gpt-text mb-3">
              Describe the Issue
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
              placeholder="Describe what you're seeing, when it started, any symptoms..."
              rows={4}
            />
          </div>

          {/* Analyze Button */}
          {photos.length > 0 && !analysisResult && (
            <button
              onClick={analyzePhotos}
              disabled={isAnalyzing}
              className="w-full bg-gpt-accent text-white py-4 rounded-lg hover:bg-gpt-accent-hover disabled:opacity-50 transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" />
                  <span>Analyzing Photos...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>AI Photo Analysis</span>
                </>
              )}
            </button>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <div className="bg-gpt-light border border-gpt-border rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gpt-text text-lg">AI Analysis Complete</h3>
              </div>
              
              {/* Overall Assessment */}
              <div className="bg-gpt-dark rounded-lg p-4">
                <h4 className="font-semibold text-gpt-text mb-2">Overall Assessment</h4>
                <p className="text-sm text-gpt-text leading-relaxed">{analysisResult.overallAssessment}</p>
              </div>
              
              {/* Detected Condition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gpt-dark rounded-lg p-4">
                  <h4 className="font-semibold text-gpt-text mb-2">Detected Condition</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gpt-text-secondary">Condition:</span>
                      <span className="text-sm text-gpt-text font-medium">{analysisResult.analysis.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gpt-text-secondary">Confidence:</span>
                      <span className="text-sm text-gpt-text font-medium">
                        {Math.round(analysisResult.analysis.confidence * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gpt-text-secondary">Severity:</span>
                      <span className={`text-sm font-medium capitalize ${
                        analysisResult.analysis.severity === 'emergency' ? 'text-red-500' :
                        analysisResult.analysis.severity === 'high' ? 'text-orange-500' :
                        analysisResult.analysis.severity === 'medium' ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        {analysisResult.analysis.severity}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gpt-dark rounded-lg p-4">
                  <h4 className="font-semibold text-gpt-text mb-2">Detected Issues</h4>
                  <ul className="space-y-1">
                    {analysisResult.detectedIssues.map((issue, index) => (
                      <li key={index} className="text-sm text-gpt-text flex items-start">
                        <span className="w-1.5 h-1.5 bg-gpt-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Recommendations */}
              <div className="bg-gpt-dark rounded-lg p-4">
                <h4 className="font-semibold text-gpt-text mb-2">Recommendations</h4>
                <ul className="space-y-2">
                  {analysisResult.analysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gpt-text flex items-start">
                      <span className="text-gpt-accent font-bold mr-2">{index + 1}.</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Vet Recommendation */}
              {analysisResult.analysis.vetRequired && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Veterinary Consultation Recommended</p>
                      <p>Based on this analysis, we recommend scheduling a veterinary appointment for proper diagnosis and treatment.</p>
                    </div>
                  </div>
                </div>
              )}
              </div>
          )}

          {/* Medical Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">Medical Disclaimer</p>
                <p>
                  This AI analysis is for informational purposes only and cannot replace 
                  professional veterinary examination. Always consult with a veterinarian 
                  for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gpt-light text-gpt-text py-3 rounded-lg hover:bg-gpt-lighter transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={photos.length === 0 || !analysisResult}
              className="flex-1 bg-gpt-accent text-white py-3 rounded-lg hover:bg-gpt-accent-hover disabled:opacity-50 transition-colors font-semibold"
            >
              {analysisResult ? 'Save Analysis' : 'Analyze Photos First'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PhotoDiagnosis };