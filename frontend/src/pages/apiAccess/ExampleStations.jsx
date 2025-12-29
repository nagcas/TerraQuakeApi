import { CopyButton } from '@components/utils/CopyButton';
import { API_BASE } from '@/data/BaseApi';
import { useTranslation } from "react-i18next";

export default function ExampleStations() {
  const { t } = useTranslation('translation');

  const quickStart = {
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
        <pre className='bg-black/30 border border-white/10 rounded-xl p-16 text-amber-300 text-sm overflow-x-auto'>
          <code>{quickStart.stationsPython}</code>
        </pre>
      </div>
    </>
  );
}
