import { useTranslation } from "react-i18next";

export default function EndpointEarthquakes() {
  const { t } = useTranslation('translation');
  return (
    <>
      {/* Endpoint Earthquakes List / Table */}
      <div className='mb-14'>
        <h2 className='text-2xl font-bold text-white mb-4'>
          {t('api_access.endpoints_earthquakes')}
        </h2>
        <p className='text-white/70 mb-4'>
          {t('api_access.endpoints_support')} <code>page</code>{' '}
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
                <td>/v1/earthquakes/recent</td>
                <td>{t('api_access.endpoint_recent')}</td>
                <td>page, limit</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/earthquakes/today</td>
                <td>{t('api_access.endpoint_today')}</td>
                <td>page, limit</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/earthquakes/last-week</td>
                <td>{t('api_access.endpoint_last_week')}</td>
                <td>page, limit</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/earthquakes/month</td>
                <td>{t('api_access.endpoint_month')}</td>
                <td>
                  year* {t('api_access.required')}, month*{' '}
                  {t('api_access.required')}, page, limit
                </td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/earthquakes/location</td>
                <td>{t('api_access.endpoint_location')}</td>
                <td>
                  latitude* {t('api_access.required')}, longitude*{' '}
                  {t('api_access.required')}, radius, page, limit
                </td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/earthquakes/region</td>
                <td>{t('api_access.endpoint_region')} </td>
                <td>region* {t('api_access.required')}, page, limit</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/earthquakes/depth</td>
                <td>{t('api_access.endpoint_depth')}</td>
                <td>depth* {t('api_access.required')}, page, limit</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/earthquakes/range-time</td>
                <td>{t('api_access.endpoint_range_time')}</td>
                <td>
                  startdate* {t('api_access.required')} , enddate*{' '}
                  {t('api_access.required')} , page, limit
                </td>
              </tr>
              <tr>
                <td className='px-4 py-3'>GET</td>
                <td>/v1/earthquakes/eventId</td>
                <td>{t('api_access.endpoint_eventid')}</td>
                <td>eventId* {t('api_access.required')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
