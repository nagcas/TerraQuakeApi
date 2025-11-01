import React, { useEffect, useState } from 'react';
import axios from '@config/Axios.js';
import Spinner from '../spinner/Spinner';
import { formatDate } from './FormatDate.js';

export default function VersionAPI() {
  const [api, setApi] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVersion();
  }, []);

  const fetchVersion = async () => {
    setLoading(true);
    try {
      const response = await axios('/v1/test', {
        headers: { 'Content-Type': 'application/json' },
      });
      setApi(response.data);
    } catch (error) {
      console.error('Error fetching API version:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!api) return null;

  return (
    <section className="my-8 px-4">
      <div className="max-w-4xl mx-auto bg-[#1a1733]/60 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg p-6 flex flex-col gap-6 text-white">
        <h3 className="text-xl sm:text-2xl font-bold text-purple-400 text-center">
          API Information
        </h3>

        {/* Info grid responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-purple-400/20 py-3 px-4 rounded-md font-semibold text-white">
            <p className="text-xs uppercase text-purple-300/70 tracking-wider">
              Version
            </p>
            <p className="text-lg font-bold text-purple-300">{api.version}</p>
          </div>

          <div className="bg-purple-400/10 py-3 px-4 rounded-md">
            <p className="text-xs uppercase text-purple-300/70 tracking-wider">
              Last updated
            </p>
            <p className="text-sm sm:text-base font-medium">{formatDate(api.date)}</p>
          </div>

          <div className="bg-purple-400/10 py-3 px-4 rounded-md">
            <p className="text-xs uppercase text-purple-300/70 tracking-wider">
              Author
            </p>
            <p className="text-sm sm:text-base font-medium">{api.author}</p>
          </div>

          <div className="bg-purple-400/10 py-3 px-4 rounded-md">
            <p className="text-xs uppercase text-purple-300/70 tracking-wider">
              Project
            </p>
            <p className="text-sm sm:text-base font-medium">{api.project.slice(16, 28)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
