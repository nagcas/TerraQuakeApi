import React, { useState, useEffect } from 'react';
import { FiChevronDown} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageTabs from './LanguageTabs';
import ApiPlayground from './ApiPlayground';

const AccordionItem = ({ item, index, expandedIndex, toggleExpand }) => {
  const isOpen = index === expandedIndex;

  const [showSnippets, setShowSnippets] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setShowSnippets(false);
    }
  }, [isOpen]);

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand(index);
    }
  };

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      className="w-full max-w-6xl bg-gradient-to-br from-white/[.03] to-purple-950/10 border border-white/10 backdrop-blur rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-purple-500/10"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => toggleExpand(index)}
        onKeyDown={handleKey}
        className="flex justify-between items-start gap-4 p-6 cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold text-white border-l-4 border-purple-500 pl-4">
            {item.title}
          </h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base pr-4">{item.content}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-white/80 mt-1"
        >
          <FiChevronDown size={24} />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 p-6">
              <ul className="text-gray-300 leading-relaxed text-sm list-disc list-inside space-y-2">
                {item.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
              <ApiPlayground url={item.exampleUrl} />
              <LanguageTabs snippets={item.snippets} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default AccordionItem;