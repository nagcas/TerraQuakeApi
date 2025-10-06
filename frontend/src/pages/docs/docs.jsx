import React from 'react';
import MetaData from '../noPage/metaData';

// ...existing code...
export default function Docs() {
  return (
    <>
      <MetaData
        title='Docs'
        description='Documentation Page of TerraQuake'
      />
      <section className='relative z-30 w-full min-h-screen px-6 py-20 bg-gradient-to-br from-indigo-900 via-gray-900 to-gray-800 text-white'>
        <div className='max-w-5xl mx-auto'>

          {/* Header Section */}
          <div className='flex flex-col items-center justify-center mb-14 text-center'>
            <div className='bg-indigo-700 rounded-full p-4 shadow-lg shadow-indigo-800/40 mb-4'>
              <svg width='40' height='40' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='text-white'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <h1 className='text-4xl md:text-6xl font-extrabold mb-3 drop-shadow-lg tracking-tight'>
              TerraQuake API Documentation
            </h1>
            <p className='text-lg text-gray-200 max-w-2xl mb-6 leading-relaxed'>
              Access global earthquake data, analyze seismic trends, and integrate real-time geospatial information into your applications.
            </p>

            {/* Quick Navigation */}
            <nav className='flex flex-wrap justify-center gap-5 mt-2 mb-10'>
              <a href='#overview' className='text-indigo-300 hover:text-white font-semibold underline underline-offset-4 transition-colors'>Overview</a>
              <a href='#auth' className='text-indigo-300 hover:text-white font-semibold underline underline-offset-4 transition-colors'>Authentication</a>
              <a href='#endpoints' className='text-indigo-300 hover:text-white font-semibold underline underline-offset-4 transition-colors'>Endpoints</a>
              <a href='#example' className='text-indigo-300 hover:text-white font-semibold underline underline-offset-4 transition-colors'>Example</a>
              <a href='#reading' className='text-indigo-300 hover:text-white font-semibold underline underline-offset-4 transition-colors'>Further Reading</a>
            </nav>
          </div>

          {/* Overview & Authentication */}
          <div className='grid gap-10 md:grid-cols-2 mb-12'>
            <div
              id='overview'
              className='bg-gray-900/80 rounded-xl shadow-lg shadow-indigo-900/40 p-8 border border-indigo-700 hover:scale-[1.03] hover:shadow-indigo-700 transition-transform duration-300'
            >
              <h2 className='text-2xl font-bold mb-4 text-indigo-400'>API Overview</h2>
              <ul className='list-disc list-inside text-base text-gray-300 space-y-2'>
                <li>
                  <span className='text-indigo-300 font-semibold'>Purpose:</span> The TerraQuake API provides live and historical earthquake data, supporting scientific analysis and alert systems.
                </li>
                <li>
                  <span className='text-indigo-300 font-semibold'>Data Sources:</span> Aggregates from USGS, EMSC, and global seismograph networks.
                </li>
                <li>
                  <span className='text-indigo-300 font-semibold'>Format:</span> RESTful endpoints returning JSON data for easy integration.
                </li>
                <li>
                  <span className='text-indigo-300 font-semibold'>Use Cases:</span> Disaster prediction dashboards, alert systems, and geospatial analytics.
                </li>
              </ul>
            </div>

            <div
              id='auth'
              className='bg-gray-900/80 rounded-xl shadow-lg shadow-indigo-900/40 p-8 border border-indigo-700 hover:scale-[1.03] hover:shadow-indigo-700 transition-transform duration-300'
            >
              <h2 className='text-2xl font-bold mb-4 text-indigo-400'>Authentication</h2>
              <ol className='list-decimal list-inside text-base text-gray-300 space-y-2'>
                <li>Sign up at <code className='bg-gray-700 px-2 py-1 rounded'>/api/register</code> to receive your API key or JWT token.</li>
                <li>Include the token in your headers as:  
                  <code className='bg-gray-700 px-2 py-1 rounded block mt-1'>Authorization: Bearer &lt;your_token&gt;</code>
                </li>
                <li>Tokens expire every 24 hours. Use <code className='bg-gray-700 px-2 py-1 rounded'>/api/auth/refresh</code> to renew.</li>
                <li>Public endpoints like recent quakes may not require authentication.</li>
              </ol>
            </div>
          </div>

          {/* Endpoints Section */}
          <div
            id='endpoints'
            className='bg-gray-900/80 rounded-xl shadow-lg shadow-indigo-900/40 p-8 mb-12 border border-indigo-700 hover:scale-[1.03] hover:shadow-indigo-700 transition-transform duration-300'
          >
            <h2 className='text-2xl font-bold mb-4 text-indigo-400'>Available Endpoints</h2>
            <ul className='list-disc list-inside text-base text-gray-300 space-y-3'>
              <li>
                <span className='font-semibold text-indigo-300'>GET /api/earthquakes</span> – Retrieve recent or historical earthquake data.
              </li>
              <li>
                <span className='font-semibold text-indigo-300'>GET /api/earthquakes/:id</span> – Fetch detailed information about a specific event.
              </li>
              <li>
                <span className='font-semibold text-indigo-300'>POST /api/alerts</span> – Create custom alert rules based on magnitude or region.
              </li>
              <li>
                <span className='font-semibold text-indigo-300'>GET /api/stats/global</span> – Access summarized seismic statistics worldwide.
              </li>
              <li>
                <span className='font-semibold text-indigo-300'>GET /api/users/profile</span> – View your account and API usage details.
              </li>
            </ul>
          </div>

          {/* Example Request */}
          <div
            id='example'
            className='bg-gray-900/80 rounded-xl shadow-lg shadow-indigo-900/40 p-8 mb-12 border border-indigo-700 hover:scale-[1.03] hover:shadow-indigo-700 transition-transform duration-300'
          >
            <h2 className='text-2xl font-bold mb-4 text-indigo-400'>Example API Request</h2>
            <div className='bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto mb-3 border border-indigo-800 text-green-300 font-mono'>
              <span className='block'>GET /api/earthquakes?region=Japan&amp;min_magnitude=5</span>
              <span className='block'>Authorization: Bearer &lt;token&gt;</span>
            </div>
            <p className='text-base text-gray-300 mb-2'>
              The above request returns all earthquakes in Japan with magnitude greater than 5.0.
            </p>
            <p className='text-base text-gray-300'>
              To visualize this data, integrate the response into map APIs such as Leaflet or Google Maps.
            </p>
          </div>

          {/* Further Reading */}
          <div
            id='reading'
            className='bg-gray-900/80 rounded-xl shadow-lg shadow-indigo-900/40 p-8 mb-4 border border-indigo-700 hover:scale-[1.03] hover:shadow-indigo-700 transition-transform duration-300'
          >
            <h2 className='text-2xl font-bold mb-4 text-indigo-400'>Further Reading & Support</h2>
            <ul className='list-disc list-inside text-base text-gray-300 space-y-2'>
              <li>Visit our <a href='/README.md' className='text-indigo-300 underline hover:text-indigo-200 transition-colors'>README</a> for setup and usage instructions.</li>
              <li>Check out <a href='/docs/api-reference' className='text-indigo-300 underline hover:text-indigo-200 transition-colors'>API Reference</a> for parameters and schemas.</li>
              <li>Contact <a href='mailto:support@terraquake.io' className='text-indigo-300 underline hover:text-indigo-200 transition-colors'>support@terraquake.io</a> for queries or issues.</li>
              <li>Explore our <a href='/examples' className='text-indigo-300 underline hover:text-indigo-200 transition-colors'>Developer Examples</a> to learn practical integrations.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
