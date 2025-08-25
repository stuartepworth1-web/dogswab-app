import Anthropic from '@anthropic-ai/sdk';
import { Message } from '../types';

// Initialize Anthropic client
let anthropic: Anthropic | null = null;

const initializeAnthropic = () => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  if (!anthropic && apiKey && apiKey !== 'your_anthropic_api_key_here' && apiKey.trim() !== '') {
    try {
      anthropic = new Anthropic({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });
      console.log('Anthropic client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Anthropic client:', error);
      anthropic = null;
    }
  }
  return anthropic;
};

// System prompt for Claude to act as a veterinary assistant
const SYSTEM_PROMPT = `You are a helpful veterinary assistant AI for DOGSWAB, a pet health consultation app. You provide direct, actionable guidance about pet health, behavior, and care.

IMPORTANT GUIDELINES:
- Always emphasize that you cannot replace professional veterinary care
- For emergencies or serious symptoms, immediately recommend contacting a veterinarian
- Provide direct, helpful answers based on the information available
- Be empathetic and understanding about pet owner concerns
- Use clear, accessible language
- When discussing specific pets, personalize responses with their name when provided
- CRITICAL: Provide immediate helpful advice based on available information. Only ask 1-2 essential clarifying questions if absolutely necessary for safety
- Give practical, actionable recommendations first, then mention what additional information might be helpful
- Structure responses as: Direct advice → Explanation → When to see a vet → Optional follow-up questions

EMERGENCY INDICATORS: If you detect any of these, immediately recommend emergency veterinary care:
- Difficulty breathing, choking, or unconsciousness
- Severe bleeding or trauma
- Suspected poisoning
- Seizures
- Severe pain or distress
- Any life-threatening symptoms

Always end emergency responses with urgent care recommendations.

Remember: Pet owners want helpful answers, not endless questions. Provide value immediately while being appropriately cautious about medical advice.`;

export const generateAIResponse = async (
  message: string,
  category: string = 'general',
  petName?: string,
  pet?: any
): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    console.log('API Key check:', apiKey ? `Present (${apiKey.substring(0, 10)}...)` : 'Missing');
    console.log('generateAIResponse called with:', { message, category, petName, pet: pet?.name });
    
    // Check if API key is configured
    if (!apiKey || apiKey === 'your_anthropic_api_key_here' || apiKey.trim() === '') {
      console.log('API key not configured, returning mock response');
      
      // Generate contextual mock response
      const petRef = petName || 'your pet';
      let mockResponse = `Thank you for your question about ${petRef}. `;
      
      if (category === 'emergency') {
        mockResponse = `🚨 **EMERGENCY DETECTED** - This appears to be an urgent situation!\n\n**IMMEDIATE ACTIONS:**\n• Contact your veterinarian RIGHT NOW\n• If after hours, call emergency animal hospital\n• Keep ${petRef} calm and still\n• Do not give human medications\n• Monitor breathing and consciousness\n\n**Emergency Hotline:** Call your vet immediately!\n\n⚠️ This is a demo response. Configure your Anthropic API key for real emergency analysis.`;
      } else if (category === 'symptoms') {
        mockResponse = `I understand you're concerned about ${petRef}'s symptoms. Here's what I recommend:\n\n**IMMEDIATE CARE:**\n• Monitor ${petRef} closely for changes\n• Keep them comfortable and hydrated\n• Document symptoms (photos, notes)\n• Check temperature if possible\n\n**WHEN TO CALL VET:**\n• Symptoms worsen or persist\n• Loss of appetite for 24+ hours\n• Lethargy or unusual behavior\n• Any concerning changes\n\n**NEXT STEPS:**\n• Continue monitoring\n• Consider vet consultation if no improvement\n\n⚠️ Demo response - Configure Anthropic API key for personalized analysis.`;
      } else if (category === 'behavior') {
        mockResponse = `Regarding ${petRef}'s behavior, here are some insights:\n\n**BEHAVIORAL GUIDANCE:**\n• Sudden changes may indicate health issues\n• Maintain consistent routines\n• Use positive reinforcement training\n• Consider environmental stressors\n\n**COMMON CAUSES:**\n• Medical conditions\n• Anxiety or stress\n• Changes in environment\n• Need for more exercise/stimulation\n\n**RECOMMENDATIONS:**\n• Monitor for patterns\n• Ensure adequate exercise\n• Consider professional training if needed\n\n⚠️ Demo response - Configure API key for detailed behavioral analysis.`;
      } else if (category === 'nutrition') {
        mockResponse = `For ${petRef}'s nutrition concerns:\n\n**FEEDING GUIDELINES:**\n• Maintain consistent feeding schedule\n• Fresh water always available\n• Age-appropriate, high-quality food\n• Monitor portion sizes\n\n**DIETARY TIPS:**\n• Introduce new foods gradually\n• Avoid human food toxins\n• Consider life stage needs\n• Watch for food allergies\n\n**WHEN TO CONSULT VET:**\n• Sudden appetite changes\n• Digestive issues\n• Weight gain/loss\n\n⚠️ Demo response - Configure API key for personalized nutrition advice.`;
      } else {
        mockResponse = `Thank you for your question about ${petRef}. Here's some general guidance:\n\n**GENERAL PET CARE:**\n• Regular veterinary checkups\n• Balanced diet and exercise\n• Monitor behavior and appetite\n• Keep vaccinations current\n• Provide safe, comfortable environment\n\n**HEALTH MONITORING:**\n• Watch for changes in eating/drinking\n• Note energy level changes\n• Track bathroom habits\n• Monitor social behavior\n\n**PREVENTIVE CARE:**\n• Annual vet visits\n• Dental care\n• Parasite prevention\n• Weight management\n\n⚠️ Demo response - Configure Anthropic API key for AI-powered analysis.`;
      }
      
      return mockResponse;
    }

    const client = initializeAnthropic();
    if (!client) {
      console.log('Failed to initialize client');
      return "❌ Failed to initialize AI client. Please check your API key configuration in the .env file.";
    }

    // Prepare the user message with context
    let contextualMessage = message;
    
    // Add detailed pet context if available
    if (pet) {
      console.log('Adding pet context for:', pet.name);
      const petContext = `
Pet Profile:
- Name: ${pet.name}
- Type: ${pet.type}
- Breed: ${pet.breed || 'Mixed/Unknown'}
- Age: ${pet.age} years old
- Weight: ${pet.weight ? `${pet.weight} lbs` : 'Not specified'}
- Gender: ${pet.gender}
- Spayed/Neutered: ${pet.isNeutered ? 'Yes' : 'No'}
${pet.medicalHistory ? `- Medical History: ${pet.medicalHistory}` : ''}

User question about ${pet.name}: ${message}`;
      contextualMessage = petContext;
    } else if (petName) {
      console.log('Adding pet name context for:', petName);
      contextualMessage = `Regarding my pet ${petName}: ${message}`;
    }

    // Add category context
    const categoryContext = getCategoryContext(category);
    if (categoryContext) {
      contextualMessage = `${categoryContext}\n\nUser question: ${contextualMessage}`;
    }

    console.log('Final contextual message length:', contextualMessage.length);
    console.log('Sending request to Claude...');
    
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: contextualMessage
        }
      ]
    });

    console.log('Received response from Claude');
    console.log('Response content:', response.content);
    
    // Extract text from Claude's response
    const textContent = response.content.find(content => content.type === 'text');
    const responseText = textContent?.text || 'I apologize, but I encountered an issue generating a response. Please try again.';
    
    console.log('Response text length:', responseText.length);
    console.log('Final response text:', responseText.substring(0, 200) + '...');
    return responseText;

  } catch (error) {
    console.error('Detailed error calling Anthropic API:', error);
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    
    // Provide helpful error messages
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      if (error.message.includes('401')) {
        return "❌ Invalid API key. Please check your Anthropic API key in the .env file.";
      } else if (error.message.includes('429')) {
        return "⏳ Rate limit exceeded. Please wait a moment before asking another question.";
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        return "🌐 Network error. Please check your internet connection and try again.";
      } else if (error.message.includes('CORS')) {
        return "🔒 CORS error. The API key might be invalid or there's a browser security issue.";
      }
    }
    
    return `❌ I'm experiencing technical difficulties: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again in a moment.`;
  }
};

