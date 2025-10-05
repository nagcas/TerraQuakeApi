import React, { useState } from "react";
import MetaData from "@pages/noPage/metaData";
import { motion } from "framer-motion";
import { useCaseDocs } from "@/data/USE_CASE_DOCS";
import AccordionItem from "@/utils/useCases/AccordionItem";

export default function UseCases() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title="Use Cases"
        description="Explore practical applications of TerraQuake API for earthquake monitoring, seismic data analysis, early warning systems, and disaster prevention — designed for developers, researchers, and organizations."
        ogTitle="Use Cases - TerraQuake API"
        ogDescription="Discover how developers, researchers, and organizations use TerraQuake API to monitor earthquakes, analyze seismic data, and improve disaster preparedness."
        twitterTitle="Use Cases - TerraQuake API"
        twitterDescription="Explore real-world applications of TerraQuake API for earthquake monitoring, seismic data, early warning systems, and disaster prevention."
        keywords="TerraQuake API, use cases, earthquake monitoring API, seismic data, early warning systems, disaster prevention"
      />
      {/* SEO Stuff */}

      <section className="relative z-30 w-full min-h-screen px-6 py-20">
        {/* Header Section */}
        <div className="flex flex-col justify-center items-center mb-16">
          <h1 className="text-3xl md:text-5xl text-white/80 font-extrabold text-center tracking-tight mb-4 animate-fade-in mt-12">
            Use Cases for TerraQuake API
            <div className="h-1 w-2/4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto my-2 rounded-full" />
          </h1>

          {/* Description */}
          <p className="mt-16 text-white text-center text-lg w-[95%] lg:w-6xl">
            Use Cases describe real-world scenarios where TerraQuake API can be
            applied. By providing fast, reliable access to seismic data, the API
            enables developers, researchers, institutions, and organizations to
            create applications focused on safety, monitoring, education, and
            disaster prevention.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="w-full mt-10 flex flex-col items-center space-y-6"
        >
          {useCaseDocs.map((item, index) => (
              <AccordionItem
                key={item.title}
                item={item}
                index={index}
                expandedIndex={expandedIndex}
                toggleExpand={toggleExpand}
              />
          ))}
        </motion.div>
      </section>
    </>
  );
}
