import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FilterUsers({ setSearch }) {
  const { t } = useTranslation('translation');

  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    const value = input.trim();

    if (!value) {
      setError(t('table_users.empty_search') || '');
      return;
    }

    setError('');
    setSearch(value);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder={error ? t('table_users.search_error') : t('table_users.search')}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError('');
          }}
          className={`w-2xl p-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500
          ${error
              ? 'border-red-400 ring-red-400'
              : 'border-gray-700' 
            }`}
        />
        <button
          onClick={handleSearch}
          className="py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer"
        >
          {t('table_users.button_search')}
        </button>
      </div>
    </div>
  );
}
