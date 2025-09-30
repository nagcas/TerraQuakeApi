import Hero from "@components/hero/hero";
import Info from "@components/info/info";
import MetaData from "@pages/noPage/metaData";
import ApiDocsEarthquakes from "@components/apiDocs/apiDocsEarthquakes";

export default function Home() {
  return (
    <>
      {/* SEO Stuff */}
      <MetaData title="Home" description="Home Page of TerraQuake" />
      {/* SEO Stuff */}
      <Hero />
      <Info />
      <ApiDocsEarthquakes />
    </>
  );
}
