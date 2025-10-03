import './about.css';
import { useState } from 'react';
import MetaData from '@pages/noPage/metaData';
import { FaGlobeAmericas, FaLightbulb, FaChartLine, FaCode, FaBalanceScale, FaHandsHelping, FaUserAstronaut, FaUsers } from 'react-icons/fa';

export default function About() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cardSections = [
    {
      title: "Project Introduction",
      content:
        "TerraQuake API is an open-source project designed to make seismic data more accessible, clear, and usable for developers, researchers, institutions, and communities. The goal is to provide a modern and simple interface to consult real-time earthquake information, promoting applications focused on safety and disaster prevention.",
      icon: (
        <FaGlobeAmericas className="text-purple-400 text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
      ),
      gradient: "from-purple-500/10 via-violet-500/5 to-transparent",
    },
    {
      title: "Motivation",
      content:
        "The project was born from the need for free and open tools that allow fast and reliable access to seismic data. By translating technical information into accessible APIs, anyone—from students to emergency app developers—can build innovative solutions to protect people and communities.",
      icon: (
        <FaLightbulb className="text-purple-400 text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
      ),
      gradient: "from-pink-500/10 via-purple-500/5 to-transparent",
    },
    {
      title: "Key Features",
      content:
        "TerraQuake API provides access to up-to-date seismic data from official sources such as INGV, offering advanced filtering options by geographic location, magnitude, and time. The API returns JSON responses that are ready to be integrated into both web and mobile applications, complemented by clear documentation and developer-friendly support.",
      icon: (
        <FaChartLine className="text-purple-400 text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
      ),
      gradient: "from-violet-500/10 via-indigo-500/5 to-transparent",
    },
  ];

  const textSections = [
    {
      title: "Technologies Used",
      content:
        "The backend of TerraQuake API is built with Node.js and Express.js, while MongoDB serves as the database. Key libraries such as Axios, Mongoose, dotenv, and bcryptjs are used to handle data and security efficiently. Environment management is supported with CORS and dotenv, and the project is hosted on platforms like Vercel or Render, depending on your preferred hosting solution.",
      icon: (
        <FaCode className="text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105" />
      ),
    },
    {
      title: "Open Source License",
      content:
        "TerraQuake API is distributed under the AGPL-3.0 license. This means anyone can use, modify, and share the project freely, but any derivative works must also be released under the same license. The goal is to promote collaboration and ensure that improvements remain open and accessible to the community.",
      icon: (
        <FaBalanceScale className="text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105" />
      ),
    },
    {
      title: "Donations & Support",
      content:
        "If you would like to support the project, you can contribute via GitHub Sponsors or make voluntary donations. Every contribution helps maintain servers, improve the API, and ensure reliable service.",
      icon: (
        <FaHandsHelping className="text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105" />
      ),
    },
    {
      title: "About the Developer",
      content:
        "TerraQuake API is developed by Gianluca Chiaravalloti, a geologist and full-stack web developer. The project combines scientific expertise with technology to create practical applications for seismic safety.",
      icon: (
        <FaUserAstronaut className="text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105" />
      ),
    },
    {
      title: "International Collaboration",
      content:
        "TerraQuake API is proud to have a diverse, international team of 5 collaborators from around the world. Their contributions—from backend development to frontend enhancements and testing—help ensure the project is robust, reliable, and continuously improving. Working with developers across different countries brings unique perspectives, accelerates innovation, and strengthens the global impact of the project.",
      icon: (
        <FaUsers className="text-purple-400 text-2xl transition-transform duration-300 group-hover:scale-105" />
      ),
    },
  ];

  const highlightMetrics = [
    {
      value: "180K+",
      label: "Events processed",
      description: "Real-time earthquakes normalized and accessible",
    },
    {
      value: "<120ms",
      label: "API latency",
      description: "Average response across global regions",
    },
    {
      value: "24/7",
      label: "Data monitoring",
      description: "Continuous ingestion from trusted observatories",
    },
  ];

  const timelineSteps = [
    {
      year: "2021",
      title: "Project inception",
      description:
        "Initial prototype launched to simplify seismic data exploration for students and researchers.",
    },
    {
      year: "2022",
      title: "Open collaboration",
      description:
        "Community contributions expanded features, documentation, and automated testing pipelines.",
    },
    {
      year: "2024",
      title: "Global adoption",
      description:
        "Teams across five continents integrated the API into dashboards, alerting tools, and learning apps.",
    },
  ];

  return (
    <>
      <MetaData title="About" description="About of TerraQuake API" />
      <section className="relative z-30 w-full min-h-screen px-6 py-16 overflow-hidden">
        <div className="absolute top-24 left-10 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-44 right-16 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative max-w-4xl mx-auto mb-20">
          <h1 className="text-3xl md:text-5xl text-white font-extrabold text-center tracking-tight mb-6 animate-fade-in mt-12">
            About TerraQuake API
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto rounded-full" />
          <p className="mt-6 text-center text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
            A focused platform built to translate raw seismic feeds into
            developer-friendly endpoints and actionable insights for safety,
            research, and education.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-4 md:grid-cols-3 mb-16">
          {highlightMetrics.map((metric) => (
            <div
              key={metric.label}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-6 backdrop-blur-sm transition-all duration-400 hover:border-purple-400/30 hover:bg-white/[0.05]">

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent" />
              <div className="relative">
                <span className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                  {metric.value}
                </span>
                <p className="mt-1 text-sm uppercase tracking-[0.2em] text-purple-200/70">
                  {metric.label}
                </p>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-24">
          {cardSections.map((item, index) => (
            <div
              key={item.title}
              className="group relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`,
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative bg-gradient-to-br from-white/5 to-violet-950/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-purple-400/30 h-full">
                <div className="flex flex-col items-start h-full">
                  <div className="mb-3">{item.icon}</div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-5 relative">
                    {item.title}
                    <div
                      className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-transparent transition-all duration-500 ${
                        hoveredCard === index ? "w-full" : "w-0"
                      }`}
                    />
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base flex-grow">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {textSections.map((item, index) => (
            <div
              key={item.title}
              className="group relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 backdrop-blur-sm rounded-2xl p-8 hover:border-purple-400/20 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-400/20 group-hover:border-purple-400/40 transition-all duration-300">
                  {item.icon}
                </div>
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  {item.title}
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base pl-[60px]">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
}
