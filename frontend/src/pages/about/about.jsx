import './about.css';
import { useEffect, useState } from 'react';
import MetaData from '@pages/noPage/metaData';
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
import axios from 'axios';
import BackToTopButton from '@/components/utils/backToTopButton';
import { motion } from 'framer-motion';

export default function About() {
  const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;
  const [hoveredCard, setHoveredCard] = useState(null);
  const [highlightMetrics, setHighlightMetrics] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [metricsError, setMetricsError] = useState(null);

  const cardSections = [
    {
      title: 'Project Introduction',
      content:
        'TerraQuake API is an open-source project designed to make seismic data more accessible, clear, and usable for developers, researchers, institutions, and communities. The goal is to provide a modern and simple interface to consult real-time earthquake information, promoting applications focused on safety and disaster prevention.',
      icon: (
        <FaGlobeAmericas className='text-purple-400 text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6' />
      ),
      gradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
    },
    {
      title: 'Motivation',
      content:
        'The project was born from the need for free and open tools that allow fast and reliable access to seismic data. By translating technical information into accessible APIs, anyone—from students to emergency app developers—can build innovative solutions to protect people and communities.',
      icon: (
        <FaLightbulb className='text-purple-400 text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6' />
      ),
      gradient: 'from-pink-500/10 via-purple-500/5 to-transparent',
    },
    {
      title: 'Key Features',
      content:
        'TerraQuake API provides access to up-to-date seismic data from official sources such as INGV, offering advanced filtering options by geographic location, magnitude, and time. The API returns JSON responses that are ready to be integrated into both web and mobile applications, complemented by clear documentation and developer-friendly support.',
      icon: (
        <FaChartLine className='text-purple-400 text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6' />
      ),
      gradient: 'from-violet-500/10 via-indigo-500/5 to-transparent',
    },
  ];

  const textSections = [
    {
      title: 'Technologies Used',
      content:
        'The backend of TerraQuake API is built with Node.js and Express.js, while MongoDB serves as the database. Key libraries such as Axios, Mongoose, dotenv, and bcryptjs are used to handle data and security efficiently. Environment management is supported with CORS and dotenv, and the project is hosted on platforms like Vercel or Render, depending on your preferred hosting solution.',
      icon: (
        <FaCode className='text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105' />
      ),
    },
    {
      title: 'Open Source License',
      content:
        'TerraQuake API is distributed under the AGPL-3.0 license. This means anyone can use, modify, and share the project freely, but any derivative works must also be released under the same license. The goal is to promote collaboration and ensure that improvements remain open and accessible to the community.',
      icon: (
        <FaBalanceScale className='text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105' />
      ),
    },
    {
      title: 'Donations & Support',
      content:
        'If you would like to support the project, you can contribute via GitHub Sponsors or make voluntary donations. Every contribution helps maintain servers, improve the API, and ensure reliable service.',
      icon: (
        <FaHandsHelping className='text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105' />
      ),
    },
    {
      title: 'About the Developer',
      content:
        'TerraQuake API is developed by Gianluca Chiaravalloti, a geologist and full-stack web developer. The project combines scientific expertise with technology to create practical applications for seismic safety.',
      icon: (
        <FaUserAstronaut className='text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105' />
      ),
    },
    {
      title: 'International Collaboration',
      content:
        'TerraQuake API is proud to have a diverse, international team of 5 collaborators from around the world. Their contributions—from backend development to frontend enhancements and testing—help ensure the project is robust, reliable, and continuously improving. Working with developers across different countries brings unique perspectives, accelerates innovation, and strengthens the global impact of the project.',
      icon: (
        <FaUsers className='text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105' />
      ),
    },
  ];

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoadingMetrics(true);
        const res = await axios.get(`${BACKEND_URL}/v1/metrics/json`);
        const data = res.data.data;

        setHighlightMetrics([
          {
            value: data.eventsProcessed?.toLocaleString() || 'N/A',
            label: 'Events Processed',
            description: 'Real-time earthquakes normalized and accessible',
          },
          {
            value: `${data.apiLatencyAvgMs} ms`,
            label: 'API Latency',
            description: 'Average API response time',
          },

          {
            value: `${Math.floor(data.uptime)} s`,
            label: 'Uptime',
            description: 'Time since last server restart',
          },
          {
            value: '24/7',
            label: 'Data monitoring',
            description: 'Continuous ingestion from trusted observatories',
          },
        ]);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setMetricsError('Unable to load metrics.');
      } finally {
        setLoadingMetrics(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000); // refresh ogni 10s
    return () => clearInterval(interval);
  }, []);

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
              About TerraQuake API.
              <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-left text-white/70 max-w-7xl'>
              A focused platform built to translate raw seismic feeds into
              developer-friendly endpoints and actionable insights for safety,
              research, and education.
            </p>
          </motion.div>

          <div className='max-w-6xl mx-auto grid gap-4 md:grid-cols-4 mb-6 md:mb-16'>
            {highlightMetrics.map((metric) => (
              <div
                key={metric.label}
                className='group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-6 backdrop-blur-sm transition-all duration-400 hover:border-purple-400/30 hover:bg-white/[0.05]'
              >
                <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent' />
                <div className='relative'>
                  <span className='text-2xl md:text-3xl font-semibold text-white tracking-tight'>
                    {metric.value}
                  </span>
                  <p className='mt-1 text-sm uppercase tracking-[0.2em] text-purple-200/70'>
                    {metric.label}
                  </p>
                  <p className='mt-3 text-sm text-gray-300 leading-relaxed'>
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
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

              <div className='relative bg-gradient-to-br from-white/5 to-violet-950/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-purple-400/30 h-full'>
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
