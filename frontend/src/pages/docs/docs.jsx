import React from 'react';
import MetaData from '../noPage/metaData';

export default function Docs() {
  return (
    <>
      <MetaData
        title='Docs'
        description='Docs for TerraQuake API'
      />

      <section className='relative z-30 w-full min-h-screen px-6 py-20 text-white'>
        {/* Page Header */}
        <div className='flex flex-col justify-center items-center mb-16'>
          <h1 className='text-3xl md:text-5xl font-extrabold text-center mb-4 tracking-tight'>
            TerraQuake API Documentation
          </h1>
          <p className='text-lg max-w-3xl text-center opacity-80'>
            Learn how to use the TerraQuake API with guides, examples, and
            reference documentation.
          </p>
        </div>

        <div className='max-w-5xl mx-auto space-y-16 text-left'>

          {/* Introduction */}
          <section id="intro">
            <h2 className='text-2xl font-bold mb-4'>Introduction</h2>
            <p>
              TerraQuake API provides real-time and historical earthquake data,
              including magnitude, depth, location, and timestamps. You can use
              it to build earthquake trackers, visualization dashboards, or
              research tools.
            </p>
          </section>

          {/* Getting Started */}
          <section id="getting-started">
            <h2 className='text-2xl font-bold mb-4'>Getting Started</h2>
            <p>Make your first request:</p>
            <pre className='bg-black text-green-300 p-4 rounded-md overflow-x-auto mt-2'>
{`curl -X GET "https://api.terraquakeapi.com/v1/earthquakes/recent?limit=10&page=1"`}
            </pre>
          </section>

          {/* Authentication */}
          <section id="auth">
            <h2 className='text-2xl font-bold mb-4'>Authentication</h2>
            <p>
              If authentication is required, include your API key in the header:
            </p>
            <pre className='bg-black text-green-300 p-4 rounded-md overflow-x-auto mt-2'>
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
"https://api.terraquakeapi.com/v1/earthquakes/recent"`}
            </pre>
          </section>

          {/* API Reference */}
          <section id="endpoints">
            <h2 className='text-2xl font-bold mb-6'>🌍 Earthquake API Endpoints</h2>

            <p className='mb-4'>
              All endpoints support pagination with <code>page</code> (default: 1) and <code>limit</code> (default: 50).
            </p>

            <div className="overflow-x-auto">
              <table className='w-full border border-gray-600 text-sm'>
                <thead className='bg-gray-800'>
                  <tr>
                    <th className='p-2 text-left'>Method</th>
                    <th className='p-2 text-left'>Endpoint</th>
                    <th className='p-2 text-left'>Description</th>
                    <th className='p-2 text-left'>Query Parameters</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className='p-2'>GET</td><td className='p-2'>/v1/earthquakes/recent</td><td className='p-2'>Recent earthquakes (year to today)</td><td className='p-2'>page, limit</td></tr>
                  <tr><td className='p-2'>GET</td><td className='p-2'>/v1/earthquakes/today</td><td className='p-2'>Earthquakes that occurred today</td><td className='p-2'>page, limit</td></tr>
                  <tr><td className='p-2'>GET</td><td className='p-2'>/v1/earthquakes/last-week</td><td className='p-2'>Earthquakes from the last 7 days</td><td className='p-2'>page, limit</td></tr>
                  <tr><td className='p-2'>GET</td><td className='p-2'>/v1/earthquakes/month</td><td className='p-2'>Earthquakes for a specific month/year</td><td className='p-2'>year (req), month (req), page, limit</td></tr>
                  <tr><td className='p-2'>GET</td><td className='p-2'>/v1/earthquakes/location</td><td className='p-2'>Earthquakes near a latitude/longitude</td><td className='p-2'>latitude (req), longitude (req), radius, page, limit</td></tr>
                  <tr><td className='p-2'>GET</td><td className='p-2'>/v1/earthquakes/region</td><td className='p-2'>Earthquakes in an Italian region</td><td className='p-2'>region (req), page, limit</td></tr>
                  <tr><td className='p-2'>GET</td><td className='p-2'>/v1/earthquakes/depth</td><td className='p-2'>Earthquakes at/below a depth</td><td className='p-2'>depth (req), page, limit</td></tr>
                  <tr><td className='p-2'>GET</td><td className='p-2'>/v1/earthquakes/range-time</td><td className='p-2'>Earthquakes within date range</td><td className='p-2'>startdate (req), enddate (req), page, limit</td></tr>
                  <tr><td className='p-2'>GET</td><td className='p-2'>/v1/earthquakes/magnitude</td><td className='p-2'>Earthquakes with magnitude ≥ value</td><td className='p-2'>mag (req), page, limit</td></tr>
                  <tr><td className='p-2'>GET</td><td className='p-2'>/v1/earthquakes/eventId</td><td className='p-2'>Details of a specific earthquake</td><td className='p-2'>eventId (req)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className='text-xl font-semibold mt-8'>Example Request</h3>
            <pre className='bg-black text-green-300 p-4 rounded-md overflow-x-auto'>
{`curl "https://api.terraquakeapi.com/v1/earthquakes/recent?limit=50&page=1"`}
            </pre>

            <h3 className='text-xl font-semibold mt-6'>Example Response</h3>
            <pre className='bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto'>
{`{
  "success": true,
  "code": 200,
  "status": "OK",
  "message": "Recent seismic events",
  "total": 50,
  "data": [
    {
      "type": "Feature",
      "properties": {
        "eventId": 44278572,
        "originId": 140102761,
        "time": "2025-09-26T19:33:46.440000",
        "author": "SURVEY-INGV",
        "magType": "ML",
        "mag": 1,
        "type": "earthquake",
        "place": "Costa Calabra sud-orientale (Reggio di Calabria)"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [16.2387, 37.9982, 10.5]
      }
    }
  ]
}`}
            </pre>

            <h3 className='text-xl font-semibold mt-6'>Response Fields</h3>
            <ul className="list-disc list-inside">
              <li><code>success</code> – Whether the request was successful</li>
              <li><code>code</code> – HTTP status code</li>
              <li><code>status</code> – Status message</li>
              <li><code>message</code> – Summary of the response</li>
              <li><code>total</code> – Total number of events returned</li>
              <li><code>data</code> – Array of seismic event objects</li>
              <li><code>properties.eventId</code> – Unique event ID</li>
              <li><code>properties.time</code> – Event timestamp (ISO 8601)</li>
              <li><code>properties.mag</code> – Magnitude of the earthquake</li>
              <li><code>properties.place</code> – Location description</li>
              <li><code>geometry.coordinates</code> – [longitude, latitude, depth]</li>
            </ul>
          </section>

          {/* Error Codes */}
          <section id="errors">
            <h2 className='text-2xl font-bold mb-4'>Error Codes</h2>
            <table className='w-full border border-gray-600 text-sm'>
              <thead className='bg-gray-800'>
                <tr>
                  <th className='p-2 text-left'>Code</th>
                  <th className='p-2 text-left'>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className='p-2'>200</td><td className='p-2'>Success</td></tr>
                <tr><td className='p-2'>400</td><td className='p-2'>Bad Request</td></tr>
                <tr><td className='p-2'>401</td><td className='p-2'>Unauthorized</td></tr>
                <tr><td className='p-2'>404</td><td className='p-2'>Not Found</td></tr>
                <tr><td className='p-2'>429</td><td className='p-2'>Too Many Requests</td></tr>
              </tbody>
            </table>
          </section>

          {/* Rate Limits */}
          <section id="limits">
            <h2 className='text-2xl font-bold mb-4'>Rate Limits</h2>
            <p>
              Default limit: <strong>60 requests/minute per IP</strong>.  
              If exceeded, the API returns <code>429 Too Many Requests</code>.
            </p>
          </section>

          {/* FAQ */}
          <section id="faq">
            <h2 className='text-2xl font-bold mb-4'>FAQ</h2>
            <p><strong>Q: Do I need an API key?</strong><br />A: Not for basic usage, but some endpoints may require it.</p>
            <p className='mt-4'><strong>Q: How often is data updated?</strong><br />A: Near real-time, within a few minutes of seismic event detection.</p>
          </section>
        </div>
      </section>
    </>
  );
}
