import { format } from 'date-fns';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  FiBookmark,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiCpu,
  FiDollarSign,
  FiMapPin,
  FiShare2,
  FiThumbsUp
} from 'react-icons/fi';

const RecommendationCard = ({ recommendation, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(recommendation.content);
    toast.success('Recommendation copied to clipboard!');
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? 'Removed from saved' : 'Saved to your collection');
  };

  // Parse the AI response if it contains structured data
  const parseContent = (content) => {
    if (!content) return { main: '', sections: [] };
    
    const lines = content.split('\n').filter(line => line.trim());
    const sections = [];
    let currentSection = null;

    lines.forEach(line => {
      if (line.match(/^\d+\./)) {
        if (currentSection) sections.push(currentSection);
        currentSection = { title: line, content: [] };
      } else if (currentSection && line.trim()) {
        currentSection.content.push(line.trim());
      }
    });

    if (currentSection) sections.push(currentSection);

    return {
      main: lines[0] || '',
      sections
    };
  };

  const parsed = parseContent(recommendation.content);

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white shadow-lg">
              <FiCpu size={24} />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900">
                  AI Travel Recommendations
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Gemini AI
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                {recommendation.destination && (
                  <div className="flex items-center space-x-1">
                    <FiMapPin className="text-purple-500" size={14} />
                    <span>{recommendation.destination}</span>
                  </div>
                )}
                
                {recommendation.budgetRange && (
                  <div className="flex items-center space-x-1">
                    <FiDollarSign className="text-green-500" size={14} />
                    <span className="capitalize">{recommendation.budgetRange}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-1">
                  <FiCalendar className="text-blue-500" size={14} />
                  <span>{format(new Date(recommendation.createdAt), 'MMM dd, yyyy')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className={`p-2 rounded-lg transition-all duration-300 ${
                saved 
                  ? 'bg-yellow-100 text-yellow-600' 
                  : 'hover:bg-gray-100 text-gray-400 hover:text-yellow-600'
              }`}
            >
              <FiBookmark size={18} className={saved ? 'fill-current' : ''} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-all duration-300"
            >
              <FiShare2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {!expanded ? (
          <p className="text-gray-700 leading-relaxed line-clamp-3">
            {recommendation.content}
          </p>
        ) : (
          <div className="space-y-4">
            {parsed.sections.length > 0 ? (
              parsed.sections.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-semibold text-purple-700">{section.title}</h4>
                  <div className="space-y-1">
                    {section.content.map((line, lineIdx) => (
                      <p key={lineIdx} className="text-gray-700 pl-4">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {recommendation.content}
              </p>
            )}
          </div>
        )}

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
        >
          <span>{expanded ? 'Show less' : 'Read more'}</span>
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {/* Tags/Actions */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FiThumbsUp className="text-purple-500" />
              <span>Helpful</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiClock className="text-blue-500" />
              <span>AI Generated</span>
            </div>
          </div>
          
          <button
            onClick={() => {
              toast.success('Thanks for your feedback!');
            }}
            className="text-sm text-gray-400 hover:text-purple-600 transition-colors"
          >
            Was this helpful?
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;