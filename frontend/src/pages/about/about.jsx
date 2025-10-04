import MetaData from '@pages/noPage/metaData';
import { motion } from "framer-motion";
import { 
  FaGlobeAmericas, FaLightbulb, FaChartLine, 
  FaCode, FaBalanceScale, FaHandsHelping, 
  FaUserAstronaut, FaUsers 
} from 'react-icons/fa';

export default function About() {
  const cardSections = [
    {
      title: 'Project Introduction',
      content:
        'TerraQuake API is an open-source project designed to make seismic data more accessible, clear, and usable for developers, researchers, institutions, and communities.',
      icon: <FaGlobeAmericas className="text-purple-400 text-5xl mb-6 group-hover:rotate-12 transition-transform" />,
    },
    {
      title: 'Motivation',
      content:
        'Born from the need for free and open tools that allow fast and reliable access to seismic data, helping build innovative solutions to protect communities.',
      icon: <FaLightbulb className="text-yellow-400 text-5xl mb-6 group-hover:scale-110 transition-transform" />,
    },
    {
      title: 'Key Features',
      content:
        'Access up-to-date seismic data from official sources, filter by location, magnitude, and time. JSON-ready responses with clear docs for easy integration.',
      icon: <FaChartLine className="text-green-400 text-5xl mb-6 group-hover:-rotate-12 transition-transform" />,
    },
  ];

  const textSections = [
    {
      title: 'Technologies Used',
      content:
        'Built with Node.js, Express.js, and MongoDB. Key libraries include Axios, Mongoose, dotenv, and bcryptjs. Hosted on Vercel/Render for reliability.',
      icon: <FaCode className="text-purple-400 text-3xl mr-3" />,
    },
    {
      title: 'Open Source License',
      content:
        'Distributed under AGPL-3.0 license to ensure all improvements remain open and community-driven.',
      icon: <FaBalanceScale className="text-indigo-400 text-3xl mr-3" />,
    },
    {
      title: 'Donations & Support',
      content:
        'Support via GitHub Sponsors or donations to help maintain servers, improve API, and ensure reliability.',
      icon: <FaHandsHelping className="text-pink-400 text-3xl mr-3" />,
    },
    {
      title: 'About the Developer',
      content:
        'Created by Gianluca Chiaravalloti, a geologist and full-stack developer combining science with tech.',
      icon: <FaUserAstronaut className="text-blue-400 text-3xl mr-3" />,
    },
    {
      title: 'International Collaboration',
      content:
        'A diverse global team of 5 collaborators ensures innovation, reliability, and worldwide impact.',
      icon: <FaUsers className="text-teal-400 text-3xl mr-3" />,
    },
  ];

  return (
    <>
      <MetaData title="About" description="About TerraQuake API" />
      <section className="relative w-full min-h-screen px-6 py-20 bg-gradient-to-br from-indigo-950 via-violet-900 to-gray-900 overflow-hidden">

        {/* Floating background animation */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute left-16 top-32 w-36 h-36 bg-purple-700/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute right-20 top-44 w-28 h-28 bg-indigo-500/30 rounded-full blur-3xl animate-bounce" />
          <div className="absolute left-1/3 bottom-16 w-44 h-44 bg-violet-500/30 rounded-full blur-3xl animate-ping" />
        </div>

        {/* Header */}
        <div className="relative max-w-3xl mx-auto text-center mb-20 z-10">
          <motion.div 
            initial={{ opacity: 0, y: -40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }}
            className="flex justify-center mb-6"
          >
            <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-500 p-6 rounded-full shadow-2xl">
              <FaGlobeAmericas className="text-white text-6xl animate-spin-slow" />
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-violet-400 mb-6 drop-shadow-lg">
            About TerraQuake API
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium">Open-source seismic data for everyone.</p>
        </div>

        {/* Cards */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          transition={{ staggerChildren: 0.3 }}
          className="relative max-w-6xl mx-auto grid gap-16 md:grid-cols-2 lg:grid-cols-3 mb-24 z-10"
        >
          {cardSections.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="group bg-gradient-to-br from-violet-900/70 via-indigo-900/70 to-gray-900/80 border border-violet-700/30 backdrop-blur-2xl rounded-2xl p-10 shadow-xl hover:shadow-2xl hover:shadow-purple-600 hover:border-purple-400"
            >
              {item.icon}
              <h2 className="text-2xl font-bold text-purple-300 mb-4">{item.title}</h2>
              <p className="text-gray-200 text-lg leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Text Sections */}
        <div className="relative max-w-4xl mx-auto space-y-16 z-10">
          {textSections.map((item) => (
            <motion.div 
              key={item.title} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }} 
              className="pt-12 border-t border-violet-700/20"
            >
              <div className="flex items-center mb-4">
                {item.icon}
                <h2 className="text-2xl font-semibold text-purple-300">{item.title}</h2>
              </div>
              <p className="text-gray-200 text-lg leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.7 }}
          className="relative max-w-2xl mx-auto mt-24 text-center z-10"
        >
          <blockquote className="text-2xl md:text-3xl italic text-purple-300 font-semibold mb-6 relative">
            <span className="relative before:absolute before:-bottom-2 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r from-purple-400 via-indigo-400 to-violet-400 before:animate-gradient-x">
              "Empowering communities with open seismic data for a safer tomorrow."
            </span>
          </blockquote>
          <p className="text-gray-400 mb-6">Join us, contribute, and make a difference!</p>

          {/* CTA Button */}
          <a 
            href="https://github.com/your-repo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-500 rounded-full text-white font-semibold shadow-lg hover:shadow-xl hover:brightness-110 transition-all"
          >
            Contribute on GitHub
          </a>
        </motion.div>
      </section>
    </>
  );
}
