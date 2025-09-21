import React, { useState } from 'react';
import { ArrowLeft, Plus, Camera, Calendar, TrendingUp, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { Pet, HealthRecord } from '../types';
import { PhotoDiagnosis } from './PhotoDiagnosis';
import { VetBooking } from './VetBooking';
import { InsuranceQuotes } from './InsuranceQuotes';

interface HealthDashboardProps {
  pet: Pet;
  healthRecords: HealthRecord[];
  onBack: () => void;
  onAddRecord: (record: Omit<HealthRecord, 'id'>) => void;
  onBookAppointment: (appointment: any) => void;
  onInsuranceCommission?: (commission: number) => void;
}

const HealthDashboard: React.FC<HealthDashboardProps> = ({
  pet,
  healthRecords,
  onBack,
  onAddRecord,
  onBookAppointment,
  onInsuranceCommission
}) => {
  const [showPhotoDiagnosis, setShowPhotoDiagnosis] = useState(false);
  const [showVetBooking, setShowVetBooking] = useState(false);
  const [showInsuranceQuotes, setShowInsuranceQuotes] = useState(false);

  const petRecords = healthRecords.filter(record => record.petId === pet.id);
  const recentRecords = petRecords.slice(0, 5);
  const urgentRecords = petRecords.filter(record => 
    record.severity === 'high' || record.severity === 'emergency'
  );

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'emergency_contact_vet': return 'text-red-600 bg-red-100';
      case 'vet_recommended': return 'text-orange-600 bg-orange-100';
      case 'monitor': return 'text-yellow-600 bg-yellow-100';
      case 'informational': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo_educational': return <Camera className="w-4 h-4" />;
      case 'vet_visit': return <Calendar className="w-4 h-4" />;
      case 'educational_note': return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full text-gpt-text" style={{ backgroundColor: '#2d2f63' }}>
      <div className="p-4 sm:p-6 border-b border-gpt-border bg-gpt-darker">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gpt-light rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gpt-text" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gpt-accent rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {pet.type === 'dog' ? '🐕' : pet.type === 'cat' ? '🐱' : '🐾'}
              </span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gpt-text">{pet.name}'s Health</h1>
              <p className="text-gpt-text-secondary">
                {pet.type} • {pet.breed} • {pet.age} years old
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setShowPhotoDiagnosis(true)}
            className="p-4 sm:p-6 bg-gpt-lighter border border-gpt-border rounded-2xl hover:border-gpt-accent transition-all text-left"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gpt-text text-sm sm:text-base">Photo Diagnosis</h3>
                <p className="text-sm text-gpt-text-secondary">AI-powered symptom analysis</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowVetBooking(true)}
            className="p-4 sm:p-6 bg-gpt-lighter border border-gpt-border rounded-2xl hover:border-gpt-accent transition-all text-left"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gpt-text text-sm sm:text-base">Book Vet Visit</h3>
                <p className="text-sm text-gpt-text-secondary">Schedule appointment</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowInsuranceQuotes(true)}
            className="p-4 sm:p-6 bg-gpt-lighter border border-gpt-border rounded-2xl hover:border-gpt-accent transition-all text-left sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gpt-text text-sm sm:text-base">Pet Insurance</h3>
                <p className="text-sm text-gpt-text-secondary">Get personalized quotes</p>
              </div>
            </div>
          </button>

          <div className="p-4 sm:p-6 bg-gpt-lighter border border-gpt-border rounded-2xl sm:col-span-2 lg:col-span-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gpt-text text-sm sm:text-base">Health Score</h3>
                <p className="text-sm text-gpt-text-secondary">Overall wellness: 85%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Urgent Alerts */}
        {urgentRecords.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gpt-text mb-4">⚠️ Urgent Attention</h2>
            <div className="space-y-3">
              {urgentRecords.map((record) => (
                <div key={record.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-800">{record.title}</h3>
                      <p className="text-sm text-red-700 mt-1">{record.description}</p>
                      <p className="text-xs text-red-600 mt-2">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Health Records */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gpt-text">Recent Health Records</h2>
            <button className="text-gpt-accent hover:text-gpt-accent-hover font-medium">
              View All
            </button>
          </div>

          {recentRecords.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gpt-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gpt-text mb-2">No health records yet</h3>
              <p className="text-gpt-text-secondary mb-6 px-4">
                Start tracking {pet.name}'s health with photo diagnosis or symptom logging
              </p>
              <button
                onClick={() => setShowPhotoDiagnosis(true)}
                className="bg-gpt-accent text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-gpt-accent-hover transition-colors font-semibold text-sm sm:text-base"
              >
                Add First Record
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentRecords.map((record) => (
                <div key={record.id} className="bg-gpt-lighter border border-gpt-border rounded-lg p-3 sm:p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {getTypeIcon(record.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gpt-text text-sm sm:text-base">{record.title}</h3>
                          {record.severity && (
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getSeverityColor(record.severity)}`}>
                              {record.severity}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gpt-text-secondary mb-2">{record.description}</p>
                        {record.aiAnalysis && (
                          <div className="bg-gpt-dark rounded-lg p-3 mt-2">
                            <p className="text-xs text-gpt-text-secondary mb-1">AI Analysis:</p>
                            <p className="text-sm text-gpt-text">
                              {record.aiAnalysis.substring(0, 150)}...
                            </p>
                          </div>
                        )}
                        <p className="text-xs text-gpt-text-secondary mt-2">
                          {new Date(record.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Health Insights */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gpt-text mb-4">Health Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gpt-lighter border border-gpt-border rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-gpt-text mb-2 text-sm sm:text-base">Vaccination Status</h3>
              <p className="text-sm text-gpt-text-secondary">Next due: Rabies booster in 3 months</p>
            </div>
            <div className="bg-gpt-lighter border border-gpt-border rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-gpt-text mb-2 text-sm sm:text-base">Weight Tracking</h3>
              <p className="text-sm text-gpt-text-secondary">Current: {pet.weight} lbs (Healthy range)</p>
            </div>
            {pet.veterinarian && (
              <div className="bg-gpt-lighter border border-gpt-border rounded-lg p-3 sm:p-4 sm:col-span-2">
                <h3 className="font-semibold text-gpt-text mb-2 text-sm sm:text-base flex items-center">
                  <span className="mr-2">🩺</span>
                  Primary Veterinarian
                </h3>
                <div className="space-y-1 text-sm text-gpt-text-secondary">
                  <p><strong>{pet.veterinarian.name}</strong> - {pet.veterinarian.clinicName}</p>
                  {pet.veterinarian.phone && (
                    <p className="flex items-center">
                      <span className="mr-2">📞</span>
                      <a href={`tel:${pet.veterinarian.phone}`} className="text-gpt-accent hover:underline">
                        {pet.veterinarian.phone}
                      </a>
                    </p>
                  )}
                  {pet.veterinarian.email && (
                    <p className="flex items-center">
                      <span className="mr-2">✉️</span>
                      <a href={`mailto:${pet.veterinarian.email}`} className="text-gpt-accent hover:underline">
                        {pet.veterinarian.email}
                      </a>
                    </p>
                  )}
                  {pet.veterinarian.address && (
                    <p className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span>{pet.veterinarian.address}</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPhotoDiagnosis && (
        <PhotoDiagnosis
          pet={pet}
          onSave={onAddRecord}
          onClose={() => setShowPhotoDiagnosis(false)}
        />
      )}

      {showVetBooking && (
        <VetBooking
          pet={pet}
          onClose={() => setShowVetBooking(false)}
          onBookAppointment={onBookAppointment}
        />
      )}

      {showInsuranceQuotes && (
        <InsuranceQuotes
          pet={pet}
          isOpen={showInsuranceQuotes}
          onClose={() => setShowInsuranceQuotes(false)}
          onApplicationSubmit={onInsuranceCommission || (() => {})}
        />
      )}
    </div>
  );
};

export { HealthDashboard };