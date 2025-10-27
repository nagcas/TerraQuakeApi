import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiGithub } from 'react-icons/fi';

export default function StarsGitHub() {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const urlGitHub = 'https://api.github.com/repos/nagcas/TerraQuakeApi';
    let mounted = true;
    axios
      .get(urlGitHub)
      .then(({ data }) => {
        if (mounted) setStars(data?.stargazers_count ?? 0);
      })
      .catch((err) => {
        console.error('GitHub stars fetch error', err?.message ?? err);
      });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div>
      <a
        href='https://github.com/nagcas/TerraQuakeApi'
        target='_blank'
        rel='noopener noreferrer'
        className='hidden lg:flex items-center gap-2 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-600/50 rounded-full px-3 py-1.5 shadow-lg transition-all hover:scale-105 hover:border-purple-500/50 transform duration-200'
      >
        <span className='flex items-center gap-1.5 text-gray-300 font-medium text-sm'>
          <FiGithub className='text-purple-400 text-lg' /> Stars
        </span>
        <span className='bg-purple-600 text-white font-semibold px-2 py-0.5 rounded-md shadow-md text-xs'>
          {stars}
        </span>
      </a>
    </div>
  );
}
