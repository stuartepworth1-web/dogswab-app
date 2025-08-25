import React, { useState } from 'react';
import { Pet, PetType } from '../types';
import { Plus, Edit2, Trash2, ArrowLeft, Heart, Calendar, Weight, Ruler } from 'lucide-react';

interface PetManagementProps {
  pets: Pet[];
  onAddPet: (pet: Omit<Pet, 'id'>) => void;
  onUpdatePet: (id: string, pet: Partial<Pet>) => void;
  onDeletePet: (id: string) => void;
  onBack: () => void;
}

const PetManagement: React.FC<PetManagementProps> = ({
  pets,
  onAddPet,
  onUpdatePet,
  onDeletePet,
  onBack,
}) => {
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'dog' as PetType,
    breed: '',
    age: '',
    weight: '',
    gender: 'male' as Pet['gender'],
    isNeutered: false,
    medicalHistory: '',
    veterinarian: {
      name: '',
      clinicName: '',
      email: '',
      phone: '',
      address: '',
      notes: ''
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'dog',
      breed: '',
      age: '',
      weight: '',
      gender: 'male',
      isNeutered: false,
      medicalHistory: '',
      veterinarian: {
        name: '',
        clinicName: '',
        email: '',
        phone: '',
        address: '',
        notes: ''
      }
    });
    setIsAddingPet(false);
    setEditingPet(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const petData = {
      ...formData,
      age: parseInt(formData.age) || 0,
      weight: parseFloat(formData.weight) || 0,
      veterinarian: formData.veterinarian.name ? formData.veterinarian : undefined
    };

    if (editingPet) {
      onUpdatePet(editingPet.id, petData);
    } else {
      onAddPet(petData);
    }
    resetForm();
  };

  const handleEdit = (pet: Pet) => {
    setFormData({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age.toString(),
      weight: pet.weight.toString(),
      gender: pet.gender,
      isNeutered: pet.isNeutered,
      medicalHistory: pet.medicalHistory,
      veterinarian: pet.veterinarian || {
        name: '',
        clinicName: '',
        email: '',
        phone: '',
        address: '',
        notes: ''
      }
    });
    setEditingPet(pet);
    setIsAddingPet(true);
  };

  const getPetIcon = (type: PetType) => {
    switch (type) {
      case 'dog': return '🐕';
      case 'cat': return '🐱';
      case 'bird': return '🐦';
      case 'rabbit': return '🐰';
      default: return '🐾';
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gpt-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐾</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gpt-text">Pet Management</h1>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {!isAddingPet ? (
          <div>
            <div className="h-12 sm:h-16 flex items-center justify-center mx-auto mb-4">
              <img 
                src="https://storage.reimage.dev/dogswabapp/dba9be83d5bd/original" 
                alt="DOGSWAB Logo" 
                className="h-full w-auto object-contain drop-shadow-lg"
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gpt-text">Your Pets</h2>
              <button
                onClick={() => setIsAddingPet(true)}
                className="flex items-center gap-2 bg-gpt-accent text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gpt-accent-hover transition-colors font-semibold text-sm sm:text-base"
              >
                <Plus className="w-4 h-4" />
                Add Pet
              </button>
            </div>

            {pets.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gpt-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🐾</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gpt-text mb-2">No pets added yet</h3>
                <p className="text-gpt-text-secondary mb-6 text-base sm:text-lg px-4">Add your first pet to start getting personalized advice</p>
                <button
                  onClick={() => setIsAddingPet(true)}
                  className="bg-gpt-accent text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-gpt-accent-hover transition-colors font-semibold text-base sm:text-lg"
                >
                  Add your first pet
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pets.map((pet) => (
                  <div key={pet.id} className="bg-gpt-lighter rounded-2xl p-4 sm:p-6 border border-gpt-border">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getPetIcon(pet.type)}</span>
                        <div>
                          <h3 className="font-bold text-gpt-text text-base sm:text-lg">{pet.name}</h3>
                          <p className="text-sm text-gpt-text-secondary font-medium capitalize">{pet.type} • {pet.breed}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(pet)}
                          className="p-2 hover:bg-gpt-light rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-gpt-text" />
                        </button>
                        <button
                          onClick={() => onDeletePet(pet.id)}
                          className="p-2 hover:bg-red-900 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gpt-text font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>{pet.age} years old</span>
                      </div>
                      <div className="flex items-center gap-2 text-gpt-text font-medium">
                        <Weight className="w-4 h-4" />
                        <span>{pet.weight} lbs</span>
                      </div>
                      {pet.medicalHistory && (
                        <div className="mt-3">
                          <p className="text-xs text-gpt-text font-semibold mb-1 uppercase tracking-wide">Medical History:</p>
                          <p className="text-xs text-gpt-text-secondary bg-gpt-light p-3 rounded-lg font-medium">
                            {pet.medicalHistory.length > 100 
                              ? `${pet.medicalHistory.substring(0, 100)}...` 
                              : pet.medicalHistory}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-2 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gpt-text mb-6 sm:mb-8">
              {editingPet ? 'Edit Pet' : 'Add New Pet'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gpt-text mb-3 uppercase tracking-wide">
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm sm:text-base"
                    placeholder="Enter pet's name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gpt-text mb-3 uppercase tracking-wide">
                    Pet Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as PetType })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm sm:text-base"
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gpt-text mb-3 uppercase tracking-wide">
                    Breed
                  </label>
                  <input
                    type="text"
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm sm:text-base"
                    placeholder="Enter breed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gpt-text mb-3 uppercase tracking-wide">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm sm:text-base"
                    placeholder="Enter age"
                    min="0"
                    max="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gpt-text mb-3 uppercase tracking-wide">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as Pet['gender'] })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm sm:text-base"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gpt-text mb-3 uppercase tracking-wide">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm sm:text-base"
                    placeholder="Enter weight"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isNeutered"
                  checked={formData.isNeutered}
                  onChange={(e) => setFormData({ ...formData, isNeutered: e.target.checked })}
                  className="w-4 h-4 text-gpt-accent focus:ring-gpt-accent border-gpt-border rounded"
                />
                <label htmlFor="isNeutered" className="text-sm font-semibold text-gpt-text">
                  Spayed/Neutered
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gpt-text mb-3 uppercase tracking-wide">
                  Medical History
                </label>
                <textarea
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm sm:text-base"
                  placeholder="Any medical conditions, allergies, or previous treatments..."
                  rows={4}
                />
              </div>

              {/* Veterinarian Information Section */}
              <div className="border-t border-gpt-border pt-6">
                <h3 className="text-lg font-bold text-gpt-text mb-4 flex items-center">
                  <span className="mr-2">🩺</span>
                  Veterinarian Information
                </h3>
                <p className="text-sm text-gpt-text-secondary mb-4">
                  Add your pet's primary veterinarian for easy contact and booking
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gpt-text mb-2">
                      Veterinarian Name
                    </label>
                    <input
                      type="text"
                      value={formData.veterinarian.name}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        veterinarian: { ...formData.veterinarian, name: e.target.value }
                      })}
                      className="w-full px-3 py-2.5 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm"
                      placeholder="Dr. Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gpt-text mb-2">
                      Clinic Name
                    </label>
                    <input
                      type="text"
                      value={formData.veterinarian.clinicName}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        veterinarian: { ...formData.veterinarian, clinicName: e.target.value }
                      })}
                      className="w-full px-3 py-2.5 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm"
                      placeholder="Pet Care Clinic"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gpt-text mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.veterinarian.phone}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        veterinarian: { ...formData.veterinarian, phone: e.target.value }
                      })}
                      className="w-full px-3 py-2.5 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gpt-text mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.veterinarian.email}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        veterinarian: { ...formData.veterinarian, email: e.target.value }
                      })}
                      className="w-full px-3 py-2.5 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm"
                      placeholder="vet@clinic.com"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gpt-text mb-2">
                      Clinic Address
                    </label>
                    <input
                      type="text"
                      value={formData.veterinarian.address}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        veterinarian: { ...formData.veterinarian, address: e.target.value }
                      })}
                      className="w-full px-3 py-2.5 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm"
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gpt-text mb-2">
                      Notes
                    </label>
                    <textarea
                      value={formData.veterinarian.notes}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        veterinarian: { ...formData.veterinarian, notes: e.target.value }
                      })}
                      className="w-full px-3 py-2.5 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text font-medium text-sm"
                      placeholder="Special instructions, preferred appointment times, etc."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gpt-accent text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:bg-gpt-accent-hover transition-colors font-semibold text-base sm:text-lg"
                >
                  {editingPet ? 'Update Pet' : 'Add Pet'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gpt-light text-gpt-text py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:bg-gpt-lighter transition-colors font-semibold text-base sm:text-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export { PetManagement };