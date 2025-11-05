import '@/components/apiPlayground/ApiPlayground.css';
import ViewMap from '@/components/map/ViewMap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '@pages/noPage/MetaData';
import ApiPlayground from '@/components/apiPlayground/ApiPlayground';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { motion } from 'framer-motion';
import EarthquakesEndpointsData from '../../data/EarthquakesEndpointsData.json';
import MagnitudeLegend from '@/components/magnitudeLegend/MagnitudeLegend';

export default function ExploreData() {
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
              Explore Data for TerraQuake API
            </h1>
            <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl mx-auto'>
              Explore and interact with real-time earthquake data. Visualize
              seismic events directly on the interactive map, and download the
              map for your own analysis. By clicking on “Switch to Tabular
              View”, you can access the tabulated section of recent seismic
              events, where each record includes the event date and time (UTC),
              magnitude, depth (km), latitude, longitude, and location. You can
              also search events by location, sort the table by date, and export
              the data in CSV format for further analysis or research. Stay
              informed and monitor global seismic activity with ease.
            </p>
            <div className='py-16'>
              <Link
                to='/explore-data/table-earthquakes'
                className='py-4 px-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
              >
                Switch to Tabular View
              </Link>
            </div>
          </motion.div>

          <div className='grid grid-cols-1 lg:grid-cols-1 gap-10'>
            <ApiPlayground
              title='Earthquakes'
              endpoints={EarthquakesEndpointsData}
              setData={setEarthquakeData}
            />
            <ViewMap earthquakeData={earthquakeData} />
          </div>
          {/* Magnitude Legend Component */}
          <div className='grid grid-cols-1 lg:grid-cols-1 gap-10'>
            <div className='text-center mb-4'>
              <h2 className='text-3xl md:text-5xl font-bold mb-2'>
                Seismic Magnitude Legend
              </h2>
              <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
                Magnitudes measure the energy released by an earthquake.
                Different scales are used depending on the type of waves
                recorded and the distance from the epicenter.
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
