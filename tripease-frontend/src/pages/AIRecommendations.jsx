import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  FiClock,
  FiCompass,
  FiCpu,
  FiLoader,
  FiMap,
  FiRefreshCw,
  FiSend,
  FiStar
} from 'react-icons/fi';
import Loader from '../components/Loader';
import RecommendationCard from '../components/RecommendationCard';
import { useApi } from '../hooks/useApi';

const AIRecommendations = () => {
  const { post, get, loading } = useApi();
  const [recommendations, setRecommendations] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    budgetRange: '',
    preferences: '',
    travelStyle: 'balanced',
    duration: '7',
    travelers: '2'
  });

  const budgetRanges = [
    { value: 'budget', label: 'Budget (Under ₹50,000)', icon: '💰' },
    { value: 'moderate', label: 'Moderate (₹50,000 - ₹1,50,000)', icon: '💎' },
    { value: 'luxury', label: 'Luxury (₹1,50,000+)', icon: '👑' }
  ];

  const travelStyles = [
    { value: 'adventure', label: 'Adventure', icon: '🏔️' },
    { value: 'relaxation', label: 'Relaxation', icon: '🏖️' },
    { value: 'cultural', label: 'Cultural', icon: '🏛️' },
    { value: 'food', label: 'Food & Culinary', icon: '🍜' },
    { value: 'balanced', label: 'Balanced', icon: '⚖️' }
  ];

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    const { data } = await get('/ai/recommendations');
    if (data) {
      setRecommendations(data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateAIRecommendation = async () => {
    if (!formData.destination) {
      toast.error('Please enter a destination');
      return;
    }

    setLoadingAI(true);
    
    // Create an abort controller for manual timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout
    
    try {
      console.log('Sending AI request with data:', formData);
      
      // Construct a detailed prompt for Gemini
      const prompt = `Generate a detailed travel recommendation for ${formData.destination} with the following preferences:
        - Budget Range: ${formData.budgetRange || 'Not specified'}
        - Travel Style: ${formData.travelStyle}
        - Duration: ${formData.duration} days
        - Number of Travelers: ${formData.travelers}
        - Special Interests: ${formData.preferences || 'General tourism'}
        
        Please provide:
        1. Best time to visit
        2. Top attractions and activities
        3. Estimated daily budget breakdown
        4. Accommodation recommendations
        5. Local cuisine must-tries
        6. Cultural tips and etiquette
        7. Safety tips
        8. Hidden gems off the tourist path`;

      const { data, error } = await post('/ai/recommendation', {
        destination: formData.destination,
        budgetRange: formData.budgetRange,
        preferences: prompt
      }, {
        signal: controller.signal,
        showSuccessToast: true,
        successMessage: '✨ AI recommendation generated!'
      });
      
      clearTimeout(timeoutId); // Clear timeout if request succeeds
      
      console.log('AI Response received:', data);
      
      if (data) {
        setRecommendations([data, ...recommendations]);
        setFormData(prev => ({
          destination: prev.destination,
          budgetRange: '',
          preferences: '',
          travelStyle: 'balanced',
          duration: '7',
          travelers: '2'
        }));
        toast.success('Recommendation added!');
      }
      
      if (error) {
        console.error('API Error:', error);
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
          toast.error('AI service timeout. Please try again.');
        } else {
          toast.error('Failed to get recommendation');
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      
      // Handle abort error specifically
      if (err.name === 'AbortError' || err.code === 'ECONNABORTED') {
        toast.error('Request timeout. The AI service is taking too long.');
      } else {
        toast.error('Failed to generate AI recommendation. Please try again.');
      }
    } finally {
      clearTimeout(timeoutId);
      setLoadingAI(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateAIRecommendation();
  };

  const handleRegenerate = () => {
    if (formData.destination) {
      generateAIRecommendation();
    } else {
      toast.error('Please enter a destination first');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <FiCpu size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Travel Assistant</h1>
            <p className="text-white/80">Powered by Google Gemini AI</p>
          </div>
        </div>
        <p className="text-lg max-w-2xl">
          Get personalized travel recommendations powered by advanced AI. 
          Tell us your preferences and let our AI create the perfect itinerary for you.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Plan Your Dream Trip</h2>
          {formData.destination && (
            <button
              onClick={handleRegenerate}
              disabled={loadingAI}
              className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <FiRefreshCw className={loadingAI ? 'animate-spin' : ''} />
              <span>Regenerate</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Destination */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Where do you want to go? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiMap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="e.g., Bali, Paris, Tokyo, Manali..."
                  required
                />
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.icon} {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel Style
              </label>
              <select
                name="travelStyle"
                value={formData.travelStyle}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              >
                {travelStyles.map(style => (
                  <option key={style.value} value={style.value}>
                    {style.icon} {style.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (days)
              </label>
              <div className="relative">
                <FiClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  max="30"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>
            </div>

            {/* Travelers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Travelers
              </label>
              <div className="relative">
                <FiStar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Interests & Preferences
              </label>
              <textarea
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="Tell us about your interests (e.g., I love photography, want to try local food, interested in history, need wheelchair accessibility...)"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loadingAI || !formData.destination}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
          >
            {loadingAI ? (
              <>
                <FiLoader className="animate-spin" size={24} />
                <span>AI is thinking...</span>
              </>
            ) : (
              <>
                <FiSend size={24} />
                <span>Generate AI Recommendations</span>
              </>
            )}
          </button>
        </form>

        {/* AI Processing Indicator */}
        {loadingAI && (
          <div className="mt-6 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
            <div className="flex items-center space-x-3">
              <div className="animate-pulse">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              </div>
              <div className="animate-pulse delay-100">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              </div>
              <div className="animate-pulse delay-200">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              </div>
              <span className="text-purple-700 font-medium">
                Gemini AI is crafting your personalized travel recommendations...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Recommendations List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Your AI Recommendations</h2>
          {recommendations.length > 0 && (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              {recommendations.length} {recommendations.length === 1 ? 'Recommendation' : 'Recommendations'}
            </span>
          )}
        </div>

        {loading && recommendations.length === 0 ? (
          <Loader />
        ) : recommendations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCompass className="text-purple-600" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No recommendations yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Fill out the form above and let our Gemini AI create personalized travel recommendations just for you!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <RecommendationCard 
                key={rec.id || index} 
                recommendation={rec}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendations;