import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaChartLine, FaCode, FaFilter } from 'react-icons/fa6';

export default function Info() {
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
    },
    {
      title: 'Advanced Filtering',
      icon: <FaFilter className='text-6xl my-6 text-violet-300 mx-auto' />,
      content:
        'Query earthquakes by time range, location, magnitude interval, and distance radius to get exactly the data you need.',
      button: 'Learn More',
      link: '/docs/#filtering',
    },
    {
      title: 'Statistical Insights',
      icon: <FaChartLine className='text-6xl my-6 text-violet-200 mx-auto' />,
      content:
        'Generate customized statistics and summaries to analyze seismic activity over time or in specific regions.',
      button: 'See Stats Guide',
      link: '/docs/#statistic',
    },
    {
      title: 'Easy Integration',
      icon: <FaCode className='text-6xl my-6 text-violet-300 mx-auto' />,
      content:
        'Seamlessly integrate earthquake data into dashboards, monitoring tools, GIS platforms, mobile apps, or educational projects.',
      button: 'Integration Guide',
      link: '/docs/#integration',
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
      <div className='w-[95%] lg:w-6xl mx-auto grid gap-6 mt-10 md:mt-16 md:grid-cols-2 xl:grid-cols-4'>
        {introCard.map((item) => (
          <div
            key={item.title}
            className='flex flex-col justify-between items-center bg-gradient-to-br from-white/5 to-violet-950/20 rounded-3xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-transform duration-500 transform scale-95 hover:scale-100 hover:brightness-110 ease-in-out'
          >
            {/* Card Title */}
            <h3 className='text-white text-xl md:text-2xl font-semibold text-center mb-4'>
              {item.title}
            </h3>

            {/* Icon */}
            <div className='mb-4'>{item.icon}</div>

            {/* Content */}
            <p className='text-slate-300 text-sm md:text-base leading-relaxed mb-6 text-center'>
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
        ))}
      </div>
    </section>
  );
}
