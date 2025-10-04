import { useState, useEffect } from 'react';
import MetaData from '@pages/noPage/metaData';
import { 
  FiChevronDown, 
  FiAlertTriangle, 
  FiBook, 
  FiActivity, 
  FiShield,
  FiUsers,
  FiGlobe,
  FiTrendingUp,
  FiLayers,
  FiZap,
  FiAward,
  FiTarget
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
  FaCode,
  FaUsers as FaUsersGroup
} from 'react-icons/fa';

export default function UseCases() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [animatedCards, setAnimatedCards] = useState([]);

  // Animate cards on mount
  useState(() => {
    const timer = setTimeout(() => {
      setAnimatedCards([0, 1, 2, 3, 4, 5]);
    }, 100);
    return () => clearTimeout(timer);
  });

  const useCaseDocs = [
    {
      title: 'Early Warning Systems',
      icon: <FaBell className="text-4xl" />,
      gradient: 'from-red-500 to-orange-500',
      description: 'Build real-time earthquake alert systems to save lives',
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
    },
    {
      title: 'Educational & Research Tools',
      icon: <FaGraduationCap className="text-4xl" />,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Empower learning and scientific discovery',
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
    },
    {
      title: 'Infrastructure Monitoring',
      icon: <FaBuilding className="text-4xl" />,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Monitor critical infrastructure and ensure safety',
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
    },
    {
      title: 'Disaster Preparedness',
      icon: <FaShieldAlt className="text-4xl" />,
      gradient: 'from-green-500 to-teal-500',
      description: 'Plan and prepare for seismic emergencies',
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
    },
    {
      title: 'Data Analytics & Visualization',
      icon: <FaChartLine className="text-4xl" />,
      gradient: 'from-yellow-500 to-orange-500',
      description: 'Transform seismic data into actionable insights',
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
    },
    {
      title: 'IoT & Smart Cities',
      icon: <FaNetworkWired className="text-4xl" />,
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Integrate seismic awareness into smart infrastructure',
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
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <MetaData
        title="Use Cases - TerraQuake API"
        description="Discover real-world applications of TerraQuake API: early warning systems, educational tools, infrastructure monitoring, and disaster preparedness solutions."
      />
      <section className="relative z-30 w-full min-h-screen px-6 py-20 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Page header */}
        <div className="relative z-10 flex flex-col justify-center items-center mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold">
              🌍 Real-World Applications
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl text-white font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            TerraQuake API Use Cases
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-4xl leading-relaxed">
            Discover how developers, researchers, and organizations worldwide are leveraging 
            <span className="text-purple-400 font-semibold"> TerraQuake API </span> 
            to build innovative solutions for seismic safety, education, and disaster preparedness.
          </p>

          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 w-full max-w-4xl">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4 backdrop-blur-sm">
              <FiGlobe className="text-3xl text-purple-400 mb-2 mx-auto" />
              <p className="text-2xl font-bold text-white">Global</p>
              <p className="text-sm text-gray-400">Coverage</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
              <FiActivity className="text-3xl text-blue-400 mb-2 mx-auto" />
              <p className="text-2xl font-bold text-white">Real-time</p>
              <p className="text-sm text-gray-400">Updates</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
              <FiLayers className="text-3xl text-green-400 mb-2 mx-auto" />
              <p className="text-2xl font-bold text-white">Rich</p>
              <p className="text-sm text-gray-400">Data</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm">
              <FiTrendingUp className="text-3xl text-orange-400 mb-2 mx-auto" />
              <p className="text-2xl font-bold text-white">Scalable</p>
              <p className="text-sm text-gray-400">API</p>
            </div>
          </div>
        </div>

        {/* Use Cases Cards Grid */}
        <div className="relative z-10 w-full mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {useCaseDocs.map((item, index) => (
            <div
              key={item.title}
              className={`group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-2 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${
                expandedIndex === index 
                  ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20' 
                  : 'border-white/10 hover:border-purple-500/30'
              }`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Card Header - Always visible */}
              <div 
                className="relative p-6 cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon with gradient background */}
                    <div className={`flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Title and description */}
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div className={`flex-shrink-0 ml-4 w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/30 transition-all duration-300 ${
                    expandedIndex === index ? 'rotate-180 bg-purple-500/20' : ''
                  }`}>
                    <FiChevronDown className="text-purple-400 text-xl" />
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  expandedIndex === index ? 'max-h-[2000px]' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 space-y-6">
                  {/* Divider */}
                  <div className={`h-px bg-gradient-to-r ${item.gradient} opacity-30`}></div>
                  
                  {/* Content description */}
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {item.content}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FaLightbulb className="text-yellow-400" />
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {item.points.map((point, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start gap-3 text-gray-300 text-sm md:text-base group/item hover:text-white transition-colors duration-200"
                        >
                          <FaCheckCircle className={`flex-shrink-0 mt-1 text-purple-400 group-hover/item:text-purple-300`} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits badges */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FiTrendingUp className="text-green-400" />
                      Benefits
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className={`px-4 py-2 bg-gradient-to-r ${item.gradient} bg-opacity-10 border border-purple-500/30 rounded-full text-sm font-medium text-white hover:scale-105 transition-transform duration-200 cursor-default`}
                        >
                          ✓ {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom highlight line */}
              <div className={`h-1 bg-gradient-to-r ${item.gradient} transition-all duration-500 ${
                expandedIndex === index ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative z-10 mt-20 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join thousands of developers leveraging TerraQuake API to create life-saving applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/api-access"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get API Access
              </a>
              <a
                href="/docs"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-purple-500/30 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
