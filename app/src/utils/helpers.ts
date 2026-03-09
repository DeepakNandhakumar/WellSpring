// BMI Calculator
export const calculateBMI = (weight: number, height: number): { bmi: number; category: string; color: string } => {
  // Height should be in meters
  const bmi = weight / (height * height);
  const roundedBMI = Math.round(bmi * 10) / 10;
  
  let category = '';
  let color = '';
  
  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'bg-blue-500';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal Weight';
    color = 'bg-green-500';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    color = 'bg-yellow-500';
  } else {
    category = 'Obese';
    color = 'bg-red-500';
  }
  
  return { bmi: roundedBMI, category, color };
};

// Sleep Quality Checker
export const checkSleepQuality = (hours: number): { quality: string; message: string; color: string } => {
  let quality = '';
  let message = '';
  let color = '';
  
  if (hours < 5) {
    quality = 'Poor';
    message = 'You are getting insufficient sleep. This can lead to serious health issues including weakened immunity, cognitive impairment, and increased risk of chronic diseases. Aim for 7-9 hours of sleep.';
    color = 'text-red-500';
  } else if (hours >= 5 && hours < 7) {
    quality = 'Fair';
    message = 'Your sleep duration is below the recommended range. While you may function, you are not getting optimal rest. Try to increase your sleep by 1-2 hours for better health.';
    color = 'text-yellow-500';
  } else if (hours >= 7 && hours <= 9) {
    quality = 'Excellent';
    message = 'Great job! You are getting the optimal amount of sleep. This supports your physical health, mental clarity, emotional well-being, and immune function.';
    color = 'text-green-500';
  } else if (hours > 9 && hours <= 11) {
    quality = 'Good';
    message = 'You are getting more sleep than average. While extra sleep can be beneficial during illness or high stress, consistently sleeping more than 9 hours may indicate other health issues.';
    color = 'text-blue-500';
  } else {
    quality = 'Excessive';
    message = 'You are sleeping excessively. This could be a sign of underlying health conditions like depression, sleep apnea, or other medical issues. Consider consulting a healthcare provider.';
    color = 'text-purple-500';
  }
  
  return { quality, message, color };
};

// Water Intake Calculator
export const calculateWaterIntake = (weight: number, activityLevel: string): number => {
  // Base calculation: 35ml per kg of body weight
  let baseIntake = weight * 35;
  
  // Adjust based on activity level
  switch (activityLevel) {
    case 'sedentary':
      baseIntake *= 1;
      break;
    case 'light':
      baseIntake *= 1.1;
      break;
    case 'moderate':
      baseIntake *= 1.2;
      break;
    case 'active':
      baseIntake *= 1.3;
      break;
    case 'very-active':
      baseIntake *= 1.5;
      break;
    default:
      baseIntake *= 1;
  }
  
  // Convert to liters and round
  return Math.round(baseIntake / 1000 * 10) / 10;
};

// Format Date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format DateTime
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Truncate Text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Validate Email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate Password
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// Debounce Function
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Scroll to Top
export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// Local Storage Helpers for Todo
export const getTodos = (): any[] => {
  const todos = localStorage.getItem('wellspring_todos');
  return todos ? JSON.parse(todos) : [];
};

export const saveTodos = (todos: any[]): void => {
  localStorage.setItem('wellspring_todos', JSON.stringify(todos));
};

// Symptom Checker Keywords
export const symptomKeywords: Record<string, string[]> = {
  diabetes: ['thirsty', 'urination', 'hunger', 'weight loss', 'fatigue', 'blurred vision', 'sugar', 'blood sugar'],
  hypertension: ['headache', 'dizziness', 'chest pain', 'shortness of breath', 'nosebleed', 'high blood pressure'],
  'heart disease': ['chest pain', 'shortness of breath', 'fatigue', 'irregular heartbeat', 'swelling', 'heart'],
  asthma: ['wheezing', 'coughing', 'shortness of breath', 'chest tightness', 'breathing difficulty'],
  arthritis: ['joint pain', 'stiffness', 'swelling', 'redness', 'joints', 'arthritis'],
  obesity: ['overweight', 'weight gain', 'obesity', 'excess fat', 'body fat'],
  'stress anxiety': ['stress', 'anxiety', 'worry', 'nervous', 'tension', 'panic', 'depression'],
  insomnia: ['insomnia', 'sleep', 'cannot sleep', 'sleepless', 'wake up', 'tired'],
  'digestive disorders': ['stomach pain', 'bloating', 'constipation', 'diarrhea', 'nausea', 'indigestion'],
  'cold flu': ['fever', 'cough', 'cold', 'sore throat', 'runny nose', 'flu', 'sneezing'],
};

