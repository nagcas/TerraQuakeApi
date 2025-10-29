import './ApiDocs.css';
import { useState } from 'react';
import Spinner from '../spinner/Spinner';

export default function ApiDocsEarthquakes({ setEarthquakeData }) {
  const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;

  const [activeTab, setActiveTab] = useState('recent');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      title: 'recent',
      description: `
This endpoint retrieves all recent seismic events from the beginning of the year until today via the TerraQuake API sorted from the most recent to the least recent. It provides users with insight into ongoing seismic activity for the current year. The response includes details such as magnitude, location, depth, time, and unique event ID.9`,
      query: '?limit=50&page=1',
      example: '/v1/earthquakes/recent?limit=50&page=1',
      method: 'GET',
    },
    {
      title: 'today',
      description: `
This endpoint retrieves all seismic events that occurred today (from 00:00 UTC to the current time) from the TerraQuake API. It allows users to monitor real-time seismic activity and provides a daily overview of ongoing earthquakes. The response includes detailed information such as magnitude, location, depth, event time, and coordinates.`,
      query: '?limit=50&page=1',
      example: '/v1/earthquakes/today?limit=50&page=1',
      method: 'GET',
    },
    {
      title: 'last-week',
      description: `
This endpoint retrieves all seismic events that occurred in the last 7 days from the TerraQuake API.
It allows users to monitor and analyze recent seismic activity over the past week, providing insights into short-term trends and regional patterns.`,
      query: '?limit=50&page=1',
      example: '/v1/earthquakes/last-week?limit=50&page=1',
      method: 'GET',
    },
    {
      title: 'month',
      description: `
This endpoint retrieves all seismic events that occurred during a specific month and year from the TerraQuake API.
It allows users to explore historical earthquake data for a given period. The response includes detailed event information such as magnitude, location, depth, and timestamp.`,
      query: '?year=2025&month=03&limit=50&page=1',
      example: '/v1/earthquakes/month?year=2025&month=03&limit=50&page=1',
      method: 'GET',
    },
    {
      title: 'location',
      description: `
This endpoint fetches seismic events close to a given geographical location, defined by latitude and longitude, with an optional search radius. It retrieves earthquakes that occurred from the beginning of the year up to the current date, allowing users to filter recent events based on their proximity to a specific point of interest.`,
      query:
        '?latitude=40.835459&longitude=14.117358&radius=50&limit=50&page=1',
      example:
        '/v1/earthquakes/location?latitude=40.835459&longitude=14.117358&radius=50&limit=50&page=1',
      method: 'GET',
    },
    {
      title: 'region',
      description: `
This endpoint retrieves all seismic events that occurred within a specific Italian region from the TerraQuake API, 
from the start of the current year up to today. It allows users to filter earthquakes by regional boundaries 
for localized seismic analysis. The response includes key data such as magnitude, location, depth, and time.`,
      query: '?region=Campania&limit=50&page=1',
      example: '/v1/earthquakes/region?region=Campania&limit=50&page1',
      method: 'GET',
    },
    {
      title: 'depth',
      description: `
This endpoint retrieves all seismic events that occurred at a specific focal depth, measured in kilometers, 
from the TerraQuake API, from the start of the current year up to today. 
It allows users to analyze earthquakes based on their depth, which can help assess their potential surface impact.`,
      query: '?depth=10&limit=50&page=1',
      example: '/v1/earthquakes/depth?depth=10&limit=50&page=1',
      method: 'GET',
    },
    {
      title: 'range-time',
      description: `
This endpoint retrieves all seismic events that occurred within a specific time range, using a custom start and end date.
It allows users to query historical earthquake data over any desired period, making it ideal for research, reports, or time-based visualizations.`,
      query: '?startdate=2025-01-01&enddate=2025-03-30&limit=50&page=1',
      example:
        '/v1/earthquakes/range-time?startdate=2025-01-01&enddate=2025-03-30&limit=50&page=1',
      method: 'GET',
    },
    {
      title: 'magnitude',
      description: `
This endpoint retrieves all seismic events that have a specific or greater magnitude from the TerraQuake API, 
from the start of the current year up to today. 
It is useful for filtering earthquakes based on their strength and analyzing seismic intensity patterns over time or across regions.`,
      query: '?mag=1&limit=50&page=1',
      example: '/v1/earthquakes/magnitude?mag=1&limit=50&page=1',
      method: 'GET',
    },
    {
      title: 'eventId',
      description: `
This endpoint retrieves a specific seismic event by its unique event ID from the TerraQuake API.
It allows users to access detailed information about a single earthquake event, including magnitude, location, depth, and precise timestamp.`,
      query: '?eventId=44085192',
      example: '/v1/earthquakes/eventId?eventId=44085192',
      method: 'GET',
    },
  ];

  const handleTest = async (url) => {
    console.log(url);
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}` + url);
      const data = await res.json();
      setResponseData(data);
      setEarthquakeData(data); // Pass data to parent component
    } catch (err) {
      setResponseData({ error: 'Request failed', err });
      setEarthquakeData(null); // Clear parent data on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-full text-white  pb-0 py-10 min-h-screen'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>TerraQuake API</h1>
        <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
          Explore real-time seismic data powered by INGV. Use the endpoints
          below to query earthquake events in Italy and beyond.
        </p>
      </div>

      <div className='p-5'>
        <h2 className='text-center text-2xl'>Earthquakes</h2>
      </div>

      <div className='max-w-6xl mx-auto'>
        {/* Tabs */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6'>
          {endpoints.map((ep) => (
            <button
              key={ep.title}
              onClick={() => {
                setActiveTab(ep.title);
                setResponseData(null);
              }}
              className={`py-2 px-4 rounded-full font-semibold transition-colors ${activeTab === ep.title
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white cursor-pointer'
                  : 'bg-white/10 hover:bg-pink-500 text-white cursor-pointer'
                }`}
              aria-label='Select endpoint for test preview'
            >
              {ep.title}
            </button>
          ))}
        </div>

        {/* Content */}
        {endpoints.map((ep) =>
          activeTab === ep.title ? (
            <div
              key={ep.title}
              className='bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl'
            >
              <h2 className='text-md font-semibold text-purple-400 mb-2'>
                <div className='flex flex-col gap-4'>
                  <span>
                    {ep.method} {ep.title}
                  </span>
                  <span className='overflow-auto whitespace-pre'>
                    URL: {BACKEND_URL}
                    {ep.example}
                  </span>
                </div>
              </h2>
              <p className='text-gray-300 mt-4 mb-4 whitespace-pre-wrap'>
                {ep.description}
              </p>

              <div className='mb-4'>
                <p className='text-white font-medium mb-4'>Query Parameters:</p>
                <pre className='bg-white/10 text-gray-300 rounded-md p-3 overflow-auto whitespace-pre'>
                  {ep.query}
                </pre>
              </div>

              <div className='mb-4'>
                <p className='text-white font-medium'>Example:</p>
                <pre className='bg-black/30 text-green-400 text-sm rounded-md p-4 overflow-auto whitespace-pre'>
                  {`fetch('${BACKEND_URL}${ep.example}')
      .then(res => res.json())
        .then(data => console.log(data));`}
                </pre>
              </div>

              <div className='mb-6'>
                <button
                  onClick={() => handleTest(ep.example)}
                  className='bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-full hover:scale-105 transform transition duration-300 cursor-pointer'
                  aria-label='Button to preview test endpoint'
                >
                  Test this endpoint
                </button>
              </div>

              {loading && (
                <Spinner />
              )}

              {responseData && (
                <div className='bg-black/40 rounded-lg p-4 text-sm text-yellow-400 max-h-[400px] overflow-auto'>
                  <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
              )}
            </div>
          ) : null
        )}
      </div>
    </section>
  );
}
