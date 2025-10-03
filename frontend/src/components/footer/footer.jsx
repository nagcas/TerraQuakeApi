import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaDiscord,
  FaYoutube,
} from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

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
  ];

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Docs', path: '/docs' },
    { title: 'FAQ', path: '/faq' },
    { title: 'About', path: '/about' },
    { title: 'Contribute', path: '/contribute' },
  ];

  const resourceLinks = [
    { title: 'Terms & Conditions', path: '/terms-and-conditions' },
    { title: 'Privacy Policy', path: '/privacy-policy' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <footer className='bg-gradient-to-b from-violet-950 to-black text-slate-300 py-10 text-center'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {/* Logo + Description */}
        <div>
          <NavLink
            className='text-3xl font-bold text-white'
            aria-label='Visit TerraQuake API home'
            to={'/'}
          >
            TerraQuake API
            <div className='h-1 w-2/4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto rounded-full' />
          </NavLink>
          <p className='text-sm leading-relaxed mt-4'>
            Open-source project providing reliable earthquake data for
            developers, researchers, and communities.
          </p>
        </div>

        {/* Navigation */}
        <section>
          <h3 className='text-white font-semibold mb-3 text-center'>
            Navigation
          </h3>
          <div className='flex flex-col gap-2 text-sm text-center'>
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                className='hover:text-violet-400 transition'
                aria-label={`Visit TerraQuake API ${link.title}`}
                to={link.path}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section>
          <h3 className='text-white font-semibold mb-3 text-center'>
            Resources
          </h3>
          <div className='flex flex-col gap-2 text-sm text-center'>
            {resourceLinks.map((link) => (
              <NavLink
                key={link.title}
                className='hover:text-violet-400 transition'
                aria-label={`Visit TerraQuake API ${link.title}`}
                to={link.path}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
        </section>

        {/* Social Media */}
        <section>
          <h3 className='text-white font-semibold mb-3 text-center'>
            Community & Socials
          </h3>
          <div className='flex justify-center space-x-4'>
            {socials.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Visit TerraQuake API ${item.title} profile`}
                className='hover:text-violet-400 transition'
              >
                {item.icon}
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Copyright */}
      <div className='border-t border-white/10 mt-10 pt-6 px-6 text-center text-sm text-slate-400 space-y-4'>
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
            className='hover:text-violet-400 transition'
          >
            GNU Affero General Public License
          </a>
          , either version 3 of the License, or (at your option) any later
          version.
        </p>
      </div>
    </footer>
  );
}
