/**
 * @fileoverview ViewMap component for displaying a map with markers of earthquake epicenter.
 * @author Koustubh Badshah <www.github.com/frustateduser>
 */

import React, { useEffect, useRef } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import "ol/ol.css";
import Link from "ol/interaction/Link";
import ShowInfo from "./ShowInfo";
import { downloadMap, fetchLocation, addEarthquakeMarkers } from "./mapUtil";
import ShowProperties from "./ShowProperties";


const ViewMap = ({earthquakeData}) => {
  const mapRef = useRef(null); // Reference to map instance
  const mapInstance = useRef(null); // Store map instance
  const data = earthquakeData?.data;
  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map only once
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        projection: "EPSG:3857",
        center: [0, 0],
        zoom: 0,
      }),
    });

    map.addInteraction(new Link()); //page reloads keep the map view stable
    fetchLocation(map); // Fetch and display user location
    
    mapInstance.current = map;
    

    // Cleanup on unmount
    return () => map.setTarget(null);
  }, []);

    useEffect(() => {
        if(data && mapInstance.current){
            addEarthquakeMarkers(mapInstance.current, data);
        }
    }, [data]);

  return (
    <>
      <section className="w-full text-white py-16 min-h-[70vh] flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            Earthquake Map
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore real-time earthquake epicenters plotted on the map. Zoom in
            and pan to analyze seismic activity globally.
          </p>
        </div>

        <div className="w-full max-w-6xl bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl">
          <ShowInfo/>
          <ShowProperties mapInstance={mapInstance.current} />
          <div
            ref={mapRef}
            className="rounded-xl"
            style={{ height: "100vh", width: "100%" }}
          />
          <div className="flex flex-row justify-between items-center">
            <button
              onClick={() => {
                if (mapInstance.current) {
                  // Clear all markers from the map
                  addEarthquakeMarkers(mapInstance.current, ['clear']);
                }
              }}
              className="mt-4 py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors"
            >
              Clear Map
            </button>

            <button 
            className="mt-4 py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors"
            onClick={() => {
              downloadMap(mapRef,data);
            }}
            >Download Map</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewMap;
