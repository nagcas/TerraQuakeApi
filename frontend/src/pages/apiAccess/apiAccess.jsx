import MetaData from '@pages/noPage/metaData';

export default function ApiAccess() {
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

      <section className='relative z-30 w-full min-h-screen px-6 py-20'>
        {/* Header Section */}
        <div className='flex flex-col justify-center items-center mb-16'>
          <h1 className='text-3xl md:text-5xl text-white/80 font-extrabold text-center tracking-tight mb-4 animate-fade-in mt-12'>
            API Access for TerraQuake API
            <div className='h-1 w-2/4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto my-2 rounded-full' />
          </h1>

          {/* Description */}
          <p className='mt-16 text-white text-center text-lg w-[95%] lg:w-6xl'></p>
        </div>
      </section>
    </>
  );
}
