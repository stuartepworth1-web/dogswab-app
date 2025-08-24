# DOGSWAB Pet Diagnostic App

A modern pet health consultation app powered by Anthropic Claude AI with professional veterinary marketplace and insurance integration.

## 🚀 Features

### **AI Health Consultations**
- Real-time AI-powered pet health analysis using Anthropic Claude
- Photo symptom analysis and diagnosis
- Emergency detection with immediate alerts
- Personalized recommendations based on pet profiles
- 24/7 availability for health questions

### **Professional Veterinary Network**
- Licensed veterinarian marketplace
- Video and in-person consultations
- Emergency and routine care booking
- House call services
- Direct vet-to-owner messaging
- 15% commission structure for vets

### **Comprehensive Health Management**
- Multi-pet profiles with detailed health tracking
- Vaccination and medication reminders
- Complete health history records
- Wellness score monitoring
- Symptom and behavior tracking
- Photo-based health records

### **Pet Insurance Integration**
- Compare quotes from top insurance providers
- Apply for coverage directly through the app
- Claims assistance and support
- Treatment cost estimation tools
- Coverage recommendations based on pet profile
- $50 referral commission per signup

### **Premium Subscription Tiers**
- **Free**: 5 AI consultations/month, basic profiles
- **Basic ($9.99/month)**: 50 consultations, photo analysis, email support
- **Premium ($19.99/month)**: Unlimited consultations, vet booking, priority support
- **Pro ($49.99/month)**: Everything + 24/7 emergency hotline, family sharing

## 🛠️ Setup Instructions

### 1. Environment Variables
Create a `.env` file in the project root:
```env
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

### 2. Get Your Anthropic API Key
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key (starts with `sk-ant-`)

### 3. Configure Stripe (Optional)
1. Visit [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your publishable key
3. Create subscription products (see STRIPE_SETUP.md)

### 4. Start the Application
```bash
npm install
npm run dev
```

## 📱 Mobile App Development

### Build for iOS/Android
```bash
# Build web app
npm run build

# Add mobile platforms
npx cap add ios
npx cap add android

# Sync and build
npm run build:mobile

# Open in native IDEs
npm run ios      # Opens Xcode
npm run android  # Opens Android Studio
```

## 🏗️ Architecture

### **Frontend Stack**
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Capacitor** for mobile deployment

### **AI Integration**
- **Anthropic Claude 3.5 Sonnet** for health consultations
- **Computer Vision API** for photo analysis
- **Natural Language Processing** for symptom categorization

### **Payment Processing**
- **Stripe** for subscription management
- **In-app purchases** for mobile platforms
- **Commission tracking** for marketplace revenue

### **Mobile Features**
- **Push notifications** for reminders
- **Camera integration** for photo diagnosis
- **Offline functionality** for viewing records
- **Native iOS/Android** app deployment

## 🔒 Security & Privacy

### **Data Protection**
- HIPAA-compliant data handling
- End-to-end encryption for health records
- Secure API communication over HTTPS
- Local storage encryption for sensitive data

### **Medical Compliance**
- Prominent medical disclaimers
- Emergency detection and routing
- Professional veterinary oversight
- Clear limitations of AI guidance

## 💰 Revenue Model

### **Subscription Revenue**
- Monthly recurring revenue from premium plans
- Freemium model with upgrade incentives
- Family sharing for Pro tier

### **Marketplace Commissions**
- 15% commission on veterinary bookings
- $50 referral bonus for insurance signups
- Revenue sharing with professional partners

## 🚀 Deployment

### **Web Deployment**
```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

### **Mobile App Stores**
1. **iOS**: Submit to Apple App Store via Xcode
2. **Android**: Submit to Google Play Store via Android Studio
3. **See**: APP_STORE_SUBMISSION.md for detailed guide

## 📊 Analytics & Monitoring

### **Key Metrics Tracked**
- User engagement and retention
- AI consultation accuracy
- Subscription conversion rates
- Veterinary booking success
- Revenue per user (ARPU)

## 🆘 Support & Documentation

- **Technical Issues**: Check TECHNICAL_REQUIREMENTS.md
- **App Store Submission**: See APP_STORE_SUBMISSION.md
- **Stripe Setup**: See STRIPE_SETUP.md
- **Mobile Development**: See IONIC_APPFLOW_SETUP.md

## ⚕️ Important Medical Disclaimer

DOGSWAB provides general pet health information and guidance only. This app cannot replace professional veterinary examination, diagnosis, or treatment. Always consult with a licensed veterinarian for medical decisions about your pet's health. In emergency situations, contact your veterinarian or emergency animal hospital immediately.

## 📄 License

This project is proprietary software. All rights reserved.

---

**DOGSWAB - Revolutionizing Pet Healthcare with AI** 🐾✨