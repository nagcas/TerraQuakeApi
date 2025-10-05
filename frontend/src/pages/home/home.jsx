import Hero from '@components/hero/hero';
import Info from '@components/info/info';
import MetaData from '@pages/noPage/metaData';
import ApiDocsEarthquakes from '@components/apiDocs/apiDocsEarthquakes';
import Newsletter from '@/components/newsletter/Newsletter';
import ViewMap from '@/components/map/ViewMap';
import { useState } from 'react';

export default function Home() {
  const [earthquakeData, setEarthquakeData] = useState(null);
  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Home'
        description='Home - TerraQuake API'
        ogTitle='Home - TerraQuake API'
        twitterTitle='Home - TerraQuake API'
      />
      {/* SEO Stuff */}
      <Hero />
      <Info />
      <ApiDocsEarthquakes setEarthquakeData={setEarthquakeData}/>
      <ViewMap earthquakeData={earthquakeData}/>
      <Newsletter />
    </>
  );
}