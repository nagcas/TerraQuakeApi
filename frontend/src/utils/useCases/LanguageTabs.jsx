import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeSnippet from '@/utils/useCases/CodeSnippet';

export default function LanguageTabs({ snippets }) {
  const [activeLang, setActiveLang] = useState(Object.keys(snippets)[0]);

  return (
    <div className='mt-6'>
      <div className='flex items-center space-x-2 border-b border-white/10'>
        {Object.keys(snippets).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            className='relative px-4 py-2 text-sm font-medium text-gray-300 transition hover:text-white cursor-pointer'
          >
            {activeLang === lang && (
              <motion.div
                layoutId='active-use-case-tab'
                className='absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-t-md border-b-2 border-purple-400'
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <span className='relative z-10'>{lang}</span>
          </button>
        ))}
      </div>
      <div className='mt-4'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeLang}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <CodeSnippet
              code={snippets[activeLang]}
              language={activeLang.toLowerCase()}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
