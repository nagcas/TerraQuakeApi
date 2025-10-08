/**
 * Utility functions for map operations
 * @module mapUtil
 * @author Koustubh Badshah <www.github.com/frustateduser>
 */

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { circular } from 'ol/geom/Polygon';
import Control from 'ol/control/Control';
import { fromLonLat } from 'ol/proj';
import { Fill, Icon, Style } from 'ol/style';
import kompas from 'kompas';
import compassIcon from '@/assets/svgs/compass.svg';
import { Stroke } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import html2canvas from "html2canvas";

/**
 * Download the current map view as a PNG image including the legend,
 * and optionally earthquake data as JSON.
 *
 * @param {React.RefObject} mapRef - Reference to the map container element
 * @param {Array} data - Optional earthquake data array
 */
export const downloadMap = async (mapRef, data) => {
  if (!mapRef.current) return; // Exit if the map reference is not available

  // Create a timestamp for the filename (e.g., 2025-10-07_18-32-10)
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace("T", "_")
    .replace(/:/g, "-")
    .split(".")[0];

  // Get all canvas elements from the map (each OpenLayers layer is a separate canvas)
  const canvases = mapRef.current.querySelectorAll("canvas");
  if (!canvases.length) return;

  // Create a new canvas to merge all layers into a single image
  const exportCanvas = document.createElement("canvas");
  const width = canvases[0].width;
  const height = canvases[0].height;
  exportCanvas.width = width;
  exportCanvas.height = height;

  // Get the 2D drawing context
  const context = exportCanvas.getContext("2d", { willReadFrequently: true });

  // Step 1 — Draw all map layers onto the export canvas
  canvases.forEach((canvas) => {
    if (canvas.width > 0 && canvas.height > 0) {
      context.drawImage(canvas, 0, 0);
    }
  });

  // Step 2 — Draw the legend onto the export canvas (if present)
  const legendElement = document.querySelector(".legend");
  if (legendElement) {
    // Use html2canvas to convert the legend HTML to a canvas
    const legendCanvas = await html2canvas(legendElement, { backgroundColor: null });
    const legendX = width - legendCanvas.width - 20; // horizontal position
    const legendY = height - legendCanvas.height - 20; // vertical position
    context.drawImage(legendCanvas, legendX, legendY); // draw the legend on the map
  }

  // Step 3 — Optionally add title and timestamp on the image
  context.font = "bold 24px Arial";
  context.fillStyle = "black";
  context.strokeStyle = "black";
  context.lineWidth = 1;

  const title = "TerraQuake API";
  const dateStr = now.toLocaleString();

  // Draw the title
  context.strokeText(title, 20, 40);
  context.fillText(title, 20, 40);

  // Draw the download timestamp
  context.font = "16px Arial";
  context.strokeText(dateStr, 20, 65);
  context.fillText(dateStr, 20, 65);

  // Step 4 — Convert the combined canvas to a PNG image
  const image = exportCanvas.toDataURL("image/png");

  // Download the image with a timestamped filename
  const mapFileName = `map_view_${timestamp}.png`;
  const link = document.createElement("a");
  link.href = image;
  link.download = mapFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Step 5 — Download earthquake data as JSON if provided
  if (data && data.length > 0) {
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const jsonLink = document.createElement("a");
    jsonLink.href = URL.createObjectURL(jsonBlob);
    jsonLink.download = `earthquake_data_${timestamp}.json`;
    document.body.appendChild(jsonLink);
    jsonLink.click();
    document.body.removeChild(jsonLink);
  }
};

/**
 * Fetch and display user's current location on the map
 * @param {*} mapRef - Reference to the map instance
 */
export const fetchLocation = async (mapRef) => {
  const source = new VectorSource();
  const layer = new VectorLayer({
    source: source,
  });
  mapRef.addLayer(layer);
  navigator.geolocation.watchPosition(
    function (pos) {
      const coords = [pos.coords.longitude, pos.coords.latitude];
      const accuracy = circular(coords, pos.coords.accuracy);
      source.clear(true);
      source.addFeatures([
        new Feature(
          accuracy.transform('EPSG:4326', mapRef.getView().getProjection())
        ),
        new Feature(new Point(fromLonLat(coords))),
      ]);
    },
    function (error) {
      alert(`ERROR: ${error.message}`);
    },
    {
      enableHighAccuracy: true,
    }
  );
  const locate = document.createElement('div');
  locate.style = 'top: 4em; left: .5em;';
  locate.className = 'ol-control ol-unselectable locate';
  locate.innerHTML = '<button title="Locate me">◎</button>';
  locate.addEventListener('click', function () {
    if (!source.isEmpty()) {
      mapRef.getView().fit(source.getExtent(), {
        maxZoom: 18,
        duration: 500,
      });
    }
  });
  mapRef.addControl(
    new Control({
      element: locate,
    })
  );
  const style = new Style({
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.2)',
    }),
    image: new Icon({
      src: compassIcon,
      rotateWithView: true,
      anchor: [0.1, 0.1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      scale: 0.39,
      rotation: 0,
      opacity: 0.9,
    }),
  });
  layer.setStyle(style);
  function startCompass() {
    kompas()
      .watch()
      .on('heading', function (heading) {
        style.getImage().setRotation((Math.PI / 180) * heading);
      });
  }

  if (
    window.DeviceOrientationEvent &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    locate.addEventListener('click', function () {
      DeviceOrientationEvent.requestPermission()
        .then(startCompass)
        .catch(function (error) {
          alert(`ERROR: ${error.message}`);
        });
    });
  } else if ('ondeviceorientationabsolute' in window) {
    startCompass();
  } else {
    alert('No device orientation provided by device');
  }
};

let quakepoints = null; // keep track of the earthquake points layer
/**
 * Add earthquake data as markers on the map
 * with size and color based on magnitude.
 */
export const addEarthquakeMarkers = (map, data) => {
  if (!map || !data || data.length === 0) return;

  if (data.length === 1 && data[0] === 'clear') {
    if (quakepoints) {
      map.removeLayer(quakepoints);
      quakepoints = null;
    }
    return;
  }

  if (quakepoints) {
    map.removeLayer(quakepoints);
  }

  const source = new VectorSource();

  const getMarkerStyle = (magnitude) => {
    let color = '#34d399'; // default green
    let radius = 5;

    if (magnitude >= 6.0) {
      color = '#991b1b';
      radius = 12;
    } else if (magnitude >= 5.0) {
      color = '#ef4444';
      radius = 10;
    } else if (magnitude >= 4.0) {
      color = '#f59e0b';
      radius = 8;
    } else if (magnitude >= 2.0) {
      color = '#fbbf24';
      radius = 6;
    }

    return new Style({
      image: new CircleStyle({
        radius,
        fill: new Fill({ color }),
        stroke: new Stroke({
          color: 'white',
          width: 1,
        }),
      }),
    });
  };

  const features = data.map((feature) => {
    const magnitude = feature.properties?.mag || 0;

    const f = new Feature({
      properties: feature.properties,
      geometry: new Point(
        fromLonLat([
          feature.geometry.coordinates[0],
          feature.geometry.coordinates[1],
        ])
      ),
    });
    f.setStyle(getMarkerStyle(magnitude));
    return f;
  });

  source.addFeatures(features);

  quakepoints = new VectorLayer({
    source,
  });

  map.addLayer(quakepoints);
};
