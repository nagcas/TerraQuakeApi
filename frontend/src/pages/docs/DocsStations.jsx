import React, { useEffect, useMemo, useRef, useState } from 'react';
import MetaData from '../noPage/MetaData';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from '@components/utils/CopyButton';
import VersionAPI from '@/components/utils/VersionAPI';

export default function DocsStations() {
  const contentRef = useRef(null);
  const [activeId, setActiveId] = useState('getting-started');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollTimeoutRef = useRef(null); // Ref to manage scroll timeout

  const sections = useMemo(
    () => [
      { id: 'getting-started', label: 'Getting Started' },
      { id: 'common-parameters', label: 'Common Parameters' },
      { id: 'response-format', label: 'Response Format' },
      { id: 'endpoints', label: 'API Endpoints' },
      { id: 'stations', label: 'Stations' },
      { id: 'stations-geojson', label: 'GeoJSON-Based' },
      { id: 'stations-events', label: 'Event-Based' },
      { id: 'stations-property', label: 'Property-Based' },
      { id: 'error-handling', label: 'Error Handling' },
      { id: 'code-examples', label: 'Code Examples' },
      { id: 'data-fields', label: 'Data Field Reference' },
      { id: 'support', label: 'Support & Feedback' },
      { id: 'api-information', label: 'API Information' },
    ],
    []
  );

  // Scrollspy using IntersectionObserver for accuracy
  useEffect(() => {
    const observerOptions = {
      root: null, // relative to the viewport
      rootMargin: '-10px 0px -40% 0px', // trigger when the top of the element is in the top 60% of the viewport
      threshold: 0, // as soon as one pixel is visible
    };

    const observer = new IntersectionObserver((entries) => {
      // If a scroll timeout is active, don't update the activeId from the observer
      if (scrollTimeoutRef.current) return;

      const intersectingEntries = entries.filter((e) => e.isIntersecting);
      if (intersectingEntries.length > 0) {
        // Find the entry that is closest to the top of the viewport
        const entry = intersectingEntries.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
        );
        if (entry) {
          setActiveId(entry.target.id);
        }
      }
    }, observerOptions);

    const nodes = contentRef.current?.querySelectorAll('section[id]') || [];
    nodes.forEach((n) => observer.observe(n));
    return () => nodes.forEach((n) => observer.unobserve(n));
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Immediately set the active ID to what was clicked
    setActiveId(id);
    setSidebarOpen(false); // Clear any existing scroll timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    // Temporarily disable observer updates to prevent flickering during smooth scroll
    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
    }, 1000); // A 1-second buffer should be enough for smooth scroll to finish
  };

  // Code snippets centralized for reuse and copy buttons
  const snippets = {
    curlRecent: `curl -X GET "https://api.terraquakeapi.com/v1/stations?limit=10&page=1"`,
    fetchRecent: `
fetch("https://api.terraquakeapi.com/v1/stations?limit=5")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));`,
    reactRecent: `
import React, { useEffect, useState } from "react";

function RecentEarthquakes() {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("https://api.terraquakeapi.com/v1/stations?limit=5");
        if (!response.ok) throw new Error("Network response was not ok");

        const json = await response.json();

        // L'API restituisce json.payload (array)
        setStations(json.payload || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchStations();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!stations.length) return <p>Loading...</p>;

  return (
    <ul>
      {stations.map((st) => (
        <li key={st._id}>
          {st.code} — {st.name} ({st.network})
        </li>
      ))}
    </ul>
  );
}

export default RecentEarthquakes;`,
    pythonRequests: `
import requests

url = "https://api.terraquakeapi.com/v1/stations"

params = {
  "limit": 100
}

try:
  response = requests.get(url, params=params)
  response.raise_for_status()

  data = response.json()
  stations = data.get("payload", [])
  print(stations)
except requests.exceptions.RequestException as e:
  print(f"Error: {e}")`,
    axiosNode: `
const axios = require('axios');
axios.get('https://api.terraquakeapi.com/v1/stations/open', {
  params: {
    limit: 100
  } 
})
  .then((response) => {
    console.log(response.data,payload);
  })
  .catch((error) => {
    console.error(error.response?.data || error.message)
  });`,
    curlLocation: `curl -X GET "https://api.terraquakeapi.com/v1/earthquakes/stations/closed"`,
    exampleResponse: `{
"success": true,
"code": 200,
"status": "OK",
"message": "List of seismic monitoring stations (INGV Network)",
"payload": [...],
"meta": 
  {
    "method": "GET",
    "path": "/v1/stations?limit=10&page=1",
    "timestamp": "2025-11-19T14:22:52.431Z"
  },
  "totalStations": 549,
  "pagination": 
  {
    "page": 1,
    "totalPages": 55,
    "limit": 10,
    "hasMore": true
  }
}`,
    curlEventId: `curl -X GET "https://api.terraquakeapi.com/v1/stations/code?code=ACATE"`,
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
              Comprehensive programmatic access to INGV seismic station data —
              endpoints, query parameters, usage examples, and integration best
              practices.
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
            </aside>

            {/* Content */}
            <main
              ref={contentRef}
              className='col-span-1 lg:col-span-9 prose prose-invert max-w-none'
            >
              {/* Getting Started */}
              <section
                id='getting-started'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-2xl font-bold text-white'>
                  Getting Started - Stations
                </h2>
                <p className='text-white/80 mt-2'>
                  <strong>Base URL:</strong>{' '}
                  <code className='bg-slate-800 px-2 py-1 rounded'>
                    https://api.terraquakeapi.com/v1/stations
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
                className='scroll-mt-[120px] py-6'
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
                    <code>limit</code> — integer, default <strong>50</strong>
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
                className='scroll-mt-[120px] py-6'
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
                  {`
{
  "success": true,
  "code": 200,
  "status": "OK",
  "message": "List of seismic monitoring stations (INGV Network)",
  "payload": [
    {
      "$": {
        "code": "ACATE",
        "startDate": "2019-02-28T05:59:00",
        "restrictedStatus": "open"
      },
      "Latitude": "37.02398",
      "Longitude": "14.50064",
      "Elevation": "210",
      "Site": {
        "Name": "ACATE"
      },
      "CreationDate": "2019-02-28T05:59:00"
    }
  ],
  "meta": {
    "method": "GET",
    "path": "/v1/stations?limit=1&page=1",
    "timestamp": "2025-11-19T14:22:52.431Z"
  },
  "totalStations": 549,
  "pagination": {
    "page": 1,
    "totalPages": 549,
    "limit": 1,
    "hasMore": true
  }
}`}
                </SyntaxHighlighter>
              </section>

              {/* API Endpoints Overview */}
              <section
                id='endpoints'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-2xl font-bold text-white'>
                  API Endpoints Stations
                </h2>
                <p className='text-white/80 mt-2'>
                  Code, geoJson, open, closed and statistics endpoints are
                  available.
                </p>

                <div className='mt-4 overflow-x-auto rounded border border-white/5 bg-slate-900/30'>
                  <table className='w-full text-sm'>
                    <thead className='bg-slate-800/60'>
                      <tr>
                        <th className='p-3 text-left'>Method</th>
                        <th className='p-3 text-left'>Endpoint</th>
                        <th className='p-3 text-left'>Description</th>
                        <th className='p-3 text-left'>
                          Query Params (* req = required)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <Row
                        method='GET'
                        endpoint='/v1/stations'
                        desc='All stations'
                        params='limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/stations/code'
                        desc='Stations detail by code station'
                        params='code* (req)'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/stations/geojson'
                        desc='Full station dataset (GeoJSON format)'
                        params='limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/stations/open'
                        desc='List of active seismic stations'
                        params='limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/stations/closed'
                        desc='List of inactive or decommissioned seismic stations'
                        params='limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/stations/statistics'
                        desc='Seismic network summary'
                        params='no parameter'
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

              {/* Stations */}
              <section
                id='stations'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-xl font-bold text-white'>Stations</h2>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/stations
                  </h4>
                  <p className='text-white/80'>
                    Returns all available seismic stations.
                  </p>
                </article>
              </section>

              {/* Stations-geoJSON */}
              <section
                id='stations-geojson'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-xl font-bold text-white'>
                  Stations-GeoJSON
                </h2>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/stations/geojson
                  </h4>
                  <p className='text-white/80'>
                    Returns all seismic stations in GeoJSON format. Supports
                    bounding-box filters for geospatial mapping and
                    visualization.
                  </p>
                </article>
              </section>

              {/* Stations-events code */}
              <section
                id='stations-events'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-xl font-bold text-white'>
                  Station by Code
                </h2>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/stations/code?code=ACATE
                  </h4>
                  <p className='text-white/80'>
                    Retrieve detailed metadata for a single seismic station by
                    its <code>code</code>. Returns 404 if the station does not
                    exist.
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
                    {snippets.curlEventId}
                  </SyntaxHighlighter>
                  <CopyButton text={snippets.curlEventId} />
                </article>
              </section>

              {/* Stations-property */}
              <section
                id='stations-property'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-xl font-bold text-white'>
                  Stations by Property
                </h2>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/stations/open
                  </h4>
                  <p className='text-white/80'>
                    Returns all stations currently operational (open). Ideal for
                    filtering active monitoring infrastructure.
                  </p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/stations/closed
                  </h4>
                  <p className='text-white/80'>
                    Returns all stations marked as inactive or closed. Useful
                    for network management and maintenance analysis.
                  </p>
                </article>
              </section>

              {/* Error Handling */}
              <section
                id='error-handling'
                className='scroll-mt-[120px] py-16'
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
                  {`
{
    "success": false,
    "status": 400,
    "message": "Parameter 'code' is required",
    "meta": {
        "timestamp": "2025-11-19T17:42:37.414Z"
    }
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
                className='scroll-mt-[120px] py-16'
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
                className='scroll-mt-[120px] py-16'
              />
              {/* placeholder if needed */}

              <section
                id='data-fields'
                className='scroll-mt-[120px] py-16'
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
                className='scroll-mt-[120px] py-16'
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
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-pink-300 hover:underline'
                    >
                      GitHub Issues
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://github.com/nagcas/TerraQuakeApi/discussions'
                      target='_blank'
                      rel='noopener noreferrer'
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
              </section>

              {/* API Information */}
              <section
                id='api-information'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-2xl font-bold text-white'>
                  API Information
                </h2>
                <VersionAPI />
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
