import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TableView() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'time', direction: 'descending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const response = await axios.get('http://localhost:5002/v1/earthquakes/recent?limit=1000');
        setEarthquakes(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch earthquake data. Please ensure the backend server is running.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchEarthquakes();
  }, []);

  const sortedAndFilteredEarthquakes = useMemo(() => {
    let sortableItems = [...earthquakes];
    if (searchTerm) {
      sortableItems = sortableItems.filter(quake =>
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
          aValue = sortConfig.key === 'mag' ? a.properties.mag : a.geometry.coordinates[2];
          bValue = sortConfig.key === 'mag' ? b.properties.mag : b.geometry.coordinates[2];
        } else {
          aValue = a.properties[sortConfig.key];
          bValue = b.properties[sortConfig.key];
        }
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [earthquakes, searchTerm, sortConfig]);

  const totalPages = Math.ceil(sortedAndFilteredEarthquakes.length / itemsPerPage);
  const paginatedData = sortedAndFilteredEarthquakes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    const headers = ["Time (UTC)", "Magnitude", "Depth (km)", "Latitude", "Longitude", "Location"];
    const csvRows = [
      headers.join(','),
      ...dataToExport.map(quake => [
        `"${new Date(quake.properties.time).toISOString()}"`,
        quake.properties.mag,
        quake.geometry.coordinates[2],
        quake.geometry.coordinates[1],
        quake.geometry.coordinates[0],
        `"${quake.properties.place.replace(/"/g, '""')}"`
      ].join(','))
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
    <div className="container mx-auto p-4 text-white">
      <div className="mb-8">
        <Link to="/explore-data" className="text-blue-400 hover:underline">
          ← Back to Map View
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">
        Earthquake Data - Tabular View
      </h1>

      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by location..."
              className="w-2/3 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button
              onClick={handleExport}
              className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors"
            >
              Export as CSV
            </button>
          </div>
          <div className="overflow-x-auto bg-gray-900 bg-opacity-50 rounded-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800 bg-opacity-70">
                <tr>
                  <th onClick={() => requestSort('time')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date & Time (UTC){getSortIndicator('time')}</th>
                  <th onClick={() => requestSort('mag')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Magnitude{getSortIndicator('mag')}</th>
                  <th onClick={() => requestSort('depth')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Depth (km){getSortIndicator('depth')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Latitude</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Longitude</th>
                  <th onClick={() => requestSort('place')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location{getSortIndicator('place')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paginatedData.map((quake) => (
                  <tr key={quake.properties.eventId} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(quake.properties.time).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{quake.properties.mag.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{quake.geometry.coordinates[2]}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{quake.geometry.coordinates[1]}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{quake.geometry.coordinates[0]}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{quake.properties.place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-600"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-600"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TableView;