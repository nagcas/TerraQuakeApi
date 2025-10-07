/**
 * Showable info popup component for map features.
 * @author Koustubh Badshah <www.github.com/frustateduser>
 */

import { useState } from "react";

export default function ShowInfo() {
  const [show, setShow] = useState(false);

  // List of features to display in the popup
  const features = [
    "Real-time earthquake data",
    "Shows realtime user location",
    "Interactive map with zoom and pan",
    "Markers indicating earthquake epicenters",
    "Click markers for detailed info",
    "Responsive design for all devices",
    "Download map data and image",
    "Clear all markers with a button",
  ];

  return (
    <div className="relative inline-block">
      {/* Info Icon */}
      <span
        className="text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full inline-block cursor-pointer m-2 p-2"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        &#x1F6C8;
      </span>

      {/* Popup */}
      {show && (
        <div className="absolute left-10 top-0 w-80 bg-black/90 border border-white/20 rounded-lg p-4 text-sm shadow-lg z-50">
          <p className="text-pink-400 font-semibold mb-2">Features:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
