import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import BackToTopButton from '@/components/utils/BackToTopButton';
import MetaData from '../noPage/MetaData';
import Swal from 'sweetalert2';
import Spinner from '@/components/spinner/Spinner';
import { useTranslation } from 'react-i18next';

export default function TableViewStations() {
  const { t } = useTranslation('translation');

  const BACKEND_URL =
    import.meta.env.VITE_URL_BACKEND || 'http://localhost:5001';
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'code',
    direction: 'ascending',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/v1/stations?limit=1000`
        );
        const { payload } = response.data;
        setStations(payload);
        setLoading(false);
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch stations data. Please ensure the backend server is running.',
          icon: 'error',
          confirmButtonText: 'Ok',
        }).then(() => {
          setLoading(false);
          navigate('/explore-data', { replace: true });
        });
      }
    };
    fetchStations();
  }, [BACKEND_URL, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Sorting + Search
  const sortedAndFilteredStations = useMemo(() => {
    let sortableItems = [...stations];
    if (searchTerm) {
      sortableItems = sortableItems.filter(
        (station) =>
          station.Site?.Name?.toLowerCase().includes(
            searchTerm.toLowerCase()
          ) || station.$.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue, bValue;

        switch (sortConfig.key) {
          case 'code':
            aValue = a.$.code;
            bValue = b.$.code;
            break;
          case 'name':
            aValue = a.Site?.Name || '';
            bValue = b.Site?.Name || '';
            break;
          case 'elevation':
            aValue = parseFloat(a.Elevation);
            bValue = parseFloat(b.Elevation);
            break;
          case 'startDate':
            aValue = new Date(a.$.startDate);
            bValue = new Date(b.$.startDate);
            break;
          default:
            aValue = a.$[sortConfig.key] || '';
            bValue = b.$[sortConfig.key] || '';
        }

        if (aValue < bValue)
          return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return sortableItems;
  }, [stations, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedAndFilteredStations.length / itemsPerPage);
  const paginatedData = sortedAndFilteredStations.slice(
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

  // Export CSV
  const handleExport = () => {
    setLoading(true);

    const headers = [
      t('table_view_stations.list_code'),
      t('table_view_stations.list_station_name'),
      t('table_view_stations.list_latitude'),
      t('table_view_stations.list_longitude'),
      t('table_view_stations.list_elevation'),
      t('table_view_stations.list_start_date'),
      t('table_view_stations.list_restricted_status'),
    ];
    const rows = sortedAndFilteredStations.map((s) => [
      s.$.code,
      s.Site?.Name || '',
      s.Latitude,
      s.Longitude,
      s.Elevation,
      s.$.startDate,
      s.$.restrictedStatus,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'stations_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);
  };

  const formatValue = (val) => {
    if (val == null) return '-';
    if (typeof val === 'object') {
      // Se ha una chiave '_' (tipico delle conversioni XML)
      if ('_' in val) return val._;
      // Altrimenti mostriamo in modo leggibile
      return JSON.stringify(val);
    }
    return val;
  };

  return (
    <>
      {/* SEO MetaData */}
      <MetaData
        title='Seismic Stations | TerraQuake API - Global Stations Data Table'
        description='Explore and interact with global seismic monitoring stations data in tabular format. View station code, name, coordinates, and operational status. Export data to CSV and sort by location or code.'
        ogTitle='Seismic Stations | TerraQuake API'
        ogDescription='View and analyze seismic station data from the TerraQuake API. Sort, search, and export global network data.'
        twitterTitle='Seismic Stations | TerraQuake API'
        twitterDescription='Explore worldwide seismic stations with TerraQuake API. Search, sort, and export global station data for research or analysis.'
        keywords='TerraQuake API, seismic stations, INGV network, global seismic data, CSV export, seismograph stations'
      />

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
              to='/explore-data/stations'
              className='relative z-50 inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors duration-200 cursor-pointer'
            >
              {t('table_view_stations.back_to_map')}
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
              {t('table_view_stations.title')}
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center text-white/70 max-w-5xl mx-auto'>
              {t('table_view_stations.description')}
            </p>
          </motion.div>

          {loading ? (
            <div className='flex justify-center mt-16'>
              <Spinner />
            </div>
          ) : (
            <>
              <div className='flex flex-col lg:flex-row gap-6 justify-between items-center mb-4'>
                <input
                  type='text'
                  placeholder={t('table_view_stations.search')}
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
                  {loading ? <Spinner /> : 
                  t('table_view_stations.export_csv')}
                </button>
              </div>

              <div className='overflow-x-auto border border-white/5 bg-white/[0.03] rounded-lg'>
                <table className='min-w-full divide-y divide-gray-700'>
                  <thead className='bg-gray-800 bg-opacity-70'>
                    <tr className='text-purple-300 uppercase text-xs tracking-wider'>
                      <th
                        onClick={() => requestSort('code')}
                        className='cursor-pointer px-6 py-3 text-left hover:text-purple-400'
                      >
                        {t('table_view_stations.export_csv')} {getSortIndicator('code')}
                      </th>
                      <th
                        onClick={() => requestSort('name')}
                        className='cursor-pointer px-6 py-3 text-left hover:text-purple-400'
                      >
                        {t('table_view_stations.station_name')}{getSortIndicator('name')}
                      </th>
                      <th
                        
                        className='px-6 py-3 text-left hover:text-purple-400'
                      >
                        {t('table_view_stations.latitude')}
                      </th>
                      <th
                        
                        className='px-6 py-3 text-left hover:text-purple-400'
                      >
                        {t('table_view_stations.longitude')}
                      </th>
                      <th
                        onClick={() => requestSort('elevation')}
                        className='cursor-pointer px-6 py-3 text-left hover:text-purple-400'
                      >
                        {t('table_view_stations.elevation')}{getSortIndicator('elevation')}
                      </th>
                      <th
                        onClick={() => requestSort('startDate')}
                        className='cursor-pointer px-6 py-3 text-left hover:text-purple-400'
                      >
                        {t('table_view_stations.start_date')}{getSortIndicator('startDate')}
                      </th>
                      <th className='px-6 py-3 text-left'>
                        {t('table_view_stations.status')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-800'>
                    {paginatedData.map((station, i) => (
                      <tr
                        key={`${station.$.code}-${i}`}
                        className='hover:bg-purple-500/10 transition-colors'
                      >
                        <td className='px-6 py-4'>
                          {formatValue(station.$.code)}
                        </td>
                        <td className='px-6 py-4'>
                          {formatValue(station.Site?.Name)}
                        </td>
                        <td className='px-6 py-4'>
                          {formatValue(station.Latitude)}
                        </td>
                        <td className='px-6 py-4'>
                          {formatValue(station.Longitude)}
                        </td>
                        <td className='px-6 py-4'>
                          {formatValue(station.Elevation)}
                        </td>
                        <td className='px-6 py-4'>
                          {station.$?.startDate
                            ? new Date(station.$.startDate).toLocaleDateString()
                            : '-'}
                        </td>
                        <td className='px-6 py-4 capitalize'>
                          {formatValue(station.$?.restrictedStatus)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className='flex justify-between items-center mt-6 text-white'>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className='py-2 px-4 border border-gray-500 hover:bg-white hover:text-black rounded-full transition cursor-pointer'
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
                  className='py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full cursor-pointer'
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
