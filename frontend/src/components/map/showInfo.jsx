import { useState } from 'react';
import { FaInfo } from 'react-icons/fa';

export default function ShowInfo({ earthquakeData }) {
  const urlBackend = import.meta.env.VITE_URL_BACKEND;
  const [show, setShow] = useState(false);

  const features = [
    'Real-time earthquake data',
    'Shows realtime user location',
    'Interactive map with zoom and pan',
    'Markers indicating earthquake epicenters',
    'Click markers for detailed info',
    'Responsive design for all devices',
    'Download map data and image',
    'Clear all markers with a button',
  ];

  return (
    <section className="flex flex-col sm:flex-row sm:items-center sm:gap-10 gap-4 w-full">
      {/* Info Button */}
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="flex justify-center items-center gap-2 text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full cursor-pointer m-2 py-2 px-6 shadow-md hover:scale-105 transition-all duration-300"
        >
          <FaInfo />
          <span className="text-lg">Info</span>
        </button>

        {/* Popup */}
        {show && (
          <div
            className="
              absolute 
              top-full left-0 
              mt-2 
              w-72 sm:w-80 
              bg-black/90 
              border border-white/20 
              rounded-lg 
              p-4 
              text-xs sm:text-sm 
              shadow-xl 
              z-50 
              max-w-[90vw] 
              animate-fadeIn
            "
          >
            <p className="text-pink-400 font-semibold mb-2 text-sm sm:text-base">
              Features:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* View Path */}
      <p className="relative text-left w-full max-w-[90vw] sm:max-w-none mx-auto text-sm sm:text-base break-words">
        <span className="font-semibold">View path:</span>{' '}
        <span className="text-gray-400 font-mono block sm:inline">
          {urlBackend && earthquakeData?.meta?.path
            ? `${urlBackend}${earthquakeData.meta.path}`
            : 'No path available'}
        </span>
      </p>
    </section>
  );
}
