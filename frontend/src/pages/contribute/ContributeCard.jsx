import { useState } from 'react';
import { motion } from 'framer-motion';

export function ContributionCard({ icon, title, description, link, linkText }) {
  const [transformStyle, setTransformStyle] = useState(
    'rotateX(0deg) rotateY(0deg) scale(1)'
  );

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    const rotateX = -y * 15;
    const rotateY = x * 15;
    setTransformStyle(
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle('rotateX(0deg) rotateY(0deg) scale(1)');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className='w-full'
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className='bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl h-full flex flex-col'
        style={{
          transform: transformStyle,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div className='mb-4 text-3xl bg-gradient-to-r from-pink-500 to-purple-500 text-white bg-clip-text w-fit'>
          {icon}
        </div>
        <h3 className='text-xl font-bold mb-3 text-gray-100'>{title}</h3>
        <p className='text-gray-400 mb-4 flex-grow'>{description}</p>
        <a
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block text-indigo-400 hover:text-indigo-300 transition-colors duration-200 font-semibold group'
        >
          {linkText}
          <span className='inline-block transition-transform duration-200 group-hover:translate-x-1'>
            {' '}
            &rarr;
          </span>
        </a>
      </motion.div>
    </motion.div>
  );
}
