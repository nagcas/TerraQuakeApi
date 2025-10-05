/**
 * Utility functions for map operations
 * @module mapUtil
 * @author Koustubh Badshah <www.github.com/frustateduser>
 */

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Map from "ol/Map";
import View from "ol/View";
import Point from "ol/geom/Point";
import { circular } from "ol/geom/Polygon";
import Control from "ol/control/Control";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Fill, Icon, Style } from "ol/style";
import kompas from "kompas";
import compassIcon from "@/assets/svg/compass.svg";
import { Stroke, Text } from "ol/style";
import CircleStyle from "ol/style/Circle";

/**
 * Download the current map view as an image
 * @param {*} mapRef - Reference to the map instance
 * @returns
 */
export const downloadMap = (mapRef,data) => {
  if (!mapRef.current) return;

  const mapCanvas = mapRef.current.querySelector("canvas");
  if (!mapCanvas) return;

  const image = mapCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = image;
  link.click();

  if(data && data.length > 0){
    const jsonBolb = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const jsonLink = document.createElement('a');
    jsonLink.href = URL.createObjectURL(jsonBolb);
    jsonLink.download = 'earthquake_data.json';
    jsonLink.click();
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
          accuracy.transform("EPSG:4326", mapRef.getView().getProjection())
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
  const locate = document.createElement("div");
  locate.style = "top: 4em; left: .5em;";
  locate.className = "ol-control ol-unselectable locate";
  locate.innerHTML = '<button title="Locate me">◎</button>';
  locate.addEventListener("click", function () {
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
      color: "rgba(0, 0, 255, 0.2)",
    }),
    image: new Icon({
      src: compassIcon,
      rotateWithView: true,
      anchor: [0.1, 0.1],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      scale: 0.39,
      rotation: 0,
      opacity: 0.9,
    }),
  });
  layer.setStyle(style);
  function startCompass() {
    kompas()
      .watch()
      .on("heading", function (heading) {
        style.getImage().setRotation((Math.PI / 180) * heading);
      });
  }

  if (
    window.DeviceOrientationEvent &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    locate.addEventListener("click", function () {
      DeviceOrientationEvent.requestPermission()
        .then(startCompass)
        .catch(function (error) {
          alert(`ERROR: ${error.message}`);
        });
    });
  } else if ("ondeviceorientationabsolute" in window) {
    startCompass();
  } else {
    alert("No device orientation provided by device");
  }
};


let quakepoints = null; // keep track of the earthquake points layer
/**
 * Add earthquake data as markers on the map
 * @param {*} mapRef - Reference to the map instance
 * @param {*} earthquakeData - GeoJSON earthquake data
 */
export const addEarthquakeMarkers = (map, data) => {
  if (!map || !data || data.length === 0) return;

  // If the special 'clear' command is received, remove the layer and return
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

  
  const features =  data.map((feature) => {
      return new Feature({
        properties: feature.properties,
        geometry: new Point(
          fromLonLat([
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[2],
          ])
        ),
      });
    })
  
    source.addFeatures(features);
   quakepoints = new VectorLayer({
    source: source,
    style: new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({ color: "red" }),
        stroke: new Stroke({
          color: "white", width: 1,
        }),
      }),
      

    })
  });

  map.addLayer(quakepoints);
};
