
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
        <div className='max-w-4xl mx-auto'>
          {/* Attractive header with icon */}
          <div className='flex flex-col items-center justify-center mb-12'>
            <div className='bg-indigo-700 rounded-full p-4 shadow-lg mb-4'>
              <svg width='40' height='40' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='text-white'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
            </div>
            <h1 className='text-4xl md:text-6xl font-extrabold text-center mb-2 drop-shadow-lg'>TerraQuake API Docs</h1>
            <p className='text-lg text-gray-200 text-center max-w-2xl mb-4'>
              Welcome to the TerraQuake API documentation. Explore endpoints, authentication, and usage examples below.
            </p>
            {/* Quick navigation bar */}
            <nav className='flex flex-wrap gap-4 justify-center mt-4 mb-8'>
              <a href='#overview' className='text-indigo-300 hover:text-white font-semibold underline underline-offset-4'>Overview</a>
              <a href='#auth' className='text-indigo-300 hover:text-white font-semibold underline underline-offset-4'>Authentication</a>
              <a href='#endpoints' className='text-indigo-300 hover:text-white font-semibold underline underline-offset-4'>Endpoints</a>
              <a href='#example' className='text-indigo-300 hover:text-white font-semibold underline underline-offset-4'>Example</a>
              <a href='#reading' className='text-indigo-300 hover:text-white font-semibold underline underline-offset-4'>Further Reading</a>
            </nav>
          </div>

          {/* Cards for each section with improved spacing and anchors */}
          <div className='grid gap-12 md:grid-cols-2 mb-12'>
            <div id='overview' className='bg-gray-900/80 rounded-xl shadow-lg p-8 hover:scale-[1.03] hover:shadow-indigo-700 transition-all border border-indigo-700'>
              <h2 className='text-2xl font-bold mb-4 text-indigo-400'>API Overview</h2>
              <ul className='list-disc list-inside text-base text-gray-300 pl-2 space-y-2'>
                <li>The TerraQuake API provides earthquake data, geospatial queries, and user management features.</li>
                <li>All endpoints are RESTful and return JSON.</li>
                <li>Designed for reliability, speed, and ease of integration.</li>
              </ul>
            </div>

            <div id='auth' className='bg-gray-900/80 rounded-xl shadow-lg p-8 hover:scale-[1.03] hover:shadow-indigo-700 transition-all border border-indigo-700'>
              <h2 className='text-2xl font-bold mb-4 text-indigo-400'>Authentication</h2>
              <ol className='list-decimal list-inside text-base text-gray-300 pl-2 space-y-2'>
                <li>Register or log in to obtain a JWT token.</li>
                <li>Include your token in the <code className='bg-gray-700 px-2 py-1 rounded'>Authorization</code> header as <code>Bearer &lt;token&gt;</code>.</li>
                <li>Most endpoints require authentication for access.</li>
              </ol>
            </div>
          </div>

          <div id='endpoints' className='bg-gray-900/80 rounded-xl shadow-lg p-8 mb-12 hover:scale-[1.03] hover:shadow-indigo-700 transition-all border border-indigo-700'>
            <h2 className='text-2xl font-bold mb-4 text-indigo-400'>Endpoints</h2>
            <ul className='list-disc list-inside text-base text-gray-300 pl-2 space-y-2'>
              <li><span className='font-semibold text-indigo-300'>/api/earthquakes</span> – Get earthquake data</li>
              <li><span className='font-semibold text-indigo-300'>/api/users</span> – User management</li>
              <li><span className='font-semibold text-indigo-300'>/api/contact</span> – Contact form</li>
              <li><span className='font-semibold text-indigo-300'>/api/auth</span> – Authentication</li>
              {/* Add more endpoints as needed */}
            </ul>
          </div>

          <div id='example' className='bg-gray-900/80 rounded-xl shadow-lg p-8 mb-12 hover:scale-[1.03] hover:shadow-indigo-700 transition-all border border-indigo-700'>
            <h2 className='text-2xl font-bold mb-4 text-indigo-400'>Example Request</h2>
            <div className='bg-gray-950 rounded p-4 text-sm overflow-x-auto mb-2 border border-indigo-800 text-green-300 font-mono'>
              <span className='block'>GET /api/earthquakes?region=California</span>
              <span className='block'>Authorization: Bearer &lt;token&gt;</span>
            </div>
            <p className='text-base text-gray-300'>
              Replace <code>&lt;token&gt;</code> with your JWT.
            </p>
          </div>

          <div id='reading' className='bg-gray-900/80 rounded-xl shadow-lg p-8 mb-4 hover:scale-[1.03] hover:shadow-indigo-700 transition-all border border-indigo-700'>
            <h2 className='text-2xl font-bold mb-4 text-indigo-400'>Further Reading</h2>
            <ul className='list-disc list-inside text-base text-gray-300 pl-2 space-y-2'>
              <li>See the <a href='/README.md' className='text-indigo-300 underline'>README</a> for more details.</li>
              <li>Contact support for help or questions.</li>
              <li>Explore the <a href='/docs' className='text-indigo-300 underline'>API documentation</a> for advanced usage.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
