import '@/components/apiPlayground/ApiPlayground.css';
import ViewMap from '@/components/map/ViewMap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '@pages/noPage/MetaData';
import ApiPlayground from '@/components/apiPlayground/ApiPlayground';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { motion } from 'framer-motion';
import EarthquakesEndpointsData_en from '../../data/EarthquakesEndpointsData_en.json' with { type: 'json' };
import EarthquakesEndpointsData_it from '../../data/EarthquakesEndpointsData_it.json' with { type: 'json' };
import EarthquakesEndpointsData_es from '../../data/EarthquakesEndpointsData_es.json' with { type: 'json' };
import MagnitudeLegend from '@/components/magnitudeLegend/MagnitudeLegend';
import { useTranslation } from 'react-i18next';

export default function ExploreData() {
  const { t, i18n } = useTranslation('translation');
  console.log(i18n.language);

  const [earthquakeData, setEarthquakeData] = useState(null);

  return (
    <>
      <MetaData
        title='Explore Data | TerraQuake API - Real-Time Earthquake Data'
        description='Discover and explore real-time earthquake data with TerraQuake API.'
        ogTitle='Explore Data | TerraQuake API - Real-Time Earthquake Data'
        ogDescription='Dive into TerraQuake API’s Explore Data section to access live and historical seismic data.'
        twitterTitle='Explore Data | TerraQuake API'
        twitterDescription='Access real-time and historical earthquake data through TerraQuake API’s Explore Data tools.'
        keywords='TerraQuake API data, earthquake data API, seismic data explorer'
      />

      <motion.section
        className='relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
          <motion.div
            className='mb-16 text-center'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl md:text-5xl text-white text-center font-extrabold tracking-tighter mb-4'>
              {t('explore_data.title')}
            </h1>
            <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl mx-auto'>
              {t('explore_data.description')}
            </p>
            <div className='py-16'>
              <Link
                to='/explore-data/table-earthquakes'
                className='py-4 px-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
              >
                {t('explore_data.button_tabular')}
              </Link>
            </div>
          </motion.div>

          <div className='grid grid-cols-1 lg:grid-cols-1 gap-10'>
            {i18n.language === 'en' && (
              <ApiPlayground
                title={t('explore_data.title_earthquakes')}
                endpoints={EarthquakesEndpointsData_en}
                setData={setEarthquakeData}
              />
            )}
            {i18n.language === 'it' && (
              <ApiPlayground
                title={t('explore_data.title_earthquakes')}
                endpoints={EarthquakesEndpointsData_it}
                setData={setEarthquakeData}
              />
            )}
            {i18n.language === 'es' && (
              <ApiPlayground
                title={t('explore_data.title_earthquakes')}
                endpoints={EarthquakesEndpointsData_es}
                setData={setEarthquakeData}
              />
            )}
            <ViewMap earthquakeData={earthquakeData} />
          </div>
          {/* Magnitude Legend Component */}
          <div className='grid grid-cols-1 lg:grid-cols-1 gap-10'>
            <div className='text-center mb-4'>
              <h2 className='text-3xl md:text-5xl font-bold mb-2'>
                {t('explore_data.title_legend')}
              </h2>
              <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
                {t('explore_data.description_legend')}
              </p>
            </div>
            <MagnitudeLegend />
          </div>
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}
