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

export default function Footer() {
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
    <footer className='relative bg-gradient-to-b from-[#140b2b] via-[#0c091a] to-black text-slate-300 py-14 mt-20 text-center overflow-hidden'>
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

        {/* Navigation Link */}
        <div>
          <h3 className='text-white font-semibold mb-3 text-lg'>Navigation</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a
                href='/'
                className='hover:text-violet-400 transition duration-200'
                aria-label='Navigate to homepage'
              >
                Home
              </a>
            </li>
            <li>
              <a
                href='/about'
                className='hover:text-violet-400 transition duration-200'
                aria-label='Navigate to about page'
              >
                About
              </a>
            </li>
            <li>
              <a
                href='/docs'
                className='hover:text-violet-400 transition duration-200'
                aria-label='Navigate to docs page'
              >
                Docs
              </a>
            </li>
            <li>
              <a
                href='/contribute'
                className='hover:text-violet-400 transition duration-200'
                aria-label='Navigate to contribute page'
              >
                Contribute
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className='text-white font-semibold mb-3 text-lg'>Resources</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a
                href='https://github.com/nagcas/TerraQuakeApi'
                target='_blank'
                className='hover:text-violet-400 transition duration-200'
                aria-label='Visit the TerraQuake API GitHub repository'
              >
                GitHub Repository
              </a>
            </li>
            <li>
              <a
                href='/faq'
                className='hover:text-violet-400 transition duration-200'
                aria-label='Navigate to faq page'
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href='/contact'
                className='hover:text-violet-400 transition duration-200'
                aria-label='Navigate to contact page'
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href='/terms-and-conditions'
                className='hover:text-violet-400 transition duration-200'
                aria-label='Navigate to terms and conditions page'
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href='/privacy-policy'
                className='hover:text-violet-400 transition duration-200'
                aria-label='Navigate to privacy policy page'
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social / Sponsor */}
        <div>
          <h3 className='text-white font-semibold mb-6 text-lg after:content-[""] after:block after:w-10 after:h-[2px] after:bg-violet-500 after:mt-2 after:mx-auto sm:after:mx-0'>
            Community & Socials
          </h3>
          <div className='flex flex-wrap justify-center sm:justify-start gap-4'>
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
