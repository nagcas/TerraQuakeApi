import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaDiscord,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaReddit,
  FaMedium,
  FaTelegram,
} from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Docs', path: '/docs' },
    { title: 'Contribute', path: '/contribute' },
  ];

  const resourceLinks = [
    { title: 'GitHub', url: 'https://github.com/nagcas/TerraQuakeApi' },
  ];

  const moreLinks = [
    { title: 'FAQ', path: '/faq' },
    { title: 'Contact', path: '/contact' },
    { title: 'Terms & Conditions', path: '/terms-and-conditions' },
    { title: 'Privacy Policy', path: '/privacy-policy' },
  ];

  const socials = [
    {
      title: 'X / Twitter',
      url: 'https://x.com/nagcas/',
      icon: <FaXTwitter className='text-2xl' />,
    },
    {
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/gianluca-chiaravalloti-5694081a2/',
      icon: <FaLinkedin className='text-2xl' />,
    },
    {
      title: 'GitHub',
      url: 'https://github.com/nagcas/',
      icon: <FaGithub className='text-2xl' />,
    },
    {
      title: 'Discord',
      url: 'https://discord.gg/RDBp8KJB',
      icon: <FaDiscord className='text-2xl' />,
    },
    {
      title: 'YouTube',
      url: 'https://www.youtube.com/@TerraQuakeAPI',
      icon: <FaYoutube className='text-2xl' />,
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/',
      icon: <FaInstagram className='text-2xl' />,
    },
    {
      title: 'Facebook',
      url: 'https://www.facebook.com/',
      icon: <FaFacebook className='text-2xl' />,
    },
    {
      title: 'Reddit',
      url: 'https://www.reddit.com/',
      icon: <FaReddit className='text-2xl' />,
    },
    {
      title: 'Medium',
      url: 'https://medium.com/',
      icon: <FaMedium className='text-2xl' />,
    },
    {
      title: 'Telegram',
      url: 'https://t.me/',
      icon: <FaTelegram className='text-2xl' />,
    },
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
            Open-source project providing reliable earthquake data for
            developers, researchers, and communities.
          </p>
        </div>

        {/* Navigation Links */}
        <nav aria-label='Footer navigation'>
          <h3 className='text-white font-semibold mb-3 text-center'>
            Navigation
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
            Resources
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
        <div>
          <h3 className='text-white font-semibold mb-6 text-lg after:content-[""] after:block after:max-w-1/3 after:h-[2px] after:bg-violet-500 after:mt-2 after:mx-auto'>
            Community & Socials
          </h3>
          <div className='flex flex-wrap justify-center md:justify-start gap-4'>
            {socials.map((item) => (
              <motion.a
                key={item.title}
                href={item.url}
                target='_blank'
                whileHover={{ scale: 1.2, y: -3 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className='hover:text-violet-400 transition duration-300 text-slate-400'
                aria-label={`Visit the TerraQuake API ${item.title} profile`}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright + Extended License */}
      <div className='relative border-t border-white/10 mt-10 pt-6 px-6 text-center text-sm text-slate-400 space-y-4'>
        <p>
          &copy; {new Date().getFullYear()} TerraQuake API · All rights reserved
        </p>
        <p className='max-w-3xl mx-auto leading-relaxed px-4'>
          TerraQuake API is free software: you can redistribute it and/or modify
          it under the terms of the{' '}
          <a
            href='https://www.gnu.org/licenses/agpl-3.0.html'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-violet-400 transition duration-200'
            aria-label='Visit the TerraQuake API licence'
          >
            GNU Affero General Public License
          </a>{' '}
          as published by the Free Software Foundation, either version 3 of the
          License, or (at your option) any later version.
        </p>
      </div>

      <div className='absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 opacity-70 blur-sm'></div>
    </footer>
  );
}
