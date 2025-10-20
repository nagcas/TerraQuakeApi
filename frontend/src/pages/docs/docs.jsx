// Docs.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import MetaData from '../noPage/MetaData';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from './CopyButton';

export default function Docs() {
  const contentRef = useRef(null);
  const [activeId, setActiveId] = useState('getting-started');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = useMemo(
    () => [
      { id: 'getting-started', label: 'Getting Started' },
      { id: 'common-parameters', label: 'Common Parameters' },
      { id: 'response-format', label: 'Response Format' },
      { id: 'endpoints', label: 'API Endpoints' },
      { id: 'time-queries', label: 'Time-Based Queries' },
      { id: 'location-queries', label: 'Location-Based Queries' },
      { id: 'property-queries', label: 'Property-Based Queries' },
      { id: 'event-queries', label: 'Event-Based Queries' },
      { id: 'error-handling', label: 'Error Handling' },
      { id: 'code-examples', label: 'Code Examples' },
      { id: 'data-fields', label: 'Data Field Reference' },
      { id: 'support', label: 'Support & Feedback' },
      { id: 'faq', label: 'FAQ' },
    ],
    []
  );

  // Scrollspy using IntersectionObserver for accuracy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -40% 0px', // helps pick the visible section
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    const nodes = contentRef.current?.querySelectorAll('section[id]') || [];
    nodes.forEach((n) => observer.observe(n));
    return () => nodes.forEach((n) => observer.unobserve(n));
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 100; // compensate header
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setSidebarOpen(false);
  };

  // Code snippets centralized for reuse and copy buttons
  const snippets = {
    curlRecent: `curl -X GET "https://api.terraquakeapi.com/v1/earthquakes/recent?limit=10&page=1"`,
    fetchRecent: `fetch("https://api.terraquakeapi.com/v1/earthquakes/recent?limit=5")\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`,
    reactRecent: `import React, { useEffect, useState } from "react";\n\nfunction RecentEarthquakes() {\n  const [data, setData] = useState([]);\n\n  useEffect(() => {\n    fetch(\"https://api.terraquakeapi.com/v1/earthquakes/recent?limit=5\")\n      .then(res => res.json())\n      .then(json => setData(json.data || []))\n      .catch(console.error);\n  }, []);\n\n  return (\n    <ul>\n      {data.map(eq => (\n        <li key={eq.properties.eventId}>{eq.properties.place} — {eq.properties.mag}</li>\n      ))}\n    </ul>\n  );\n}\n\nexport default RecentEarthquakes;`,
    pythonRequests: `import requests\n\nurl = "https://api.terraquakeapi.com/v1/earthquakes/recent?limit=10"\nresp = requests.get(url)\nprint(resp.json())`,
    axiosNode: `const axios = require('axios');\n\naxios.get('https://api.terraquakeapi.com/v1/earthquakes/range-time', {\n  params: { startdate: '2025-09-01', enddate: '2025-09-30', limit: 100 }\n})\n.then(res => console.log(res.data))\n.catch(err => console.error(err.response?.data || err.message));`,
    curlLocation: `curl -X GET "https://api.terraquakeapi.com/v1/earthquakes/location?latitude=35.6762&longitude=139.6503&radius=500&limit=20"`,
    exampleResponse: `{\n  "success": true,\n  "code": 200,\n  "status": "OK",\n  "message": "Recent seismic events",\n  "total": 50,\n  "data": [ /* GeoJSON Feature objects */ ]\n}`,
  };

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Documentation | TerraQuake API - Earthquake Monitoring'
        description='Explore TerraQuake API: endpoints, parameters, examples, and best practices for accessing seismic data.'
        ogTitle='Documentation | TerraQuake API'
        ogDescription='Comprehensive TerraQuake API documentation for developers and researchers.'
        twitterTitle='TerraQuake API Docs'
        twitterDescription='Real-time and historical earthquake data API'
        keywords='terraquake api documentation seismic earthquake api docs'
      />
      {/* SEO Stuff */}

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='relative z-0 w-full min-h-screen pt-24 pb-12'
      >
        {/* Background Gradient/Mesh (for a classy, dark theme) */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12'>
          {/* Header Section */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              TerraQuake API Documentation.
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
              Programmatic access to global seismic event data — endpoints,
              parameters, examples, and best practices.
            </p>
          </motion.div>
          
          <div className='flex items-start justify-between mb-8'>
            {/* mobile menu toggle */}
            <div className='md:hidden'>
              <button
                onClick={() => setSidebarOpen((s) => !s)}
                className='px-3 py-2 rounded bg-slate-800/60 border border-white/10 text-white/80'
              >
                {sidebarOpen ? 'Close' : 'Menu'}
              </button>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
            {/* Sidebar */}
            <aside
              className={`col-span-1 lg:col-span-3 ${
                sidebarOpen ? 'block' : 'hidden'
              } md:block`}
            >
              <nav className='sticky top-24 bg-slate-900/50 border border-white/5 rounded-lg p-4 backdrop-blur'>
                <h4 className='text-sm font-semibold text-white mb-3'>
                  Contents
                </h4>
                <ul className='space-y-2 text-sm'>
                  {sections.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => scrollToId(s.id)}
                        className={`w-full text-left px-2 py-1 rounded transition ${
                          activeId === s.id
                            ? 'bg-pink-600/20 text-purple-300 cursor-pointer'
                            : 'text-white/70 hover:bg-white/5 hover:text-white cursor-pointer'
                        }`}
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Quick links (small footer in sidebar) */}
              <div className='mt-4 text-xs text-white/60'>
                <div>
                  API Version: <strong>1.0</strong>
                </div>
                <div className='mt-2'>Last updated: October 2025</div>
              </div>
            </aside>

            {/* Content */}
            <main
              ref={contentRef}
              className='col-span-1 lg:col-span-9 prose prose-invert max-w-none'
            >
              {/* Getting Started */}
              <section
                id='getting-started'
                className='scroll-mt-28 py-6'
              >
                <h2 className='text-2xl font-bold text-white'>
                  Getting Started
                </h2>
                <p className='text-white/80 mt-2'>
                  <strong>Base URL:</strong>{' '}
                  <code className='bg-slate-800 px-2 py-1 rounded'>
                    https://api.terraquakeapi.com
                  </code>
                </p>
                <p className='text-white/80 mt-2'>
                  <strong>Authentication:</strong> Currently no authentication
                  required — endpoints are public.
                </p>

                <h3 className='mt-4 text-lg font-semibold text-white'>
                  Rate Limits
                </h3>
                <p className='text-white/80'>
                  Fixed-window: <strong>100 requests / second per IP</strong>.
                </p>
                <p className='text-white/70 text-sm mt-2'>
                  Headers:{' '}
                  <code className='px-1 py-0.5 bg-slate-800 rounded'>
                    X-RateLimit-Limit
                  </code>
                  ,
                  <code className='px-1 py-0.5 bg-slate-800 rounded'>
                    X-RateLimit-Remaining
                  </code>
                  ,
                  <code className='px-1 py-0.5 bg-slate-800 rounded'>
                    X-RateLimit-Reset
                  </code>
                  ,
                  <code className='px-1 py-0.5 bg-slate-800 rounded'>
                    Retry-After
                  </code>
                  .
                </p>

                <div className='mt-4'>
                  <SyntaxHighlighter
                    language='bash'
                    style={atomOneDark}
                    customStyle={{
                      background: 'transparent',
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    {snippets.curlRecent}
                  </SyntaxHighlighter>
                  <div className='flex items-center mt-2'>
                    <CopyButton text={snippets.curlRecent} />
                  </div>
                </div>
              </section>

              {/* Common Parameters */}
              <section
                id='common-parameters'
                className='scroll-mt-28 py-6'
              >
                <h2 className='text-2xl font-bold text-white'>
                  Common Parameters
                </h2>
                <p className='text-white/80 mt-2'>Most endpoints accept:</p>
                <ul className='list-disc list-inside text-white/80 mt-2'>
                  <li>
                    <code>page</code> — integer, default <strong>1</strong>
                  </li>
                  <li>
                    <code>limit</code> — integer, default <strong>50</strong>,
                    max <strong>1000</strong>
                  </li>
                </ul>
                <p className='text-white/70 text-sm mt-2'>
                  Example:{' '}
                  <code className='px-1 py-0.5 bg-slate-800 rounded'>
                    ?page=2&amp;limit=100
                  </code>
                </p>
              </section>

              {/* Response Format */}
              <section
                id='response-format'
                className='scroll-mt-28 py-6'
              >
                <h2 className='text-2xl font-bold text-white'>
                  Response Format
                </h2>
                <p className='text-white/80 mt-2'>All responses follow:</p>
                <SyntaxHighlighter
                  language='json'
                  style={atomOneDark}
                  customStyle={{
                    background: 'transparent',
                    padding: 12,
                    borderRadius: 8,
                  }}
                >
                  {`{
  "success": true,
  "code": 200,
  "status": "OK",
  "message": "Human-readable description",
  "total": 150,
  "page": 1,
  "limit": 50,
  "data": [...]
}`}
                </SyntaxHighlighter>
              </section>

              {/* API Endpoints Overview */}
              <section
                id='endpoints'
                className='scroll-mt-28 py-6'
              >
                <h2 className='text-2xl font-bold text-white'>API Endpoints</h2>
                <p className='text-white/80 mt-2'>
                  Time, location, property and event-based queries.
                </p>

                <div className='mt-4 overflow-x-auto rounded border border-white/5 bg-slate-900/30'>
                  <table className='w-full text-sm'>
                    <thead className='bg-slate-800/60'>
                      <tr>
                        <th className='p-3 text-left'>Method</th>
                        <th className='p-3 text-left'>Endpoint</th>
                        <th className='p-3 text-left'>Description</th>
                        <th className='p-3 text-left'>Query Params</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/recent'
                        desc='Recent earthquakes (year→today)'
                        params='page, limit'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/today'
                        desc="Today's earthquakes (UTC)"
                        params='page, limit'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/last-week'
                        desc='Last 7 days'
                        params='page, limit'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/month'
                        desc='Earthquakes in month'
                        params='year (req), month (req), page, limit'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/range-time'
                        desc='Date range'
                        params='startdate (req), enddate (req), page, limit'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/location'
                        desc='Within radius of coords'
                        params='latitude (req), longitude (req), radius, page, limit'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/region'
                        desc='Italian region'
                        params='region (req), page, limit'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/depth'
                        desc='By depth (km)'
                        params='depth (req), page, limit'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/magnitude'
                        desc='Magnitude >= value'
                        params='mag (req), page, limit'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/eventId'
                        desc='Event details by id'
                        params='eventId (req)'
                      />
                    </tbody>
                  </table>
                </div>

                <div className='mt-6'>
                  <h4 className='font-semibold text-white'>Example Request</h4>
                  <SyntaxHighlighter
                    language='bash'
                    style={atomOneDark}
                    customStyle={{
                      background: 'transparent',
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    {snippets.curlRecent}
                  </SyntaxHighlighter>
                  <div className='flex items-center mt-2'>
                    <CopyButton text={snippets.curlRecent} />
                  </div>
                </div>

                <div className='mt-6'>
                  <h4 className='font-semibold text-white'>Example Response</h4>
                  <SyntaxHighlighter
                    language='json'
                    style={atomOneDark}
                    customStyle={{
                      background: 'transparent',
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    {snippets.exampleResponse}
                  </SyntaxHighlighter>
                </div>
              </section>

              {/* Time-Based Queries */}
              <section
                id='time-queries'
                className='scroll-mt-28 py-6'
              >
                <h3 className='text-xl font-bold text-white'>
                  Time-Based Queries
                </h3>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/recent
                  </h4>
                  <p className='text-white/80'>
                    Earthquakes from Jan 1st of the current year up to today.
                  </p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/today
                  </h4>
                  <p className='text-white/80'>Events occurred today (UTC).</p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/last-week
                  </h4>
                  <p className='text-white/80'>
                    Last 7 days (including today).
                  </p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/month
                  </h4>
                  <p className='text-white/80'>
                    Requires <code>year</code> and <code>month</code>. Returns
                    400 for invalid input.
                  </p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/range-time
                  </h4>
                  <p className='text-white/80'>
                    Requires <code>startdate</code> and <code>enddate</code>{' '}
                    (YYYY-MM-DD). Max range 365 days.
                  </p>
                </article>
              </section>

              {/* Location-Based Queries */}
              <section
                id='location-queries'
                className='scroll-mt-28 py-6'
              >
                <h3 className='text-xl font-bold text-white'>
                  Location-Based Queries
                </h3>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/location
                  </h4>
                  <p className='text-white/80'>
                    Requires <code>latitude</code> and <code>longitude</code>.
                    Optional <code>radius</code> (km). Uses Haversine; ordered
                    by distance.
                  </p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/region
                  </h4>
                  <p className='text-white/80'>
                    Italian region name (case-insensitive). Supported regions:
                    Abruzzo, Basilicata, Calabria, ... Veneto.
                  </p>
                </article>
              </section>

              {/* Property-Based Queries */}
              <section
                id='property-queries'
                className='scroll-mt-28 py-6'
              >
                <h3 className='text-xl font-bold text-white'>
                  Property-Based Queries
                </h3>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/depth
                  </h4>
                  <p className='text-white/80'>
                    Filter by maximum depth (km). Depth classes: shallow 0–70,
                    intermediate 70–300, deep 300+.
                  </p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/magnitude
                  </h4>
                  <p className='text-white/80'>
                    Filter by magnitude &ge; value. Reference scales provided
                    (ML, Mw, etc.).
                  </p>
                </article>
              </section>

              {/* Event-Based Queries */}
              <section
                id='event-queries'
                className='scroll-mt-28 py-6'
              >
                <h3 className='text-xl font-bold text-white'>
                  Event-Based Queries
                </h3>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/eventId
                  </h4>
                  <p className='text-white/80'>
                    Retrieve single event details by <code>eventId</code>.
                    Returns 404 if not found.
                  </p>

                  <SyntaxHighlighter
                    language='bash'
                    style={atomOneDark}
                    customStyle={{
                      background: 'transparent',
                      padding: 12,
                      borderRadius: 8,
                      marginTop: 8,
                    }}
                  >
                    {`curl "https://api.terraquakeapi.com/v1/earthquakes/eventId?eventId=44278572"`}
                  </SyntaxHighlighter>
                </article>
              </section>

              {/* Error Handling */}
              <section
                id='error-handling'
                className='scroll-mt-28 py-6'
              >
                <h2 className='text-2xl font-bold text-white'>
                  Error Handling
                </h2>
                <p className='text-white/80 mt-2'>
                  Standard HTTP codes used. Error responses include `errors`
                  array for validation details.
                </p>

                <SyntaxHighlighter
                  language='json'
                  style={atomOneDark}
                  customStyle={{
                    background: 'transparent',
                    padding: 12,
                    borderRadius: 8,
                    marginTop: 8,
                  }}
                >
                  {`{
  "success": false,
  "code": 400,
  "status": "Bad Request",
  "message": "Invalid date format. Expected YYYY-MM-DD",
  "errors": [
    { "field": "startdate", "message": "Date must be in YYYY-MM-DD format" }
  ]
}`}
                </SyntaxHighlighter>

                <ul className='mt-4 list-disc list-inside text-white/80'>
                  <li>
                    <strong>400</strong> Bad Request — invalid parameters
                  </li>
                  <li>
                    <strong>404</strong> Not Found — resource missing
                  </li>
                  <li>
                    <strong>429</strong> Too Many Requests — rate limit exceeded
                  </li>
                  <li>
                    <strong>500/503</strong> — server issues
                  </li>
                </ul>
              </section>

              {/* Code Examples */}
              <section
                id='code-examples'
                className='scroll-mt-28 py-6'
              >
                <h2 className='text-2xl font-bold text-white'>Code Examples</h2>
                <p className='text-white/80 mt-2'>
                  Examples (each block has a Copy button):
                </p>

                <div className='mt-4 space-y-6'>
                  <div>
                    <div className='flex items-start justify-between'>
                      <h4 className='font-semibold text-white'>
                        JavaScript (fetch)
                      </h4>
                      <CopyButton text={snippets.fetchRecent} />
                    </div>
                    <SyntaxHighlighter
                      language='javascript'
                      style={atomOneDark}
                      customStyle={{
                        background: 'transparent',
                        padding: 12,
                        borderRadius: 8,
                      }}
                    >
                      {snippets.fetchRecent}
                    </SyntaxHighlighter>
                  </div>

                  <div>
                    <div className='flex items-start justify-between'>
                      <h4 className='font-semibold text-white'>React</h4>
                      <CopyButton text={snippets.reactRecent} />
                    </div>
                    <SyntaxHighlighter
                      language='jsx'
                      style={atomOneDark}
                      customStyle={{
                        background: 'transparent',
                        padding: 12,
                        borderRadius: 8,
                      }}
                    >
                      {snippets.reactRecent}
                    </SyntaxHighlighter>
                  </div>

                  <div>
                    <div className='flex items-start justify-between'>
                      <h4 className='font-semibold text-white'>
                        Node.js (axios)
                      </h4>
                      <CopyButton text={snippets.axiosNode} />
                    </div>
                    <SyntaxHighlighter
                      language='javascript'
                      style={atomOneDark}
                      customStyle={{
                        background: 'transparent',
                        padding: 12,
                        borderRadius: 8,
                      }}
                    >
                      {snippets.axiosNode}
                    </SyntaxHighlighter>
                  </div>

                  <div>
                    <div className='flex items-start justify-between'>
                      <h4 className='font-semibold text-white'>
                        Python (requests)
                      </h4>
                      <CopyButton text={snippets.pythonRequests} />
                    </div>
                    <SyntaxHighlighter
                      language='python'
                      style={atomOneDark}
                      customStyle={{
                        background: 'transparent',
                        padding: 12,
                        borderRadius: 8,
                      }}
                    >
                      {snippets.pythonRequests}
                    </SyntaxHighlighter>
                  </div>

                  <div>
                    <div className='flex items-start justify-between'>
                      <h4 className='font-semibold text-white'>cURL</h4>
                      <CopyButton text={snippets.curlLocation} />
                    </div>
                    <SyntaxHighlighter
                      language='bash'
                      style={atomOneDark}
                      customStyle={{
                        background: 'transparent',
                        padding: 12,
                        borderRadius: 8,
                      }}
                    >
                      {snippets.curlLocation}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </section>

              {/* Data fields */}
              <section
                id='data-fields'
                className='scroll-mt-28 py-6'
              />
              {/* placeholder if needed */}

              <section
                id='data-fields'
                className='scroll-mt-28 py-6'
              >
                <h2 className='text-2xl font-bold text-white'>
                  Data Field Reference
                </h2>
                <p className='text-white/80 mt-2'>
                  Each earthquake entry is a GeoJSON Feature. Important fields:
                </p>
                <ul className='list-disc list-inside mt-3 text-white/80'>
                  <li>
                    <code>eventId</code> — unique event identifier (integer)
                  </li>
                  <li>
                    <code>originId</code> — origin/source id
                  </li>
                  <li>
                    <code>time</code> — ISO 8601 timestamp in UTC
                  </li>
                  <li>
                    <code>author</code> — reporting agency
                  </li>
                  <li>
                    <code>mag</code> — magnitude (float)
                  </li>
                  <li>
                    <code>magType</code> — e.g., ML, Mw
                  </li>
                  <li>
                    <code>place</code> — human-readable location
                  </li>
                  <li>
                    <code>geometry.coordinates</code> — [longitude, latitude,
                    depth]
                  </li>
                </ul>

                <h4 className='mt-4 font-semibold text-white'>Geometry</h4>
                <p className='text-white/80'>
                  GeoJSON Point: <code>[lon, lat, depth]</code> (depth in km).
                </p>
              </section>

              {/* Support */}
              <section
                id='support'
                className='scroll-mt-28 py-6'
              >
                <h2 className='text-2xl font-bold text-white'>
                  Support & Feedback
                </h2>
                <p className='text-white/80 mt-2'>
                  Report issues and request features on GitHub:
                </p>
                <ul className='list-disc list-inside mt-3 text-white/80'>
                  <li>
                    <a
                      href='https://github.com/nagcas/TerraQuakeApi/issues'
                      className='text-pink-300 hover:underline'
                    >
                      GitHub Issues
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://github.com/nagcas/TerraQuakeApi/discussions'
                      className='text-pink-300 hover:underline'
                    >
                      Discussions
                    </a>
                  </li>
                </ul>
                <p className='mt-4 text-sm text-white/60'>
                  Project lead: Dr. Gianluca Chiaravalloti — Web Developer &
                  Geologist
                </p>
                <p className='mt-2 text-sm text-white/60'>
                  Last updated: October 2025 · API v1.0
                </p>
              </section>

              {/* FAQ */}
              <section
                id='faq'
                className='scroll-mt-28 py-6'
              >
                <h2 className='text-2xl font-bold text-white'>FAQ</h2>
                <div className='mt-3 text-white/80'>
                  <p>
                    <strong>Q: Do I need an API key?</strong>
                    <br />
                    A: No for basic usage; some future endpoints may require it.
                  </p>
                  <p className='mt-3'>
                    <strong>Q: How often is data updated?</strong>
                    <br />
                    A: Near real-time; within a few minutes of detection.
                  </p>
                </div>
              </section>
            </main>
          </div>
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

/* Helper components */
function Row({ method, endpoint, desc, params }) {
  return (
    <tr className='border-t border-white/5'>
      <td className='p-3 text-sm text-white/80 font-medium'>{method}</td>
      <td className='p-3 text-sm text-pink-300 font-mono'>{endpoint}</td>
      <td className='p-3 text-sm text-white/80'>{desc}</td>
      <td className='p-3 text-sm text-white/70'>{params}</td>
    </tr>
  );
}
