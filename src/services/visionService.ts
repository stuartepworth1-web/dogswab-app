// Mock Computer Vision Service for Pet Health Analysis
export interface HealthAnalysis {
  condition: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  recommendations: string[];
  vetRequired: boolean;
  description: string;
}

export interface VisionAnalysisResult {
  analysis: HealthAnalysis;
  detectedIssues: string[];
  overallAssessment: string;
}

// Mock conditions database
const mockConditions = [
  {
    condition: 'Skin Irritation',
    confidence: 0.85,
    severity: 'medium' as const,
    recommendations: [
      'Keep the affected area clean and dry',
      'Prevent scratching with an E-collar if needed',
      'Apply cool compress for 10-15 minutes',
      'Monitor for changes in size or appearance'
    ],
    vetRequired: true,
    description: 'Visible redness and inflammation suggesting allergic reaction or contact dermatitis'
  },
  {
    condition: 'Eye Discharge',
    confidence: 0.92,
    severity: 'medium' as const,
    recommendations: [
      'Gently clean around the eye with warm water',
      'Avoid touching the eye directly',
      'Monitor for increased discharge or pain',
      'Keep pet from rubbing the eye'
    ],
    vetRequired: true,
    description: 'Abnormal discharge from eye area, possibly indicating infection or irritation'
  },
  {
    condition: 'Minor Wound',
    confidence: 0.78,
    severity: 'low' as const,
    recommendations: [
      'Clean gently with saline solution',
      'Apply antibiotic ointment if available',
      'Keep wound covered and dry',
      'Monitor for signs of infection'
    ],
    vetRequired: false,
    description: 'Small superficial wound that appears to be healing normally'
  },
  {
    condition: 'Severe Laceration',
    confidence: 0.95,
    severity: 'emergency' as const,
    recommendations: [
      'Apply direct pressure to control bleeding',
      'Do not remove any embedded objects',
      'Keep pet calm and still',
      'Seek immediate veterinary care'
    ],
    vetRequired: true,
    description: 'Deep wound requiring immediate professional medical attention'
  }
];

export const analyzeHealthPhoto = async (imageBase64: string, petName?: string): Promise<VisionAnalysisResult> => {
  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

  // Mock analysis - in production this would call Google Cloud Vision or similar
  const randomCondition = mockConditions[Math.floor(Math.random() * mockConditions.length)];
  
  const detectedIssues = [
    'Visible inflammation in affected area',
    'Color changes in surrounding tissue',
    'Possible signs of discomfort'
  ];

  const overallAssessment = generateOverallAssessment(randomCondition, petName);

  return {
    analysis: randomCondition,
    detectedIssues,
    overallAssessment
  };
};

const generateOverallAssessment = (condition: HealthAnalysis, petName?: string): string => {
  const petRef = petName ? petName : 'your pet';
  
  let assessment = `Based on the uploaded photo, I can see signs consistent with ${condition.condition.toLowerCase()} in ${petRef}. `;
  
  assessment += `${condition.description}. `;
  
  if (condition.severity === 'emergency') {
    assessment += `🚨 This appears to be an emergency situation requiring immediate veterinary attention. `;
  } else if (condition.severity === 'high') {
    assessment += `⚠️ This condition requires prompt veterinary care within 24 hours. `;
  } else if (condition.severity === 'medium') {
    assessment += `This condition should be evaluated by a veterinarian within 2-3 days. `;
  } else {
    assessment += `This appears to be a minor issue that can be monitored at home. `;
  }
  
  assessment += `My confidence in this assessment is ${Math.round(condition.confidence * 100)}%. `;
  
  assessment += `Please note that this AI analysis is for informational purposes only and cannot replace professional veterinary examination.`;
  
  return assessment;
};

// Mock function to simulate training data collection
export const submitTrainingData = async (imageBase64: string, actualDiagnosis: string, vetConfirmed: boolean) => {
  // In production, this would help improve the AI model
  console.log('Training data submitted:', { actualDiagnosis, vetConfirmed });
  return { success: true, message: 'Thank you for helping improve our AI accuracy!' };
};

// Mock function for batch analysis
export const analyzeBatchPhotos = async (images: string[]): Promise<VisionAnalysisResult[]> => {
  const results = [];
  for (const image of images) {
    const result = await analyzeHealthPhoto(image);
    results.push(result);
  }
  return results;
};