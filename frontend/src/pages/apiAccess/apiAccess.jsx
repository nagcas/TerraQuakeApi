import MetaData from '@pages/noPage/metaData';

export default function ApiAccess() {
  return (
    <>
      <MetaData
        title='API Access'
        description='API Access for TerraQuake API'
      />
      <section className='relative z-30 w-full min-h-screen px-6 py-20'>
        {/* Page header */}
        <div className='flex flex-col justify-center items-center mb-16'>
          <div className='flex flex-col justify-center items-center mb-16'>
          <h1 className="text-3xl md:text-5xl text-white/80 font-extrabold text-center tracking-tight mb-6 animate-fade-in mt-12">
            API Access for TerraQuake API
          </h1>
          <div className="h-1 w-1/4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto rounded-full" />

          <p className='text-white text-lg w-[95%] lg:w-6xl'></p>
        </div>
        </div>
      </section>
    </>
  );
}
