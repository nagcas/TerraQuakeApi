import { useTranslation } from "react-i18next";

export default function ParametersEarthquakes() {
  const { t } = useTranslation('translation');
  
  return (
    <>
      {/* Query Parameters Earthquakes */}
      <div className='mb-14'>
        <h2 className='text-2xl font-bold text-white mb-4'>
          {t('api_access.title_parameters_earthquakes')}
        </h2>
        <p className='text-white/70 mb-4'>
          {t('api_access.description_parameters_earthquakes')}
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
                <td className='px-4 py-3'>{t('api_access.page')}</td>
                <td>{t('api_access.integer')}</td>
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
                <td className='px-4 py-3'>year</td>
                <td>integer</td>
                <td>{t('api_access.info_year')}</td>
                <td>?year=2025</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>month</td>
                <td>integer</td>
                <td>{t('api_access.info_month')}</td>
                <td>?month=9</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>startdate</td>
                <td>string (YYYY-MM-DD)</td>
                <td>{t('api_access.info_startdate')}</td>
                <td>?startdate=2025-09-01</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>enddate</td>
                <td>string (YYYY-MM-DD)</td>
                <td>{t('api_access.info_enddate')}</td>
                <td>?enddate=2025-09-30</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>latitude</td>
                <td>float</td>
                <td>{t('api_access.info_latitude')}</td>
                <td>?latitude=35.6762</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>longitude</td>
                <td>float</td>
                <td>{t('api_access.info_longitude')}</td>
                <td>?longitude=139.6503</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>radius</td>
                <td>integer</td>
                <td>{t('api_access.info_radius')}</td>
                <td>?radius=500</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>region</td>
                <td>string</td>
                <td>{t('api_access.info_region')}</td>
                <td>?region=Sicilia</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>depth</td>
                <td>integer</td>
                <td>{t('api_access.info_depth')}</td>
                <td>?depth=70</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>mag</td>
                <td>float</td>
                <td>{t('api_access.info_mag')}</td>
                <td>?mag=4.5</td>
              </tr>
              <tr>
                <td className='px-4 py-3'>eventId</td>
                <td>integer</td>
                <td>{t('api_access.info_eventid')}</td>
                <td>?eventId=44278572</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
