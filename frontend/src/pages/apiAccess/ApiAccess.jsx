import MetaData from '@pages/noPage/MetaData';
import { motion } from 'framer-motion';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { API_BASE } from '@/data/BaseApi';
import { CopyButton } from '@components/utils/CopyButton';
import { useTranslation } from 'react-i18next';
import EndpointEarthquakes from './EndpointEarthquakes';
import ParametersEarthquakes from './ParametersEarthquakes';
import ExampleEarthquakes from './ExampleEarthquakes';
import ExampleStations from './ExampleStations';
import EndpointStations from './EndpointStations';
import ParametersStations from './ParametersStations';

export default function ApiAccess() {
  const { t } = useTranslation('translation');

  const urlEndpoint = {
    earthquakes: `${API_BASE}/v1/earthquakes`,
    stations: `${API_BASE}/v1/stations`,
  };

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='API Access | TerraQuake API - Real-Time Earthquake Data'
        description='Access TerraQuake API to integrate real-time earthquake monitoring and seismic data into your applications. Explore our documentation and start building earthquake-aware solutions.'
        ogTitle='API Access | TerraQuake API - Real-Time Earthquake Monitoring'
        ogDescription='Get API access to TerraQuake — the real-time earthquake data platform. Integrate seismic monitoring into your projects with our easy-to-use API.'
        twitterTitle='API Access | TerraQuake API - Earthquake Data API'
        twitterDescription='Access TerraQuake API for real-time earthquake data, seismic analysis, and monitoring capabilities. Start your integration today.'
        keywords='TerraQuake API access, earthquake data API, real-time earthquake API, seismic monitoring API, API documentation, earthquake detection'
      />
      {/* SEO Stuff */}

      {/* Main Section */}
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
        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
          {/* Header Section */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              {t('api_access.title')}
              <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left mx-auto text-white/70 max-w-7xl'>
              {t('api_access.description')}
            </p>
          </motion.div>

          {/* Get Started Section */}
          <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-14'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              {t('api_access.subtitle')}
            </h2>
            <p className='text-white/80 mb-4'>
              {t('api_access.info')}
            </p>
            <p className='text-white/80'>
              {t('api_access.contact')}
              <br />
              <span className='text-pink-300 font-semibold'>
                support@terraquakeapi.com
              </span>
            </p>
          </div>

          {/* Base URL */}
          <div className='mb-14'>
            <h3 className='text-xl font-bold text-white mb-2'>Base URL</h3>
            <pre className='flex justify-between mt-2 bg-black/30 border border-white/10 rounded-xl p-4 text-white/90 text-sm overflow-x-auto'>
              <span className='text-pink-400'>{t('api_access.earthquakes')} </span>
              <code>{urlEndpoint.earthquakes}</code>
              <CopyButton text={urlEndpoint.earthquakes} />
            </pre>
            <pre className='flex justify-between mt-2 bg-black/30 border border-white/10 rounded-xl p-4 text-white/90 text-sm overflow-x-auto'>
              <span className='text-pink-400'>{t('api_access.stations')} </span>
              <code>{urlEndpoint.stations}</code>
              <CopyButton text={urlEndpoint.stations} />
            </pre>
          </div>

          {/* Endpoint Earthquakes List / Table */}
          <EndpointEarthquakes />

          {/* Query Parameters Earthquakes */}
          <ParametersEarthquakes />

          {/* Quick Examples Earthquakes and Stations */}
          <ExampleEarthquakes />

          {/* Endpoint Stations List / Table */}
          <EndpointStations />

          {/* Query Parameters Stations */}
          <ParametersStations />

          {/* Quick Examples Stations */}
          <ExampleStations />

          {/* Future Access Section */}
          <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              {t('api_access.title_future_access')}
            </h2>
            <p className='text-white/80'>
              {t('api_access.description_future_access')}
            </p>
            <ul className='list-disc list-inside text-white/70 mt-3 space-y-1'>
              <li>
                <span className='font-semibold text-white'>
                  {t('api_access.free_developer')}
                </span>{' '}
                {t('api_access.limited_non_commercial')}
              </li>
              <li>
                <span className='font-semibold text-white'>
                  {t('api_access.research_tier')}
                </span>{' '}
                {t('api_access.extended_academic')}
              </li>
              <li>
                <span className='font-semibold text-white'>
                  {t('api_access.enterprise_tier')}
                </span>{' '}
                {t('api_access.real_time_alert')}
              </li>
            </ul>
          </div>
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}
