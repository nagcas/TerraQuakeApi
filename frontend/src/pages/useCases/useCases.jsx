import { useState } from 'react';
import MetaData from '@pages/noPage/metaData';
import { FiChevronDown } from 'react-icons/fi';

export default function UseCases() {
  const useCaseDocs = [
    {
      title: 'Introduction',
      content:
        'This section describes the real-world applications of TerraQuake API. Here is what it does:',
      points: [
        'Open to developers, researchers, and organizations.',
        'Enables building applications for earthquake early warning systems.',
        'Supports educational tools to teach about seismic activity.',
        'Helps monitor infrastructure and safety in real-time.',
        'Assists in disaster prevention and preparedness planning.',
      ],
    },
    {
      title: 'Emergency Notification Systems',
      content:
        'Integrate real-time earthquake alerts into emergency notification platforms to inform citizens and authorities instantly.',
      points: [
        'Push notifications for mobile devices during seismic events.',
        'Automated SMS and email alerts for registered users.',
        'Integration with local government emergency response systems.',
      ],
    },
    {
      title: 'Mapping & Visualization Dashboards',
      content:
        'Create interactive dashboards to visualize seismic activity and trends over time and geography.',
      points: [
        'Live maps showing recent earthquakes and affected regions.',
        'Heatmaps and time-series charts for data analysis.',
        'Customizable filters for magnitude, location, and time.',
      ],
    },
    {
      title: 'Insurance & Risk Assessment',
      content:
        'Use seismic data to assess risk and inform insurance policies for properties and infrastructure.',
      points: [
        'Automated risk scoring for insured assets.',
        'Historical data analysis for premium calculation.',
        'Integration with property management platforms.',
      ],
    },
    {
      title: 'Smart City Infrastructure Monitoring',
      content:
        'Monitor the impact of seismic events on smart city infrastructure and automate safety protocols.',
      points: [
        'IoT sensor integration for bridges, buildings, and utilities.',
        'Automated shutdown or alerts for critical systems.',
        'Data-driven maintenance scheduling.',
      ],
    },
    {
      title: 'Seismic Research & Analysis',
      content:
        'Provide researchers with access to raw and processed seismic data for advanced analysis and modeling.',
      points: [
        'Downloadable datasets for academic studies.',
        'API endpoints for custom data queries.',
        'Collaboration tools for research teams.',
      ],
    },
    {
      title: 'Citizen Reporting & Mobile Apps',
      content:
        'Enable citizens to report felt earthquakes and receive personalized alerts through mobile applications.',
      points: [
        'Crowdsourced data collection for felt events.',
        'Location-based alerting and safety tips.',
        'Community engagement and feedback features.',
      ],
    },
    {
      title: 'Automated Social Media Alerts',
      content:
        'Automatically post earthquake alerts and updates to social media platforms for broader public awareness.',
      points: [
        'Twitter/X, Facebook, and Telegram bot integration.',
        'Customizable alert templates and hashtags.',
        'Real-time updates for followers and communities.',
      ],
    },
    {
      title: 'Scientific Research Applications',
      content:
        'This section describes how TerraQuakeAPI can be leveraged for scientific research in seismology and related fields. Here is what it enables researchers to do -',
      points: [
        'Monitor seismic patterns and trends in real-time for academic and applied research.',
        'Conduct studies on earthquake probability, frequency, and impact modeling.',
        'Integrate data seamlessly with analytical tools like MATLAB, Python, and R for deeper analysis.',
        'Support thesis projects, publications, and research reports on seismic activity.',
        'Assist in modeling and simulation of earthquake scenarios for research purposes.',
      ],
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <MetaData
        title="Use Cases"
        description="Use Cases for TerraQuake API"
      />
      <section className="relative z-30 w-full min-h-screen px-6 py-20 bg-gradient-to-b from-[#0f172a] to-[#1e1b4b]">
        {/* Page header */}
        <div className="flex flex-col justify-center items-center mb-16 text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent font-extrabold tracking-tight drop-shadow-lg">
            Use Cases for TerraQuake API
          </h1>

          <p className="text-gray-200 text-lg mt-4 w-[95%] lg:w-6xl leading-relaxed">
            Use Cases describe real-world scenarios where TerraQuake API can be
            applied. By providing fast, reliable access to seismic data, the API
            enables developers, researchers, institutions, and organizations to
            create applications focused on safety, monitoring, education, and
            disaster prevention.
          </p>
        </div>

        {/* Accordion section */}
        <div className="w-full mt-10 flex flex-col items-center">
          {useCaseDocs.map((item, index) => (
            <div
              key={item.title}
              className={`w-[95%] lg:w-6xl mb-6 bg-gradient-to-br from-white/10 via-violet-900/10 to-purple-800/20 border border-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-purple-700/40 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] ${
                expandedIndex === index ? 'ring-1 ring-purple-500/40' : ''
              }`}
              onClick={() => toggleExpand(index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-semibold text-white border-l-4 border-purple-500 pl-4">
                  {item.title}
                </h2>
                <FiChevronDown
                  className={`text-white text-2xl transition-transform duration-500 ${
                    expandedIndex === index ? 'rotate-180 text-purple-400' : ''
                  }`}
                />
              </div>

              <div
                className={`transition-all duration-700 ease-in-out ${
                  expandedIndex === index
                    ? 'max-h-[500px] opacity-100 mt-4 scale-100'
                    : 'max-h-0 opacity-0 scale-95'
                } overflow-hidden`}
              >
                <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-2">
                  {item.content}
                </p>
                <ul className="text-gray-300 leading-relaxed text-sm md:text-base list-disc list-inside pl-4 space-y-1">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="hover:text-purple-300 transition-colors">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
