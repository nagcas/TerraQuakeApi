/**
 * Showable info popup component for map features.
 * @author Koustubh Badshah <www.github.com/frustateduser>
 */

import { useState } from 'react';
import { FaInfo } from 'react-icons/fa';

export default function ShowInfo({ earthquakeData }) {
  const urlBackend = import.meta.env.VITE_URL_BACKEND;

  const [show, setShow] = useState(false);

  // List of features to display in the popup
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
    <section className='flex items-center gap-10'>
      <div
        className='relative inline-block'
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {/* Info Icon and path endpoint */}

        <div className='flex justify-center items-center gap-2 text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full cursor-pointer m-2 py-2 px-6'>
          <FaInfo />
          <span className='text-lg'>Info</span>
        </div>

        {/* Popup */}
        {show && (
          <div className='absolute left-[120px] top-0 w-80 bg-black/90 border border-white/20 rounded-lg p-4 text-sm shadow-lg z-50'>
            <p className='text-pink-400 font-semibold mb-2'>Features:</p>
            <ul className='list-disc list-inside space-y-1 text-gray-300'>
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p className='py-3'>
        View path:{' '}
        <span className='text-gray-400 font-mono'>
          {urlBackend && earthquakeData?.meta?.path
            ? `${urlBackend}${earthquakeData.meta.path}`
            : 'No path available'}
        </span>
      </p>
    </section>
  );
}
