import MetaData from '@pages/noPage/MetaData';
import { motion } from 'framer-motion';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { API_BASE } from '@/data/BaseApi';
import { CopyButton } from '@components/utils/CopyButton';
import { useTranslation } from 'react-i18next';

export default function ApiAccess() {
  const { t } = useTranslation('translation');

  const urlEndpoint = {
    earthquakes: `${API_BASE}/v1/earthquakes`,
    stations: `${API_BASE}/v1/stations`,
  };

  const quickStart = {
    earthquakesJavascript: `
// Fetch the 10 most recent earthquakes of the current year

const fetchRecentEarthquakes = async (limit = 10) => {
  const url = \`${API_BASE}/v1/earthquakes/recent?limit=\${limit}\`;

  try {
    const response = await fetch(url);

    // Check HTTP status
    if (!response.ok) {
      throw new Error(\`HTTP Error: \${response.status} \${response.statusText}\`);
    }

    const data = await response.json();

    // Validate API success response
    if (!data.success || !Array.isArray(data.payload)) {
      console.warn("Unexpected API response format:", data);
      return;
    }

    // Display formatted result
    console.log(\`Showing \${data.payload.length} recent earthquakes:\`);
    data.payload.forEach(event => {
      const props = event.properties || {};
      const magnitude = props.mag ?? "N/A";
      const magnitudeType = props.magType;
      const place = props.place ?? "Unknown";
      console.log(\`• \${magnitude} {magnitudeType} — \${place}\`);
    });

  } catch (error) {
    console.error("API Error:", error.message);
  }
};

fetchRecentEarthquakes(10);
      `,
    earthquakesPython: `
# Fetch the 10 most recent earthquakes of the current year

import requests

url = \"${API_BASE}/v1/earthquakes/recent"
params = {"limit": 10}

response = requests.get(url, params=params)

if response.status_code == 200:
    data = response.json()

    if data.get("success") and "payload" in data and isinstance(data["payload"], list):
        if len(data["payload"]) > 0:
            for event in data["payload"]:
                props = event.get("properties", {})
                magnitude = props.get("mag", "N/A")
                place = props.get("place", "Unknown")
                print(f"{magnitude} - {place}")
        else:
            print("No earthquake data found.")
    else:
        print("Unexpected data format or no payload.")
else:
  print(f"Error: {response.status_code} - {response.text}")
      `,
    stationsJavascript: `
// Fetch the first 20 seismic monitoring stations

const url = \'${API_BASE}/v1/stations';
const params = new URLSearchParams({ page: 1, limit: 20 });

fetch(\`\${url}?\${params.toString()}\`)
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      console.log('Seismic Stations:', data.payload);
      console.log(\`Total stations: \${data.totalStations}\`);
    } else {
      console.warn('No station data available.');
    }
  })
  .catch((error) => console.error('API Error:', error));`,
    stationsPython: `
# Fetch the first 20 seismic monitoring stations

import requests

url = \"${API_BASE}/v1/stations"
params = {
    "page": 1,
    "limit": 20
}

response = requests.get(url, params=params)

if response.status_code == 200:
    data = response.json()

    if data.get("success") and "payload" in data:
        print(f"Total stations: {data.get('totalStations', 'N/A')}")
        for station in data["payload"]:
            code = station.get("$", {}).get("code", "Unknown")
            latitude = station.get("Latitude", "N/A")
            longitude = station.get("Longitude", "N/A")
            print(f"{code}: {latitude}, {longitude}")
    else:
        print("No station data found.")
else:
    print(f"Request failed: {response.status_code}")`,
  };

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='API Access | TerraQuake API - Real-Time Earthquake Data'
        description='Access TerraQuake API to integrate real-time earthquake monitoring and seismic data into your applications. Explore our documentation and start building earthquake-aware solutions.'
        ogTitle='API Access | TerraQuake API - Real-Time Earthquake Monitoring'
        ogDescription='Get API access to TerraQuake — the real-time earthquake data platform. Integrate seismic monitoring into your projects with our easy-to-use API.'
        twitterTitle='API Access | TerraQuake API - Earthquake Data API'
        twitterDescription='Access TerraQuake API for real-time earthquake data, seismic analysis, and monitoring capabilities. Start your integration today.'
        keywords='TerraQuake API access, earthquake data API, real-time earthquake API, seismic monitoring API, API documentation, earthquake detection'
      />
      {/* SEO Stuff */}

      {/* Main Section */}
      <motion.section
        className='relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Gradient */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        {/* Content Container */}
        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
          {/* Header Section */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              {t('api_access.title')}
              <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left mx-auto text-white/70 max-w-7xl'>
              {t('api_access.description')}
            </p>
          </motion.div>

          {/* Get Started Section */}
          <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-14'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              {t('api_access.subtitle')}
            </h2>
            <p className='text-white/80 mb-4'>
              {t('api_access.info')}
            </p>
            <p className='text-white/80'>
              {t('api_access.contact')}
              <br />
              <span className='text-pink-300 font-semibold'>
                support@terraquakeapi.com
              </span>
            </p>
          </div>

          {/* Base URL */}
          <div className='mb-14'>
            <h3 className='text-xl font-bold text-white mb-2'>Base URL</h3>
            <pre className='flex justify-between mt-2 bg-black/30 border border-white/10 rounded-xl p-4 text-white/90 text-sm overflow-x-auto'>
              <span className='text-pink-400'>{t('api_access.earthquakes')} </span>
              <code>{urlEndpoint.earthquakes}</code>
              <CopyButton text={urlEndpoint.earthquakes} />
            </pre>
            <pre className='flex justify-between mt-2 bg-black/30 border border-white/10 rounded-xl p-4 text-white/90 text-sm overflow-x-auto'>
              <span className='text-pink-400'>{t('api_access.stations')} </span>
              <code>{urlEndpoint.stations}</code>
              <CopyButton text={urlEndpoint.stations} />
            </pre>
          </div>

          {/* Endpoint Earthquakes List / Table */}
          <div className='mb-14'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              {t('api_access.endpoints_earthquakes')}
            </h2>
            <p className='text-white/70 mb-4'>
              {t('api_access.endpoints_support')} <code>page</code> {t('api_access.and')}{' '}
              <code>limit</code>.
            </p>

            <div className='overflow-x-auto'>
              <table className='w-full text-left text-white/80 text-sm border border-white/10 rounded-xl overflow-hidden'>
                <thead className='bg-white/10 text-white'>
                  <tr>
                    <th className='px-4 py-3'>
                      {t('api_access.list_method')}
                    </th>
                    <th className='px-4 py-3'>
                      {t('api_access.list_endpoint')}
                    </th>
                    <th className='px-4 py-3'>
                      {t('api_access.list_description')}
                    </th>
                    <th className='px-4 py-3'>
                      {t('api_access.list_parameters')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/earthquakes/recent</td>
                    <td>{t('api_access.endpoint_recent')}</td>
                    <td>
                      page, 
                      limit
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/earthquakes/today</td>
                    <td>{t('api_access.endpoint_today')}</td>
                    <td>
                      page, 
                      limit
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/earthquakes/last-week</td>
                    <td>{t('api_access.endpoint_last_week')}</td>
                    <td>
                      page, 
                      limit
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/earthquakes/month</td>
                    <td>{t('api_access.endpoint_month')}</td>
                    <td>
                      year* {t('api_access.required')}, 
                      month* {t('api_access.required')}, 
                      page, 
                      limit
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/earthquakes/location</td>
                    <td>{t('api_access.endpoint_location')}</td>
                    <td>
                      latitude* {t('api_access.required')}, 
                      longitude* {t('api_access.required')}, 
                      radius, 
                      page,
                      limit 
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/earthquakes/region</td>
                    <td>{t('api_access.endpoint_region')} </td>
                    <td>
                      region* {t('api_access.required')}, 
                      page, 
                      limit 
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/earthquakes/depth</td>
                    <td>{t('api_access.endpoint_depth')}</td>
                    <td>
                      depth* {t('api_access.required')}, 
                      page, 
                      limit 
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/earthquakes/range-time</td>
                    <td>{t('api_access.endpoint_range_time')}</td>
                    <td>
                      startdate* {t('api_access.required')} , 
                      enddate* {t('api_access.required')} , 
                      page, 
                      limit 
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/earthquakes/eventId</td>
                    <td>{t('api_access.endpoint_eventid')}</td>
                    <td>eventId* {t('api_access.required')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Query Parameters Earthquakes */}
          <div className='mb-14'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              {t('api_access.title_parameters_earthquakes')}
            </h2>
            <p className='text-white/70 mb-4'>
              {t('api_access.description_parameters_earthquakes')}
            </p>
            <div className='overflow-x-auto'>
              <table className='w-full text-left text-white/80 text-sm border border-white/10 rounded-xl overflow-hidden'>
                <thead className='bg-white/10 text-white'>
                  <tr>
                    <th className='px-4 py-3'>
                      {t('api_access.list_parameter')}
                    </th>
                    <th className='px-4 py-3'>
                      {t('api_access.list_type')}
                    </th>
                    <th className='px-4 py-3'>
                      {t('api_access.list_description')}
                    </th>
                    <th className='px-4 py-3'>
                      {t('api_access.list_example')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='px-4 py-3'>{t('api_access.page')}</td>
                    <td>{t('api_access.integer')}</td>
                    <td>{t('api_access.info_page')}</td>
                    <td>?page=2</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>limit</td>
                    <td>integer</td>
                    <td>{t('api_access.info_limit')}</td>
                    <td>?limit=100</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>year</td>
                    <td>integer</td>
                    <td>{t('api_access.info_year')}</td>
                    <td>?year=2025</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>month</td>
                    <td>integer</td>
                    <td>{t('api_access.info_month')}</td>
                    <td>?month=9</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>startdate</td>
                    <td>string (YYYY-MM-DD)</td>
                    <td>{t('api_access.info_startdate')}</td>
                    <td>?startdate=2025-09-01</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>enddate</td>
                    <td>string (YYYY-MM-DD)</td>
                    <td>{t('api_access.info_enddate')}</td>
                    <td>?enddate=2025-09-30</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>latitude</td>
                    <td>float</td>
                    <td>{t('api_access.info_latitude')}</td>
                    <td>?latitude=35.6762</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>longitude</td>
                    <td>float</td>
                    <td>{t('api_access.info_longitude')}</td>
                    <td>?longitude=139.6503</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>radius</td>
                    <td>integer</td>
                    <td>{t('api_access.info_radius')}</td>
                    <td>?radius=500</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>region</td>
                    <td>string</td>
                    <td>{t('api_access.info_region')}</td>
                    <td>?region=Sicilia</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>depth</td>
                    <td>integer</td>
                    <td>{t('api_access.info_depth')}</td>
                    <td>?depth=70</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>mag</td>
                    <td>float</td>
                    <td>{t('api_access.info_mag')}</td>
                    <td>?mag=4.5</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>eventId</td>
                    <td>integer</td>
                    <td>{t('api_access.info_eventid')}</td>
                    <td>?eventId=44278572</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Examples Earthquakes */}
          <div className='mb-14'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              {t('api_access.title_examples')}
            </h2>

            <h4 className='flex justify-between text-lg font-semibold text-white mb-2'>
              <p>JavaScript</p>
              <p>{t('api_access.javascript_example_earthquake')}</p>
              <CopyButton text={quickStart.earthquakesJavascript} />
            </h4>
            <pre className='bg-black/30 border border-white/10 rounded-xl p-16 text-amber-300 text-sm overflow-x-auto'>
              <code>{quickStart.earthquakesJavascript}</code>
            </pre>

            <h4 className='flex justify-between mt-6 text-lg font-semibold text-white mb-2'>
              <p>Python</p>
              <p>{t('api_access.python_example_earthquake')}</p>
              <CopyButton text={quickStart.earthquakesPython} />
            </h4>
            <pre className='bg-black/30 border border-white/10 rounded-xl p-16 text-green-700 text-sm overflow-x-auto'>
              <code>{quickStart.earthquakesPython}</code>
            </pre>
          </div>

          {/* Endpoint Stations List / Table */}
          <div className='mb-14'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              {t('api_access.title_endpoint_stations')}
            </h2>
            <p className='text-white/70 mb-4'>
              {t('api_access.endpoints_support_stations')} <code>page</code> {t('api_access.and')}{' '}
              <code>limit</code>.
            </p>

            <div className='overflow-x-auto'>
              <table className='w-full text-left text-white/80 text-sm border border-white/10 rounded-xl overflow-hidden'>
                <thead className='bg-white/10 text-white'>
                  <tr>
                    <th className='px-4 py-3'>
                      {t('api_access.list_method')}
                    </th>
                    <th className='px-4 py-3'>
                      {t('api_access.list_endpoint')}
                    </th>
                    <th className='px-4 py-3'>
                      {t('api_access.list_description')}
                    </th>
                    <th className='px-4 py-3'>
                      {t('api_access.list_parameters')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/stations</td>
                    <td>{t('api_access.info_stations')}</td>
                    <td>
                      page,
                      limit
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/stations/code</td>
                    <td>{t('api_access.info_code')}</td>
                    <td>
                      code* (required)
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/stations/geojson</td>
                    <td>{t('api_access.info_geojson')}</td>
                    <td>
                      page, 
                      limit
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/stations/status/open</td>
                    <td>{t('api_access.info_open')}</td>
                    <td>
                      page, 
                      limit
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/stations/status/closed</td>
                    <td>{t('api_access.info_closed')}</td>
                    <td>
                      page, 
                      limit
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>GET</td>
                    <td>/v1/stations/statistics</td>
                    <td>{t('api_access.info_statistics')}</td>
                    <td>{t('api_access.no_parameters')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Query Parameters Stations */}
          <div className='mb-14'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              {t('api_access.title_parameters_stations')}
            </h2>
            <p className='text-white/70 mb-4'>
              {t('api_access.description_parameters_stations')}
            </p>
            <div className='overflow-x-auto'>
              <table className='w-full text-left text-white/80 text-sm border border-white/10 rounded-xl overflow-hidden'>
                <thead className='bg-white/10 text-white'>
                  <tr>
                    <th className='px-4 py-3'>
                      {t('api_access.list_parameter')}
                    </th>
                    <th className='px-4 py-3'>
                      {t('api_access.list_type')}
                    </th>
                    <th className='px-4 py-3'>
                      {t('api_access.list_description')}
                    </th>
                    <th className='px-4 py-3'>
                      {t('api_access.list_example')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='px-4 py-3'>page</td>
                    <td>integer</td>
                    <td>{t('api_access.info_page')}</td>
                    <td>?page=2</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>limit</td>
                    <td>integer</td>
                    <td>{t('api_access.info_limit')}</td>
                    <td>?limit=100</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>code</td>
                    <td>string</td>
                    <td>{t('api_access.info_code_station')}</td>
                    <td>?code=acate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Examples Stations */}
          <div className='mb-14'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              {t('api_access.title_example_stations')}
            </h2>

            <h4 className='flex justify-between text-lg font-semibold text-white mb-2'>
              <p>JavaScript</p>
              <p>{t('api_access.javascript_example_station')}</p>
              <CopyButton text={quickStart.stationsJavascript} />
            </h4>
            <pre className='bg-black/30 border border-white/10 rounded-xl p-16 text-amber-300 text-sm overflow-x-auto'>
              <code>{quickStart.stationsJavascript}</code>
            </pre>

            <h4 className='flex justify-between mt-6 text-lg font-semibold text-white mb-2'>
              <p>Python</p>
              <p>{t('api_access.python_example_station')}</p>
              <CopyButton text={quickStart.stationsPython} />
            </h4>
            <pre className='bg-black/30 border border-white/10 rounded-xl p-16 text-green-700 text-sm overflow-x-auto'>
              <code>{quickStart.stationsPython}</code>
            </pre>
          </div>

          {/* Future Access Section */}
          <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              {t('api_access.title_future_access')}
            </h2>
            <p className='text-white/80'>
              {t('api_access.description_future_access')}
            </p>
            <ul className='list-disc list-inside text-white/70 mt-3 space-y-1'>
              <li>
                <span className='font-semibold text-white'>
                  {t('api_access.free_developer')}
                </span>{' '}
                {t('api_access.limited_non_commercial')}
              </li>
              <li>
                <span className='font-semibold text-white'>
                  {t('api_access.research_tier')}
                </span>{' '}
                {t('api_access.extended_academic')}
              </li>
              <li>
                <span className='font-semibold text-white'>
                  {t('api_access.enterprise_tier')}
                </span>{' '}
                {t('api_access.real_time_alert')}
              </li>
            </ul>
          </div>
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}
