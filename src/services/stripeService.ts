import { loadStripe, Stripe } from '@stripe/stripe-js';

// Check if Stripe key is available
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey || stripeKey === 'your_stripe_publishable_key_here') {
  console.warn('Stripe publishable key not configured. Payment features will be disabled.');
}

// Initialize Stripe with your publishable key
const stripePromise = stripeKey && stripeKey !== 'your_stripe_publishable_key_here' 
  ? loadStripe(stripeKey)
  : Promise.resolve(null);

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  priceId: string;
  features: string[];
  popular?: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'DOGSWAB Basic Monthly',
    price: 9.99,
    priceId: 'REPLACE_WITH_BASIC_PRICE_ID',
    features: [
      '50 AI consultations/month',
      'Basic health tracking',
      'Photo symptom analysis',
      'Email support'
    ]
  },
  {
    id: 'premium',
    name: 'DOGSWAB Premium Monthly',
    price: 19.99,
    priceId: 'REPLACE_WITH_PREMIUM_PRICE_ID',
    popular: true,
    features: [
      'Unlimited AI consultations',
      'Advanced health analytics',
      'Vet booking marketplace',
      'Priority support',
      'Multi-pet management',
      'Predictive health alerts'
    ]
  },
  {
    id: 'pro',
    name: 'DOGSWAB Pro Monthly',
    price: 49.99,
    priceId: 'REPLACE_WITH_PRO_PRICE_ID',
    features: [
      'Everything in Premium',
      'Video vet consultations',
      '24/7 emergency hotline',
      'Family sharing (5 members)',
      'Custom health reports',
      'API access'
    ]
  }
];

// Create checkout session with real Stripe integration
export const createCheckoutSession = async (priceId: string, userId: string) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      console.warn('Stripe not available - using demo mode');
      // Return success for demo purposes
      return { success: true, demo: true };
    }

    console.log('Creating checkout session for price:', priceId);
    
    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      successUrl: `${window.location.origin}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}?canceled=true`,
      clientReferenceId: userId,
    });

    if (error) {
      console.error('Stripe checkout error:', error);
      throw error;
    }

    return { success: true };

  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const redirectToCheckout = async (sessionId: string) => {
  const stripe = await stripePromise;
  if (!stripe) {
    console.warn('Stripe not available for checkout redirect');
    return { error: { message: 'Payment system not configured' } };
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  return { error };
};

export const createPaymentIntent = async (amount: number, description: string) => {
  try {
    // Mock payment intent for vet bookings
    return {
      clientSecret: 'pi_test_' + Math.random().toString(36).substr(2, 9),
      paymentIntentId: 'pi_' + Math.random().toString(36).substr(2, 9),
      amount,
      description
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const confirmPayment = async (clientSecret: string, paymentMethod: any) => {
  const stripe = await stripePromise;
  if (!stripe) {
    console.warn('Stripe not available for payment confirmation');
    // Return mock success for demo
    return {
      paymentIntent: {
        status: 'succeeded',
        id: 'pi_demo_' + Math.random().toString(36).substr(2, 9),
        amount: 10000,
        description: 'Demo payment'
      },
      error: null
    };
  }

  // Mock successful payment for demo
  if (clientSecret.startsWith('pi_test_')) {
    return {
      paymentIntent: {
        status: 'succeeded',
        id: clientSecret.replace('pi_test_', 'pi_'),
        amount: 10000,
        description: 'Vet booking payment'
      },
      error: null
    };
  }

  return await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod
  });
};