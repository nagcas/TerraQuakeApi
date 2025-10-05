/**
 * Handel showing earthquake properties on the map markers.
 * @author Koustubh Badshah <www.github.com/frustateduser>
 */

import { useEffect } from "react";
import { Overlay } from "ol";

/**
 * component to show properties of earthquake on marker hover or click
 * @param {Object} mapInstance - instance of the map
 */
const ShowProperties = ({ mapInstance }) => {
  useEffect(() => {
    if (!mapInstance) return;

     // --- 🧱 Popup container (outer) ---
    const container = document.createElement("div");
    container.className = "relative pointer-events-none z-50";

    // --- 💬 Card content wrapper ---
    const card = document.createElement("div");
    card.className = `
      bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200
      p-3 min-w-[200px] text-sm transition-all duration-300 ease-in-out
      opacity-0 translate-y-2
    `;

    // --- 🔻 Arrow element (separate DOM element) ---
    const arrow = document.createElement("div");
    arrow.className = `
      absolute left-1/2 -translate-x-1/2 bottom-[-8px]
      w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px]
      border-l-transparent border-r-transparent border-t-white
      drop-shadow
    `;

    container.appendChild(card);
    container.appendChild(arrow);
    mapInstance.getTargetElement().appendChild(container);

    // --- 📍 Overlay setup ---
    const overlay = new Overlay({
      element: container,
      positioning: "bottom-center", // ensures arrow tip aligns to feature
      offset: [0, -15], // move popup slightly above the point
      stopEvent: false,
    });
    mapInstance.addOverlay(overlay);

    // --- 🎯 Hover handler ---
    const pointerMoveHandler = (evt) => {
      const feature = mapInstance.forEachFeatureAtPixel(evt.pixel, (f) => f);

      if (feature && feature.get("properties")) {
        const props = feature.get("properties");
        const depth = feature.getGeometry()?.getCoordinates()?.[2] || "N/A";
        const longitude = feature.getGeometry()?.getCoordinates()?.[0];
        const latitude = feature.getGeometry()?.getCoordinates()?.[1];
        const latDirection = latitude > 0 ? "N" : "S";
        const lonDirection = longitude > 0 ? "E" : "W";



        card.innerHTML = `
          <div class="font-semibold text-gray-800 mb-1">${props.place || "Unknown"}</div>
          <div class="text-sm font-extralight text-gray-500 mb-1">Coordinates: ${latitude}° ${latDirection}, ${longitude}° ${lonDirection}</div>
          <div>Magnitude: <span class="font-bold text-red-600">${props.mag} ${props.magType}</span></div>
          <div>Depth: ${depth} km</div>
          <div>Recorded by: ${props.author}</div>
          <div>Event ID: ${props.eventId}</div>
          <div>Origin ID: ${props.originId}</div>
          <div class="text-xs text-gray-500 mt-1">${
            props.time
              ? new Date(props.time).toLocaleString()
              : "No time info"
          }</div>
          
        `;

        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        overlay.setPosition(evt.coordinate);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(2px)";
      }
    };

    mapInstance.on("pointermove", pointerMoveHandler);
    mapInstance.on("click", pointerMoveHandler); // also show on click for touch devices


    // --- 🧹 Cleanup ---
    return () => {
      mapInstance.un("pointermove", pointerMoveHandler);
      mapInstance.on("click", pointerMoveHandler); // also show on click for touch devices
      mapInstance.removeOverlay(overlay);
      container.remove();
    };
  }, [mapInstance]);

  return null;
};

export default ShowProperties;
