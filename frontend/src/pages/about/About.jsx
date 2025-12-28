import './About.css';
import { useState } from 'react';
import MetaData from '@pages/noPage/MetaData';
import {
  FaGlobeAmericas,
  FaLightbulb,
  FaChartLine,
  FaCode,
  FaBalanceScale,
  FaHandsHelping,
  FaUserAstronaut,
  FaUsers,
} from 'react-icons/fa';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { motion } from 'framer-motion';
import Metrics from '@/components/metrics/Metrics';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation('translation');

  const [hoveredCard, setHoveredCard] = useState(null);
 
  const cardSections = [
    {
      title: t('about.title_card_introduction'),
      content: t('about.description_card_introduction'),
      icon: (
        <FaGlobeAmericas className='text-purple-400 text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6' />
      ),
      gradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
    },
    {
      title: t('about.title_card_motivation'),
      content: t('about.description_card_motivation'),
      icon: (
        <FaLightbulb className='text-purple-400 text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6' />
      ),
      gradient: 'from-pink-500/10 via-purple-500/5 to-transparent',
    },
    {
      title: t('about.title_card_features'),
      content: t('about.description_card_features'),
      icon: (
        <FaChartLine className='text-purple-400 text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6' />
      ),
      gradient: 'from-violet-500/10 via-indigo-500/5 to-transparent',
    },
  ];

  const textSections = [
    {
      title: t('about.title_section_technologies'),
      content: t('about.description_section_technologies'),
      icon: (
        <FaCode className='text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105' />
      ),
    },
    {
      title: t('about.title_section_licence'),
      content: t('about.description_section_licence'),
      icon: (
        <FaBalanceScale className='text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105' />
      ),
    },
    {
      title: t('about.title_section_donations'),
      content: t('about.description_section_donations'),
      icon: (
        <FaHandsHelping className='text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105' />
      ),
    },
    {
      title: t('about.title_section_developer'),
      content: t('about.description_section_developer'),
      icon: (
        <FaUserAstronaut className='text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105' />
      ),
    },
    {
      title: t('about.title_section_collaboration'),
      content: t('about.description_section_collaboration'),
      icon: (
        <FaUsers className='text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105' />
      ),
    },
  ];

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='About TerraQuake API | Real-Time Earthquake Data & Monitoring'
        description='Learn about TerraQuake API — a powerful platform for real-time earthquake monitoring, seismic data analysis, and early warning systems. Discover our mission, vision, and use cases.'
        ogTitle='About TerraQuake API | Real-Time Seismic Data Platform'
        ogDescription="Discover TerraQuake API's mission and capabilities in delivering real-time earthquake data and monitoring solutions for developers, researchers, and safety organizations."
        twitterTitle='About TerraQuake API | Earthquake Monitoring API'
        twitterDescription='Explore TerraQuake API — your resource for real-time earthquake data, seismic analysis, and disaster prevention solutions.'
        keywords='TerraQuake API, earthquake monitoring, seismic data, earthquake detection API, real-time earthquake data, disaster prevention, seismic analysis'
      />
      {/* SEO Stuff */}

      <motion.section
        className='relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Gradient */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        {/* Content Container */}
        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white/70'>
          {/* Header Section */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              {t('about.title')}
              <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
              {t('about.description')}
            </p>
          </motion.div>

          <Metrics />
        </div>

        <div className='max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6 md:mb-16 p-6 md:p-0'>
          {cardSections.map((item, index) => (
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
                <div className='flex flex-col items-start h-full'>
                  <div className='mb-3'>{item.icon}</div>
                  <h2 className='text-xl md:text-2xl font-bold text-white mb-5 relative'>
                    {item.title}
                    <div
                      className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-transparent transition-all duration-500 ${
                        hoveredCard === index ? 'w-full' : 'w-0'
                      }`}
                    />
                  </h2>
                  <p className='text-gray-300 leading-relaxed text-sm md:text-base flex-grow'>
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='max-w-5xl mx-auto space-y-8 p-6 md:p-0'>
          {textSections.map((item, index) => (
            <div
              key={item.title}
              className='group relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 backdrop-blur-sm rounded-2xl p-8 hover:border-purple-400/20 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]'
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
              }}
            >
              <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

              <div className='flex items-center gap-4 mb-5'>
                <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-400/20 group-hover:border-purple-400/40 transition-all duration-300'>
                  {item.icon}
                </div>
                <h2 className='text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent'>
                  {item.title}
                </h2>
              </div>
              <p className='text-gray-300 leading-relaxed text-sm md:text-base pl-[60px]'>
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}