const getCategoryContext = (category: string): string => {
  switch (category) {
    case 'emergency':
      return "URGENT: This appears to be an emergency situation. Please prioritize immediate veterinary care recommendations.";
    case 'symptoms':
      return "The user is asking about pet symptoms. Provide helpful guidance while emphasizing the importance of professional veterinary evaluation for proper diagnosis.";
    case 'behavior':
      return "This is a behavioral question. Provide practical advice about pet behavior while considering both training and potential underlying health issues.";
    case 'nutrition':
      return "This is a nutrition-related question. Provide helpful dietary guidance while noting that nutritional needs vary by pet and health status.";
    default:
      return "";
  }
};

export const categorizeMessage = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Emergency keywords - highest priority
  const emergencyKeywords = [
    'emergency', 'urgent', 'bleeding', 'poisoned', 'poison', 'toxic',
    'can\'t breathe', 'cannot breathe', 'unconscious', 'seizure', 'seizing',
    'choking', 'collapsed', 'severe pain', 'hit by car', 'trauma',
    'overdose', 'swallowed', 'ate chocolate', 'ate grapes', 'ate onion'
  ];
  
  if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'emergency';
  }
  
  // Symptom keywords
  const symptomKeywords = [
    'symptom', 'sick', 'ill', 'vomit', 'vomiting', 'diarrhea', 'fever',
    'pain', 'hurt', 'limping', 'cough', 'coughing', 'sneezing',
    'lethargic', 'tired', 'weakness', 'loss of appetite', 'not eating',
    'drinking too much', 'urinating', 'blood', 'discharge', 'swollen',
    'rash', 'itching', 'scratching', 'shaking', 'trembling'
  ];
  
  if (symptomKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'symptoms';
  }
  
  // Behavior keywords
  const behaviorKeywords = [
    'behavior', 'behaviour', 'aggressive', 'aggression', 'anxious', 'anxiety',
    'barking', 'howling', 'destructive', 'training', 'obedience',
    'biting', 'nipping', 'jumping', 'pulling', 'fearful', 'scared',
    'hyperactive', 'calm', 'socialization', 'territorial'
  ];
  
  if (behaviorKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'behavior';
  }
  
  // Nutrition keywords
  const nutritionKeywords = [
    'food', 'eat', 'eating', 'diet', 'nutrition', 'nutritional',
    'weight', 'overweight', 'underweight', 'feeding', 'meal',
    'treats', 'snacks', 'hungry', 'appetite', 'kibble', 'wet food',
    'raw diet', 'grain free', 'allergies', 'sensitive stomach'
  ];
  
  if (nutritionKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'nutrition';
  }
  
  return 'general';
};