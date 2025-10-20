import { useNavigate } from 'react-router-dom';

export default function GetStarted() {
  const navigate = useNavigate();

  const quickStartSteps = [
    {
      step: '1',
      title: 'Sign Up',
      description: 'Create your free account to get API access',
    },
    {
      step: '2',
      title: 'Get API Key',
      description: 'Access your dashboard to retrieve your API key',
    },
    {
      step: '3',
      title: 'Start Building',
      description: 'Make your first API call and start building',
    },
  ];

  return (
    <>
      {/* Quick Start Guide */}
      <section className='relative z-30 w-full px-6 py-20 bg-gradient-to-r from-violet-950/30 to-purple-950/30 text-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-extrabold mb-6 text-white'>
              Get Started in Minutes
            </h2>
            <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
              Follow these simple steps to start using TerraQuake API
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {quickStartSteps.map((item) => (
              <div
                key={item.title}
                className='text-center'
              >
                <div className='relative mb-6'>
                  <div className='w-16 h-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4'>
                    {item.step}
                  </div>
                </div>
                <h3 className='text-xl font-semibold mb-3 text-white'>
                  {item.title}
                </h3>
                <p className='text-gray-300'>{item.description}</p>
              </div>
            ))}
          </div>

          <div className='text-center mt-12'>
            <button
              onClick={() => navigate('/api-access')}
              className='bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-full hover:scale-105 transform transition duration-300 cursor-pointer shadow-lg text-lg'
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
