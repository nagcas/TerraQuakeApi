import React from 'react';
import MetaData from '../noPage/metaData';

export default function Docs() {
  return (
    <>
      <MetaData
        title='Docs'
        description='Documentation Page of TerraQuake'
      />

      <section className='relative z-30 w-full min-h-screen px-6 py-20 bg-gradient-to-br from-indigo-950 via-gray-900 to-black text-white overflow-hidden'>
        {/* Floating gradient background orbs */}
        <div className="absolute -top-32 -left-20 w-72 h-72 bg-indigo-700/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-bounce"></div>

        <div className='relative max-w-5xl mx-auto'>
          {/* Header Section */}
          <div className='flex flex-col items-center justify-center mb-16 text-center'>
            <div className='bg-gradient-to-br from-indigo-700 to-violet-700 rounded-full p-5 shadow-[0_0_25px_rgba(139,92,246,0.6)] mb-5 animate-pulse'>
              <svg width='42' height='42' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='text-white'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>

            <h1 className='text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-lg animate-fade-in'>
              TerraQuake API Docs
            </h1>
            <p className='text-lg text-gray-300 max-w-2xl mt-4 leading-relaxed'>
              Welcome to the TerraQuake API documentation — your complete guide to endpoints, authentication, and usage examples.
            </p>

            {/* Navigation */}
            <nav className='flex flex-wrap justify-center gap-5 mt-10 bg-indigo-800/20 backdrop-blur-lg px-6 py-3 rounded-full border border-indigo-600/30 shadow-lg'>
              {[
                { href: '#overview', label: 'Overview' },
                { href: '#auth', label: 'Authentication' },
                { href: '#endpoints', label: 'Endpoints' },
                { href: '#example', label: 'Example' },
                { href: '#reading', label: 'Further Reading' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className='text-indigo-300 hover:text-white font-semibold transition-all duration-300 hover:scale-105 underline-offset-4 hover:underline'
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Content Cards */}
          <div className='grid gap-12 md:grid-cols-2 mb-12'>
            {[
              {
                id: 'overview',
                title: 'API Overview',
                content: [
                  'The TerraQuake API provides earthquake data, geospatial queries, and user management features.',
                  'All endpoints are RESTful and return JSON.',
                  'Designed for reliability, speed, and ease of integration.',
                ],
              },
              {
                id: 'auth',
                title: 'Authentication',
                content: [
                  'Register or log in to obtain a JWT token.',
                  'Include your token in the Authorization header as Bearer <token>.',
                  'Most endpoints require authentication for access.',
                ],
                ordered: true,
              },
            ].map((section) => (
              <div
                key={section.id}
                id={section.id}
                className='bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-indigo-950/70 rounded-2xl shadow-lg border border-indigo-700/40 p-8 transition-all hover:shadow-indigo-600/60 hover:scale-[1.04] hover:border-indigo-500 duration-300'
              >
                <h2 className='text-2xl font-bold mb-4 text-indigo-400 tracking-wide'>{section.title}</h2>
                {section.ordered ? (
                  <ol className='list-decimal list-inside text-gray-300 space-y-2'>
                    {section.content.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ol>
                ) : (
                  <ul className='list-disc list-inside text-gray-300 space-y-2'>
                    {section.content.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Endpoints */}
          <div
            id='endpoints'
            className='bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 rounded-2xl shadow-lg p-8 mb-12 border border-indigo-700/40 hover:shadow-indigo-600/60 hover:scale-[1.03] transition-all duration-300'
          >
            <h2 className='text-2xl font-bold mb-4 text-indigo-400 tracking-wide'>Endpoints</h2>
            <ul className='list-disc list-inside text-gray-300 space-y-2'>
              <li><span className='font-semibold text-indigo-300'>/api/earthquakes</span> — Get earthquake data</li>
              <li><span className='font-semibold text-indigo-300'>/api/users</span> — User management</li>
              <li><span className='font-semibold text-indigo-300'>/api/contact</span> — Contact form</li>
              <li><span className='font-semibold text-indigo-300'>/api/auth</span> — Authentication</li>
            </ul>
          </div>

          {/* Example */}
          <div
            id='example'
            className='bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 rounded-2xl shadow-lg p-8 mb-12 border border-indigo-700/40 hover:shadow-indigo-600/60 hover:scale-[1.03] transition-all duration-300'
          >
            <h2 className='text-2xl font-bold mb-4 text-indigo-400 tracking-wide'>Example Request</h2>
            <div className='bg-gray-950/80 rounded p-4 text-sm overflow-x-auto border border-indigo-800 text-green-300 font-mono shadow-inner'>
              <span className='block'>GET /api/earthquakes?region=California</span>
              <span className='block'>Authorization: Bearer &lt;token&gt;</span>
            </div>
            <p className='text-base text-gray-300 mt-3'>
              Replace <code className='bg-gray-700 px-2 py-1 rounded text-indigo-300'>&lt;token&gt;</code> with your JWT.
            </p>
          </div>

          {/* Further Reading */}
          <div
            id='reading'
            className='bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 rounded-2xl shadow-lg p-8 border border-indigo-700/40 hover:shadow-indigo-600/60 hover:scale-[1.03] transition-all duration-300'
          >
            <h2 className='text-2xl font-bold mb-4 text-indigo-400 tracking-wide'>Further Reading</h2>
            <ul className='list-disc list-inside text-gray-300 space-y-2'>
              <li>
                See the <a href='/README.md' className='text-indigo-300 hover:text-white underline'>README</a> for more details.
              </li>
              <li>Contact support for help or questions.</li>
              <li>
                Explore the <a href='/docs' className='text-indigo-300 hover:text-white underline'>API documentation</a> for advanced usage.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
