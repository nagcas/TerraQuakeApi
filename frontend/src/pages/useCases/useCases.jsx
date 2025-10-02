import { useState } from "react";
import MetaData from "@pages/noPage/metaData";
import { FiChevronDown } from "react-icons/fi";

export default function UseCases() {
  const useCaseDocs = [
    {
      title: "Introduction",
      content:
        "This section describes the real-world applications of TerraQuake API. Here is what it does:",
      points: [
        "Open to developers, researchers, and organizations.",
        "Enables building applications for earthquake early warning systems.",
        "Supports educational tools to teach about seismic activity.",
        "Helps monitor infrastructure and safety in real-time.",
        "Assists in disaster prevention and preparedness planning.",
      ],
    },
    {
      title: "Scientific Research Applications",
      content:
        "This section describes how TerraQuakeAPI can be leveraged for scientific research in seismology and related fields. Here is what it enables researchers to do -",
      points: [
        "Monitor seismic patterns and trends in real-time for academic and applied research.",
        "Conduct studies on earthquake probability, frequency, and impact modeling.",
        "Integrate data seamlessly with analytical tools like MATLAB, Python, and R for deeper analysis.",
        "Support thesis projects, publications, and research reports on seismic activity.",
        "Assist in modeling and simulation of earthquake scenarios for research purposes.",
      ],
    },
    {
      title: "Government & Policy Making",
      content:
        "Governments and policymakers can leverage TerraQuake API to ensure safety, compliance, and better disaster response:",
      points: [
        "Develop public dashboards for earthquake activity and alerts.",
        "Enable national disaster management agencies to make faster, data-driven decisions.",
        "Assist in zoning and land-use policies with earthquake risk maps.",
        "Provide transparency through open data access for citizens.",
        "Support law enforcement and emergency protocols in high-risk areas.",
      ],
    },
    {
      title: "Educational Platforms",
      content:
        "The API can help build interactive and engaging learning tools for schools, universities, and online platforms:",
      points: [
        "Create simulations that demonstrate seismic waves and fault lines.",
        "Enable students to track live earthquake activity globally.",
        "Integrate into e-learning platforms to teach natural disaster management.",
        "Provide datasets for academic assignments and experiments.",
        "Gamify seismic learning with quizzes and real-time earthquake data.",
      ],
    },
    {
      title: "Smart Cities & Infrastructure Monitoring",
      content:
        "TerraQuake API can be integrated with IoT and smart city applications to improve safety and infrastructure resilience:",
      points: [
        "Enable smart building systems to react automatically to seismic activity (e.g., shut off gas lines).",
        "Provide city planners with long-term seismic trend insights.",
        "Integrate with traffic and transport systems for emergency rerouting.",
        "Assist in monitoring structural health of bridges, tunnels, and skyscrapers.",
        "Support smart city resilience planning against natural disasters.",
      ],
    },
    {
      title: "Insurance & Risk Management",
      content:
        "Insurance companies and financial institutions can benefit from seismic data for better planning and claims processing:",
      points: [
        "Assess risk exposure for properties and infrastructure in earthquake-prone areas.",
        "Enable dynamic adjustment of insurance policies based on seismic activity.",
        "Provide real-time alerts for faster claim validation after earthquakes.",
        "Assist in financial forecasting related to natural disaster damages.",
        "Support predictive models to minimize long-term financial risks.",
      ],
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // track hover index separately so hover opens on desktop and doesn't
  // interfere with click/touch behavior (which sets expandedIndex)
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleMouseEnter = (index) => {
    // only apply hover for non-touch devices; touch will still use click
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <>
      <MetaData title="Use Cases" description="Use Cases for TerraQuake API" />
      <section className="relative z-30 w-full min-h-screen px-6 py-20">
        {/* Page header */}
        <div className="flex flex-col justify-center items-center mb-16">
          <h1 className="text-2xl md:text-4xl text-white font-extrabold text-center my-25 tracking-tight">
            Use Cases for TerraQuake API
          </h1>

          <p className="text-white text-lg w-[95%] lg:w-6xl">
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
              className="w-[95%] lg:w-6xl mb-6 bg-gradient-to-br from-white/5 to-violet-950/10 border border-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              onClick={() => toggleExpand(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold text-white border-l-4 border-purple-600 pl-4">
                  {item.title}
                </h2>
                <FiChevronDown
                  className={`text-white text-2xl transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-180" : ""

                  }`}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ${

                  expandedIndex === index ? "max-h-96 mt-4" : "max-h-0"

                }`}
              >
                <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-1">
                  {item.content}
                </p>
                <ul className="text-gray-300 leading-relaxed text-sm md:text-base list-disc list-inside pl-4">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="mb-1">
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
