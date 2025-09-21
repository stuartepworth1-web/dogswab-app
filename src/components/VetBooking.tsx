import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, Video, Phone, X, CreditCard, Shield } from 'lucide-react';
import { Veterinarian, VetAppointment, Pet } from '../types';
import { createPaymentIntent, confirmPayment } from '../services/stripeService';
import { bookAppointment } from '../services/vetService';

interface VetBookingProps {
  pet: Pet;
  onClose: () => void;
  onBookAppointment: (appointment: Omit<VetAppointment, 'id'>) => void;
}

const VetBooking: React.FC<VetBookingProps> = ({ pet, onClose, onBookAppointment }) => {
  const [selectedVet, setSelectedVet] = useState<Veterinarian | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<'consultation' | 'emergency' | 'checkup'>('consultation');
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  // Mock veterinarians data
  const veterinarians: Veterinarian[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      clinic: 'PetCare Veterinary Hospital',
      specialties: ['General Practice', 'Surgery', 'Dermatology'],
      rating: 4.9,
      priceRange: '$80-120',
      availability: [],
      isOnline: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      clinic: 'Animal Wellness Center',
      specialties: ['Internal Medicine', 'Cardiology'],
      rating: 4.8,
      priceRange: '$90-150',
      availability: [],
      isOnline: true
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      clinic: 'Emergency Pet Clinic',
      specialties: ['Emergency Care', 'Critical Care'],
      rating: 4.7,
      priceRange: '$120-200',
      availability: [],
      isOnline: false
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleBooking = async () => {
    if (!selectedVet || !selectedDate || !selectedTime) return;

    setShowPayment(true);
  };

  const handlePayment = async () => {
    if (!selectedVet) return;

    setIsProcessingPayment(true);
    try {
      const price = appointmentType === 'emergency' ? selectedVet.emergencyFee : selectedVet.consultationFee;
      const commission = price * 0.15; // 15% commission
      const vetPayout = price - commission;

      // Create payment intent
      const paymentIntent = await createPaymentIntent(
        price * 100, // Convert to cents
        `Vet appointment for ${pet.name} with ${selectedVet.name}`
      );

      // Confirm payment (mock)
      const paymentResult = await confirmPayment(paymentIntent.clientSecret, paymentMethod);

      if (paymentResult.paymentIntent?.status === 'succeeded') {
        // Book the appointment
        const appointment: Omit<VetAppointment, 'id'> = {
          petId: pet.id,
          vetId: selectedVet.id,
          type: appointmentType,
          scheduledAt: new Date(`${selectedDate} ${selectedTime}`),
          duration: 30,
          price,
          status: 'scheduled',
          notes: `Appointment for ${pet.name} (${pet.type})`
        };

        const bookingResult = await bookAppointment(appointment);
        
        if (bookingResult.success) {
          alert(`🎉 Payment successful! 
          
Appointment Details:
• Pet: ${pet.name}
• Vet: ${selectedVet.name}
• Date: ${selectedDate} at ${selectedTime}
• Total: $${price}
• Commission earned: $${commission.toFixed(2)}
• Vet payout: $${vetPayout.toFixed(2)}

Confirmation ID: ${bookingResult.appointmentId}`);
          
          onBookAppointment(appointment);
          onClose();
        }
      }
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const getAppointmentPrice = () => {
    if (!selectedVet) return 0;
    return appointmentType === 'emergency' ? selectedVet.emergencyFee : selectedVet.consultationFee;
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-dogswab-mint/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-dogswab-mint/20 bg-gradient-to-r from-dogswab-mint/20 to-dogswab-mint/10 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-dogswab-navy">Book Veterinary Appointment</h2>
              <p className="text-dogswab-navy/70">Schedule care for {pet.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-dogswab-mint/20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-dogswab-navy" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Appointment Type */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-dogswab-navy mb-3">Appointment Type</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'consultation', label: 'Consultation', icon: <Phone className="w-5 h-5" /> },
                { id: 'checkup', label: 'Checkup', icon: <Calendar className="w-5 h-5" /> },
                { id: 'emergency', label: 'Emergency', icon: <Video className="w-5 h-5" /> }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setAppointmentType(type.id as any)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    appointmentType === type.id
                      ? 'border-dogswab-mint bg-dogswab-mint/10'
                      : 'border-dogswab-mint/30 bg-dogswab-mint/5 hover:border-dogswab-mint'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    {type.icon}
                  </div>
                  <div className="text-sm font-semibold text-dogswab-navy">{type.label}</div>
                  <div className="text-xs text-dogswab-navy/60">
                    ${type.id === 'emergency' ? '150-200' : type.id === 'consultation' ? '100-120' : '80-100'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Veterinarian Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-dogswab-navy mb-3">Choose Veterinarian</h3>
            <div className="space-y-4">
              {veterinarians.map((vet) => (
                <div
                  key={vet.id}
                  onClick={() => setSelectedVet(vet)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedVet?.id === vet.id
                      ? 'border-dogswab-mint bg-dogswab-mint/10'
                      : 'border-dogswab-mint/30 bg-dogswab-mint/5 hover:border-dogswab-mint'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-dogswab-navy">{vet.name}</h4>
                        {vet.isOnline && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Online
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-dogswab-navy/70 mb-2">{vet.clinic}</p>
                      <div className="flex items-center space-x-4 text-sm text-dogswab-navy/70">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{vet.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            ${appointmentType === 'emergency' ? vet.emergencyFee : vet.consultationFee}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {vet.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="bg-dogswab-mint/20 text-dogswab-mint text-xs px-2 py-1 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          {selectedVet && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-dogswab-navy mb-3">Select Date</h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-dogswab-mint/30 rounded-2xl focus:ring-2 focus:ring-dogswab-mint focus:border-transparent bg-white text-dogswab-navy"
              />
            </div>
          )}

          {/* Time Selection */}
          {selectedVet && selectedDate && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-dogswab-navy mb-3">Select Time</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedTime === time
                        ? 'border-dogswab-mint bg-dogswab-mint text-white'
                        : 'border-dogswab-mint/30 bg-dogswab-mint/5 text-dogswab-navy hover:border-dogswab-mint'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Booking Summary */}
          {selectedVet && selectedDate && selectedTime && (
            <div className="bg-dogswab-mint/10 border border-dogswab-mint/30 rounded-2xl p-4 mb-6">
              <h3 className="font-semibold text-dogswab-navy mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dogswab-navy/70">Pet:</span>
                  <span className="text-dogswab-navy font-medium">{pet.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dogswab-navy/70">Veterinarian:</span>
                  <span className="text-dogswab-navy font-medium">{selectedVet.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dogswab-navy/70">Date & Time:</span>
                  <span className="text-dogswab-navy font-medium">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dogswab-navy/70">Type:</span>
                  <span className="text-dogswab-navy font-medium capitalize">{appointmentType}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-dogswab-navy">Total Cost:</span>
                  <span className="text-dogswab-mint">${getAppointmentPrice()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dogswab-navy/70">Platform Commission (15%):</span>
                  <span className="text-dogswab-navy/70">${(getAppointmentPrice() * 0.15).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dogswab-navy/70">Vet Payout (85%):</span>
                  <p>Your payment is processed securely through Stripe. We never store your card details. DOGSWAB earns a 15% commission on bookings.</p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Section */}
          {showPayment && selectedVet && selectedDate && selectedTime ? (
            <div className="space-y-6">
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-lg font-semibold text-dogswab-navy mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-dogswab-navy mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={paymentMethod.name}
                      onChange={(e) => setPaymentMethod(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-dogswab-mint/30 rounded-2xl focus:ring-2 focus:ring-dogswab-mint focus:border-transparent bg-white text-dogswab-navy"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-dogswab-navy mb-2">Card Number</label>
                    <input
                      type="text"
                      value={paymentMethod.cardNumber}
                      onChange={(e) => setPaymentMethod(prev => ({ ...prev, cardNumber: e.target.value }))}
                      className="w-full px-4 py-3 border border-dogswab-mint/30 rounded-2xl focus:ring-2 focus:ring-dogswab-mint focus:border-transparent bg-white text-dogswab-navy"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dogswab-navy mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={paymentMethod.expiryDate}
                      onChange={(e) => setPaymentMethod(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-dogswab-mint/30 rounded-2xl focus:ring-2 focus:ring-dogswab-mint focus:border-transparent bg-white text-dogswab-navy"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dogswab-navy mb-2">CVV</label>
                    <input
                      type="text"
                      value={paymentMethod.cvv}
                      onChange={(e) => setPaymentMethod(prev => ({ ...prev, cvv: e.target.value }))}
                      className="w-full px-4 py-3 border border-dogswab-mint/30 rounded-2xl focus:ring-2 focus:ring-dogswab-mint focus:border-transparent bg-white text-dogswab-navy"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div className="text-sm text-green-800">
                      <p className="font-semibold">Secure Payment</p>
                      <p>Your payment is processed securely through Stripe. We never store your card details.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 bg-dogswab-mint/10 text-dogswab-navy py-3 rounded-2xl hover:bg-dogswab-mint/20 transition-colors font-semibold border border-dogswab-mint/30"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isProcessingPayment || !paymentMethod.name || !paymentMethod.cardNumber}
                  className="flex-1 bg-dogswab-mint text-white py-3 rounded-2xl hover:bg-dogswab-mint-dark disabled:opacity-50 transition-colors font-semibold flex items-center justify-center shadow-lg"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    `Pay $${getAppointmentPrice()}`
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Action Buttons */
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 bg-dogswab-mint/10 text-dogswab-navy py-3 rounded-2xl hover:bg-dogswab-mint/20 transition-colors font-semibold border border-dogswab-mint/30"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={!selectedVet || !selectedDate || !selectedTime}
                className="flex-1 bg-dogswab-mint text-white py-3 rounded-2xl hover:bg-dogswab-mint-dark disabled:opacity-50 transition-colors font-semibold shadow-lg"
              >
                Continue to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { VetBooking };