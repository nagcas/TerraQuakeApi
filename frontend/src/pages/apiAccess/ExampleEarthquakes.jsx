import { CopyButton } from '@components/utils/CopyButton';
import { API_BASE } from '@/data/BaseApi';
import { useTranslation } from "react-i18next";

export default function ExampleEarthquakes() {
  const { t } = useTranslation('translation');

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
  };

  return (
    <>
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
        <pre className='bg-black/30 border border-white/10 rounded-xl p-16 text-amber-300 text-sm overflow-x-auto'>
          <code>{quickStart.earthquakesPython}</code>
        </pre>
      </div>
    </>
  );
}
