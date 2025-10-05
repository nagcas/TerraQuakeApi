import MetaData from '@/pages/noPage/metaData';
import { useState } from 'react';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b border-gray-700'>
      <button
        className='w-full py-5 px-4 flex justify-between items-center hover:bg-purple-900/30'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='text-lg font-medium text-white'>{question}</span>
        <svg
          className={`w-6 h-6 transform ${
            isOpen ? 'rotate-180' : ''
          } transition-transform text-white`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>
      {isOpen && (
        <div className='px-4 pb-5'>
          <p className='text-gray-300'>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const faqData = [
    {
      question: 'What is TerraQuake API?',
      answer:
        'TerraQuake API is a comprehensive seismic data service that provides real-time and historical earthquake information. It offers developers and researchers easy access to global earthquake data through RESTful API endpoints.',
    },
    {
      question: 'What kind of data does it provide?',
      answer:
        'The API provides detailed earthquake data including magnitude, location (latitude/longitude), depth, time of occurrence, and region information. It also offers additional metadata like tsunami warnings and seismic station data.',
    },
    {
      question: 'Is the API free to use?',
      answer:
        'Yes, TerraQuake API offers a free tier with basic access to earthquake data. Premium features may require a subscription, but core functionality remains free for developers and researchers.',
    },
    {
      question: 'How can I contribute to the project?',
      answer:
        'You can contribute to TerraQuake API by submitting bug reports, suggesting new features, or contributing code on our GitHub repository. We welcome community involvement to improve and expand the service.',
    },
  ];

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='FAQ'
        description='Find answers to frequently asked questions about TerraQuake API, including data access, endpoints, usage guidelines, and best practices for integrating seismic data into your projects.'
        ogTitle='FAQ - TerraQuake API'
        ogDescription='Explore our comprehensive FAQ for TerraQuake API covering data access, API endpoints, usage guidelines, and tips for developers and researchers.'
        twitterTitle='FAQ - TerraQuake API'
        twitterDescription='Get answers to common questions about TerraQuake API, including how to access data, use endpoints, and follow best practices.'
        keywords='TerraQuake API, FAQ, earthquake API questions, API usage guidelines, seismic data access'
      />
      {/* SEO Stuff */}

      <section className='relative z-30 w-full min-h-screen px-6 py-20'>
        {/* Header Section */}
        <div className='flex flex-col justify-center items-center mb-16'>
          <h1 className='text-3xl md:text-5xl text-white/80 font-extrabold text-center tracking-tight mb-4 animate-fade-in mt-12'>
            Frequently Asked Questions
            <div className='h-1 w-2/4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto my-2 rounded-full' />
          </h1>

          {/* Description */}
          <p className='mt-16 text-white text-center text-lg w-[95%] lg:w-6xl'>
            Find quick answers to common questions about TerraQuake API
          </p>
        </div>

        {/* FAQ Content Section */}
        <div className='max-w-3xl mx-auto py-15 px-4 sm:px-6 lg:px-8'>
          <div className='space-y-6'>
            {faqData.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
