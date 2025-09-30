import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "@components/modules/context";
import MetaData from "@pages/noPage/metaData";
import {
  FaBook,
  FaQuestionCircle,
  FaInfoCircle,
  FaDatabase,
  FaCode,
  FaCogs,
  FaBell,
  FaRocket,
  FaUsers,
  FaChartLine,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";
import JsonApi2 from "@images/json-api-2.png";

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(Context);

  const mainFeatures = [
    {
      title: "Real-Time Data",
      description:
        "Access up-to-date seismic data from official sources like INGV",
      icon: <FaGlobe className="text-4xl text-violet-400" />,
      link: "/explore-data",
    },
    {
      title: "Advanced Filtering",
      description:
        "Query earthquakes by location, magnitude, time range, and more",
      icon: <FaCogs className="text-4xl text-violet-400" />,
      link: "/docs",
    },
    {
      title: "Easy Integration",
      description:
        "Simple REST API with JSON responses for seamless integration",
      icon: <FaCode className="text-4xl text-violet-400" />,
      link: "/api-access",
    },
    {
      title: "Statistical Insights",
      description: "Generate reports and analyze seismic activity patterns",
      icon: <FaChartLine className="text-4xl text-violet-400" />,
      link: "/use-cases",
    },
  ];

  const navigationButtons = [
    {
      title: "Documentation",
      description: "Complete API reference and guides",
      icon: <FaBook className="text-3xl" />,
      link: "/docs",
      primary: true,
    },
    {
      title: "FAQ",
      description: "Frequently asked questions",
      icon: <FaQuestionCircle className="text-3xl" />,
      link: "/docs", // Assuming FAQ is part of docs
      primary: false,
    },
    {
      title: "About",
      description: "Learn more about TerraQuake API",
      icon: <FaInfoCircle className="text-3xl" />,
      link: "/about",
      primary: false,
    },
  ];

  const quickStartSteps = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create your free account to get API access",
      icon: <FaUsers className="text-3xl text-violet-400" />,
    },
    {
      step: "2",
      title: "Get API Key",
      description: "Access your dashboard to retrieve your API key",
      icon: <FaShieldAlt className="text-3xl text-violet-400" />,
    },
    {
      step: "3",
      title: "Start Building",
      description: "Make your first API call and start building",
      icon: <FaRocket className="text-3xl text-violet-400" />,
    },
  ];

  return (
    <>
      {/* SEO Metadata */}
      <MetaData
        title="TerraQuake API - Real-Time Seismic Data for Developers"
        description="Access real-time earthquake data with our comprehensive API. Perfect for developers, researchers, and institutions building seismic monitoring applications."
      />

      {/* Hero Section */}
      <section className="relative z-30 w-full min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b text-white">
        <div className="flex flex-col 2xl:flex-row justify-center items-center gap-10 max-w-7xl mx-auto">
          {/* Hero Text */}
          <div className="flex flex-col max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-[50px] bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
              TerraQuake API
            </h1>
            <p className="text-xl md:text-2xl text-violet-200 font-semibold mt-4 mb-6">
              Real-Time Seismic Data for Modern Applications
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Access comprehensive earthquake data from official sources.
              Perfect for developers, researchers, and institutions building
              monitoring and safety applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              {!isLoggedIn && (
                <button
                  className="relative z-30 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transform transition duration-300 cursor-pointer shadow-lg"
                  onClick={() => navigate("/signup")}
                  aria-label="Sign up for TerraQuake API"
                >
                  Get Started Free
                </button>
              )}
              <button
                className="relative z-30 border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer"
                onClick={() => navigate("/explore-data")}
                aria-label="Explore seismic data"
              >
                Explore Live Data
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center items-center">
            <img
              src={JsonApi2}
              alt="TerraQuake API Interface"
              className="border border-gray-600 p-2 rounded-2xl w-full max-w-[640px] h-auto shadow-2xl filter brightness-120 contrast-160"
            />
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="relative z-30 w-full px-6 py-12 bg-gradient-to-r from-violet-900/20 to-purple-900/20 border-y border-violet-500/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-lg p-6 border border-violet-500/30">
            <FaBell className="text-violet-400 text-2xl mr-4 flex-shrink-0" />
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                📊 New Statistical Endpoints Available!
              </h3>
              <p className="text-gray-300">
                We've added powerful statistical analysis endpoints to help you
                gain insights from seismic data.
                <button
                  onClick={() => navigate("/docs")}
                  className="text-violet-400 hover:text-violet-300 underline ml-2"
                >
                  Check out the documentation →
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Navigation Buttons */}
      <section className="relative z-30 w-full px-6 py-20 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-white">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {navigationButtons.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.link)}
                className={`group cursor-pointer p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  item.primary
                    ? "bg-gradient-to-br from-violet-600/20 to-purple-600/20 border-violet-500/50 hover:border-violet-400"
                    : "bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600/50 hover:border-gray-400"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`mx-auto mb-4 ${
                      item.primary ? "text-violet-400" : "text-gray-400"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="relative z-30 w-full px-6 py-20 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">
              Powerful Features for Seismic Data
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to build amazing applications with real-time
              earthquake data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.link)}
                className="group cursor-pointer bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/50 hover:border-violet-400/50 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-center">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="relative z-30 w-full px-6 py-20 bg-gradient-to-r from-violet-950/30 to-purple-950/30 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Follow these simple steps to start using TerraQuake API
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickStartSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                    {step.step}
                  </div>
                  <div className="mb-4">{step.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate(isLoggedIn ? "/api-access" : "/signup")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-full hover:scale-105 transform transition duration-300 cursor-pointer shadow-lg text-lg"
            >
              {isLoggedIn ? "Access Your Dashboard" : "Start Your Journey"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
