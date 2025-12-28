import { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaChartLine, FaCode, FaFilter } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

export default function Info() {
  const { t } = useTranslation('translation');

  const [hoveredCard, setHoveredCard] = useState(null);
  const introCard = [
    {
      title: t('info.title_event'),
      icon: (
        <FaRegCalendarAlt className='text-6xl my-6 text-violet-300 mx-auto' />
      ),
      content: t('info.content_event'),
      button: t('info.button_event'),
      link: '/explore-data/earthquakes',
      gradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
    },
    {
      title: t('info.title_advanced'),
      icon: <FaFilter className='text-6xl my-6 text-violet-300 mx-auto' />,
      content: t('info.content_advanced'),
      button: t('info.button_advanced'),
      link: '/explore-data/earthquakes',
      gradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
    },
    {
      title: t('info.title_statistical'),
      icon: <FaChartLine className='text-6xl my-6 text-violet-200 mx-auto' />,
      content: t('info.content_statistical'),
      button: t('info.button_statistical'),
      link: '/docs-earthquakes',
      gradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
    },
    {
      title: t('info.title_easy'),
      icon: <FaCode className='text-6xl my-6 text-violet-300 mx-auto' />,
      content: t('info.content_easy'),
      button: t('info.button_easy'),
      link: '/api-access',
      gradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
    },
  ];

  return (
    <section className='relative z-30 w-full min-h-screen px-6 py-20 text-white'>
      <div className='flex flex-col justify-center items-center mb-16'>
        {/* Page Title */}
        <h2 className='text-2xl md:text-4xl text-white font-extrabold text-center mb-5 tracking-tight'>
          {t('info.title_h2')}
        </h2>

        {/* Description */}
        <p className='text-white text-lg w-[95%] xl:w-6xl mx-auto'>
          {t('info.description_p')}
        </p>

        <p className='sm:text-sm md:text-lg mt-6 mx-auto max-w-3xl text-center'>
          {t('info.subdescription_p')}
        </p>
      </div>

      {/* Cards container */}
      <div 
        className='max-w-7xl mx-auto grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-6 md:mb-16 p-6 md:p-0'
      >
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

            <div className='relative bg-gradient-to-br from-white/5 to-violet-950/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:border-purple-400/30 h-full'>
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
