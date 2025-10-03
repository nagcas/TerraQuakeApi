import Hero from '@components/hero/hero';
import Info from '@components/info/info';
import MetaData from '@pages/noPage/metaData';
import ApiDocsEarthquakes from '@components/apiDocs/apiDocsEarthquakes';
import Newsletter from '@/components/newsletter/Newsletter';

export default function Home() {
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
      <ApiDocsEarthquakes />
      <Newsletter />
    </>
  );
}
