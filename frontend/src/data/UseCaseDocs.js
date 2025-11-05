import { API_BASE } from '@/data/BaseApi';
export const useCaseDocs = [
  {
    title: 'Introduction',
    content:
      'This section describes the real-world applications of TerraQuake API. A great starting point is fetching all seismic activity for the current year.',
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

const url = \'${API_BASE}/v1/earthquakes/recent';
const limit = 10;

fetch(\`\${url}?limit=\${limit}\`)
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      console.log('Recent events:', data.payload);
    }
  })
  .catch((error) => console.error('API Error:', error));`,
      Python: `# Fetch the 10 most recent earthquakes of the current year

import requests
      
# Fetch the 10 most recent earthquakes
url = \"${API_BASE}/v1/earthquakes/recent"
params = {"limit": 10}

response = requests.get(url, params=params)

if response.status_code == 200:
    data = response.json()
    if data.get("success") and "payload" in data:
        for event in data["payload"]:
            props = event.get("properties", {})
            print(f"{props.get("mag", "N/A")} - {props.get("place", "Unknown")}')
    else:
        print("No earthquake data found.")
else:
    print(f"Error: {response.status_code} - {response.text}")`,
    },
  },
  {
    title: 'Scientific Research Applications',
    content:
      'Leverage the API to query a historical archive within a specific date range, perfect for gathering datasets for seismological research.',
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

const url = \'${API_BASE}/v1/earthquakes/range-time';
const params = new URLSearchParams({
  startdate: '2025-09-01',
  enddate: '2025-09-15',
  limit: 100
});

fetch(\`\${url}?\${params}\`)
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      console.log(\`Found \${data.totalEarthquakes} quakes in the specified range.\`);
    }
  });`,
      Python: `# Get all quakes within a specific 15-day period

import requests

# Get all quakes within a specific 15-day period
params = {
    "startdate": "2025-09-01",
    "enddate': "2025-09-15",
    "limit": 100
}
response = requests.get(f"${API_BASE}/v1/earthquakes/range-time", params=params)
data = response.json()
if data.get("payload"):
    print(f"Found {data["totalEarthquakes"]} quakes for the research period.")
else:
    print("No earthquakes found in this date range.");`,
},
  },
  {
    title: 'Civil Protection Applications',
    content:
      'Isolate high-impact events by filtering for a minimum magnitude. This helps authorities prioritize the most critical seismic activity for public safety.',
    points: [
      'Receive real-time earthquake alerts to initiate rapid emergency response.',
      'Integrate live seismic data into dashboards for operators to monitor events.',
      'Use map-based visualizations to identify high-risk areas.',
      'Support early warning systems that notify communities and infrastructure.',
      'Enhance disaster planning, drills, and situational awareness.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/magnitude?mag=5.5&limit=1000`,
    snippets: {
      JavaScript: `// Fetch recent quakes with a magnitude of 5.5 or greater

const url = \'${API_BASE}/v1/earthquakes/magnitude';
const mag = 5.5;
const limit = 10000;

fetch(\`\${url}?mag=\${mag}&limit=\${limit}\`)
  .then((response) => response.json())
  .then((data) => {
    if (data.totalEarthquakes > 0) {
      console.log('Significant quakes detected:', data.payload);
      // triggerEmergencyProtocol(data.payload);
    } else {
      console.log('No significant events at this time.')}
  });`,
      Python: `# Fetch recent quakes with a magnitude of 5.5 or greater

import requests

# Poll for high-impact events to notify emergency services
params = {
    "mag": 5.5,
    "limit": 1000
}

response = requests.get(f"${API_BASE}/v1/earthquakes/magnitude", params=params)

if response.status_code != 200:
    print("Error contacting TerraQuake API:", response.status_code, response.txt)
    exit()

data = response.json()
significant_quakes = data.get("payload", [])

if significant_quakes:
    print(f"Alert! {len(significant_quakes)} significant events detected.")
else:
    print("No significant events at this time.")`,
    },
  },
  {
    title: 'Government & Policy Making',
    content:
      'Gather seismic data for a specific administrative region to inform zoning and building codes. The API supports queries for all Italian regions.',
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

const url = \'${API_BASE}/v1/earthquakes/region';
const region = 'Sicilia';
const limit = 50;

fetch(\`\${url}?region=\${region}&limit=\${limit}\`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status} \${response.statusText}\`);
    }
    return response.json();
  })
  .then((data) => {
    const quakes = data.payload || [];

    console.log(\`Region: \${region}\`);
    console.log(\`Total earthquakes found: \${data.totalEarthquakes ?? quakes.length}\`);

    if (quakes.length === 0) {
      console.log('No recent seismic events recorded for this region.');
      return;
    }

    // Basic magnitude statistics
    const magnitudes = quakes.map(q => q.properties.mag).filter(Boolean);
    if (magnitudes.length > 0) {
      const avg = (magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length).toFixed(2);
      const max = Math.max(...magnitudes);
      const min = Math.min(...magnitudes);

      console.log('\\nMagnitude Summary:');
      console.log(\`• Average Magnitude: \${avg}\`);
      console.log(\`• Highest Magnitude: \${max}\`);
      console.log(\`• Lowest Magnitude: \${min}\`);
    }

    // Show sample of events
    console.log('\\nSample Events (max 5):');
    quakes.slice(0, 5).forEach(eq =>
      console.log(\`- M\${eq.properties.mag} | \${eq.properties.place}\`)
    );
  })
  .catch((error) => console.error('Error retrieving data:', error.message));`,
      Python: `# Fetch all recent quakes in the Sicilia region of Italy
      
import requests

# Get data for a specific Italian region for policy analysis
url = \"${API_BASE}/v1/earthquakes/region"
params = {
    "region": "Sicilia", 
    "limit": 50
}

response = requests.get(f"\{url}", params=params)

# Check response validity
if response.status_code != 200:
    print(f"API error: {response.status_code} - {response.txt}")
    exit()

data = response.json()
quakes = data.get("payload", [])

# Handle case with no results
if not quakes:
    print("No seismic events found for the specified region.")
    exit()

print(f"Region: {params['region']}")
print(f"Total Earthquakes Found: {data.get("totalEarthquakes", len(quakes))}")

# Optional: Extract magnitude distribution for basic analysis
magnitudes = [eq["properties"]["mag"] for eq in quakes if eq["properties"]["mag"] is not None]

if magnitudes:
    avg_mag = sum(magnitudes) / len(magnitudes)
    max_mag = max(magnitudes)
    min_mag = min(magnitudes)
    
    print(f"Seismic Activity Summary:")
    print(f"• Average Magnitude: {avg_mag:.2f}")
    print(f"• Highest Magnitude: {max_mag}")
    print(f"• Lowest Magnitude: {min_mag}")

    # Print sample events (first 5)
    print("Sample Events:")
    for eq in quakes[:5]:
        print(f"- {eq["properties"]["mag"]} | {eq["properties"]["place"]}")
else:
    print("Magnitudes are unavailable for the selected data.")`,
    },
  },
  {
    title: 'Educational Platforms',
    content:
      'Build engaging learning tools by querying for events near major landmarks or cities, making seismic data relatable for students.',
    points: [
      'Create simulations that demonstrate seismic waves and fault lines.',
      'Enable students to track live earthquake activity globally.',
      'Integrate into e-learning platforms to teach natural disaster management.',
      'Provide datasets for academic assignments and experiments.',
      'Gamify seismic learning with quizzes and real-time earthquake data.',
    ],
    exampleUrl: `\${API_BASE}/v1/earthquakes/location?latitude=35.6762&longitude=139.6503&radius=500`,
    snippets: {
      JavaScript: `// Find recent quakes within 500km of Tokyo for a class project

const url = \'${API_BASE}/v1/earthquakes/location';
const latitude = 35.6762;
const longitude = 139.6503;
const radius = 500; // kilometers

fetch(\`\${url}?latitude=\${latitude}&longitude=\${longitude}&radius=\${radius}\`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status} - \${response.statusText}\`);
    }
    return response.json();
  })
  .then((data) => {
    const quakes = data.payload || [];
    console.log(\`Location: Tokyo (latitude: \${latitude}, longitude: \${longitude})\`);
    console.log(\`Search Radius: \${radius} km\`);
    console.log(\`Total Earthquakes Found: \${data.totalEarthquakes ?? quakes.length}\`);

    if (quakes.length === 0) {
      console.log('No recent seismic events detected in this radius.');
      return;
    }

    console.log('Sample Events (up to 5):');
    quakes.slice(0, 5).forEach(eq => {
      console.log(\`- M\${eq.properties.mag} | \${eq.properties.place}\`);
    });
  })
  .catch((error) => {
    console.error('Error retrieving earthquake data:', error.message);
  });`,
      Python: `# Find recent quakes within 500km of Tokyo for a class project
      
import requests

url = \"${API_BASE}/v1/earthquakes/location"
latitude = 35.6762
longitude = 139.6503
radius = 500  # kilometers

params = {
    "latitude": latitude,
    "longitude": longitude,
    "radius": radius
}
response = requests.get(url, params=params)

# Check response validity
if response.status_code != 200:
    print(f"API Error: {response.status_code} - {response.text}")
    exit()

data = response.json()
quakes = data.get("payload", [])

print(f"Location: Tokyo (latitude: {latitude}, longitude: {longitude})")
print(f"Search Radius: {radius} km")
print(f"Total Earthquakes Found: {data.get('totalEarthquakes', len(quakes))}")

if not quakes:
    print("No recent seismic events detected in this radius.")
    exit()

print("Sample Events (up to 5):")
for eq in quakes[:5]:
    mag = eq["properties"]["mag"]
    place = eq["properties"]["place"]
    print(f"- M{mag} | {place}")
`,
    },
  },
  {
    title: 'Smart Cities & Infrastructure Monitoring',
    content:
      'Integrate with IoT and smart city applications by finding significant quakes near a specific urban center to trigger automated safety responses.',
    points: [
      'Enable smart building systems to react automatically to seismic activity.',
      'Provide city planners with long-term seismic trend insights.',
      'Integrate with traffic and transport systems for emergency rerouting.',
      'Assist in monitoring structural health of bridges, tunnels, and skyscrapers.',
      'Support smart city resilience planning against natural disasters.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/location?latitude=37.5079&longitude=15.0830&radius=200`,
    snippets: {
      JavaScript: `// Check for significant quakes near Catania (Italy)

const url = \'${API_BASE}/v1/earthquakes/location';
const latitude = 37.5079;   // Catania latitude
const longitude = 15.0830;  // Catania longitude
const radius = 200;         // kilometers

fetch(\`\${url}?latitude=\${latitude}&longitude=\${longitude}&radius=\${radius}\`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status} - \${response.statusText}\`);
    }
    return response.json();
  })
  .then((data) => {
    const quakes = data.payload || [];
    const total = data.totalEarthquakes ?? quakes.length;

    console.log(\`Checking seismic events near Catania (radius: \${radius} km)\`);
    console.log(\`Total Earthquakes Found: \${total}\`);

    if (total > 0) {
      console.warn('Potential infrastructure impact detected near LA!');
      // Example: send alert based on strongest quake
      // triggerSmartCityAlert(quakes[0]);
    } else {
      console.log('No significant seismic events detected in this area.');
    }
  })
  .catch((error) => {
    console.error('Error retrieving earthquake data:', error.message);
  });`,
      Python: `# Check for significant quakes near Catania (Italy)
      
import requests

url = "http://localhost:5001/v1/earthquakes/location"
latitude = 37.5079    # Catania latitude
longitude = 15.0830   # Catania longitude
radius = 200          # kilometers

params = {
    "latitude": latitude,
    "longitude": longitude,
    "radius": radius
}

try:
    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()
except requests.exceptions.RequestException as e:
    print(f"API request error: {e}")
    exit()

quakes = data.get("payload", [])
total = data.get("totalEarthquakes", len(quakes))

print(f"Checking seismic events near Catania (radius: {radius} km)")
print(f"Total Earthquakes Found: {total}")

if total > 0:
    print("Potential infrastructure impact detected near Catania!")
    # Example: triggerSmartCityAlert(quakes[0])
else:
    print("No significant seismic events detected in this area.")`,
    },
  },
  {
    title: 'Insurance & Risk Management',
    content:
      'Firms can benefit from historical data for planning. Querying events by month in a high-risk region helps in building risk assessment models.',
    points: [
      'Assess risk exposure for properties and infrastructure in earthquake-prone areas.',
      'Enable dynamic adjustment of insurance policies based on seismic activity.',
      'Provide real-time alerts for faster claim validation after earthquakes.',
      'Assist in financial forecasting related to natural disaster damages.',
      'Support predictive models to minimize long-term financial risks.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/month?year=2025&month=9`,
    snippets: {
      JavaScript: `// Retrieve all seismic data for September 2025 for risk assessment & research

const url = \'${API_BASE}/v1/earthquakes/month';
const year = 2025;
const month = 9;
const limit = 1000;

fetch(\`\${url}?year=\${year}&month=\${month}&limit=\${limit}\`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status} - \${response.statusText}\`);
    }
    return response.json();
  })
  .then((data) => {
    const quakes = data.payload || [];
    const total = data.totalEarthquakes ?? quakes.length;

    console.log(\`Seismic Risk Assessment - \${year}/\${month}\`);
    console.log(\`Total Earthquakes Recorded: \${total}\`);

    if (total === 0) {
      console.log('No seismic events recorded for this period.');
      return;
    }

    // Analyze magnitude distribution
    const magnitudes = quakes
      .map(eq => eq.properties.mag)
      .filter(m => m !== null && m !== undefined);

    if (magnitudes.length > 0) {
      const avg = (magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length).toFixed(2);
      const max = Math.max(...magnitudes);
      const min = Math.min(...magnitudes);

      console.log(\'Magnitude Summary:');
      console.log(\`• Average: \${avg}\`);
      console.log(\`• Highest: \${max}\`);
      console.log(\`• Lowest: \${min}\`);
    }

    console.log(\'Sample Events (up to 5):');
    quakes.slice(0, 5).forEach((eq, i) => {
      console.log(\`- #\${i + 1} | M\${eq.properties.mag} | \${eq.properties.place}\`);
    });
  })
  .catch((error) => {
    console.error('Error retrieving seismic data:', error.message);
  });`,
  Python: `# Retrieve all seismic data for September 2025 for risk assessment & research
import requests

url = \"${API_BASE}/v1/earthquakes/month"
params = {
    "year": 2025,
    "month": 9,
    "limit": 1000
}

response = requests.get(url, params=params)

if response.status_code != 200:
    print(f"API Error: {response.status_code} - {response.text}")
    exit()

data = response.json()
quakes = data.get("payload", [])
total = data.get("totalEarthquakes", len(quakes))

print(f"Seismic Risk Assessment - {params['year']}/{params['month']}")
print(f"Total Earthquakes Recorded: {total}")

if total == 0:
    print("No seismic events recorded for this period.")
    exit()

# Magnitude distribution analysis
magnitudes = [
    eq["properties"]["mag"]
    for eq in quakes
    if eq["properties"]["mag"] is not None
]

if magnitudes:
    avg_mag = sum(magnitudes) / len(magnitudes)
    max_mag = max(magnitudes)
    min_mag = min(magnitudes)

    print("Magnitude Summary:")
    print(f"• Average: {avg_mag:.2f}")
    print(f"• Highest: {max_mag}")
    print(f"• Lowest: {min_mag}")

print("Sample Events (up to 5):")
for eq in quakes[:5]:
    print(f"- M{eq['properties']['mag']} | {eq['properties']['place']}")`,
    },
  },
  {
    title: 'Smart Cities & Structural Monitoring',
    content:
      'Frequently poll the API for the very latest daily events, a method ideal for integration with IoT sensors like Arduino or Raspberry Pi for live dashboards.',
    points: [
      'Integrate with IoT sensors (e.g., Arduino, Raspberry Pi) to stream data.',
      'Monitor the stability and integrity of buildings, bridges, and infrastructure.',
      'Visualize seismic and structural data to identify vulnerabilities.',
      'Enable early alerts and risk assessments for city officials and engineers.',
      'Support long-term planning for safer urban development.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/today?limit=1`,
    snippets: {
      JavaScript: `// Poll every 60 seconds for the latest earthquake recorded today

const url = \'${API_BASE}/v1/earthquakes/today';
const limit = 1; // we only want the latest event
const interval = 60000; // 60 seconds

function fetchLatestQuake() {
  fetch(\`\${url}?limit=\${limit}\`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(\`API Error: \${response.status} - \${response.statusText}\`);
      }
      return response.json();
    })
    .then((data) => {
      const event = data.payload?.[0];

      if (!event) {
        console.log('No earthquake events recorded today yet.');
        return;
      }

      console.log('Latest Event Today:');
      console.log(\`• Location: \${event.properties.place}\`);
      console.log(\`• Magnitude: \${event.properties.mag} \${event.properties.magType}\`);
      console.log(\`• Time: \${new Date(event.properties.time).toLocaleString()}\`);
    })
    .catch((error) => {
      console.error('Error retrieving latest quake:', error.message);
    });
}

// Run immediately, then every 60 seconds
fetchLatestQuake();
setInterval(fetchLatestQuake, interval);`,
      Python: `#  Poll every 60 seconds for the latest earthquake recorded today

import requests
import time
from datetime import datetime

url = "http://localhost:5001/v1/earthquakes/today"
params = {
    "limit": 1
}
interval = 60  # seconds

def fetch_latest_quake():
    try:
        response = requests.get(url, params=params)
        if response.status_code != 200:
            print(f"API Error: {response.status_code} - {response.text}")
            return

        data = response.json()
        event = data.get("payload", [None])[0]

        if not event:
            print("No earthquake events recorded today yet.")
            return

        place = event["properties"]["place"]
        magnitude = event["properties"]["mag"]
        magnitudeType = event["properties"]["magType"]
        raw_time = event["properties"]["time"]  # ISO string format

        # Convert ISO timestamp to readable form
        dt = datetime.fromisoformat(raw_time)
        time_str = dt.strftime("%Y-%m-%d %H:%M:%S")

        print("Latest Event Today:")
        print(f"• Location: {place}")
        print(f"• Magnitude: {magnitude} {magnitudeType}")
        print(f"• Time: {time_str}")

    except Exception as e:
        print("Error retrieving latest quake:", str(e))

# Run immediately, then every 60 seconds
fetch_latest_quake()
while True:
    time.sleep(interval)
    fetch_latest_quake()`,
    },
  },
  {
    title: 'Education & Learning',
    content:
      'Gather data for comparative analysis by filtering on physical properties. This example isolates deep-focus earthquakes for an earth science class project.',
    points: [
      'Conduct classroom experiments using real earthquake data.',
      'Integrate into geography or earth science lessons.',
      'Use open-source tools powered by TerraQuakeAPI to explore seismology.',
      'Visualize seismic events over time and space.',
      'Enable project-based learning with real-world data insights.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/depth?depth=10`,
    snippets: {
      JavaScript: `// Fetch earthquakes with a depth of 10 km or deeper (deep-focus seismicity)

const url = \'${API_BASE}/v1/earthquakes/depth';
const minDepth = 10; // km

fetch(\`\${url}?depth=\${minDepth}\`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status} - \${response.statusText}\`);
    }
    return response.json();
  })
  .then((data) => {
    const quakes = data.payload || [];
    const total = data.totalEarthquakes ?? quakes.length;

    console.log('Deep-Focus Earthquake Study');
    console.log(\`• Minimum Depth: \${minDepth} km\`);
    console.log(\`• Total Events Found: \${total}\`);

    if (quakes.length === 0) {
      console.log('No deep-focus earthquakes recorded.');
      return;
    }

    console.log('Sample Events (up to 5):');
    quakes.slice(0, 5).forEach(eq => {
      console.log(\`- \${eq.properties.mag} \${eq.properties.magType} at \${eq.geometry.coordinates[2]} km | \${eq.properties.place}\`);
    });
  })
  .catch((error) => {
    console.error('Error retrieving seismic depth data:', error.message);
  });`,
      Python: `# Fetch earthquakes with a depth of 300 km or deeper (deep-focus seismicity)

import requests
from datetime import datetime

url = \"${API_BASE}/v1/earthquakes/depth"
min_depth = 10  # km

params = {
    "depth": min_depth
}

try:
    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()
except Exception as error:
    print(f"API Error: {error}")
    exit()

quakes = data.get("payload", [])
total = data.get("totalEarthquakes", len(quakes))

print("Deep-Focus Earthquake Study")
print(f"• Minimum Depth: {min_depth} km")
print(f"• Total Events Found: {total}")

if not quakes:
    print("No deep-focus earthquakes recorded.")
    exit()

print("Sample Events (up to 5):")
for eq in quakes[:5]:
    mag = eq["properties"]["mag"]
    magType = eq["properties"]["magType"]
    depth = eq["geometry"]["coordinates"][2]
    place = eq["properties"]["place"]
    print(f"- {mag} {magType} at {depth} km | {place}")`,
    },
  },
  {
    title: 'Tutorial: Displaying Earthquake Data on a Map',
    content:
      'Learn how to fetch earthquake data from the TerraQuake API and visualize it on an interactive map using OpenLayers. This tutorial covers data fetching, map initialization, and adding styled markers based on magnitude.',
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
  return data.success ? data.payload : [];
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
    return data['payload'] if data['success'] else []

# In a real application, you would use a Python mapping library (e.g., Folium, Plotly)
# to visualize this data. Here, we just print the relevant parts.
# Example: Get earthquakes near Tokyo for mapping
# earthquakes_data = get_earthquakes_for_map(35.6762, 139.6503, 500)
# for quake in earthquakes_data:
#     coords = quake['geometry']['coordinates']
#     props = quake['properties']
#     print(f"Magnitude: {props['mag']}, Place: {props['place']}, Lat: {coords[1]}, Lon: {coords[0]}")
`,
    },
  },
  {
    title: 'Tutorial: Filtering and Searching Earthquakes',
    content:
      'The TerraQuake API provides extensive filtering capabilities to retrieve specific earthquake data based on various criteria like time, location, magnitude, depth, and event ID.',
    points: [
      'Filter earthquakes by specific date ranges, months, or recent activity.',
      'Search for events within a geographical radius or a predefined Italian region.',
      'Isolate earthquakes based on their magnitude or depth characteristics.',
      'Retrieve detailed information for a single earthquake using its unique event ID.',
      'Utilize common pagination parameters (`page`, `limit`) for efficient data retrieval.',
    ],
    exampleUrl: `${API_BASE}/v1/earthquakes/magnitude?mag=5.0&limit=10`,
    snippets: {
      JavaScript: `// Filtering and Searching Earthquakes

const urlBase = \'${API_BASE}';

async function fetchEarthquakes(endpoint, params = {}) {
  const url = new URL(\`\${urlBase}\${endpoint}\`);

  // Append query parameters
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(\`HTTP Error: \${response.status}\`);
    
    const data = await response.json();
    return data.payload || [];
  } catch (error) {
    console.error("Request error:", error.message);
    return [];
  }
}

// Get earthquakes with magnitude >= minMag
async function filterByMagnitude(minMag, limit = 5) {
  console.log('Filter by magnitude:')
  const quakes = await fetchEarthquakes('/v1/earthquakes/magnitude', { mag: minMag, limit });
  console.log(\`Magnitude >= \${minMag}:\`, quakes);
}

// Get earthquakes in a specific region
async function filterByRegion(regionName, limit = 5) {
  console.log('Filter by region:')
  const quakes = await fetchEarthquakes('/v1/earthquakes/region', { region: regionName, limit });
  console.log(\`Earthquakes in \${regionName}:\`, quakes);
}

// Get earthquakes in date range
async function filterByDateRange(startDate, endDate, limit = 5) {
  console.log('Filter by date range:')
  const quakes = await fetchEarthquakes('/v1/earthquakes/range-time', { startdate: startDate, enddate: endDate, limit });
  console.log(\`Earthquakes from \${startDate} to \${endDate}:\`, quakes);
}

// Examples:
filterByMagnitude(5.0);
filterByRegion('Sicilia');
filterByDateRange('2025-09-01', '2025-09-07');`,
      Python: `# Filtering and Searching Earthquakes
import requests

urlBase = \"${API_BASE}"

def fetch_earthquakes(endpoint, params=None):
    try:
        response = requests.get(urlBase + endpoint, params=params)
        response.raise_for_status()
        data = response.json()
        return data.get("payload", [])
    except requests.RequestException as error:
        print("Request error:", error)
        return []

def filter_by_magnitude(min_mag, limit=5):
    print("Filter by magnitude:")
    quakes = fetch_earthquakes("/v1/earthquakes/magnitude", {"mag": min_mag, "limit": limit})
    print(f"Magnitude >= {min_mag}:", quakes)

def filter_by_region(region_name, limit=5):
    print("Filter by region:")
    quakes = fetch_earthquakes("/v1/earthquakes/region", {"region": region_name, "limit": limit})
    print(f"Earthquakes in {region_name}:", quakes)

def filter_by_date_range(start_date, end_date, limit=5):
    print("Filter by date range:")
    quakes = fetch_earthquakes("/v1/earthquakes/range-time", {
        "startdate": start_date,
        "enddate": end_date,
        "limit": limit
    })
    print(f"Earthquakes from {start_date} to {end_date}:", quakes)

# Examples:
filter_by_magnitude(5.0)
filter_by_region("Sicilia")
filter_by_date_range("2025-09-01", "2025-09-07")`,
    },
  },
];
