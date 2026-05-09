import React, { useEffect, useMemo, useRef, useState } from 'react';
import MetaData from '../noPage/MetaData';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from '@components/utils/CopyButton';
import VersionAPI from '@/components/utils/VersionAPI';
import { useTranslation } from 'react-i18next';

export default function DocsStations() {
  const { t } = useTranslation('translation');
  
  const contentRef = useRef(null);
  const [activeId, setActiveId] = useState('getting-started');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollTimeoutRef = useRef(null); // Ref to manage scroll timeout

  const sections = useMemo(
    () => [
      { id: 'getting-started', label: t('docs_stations.label_started') },
      { id: 'common-parameters', label: t('docs_stations.label_parameters') },
      { id: 'response-format', label: t('docs_stations.label_format') },
      { id: 'endpoints', label: t('docs_stations.label_endpoints') },
      { id: 'stations', label: t('docs_stations.label_stations') },
      { id: 'stations-geojson', label: t('docs_stations.label_geojson') },
      { id: 'stations-events', label: t('docs_stations.label_event') },
      { id: 'stations-property', label: t('docs_stations.label_property') },
      { id: 'error-handling', label: t('docs_stations.label_error') },
      { id: 'code-examples', label: t('docs_stations.label_code') },
      { id: 'support', label: t('docs_stations.label_support') },
      { id: 'api-information', label: t('docs_stations.label_information') },
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
              {t('docs_stations.title')}
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
              {t('docs_stations.text_docs')}
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
                  {t('docs_stations.contents')}
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
                  {t('docs_stations.get_started')}
                </h2>
                <p className='text-white/80 mt-2'>
                  <strong>Base URL:</strong>{' '}
                  <code className='bg-slate-800 px-2 py-1 rounded'>
                    https://api.terraquakeapi.com/v1/stations
                  </code>
                </p>
                <p className='text-white/80 mt-2'>
                  <strong>{t('docs_stations.authentication')}</strong> {t('docs_stations.token_required')}
                </p>

                <h3 className='mt-4 text-lg font-semibold text-white'>
                  {t('docs_stations.rate_limits')}
                </h3>
                <p className='text-white/80'>
                  {t('docs_stations.fixed')} <strong>{t('docs_stations.requests')}</strong>
                </p>
                <p className='text-white/70 text-sm mt-2'>
                  {t('docs_stations.headers')}{' '}
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
                  {t('docs_stations.parameters')}
                </h2>
                <p className='text-white/80 mt-2'>{t('docs_stations.endpoints')}</p>
                <ul className='list-disc list-inside text-white/80 mt-2'>
                  <li>
                    <code>page</code> — {t('docs_stations.integer')} <strong>1</strong>
                  </li>
                  <li>
                    <code>limit</code> — {t('docs_stations.integer')} <strong>50</strong>
                  </li>
                </ul>
                <p className='text-white/70 text-sm mt-2'>
                  {t('docs_stations.example')}{' '}
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
                  {t('docs_stations.response_format')}
                </h2>
                <p className='text-white/80 mt-2'>{t('docs_stations.all_response')}</p>
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
                  {t('docs_stations.api_stations')}
                </h2>
                <p className='text-white/80 mt-2'>
                  {t('docs_stations.available')}
                </p>

                <div className='mt-4 overflow-x-auto rounded border border-white/5 bg-slate-900/30'>
                  <table className='w-full text-sm'>
                    <thead className='bg-slate-800/60'>
                      <tr>
                        <th className='p-3 text-left'>{t('docs_stations.method')}</th>
                        <th className='p-3 text-left'>{t('docs_stations.endpoint')}</th>
                        <th className='p-3 text-left'>{t('docs_stations.description')}</th>
                        <th className='p-3 text-left'>
                          {t('docs_stations.query_params')} (* req = {t('docs_stations.required')})
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
                  <h4 className='font-semibold text-white'>{t('docs_stations.example_request')}</h4>
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
                  <h4 className='font-semibold text-white'>{t('docs_stations.example_response')}</h4>
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
                <h2 className='text-xl font-bold text-white'>{t('docs_stations.stations')}</h2>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/stations
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_stations.return')}
                  </p>
                </article>
              </section>

              {/* Stations-geoJSON */}
              <section
                id='stations-geojson'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-xl font-bold text-white'>
                  {t('docs_stations.station_geojson')}
                </h2>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/earthquakes/stations/geojson
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_stations.mapping')}
                  </p>
                </article>
              </section>

              {/* Stations-events code */}
              <section
                id='stations-events'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-xl font-bold text-white'>
                  {t('docs_stations.station_code')}
                </h2>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/stations/code?code=ACATE
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_stations.return_404')}
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
                  {t('docs_stations.station_property')}
                </h2>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/stations/open
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_stations.return_filtering')}
                  </p>
                </article>

                <article className='mt-4'>
                  <h4 className='font-semibold text-white'>
                    GET /v1/stations/closed
                  </h4>
                  <p className='text-white/80'>
                    {t('docs_stations.return_analysis')}
                  </p>
                </article>
              </section>

              {/* Error Handling */}
              <section
                id='error-handling'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-2xl font-bold text-white'>
                  {t('docs_stations.error_handling')}
                </h2>
                <p className='text-white/80 mt-2'>
                  {t('docs_stations.return_error')}
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
                    <strong>400</strong> Bad Request — {t('docs_stations.invalid_parameters')}
                  </li>
                  <li>
                    <strong>404</strong> Not Found — {t('docs_stations.resource_missing')}
                  </li>
                  <li>
                    <strong>429</strong> Too Many Requests — {t('docs_stations.rate_limit')}
                  </li>
                  <li>
                    <strong>500/503</strong> — {t('docs_stations.server_issues')}
                  </li>
                </ul>
              </section>

              {/* Code Examples */}
              <section
                id='code-examples'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-2xl font-bold text-white'>{t('docs_stations.code_examples')}</h2>
                <p className='text-white/80 mt-2'>
                  {t('docs_stations.examples')}
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

              {/* Support */}
              <section
                id='support'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-2xl font-bold text-white'>
                  {t('docs_stations.support')}
                </h2>
                <p className='text-white/80 mt-2'>
                  {t('docs_stations.features_github')}
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
                      {t('docs_stations.discussions')}
                    </a>
                  </li>
                </ul>
                <p className='mt-4 text-sm text-white/60'>
                  {t('docs_stations.project')}
                </p>
              </section>

              {/* API Information */}
              <section
                id='api-information'
                className='scroll-mt-[120px] py-16'
              >
                <h2 className='text-2xl font-bold text-white'>
                  {t('docs_stations.api_information')}
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
