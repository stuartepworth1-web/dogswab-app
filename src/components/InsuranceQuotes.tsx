import React, { useState, useEffect } from 'react';
import { X, Shield, Star, Check, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { Pet } from '../types';
import { InsuranceQuote, getInsuranceQuotes, submitInsuranceApplication, getPersonalizedRecommendations } from '../services/insuranceService';

interface InsuranceQuotesProps {
  pet: Pet;
  isOpen: boolean;
  onClose: () => void;
  onApplicationSubmit: (commission: number) => void;
}

const InsuranceQuotes: React.FC<InsuranceQuotesProps> = ({
  pet,
  isOpen,
  onClose,
  onApplicationSubmit
}) => {
  const [quotes, setQuotes] = useState<InsuranceQuote[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<InsuranceQuote | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [applicationData, setApplicationData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    if (isOpen) {
      loadQuotes();
      loadRecommendations();
    }
  }, [isOpen, pet.id]);

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const quotesData = await getInsuranceQuotes(pet);
      setQuotes(quotesData);
    } catch (error) {
      console.error('Error loading quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecommendations = async () => {
    try {
      const recs = await getPersonalizedRecommendations(pet);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    }
  };

  const handleApplyForInsurance = (quote: InsuranceQuote) => {
    setSelectedQuote(quote);
    setShowApplication(true);
  };

  const handleSubmitApplication = async () => {
    if (!selectedQuote) return;

    try {
      const result = await submitInsuranceApplication(
        selectedQuote.providerId,
        pet.id,
        applicationData
      );

      if (result.success && result.commission) {
        onApplicationSubmit(result.commission);
        alert(`Application submitted successfully! Commission earned: $${result.commission}`);
        onClose();
      }
    } catch (error) {
      alert('Application submission failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (showApplication && selectedQuote) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-gpt-darker rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gpt-border">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gpt-text">Insurance Application</h2>
                <p className="text-gpt-text-secondary">{selectedQuote.providerName} - {selectedQuote.planName}</p>
              </div>
              <button
                onClick={() => setShowApplication(false)}
                className="p-2 hover:bg-gpt-light rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gpt-text" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-gpt-light rounded-lg p-4">
              <h3 className="font-semibold text-gpt-text mb-2">Selected Plan Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gpt-text-secondary">Monthly Premium:</span>
                  <span className="text-gpt-text font-semibold ml-2">{formatCurrency(selectedQuote.monthlyPremium)}</span>
                </div>
                <div>
                  <span className="text-gpt-text-secondary">Annual Deductible:</span>
                  <span className="text-gpt-text font-semibold ml-2">{formatCurrency(selectedQuote.annualDeductible)}</span>
                </div>
                <div>
                  <span className="text-gpt-text-secondary">Reimbursement:</span>
                  <span className="text-gpt-text font-semibold ml-2">{selectedQuote.reimbursementRate}%</span>
                </div>
                <div>
                  <span className="text-gpt-text-secondary">Annual Limit:</span>
                  <span className="text-gpt-text font-semibold ml-2">
                    {selectedQuote.annualLimit === -1 ? 'Unlimited' : formatCurrency(selectedQuote.annualLimit)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gpt-text mb-2">Full Name *</label>
                <input
                  type="text"
                  value={applicationData.ownerName}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, ownerName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gpt-text mb-2">Email *</label>
                <input
                  type="email"
                  value={applicationData.email}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gpt-text mb-2">Phone Number *</label>
              <input
                type="tel"
                value={applicationData.phone}
                onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gpt-text mb-2">Address *</label>
              <input
                type="text"
                value={applicationData.address}
                onChange={(e) => setApplicationData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gpt-text mb-2">City *</label>
                <input
                  type="text"
                  value={applicationData.city}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gpt-text mb-2">State *</label>
                <input
                  type="text"
                  value={applicationData.state}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gpt-text mb-2">ZIP Code *</label>
                <input
                  type="text"
                  value={applicationData.zipCode}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, zipCode: e.target.value }))}
                  className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                  required
                />
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div className="text-sm text-green-800">
                  <p className="font-semibold">Referral Bonus</p>
                  <p>By applying through DOGSWAB, you help us earn a ${selectedQuote.referralCommission} referral commission at no extra cost to you!</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowApplication(false)}
                className="flex-1 bg-gpt-light text-gpt-text py-3 rounded-lg hover:bg-gpt-lighter transition-colors font-semibold"
              >
                Back to Quotes
              </button>
              <button
                onClick={handleSubmitApplication}
                className="flex-1 bg-gpt-accent text-white py-3 rounded-lg hover:bg-gpt-accent-hover transition-colors font-semibold"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-card backdrop-blur-xl bg-white/95 border border-white/20 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gpt-border">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-dogswab-navy">Pet Insurance Quotes</h2>
              <p className="text-dogswab-navy/70">Personalized insurance options for {pet.name}</p>
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
          {/* Personalized Recommendations */}
          {recommendations && (
            <div className="mb-6 bg-dogswab-mint/10 border border-dogswab-mint/30 rounded-2xl p-4">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-6 h-6 text-dogswab-mint mt-1" />
                <div>
                  <h3 className="font-semibold text-dogswab-navy mb-2">Personalized Recommendation</h3>
                  <p className="text-sm text-dogswab-navy/80 mb-2">{recommendations.reasoning}</p>
                  <p className="text-sm text-dogswab-navy/70">
                    <strong>Potential Annual Savings:</strong> ${recommendations.potentialSavings}
                  </p>
                  {recommendations.riskFactors.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-dogswab-navy/70 font-semibold">Risk Factors for {pet.name}:</p>
                      <ul className="text-xs text-dogswab-navy/70 list-disc list-inside">
                        {recommendations.riskFactors.map((factor: string, index: number) => (
                          <li key={index}>{factor}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dogswab-mint mx-auto mb-4"></div>
              <p className="text-dogswab-navy">Getting personalized quotes for {pet.name}...</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {quotes.map((quote) => (
                <div
                  key={quote.providerId}
                  className={`border-2 rounded-3xl p-6 transition-all ${
                    recommendations?.recommendedProvider === quote.providerName
                      ? 'border-dogswab-mint bg-dogswab-mint/10'
                      : 'border-dogswab-mint/30 bg-white/50 hover:border-dogswab-mint'
                  }`}
                >
                  {recommendations?.recommendedProvider === quote.providerName && (
                    <div className="mb-4">
                      <span className="bg-dogswab-mint text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ⭐ Recommended for {pet.name}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-dogswab-navy">{quote.providerName}</h3>
                      <p className="text-lg text-dogswab-navy/70">{quote.planName}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-dogswab-navy ml-1">{quote.rating}</span>
                        </div>
                        <span className="text-sm text-dogswab-navy/70">
                          ({quote.customerReviews.toLocaleString()} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-dogswab-mint">
                        {formatCurrency(quote.monthlyPremium)}
                      </div>
                      <div className="text-sm text-dogswab-navy/70">per month</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-dogswab-mint/10 rounded-2xl">
                      <div className="text-lg font-semibold text-dogswab-navy">
                        {formatCurrency(quote.annualDeductible)}
                      </div>
                      <div className="text-xs text-dogswab-navy/70">Annual Deductible</div>
                    </div>
                    <div className="text-center p-3 bg-dogswab-mint/10 rounded-2xl">
                      <div className="text-lg font-semibold text-dogswab-navy">
                        {quote.reimbursementRate}%
                      </div>
                      <div className="text-xs text-dogswab-navy/70">Reimbursement</div>
                    </div>
                    <div className="text-center p-3 bg-dogswab-mint/10 rounded-2xl">
                      <div className="text-lg font-semibold text-dogswab-navy">
                        {quote.annualLimit === -1 ? 'Unlimited' : formatCurrency(quote.annualLimit)}
                      </div>
                      <div className="text-xs text-dogswab-navy/70">Annual Limit</div>
                    </div>
                    <div className="text-center p-3 bg-dogswab-mint/10 rounded-2xl">
                      <div className="text-lg font-semibold text-green-600">
                        ${quote.referralCommission}
                      </div>
                      <div className="text-xs text-dogswab-navy/70">Our Commission</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-dogswab-navy mb-2">Coverage Highlights</h4>
                      <ul className="space-y-1">
                        {quote.coverageHighlights.map((highlight, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-dogswab-navy">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dogswab-navy mb-2">Waiting Periods</h4>
                      <div className="space-y-1 text-sm text-dogswab-navy">
                        <div>Accidents: {quote.waitingPeriods.accidents} days</div>
                        <div>Illnesses: {quote.waitingPeriods.illnesses} days</div>
                        <div>Pre-existing: {quote.waitingPeriods.preExisting ? 'Covered after waiting period' : 'Not covered'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-dogswab-navy/70">
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                      View full terms and exclusions before applying
                    </div>
                    <button
                      onClick={() => handleApplyForInsurance(quote)}
                      className="bg-dogswab-mint text-white px-6 py-3 rounded-2xl hover:bg-dogswab-mint-dark transition-colors font-semibold shadow-lg"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 text-center text-sm text-dogswab-navy/70">
            <Shield className="w-5 h-5 inline mr-2" />
            All quotes are estimates. Final pricing may vary based on underwriting review.
          </div>
        </div>
      </div>
    </div>
  );
};

export { InsuranceQuotes };