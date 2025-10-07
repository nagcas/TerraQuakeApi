import '@/components/apiPlayground/apiPlayground.css';
import ViewMap from '@/components/map/viewMap';
import { useState } from 'react';
import MetaData from '@pages/noPage/metaData';
import ApiPlayground from '@/components/apiPlayground/ApiPlayground';
import BackToTopButton from '@/components/utils/backToTopButton';
import { motion } from 'framer-motion';

export default function ExploreData() {
  const [earthquakeData, setEarthquakeData] = useState(null);

  const earthquakesEndpoints = [
    {
      key: 'recent',
      label: 'recent',
      method: 'GET',
      path: '/v1/earthquakes/recent',
      subtitle: 'Latest sismic events',
      description: `
This endpoint retrieves all recent seismic events from the beginning of the year until today via the TerraQuake API sorted from the most recent to the least recent. It provides users with insight into ongoing seismic activity for the current year. The response includes details such as magnitude, location, depth, time, and unique event ID.

      
        Query Parameters:
          
      - limit: (Optional) The number of earthquake events to return. Defaults to 50 if not specified.
      - page: (Optional) The page number of the results to retrieve. Defaults to 1 if not specified.`,
      params: [
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'today',
      label: 'today',
      method: 'GET',
      path: '/v1/earthquakes/today',
      subtitle: 'Today seismic events',
      description: `
This endpoint retrieves all seismic events that occurred today (from 00:00 UTC to the current time) from the TerraQuake API. It allows users to monitor real-time seismic activity and provides a daily overview of ongoing earthquakes. The response includes detailed information such as magnitude, location, depth, event time, and coordinates.
      
        Query Parameters:
        
      - limit: (Optional) The number of earthquake events to return. Default is 50 if not provided.
      - page: (Optional) The page number of the results to retrieve. Defaults to 1 if not specified.`,
      params: [
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'last-week',
      label: 'last-week',
      method: 'GET',
      path: '/v1/earthquakes/last-week',
      subtitle: 'Last 7 days',
      description: `
This endpoint retrieves all seismic events that occurred in the last 7 days from the TerraQuake API.
It allows users to monitor and analyze recent seismic activity over the past week, providing insights into short-term trends and regional patterns.
      
        Query Parameters:
        
      - limit: (Optional) The number of earthquake events to return. Default is 50 if not specified.
      - page: (Optional) The page number of the results to retrieve. Defaults to 1 if not specified.`,
      params: [
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'month',
      label: 'month',
      method: 'GET',
      path: '/v1/earthquakes/month',
      subtitle: 'By month/year',
      description: `
This endpoint retrieves all seismic events that occurred during a specific month and year from the TerraQuake API.
It allows users to explore historical earthquake data for a given period. The response includes detailed event information such as magnitude, location, depth, and timestamp.
      
        Query Parameters:
        
      - year: (Required) The target year (e.g., 2025).
      - month: (Required) The target month in numeric format (01 to 12).
      - limit: (Optional) The number of events to return. Default is 50 if not specified.
      - page: (Optional) The page number of the results to retrieve. Defaults to 1 if not specified.`,
      params: [
        {
          name: 'year',
          label: 'year',
          placeholder: '2025',
          defaultValue: '2025',
          required: true,
        },
        {
          name: 'month',
          label: 'month',
          placeholder: '03',
          defaultValue: '03',
          required: true,
        },
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'location',
      label: 'location',
      method: 'GET',
      path: '/v1/earthquakes/location',
      subtitle: 'Near latitude/longitude',
      description: `
This endpoint fetches seismic events close to a given geographical location, defined by latitude and longitude, with an optional search radius. It retrieves earthquakes that occurred from the beginning of the year up to the current date, allowing users to filter recent events based on their proximity to a specific point of interest.

        Query Parameters:

    - latitude: (Required) The latitude of the location (e.g., 40.835459).
    - longitude: (Required) The longitude of the location (e.g., 14.117358).
    - radius: (Optional) The search radius in kilometers. Default is 50 km if not specified.
    - limit: (Optional) The number of events to return. If not specified, it returns all matching events. 
	   Default is 50 km if not specified.
    - page: (Optional) The page number of the results to retrieve. Defaults to 1 if not specified.

The response includes detailed information for each event such as magnitude, coordinates, depth, and time of occurrence.`,
      params: [
        {
          name: 'latitude',
          label: 'latitude',
          placeholder: '41.7142',
          required: true,
        },
        {
          name: 'longitude',
          label: 'longitude',
          placeholder: '15.9577',
          required: true,
        },
        { name: 'radius', label: 'radius (km)', placeholder: '10' },
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'region',
      label: 'region',
      method: 'GET',
      path: '/v1/earthquakes/region',
      subtitle: 'By Italian region',
      description: `
This endpoint retrieves all seismic events that occurred within a specific Italian region from the TerraQuake API, 
from the start of the current year up to today. It allows users to filter earthquakes by regional boundaries 
for localized seismic analysis. The response includes key data such as magnitude, location, depth, and time.

      
        Query Parameters:
        
      - region: (Required) The name of the Italian region to filter by (e.g., Campania, Sicilia, Lazio). Case-insensitive.
      - limit: (Optional) The number of events to return. Defaults to 50 if not specified.
      - page: (Optional) The page number of the results to retrieve. Defaults to 1 if not specified.`,
      params: [
        {
          name: 'region',
          label: 'region',
          placeholder: 'Campania',
          required: true,
        },
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'depth',
      label: 'depth',
      method: 'GET',
      path: '/v1/earthquakes/depth',
      subtitle: 'By focal depth (km)',
      description: `
This endpoint retrieves all seismic events that occurred at a specific focal depth, measured in kilometers, 
from the TerraQuake API, from the start of the current year up to today. 
It allows users to analyze earthquakes based on their depth, which can help assess their potential surface impact.
      
        Query parameters:

      - depth: (Required) The focal depth of the earthquakes in kilometers (e.g., 10).
      - limit: (Optional) The number of events to return. Default is 10 if not specified.
      - page: (Optional) The page number of the results to retrieve. Defaults to 1 if not specified.`,
      params: [
        {
          name: 'depth',
          label: 'depth (km)',
          placeholder: '10',
          required: true,
        },
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'range-time',
      label: 'range-time',
      method: 'GET',
      path: '/v1/earthquakes/range-time',
      subtitle: 'By time range',
      description: `
This endpoint retrieves all seismic events that occurred within a specific time range, using a custom start and end date.
It allows users to query historical earthquake data over any desired period, making it ideal for research, reports, or time-based visualizations.

        Query Parameters:

      - startdate: (Required) The start date of the time range (format: YYYY-MM-DD).
      - enddate: (Required) The end date of the time range (format: YYYY-MM-DD).
      - limit: (Optional) The number of earthquake events to return. Default is 50 if not specified.
      - page: (Optional) The page number of the results to retrieve. Defaults to 1 if not specified.`,
      params: [
        {
          name: 'startdate',
          label: 'startdate',
          placeholder: 'YYYY-MM-DD',
          required: true,
        },
        {
          name: 'enddate',
          label: 'enddate',
          placeholder: 'YYYY-MM-DD',
          required: true,
        },
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'magnitude',
      label: 'magnitude',
      method: 'GET',
      path: '/v1/earthquakes/magnitude',
      subtitle: 'Min magnitude',
      description: `
This endpoint retrieves all seismic events that have a specific or greater magnitude from the TerraQuake API, 
from the start of the current year up to today. 
It is useful for filtering earthquakes based on their strength and analyzing seismic intensity patterns over time or across regions.
      
        Query Parameters:
      
      - mag: (Required) Minimum magnitude to filter by (e.g., 2 will return all events with magnitude > 2.0).
      - limit: (Optional) Number of earthquake events to return. Default is 50 if not specified.
      - page: (Optional) The page number of the results to retrieve. Defaults to 1 if not specified.`,
      params: [
        { name: 'mag', label: 'mag', placeholder: '1', required: true },
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'eventId',
      label: 'eventId',
      method: 'GET',
      path: '/v1/earthquakes/eventId',
      subtitle: 'By event ID',
      description: `
This endpoint retrieves a specific seismic event by its unique event ID from the TerraQuake API.
It allows users to access detailed information about a single earthquake event, including magnitude, location, depth, and precise timestamp.
      
        Query Parameters:
      
      - eventId: (Required) The unique identifier of the earthquake event to retrieve.`,
      params: [
        {
          name: 'eventId',
          label: 'eventId',
          placeholder: '44061482',
          required: true,
        },
      ],
    },
  ];

  return (
    <>
      {/* SEO Metadata */}
      <MetaData
        title='Explore Data | TerraQuake API - Real-Time Earthquake Data'
        description='Discover and explore real-time earthquake data with TerraQuake API. Access seismic activity information, historical data, and powerful analytics.'
        ogTitle='Explore Data | TerraQuake API - Real-Time Earthquake Data'
        ogDescription='Dive into TerraQuake API’s Explore Data section to access live and historical seismic data.'
        twitterTitle='Explore Data | TerraQuake API'
        twitterDescription='Access real-time and historical earthquake data through TerraQuake API’s Explore Data tools.'
        keywords='TerraQuake API data, earthquake data API, seismic data explorer, earthquake monitoring, real-time seismic data'
      />

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

        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
          {/* Header Section */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              Explore Data for TerraQuake API
              <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-white/70 max-w-7xl mx-auto'>
              Welcome to the <strong>TerraQuake API Playground</strong>! Explore
              and interact with earthquake data in real time. Test API queries
              with different parameters such as magnitude, location, or time
              range, view raw JSON results, and copy ready-to-use code snippets.
            </p>
          </motion.div>

          {/* Playground & Map Section */}
          <div className='grid grid-cols-1 lg:grid-cols-1 gap-10'>
            <ApiPlayground
              title='Earthquakes'
              endpoints={earthquakesEndpoints}
              setEarthquakeData={setEarthquakeData}
            />
            <ViewMap earthquakeData={earthquakeData} />
          </div>
        </div>
      </motion.section>

      {/* Floating Back-to-Top Button */}
      <BackToTopButton />
    </>
  );
}
