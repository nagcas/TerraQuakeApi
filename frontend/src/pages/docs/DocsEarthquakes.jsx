import React, { useEffect, useMemo, useRef, useState } from 'react';
import MetaData from '../noPage/MetaData';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from '@components/utils/CopyButton';
import VersionAPI from '@/components/utils/VersionAPI';
import MagnitudeLegend from '@/components/magnitudeLegend/MagnitudeLegend';
import { useTranslation } from 'react-i18next';

export default function DocsEarthquakes() {
  const { t, i18n } = useTranslation('translation');

  const contentRef = useRef(null);
  const [activeId, setActiveId] = useState('getting-started');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollTimeoutRef = useRef(null); // Ref to manage scroll timeout

  const sections = useMemo(
    () => [
      { id: 'getting-started', label: t('docs_earthquakes.label_getting') },
      { id: 'common-parameters', label: t('docs_earthquakes.label_common') },
      { id: 'response-format', label: t('docs_earthquakes.label_response') },
      { id: 'endpoints', label: t('docs_earthquakes.label_endpoints') },
      { id: 'magnitude-legend', label: t('docs_earthquakes.label_magnitude') },
      { id: 'time-queries', label: t('docs_earthquakes.label_time') },
      { id: 'location-queries', label: t('docs_earthquakes.label_location') },
      { id: 'property-queries', label: t('docs_earthquakes.label_location') },
      { id: 'event-queries', label: t('docs_earthquakes.label_event') },
      { id: 'error-handling', label: t('docs_earthquakes.label_error') },
      { id: 'code-examples', label: t('docs_earthquakes.label_code') },
      { id: 'data-fields', label: t('docs_earthquakes.label_data') },
      { id: 'support', label: t('docs_earthquakes.label_support') },
      { id: 'api-information', label: t('docs_earthquakes.label_information') },
    ],
    [t]
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
          prev.boundingClientRect.top < curr.boundingClientRect.top
            ? prev
            : curr
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
    curlRecent: `curl -X GET "https://api.terraquakeapi.com/v1/earthquakes/recent?limit=10&page=1"`,
    fetchRecent: `
fetch("https://api.terraquakeapi.com/v1/earthquakes/recent?limit=5")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));`,
    reactRecent: `
import React, { useEffect, useState } from "react";

function RecentEarthquakes() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const response = await fetch("https://api.terraquakeapi.com/v1/earthquakes/recent?limit=5");
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        setData(json || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
      
    fetchEarthquakes();
  }, []);
  
  if (error) return <p>Error: {error}</p>;
  
  if (!data.length) return <p>Loading...</p>;
  
  return (
    <ul>
      {data.map(eq => (
        <li key={eq.properties.eventId}>
          {eq.properties.place} — {eq.properties.mag}
        </li>
      ))}
    </ul>
  );
}

export default RecentEarthquakes;`,
    pythonRequests: `
import requests

url = "https://api.terraquakeapi.com/v1/earthquakes/recent?limit=10"

response = requests.get(url)
print(response.json())`,
    axiosNode: `
const axios = require('axios');
axios.get('https://api.terraquakeapi.com/v1/earthquakes/range-time', {
  params: { startdate: '2025-09-01', enddate: '2025-09-30', limit: 100 }
})
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error.response?.data || error.message));`,
    curlLocation: `curl -X GET "https://api.terraquakeapi.com/v1/earthquakes/location?latitude=35.6762&longitude=139.6503&radius=500&limit=20"`,
    exampleResponse: `{\n  "success": true,\n  "code": 200,\n  "status": "OK",\n  "message": "Earthquakes recent events",\n  "Payload": [...],\n  "meta": {\n    "method": "GET",\n    "path": "/v1/earthquakes/recent?limit=10&page=1",\n    "timestamp": "2025-11-19T14:24:49.431Z"\n  },\n  "totalEarthquakes": 14687,\n  "pagination": {\n    "page": 1,\n    "totalPages": 1469,\n    "limit": 10,\n    "hasMore": true\n  }\n`,
    curlEventId: `curl -X GET "https://api.terraquakeapi.com/v1/earthquakes/eventId?eventId=44278572"`,
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
              {t('docs_earthquakes.title')}
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
              {t('docs_earthquakes.description')}
            </p>
          </motion.div>

          <div className='flex items-start justify-between mb-8'>
            {/* mobile menu toggle */}
            <div className='md:hidden'>
              <button
                onClick={() => setSidebarOpen((s) => !s)}
                className='px-3 py-2 rounded bg-slate-800/60 border border-white/10 text-white/80'
              >
                {sidebarOpen ? 
                  t('docs_earthquakes.close') : 
                  t('docs_earthquakes.menu')
                }
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
                  {t('docs_earthquakes.contents')}
                </h4>
                <ul className='space-y-2 text-sm'>
                  {sections.map((sec) => (
                    <li key={sec.id}>
                      <button
                        onClick={() => scrollToId(sec.id)}
                        className={`w-full text-left px-2 py-1 rounded transition ${
                          activeId === sec.id
                            ? 'bg-pink-600/20 text-purple-300 cursor-pointer'
                            : 'text-white/70 hover:bg-white/5 hover:text-white cursor-pointer'
                        }`}
                      >
                        {sec.label}
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
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-2xl font-bold text-white'>
                  {t('docs_earthquakes.label_getting')}
                </h2>
                <p className='text-white/80 mt-2'>
                  <strong>Base URL:</strong>{' '}
                  <code className='bg-slate-800 px-2 py-1 rounded'>
                    https://api.terraquakeapi.com/v1/earthquakes
                  </code>
                </p>
                <p className='text-white/80 mt-2'>
                  <strong>{t('docs_earthquakes.authentication')} </strong>
                  {t('docs_earthquakes.authentication_description')} 
                </p>

                <h3 className='mt-4 text-lg font-semibold text-white'>
                  {t('docs_earthquakes.rate_limits')} 
                </h3>
                <p className='text-white/80'>
                  {t('docs_earthquakes.fixed')} 
                  <strong>{t('docs_earthquakes.request')} </strong>.
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
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-2xl font-bold text-white'>
                  {t('docs_earthquakes.label_common')}
                </h2>
                <p className='text-white/80 mt-2'>
                  {t('docs_earthquakes.subtitle_common')}
                </p>
                <ul className='list-disc list-inside text-white/80 mt-2'>
                  <li>
                    <code>page</code> — integer, default <strong>1</strong>
                  </li>
                  <li>
                    <code>limit</code> — integer, default <strong>50</strong>
                  </li>
                </ul>
                <p className='text-white/70 text-sm mt-2'>
                  {t('docs_earthquakes.example')}{' '}
                  <code className='px-1 py-0.5 bg-slate-800 rounded'>
                    ?page=2&amp;limit=100
                  </code>
                </p>
              </section>

              {/* Response Format */}
              <section
                id='response-format'
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-2xl font-bold text-white'>
                  {t('docs_earthquakes.label_response')}
                </h2>
                <p className='text-white/80 mt-2'>
                  {t('docs_earthquakes.subtitle_response')}
                </p>
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
  "message": "Earthquakes recent events",
  "payload": [
    {
      "type": "Feature",
      "properties": {
        "eventId": 44688182,
        "originId": 141360101,
        "time": "2025-11-19T13:07:32.849000",
        "author": "SURVEY-INGV-OV#WESSEL",
        "magType": "Md",
        "mag": 2,
        "magAuthor": "--",
        "type": "earthquake",
        "place": "Campi Flegrei",
        "version": 100,
        "geojson_creationTime": "2025-11-19T14:24:47"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          14.127667,
          40.833333,
          1.8
        ]
      }
    }
  ],
  "meta": {
    "method": "GET",
    "path": "/v1/earthquakes/recent?limit=1&page=1",
    "timestamp": "2025-11-19T14:24:49.431Z"
  },
  "totalEarthquakes": 14687,
  "pagination": {
    "page": 1,
    "totalPages": 14687,
    "limit": 1,
    "hasMore": true
  }
}
`}
                </SyntaxHighlighter>
              </section>

              {/* API Endpoints Overview */}
              <section
                id='endpoints'
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-2xl font-bold text-white'>
                  {t('docs_earthquakes.label_endpoints')}
                </h2>
                <p className='text-white/80 mt-2'>
                  {t('docs_earthquakes.subtitle_endpoints')}
                </p>

                <div className='mt-4 overflow-x-auto rounded border border-white/5 bg-slate-900/30'>
                  <table className='w-full text-sm'>
                    <thead className='bg-slate-800/60'>
                      <tr>
                        <th className='p-3 text-left'>{t('docs_earthquakes.method_table')}</th>
                        <th className='p-3 text-left'>{t('docs_earthquakes.endpoint_table')}</th>
                        <th className='p-3 text-left'>{t('docs_earthquakes.description_table')}</th>
                        <th className='p-3 text-left'>
                          {t('docs_earthquakes.query_table')} (* req = {t('docs_earthquakes.required_table')})
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/recent'
                        desc='Latest sismic events (year→today)'
                        params='limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/today'
                        desc='Today seismic events (UTC)'
                        params='limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/last-week'
                        desc='Last 7 days'
                        params='limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/month'
                        desc='By month/year'
                        params='year* (req), month* (req), limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/location'
                        desc='Within radius of coords'
                        params='latitude* (req), longitude* (req), radius (Km), limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/range-time'
                        desc='Date range'
                        params='startdate* (req), enddate* (req), limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/region'
                        desc='By Italian region'
                        params='region* (req), limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/depth'
                        desc='By focal depth (km)'
                        params='depth* (req), limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/magnitude'
                        desc='Min magnitude'
                        params='mag* (req), limit, page'
                      />
                      <Row
                        method='GET'
                        endpoint='/v1/earthquakes/eventId'
                        desc='Event details by id'
                        params='eventId* (req)'
                      />
                    </tbody>
                  </table>
                </div>

                <div className='mt-6'>
                  <h4 className='font-semibold text-white'>{t('docs_earthquakes.example_request')}</h4>
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
                  <h4 className='font-semibold text-white'>{t('docs_earthquakes.example_response')}</h4>
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

              {/* Magnitude Legend */}
              <section
                id='magnitude-legend'
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-xl font-bold text-white'>
                  {t('docs_earthquakes.label_magnitude')}
                </h2>
                <MagnitudeLegend />
              </section>

              {/* Time-Based Queries */}
              <section
                id='time-queries'
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-xl font-bold text-white'>
                  {t('docs_earthquakes.time_based_queries')}
                </h2>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/recent
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_earthquakes.description_time_based')}
                  </p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/today
                  </h4>
                  <p className='text-white/80'>{t('docs_earthquakes.description_events_occurred')}</p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/last-week
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_earthquakes.description_last_7')}
                  </p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/month
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_earthquakes.requires')} <code>year</code> {t('docs_earthquakes.and')} <code>month</code>. {t('docs_earthquakes.return_400')}
                  </p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/range-time
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_earthquakes.requires')} <code>startdate</code> {t('docs_earthquakes.and')} <code>enddate</code>{' '}
                    (YYYY-MM-DD). {t('docs_earthquakes.max_range')}
                  </p>
                </article>
              </section>

              {/* Location-Based Queries */}
              <section
                id='location-queries'
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-xl font-bold text-white'>
                  {t('docs_earthquakes.label_location')}
                </h2>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/location
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_earthquakes.requires')} <code>latitude</code> {t('docs_earthquakes.and')} <code>longitude</code>.
                    {t('docs_earthquakes.optional')} <code>radius</code> (km).
                    {t('docs_earthquakes.haversine')}
                  </p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/region
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_earthquakes.support_region')}
                  </p>
                </article>
              </section>

              {/* Property-Based Queries */}
              <section
                id='property-queries'
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-xl font-bold text-white'>
                  {t('docs_earthquakes.label_property')}
                </h2>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/depth
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_earthquakes.filter_depth')}
                  </p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/magnitude
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_earthquakes.filter_magnitude')}
                  </p>
                </article>
              </section>

              {/* Event-Based Queries */}
              <section
                id='event-queries'
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-xl font-bold text-white'>
                  {t('docs_earthquakes.label_event')}
                </h2>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/eventId
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_earthquakes.retrive')} <code>eventId</code>.
                    {t('docs_earthquakes.return_404')} 
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

              {/* Error Handling */}
              <section
                id='error-handling'
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-2xl font-bold text-white'>
                  {t('docs_earthquakes.label_error')}
                </h2>
                <p className='text-white/80 mt-2'>
                  {t('docs_earthquakes.errors_response')}
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
                    <strong>400</strong> Bad Request — {t('docs_earthquakes.errorinvalid')}
                  </li>
                  <li>
                    <strong>404</strong> Not Found — {t('docs_earthquakes.error_resource')}
                  </li>
                  <li>
                    <strong>429</strong> Too Many Requests — {t('docs_earthquakes.error_rate_limit')}
                  </li>
                  <li>
                    <strong>500/503</strong> — {t('docs_earthquakes.error_server')}
                  </li>
                </ul>
              </section>

              {/* Code Examples */}
              <section
                id='code-examples'
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-2xl font-bold text-white'>
                  {t('docs_earthquakes.label_code')}
                </h2>
                <p className='text-white/80 mt-2'>
                  {t('docs_earthquakes.examples_codes')}
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
                className='scroll-mt-[120px] py-12'
              />
              {/* placeholder if needed */}

              <section
                id='data-fields'
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-2xl font-bold text-white'>
                  {t('docs_earthquakes.label_data')}
                </h2>
                <p className='text-white/80 mt-2'>
                  {t('docs_earthquakes.earthquakes_geojson')}
                </p>
                <ul className='list-disc list-inside mt-3 text-white/80'>
                  <li>
                    <code>eventId</code> — {t('docs_earthquakes.unique_event')} (integer)
                  </li>
                  <li>
                    <code>originId</code> — {t('docs_earthquakes.origin_source')} id
                  </li>
                  <li>
                    <code>time</code> — ISO 8601 timestamp in UTC
                  </li>
                  <li>
                    <code>author</code> — {t('docs_earthquakes.reporting')}
                  </li>
                  <li>
                    <code>mag</code> — {t('docs_earthquakes.magnitude')} (float)
                  </li>
                  <li>
                    <code>magType</code> — ML, Mw ...
                  </li>
                  <li>
                    <code>place</code> — {t('docs_earthquakes.human-readable')}
                  </li>
                  <li>
                    <code>geometry.coordinates</code> — [longitude, latitude,
                    depth]
                  </li>
                </ul>

                <h4 className='mt-4 font-semibold text-white'>Geometry</h4>
                <p className='text-white/80'>
                  GeoJSON Point: <code>[lon, lat, depth]</code> {t('docs_earthquakes.depth_km')}
                </p>
              </section>

              {/* Support */}
              <section
                id='support'
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-2xl font-bold text-white'>
                  {t('docs_earthquakes.label_support')}
                </h2>
                <p className='text-white/80 mt-2'>
                  {t('docs_earthquakes.report_issues')}
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
                  {t('docs_earthquakes.author')}
                </p>
              </section>

              {/* API Information */}
              <section
                id='api-information'
                className='scroll-mt-[120px] py-12'
              >
                <h2 className='text-2xl font-bold text-white'>
                  {t('docs_earthquakes.label_information')}
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
