import { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaChartLine, FaCode, FaFilter } from 'react-icons/fa6';

export default function Info() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const introCard = [
    {
      title: 'Event Details',
      icon: (
        <FaRegCalendarAlt className='text-6xl my-6 text-violet-300 mx-auto' />
      ),
      content:
        'Access comprehensive information about seismic events, including magnitude, depth, coordinates, time, and location.',
      button: 'View Docs',
      link: '/docs/#event-details',
      gradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
    },
    {
      title: 'Advanced Filtering',
      icon: <FaFilter className='text-6xl my-6 text-violet-300 mx-auto' />,
      content:
        'Query earthquakes by time range, location, magnitude interval, and distance radius to get exactly the data you need.',
      button: 'Learn More',
      link: '/docs/#filtering',
      gradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
    },
    {
      title: 'Statistical Insights',
      icon: <FaChartLine className='text-6xl my-6 text-violet-200 mx-auto' />,
      content:
        'Generate customized statistics and summaries to analyze seismic activity over time or in specific regions.',
      button: 'See Stats Guide',
      link: '/docs/#statistic',
      gradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
    },
    {
      title: 'Easy Integration',
      icon: <FaCode className='text-6xl my-6 text-violet-300 mx-auto' />,
      content:
        'Seamlessly integrate earthquake data into dashboards, monitoring tools, GIS platforms, mobile apps, or educational projects.',
      button: 'Integration Guide',
      link: '/docs/#integration',
      gradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
    },
  ];

  return (
    <section className='relative z-30 w-full min-h-screen px-6 py-20 text-white'>
      <div className='flex flex-col justify-center items-center mb-16'>
        {/* Page Title */}
        <h2 className='text-2xl md:text-4xl text-white font-extrabold text-center mb-5 tracking-tight'>
          Introduction to TerraQuake API
        </h2>

        {/* Description */}
        <p className='text-white text-lg w-[95%] lg:w-6xl mx-auto'>
          Earthquakes are natural phenomena caused by a sudden release of energy
          in the Earth's crust, generating seismic waves. Understanding and
          monitoring them is crucial for risk management and scientific
          research. TerraQuake API is designed to provide reliable and
          accessible earthquake data through a modern and developer-friendly
          interface.
        </p>

        <p className='sm:text-sm md:text-lg mt-6 mx-auto max-w-3xl text-center'>
          Here's what you can do with it:
        </p>
      </div>

      {/* Cards container */}
      <div className='max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6 md:mb-16 p-6 md:p-0'>
          {introCard.map((item, index) => (
            <div
              key={item.title}
              className='group relative'
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`,
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className='relative bg-gradient-to-br from-white/5 to-violet-950/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-purple-400/30 h-full'>
                <div className='flex flex-col items-center h-full'>
                  <h2 className='text-xl md:text-2xl font-bold text-white mb-5 relative'>
                    {item.title}
                    <div
                      className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-transparent transition-all duration-500 ${
                        hoveredCard === index ? 'w-full' : 'w-0'
                      }`}
                    />
                  </h2>
                  <div className='mb-3 mx-auto'>{item.icon}</div>
                  <p className='my-6 text-gray-300 leading-relaxed text-sm md:text-base flex-grow'>
                    {item.content}
                  </p>
                  {/* CTA Button */}
              <button
                onClick={() => (window.location.href = item.link)}
                className='w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium py-3 px-6 rounded-full text-sm md:text-base hover:scale-105 transform transition duration-300 cursor-pointer'
                aria-label={`Navigate to ${item.title} page`}
              >
                {item.button}
              </button>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}
