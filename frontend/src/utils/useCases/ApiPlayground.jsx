import React, { useState } from 'react';
import { FiPlay, FiLoader, FiAlertTriangle, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import CodeSnippet from '@/utils/useCases/CodeSnippet';


const ApiPlayground = ({ url }) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setResponse(null);
    setError(null);
    try {
      await new Promise(res => setTimeout(res, 600)); 
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearResponse = () => {
    setResponse(null);
    setError(null);
  };

  return (
    <div className="mt-6 p-4 rounded-xl border border-dashed border-white/20 bg-black/20">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-purple-300">Live API Playground</p>
        <button
          onClick={fetchData}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><FiLoader /></motion.div> : <FiPlay />}
          <span>{isLoading ? 'Fetching...' : 'Run Request'}</span>
        </button>
      </div>

      <AnimatePresence>
        {(response || error) && (
          <motion.div
            className="relative mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5, transition: { duration: 0.2 } }}
          >
            <button
              onClick={handleClearResponse}
              aria-label="Close response"
              className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-colors"
            >
              <FiX size={16} />
            </button>
            
            {response && (
              <div className="relative mt-3 max-h-[400px] overflow-auto rounded-lg bg-black/40 border border-white/10">
                <CodeSnippet code={response} language="json" />
              </div>
            )}
            
            {error && (
              <div className="mt-4 flex items-center gap-2 text-sm text-red-400 p-3 rounded-lg bg-red-500/10">
                <FiAlertTriangle />
                <span>Error: {error}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApiPlayground;