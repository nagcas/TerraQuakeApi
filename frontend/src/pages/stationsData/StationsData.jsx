import React, { useState } from 'react';
import MetaData from '../noPage/MetaData';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BackToTopButton from '@/components/utils/BackToTopButton';
import ApiPlayground from '@/components/apiPlayground/ApiPlayground';
import StationsEndpointsData from '../../data/StationsEndpointsData.json';

export default function StationsData() {
  const [stationData, setStationData] = useState(null);

  return (
    <>
      <MetaData
        title='Stations Data | TerraQuake API - Global Seismic Stations Network'
        description='Explore detailed information about global seismic stations connected to the TerraQuake API network.'
        ogTitle='Stations Data | TerraQuake API - Global Seismic Stations Network'
        ogDescription='Access data from worldwide seismic monitoring stations through TerraQuake API and analyze real-time activity.'
        twitterTitle='Stations Data | TerraQuake API'
        twitterDescription='View and analyze seismic station data worldwide using TerraQuake API’s Stations Data tools.'
        keywords='TerraQuake API stations, seismic stations data, global earthquake stations, seismograph network, real-time seismic monitoring'
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
              Stations Data for TerraQuake API
            </h1>
            <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl mx-auto'>
              Explore and analyze data from global seismic monitoring stations.
              Visualize station locations on the interactive map, view key
              parameters such as station code, network, country, latitude,
              longitude, and operational status. By clicking on “Switch to
              Tabular View”, you can access a structured table containing
              detailed station information. You can also search stations by
              location or code, sort the table by network or country, and export
              the data in CSV format for research or analysis. Gain insights
              into the worldwide seismograph network and track real-time
              monitoring capabilities with ease.
            </p>

            <div className='mt-16'>
              <Link
                to='/explore-data/table-stations'
                className='py-4 px-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
              >
                Switch to Tabular View
              </Link>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-1 gap-10'>
              <ApiPlayground
                title='Stations'
                endpoints={StationsEndpointsData}
                setData={setStationData}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}
