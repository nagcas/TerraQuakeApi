import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';

export default function CodeSnippet({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <div className='relative group'>
      <button
        onClick={handleCopy}
        aria-label='Copy code snippet'
        className='absolute top-3 right-14 z-10 flex items-center gap-2 rounded-md px-2 py-1 text-xs bg-white/5 text-gray-300 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 cursor-pointer'
      >
        <FiCopy size={14} />
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className='p-4 rounded-xl border border-white/10 bg-black/20 text-sm text-white/90 shadow-lg w-full overflow-x-auto'>
        <code
          className={`language-${language} whitespace-pre-wrap break-words`}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
