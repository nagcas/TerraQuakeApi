import MetaData from '@pages/noPage/metaData';

export default function Contact() {
  return (
    <>
      <MetaData
        title='About'
        description='About of TerraQuake API'
      />
      <section className='relative z-30 w-full min-h-screen px-6 py-20'>
        <h1 className='text-2xl md:text-4xl text-white font-extrabold text-center my-25 tracking-tight'>
          Contact TerraQuake API
        </h1>
        <div className='max-w-2xl mx-auto mt-10 bg-gradient-to-br from-white/5 to-violet-950/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg'>
          <p className='text-gray-300 text-lg mb-6'>
            We welcome your feedback, questions, and collaboration proposals! Reach out for support, to report issues, or to suggest new features for TerraQuake API.
          </p>
          <div className='mb-6'>
            <span className='block text-purple-400 font-semibold mb-2'>Email:</span>
            <a href='mailto:support@terraquakeapi.com' className='text-indigo-400 hover:text-purple-300 underline'>support@terraquakeapi.com</a>
          </div>
          <div className='mb-6'>
            <span className='block text-purple-400 font-semibold mb-2'>Social:</span>
            <a href='https://twitter.com/terraquakeapi' target='_blank' rel='noopener noreferrer' className='text-indigo-400 hover:text-purple-300 underline mr-4'>Twitter/X</a>
            <a href='https://github.com/nagcas/TerraQuakeApi' target='_blank' rel='noopener noreferrer' className='text-indigo-400 hover:text-purple-300 underline'>GitHub</a>
          </div>
          <div className='mb-6'>
            <span className='block text-purple-400 font-semibold mb-2'>Privacy:</span>
            <p className='text-gray-300'>Your contact information will be used solely for support and will not be shared. For details, see our <a href='/privacyPolicy' className='text-indigo-400 hover:text-purple-300 underline'>Privacy Policy</a>.</p>
          </div>
          <div>
            <span className='block text-purple-400 font-semibold mb-2'>Contribute:</span>
            <p className='text-gray-300'>Want to help improve TerraQuake API? Visit our <a href='https://github.com/nagcas/TerraQuakeApi' target='_blank' rel='noopener noreferrer' className='text-indigo-400 hover:text-purple-300 underline'>GitHub repository</a> to report issues or submit pull requests.</p>
          </div>
        </div>
      </section>
    </>
  );
}
