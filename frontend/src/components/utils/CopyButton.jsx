import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function CopyButton({ text }) {
  const { t } = useTranslation('translation');

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button
      onClick={handleCopy}
      className='ml-2 text-xs px-2 py-1 rounded bg-white/6 hover:bg-white/10 transition text-white/80 cursor-pointer'
      aria-label='Copy code'
      type='button'
    >
      {copied ? 
        t('copy_button.copied') : 
        t('copy_button.copy')
      }
    </button>
  );
}