import { useTranslation } from 'react-i18next';

export default function EndpointStations() {
  const { t } = useTranslation('translation');

  return (
    <>
      {/* Endpoint Stations List / Table */}
      <div className='mb-14'>
        <h2 className='text-2xl font-bold text-white mb-4'>
          {t('api_access.title_endpoint_stations')}
        </h2>
        <p className='text-white/70 mb-4'>
          {t('api_access.endpoints_support_stations')} <code>page</code>{' '}
          {t('api_access.and')} <code>limit</code>.
        </p>

        <div className='overflow-x-auto'>
          <table className='w-full text-left text-white/80 text-sm border border-white/10 rounded-xl overflow-hidden'>
            <thead className='bg-white/10 text-white'>
              <tr>
                <th className='px-4 py-3'>{t('api_access.list_method')}</th>
                <th className='px-4 py-3'>{t('api_access.list_endpoint')}</th>
                <th className='px-4 py-3'>
                  {t('api_access.list_description')}
                </th>
                <th className='px-4 py-3'>{t('api_access.list_parameters')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/stations</td>
                <td>{t('api_access.info_stations')}</td>
                <td>page, limit</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/stations/code</td>
                <td>{t('api_access.info_code')}</td>
                <td>code* (required)</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/stations/geojson</td>
                <td>{t('api_access.info_geojson')}</td>
                <td>page, limit</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/stations/status/open</td>
                <td>{t('api_access.info_open')}</td>
                <td>page, limit</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/stations/status/closed</td>
                <td>{t('api_access.info_closed')}</td>
                <td>page, limit</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/stations/statistics</td>
                <td>{t('api_access.info_statistics')}</td>
                <td>{t('api_access.no_parameters')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