// AI Symptom Checker
export const checkSymptoms = (input: string): { disease: string; confidence: number }[] => {
  const lowerInput = input.toLowerCase();
  const results: { disease: string; confidence: number }[] = [];
  
  for (const [disease, keywords] of Object.entries(symptomKeywords)) {
    let matchCount = 0;
    keywords.forEach(keyword => {
      if (lowerInput.includes(keyword)) {
        matchCount++;
      }
    });
    
    if (matchCount > 0) {
      const confidence = Math.min((matchCount / keywords.length) * 100, 100);
      results.push({ disease, confidence: Math.round(confidence) });
    }
  }
  
  // Sort by confidence descending
  return results.sort((a, b) => b.confidence - a.confidence);
};

// Yoga Categories
export const yogaCategories = [
  { id: 'diabetes', name: 'Diabetes Management', icon: 'Activity' },
  { id: 'weight-loss', name: 'Weight Loss', icon: 'Flame' },
  { id: 'stress-relief', name: 'Stress Relief', icon: 'Heart' },
  { id: 'fitness', name: 'General Fitness', icon: 'Dumbbell' },
  { id: 'respiratory', name: 'Respiratory Health', icon: 'Wind' },
  { id: 'digestion', name: 'Digestive Health', icon: 'Utensils' },
];

