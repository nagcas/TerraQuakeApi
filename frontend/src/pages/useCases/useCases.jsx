import { useState } from "react";
import MetaData from "@pages/noPage/metaData";
import { FiChevronDown } from "react-icons/fi";

export default function UseCases() {
  const useCaseDocs = [
    {
      id: "introduction",
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
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <MetaData
        title="Use Cases - TerraQuake API"
        description="Explore real-world applications of TerraQuake API for developers, researchers, and organizations."
        keywords="TerraQuake API, earthquake monitoring, seismic data, early warning systems, disaster prevention"
      />

      <section className="relative z-30 w-full min-h-screen px-6 py-20">
        {/* Page header */}
        <div className="flex flex-col justify-center items-center mb-16 text-center">
          <h1 className="text-2xl md:text-4xl text-white font-extrabold tracking-tight">
            Use Cases for TerraQuake API
          </h1>
          <p className="text-white text-lg w-[95%] lg:w-6xl mt-4">
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
              key={item.id}
              className="w-[95%] lg:w-6xl mb-6 bg-gradient-to-br from-white/5 to-violet-950/10 border border-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white border-l-4 border-purple-600 pl-4">
                <button
                  type="button"
                  className="flex justify-between items-center w-full p-4 md:p-6 cursor-pointer"
                  aria-expanded={expandedIndex === index}
                  aria-controls={`content-${item.id}`}
                  onClick={() => toggleExpand(index)}
                  onKeyDown={(e) => e.key === "Enter" && toggleExpand(index)}
                >
                  <span className="text-left">{item.title}</span>
                  <FiChevronDown
                    className={`text-white text-2xl transition-transform duration-300 min-w-fit ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                    role="img"
                    aria-label={
                      expandedIndex === index
                        ? "Collapse section"
                        : "Expand section"
                    }
                  />
                </button>
              </h2>

              <div
                id={`content-${item.id}`}
                className={`overflow-hidden transition-[max-height,padding] duration-500 ease-in-out ${
                  expandedIndex === index
                    ? "max-h-[500px] p-4 md:p-6 pt-0"
                    : "max-h-0"
                }`}
              >
                <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
                  {item.content}
                </p>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  Key Applications
                </h3>
                <ul className="text-gray-300 leading-relaxed text-sm md:text-base list-disc list-inside space-y-1">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
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
