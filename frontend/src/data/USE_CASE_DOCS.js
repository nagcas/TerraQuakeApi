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
];