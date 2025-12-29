import { useTranslation } from 'react-i18next';

export default function ParametersStations() {
  const { t } = useTranslation('translation');

  return (
    <>
      {/* Query Parameters Stations */}
      <div className='mb-14'>
        <h2 className='text-2xl font-bold text-white mb-4'>
          {t('api_access.title_parameters_stations')}
        </h2>
        <p className='text-white/70 mb-4'>
          {t('api_access.description_parameters_stations')}
        </p>
        <div className='overflow-x-auto'>
          <table className='w-full text-left text-white/80 text-sm border border-white/10 rounded-xl overflow-hidden'>
            <thead className='bg-white/10 text-white'>
              <tr>
                <th className='px-4 py-3'>{t('api_access.list_parameter')}</th>
                <th className='px-4 py-3'>{t('api_access.list_type')}</th>
                <th className='px-4 py-3'>
                  {t('api_access.list_description')}
                </th>
                <th className='px-4 py-3'>{t('api_access.list_example')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-4 py-3'>page</td>
                <td>integer</td>
                <td>{t('api_access.info_page')}</td>
                <td>?page=2</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>limit</td>
                <td>integer</td>
                <td>{t('api_access.info_limit')}</td>
                <td>?limit=100</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>code</td>
                <td>string</td>
                <td>{t('api_access.info_code_station')}</td>
                <td>?code=acate</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
