import { API_BASE } from '@/data/BASE_API';
export const useCaseDocs = [
  {
    title: 'Introduction',
    content: 'This section describes the real-world applications of TerraQuake API. A great starting point is fetching all seismic activity for the current year.',
    points: [
      'Open to developers, researchers, and organizations.',
      'Enables building applications for earthquake early warning systems.',
      'Supports educational tools to teach about seismic activity.',
      'Helps monitor infrastructure and safety in real-time.',
      'Assists in disaster prevention and preparedness planning.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/recent?limit=10`,
    snippets: {
      JavaScript: `// Fetch the 10 most recent earthquakes of the current year
fetch('${API_BASE}/v1/earthquakes/recent?limit=10')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Recent events:', data.data);
    }
  })
  .catch(error => console.error('API Error:', error));`,
      Python: `import requests

# Fetch the 10 most recent earthquakes of the current year
response = requests.get(f"${API_BASE}/v1/earthquakes/recent", params={'limit': 10})
if response.status_code == 200 and response.json()['success']:
    for event in response.json()['data']:
        print(f"{event['properties']['mag']} - {event['properties']['place']}")`,
      Bash: `curl "${API_BASE}/v1/earthquakes/recent?limit=10"`
    }
  },
  {
    title: 'Scientific Research Applications',
    content: 'Leverage the API to query a historical archive within a specific date range, perfect for gathering datasets for seismological research.',
    points: [
      'Monitor seismic patterns and trends for academic and applied research.',
      'Conduct studies on earthquake probability, frequency, and impact modeling.',
      'Integrate data seamlessly with analytical tools like MATLAB, Python, and R.',
      'Support thesis projects, publications, and research reports.',
      'Assist in modeling and simulation of earthquake scenarios.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/range-time?startdate=2025-09-01&enddate=2025-09-15`,
    snippets: {
      JavaScript: `// Get all quakes within a specific 15-day period
const params = new URLSearchParams({
  startdate: '2025-09-01',
  enddate: '2025-09-15',
  limit: 100
});
fetch(\`\${API_BASE}/v1/earthquakes/range-time?\${params}\`)
  .then(res => res.json())
  .then(data => console.log(\`Found \${data.total} quakes in the specified range.\`));`,
      Python: `import requests

# Get all quakes within a specific 15-day period
params = {
    'startdate': '2025-09-01',
    'enddate': '2025-09-15',
    'limit': 100
}
response = requests.get(f"${API_BASE}/v1/earthquakes/range-time", params=params)
data = response.json()
print(f"Found {data['total']} quakes for the research period.")`,
      Bash: `curl "${API_BASE}/v1/earthquakes/range-time?startdate=2025-09-01&enddate=2025-09-15"`
    }
  },
  {
    title: 'Civil Protection Applications',
    content: 'Isolate high-impact events by filtering for a minimum magnitude. This helps authorities prioritize the most critical seismic activity for public safety.',
    points: [
      'Receive real-time earthquake alerts to initiate rapid emergency response.',
      'Integrate live seismic data into dashboards for operators to monitor events.',
      'Use map-based visualizations to identify high-risk areas.',
      'Support early warning systems that notify communities and infrastructure.',
      'Enhance disaster planning, drills, and situational awareness.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/magnitude?mag=5.5&limit=10`,
    snippets: {
      JavaScript: `// Fetch recent quakes with a magnitude of 5.5 or greater
fetch('${API_BASE}/v1/earthquakes/magnitude?mag=5.5&limit=10')
  .then(res => res.json())
  .then(data => {
    if (data.total > 0) {
      console.log('Significant quakes detected:', data.data);
      // triggerEmergencyProtocol(data.data);
    }
  });`,
      Python: `import requests

# Poll for high-impact events to notify emergency services
response = requests.get(f"${API_BASE}/v1/earthquakes/magnitude", params={'mag': 5.5, 'limit': 10})
significant_quakes = response.json()['data']
if significant_quakes:
    print(f"Alert! {len(significant_quakes)} significant events detected.")`,
      Bash: `curl "${API_BASE}/v1/earthquakes/magnitude?mag=5.5&limit=10"`
    }
  },
  {
    title: 'Government & Policy Making',
    content: 'Gather seismic data for a specific administrative region to inform zoning and building codes. The API supports queries for all Italian regions.',
    points: [
      'Develop public dashboards for earthquake activity and alerts.',
      'Enable national disaster management agencies to make data-driven decisions.',
      'Assist in zoning and land-use policies with earthquake risk maps.',
      'Provide transparency through open data access for citizens.',
      'Support law enforcement and emergency protocols in high-risk areas.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/region?region=Sicilia`,
    snippets: {
      JavaScript: `// Fetch all recent quakes in the Sicilia region of Italy
fetch('${API_BASE}/v1/earthquakes/region?region=Sicilia&limit=50')
  .then(res => res.json())
  .then(data => console.log(\`Sicilia region: \${data.total} quakes found.\`));`,
      Python: `import requests

# Get data for a specific Italian region for policy analysis
params = {'region': 'Sicilia', 'limit': 50}
response = requests.get(f"${API_BASE}/v1/earthquakes/region", params=params)
data = response.json()
print(f"Analysis for {data['data'][0]['properties']['place']}: {data['total']} seismic events found.")`,
      Bash: `curl "${API_BASE}/v1/earthquakes/region?region=Sicilia"`
    }
  },
  {
    title: 'Educational Platforms',
    content: 'Build engaging learning tools by querying for events near major landmarks or cities, making seismic data relatable for students.',
    points: [
      'Create simulations that demonstrate seismic waves and fault lines.',
      'Enable students to track live earthquake activity globally.',
      'Integrate into e-learning platforms to teach natural disaster management.',
      'Provide datasets for academic assignments and experiments.',
      'Gamify seismic learning with quizzes and real-time earthquake data.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/location?latitude=35.6762&longitude=139.6503&radius=500`,
    snippets: {
      JavaScript: `// Find recent quakes within 500km of Tokyo for a class project
fetch('${API_BASE}/v1/earthquakes/location?latitude=35.6762&longitude=139.6503&radius=500')
  .then(res => res.json())
  .then(data => console.log(\`Found \${data.total} quakes near Tokyo.\`));`,
      Python: `import requests

# Find recent quakes within 500km of Tokyo
params = {'latitude': 35.6762, 'longitude': 139.6503, 'radius': 500}
response = requests.get(f"${API_BASE}/v1/earthquakes/location", params=params)
print(f"Project Data: Found {response.json()['total']} quakes near Tokyo.")`,
      Bash: `curl "${API_BASE}/v1/earthquakes/location?latitude=35.6762&longitude=139.6503&radius=500"`
    }
  },
  {
    title: 'Smart Cities & Infrastructure Monitoring',
    content: 'Integrate with IoT and smart city applications by finding significant quakes near a specific urban center to trigger automated safety responses.',
    points: [
      'Enable smart building systems to react automatically to seismic activity.',
      'Provide city planners with long-term seismic trend insights.',
      'Integrate with traffic and transport systems for emergency rerouting.',
      'Assist in monitoring structural health of bridges, tunnels, and skyscrapers.',
      'Support smart city resilience planning against natural disasters.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/location?latitude=34.0522&longitude=-118.2437&radius=250`,
    snippets: {
      JavaScript: `// Check for significant quakes near Los Angeles
fetch('${API_BASE}/v1/earthquakes/location?latitude=34.0522&longitude=-118.2437&radius=250')
  .then(res => res.json())
  .then(data => {
    if (data.total > 0) {
      console.log('Potential infrastructure impact detected near LA!');
      // triggerSmartCityAlert(data.data[0]);
    }
  });`,
      Python: `import requests

# Query for significant events near Los Angeles to trigger IoT actions
params = {'latitude': 34.0522, 'longitude': -118.2437, 'radius': 250}
response = requests.get(f"${API_BASE}/v1/earthquakes/location", params=params)
if response.json()['data']:
    print(f"Significant quake near LA detected. Sending IoT alert...")`,
      Bash: `curl "${API_BASE}/v1/earthquakes/location?latitude=34.0522&longitude=-118.2437&radius=250"`
    }
  },
  {
    title: 'Insurance & Risk Management',
    content: 'Firms can benefit from historical data for planning. Querying events by month in a high-risk region helps in building risk assessment models.',
    points: [
      'Assess risk exposure for properties and infrastructure in earthquake-prone areas.',
      'Enable dynamic adjustment of insurance policies based on seismic activity.',
      'Provide real-time alerts for faster claim validation after earthquakes.',
      'Assist in financial forecasting related to natural disaster damages.',
      'Support predictive models to minimize long-term financial risks.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/month?year=2025&month=9`,
    snippets: {
      JavaScript: `// Get all seismic data for September 2025 for analysis
fetch('${API_BASE}/v1/earthquakes/month?year=2025&month=9&limit=1000')
  .then(res => res.text())
  .then(data => console.log(\`Risk Assessment: \${data.total} events recorded in Sept 2025.\`));`,
      Python: `import requests

# Use the /month endpoint for statistical risk assessment
params = {'year': 2025, 'month': 9, 'limit': 1000}
response = requests.get(f"${API_BASE}/v1/earthquakes/month", params=params)
print(f"Risk Report: {response.json()['total']} events in Sept 2025.")`,
      Bash: `curl "${API_BASE}/v1/earthquakes/month?year=2025&month=9"`
    }
  },
  {
    title: 'Smart Cities & Structural Monitoring',
    content: 'Frequently poll the API for the very latest daily events, a method ideal for integration with IoT sensors like Arduino or Raspberry Pi for live dashboards.',
    points: [
      'Integrate with IoT sensors (e.g., Arduino, Raspberry Pi) to stream data.',
      'Monitor the stability and integrity of buildings, bridges, and infrastructure.',
      'Visualize seismic and structural data to identify vulnerabilities.',
      'Enable early alerts and risk assessments for city officials and engineers.',
      'Support long-term planning for safer urban development.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/today?limit=1`,
    snippets: {
      JavaScript: `// Poll every 60 seconds for today's latest quake
setInterval(() => {
  fetch('${API_BASE}/v1/earthquakes/today?limit=1')
    .then(res => res.json())
    .then(data => console.log('Latest Event Today:', data.data[0].properties.place));
}, 60000);`,
      Python: `import requests, time

# Poll every minute to feed data to a structural monitoring dashboard
while True:
    response = requests.get(f"${API_BASE}/v1/earthquakes/today", params={'limit':1})
    latest_event = response.json()['data'][0]['properties']['place']
    print(f"Live Dashboard Update: {latest_event}")
    time.sleep(60)`,
      Bash: `watch -n 60 'curl -s "${API_BASE}/v1/earthquakes/today?limit=1" | jq .data[0].properties.place'`
    }
  },
  {
    title: "Education & Learning",
    content: "Gather data for comparative analysis by filtering on physical properties. This example isolates deep-focus earthquakes for an earth science class project.",
    points: [
      "Conduct classroom experiments using real earthquake data.",
      "Integrate into geography or earth science lessons.",
      "Use open-source tools powered by TerraQuakeAPI to explore seismology.",
      "Visualize seismic events over time and space.",
      "Enable project-based learning with real-world data insights.",
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/depth?depth=300`,
    snippets: {
      JavaScript: `// Get data on deep-focus earthquakes (300km or deeper)
fetch('${API_BASE}/v1/earthquakes/depth?depth=300')
  .then(res => res.json())
  .then(data => console.log('Deep-focus Quakes Study:', data.data));`,
      Python: `import requests

# Gather data on deep-focus earthquakes for a geology class
params = {'depth': 300, 'limit': 50}
response = requests.get(f"${API_BASE}/v1/earthquakes/depth", params=params)
print(f"Found {response.json()['total']} deep-focus earthquakes for the project.")`,
      Bash: `curl "${API_BASE}/v1/earthquakes/depth?depth=300"`
    }
  },
  {
    title: 'Tutorial: Displaying Earthquake Data on a Map',
    content: 'Learn how to fetch earthquake data from the TerraQuake API and visualize it on an interactive map using OpenLayers. This tutorial covers data fetching, map initialization, and adding styled markers based on magnitude.',
    points: [
      'Fetch GeoJSON earthquake data from TerraQuake API endpoints.',
      'Initialize an interactive map using the OpenLayers JavaScript library.',
      'Convert geographical coordinates to map projection for accurate display.',
      'Add custom-styled markers to the map, with size and color indicating magnitude.',
      'Dynamically adjust the map view to encompass all displayed earthquake events.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/location?latitude=35.6762&longitude=139.6503&radius=500&limit=10`,
    snippets: {
      JavaScript: `// 1. Fetch Earthquake Data (e.g., near Tokyo)
const API_BASE = 'https://api.terraquakeapi.com';
async function getEarthquakesNearLocation(latitude, longitude, radius, limit = 10) {
  const url = \`\${API_BASE}/v1/earthquakes/location?latitude=\${latitude}&longitude=\${longitude}&radius=\${radius}&limit=\${limit}\`;
  const response = await fetch(url);
  const data = await response.json();
  return data.success ? data.data : [];
}

// 2. Initialize OpenLayers Map (assuming a div with id="map-container")
import 'ol/ol.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
function initializeOpenLayersMap(targetElementId) {
  const map = new Map({
    target: targetElementId,
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({ center: [0, 0], zoom: 2, projection: 'EPSG:3857' }),
  });
  return map;
}

// 3. Add Earthquake Markers
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Fill, Style, Stroke, Circle as CircleStyle } from 'ol/style';
function addEarthquakeMarkersToMap(map, earthquakeFeatures) {
  map.getLayers().forEach(layer => { if (layer.get('name') === 'earthquake_markers') map.removeLayer(layer); });
  const vectorSource = new VectorSource({
    features: earthquakeFeatures.map(feature => {
      const magnitude = feature.properties?.mag || 0;
      const earthquakeFeature = new Feature({
        geometry: new Point(fromLonLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]])),
        properties: feature.properties,
      });
      let color = '#34d399'; let radius = 5;
      if (magnitude >= 6.0) { color = '#991b1b'; radius = 12; } else if (magnitude >= 5.0) { color = '#ef4444'; radius = 10; }
      else if (magnitude >= 4.0) { color = '#f59e0b'; radius = 8; } else if (magnitude >= 2.0) { color = '#fbbf24'; radius = 6; }
      earthquakeFeature.setStyle(new Style({ image: new CircleStyle({ radius, fill: new Fill({ color }), stroke: new Stroke({ color: 'white', width: 1 }) }) }));
      return earthquakeFeature;
    }),
  });
  const vectorLayer = new VectorLayer({ source: vectorSource, name: 'earthquake_markers' });
  map.addLayer(vectorLayer);
  if (vectorSource.getFeatures().length > 0) { map.getView().fit(vectorSource.getExtent(), { padding: [50, 50, 50, 50], duration: 1000 }); }
}

// Example:
// getEarthquakesNearLocation(35.6762, 139.6503, 500).then(earthquakes => {
//   if (earthquakes.length > 0) {
//     const myMap = initializeOpenLayersMap('map-container');
//     addEarthquakeMarkersToMap(myMap, earthquakes);
//   }
// });`,
      Python: `import requests
from pprint import pprint

API_BASE = 'https://api.terraquakeapi.com'

def get_earthquakes_for_map(latitude, longitude, radius, limit=10):
    url = f"{API_BASE}/v1/earthquakes/location"
    params = {"latitude": latitude, "longitude": longitude, "radius": radius, "limit": limit}
    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()
    return data['data'] if data['success'] else []

# In a real application, you would use a Python mapping library (e.g., Folium, Plotly)
# to visualize this data. Here, we just print the relevant parts.
# Example: Get earthquakes near Tokyo for mapping
# earthquakes_data = get_earthquakes_for_map(35.6762, 139.6503, 500)
# for quake in earthquakes_data:
#     coords = quake['geometry']['coordinates']
#     props = quake['properties']
#     print(f"Magnitude: {props['mag']}, Place: {props['place']}, Lat: {coords[1]}, Lon: {coords[0]}")
`,
      Bash: `curl "${API_BASE}/v1/earthquakes/location?latitude=35.6762&longitude=139.6503&radius=500&limit=10" | jq '.data[] | {mag: .properties.mag, place: .properties.place, coordinates: .geometry.coordinates}'`
    }
  },
  {
    title: 'Tutorial: Filtering and Searching Earthquakes',
    content: 'The TerraQuake API provides extensive filtering capabilities to retrieve specific earthquake data based on various criteria like time, location, magnitude, depth, and event ID.',
    points: [
      'Filter earthquakes by specific date ranges, months, or recent activity.',
      'Search for events within a geographical radius or a predefined Italian region.',
      'Isolate earthquakes based on their magnitude or depth characteristics.',
      'Retrieve detailed information for a single earthquake using its unique event ID.',
      'Utilize common pagination parameters (`page`, `limit`) for efficient data retrieval.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/magnitude?mag=5.0&limit=10`,
    snippets: {
      JavaScript: `const API_BASE = 'https://api.terraquakeapi.com';

// Example 1: Get earthquakes with magnitude >= 5.0
async function filterByMagnitude(minMag) {
  const response = await fetch(\`\${API_BASE}/v1/earthquakes/magnitude?mag=\${minMag}&limit=5\`);
  const data = await response.json();
  console.log(\`Magnitude >= \${minMag}:\`, data.data);
}

// Example 2: Get earthquakes in a specific Italian region
async function filterByRegion(regionName) {
  const response = await fetch(\`\${API_BASE}/v1/earthquakes/region?region=\${regionName}&limit=5\`);
  const data = await response.json();
  console.log(\`Earthquakes in \${regionName}:\`, data.data);
}

// Example 3: Get earthquakes by date range
async function filterByDateRange(startDate, endDate) {
  const response = await fetch(\`\${API_BASE}/v1/earthquakes/range-time?startdate=\${startDate}&enddate=\${endDate}&limit=5\`);
  const data = await response.json();
  console.log(\`Earthquakes from \${startDate} to \${endDate}:\`, data.data);
}

// filterByMagnitude(5.0);
// filterByRegion('Sicilia');
// filterByDateRange('2025-09-01', '2025-09-07');`,
      Python: `import requests

API_BASE = 'https://api.terraquakeapi.com'

# Example 1: Get earthquakes by depth
def filter_by_depth(max_depth):
    url = f"{API_BASE}/v1/earthquakes/depth"
    params = {"depth": max_depth, "limit": 5}
    response = requests.get(url, params=params)
    print(f"Earthquakes <= {max_depth}km deep:", response.json()['data'])

# Example 2: Get a specific earthquake by Event ID
def get_by_event_id(event_id):
    url = f"{API_BASE}/v1/earthquakes/eventId"
    params = {"eventId": event_id}
    response = requests.get(url, params=params)
    print(f"Details for Event ID {event_id}:", response.json()['data'])

# filter_by_depth(10)
# get_by_event_id(44278572)`,
      Bash: `# Example 1: Get today's earthquakes
curl "${API_BASE}/v1/earthquakes/today?limit=5"

# Example 2: Get earthquakes with magnitude >= 6.0
curl "${API_BASE}/v1/earthquakes/magnitude?mag=6.0&limit=5"

# Example 3: Get earthquakes near specific coordinates (Los Angeles)
curl "${API_BASE}/v1/earthquakes/location?latitude=34.0522&longitude=-118.2437&radius=100&limit=5"`
    }
  },
  {
    title: 'Tutorial: Using the API with Python, JS, or cURL',
    content: 'This tutorial demonstrates how to interact with the TerraQuake API using common tools and programming languages: cURL for command-line, JavaScript (Fetch API/Axios) for web/Node.js, and Python (requests library).',
    points: [
      'Execute quick API requests directly from the command line using cURL.',
      'Integrate API calls into web applications or Node.js services with JavaScript Fetch API or Axios.',
      'Develop robust data fetching scripts and applications using Python with the requests library.',
      'Understand how to handle API responses and potential errors in each environment.',
      'Apply common parameters like `limit` and `page` for efficient data retrieval across languages.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/recent?limit=5`,
    snippets: {
      JavaScript: `const API_BASE = 'https://api.terraquakeapi.com';

// Using Fetch API (Browser/Node.js)
async function fetchRecentQuakes() {
  try {
    const response = await fetch(\`\${API_BASE}/v1/earthquakes/recent?limit=5\`);
    const data = await response.json();
    if (data.success) {
      console.log('JS Fetch (Recent):', data.data.map(q => q.properties.place));
    }
  } catch (error) { console.error('Fetch Error:', error); }
}

// Using Axios (Node.js/Browser - requires 'npm install axios')
// import axios from 'axios'; // or const axios = require('axios');
async function axiosQuakesByMonth(year, month) {
  try {
    const response = await axios.get(\`\${API_BASE}/v1/earthquakes/month\`, {
      params: { year, month, limit: 5 }
    });
    if (response.data.success) {
      console.log(\`JS Axios (\${month}/\${year}):\`, response.data.data.map(q => q.properties.place));
    }
  } catch (error) { console.error('Axios Error:', error.response ? error.response.data : error.message); }
}

// fetchRecentQuakes();
// axiosQuakesByMonth(2025, 9);`,
      Python: `import requests

API_BASE = 'https://api.terraquakeapi.com'

# Using Python Requests Library
def get_last_week_quakes():
    url = f"{API_BASE}/v1/earthquakes/last-week"
    params = {"limit": 5}
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        if data['success']:
            print('Python (Last Week):', [q['properties']['place'] for q in data['data']])
    except requests.exceptions.RequestException as e:
        print(f"Python Request Error: {e}")

# get_last_week_quakes()`,
      Bash: `# cURL Example 1: Get today's earthquakes
curl "${API_BASE}/v1/earthquakes/today?limit=5" | jq '.data[] | .properties.place'

# cURL Example 2: Get earthquake by Event ID
curl "${API_BASE}/v1/earthquakes/eventId?eventId=44278572" | jq '.data[] | .properties.place'`
    }
  }
];
