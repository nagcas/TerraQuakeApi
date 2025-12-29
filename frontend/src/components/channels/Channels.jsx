import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

export default function Channels() {
  const { t } = useTranslation('translation');

  const contactInfo = [
    {
      icon: <FiGithub className='w-6 h-6' />,
      title: t('channels.title_github'),
      detail: 'github.com/terraquake-api',
      href: 'https://github.com/nagcas/TerraQuakeApi',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      icon: <FaXTwitter className='text-2xl' />, 
      title: t('channels.title_x'),
      detail: 'x.com/nagcas',
      href: 'https://x.com/nagcas',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      icon: <FaLinkedin className='text-2xl' />,
      title: t('channels.title_linkedin'),
      detail: 'in/gianluca-chiaravalloti-5694081a2',
      href: 'https://www.linkedin.com/in/gianluca-chiaravalloti-5694081a2/',
      target: '_blank',
      rel: 'noopener noreferrer',
    }
  ];

  return (
    <motion.div
      className='lg:col-span-1 p-8 md:p-12 bg-purple-600/10 border-2 border-purple-500/30 rounded-3xl shadow-inner-xl flex flex-col justify-between'
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div>
        <h2 className='text-3xl font-bold text-purple-400 mb-6'>
          {t('channels.title')}
        </h2>
        <p className='text-white/80 mb-8'>
          {t('channels.description')}
        </p>

        <div className='space-y-6'>
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target={item.target}
              className='flex items-start p-4 bg-gray-900/40 rounded-xl hover:bg-gray-700/50 transition duration-200 group'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <div className='text-purple-400 group-hover:text-pink-400 transition-colors mr-4 mt-1'>
                {item.icon}
              </div>
              <div>
                <p className='text-lg font-semibold text-white group-hover:underline'>
                  {item.title}
                </p>
                <p className='text-sm text-white/60'>{item.detail}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Optional: Add a subtle logo or API tagline here */}
      <div className='mt-10 pt-6 border-t border-purple-500/50'>
        <p className='text-sm text-white/50 italic'>
          {t('channels.powered')}
        </p>
      </div>
    </motion.div>
  );
}
