import React, { useEffect, useState } from 'react';
import axios from '@config/Axios.js';

export default function Metrics() {
  const [highlightMetrics, setHighlightMetrics] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [metricsError, setMetricsError] = useState(null);

  const [totalEventsProcessed, setTotalEventsProcessed] = useState(0);

  useEffect(() => {
    let firstLoad = true;

    const fetchMetrics = async () => {
      try {
        if (firstLoad) setLoadingMetrics(true);

        const response = await axios.get('/v1/metrics/json', {
          headers: { 'Content-Type': 'application/json' },
        });

        const { payload } = response.data;

        setTotalEventsProcessed(payload.totalEventsProcessed);

        setHighlightMetrics([
          {
            value: payload.totalEventsProcessed?.toLocaleString('it-IT') || 'N/A',
            label: 'Events Processed',
            description: 'Real-time earthquakes normalized and accessible',
          },
          {
            value: `${payload.apiLatencyAvgMs} ms`,
            label: 'API Latency',
            description: 'Average API response time',
          },
          {
            value: '24/7',
            label: 'Data Monitoring',
            description: 'Continuous ingestion from trusted observatories',
          },
        ]);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setMetricsError(
          error?.response?.data?.message ||
            error?.response?.data?.error ||
            'Unable to load metrics. Please try again later.'
        );
      } finally {
        setLoadingMetrics(false);
        firstLoad = false;
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loadingMetrics) {
    return (
      <section className='p-6 md:p-0 text-center text-gray-300'>
        <h2 className='text-3xl md:text-4xl font-bold text-white my-16'>
          Loading System Metrics...
        </h2>
        <p>Please wait while we retrieve real-time performance data.</p>
      </section>
    );
  }

  if (metricsError) {
    return (
      <section className='p-6 md:p-0 text-center text-gray-300'>
        <h2 className='text-3xl md:text-4xl font-bold text-red-400 my-6'>
          Failed to Load Metrics
        </h2>
        <p className='mb-16'>{metricsError}</p>
      </section>
    );
  }

  return (
    <section className='p-6 md:p-0'>
      <h2 className='text-3xl md:text-4xl text-center font-bold text-white my-16'>
        System Performance and Reliability Metrics
      </h2>

      <div className='max-w-7xl mx-auto grid gap-4 grid-cols-2 p-6 xl:grid-cols-3 mb-6 md:mb-[150px]'>
        {highlightMetrics.map((metric) => (
          <div
            key={metric.label}
            className='group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-6 backdrop-blur-sm transition-all duration-400 hover:border-purple-400/30 hover:bg-white/[0.05]'
          >
            <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent' />
            <div className='relative'>
              <span className='text-2xl md:text-3xl font-semibold text-white tracking-tight'>
                {metric.value}
              </span>
              <p className='mt-1 text-sm uppercase tracking-[0.2em] text-purple-200/70'>
                {metric.label}
              </p>
              <p className='mt-3 text-sm text-gray-300 leading-relaxed'>
                {metric.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
