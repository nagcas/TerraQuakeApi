import { useState } from 'react';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700">
      <button
        className="w-full py-5 px-4 flex justify-between items-center hover:bg-purple-900/30"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <svg
          className={`w-6 h-6 transform ${isOpen ? 'rotate-180' : ''} transition-transform text-white`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 pb-5">
          <p className="text-gray-300">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const faqData = [
    {
      question: "What is TerraQuake API?",
      answer: "TerraQuake API is a comprehensive seismic data service that provides real-time and historical earthquake information. It offers developers and researchers easy access to global earthquake data through RESTful API endpoints."
    },
    {
      question: "What kind of data does it provide?",
      answer: "The API provides detailed earthquake data including magnitude, location (latitude/longitude), depth, time of occurrence, and region information. It also offers additional metadata like tsunami warnings and seismic station data."
    },
    {
      question: "Is the API free to use?",
      answer: "Yes, TerraQuake API offers a free tier with basic access to earthquake data. Premium features may require a subscription, but core functionality remains free for developers and researchers."
    },
    {
      question: "How can I contribute to the project?",
      answer: "You can contribute to TerraQuake API by submitting bug reports, suggesting new features, or contributing code on our GitHub repository. We welcome community involvement to improve and expand the service."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Title Section */}
      <div className="pt-30">

        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-300 text-center max-w-2xl mx-auto px-4">
          Find quick answers to common questions about TerraQuake API
        </p>
      </div>

      {/* FAQ Content Section */}
      <div className="max-w-3xl mx-auto py-15 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;