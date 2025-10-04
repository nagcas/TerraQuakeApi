import { useState, useEffect } from 'react';
import MetaData from '@pages/noPage/metaData';
import { 
  FiChevronDown, 
  FiGlobe,
  FiActivity,
  FiLayers,
  FiTrendingUp,
  FiZap,
  FiAward,
  FiTarget,
  FiCode,
  FiServer
} from 'react-icons/fi';
import { 
  FaBell, 
  FaGraduationCap, 
  FaBuilding, 
  FaShieldAlt,
  FaChartLine,
  FaNetworkWired,
  FaLightbulb,
  FaCheckCircle,
  FaRocket,
  FaStar,
  FaUsers
} from 'react-icons/fa';

export default function UseCases() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Staggered card animation on mount
  useEffect(() => {
    const timers = [];
    [0, 1, 2, 3, 4, 5].forEach((index) => {
      const timer = setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 150);
      timers.push(timer);
    });
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const useCaseDocs = [
    {
      title: 'Early Warning Systems',
      icon: <FaBell className="text-4xl" />,
      gradient: 'from-red-500 to-orange-500',
      bgColor: 'from-red-500/10 to-orange-500/10',
      description: 'Build real-time earthquake alert systems to save lives',
      tagline: 'Critical Infrastructure',
      difficulty: 'Advanced',
      content:
        'TerraQuake API enables the development of sophisticated early warning systems that can detect seismic activity and alert users seconds to minutes before strong shaking arrives.',
      points: [
        'Real-time seismic data streaming for instant notifications',
        'Integration with mobile apps and IoT devices',
        'Customizable alert thresholds based on magnitude and location',
        'Multi-channel notifications (SMS, push, email)',
        'Historical data analysis for pattern recognition',
      ],
      benefits: ['Save lives', 'Reduce injuries', 'Protect property'],
      metrics: { users: '10K+', response: '<1s', accuracy: '99.9%' },
      codeExample: true,
    },
    {
      title: 'Educational & Research Tools',
      icon: <FaGraduationCap className="text-4xl" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
      description: 'Empower learning and scientific discovery',
      tagline: 'Academic Excellence',
      difficulty: 'Beginner',
      content:
        'Perfect for educational institutions and researchers to visualize, analyze, and understand seismic activity patterns across the globe.',
      points: [
        'Interactive visualizations for classroom demonstrations',
        'Access to comprehensive historical earthquake databases',
        'Data export capabilities for academic research',
        'Support for seismology curriculum development',
        'API documentation designed for educational purposes',
      ],
      benefits: ['Enhance learning', 'Support research', 'Inspire curiosity'],
      metrics: { universities: '500+', datasets: '1M+', students: '50K+' },
      codeExample: true,
    },
    {
      title: 'Infrastructure Monitoring',
      icon: <FaBuilding className="text-4xl" />,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      description: 'Monitor critical infrastructure and ensure safety',
      tagline: 'Enterprise Solution',
      difficulty: 'Intermediate',
      content:
        'Industries can leverage TerraQuake API to monitor the structural integrity of buildings, bridges, and critical infrastructure in seismically active regions.',
      points: [
        'Continuous monitoring of seismic activity near infrastructure',
        'Automated structural health assessments',
        'Integration with building management systems',
        'Predictive maintenance based on seismic exposure',
        'Compliance with safety regulations and standards',
      ],
      benefits: ['Ensure safety', 'Prevent damage', 'Reduce costs'],
      metrics: { buildings: '25K+', cities: '100+', savings: '$500M+' },
      codeExample: true,
    },
    {
      title: 'Disaster Preparedness',
      icon: <FaShieldAlt className="text-4xl" />,
      gradient: 'from-green-500 to-teal-500',
      bgColor: 'from-green-500/10 to-teal-500/10',
      description: 'Plan and prepare for seismic emergencies',
      tagline: 'Government & NGO',
      difficulty: 'Advanced',
      content:
        'Government agencies and emergency responders can use TerraQuake API to develop comprehensive disaster preparedness and response strategies.',
      points: [
        'Risk assessment and hazard mapping',
        'Emergency response planning and coordination',
        'Population density analysis in high-risk zones',
        'Resource allocation optimization',
        'Training simulations based on historical data',
      ],
      benefits: ['Save communities', 'Coordinate response', 'Minimize impact'],
      metrics: { agencies: '200+', drills: '1000+', lives: '100K+' },
      codeExample: true,
    },
    {
      title: 'Data Analytics & Visualization',
      icon: <FaChartLine className="text-4xl" />,
      gradient: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/10 to-orange-500/10',
      description: 'Transform seismic data into actionable insights',
      tagline: 'Data Science',
      difficulty: 'Intermediate',
      content:
        'Data scientists and analysts can leverage TerraQuake API to create powerful visualizations and predictive models using machine learning.',
      points: [
        'RESTful API with JSON format for easy integration',
        'Support for time-series analysis and forecasting',
        'Geospatial data for mapping and GIS applications',
        'Statistical analysis tools and libraries compatibility',
        'Big data processing capabilities',
      ],
      benefits: ['Discover patterns', 'Predict trends', 'Drive decisions'],
      metrics: { queries: '1M+/day', accuracy: '95%', models: '500+' },
      codeExample: true,
    },
    {
      title: 'IoT & Smart Cities',
      icon: <FaNetworkWired className="text-4xl" />,
      gradient: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-500/10 to-purple-500/10',
      description: 'Integrate seismic awareness into smart infrastructure',
      tagline: 'Future Technology',
      difficulty: 'Advanced',
      content:
        'Connect TerraQuake API with IoT devices and smart city platforms to create earthquake-aware intelligent systems.',
      points: [
        'Integration with smart building automation systems',
        'IoT sensor networks for distributed monitoring',
        'Automated emergency protocols for smart cities',
        'Real-time dashboards for city operations centers',
        'Cross-platform compatibility and webhooks',
      ],
      benefits: ['Enhance automation', 'Improve resilience', 'Modernize cities'],
      metrics: { devices: '100K+', cities: '50+', uptime: '99.99%' },
      codeExample: true,
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <>
     {/* SEO Stuff */}
      <MetaData
        title="Use Cases - TerraQuake API"
        description="Discover real-world applications of TerraQuake API: early warning systems, educational tools, infrastructure monitoring, and disaster preparedness solutions."
      />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <section className="relative z-30 w-full min-h-screen px-6 py-20 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900 overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Page header with enhanced styling */}
        <div className="relative z-10 flex flex-col justify-center items-center mb-16 text-center">
          {/* Badge with animation */}
          <div className="inline-block mb-4 animate-bounce">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold backdrop-blur-sm shadow-lg">
              🌍 Real-World Applications
            </span>
          </div>
          
          {/* Main heading with gradient */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            TerraQuake API Use Cases
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl leading-relaxed mb-4">
            Discover how developers, researchers, and organizations worldwide are leveraging 
            <span className="text-purple-400 font-semibold"> TerraQuake API </span> 
            to build innovative solutions for seismic safety, education, and disaster preparedness.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-purple-500/20">
              <FaUsers className="text-purple-400" />
              <span className="text-sm text-gray-300"><strong className="text-white">10,000+</strong> Developers</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-blue-500/20">
              <FaRocket className="text-blue-400" />
              <span className="text-sm text-gray-300"><strong className="text-white">500+</strong> Projects</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-green-500/20">
              <FaStar className="text-yellow-400" />
              <span className="text-sm text-gray-300"><strong className="text-white">4.9/5</strong> Rating</span>
            </div>
          </div>

          {/* Enhanced Stats section with animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 w-full max-w-4xl">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
              <FiGlobe className="text-3xl text-purple-400 mb-2 mx-auto group-hover:rotate-12 transition-transform" />
              <p className="text-2xl font-bold text-white">Global</p>
              <p className="text-sm text-gray-400">Coverage</p>
              <div className="mt-2 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
              <FiActivity className="text-3xl text-blue-400 mb-2 mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-2xl font-bold text-white">Real-time</p>
              <p className="text-sm text-gray-400">Updates</p>
              <div className="mt-2 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
              <FiLayers className="text-3xl text-green-400 mb-2 mx-auto group-hover:rotate-12 transition-transform" />
              <p className="text-2xl font-bold text-white">Rich</p>
              <p className="text-sm text-gray-400">Data</p>
              <div className="mt-2 h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
              <FiTrendingUp className="text-3xl text-orange-400 mb-2 mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-2xl font-bold text-white">Scalable</p>
              <p className="text-sm text-gray-400">API</p>
              <div className="mt-2 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>

        {/* Use Cases Cards Grid with staggered animations */}
        <div className="relative z-10 w-full mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {useCaseDocs.map((item, index) => (
            <AccordionItem
              key={item.title}
              className={`group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-2 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-700 ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${
                expandedIndex === index 
                  ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20' 
                  : 'border-white/10 hover:border-purple-500/30'
              } hover:scale-[1.02]`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Animated gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              
              {/* Card Header - Always visible */}
              <div 
                className="relative p-6 cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon with gradient background and pulse animation */}
                    <div className={`relative flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} p-3 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <div className="text-white relative z-10">
                        {item.icon}
                      </div>
                      {/* Pulse ring */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.gradient} animate-ping opacity-20`}></div>
                    </div>
                    
                    {/* Title and badges */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(item.difficulty)}`}>
                          {item.difficulty}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600">
                          {item.tagline}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon with rotation */}
                  <div className={`flex-shrink-0 ml-4 w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/30 transition-all duration-300 ${
                    expandedIndex === index ? 'rotate-180 bg-purple-500/20 scale-110' : ''
                  }`}>
                    <FiChevronDown className="text-purple-400 text-xl" />
                  </div>
                </div>

                {/* Quick metrics display */}
                <div className="flex gap-4 text-xs">
                  {Object.entries(item.metrics).map(([key, value], idx) => (
                    <div key={idx} className="flex items-center gap-1 text-gray-400">
                      <FiZap className="text-purple-400" />
                      <span><strong className="text-white">{value}</strong> {key}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable Content with smooth animation */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  expandedIndex === index ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 space-y-6">
                  {/* Animated divider */}
                  <div className={`h-px bg-gradient-to-r ${item.gradient} opacity-30 transform origin-left transition-transform duration-700 ${
                    expandedIndex === index ? 'scale-x-100' : 'scale-x-0'
                  }`}></div>
                  
                  {/* Content description with fade-in */}
                  <div className={`bg-gradient-to-br ${item.bgColor} rounded-xl p-4 border border-gray-700/50 transition-all duration-700 delay-100 ${
                    expandedIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {item.content}
                    </p>
                  </div>

                  {/* Key Features with staggered animation */}
                  <div className={`transition-all duration-700 delay-200 ${
                    expandedIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FaLightbulb className="text-yellow-400 animate-pulse" />
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {item.points.map((point, idx) => (
                        <li 
                          key={idx} 
                          className={`flex items-start gap-3 text-gray-300 text-sm md:text-base group/item hover:text-white transition-all duration-300 ${
                            expandedIndex === index ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                          }`}
                          style={{ transitionDelay: `${300 + idx * 50}ms` }}
                        >
                          <FaCheckCircle className="flex-shrink-0 mt-1 text-purple-400 group-hover/item:text-purple-300 group-hover/item:scale-125 transition-transform" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits badges with animation */}
                  <div className={`transition-all duration-700 delay-300 ${
                    expandedIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FiAward className="text-green-400" />
                      Benefits
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className={`px-4 py-2 bg-gradient-to-r ${item.gradient} bg-opacity-10 border border-purple-500/30 rounded-full text-sm font-medium text-white hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-default`}
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          ✓ {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick start button */}
                  <div className={`transition-all duration-700 delay-400 ${
                    expandedIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <button className={`w-full py-3 bg-gradient-to-r ${item.gradient} hover:shadow-xl rounded-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2`}>
                      <FiCode />
                      View Code Example
                      <FiTarget />
                    </button>
                  </div>
                </div>
              </div>

              {/* Animated bottom highlight line */}
              <div className={`h-1 bg-gradient-to-r ${item.gradient} transition-all duration-500 ${
                expandedIndex === index ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              } origin-left`}></div>

              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-5 rounded-bl-full transition-opacity duration-500 ${
                expandedIndex === index ? 'opacity-10' : ''
              }`}></div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section with parallax effect */}
        <div className="relative z-10 mt-20 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border-2 border-purple-500/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 group">
            {/* Floating icon */}
            <div className="inline-block mb-6 animate-bounce">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <FaRocket className="text-3xl text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join <span className="text-purple-400 font-bold">10,000+</span> developers leveraging TerraQuake API to create life-saving applications.
            </p>
            
            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/api-access"
                className="group/btn px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiZap className="group-hover/btn:rotate-12 transition-transform" />
                Get API Access
                <FiTarget className="group-hover/btn:scale-125 transition-transform" />
              </a>
              <a
                href="/docs"
                className="group/btn px-8 py-4 bg-gray-800 hover:bg-gray-700 border-2 border-purple-500/30 hover:border-purple-500/50 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiServer className="group-hover/btn:rotate-12 transition-transform" />
                View Documentation
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-purple-400" />
                <span>10K+ Developers</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRocket className="text-blue-400" />
                <span>500+ Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${
            scrollProgress > 20 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="Back to top"
        >
          <FiTrendingUp className="text-white text-xl rotate-90" />
        </button>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}
