import React, { useEffect, useState } from 'react';
import axios from '@config/Axios.js';

export default function Metrics() {
  const [highlightMetrics, setHighlightMetrics] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [metricsError, setMetricsError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoadingMetrics(true);
        const response = await axios.get(`/v1/metrics/json`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        const { payload } = response.data;

        setHighlightMetrics([
          {
            value: payload.eventsProcessed?.toLocaleString() || 'N/A',
            label: 'Events Processed',
            description: 'Real-time earthquakes normalized and accessible',
          },
          {
            value: `${payload.apiLatencyAvgMs} ms`,
            label: 'API Latency',
            description: 'Average API response time',
          },
          {
            value: `${Math.floor(payload.uptime)} s`,
            label: 'Uptime',
            description: 'Time since last server restart',
          },
          {
            value: '24/7',
            label: 'Data Monitoring',
            description: 'Continuous ingestion from trusted observatories',
          },
        ]);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Unable to load metrics. Please try again later.';
        setMetricsError(message);
      } finally {
        setLoadingMetrics(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000); // refresh every 10s
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
        <h2 className='text-3xl md:text-4xl font-bold text-red-500 my-16'>
          Failed to Load Metrics
        </h2>
        <p>{metricsError}</p>
      </section>
    );
  }

  return (
    <section className='p-6 md:p-0'>
      <h2 className='text-3xl md:text-4xl text-center font-bold text-white my-16'>
        System Performance and Reliability Metrics
      </h2>

      <div className='max-w-7xl mx-auto grid gap-4 md:grid-cols-4 mb-6 md:mb-[150px]'>
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
