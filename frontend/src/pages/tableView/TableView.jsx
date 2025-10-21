import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import BackToTopButton from '@/components/utils/BackToTopButton';
import MetaData from '../noPage/MetaData';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';

export default function TableView() {
  const BACKEND_URL =
    import.meta.env.VITE_URL_BACKEND || 'http://localhost:5001';
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'time',
    direction: 'descending',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/v1/earthquakes/recent?limit=1000`
        );
        setEarthquakes(response.data.data);
        setLoading(false);
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch earthquake data. Please ensure the backend server is running.',
          icon: 'error',
          confirmButtonText: 'Ok',
        }).then(() => {
          setLoading(false);
          navigate('/explore-data', { replace: true });
        });
      }
    };

    fetchEarthquakes();
  }, []);

  const sortedAndFilteredEarthquakes = useMemo(() => {
    let sortableItems = [...earthquakes];
    if (searchTerm) {
      sortableItems = sortableItems.filter((quake) =>
        quake.properties.place.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === 'time') {
          aValue = new Date(a.properties.time);
          bValue = new Date(b.properties.time);
        } else if (sortConfig.key === 'mag' || sortConfig.key === 'depth') {
          aValue =
            sortConfig.key === 'mag'
              ? a.properties.mag
              : a.geometry.coordinates[2];
          bValue =
            sortConfig.key === 'mag'
              ? b.properties.mag
              : b.geometry.coordinates[2];
        } else {
          aValue = a.properties[sortConfig.key];
          bValue = b.properties[sortConfig.key];
        }
        if (aValue < bValue)
          return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [earthquakes, searchTerm, sortConfig]);

  const totalPages = Math.ceil(
    sortedAndFilteredEarthquakes.length / itemsPerPage
  );
  const paginatedData = sortedAndFilteredEarthquakes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
  };

  const handleExport = () => {
    const dataToExport = sortedAndFilteredEarthquakes;
    const headers = [
      'Time (UTC)',
      'Magnitude',
      'Depth (km)',
      'Latitude',
      'Longitude',
      'Location',
    ];
    const csvRows = [
      headers.join(','),
      ...dataToExport.map((quake) =>
        [
          `"${new Date(quake.properties.time).toISOString()}"`,
          quake.properties.mag,
          quake.geometry.coordinates[2],
          quake.geometry.coordinates[1],
          quake.geometry.coordinates[0],
          `"${quake.properties.place.replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'earthquake_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Seismic Events | TerraQuake API - Real-Time Earthquake Data Table'
        description='Explore and interact with real-time earthquake data. Switch to tabular view to see recent seismic events by date, magnitude, depth, coordinates, and location. Export results in CSV format and search by location for detailed analysis.'
        ogTitle='Seismic Events | TerraQuake API'
        ogDescription='View and analyze recent seismic events in tabular format. Sort, search, and export real-time earthquake data from the TerraQuake API.'
        twitterTitle='Seismic Events | TerraQuake API'
        twitterDescription='Discover recent earthquakes in real-time. View detailed seismic event data, sort by date, search by location, and export to CSV for research.'
        keywords='TerraQuake API, real-time earthquake data, seismic events table, earthquake CSV export, earthquake monitoring, seismic data analysis'
      />
      {/* SEO Stuff */}

      <motion.section
        className='relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Gradient/Mesh (for a classy, dark theme) */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>
        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12'>
          <div className='mb-8'>
            <Link
              to='/explore-data'
              className='relative z-50 inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors duration-200 cursor-pointer'
            >
              ← Back to Map View
            </Link>
          </div>

          {/* Title */}
          <motion.div
            className='mb-12 text-center'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl md:text-5xl font-extrabold text-white mb-4'>
              Earthquake Data - Tabular View.
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-left text-white/70 max-w-7xl'>
              Explore the most recent seismic events recorded worldwide. Each
              entry includes the event date and time (UTC), magnitude, depth
              (km), latitude, longitude, and location. You can search events by
              location, sort the table by date, and export the data in CSV
              format for further analysis or research. Stay up to date with
              real-time earthquake information and monitor seismic activity with
              ease.
            </p>
          </motion.div>

          {loading && (
            <p className='flex justify-center mt-16 text-center text-2xl'>
              <ImSpinner9 className='mr-2 animate-spin text-indigo-600' />
              Loading data...
            </p>
          )}
          {error && <p className='text-red-500'>{error}</p>}

          {!loading && !error && (
            <>
              <div className='flex flex-col lg:flex-row gap-6 justify-between items-center mb-4'>
                <input
                  type='text'
                  placeholder='Search by location...'
                  className='w-2/3 p-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <button
                  onClick={handleExport}
                  className='py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
                >
                  Export as CSV
                </button>
              </div>
              <div className='overflow-x-auto border border-white/5 bg-white/[0.03] bg-opacity-50 rounded-lg'>
                <table className='min-w-full divide-y divide-gray-700'>
                  <thead className='bg-gray-800 bg-opacity-70'>
                    <tr>
                      <th
                        onClick={() => requestSort('time')}
                        className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                      >
                        Date & Time (UTC){getSortIndicator('time')}
                      </th>
                      <th
                        onClick={() => requestSort('mag')}
                        className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                      >
                        Magnitude{getSortIndicator('mag')}
                      </th>
                      <th
                        onClick={() => requestSort('depth')}
                        className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                      >
                        Depth (km){getSortIndicator('depth')}
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Latitude
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Longitude
                      </th>
                      <th
                        onClick={() => requestSort('place')}
                        className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                      >
                        Location{getSortIndicator('place')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-800'>
                    {paginatedData.map((quake) => (
                      <tr
                        key={quake.properties.eventId}
                        className='hover:bg-gray-800 transition-colors'
                      >
                        <td className='text-sm px-6 py-4 whitespace-nowrap'>
                          {new Date(quake.properties.time).toLocaleString()}
                        </td>
                        <td className='text-sm px-6 py-4 whitespace-nowrap'>
                          {quake.properties.mag.toFixed(2)}{' '}
                          {quake.properties.magType}
                        </td>
                        <td className='text-sm px-6 py-4 whitespace-nowrap'>
                          {quake.geometry.coordinates[2]}
                        </td>
                        <td className='text-sm px-6 py-4 whitespace-nowrap'>
                          {quake.geometry.coordinates[1]}
                        </td>
                        <td className='text-sm px-6 py-4 whitespace-nowrap'>
                          {quake.geometry.coordinates[0]}
                        </td>
                        <td className='text-sm px-6 py-4 whitespace-nowrap'>
                          {quake.properties.place}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='flex justify-between items-center mt-4'>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className='py-2 px-4 border border-gray-400 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-gray-300 font-medium rounded-full cursor-pointer'
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className='py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}
