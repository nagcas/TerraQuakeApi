import MetaData from '@pages/noPage/metaData';
import { FaGlobeAmericas, FaLightbulb, FaChartLine, FaCode, FaBalanceScale, FaHandsHelping, FaUserAstronaut, FaUsers } from 'react-icons/fa';

export default function About() {
  const cardSections = [
    {
      title: 'Project Introduction',
      content:
        'TerraQuake API is an open-source project designed to make seismic data more accessible, clear, and usable for developers, researchers, institutions, and communities. The goal is to provide a modern and simple interface to consult real-time earthquake information, promoting applications focused on safety and disaster prevention.',
      icon: <FaGlobeAmericas className="text-purple-400 text-4xl mb-4" />,
    },
    {
      title: 'Motivation',
      content:
        'The project was born from the need for free and open tools that allow fast and reliable access to seismic data. By translating technical information into accessible APIs, anyone—from students to emergency app developers—can build innovative solutions to protect people and communities.',
      icon: <FaLightbulb className="text-purple-400 text-4xl mb-4" />,
    },
    {
      title: 'Key Features',
      content:
        'TerraQuake API provides access to up-to-date seismic data from official sources such as INGV, offering advanced filtering options by geographic location, magnitude, and time. The API returns JSON responses that are ready to be integrated into both web and mobile applications, complemented by clear documentation and developer-friendly support.',
      icon: <FaChartLine className="text-purple-400 text-4xl mb-4" />,
    },
  ];

  const textSections = [
    {
      title: 'Technologies Used',
      content:
        'The backend of TerraQuake API is built with Node.js and Express.js, while MongoDB serves as the database. Key libraries such as Axios, Mongoose, dotenv, and bcryptjs are used to handle data and security efficiently. Environment management is supported with CORS and dotenv, and the project is hosted on platforms like Vercel or Render, depending on your preferred hosting solution.',
      icon: <FaCode className="text-purple-400 text-3xl mr-2" />,
    },
    {
      title: 'Open Source License',
      content:
        'TerraQuake API is distributed under the AGPL-3.0 license. This means anyone can use, modify, and share the project freely, but any derivative works must also be released under the same license. The goal is to promote collaboration and ensure that improvements remain open and accessible to the community.',
      icon: <FaBalanceScale className="text-purple-400 text-3xl mr-2" />,
    },
    {
      title: 'Donations & Support',
      content:
        'If you would like to support the project, you can contribute via GitHub Sponsors or make voluntary donations. Every contribution helps maintain servers, improve the API, and ensure reliable service.',
      icon: <FaHandsHelping className="text-purple-400 text-3xl mr-2" />,
    },
    {
      title: 'About the Developer',
      content:
        'TerraQuake API is developed by Gianluca Chiaravalloti, a geologist and full-stack web developer. The project combines scientific expertise with technology to create practical applications for seismic safety.',
      icon: <FaUserAstronaut className="text-purple-400 text-3xl mr-2" />,
    },
    {
      title: 'International Collaboration',
      content:
        'TerraQuake API is proud to have a diverse, international team of 5 collaborators from around the world. Their contributions—from backend development to frontend enhancements and testing—help ensure the project is robust, reliable, and continuously improving. Working with developers across different countries brings unique perspectives, accelerates innovation, and strengthens the global impact of the project.',
      icon: <FaUsers className="text-purple-400 text-3xl mr-2" />,
    },
  ];

  return (
    <>
      <MetaData title="About" description="About of TerraQuake API" />
      <section className="relative z-30 w-full min-h-screen px-6 py-20 bg-gradient-to-br from-indigo-950 via-violet-900 to-gray-900 overflow-hidden">
        {/* Floating background shapes for visual interest */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute left-10 top-24 w-32 h-32 bg-purple-700/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute right-10 top-40 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute left-1/2 bottom-10 w-40 h-40 bg-violet-500/20 rounded-full blur-2xl animate-pulse" />
        </div>
        {/* Elegant header with accent and animation */}
  <div className="relative max-w-3xl mx-auto text-center mb-20 z-10">
          <div className="flex justify-center items-center mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-500 p-4 rounded-full shadow-xl">
              <FaGlobeAmericas className="text-white text-5xl" />
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-violet-400 drop-shadow-lg mb-4">
            About TerraQuake API
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium mb-2">Open-source seismic data for everyone.</p>
        </div>

        {/* Decorative divider */}
  <div className="flex justify-center mb-16 z-10">
          <span className="h-1 w-32 bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-500 rounded-full block opacity-70"></span>
        </div>

        {/* Grid cards with enhanced gradients and effects */}
  <div className="relative max-w-6xl mx-auto grid gap-16 md:grid-cols-2 lg:grid-cols-3 mb-24 z-10">
          {cardSections.map((item) => (
            <div
              key={item.title}
              className="bg-gradient-to-br from-violet-900/80 via-indigo-900/70 to-gray-900/80 border border-violet-700/30 backdrop-blur-xl rounded-2xl p-10 shadow-xl transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-700 group"
              style={{ transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s' }}
            >
              <div className="flex flex-col items-start animate-fade-in group-hover:animate-bounce">
                {item.icon}
                <h2 className="text-2xl md:text-3xl font-bold text-purple-300 mb-4 drop-shadow">
                  {item.title}
                </h2>
                <p className="text-gray-200 leading-relaxed text-base md:text-lg">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative divider */}
  <div className="flex justify-center mb-12 z-10">
          <span className="h-1 w-24 bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-500 rounded-full block opacity-60"></span>
        </div>

        {/* Text sections with icons and improved spacing/typography */}
  <div className="relative max-w-4xl mx-auto space-y-16 z-10">
          {textSections.map((item) => (
            <div key={item.title} className="pt-12 border-t border-violet-700/20 animate-fade-in">
              <div className="flex items-center mb-4">
                {item.icon}
                <h2 className="text-2xl font-semibold text-purple-300 ml-2 drop-shadow">
                  {item.title}
                </h2>
              </div>
              <p className="text-gray-200 leading-relaxed text-lg md:text-xl">
                {item.content}
              </p>
            </div>
          ))}
        </div>
        {/* Inspirational quote / call-to-action */}
        <div className="relative max-w-2xl mx-auto mt-24 text-center z-10 animate-fade-in">
          <blockquote className="text-xl md:text-2xl italic text-purple-300 font-semibold mb-4">
            "Empowering communities with open seismic data for a safer tomorrow."
          </blockquote>
          <p className="text-gray-400">Join us, contribute, and make a difference!</p>
        </div>
      </section>
    </>
  );
}
