import { useNavigate } from 'react-router-dom';
import JsonApi2 from '@images/json-api-2.png';
import { useContext, useState } from 'react';
import { Context } from '../modules/Context';
import { motion } from 'framer-motion';

export default function Hero() {
  const { isLoggedIn } = useContext(Context);
  const navigate = useNavigate();

  const [transformStyle, setTransformStyle] = useState(
    'translate(0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)'
  );

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, currentTarget } = e.nativeEvent;
    const { clientWidth, clientHeight } = currentTarget;

    const xRatio = offsetX / clientWidth - 0.5;
    const yRatio = offsetY / clientHeight - 0.5;

    const translateX = xRatio * 20;
    const translateY = yRatio * 20;
    const rotateX = -yRatio * 15;
    const rotateY = xRatio * 15;

    setTransformStyle(
      `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      'translate(0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)'
    );
  };

  return (
    <>
      <section className='relative z-30 w-full min-h-screen flex flex-col xl:flex-row gap-10 justify-center items-center text-center px-6 lg:px-32 py-20 text-white animate-fadeIn'>
        {/* Background Gradient / Mesh */}
        <div className='absolute inset-0 z-0 overflow-hidden'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
        </div>
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='flex flex-col max-w-2xl gap-6 relative z-10'
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className='text-5xl md:text-7xl font-extrabold leading-tight bg-clip-text text-white/80'
          >
            Practice with Real Seismic Data
          </motion.h1>

          <p className='text-lg md:text-lg text-gray-300'>
            A training and experimentation environment powered by real seismic
            events from official sources. Perfect for students, developers, and
            technicians looking to learn by working with real-world data.
          </p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className='flex flex-col md:flex-row justify-center items-center gap-6 mt-4'
          >
            {!isLoggedIn && (
              <button
                className='bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer'
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            )}
            <button
              className='border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer'
              onClick={() => navigate('/explore-data/earthquakes')}
            >
              Explore Seismic Events
            </button>
          </motion.div>
        </motion.div>

        {/* Image Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className='flex justify-center items-center mt-10 lg:mt-0 max-w-[640px] md:max-w-[800px] w-full mx-auto'
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '1000px' }}
        >
          <img
            src={JsonApi2}
            alt='TerraQuake API Hero Image'
            style={{ transform: transformStyle }}
            className='w-full p-4 h-auto rounded-2xl border border-gray-600 shadow-2xl transition-transform duration-300 ease-out object-contain filter brightness-110 contrast-160'
          />
        </motion.div>
      </section>
    </>
  );
}
