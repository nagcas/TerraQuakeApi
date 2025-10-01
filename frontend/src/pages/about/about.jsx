import MetaData from '@pages/noPage/metaData';
import './about.css';
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
      <section className="relative z-30 w-full min-h-screen px-6 py-20">
        <h1 className="text-2xl md:text-4xl text-white font-extrabold text-center my-25 tracking-tight">
          About TerraQuake API
        </h1>

        {/* Grid card con icone e tanto spazio */}
        <div className="max-w-6xl mx-auto grid gap-16 md:grid-cols-2 lg:grid-cols-3 mb-24">
          {cardSections.map((item) => (
            <div
              key={item.title}
              className="about-card bg-gradient-to-br from-white/5 to-violet-950/10 border border-white/10 backdrop-blur-md rounded-2xl p-10 shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-start">
                {item.icon}
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {item.title}
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Sezioni testuali con icone + spazio */}
        <div className="max-w-4xl mx-auto space-y-16">
          {textSections.map((item) => (
            <div key={item.title} className="pt-12 border-t border-white/20">
              <div className="flex items-center mb-4">
                {item.icon}
                <h2 className="text-2xl font-semibold text-purple-400">
                  {item.title}
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
