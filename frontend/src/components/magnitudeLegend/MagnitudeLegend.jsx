import { useTranslation } from "react-i18next";

export default function MagnitudeLegend() {
  const { t } = useTranslation('translation');

  const legendData = [
    {
      code: 'ML',
      name: t('legend.name_ml'),
      description: t('legend.description_ml'),
      range: t('legend.range_ml'),
      notes: t('legend.notes_ml'),
    },
    {
      code: 'MW',
      name: t('legend.name_mw'),
      description: t('legend.description_mw'),
      range: t('legend.range_mw'),
      notes: t('legend.notes_mw'),
    },
    {
      code: 'MB',
      name: t('legend.name_mb'),
      description: t('legend.description_mb'),
      range: t('legend.range_mb'),
      notes: t('legend.notes_mb'),
    },
    {
      code: 'MS',
      name: t('legend.name_ms'),
      description: t('legend.description_ms'),
      range: t('legend.range_ms'),
      notes: t('legend.notes_ms'),
    },
    {
      code: 'MD',
      name: t('legend.name_md'),
      description: t('legend.description_md'),
      range: t('legend.range_md'),
      notes: t('legend.notes_md'),
    },
    {
      code: 'ME',
      name: t('legend.name_me'),
      description: t('legend.description_me'),
      range: t('legend.range_me'),
      notes: t('legend.notes_me'),
    },
    {
      code: 'MI',
      name: t('legend.name_mi'),
      description: t('legend.description_mi'),
      range: t('legend.range_mi'),
      notes: t('legend.notes_mi'),
    },
    {
      code: 'MWD',
      name: t('legend.name_mwd'),
      description: t('legend.description_mwd'),
      range: t('legend.range_mwd'),
      notes: t('legend.notes_mwd'),
    },
  ];

  return (
    <section className='overflow-x-auto border border-white/5 bg-white/[0.03] bg-opacity-50 rounded-lg'>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-sm text-gray-200 border-collapse rounded-lg'>
          <thead>
            <tr className='bg-purple-500/20 text-purple-300 uppercase text-xs tracking-wider'>
              <th className='py-3 px-4 text-left'>
                {t('legend.list_code')}
              </th>
              <th className='py-3 px-4 text-left'>
                {t('legend.list_full_name')}
              </th>
              <th className='py-3 px-4 text-left'>
                {t('legend.list_description')}
              </th>
              <th className='py-3 px-4 text-left'>
                {t('legend.list_typical_range')}
              </th>
              <th className='py-3 px-4 text-left'>
                {t('legend.list_notes')}
              </th>
            </tr>
          </thead>
          <tbody>
            {legendData.map((item, index) => (
              <tr
                key={item.code}
                className={`${
                  index % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-900/30'
                } hover:bg-purple-500/10 transition-colors`}
              >
                <td className='py-3 px-4 font-bold text-purple-400'>
                  {item.code}
                </td>
                <td className='py-3 px-4'>{item.name}</td>
                <td className='py-3 px-4'>{item.description}</td>
                <td className='py-3 px-4 text-center'>{item.range}</td>
                <td className='py-3 px-4'>{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
