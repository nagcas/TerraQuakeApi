import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import Socials from '../socials/Socials';
import Copyright from '../copyright/Copyright';
import VersionAPI from '../utils/VersionAPI';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('translation');

  const navLinks = [
    { title: t('footer.title_navlinks_home'), path: '/' },
    { title: t('footer.title_navlinks_about'), path: '/about' },
    { title: t('footer.title_navlinks_earthquakes'), path: '/docs-earthquakes' },
    { title: t('footer.title_navlinks_stations'), path: '/docs-stations' },
    { title: t('footer.title_navlinks_contribute'), path: '/contribute' },
  ];

  const resourceLinks = [
    { title: 'GitHub', url: 'https://github.com/nagcas/TerraQuakeApi' },
  ];

  const moreLinks = [
    { title: t('footer.title_morelinks_faq'), path: '/faq' },
    { title: t('footer.title_morelinks_contact'), path: '/contact' },
    { title: t('footer.title_morelinks_terms'), path: '/terms-and-conditions' },
    { title: t('footer.title_morelinks_privacy'), path: '/privacy-policy' },
  ];

  return (
    <footer className='relative bg-gradient-to-b from-[#140b2b] via-[#0c091a] to-black text-slate-300 py-14 text-center overflow-hidden'>
      {/* Background gradient glow */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent)] pointer-events-none'></div>

      <div className='relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {/* Logo + Description */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl font-bold text-white mb-3 tracking-tight'
          >
            TerraQuake <span className='text-violet-400'>API</span>
          </motion.h2>
          <p className='text-sm leading-relaxed text-slate-400'>
            {t('footer.description')}
          </p>
        </div>

        {/* Navigation Links */}
        <nav aria-label='Footer navigation'>
          <h3 className='text-white font-semibold mb-3 text-center'>
            {t('footer.navigation')}
          </h3>
          <ul className='flex flex-col gap-2 text-sm text-center'>
            {navLinks.map((link) => (
              <li key={link.title}>
                <NavLink
                  to={link.path}
                  className='hover:text-violet-400 transition'
                  aria-label={`Visit TerraQuake API ${link.title}`}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resources */}
        <div>
          <h3 className='text-white font-semibold mb-3 text-center'>
            {t('footer.resources')}
          </h3>
          <ul className='space-y-2 text-sm text-center'>
            {resourceLinks.map((link) => (
              <li key={link.title}>
                <a
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-violet-400 transition'
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
          <ul className='mt-2 flex flex-col gap-2 text-sm text-center'>
            {moreLinks.map((link) => (
              <li key={link.title}>
                <NavLink
                  to={link.path}
                  className='hover:text-violet-400 transition'
                  aria-label={`Visit TerraQuake API ${link.title}`}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Social / Sponsor */}
        <Socials />

      </div>
      
      {/* Version API */}
      <VersionAPI />

      {/* Copyright + Extended License */}
      <Copyright />

      <div className='absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 opacity-70 blur-sm'></div>
    </footer>
  );
}
