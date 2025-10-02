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
      title: "Civil Protection Applications",
      content:
        "This section describes how TerraQuakeAPI can be utilized by civil protection agencies to improve preparedness, response, and public safety. Here is what it enables authorities to do -",
      points: [
        "Receive real-time earthquake alerts to initiate rapid emergency response measures.",
        "Integrate live seismic data into dashboards for operators to monitor events and coordinate actions effectively.",
        "Use map-based visualizations to identify high-risk areas and prioritize resource deployment.",
        "Support early warning systems that notify communities and infrastructure operators.",
        "Enhance disaster planning, drills, and situational awareness for emergency teams.",
      ],
    },
    {
      title: "Smart Cities & Structural Monitoring",
      content:
        "This section highlights how TerraQuakeAPI can be applied by cities, urban planners, and engineers to enhance safety and resilience of infrastructure. Here is what it enables practitioners to do -",
      points: [
        "Integrate with IoT sensors (e.g., Arduino, Raspberry Pi) to collect and stream real-time seismic or structural data.",
        "Monitor the stability and integrity of buildings, bridges, and other critical infrastructure.",
        "Visualize seismic and structural data to identify vulnerabilities, track safety trends, and inform decision-making.",
        "Enable early alerts and risk assessments for city officials and engineers.",
        "Support long-term planning for safer urban development and disaster resilience.",
      ],
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
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
