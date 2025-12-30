import MetaData from '@pages/noPage/MetaData';
import { TbError404 } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NoPage() {
  const { t } = useTranslation('translation');

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='404 Not Found | TerraQuake API'
        description='The page you are looking for does not exist on TerraQuake API. Check the URL or return to the homepage to explore real-time earthquake data and seismic insights.'
        ogTitle='404 Not Found | TerraQuake API'
        ogDescription='Oops! The page you are trying to reach is not available. Return to TerraQuake API to access real-time earthquake monitoring and seismic data.'
        twitterTitle='404 Not Found | TerraQuake API'
        twitterDescription='Page not found. Explore TerraQuake API for live earthquake data and seismic research.'
        keywords='404, page not found, TerraQuake API, earthquake monitoring, seismic data'
      />
      {/* SEO Stuff */}

      <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b text-white'>
        <TbError404 className='text-9xl text-purple-600' />
        <h1 className='text-3xl md:text-6xl lg:text-9xl mx-auto font-extrabold leading-tight mt-[50px] select-none'>
          Page Not Found
        </h1>
        <p className='mt-6 mx-auto md:text-xl text-gray-300'>
          {t('no_page.description')}
        </p>
        <NavLink
          to='/'
          className='text-white hover:text-purple-600 transition-colors duration-200 mt-30'
          aria-label='Navigate to home page'
        >
          {t('no_page.back_to_home')}
        </NavLink>
      </section>
    </>
  );
}
