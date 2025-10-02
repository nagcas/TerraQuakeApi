import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaDiscord,
  FaYoutube,
} from 'react-icons/fa6';

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
      title: "Youtube",
      url: 'https://www.youtube.com/@TerraQuakeAPI',
      icon: <FaYoutube className='text-2xl' />
    }
  ];

  return (
    <footer className='bg-gradient-to-b from-violet-950 to-black text-slate-300 py-10 text-center'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-hidden'>
        {/* Logo + Description */}
        <div>
          <h2 className='text-2xl font-bold text-white mb-3'>TerraQuake API</h2>
          <p className='text-sm leading-relaxed'>
            Open-source project providing reliable earthquake data for
            developers, researchers, and communities.
          </p>
        </div>

          <div className='flex w-full gap-6'>
            <div className='flex-1'>
              <h3 className='text-white font-semibold mb-3 text-center'>Navigation</h3>
              <ul className='space-y-2 text-sm text-center'>
                <li><a href='/' className='hover:text-violet-400 transition'>Home</a></li>
                <li><a href='/about' className='hover:text-violet-400 transition'>About</a></li>
                <li><a href='/docs' className='hover:text-violet-400 transition'>Docs</a></li>
                <li><a href='/contribute' className='hover:text-violet-400 transition'>Contribute</a></li>
              </ul>
            </div>

            <div className='flex-1'>
              <h3 className='text-white font-semibold mb-3 text-center'>Resources</h3>
              <ul className='space-y-2 text-sm text-center'>
                <li><a href='https://github.com/nagcas/TerraQuakeApi' target='_blank' className='hover:text-violet-400 transition'>GitHub</a></li>
                <li><a href='/faq' className='hover:text-violet-400 transition'>FAQ</a></li>
                <li><a href='/contact' className='hover:text-violet-400 transition'>Contact</a></li>
                <li><a href='/privacy-policy' className='hover:text-violet-400 transition'>Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className='flex justify-center'>
            <div className='flex space-x-4'>
              {socials.map((item) => (
                <a key={item.title} href={item.url} target='_blank' rel='noopener noreferrer' className='text-slate-400 hover:text-white transition'>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop layout remains unchanged */}
        <div className='hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-hidden'>
          {/* Logo + Description */}
          <div>
            <h2 className='text-2xl font-bold text-white mb-3'>TerraQuake API</h2>
            <p className='text-sm leading-relaxed'>
              Open-source project providing reliable earthquake data for developers, researchers, and communities.
            </p>
          </div>

          {/* Navigation Link */}
          <div>
            <h3 className='text-white font-semibold mb-3 text-center'>Navigation</h3>
            <ul className='space-y-2 text-sm text-center'>
              <li><a href='/' className='hover:text-violet-400 transition'>Home</a></li>
              <li><a href='/about' className='hover:text-violet-400 transition'>About</a></li>
              <li><a href='/docs' className='hover:text-violet-400 transition'>Docs</a></li>
              <li><a href='/contribute' className='hover:text-violet-400 transition'>Contribute</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className='text-white font-semibold mb-3 text-center'>Resources</h3>
            <ul className='space-y-2 text-sm text-center'>
              <li><a href='https://github.com/nagcas/TerraQuakeApi' target='_blank' className='hover:text-violet-400 transition'>GitHub</a></li>
              <li><a href='/faq' className='hover:text-violet-400 transition'>FAQ</a></li>
              <li><a href='/contact' className='hover:text-violet-400 transition'>Contact</a></li>
              <li><a href='/privacy-policy' className='hover:text-violet-400 transition'>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social / Sponsor */}
          <div>
            <h3 className='text-white font-semibold mb-6'>Community & Socials</h3>
            <div className='flex space-x-4 justify-center'>
              {socials.map((item) => (
                <div key={item.title}>
                  <a href={item.url} target='_blank' className='hover:text-violet-400 transition' aria-label={`Visit the TerraQuake API ${item.title} profile`}>
                    {item.icon}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright + Extended License */}
      <div className='border-t border-white/10 mt-10 pt-6 px-6 text-center text-sm text-slate-400 space-y-4'>
        <p>&copy; {new Date().getFullYear()} TerraQuake API · All rights reserved</p>
        <p className='max-w-3xl mx-auto leading-relaxed px-4'>
          TerraQuake API is free software: you can redistribute it and/or modify
          it under the terms of the{' '}
          <a
            href='https://www.gnu.org/licenses/agpl-3.0.html'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-violet-400 transition'
            aria-label='Visit the TerraQuake API licence'
          >
            GNU Affero General Public License
          </a>{' '}
          as published by the Free Software Foundation, either version 3 of the
          License, or (at your option) any later version.
        </p>
      </div>
    </footer>
  );
}
