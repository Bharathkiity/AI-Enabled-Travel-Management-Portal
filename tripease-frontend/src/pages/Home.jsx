import { Link } from 'react-router-dom';
import { 
  FiMap, 
  FiDollarSign, 
  FiCpu, 
  FiBarChart2, 
  FiArrowRight,
  FiStar,
  FiClock,
  FiUsers,
  FiCamera,
  FiHeart,
  FiSun,
  FiUmbrella,
  FiGlobe,
  FiCompass
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: FiMap,
      title: 'Smart Trip Planning',
      description: 'AI-powered itineraries that adapt to your preferences and schedule.',
      color: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: FiDollarSign,
      title: 'Expense Tracking',
      description: 'Real-time budget monitoring with smart alerts and insights.',
      color: 'from-green-500 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: FiCpu,
      title: 'AI Recommendations',
      description: 'Personalized travel suggestions powered by advanced machine learning.',
      color: 'from-purple-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: FiBarChart2,
      title: 'Analytics Dashboard',
      description: 'Visual insights into your travel patterns and spending habits.',
      color: 'from-orange-500 to-red-500',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const destinations = [
    // {
    //   name: 'Bali, Indonesia',
    //   price: '$899',
    //   duration: '7 Days',
    //   rating: 4.8,
    //   reviews: 1243,
    //   image: 'https://images.unsplash.com/photo-1537996194471-e657df0ab5e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    //   badge: 'Popular'
    // },
    {
      name: 'Swiss Alps',
      price: '$1,299',
      duration: '5 Days',
      rating: 4.9,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Featured'
    },
    {
      name: 'Kyoto, Japan',
      price: '$1,099',
      duration: '6 Days',
      rating: 4.7,
      reviews: 2156,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Cultural'
    },
    {
      name: 'Santorini, Greece',
      price: '$1,199',
      duration: '5 Days',
      rating: 4.9,
      reviews: 1876,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Romantic'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      comment: 'TripEase made planning our honeymoon so easy! The AI recommendations were spot-on.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      trip: 'Honeymoon in Maldives'
    },
    {
      name: 'Mike Chen',
      location: 'Singapore',
      comment: 'The expense tracking feature saved us from overspending. Highly recommended!',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      trip: 'Backpacking Europe'
    },
    {
      name: 'Emily Rodriguez',
      location: 'Spain',
      comment: 'Best travel app I\'ve ever used. The dashboard gives amazing insights.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      trip: 'Family Trip to Japan'
    }
  ];

  const stats = [
    { icon: FiUsers, value: '50K+', label: 'Happy Travelers' },
    { icon: FiGlobe, value: '100+', label: 'Destinations' },
    { icon: FiStar, value: '4.9', label: 'User Rating' },
    { icon: FiClock, value: '24/7', label: 'AI Support' }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section with Video Background Effect */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden rounded-b-3xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Travel Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 mix-blend-multiply"></div>
        </div>

        {/* Animated Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 animate-fade-in">
              <FiCpu className="text-blue-300" />
              <span className="text-blue-100 text-sm">Powered by Advanced AI</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
              Your{' '}
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Travel Companion
            </h1>

            {/* Description */}
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto animate-slide-up delay-100">
              Plan smarter, travel better with intelligent itineraries, 
              real-time expense tracking, and personalized recommendations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-200">
              {user ? (
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center justify-center space-x-2 bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <span>Go to Dashboard</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group inline-flex items-center justify-center space-x-2 bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <span>Start Free Trial</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300"
                  >
                    Watch Demo
                  </Link>
                </>
              )}
            </div>

            {/* Stats Pills */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                  <stat.icon className="text-blue-300" size={16} />
                  <span className="text-white font-semibold">{stat.value}</span>
                  <span className="text-blue-200 text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section with Cards */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TripEase?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of AI technology and travel expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-60`}></div>
                
                {/* Icon Overlay */}
                <div className="absolute top-4 left-4 p-3 bg-white/20 backdrop-blur-md rounded-xl">
                  <feature.icon className="text-white" size={24} />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                
                {/* Learn More Link */}
                <Link to="/features" className={`inline-flex items-center space-x-2 text-sm font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent group-hover:underline`}>
                  <span>Learn more</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Hover Gradient Border */}
              <div className={`absolute inset-0 border-2 border-transparent group-hover:border-${feature.color.split(' ')[1]} rounded-2xl transition-all duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Destinations
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-curated destinations based on trending travel patterns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
              >
                {/* Destination Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-600">
                    {dest.badge}
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <FiHeart className="text-gray-600 hover:text-red-500" size={16} />
                  </button>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg text-white font-bold">
                    {dest.price}
                  </div>
                </div>

                {/* Destination Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{dest.name}</h3>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <FiClock size={14} />
                      <span>{dest.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiStar className="text-yellow-400 fill-current" size={14} />
                      <span className="text-sm font-semibold">{dest.rating}</span>
                      <span className="text-xs text-gray-500">({dest.reviews})</span>
                    </div>
                  </div>

                  <button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-10">
            <Link
              to="/destinations"
              className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 group"
            >
              <span>View All Destinations</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                <FiCpu />
                <span className="text-sm">Powered by Gemini AI</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Smart AI That
                <span className="block text-yellow-300">Knows You</span>
              </h2>
              
              <p className="text-xl text-blue-100 mb-8">
                Our AI learns your preferences, budget, and travel style to create 
                perfectly tailored itineraries that feel handcrafted just for you.
              </p>

              <div className="space-y-4">
                {[
                  'Personalized destination recommendations',
                  'Smart budget optimization',
                  'Real-time price predictions',
                  'Cultural preference matching'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white">{item}</span>
                  </div>
                ))}
              </div>

              <button className="mt-8 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Experience AI Magic
              </button>
            </div>

            {/* Right Content - AI Visualization */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-white/80 ml-2">AI Analysis Active</span>
                </div>

                {/* Animated Graph */}
                <div className="space-y-4">
                  {[70, 45, 90, 60, 85].map((height, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-xs text-white/60 w-16">Day {index + 1}</span>
                      <div className="flex-1 h-4 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
                          style={{ width: `${height}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-white">{height}%</span>
                    </div>
                  ))}
                </div>

                {/* AI Insights */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-sm text-white/80">Best time to visit</span>
                    <span className="text-sm font-semibold text-green-400">March-April</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-sm text-white/80">Estimated budget</span>
                    <span className="text-sm font-semibold text-yellow-400">$2,500</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-sm text-white/80">Match score</span>
                    <span className="text-sm font-semibold text-purple-400">94%</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Travelers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy travelers who've transformed their journey with TripEase
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 relative hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-6xl text-gray-200 font-serif">"</div>

              {/* User Info */}
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <p className="text-xs text-blue-600 mt-1">{testimonial.trip}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    size={16}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 italic">"{testimonial.comment}"</p>

              {/* Bottom Gradient Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-b-2xl"></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gray-900 rounded-3xl overflow-hidden">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Travel"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          
          <div className="relative py-20 px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join TripEase today and let AI transform the way you travel
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <span>Get Started Free</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center space-x-2 text-white/80">
                <FiStar className="text-yellow-400" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <FiUsers className="text-blue-400" />
                <span>50K+ Users</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <FiGlobe className="text-green-400" />
                <span>100+ Countries</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;