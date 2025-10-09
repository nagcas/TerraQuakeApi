import MetaData from '@pages/noPage/metaData';
import ApiPlayground from '@/components/apiPlayground/ApiPlayground.jsx';
import '@/components/apiPlayground/apiPlayground.css';

export default function ExploreData() {
  const earthquakesEndpoints = [
    {
      key: 'recent',
      label: 'recent',
      method: 'GET',
      path: '/v1/earthquakes/recent',
      subtitle: 'Latest seismic events',
      description: `
This endpoint retrieves all recent seismic events from the beginning of the year until today via the TerraQuake API, sorted from the most recent to the least recent. 
It provides insight into ongoing seismic activity for the current year.

**Query Parameters:**
- \`limit\` (optional): Number of earthquake events to return. Default is **50**.
- \`page\` (optional): Page number of the results to retrieve. Default is **1**.
      `,
      params: [
        { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' },
        { name: 'page', label: 'page', placeholder: '1', defaultValue: '1' },
      ],
    },
    {
      key: 'today',
      label: 'today',
      method: 'GET',
      path: '/v1/earthquakes/today',
      subtitle: 'Today’s seismic events',
      description: `
This endpoint retrieves all seismic events that occurred today (from **00:00 UTC to the current time**) from the TerraQuake API. 
It allows users to monitor real-time seismic activity for the current day.

**Query Parameters:**
- \`limit\` (optional): Number of earthquake events to return. Default is **50**.
- \`page\` (optional): Page number of the results to retrieve. Default is **1**.
      `,
      params: [
        { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' },
        { name: 'page', label: 'page', placeholder: '1', defaultValue: '1' },
      ],
    },
    {
      key: 'last-week',
      label: 'last-week',
      method: 'GET',
      path: '/v1/earthquakes/last-week',
      subtitle: 'Last 7 days',
      description: `
This endpoint retrieves all seismic events that occurred in the last **7 days** from the TerraQuake API. 
It helps monitor short-term seismic activity and regional patterns.

**Query Parameters:**
- \`limit\` (optional): Number of earthquake events to return. Default is **50**.
- \`page\` (optional): Page number of the results to retrieve. Default is **1**.
      `,
      params: [
        { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' },
        { name: 'page', label: 'page', placeholder: '1', defaultValue: '1' },
      ],
    },
    {
      key: 'month',
      label: 'month',
      method: 'GET',
      path: '/v1/earthquakes/month',
      subtitle: 'By month/year',
      description: `
This endpoint retrieves all seismic events that occurred during a specific **month** and **year** from the TerraQuake API. 
It helps explore historical earthquake data for any given period.

**Query Parameters:**
- \`year\` (required): Target year (e.g., **2025**).
- \`month\` (required): Target month (numeric format, **01–12**).
- \`limit\` (optional): Number of events to return. Default is **50**.
- \`page\` (optional): Page number of the results to retrieve. Default is **1**.
      `,
      params: [
        { name: 'year', label: 'year', placeholder: '2025', defaultValue: '2025', required: true },
        { name: 'month', label: 'month', placeholder: '03', defaultValue: '03', required: true },
        { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' },
        { name: 'page', label: 'page', placeholder: '1', defaultValue: '1' },
      ],
    },
    {
      key: 'location',
      label: 'location',
      method: 'GET',
      path: '/v1/earthquakes/location',
      subtitle: 'Near latitude/longitude',
      description: `
This endpoint fetches seismic events close to a given geographical location, defined by **latitude** and **longitude**, 
with an optional search radius. It retrieves earthquakes from the start of the year to the current date.

**Query Parameters:**
- \`latitude\` (required): Latitude of the location (e.g., **40.835459**).
- \`longitude\` (required): Longitude of the location (e.g., **14.117358**).
- \`radius\` (optional): Search radius in km. Default is **50 km**.
- \`limit\` (optional): Number of events to return. Default is **50**.
- \`page\` (optional): Page number of the results to retrieve. Default is **1**.
      `,
      params: [
        { name: 'latitude', label: 'latitude', placeholder: '41.7142', required: true },
        { name: 'longitude', label: 'longitude', placeholder: '15.9577', required: true },
        { name: 'radius', label: 'radius (km)', placeholder: '10' },
        { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' },
        { name: 'page', label: 'page', placeholder: '1', defaultValue: '1' },
      ],
    },
    {
      key: 'region',
      label: 'region',
      method: 'GET',
      path: '/v1/earthquakes/region',
      subtitle: 'By Italian region',
      description: `
This endpoint retrieves all seismic events that occurred within a specific **Italian region** 
from the start of the year up to today. 
It filters earthquakes by region for localized seismic analysis.

**Query Parameters:**
- \`region\` (required): Name of the Italian region (e.g., **Campania, Sicilia, Lazio**).
- \`limit\` (optional): Number of events to return. Default is **50**.
- \`page\` (optional): Page number of the results to retrieve. Default is **1**.
      `,
      params: [
        { name: 'region', label: 'region', placeholder: 'Campania', required: true },
        { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' },
        { name: 'page', label: 'page', placeholder: '1', defaultValue: '1' },
      ],
    },
    {
      key: 'depth',
      label: 'depth',
      method: 'GET',
      path: '/v1/earthquakes/depth',
      subtitle: 'By focal depth (km)',
      description: `
This endpoint retrieves all seismic events that occurred at a specific **focal depth** (in km). 
It helps analyze earthquakes by depth and their potential surface impact.

**Query Parameters:**
- \`depth\` (required): Focal depth in kilometers (e.g., **10**).
- \`limit\` (optional): Number of events to return. Default is **50**.
- \`page\` (optional): Page number of the results to retrieve. Default is **1**.
      `,
      params: [
        { name: 'depth', label: 'depth (km)', placeholder: '10', required: true },
        { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' },
        { name: 'page', label: 'page', placeholder: '1', defaultValue: '1' },
      ],
    },
    {
      key: 'range-time',
      label: 'range-time',
      method: 'GET',
      path: '/v1/earthquakes/range-time',
      subtitle: 'By time range',
      description: `
This endpoint retrieves all seismic events within a specific **time range**, 
using custom **start** and **end** dates. Ideal for research and historical data queries.

**Query Parameters:**
- \`startdate\` (required): Start date (format: **YYYY-MM-DD**).
- \`enddate\` (required): End date (format: **YYYY-MM-DD**).
- \`limit\` (optional): Number of events to return. Default is **50**.
- \`page\` (optional): Page number of the results to retrieve. Default is **1**.
      `,
      params: [
        { name: 'startdate', label: 'startdate', placeholder: 'YYYY-MM-DD', required: true },
        { name: 'enddate', label: 'enddate', placeholder: 'YYYY-MM-DD', required: true },
        { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' },
        { name: 'page', label: 'page', placeholder: '1', defaultValue: '1' },
      ],
    },
    {
      key: 'magnitude',
      label: 'magnitude',
      method: 'GET',
      path: '/v1/earthquakes/magnitude',
      subtitle: 'Min magnitude',
      description: `
This endpoint retrieves all seismic events with a **minimum magnitude** or higher 
from the start of the year up to today. Useful for analyzing stronger seismic events.

**Query Parameters:**
- \`mag\` (required): Minimum magnitude (e.g., **2** → returns events ≥ 2.0).
- \`limit\` (optional): Number of events to return. Default is **50**.
- \`page\` (optional): Page number of the results to retrieve. Default is **1**.
      `,
      params: [
        { name: 'mag', label: 'mag', placeholder: '1', required: true },
        { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' },
        { name: 'page', label: 'page', placeholder: '1', defaultValue: '1' },
      ],
    },
    {
      key: 'eventId',
      label: 'eventId',
      method: 'GET',
      path: '/v1/earthquakes/eventId',
      subtitle: 'By event ID',
      description: `
This endpoint retrieves details of a specific seismic event using its unique **event ID**.
Includes data such as magnitude, location, depth, and timestamp.

**Query Parameters:**
- \`eventId\` (required): Unique identifier of the earthquake event.
      `,
      params: [
        { name: 'eventId', label: 'eventId', placeholder: '44061482', required: true },
      ],
    },
  ];

  return (
    <>
      <MetaData
        title='Explore Data'
        description='Explore Data of TerraQuake API'
      />
      <section className='relative z-30 w-full min-h-screen px-6 py-20'>
        <div className='flex flex-col justify-center items-center mb-16'>
          <h1 className='text-2xl md:text-4xl text-white font-extrabold text-center my-25 tracking-tight'>
            Explore Data for TerraQuake API
          </h1>

          {/* Descrizione visibile */}
          <p className='text-white text-lg w-[95%] lg:w-6xl'>
            Welcome to the <strong>TerraQuake API Playground</strong>! Here, you
            can explore and interact with earthquake data in real time. Use the
            playground to test API queries with different parameters such as
            magnitude, location, or time range, view results in raw JSON format,
            and copy ready-to-use code snippets for <code>curl</code>,
            JavaScript (<code>fetch</code> or <code>axios</code>), and Python (
            <code>requests</code>).
          </p>
        </div>

        <div className='w-full mt-10'>
          <ApiPlayground
            title='Earthquakes'
            endpoints={earthquakesEndpoints}
          />
        </div>
      </section>
    </>
  );
}
