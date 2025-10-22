import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { motion } from 'framer-motion';

export default function Socials() {
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

  return (
    <section>
      <h3 className='text-white font-semibold mb-6 text-lg after:content-[""] after:block after:max-w-1/3 after:h-[2px] after:bg-violet-500 after:mt-1 after:mx-auto'>
        Community & Socials
      </h3>
      <div className='flex flex-wrap justify-center gap-4'>
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
    </section>
  );
}
