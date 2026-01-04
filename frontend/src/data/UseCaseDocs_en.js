import { API_BASE } from '@/data/BaseApi';

export const useCaseDocs_en = [
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
