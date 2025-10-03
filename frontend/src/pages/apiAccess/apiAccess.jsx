import MetaData from '@pages/noPage/metaData';

export default function ApiAccess() {
  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='API Access'
        description='API Access - TerraQuake API'
        ogTitle='API Access - TerraQuake API'
        twitterTitle='API Access - TerraQuake API'
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