// Yoga Poses Data
export const yogaPoses: Record<string, any[]> = {
  diabetes: [
    { name: 'Vajrasana (Thunderbolt Pose)', duration: '5-10 mins', difficulty: 'Easy', description: 'Sit on your heels with back straight. Improves digestion and regulates blood sugar.', videoId: 'lDHE0Tvoyyo' },
    { name: 'Paschimottanasana (Seated Forward Bend)', duration: '30-60 secs', difficulty: 'Medium', description: 'Forward bend while seated. Stimulates pancreas and reduces abdominal fat.', videoId: 'E5FtZEVC424' },
    { name: 'Ardha Matsyendrasana (Half Spinal Twist)', duration: '30-60 secs each side', difficulty: 'Medium', description: 'Twisting pose that massages abdominal organs and improves digestion.', videoId: 'wJpyMgbxytU' },
    { name: 'Dhanurasana (Bow Pose)', duration: '20-30 secs', difficulty: 'Hard', description: 'Backbend that strengthens pancreas and improves insulin production.', videoId: 'xm00XMmBbto' },
    { name: 'Surya Namaskar (Sun Salutation)', duration: '10-15 mins', difficulty: 'Medium', description: 'Complete body workout that improves circulation and metabolism.', videoId: '1xRX1MuoImw' },
  ],
  'weight-loss': [
    { name: 'Surya Namaskar (Sun Salutation)', duration: '15-20 mins', difficulty: 'Medium', description: 'Dynamic sequence that burns calories and tones the entire body.', videoId: '1xRX1MuoImw' },
    { name: 'Warrior Pose (Virabhadrasana)', duration: '30-60 secs each side', difficulty: 'Medium', description: 'Strengthens legs, core, and arms while improving balance.', videoId: 'kkGY3xBnaGc' },
    { name: 'Boat Pose (Navasana)', duration: '20-45 secs', difficulty: 'Hard', description: 'Core strengthening pose that targets abdominal muscles.', videoId: 'pZhqI4SUDmA' },
    { name: 'Plank Pose (Phalakasana)', duration: '30-60 secs', difficulty: 'Medium', description: 'Full body exercise that strengthens core, arms, and legs.', videoId: 'LrqECYmDexQ' },
    { name: 'Chair Pose (Utkatasana)', duration: '30-45 secs', difficulty: 'Medium', description: 'Squat-like pose that strengthens thighs and tones glutes.', videoId: '4xyTmX_OMiM' },
  ],
  'stress-relief': [
    { name: 'Balasana (Child\'s Pose)', duration: '1-3 mins', difficulty: 'Easy', description: 'Resting pose that calms the mind and relieves stress.', videoId: '2MJGg-dUKh0' },
    { name: 'Sukhasana (Easy Pose) with Meditation', duration: '10-15 mins', difficulty: 'Easy', description: 'Simple seated meditation for mental peace and clarity.', videoId: 'z0GtmPnqAd8' },
    { name: 'Viparita Karani (Legs Up the Wall)', duration: '5-10 mins', difficulty: 'Easy', description: 'Relaxing inversion that reduces anxiety and fatigue.', videoId: 'TzahhHZvOks' },
    { name: 'Shavasana (Corpse Pose)', duration: '5-10 mins', difficulty: 'Easy', description: 'Deep relaxation pose for complete mental and physical rest.', videoId: 'SIqoCQ5dLlE' },
    { name: 'Anulom Vilom (Alternate Nostril Breathing)', duration: '5-10 mins', difficulty: 'Easy', description: 'Pranayama technique that balances energy and reduces stress.', videoId: 'JEW5UmQJywc' },
  ],
  'fitness': [
    { name: 'Tadasana (Mountain Pose)', duration: '30-60 secs', difficulty: 'Easy', description: 'Foundation pose that improves posture and body awareness.', videoId: 'CTrRX7DcBSA' },
    { name: 'Trikonasana (Triangle Pose)', duration: '30-60 secs each side', difficulty: 'Medium', description: 'Stretches and strengthens entire body, improves flexibility.', videoId: 'S6gB0QHbWFE' },
    { name: 'Bhujangasana (Cobra Pose)', duration: '15-30 secs', difficulty: 'Easy', description: 'Backbend that strengthens spine and opens chest.', videoId: 'UYDTHxVh2EE' },
    { name: 'Adho Mukha Svanasana (Downward Dog)', duration: '30-60 secs', difficulty: 'Medium', description: 'Inverted pose that stretches and strengthens whole body.', videoId: 'ETSIv8WetjI' },
    { name: 'Setu Bandhasana (Bridge Pose)', duration: '30-60 secs', difficulty: 'Medium', description: 'Backbend that strengthens core, back, and legs.', videoId: 'mqN6N2Ku9rE' },
  ],
  'respiratory': [
    { name: 'Bhastrika Pranayama (Bellows Breath)', duration: '2-5 mins', difficulty: 'Medium', description: 'Energizing breathing technique that improves lung capacity.', videoId: 'dlC_9T9W-Oo' },
    { name: 'Kapalbhati Pranayama (Skull Shining Breath)', duration: '5-10 mins', difficulty: 'Medium', description: 'Cleansing breath that strengthens respiratory muscles.', videoId: 'tKzUhlOetGI' },
    { name: 'Matsyasana (Fish Pose)', duration: '30-60 secs', difficulty: 'Medium', description: 'Opens chest and improves breathing capacity.', videoId: 'rWwR9FFyzNQ' },
    { name: 'Setu Bandhasana (Bridge Pose)', duration: '30-60 secs', difficulty: 'Medium', description: 'Expands chest and improves oxygen intake.', videoId: 'mqN6N2Ku9rE' },
    { name: 'Ustrasana (Camel Pose)', duration: '20-40 secs', difficulty: 'Hard', description: 'Deep chest opener that enhances lung function.', videoId: '8q7GxnIFsQo' },
  ],
  'digestion': [
    { name: 'Vajrasana (Thunderbolt Pose)', duration: '5-10 mins after meals', difficulty: 'Easy', description: 'Aids digestion and prevents acid reflux.', videoId: 'lDHE0Tvoyyo' },
    { name: 'Pawanmuktasana (Wind Relieving Pose)', duration: '30-60 secs each leg', difficulty: 'Easy', description: 'Releases gas and improves digestive function.', videoId: 'ce612Vsqub8' },
    { name: 'Ardha Matsyendrasana (Half Spinal Twist)', duration: '30-60 secs each side', difficulty: 'Medium', description: 'Massages digestive organs and improves elimination.', videoId: 'kxgKSFI5cvg' },
    { name: 'Paschimottanasana (Seated Forward Bend)', duration: '30-60 secs', difficulty: 'Medium', description: 'Compresses abdomen and stimulates digestion.', videoId: '_eWWLp3Dc_I' },
    { name: 'Mayurasana (Peacock Pose)', duration: '10-30 secs', difficulty: 'Hard', description: 'Advanced pose that detoxifies and strengthens digestive system.', videoId: '-5113Q1KEDQ' },
  ],
};

export default {
  calculateBMI,
  checkSleepQuality,
  calculateWaterIntake,
  formatDate,
  formatDateTime,
  truncateText,
  generateId,
  isValidEmail,
  isValidPassword,
  debounce,
  scrollToTop,
  getTodos,
  saveTodos,
  checkSymptoms,
  yogaCategories,
  yogaPoses,
};
