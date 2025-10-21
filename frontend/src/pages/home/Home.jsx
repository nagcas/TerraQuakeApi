import Hero from '@components/hero/Hero';
import Info from '@components/info/Info';
import MetaData from '@pages/noPage/MetaData';
import Newsletter from '@/components/newsletter/Newsletter';
import { useState } from 'react';
import Testimonials from '@/components/testimonials/Testimonials';
import BackToTopButton from '@/components/utils/BackToTopButton';
import GetStarted from '@/components/started/GetStarted';
import Metrics from '@/components/metrics/Metrics';

export default function Home() {
  const [earthquakeData, setEarthquakeData] = useState(null);
  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='TerraQuake API | Real-Time Earthquake Monitoring & Seismic Data'
        description='TerraQuake API offers real-time earthquake data, seismic activity monitoring, and historical earthquake insights for developers, researchers, and safety organizations.'
        ogTitle='TerraQuake API | Real-Time Earthquake Monitoring'
        ogDescription='Access live earthquake data, monitor seismic activity, and explore historical earthquake information with TerraQuake API — the leading tool for seismic research and safety.'
        twitterTitle='TerraQuake API | Real-Time Earthquake Data'
        twitterDescription='Discover live and historical earthquake data for research, monitoring, and disaster prevention with TerraQuake API.'
        keywords='TerraQuake API, real-time earthquake data, seismic monitoring, earthquake API, seismic research, disaster prevention'
      />
      {/* SEO Stuff */}

      <Hero />
      <Info />
      <Metrics />
      <GetStarted />
      <Newsletter />

      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}
