import { useNavigate } from 'react-router-dom';
import JsonApi2 from '@images/json-api-2.png';
import { useContext, useState } from 'react';
import { Context } from '../modules/context';
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
      `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      'translate(0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)'
    );
  };

  return (
    <>
      {/* Background Gradient/Mesh (for a classy, dark theme) */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
      </div>
      <section className='relative z-30 w-full min-h-screen flex flex-col gap-10 lg:flex-row justify-center items-center text-center px-6 py-20 text-white animate-fadeIn'>
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='flex flex-col max-w-2xl gap-6 animate-blob animation-delay-2000'
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className='text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-white/80'
          >
            Practice with Real Seismic Data
          </motion.h1>

          <p className='text-lg md:text-lg text-gray-300'>
            A training and experimentation environment powered by real seismic
            events from official sources. Perfect for students, developers, and
            technicians looking to learn by working with real-world data.
          </p>

          {/* Button */}
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
              onClick={() => navigate('/explore-data')}
            >
              Explore Seismic Events
            </button>
          </motion.div>
        </motion.div>

        {/* Image Hero */}
        <div
          className='flex justify-center items-center mt-10 lg:mt-0'
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '1000px' }}
        >
          <img
            src={JsonApi2}
            alt='Image json api postman'
            style={{ transform: transformStyle }}
            className='border border-gray-600 p-2 rounded-2xl max-w-[840px] w-full h-auto shadow-2xl filter brightness-120 contrast-160 transition-transform duration-300 ease-out'
          />
        </div>
      </section>
    </>
  );
}
