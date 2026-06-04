import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaShare } from 'react-icons/fa6';

export default function SharePost({ posts }) {
  const { t } = useTranslation('translation');

  const handleShare = async () => {
    const cleanText = posts.content.replace(/<[^>]*>/g, '');
    const shareData = {
      title: posts.title,
      text: `${cleanText}...`,
      author: posts.author.name,
      url: `${window.location.origin}/blog/${posts.slug}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('Post shared successfully!');
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copia URL e titolo nel clipboard
      const fallbackText = `${posts.title}\n${cleanText}\n${shareData.url}`;
      try {
        await navigator.clipboard.writeText(fallbackText);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  return (
    <>
      {/* Category and Share */}
      <button
        onClick={handleShare}
        className='px-2 py-1 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl hover:scale-[1.02] hover:bg-purple-400 transition-all duration-300 cursor-pointer'
        title={t('share_post.confirm_button')}
      >
        <FaShare />
      </button>
    </>
  );
}
