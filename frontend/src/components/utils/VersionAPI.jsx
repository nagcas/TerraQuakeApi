import React, { useEffect, useState } from 'react';
import axios from '@config/Axios.js';
import Spinner from '../spinner/Spinner';

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
    <section className="my-4">
      <div className="max-w-md mx-auto shadow-lg p-4 flex flex-col gap-4 text-white">
        <h3 className="text-lg font-bold text-purple-400">API Information</h3>
        <div className="flex items-center sm:justify-center gap-16 xl:gap-4">
          <div className="bg-purple-400/20 py-2 px-6 rounded-md text-black font-semibold">
            Version: <p className="font-bold">{api.version}</p>
          </div>
          <div className="text-sm text-gray-300">
            Last updated: <p className="font-medium">{api.date}</p>
          </div>
          <div className="text-sm text-gray-300">
            Author: <p className="font-medium">{api.author}</p>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-300">
        Project: <p className="font-medium">{api.project}</p>
      </div>
    </section>
  );
}

