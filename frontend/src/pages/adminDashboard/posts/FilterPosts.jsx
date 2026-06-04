import { useTranslation } from 'react-i18next';

export default function FilterPosts({ search, setSearch }) {
  const { t } = useTranslation('translation');

  return (
    <input
      type="text"
      placeholder={t('table_posts.search')}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className='w-2/3 p-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
    />
  );
}
