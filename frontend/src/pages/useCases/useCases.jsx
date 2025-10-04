import React, { useState} from 'react';
import MetaData from '@pages/noPage/metaData';
import { motion} from 'framer-motion';
import { useCaseDocs } from '@/data/USE_CASE_DOCS';
import AccordionItem from '@/utils/useCases/AccordionItem';


export default function UseCases() {
  const [expandedIndex, setExpandedIndex] = useState(0); 

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <MetaData
        title="Use Cases"
        description="Explore real-world applications and interactive examples for the TerraQuake API."
      />
      <section className="relative z-10 w-full min-h-screen px-4 sm:px-6 py-20 bg-[#080810] text-white">
        <div className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-purple-800 to-pink-700 rounded-full blur-3xl" />
        </div>

        <div className="relative z-20 flex flex-col justify-center items-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center tracking-tight mb-4 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            TerraQuake API Use Cases
          </h1>
          <div className="h-1 w-48 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto my-4 rounded-full" />
          <p className="mt-6 text-gray-300 text-center text-lg max-w-3xl">
            Explore real-world scenarios powered by our API. Run live requests and copy code snippets to get started instantly.
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