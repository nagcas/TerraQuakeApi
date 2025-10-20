/**
 * @fileoverview ViewMap component for displaying a map with earthquake epicenter markers.
 * @author Koustubh Badshah
 */

import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import 'ol/ol.css';
import { defaults as defaultInteractions } from 'ol/interaction.js';
import Link from 'ol/interaction/Link';
import ShowInfo from './ShowInfo';
import { downloadMap, fetchLocation, addEarthquakeMarkers } from './MapUtil';
import ShowProperties from './ShowProperties';
import Legend from './Legend';

export default function ViewMap({ earthquakeData }) {
  const [currentEarthquakeData, setCurrentEarthquakeData] =
    useState(earthquakeData);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const data = earthquakeData?.data;

  useEffect(() => {
    setCurrentEarthquakeData(earthquakeData);
  }, [earthquakeData]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2,
      }),
      interactions: defaultInteractions({ mouseWheelZoom: false }),
    });

    map.addInteraction(new Link());
    fetchLocation(map);

    mapInstance.current = map;

    return () => map.setTarget(null);
  }, []);

  useEffect(() => {
    if (data && mapInstance.current) {
      addEarthquakeMarkers(mapInstance.current, data);
    }
  }, [data]);

  return (
    <section className='w-full text-white py-16 min-h-[70vh] flex flex-col items-center'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl md:text-5xl font-bold mb-2'>TerraQuake Map</h2>
        <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
          Explore real-time earthquake epicenters plotted on the map. Zoom in
          and pan to analyze seismic global
        </p>
      </div>

      <div className='w-full max-w-6xl bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl'>
        <ShowInfo earthquakeData={currentEarthquakeData} />
        <ShowProperties mapInstance={mapInstance.current} />
        <div
          ref={mapRef}
          className='relative rounded-xl'
          style={{ position: 'relative', height: '100vh', width: '100%' }}
        >
          <Legend />
        </div>

        <div className='flex flex-row justify-between items-center mt-4'>
          <button
            onClick={() => {
              addEarthquakeMarkers(mapInstance.current, ['clear']);
              setCurrentEarthquakeData(null);
            }}
            className='py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
          >
            Clear Map
          </button>

          <button
            onClick={() => downloadMap(mapRef, data)}
            className='py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
          >
            Download Map
          </button>
        </div>
      </div>
    </section>
  );
};
