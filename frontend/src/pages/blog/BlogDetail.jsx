import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, NavLink } from 'react-router-dom';
import MetaData from '@pages/noPage/MetaData';
import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaArrowLeft,
  FaShare,
  FaTag,
} from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import 'prismjs/themes/prism-tomorrow.css';
import BackToTopButton from '@/components/utils/BackToTopButton';
import Spinner from '@/components/spinner/Spinner';
import axios from '@config/Axios.js';
import Swal from 'sweetalert2';
import { formatDate } from '@/components/utils/FormatDate.js';
import { useTranslation } from 'react-i18next';

export default function BlogDetail() {
  const { t } = useTranslation('translation');

  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/posts/${slug}`, {
          headers: { 'Content-Type': 'application/json' },
        });

        const { payload } = response.data;

        setPost(payload);
        setRelatedPosts(payload);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Unable to load post. Please check your connection or try again later.';

        Swal.fire({
          title: 'Failed to Load Post',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });

        console.error(
          'Error fetching post:',
          error.response?.data || error.message
        );
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleShare = async () => {
    const cleanText = post.content.replace(/<[^>]*>/g, '');
    const shareData = {
      title: post.title,
      text: `${cleanText}...`,
      author: post.author.name,
      url: window.location.href,
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
      const fallbackText = `${post.title}\n${cleanText}\n${window.location.href}`;
      try {
        await navigator.clipboard.writeText(fallbackText);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  // Loading (show spinner first)
  if (loading) {
    return (
      <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6 py-20 bg-gradient-to-b text-white'>
        <MetaData
          title='Blog - Loading'
          description='Loading blog posts'
        />
        <Spinner size='5xl' />
        <p className='text-gray-400 text-sm mt-4'>{t('blog.loading')}</p>
      </section>
    );
  }

  {
    /* Error */
  }
  if (error) {
    return (
      <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6 py-20 bg-gradient-to-b text-white'>
        <MetaData
          title='Blog - Error'
          description='Error loading blog posts'
        />
        <h1 className='text-3xl md:text-4xl mx-auto text-purple-600 font-extrabold leading-tight mt-[50px] select-none'>
          {t('blog.oops')}
        </h1>
        <p className='text-gray-300 mb-4'>{error}</p>

        <button
          onClick={() => navigate('/blog')}
          className='py-2 px-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
        >
          {t('blog.back_blog')}
        </button>
      </section>
    );
  }

  if (!post) {
    return (
      <div className='min-h-screen pt-24 pb-16'>
        <MetaData
          title='Post Not Found'
          description='Blog post not found'
        />
        <div className='container mx-auto px-4'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-gray-300 mb-4'>
              {t('blog.not_found')}
            </h2>
            <p className='text-gray-400 mb-4'>
              {t('blog.not_exist')}
            </p>
            <button
              onClick={() => navigate('/blog')}
              className='bg-purple-600 hover:bg-purple-700 text-white/70 font-bold py-2 px-4 rounded transition-colors duration-200 cursor-pointer'
            >
              {t('blog.back_blog')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title={`${post.title} | TerraQuake API Blog - Earthquake Insights & Research`}
        description={`${post.content
          .replace(/<[^>]*>/g, '')
          .substring(
            0,
            160
          )} - Read expert analysis and updates on earthquake science, seismic monitoring, and safety.`}
        ogTitle={`${post.title} | TerraQuake API Blog`}
        ogDescription={`${post.content
          .replace(/<[^>]*>/g, '')
          .substring(
            0,
            160
          )} - Stay informed with TerraQuake API’s detailed blog articles.`}
        twitterTitle={`${post.title} | TerraQuake API Blog`}
        twitterDescription={`${post.content
          .replace(/<[^>]*>/g, '')
          .substring(
            0,
            160
          )} - Explore the latest in earthquake research and safety tips.`}
        keywords='TerraQuake API blog, earthquake article, seismic research, earthquake safety, seismology insights'
      />
      {/* SEO Stuff */}

      {/* Background Gradient/Mesh (for a classy, dark theme) */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
      </div>

      <div className='min-h-screen pt-24 pb-16'>
        <div className='container mx-auto px-4 max-w-4xl'>
          {/* Back to Blog Button */}
          <NavLink
            to='/blog'
            className='relative z-50 inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors duration-200 cursor-pointer'
          >
            <FaArrowLeft className='mr-2' />
            {t('blog.back_blog')}
          </NavLink>

          {/* Article Header */}
          <article className='border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl text-white/70 overflow-hidden'>
            <div className='p-8'>
              {/* Category and Share */}
              <div className='grid grid-cols-2 mb-6'>
                <div className='flex flex-col md:flex-row justify-start gap-2'>
                  {post.categories.map((item, index) => (
                    <span
                      key={index}
                      className='text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full'
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className='z-50 flex justify-end'>
                  <button
                    onClick={handleShare}
                    className='flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 cursor-pointer'
                  >
                    <FaShare className='w-4 h-4' />
                    <span className='text-sm cursor-pointer'>{t('blog.share')}</span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className='text-3xl md:text-4xl text-center md:text-left font-bold text-white mb-6 leading-tight'>
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-800'>
                <div className='flex items-center space-x-2'>
                  <FaUser className='text-purple-400' />
                  <span>{post.author?.name}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <FaCalendarAlt className='text-purple-400' />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <FaClock className='text-purple-400' />
                  <span>{post.readTime} {t('blog.min_read')}</span>
                </div>
              </div>

              {/* Article Content */}
              <div className='prose prose-invert prose-purple max-w-none markdown-content'>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  components={{
                    // Custom components for better styling
                    h1: ({ children }) => (
                      <h1 className='text-3xl font-bold text-white/70 mb-6 border-b-2 border-purple-500 pb-3'>
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className='text-2xl font-bold text-white/70 mb-4 mt-8 border-b border-purple-400 pb-2'>
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className='text-xl font-semibold text-white/70 mb-3 mt-6'>
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className='text-lg font-semibold text-purple-300 mb-2 mt-4'>
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className='text-gray-300 mb-4 leading-relaxed'>
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className='text-purple-400 font-semibold'>
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className='text-purple-300 italic'>{children}</em>
                    ),
                    ul: ({ children }) => (
                      <ul className='list-disc list-inside mb-4 space-y-2 text-gray-300'>
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className='list-decimal list-inside mb-4 space-y-2 text-gray-300'>
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className='text-gray-300'>{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className='border-l-4 border-purple-500 pl-4 py-2 my-4 bg-purple-900/20 rounded-r-lg'>
                        <div className='text-purple-200 italic'>{children}</div>
                      </blockquote>
                    ),
                    code: ({ inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <div className='relative'>
                          <div className='absolute top-0 right-0 bg-gray-700 text-gray-300 px-2 py-1 text-xs rounded-bl-md rounded-tr-md'>
                            {match[1]}
                          </div>
                          <pre className='bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto mb-4 mt-2'>
                            <code
                              className={className}
                              {...props}
                            >
                              {children}
                            </code>
                          </pre>
                        </div>
                      ) : (
                        <code
                          className='bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm'
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    table: ({ children }) => (
                      <div className='overflow-x-auto mb-6'>
                        <table className='min-w-full border border-gray-600 rounded-lg overflow-hidden'>
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className='bg-purple-900/50'>{children}</thead>
                    ),
                    tbody: ({ children }) => (
                      <tbody className='bg-gray-900/50'>{children}</tbody>
                    ),
                    tr: ({ children }) => (
                      <tr className='border-b border-gray-600'>{children}</tr>
                    ),
                    th: ({ children }) => (
                      <th className='px-4 py-3 text-left text-purple-300 font-semibold'>
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className='px-4 py-3 text-gray-300'>{children}</td>
                    ),
                    img: ({ src, alt }) => (
                      <div className='my-6'>
                        <img
                          src={src}
                          alt={alt}
                          className='rounded-lg shadow-lg max-w-full h-auto mx-auto'
                        />
                        {alt && (
                          <p className='text-center text-gray-500 text-sm mt-2'>
                            {alt}
                          </p>
                        )}
                      </div>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className='text-purple-400 hover:text-purple-300 underline transition-colors duration-200'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              {post.tags && (
                <div className='mt-8 pt-6 border-t border-gray-800'>
                  <div className='flex items-center mb-4'>
                    <FaTag className='text-purple-400 mr-2' />
                    <h4 className='text-white/70 font-semibold'>
                      {t('blog.topics')}
                    </h4>
                  </div>
                  <div className='flex flex-wrap gap-3'>
                    {post.tags.map((tag, index) => (
                      <button
                        key={tag}
                        className={`group relative overflow-hidden text-sm px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105 cursor-pointer ${
                          index % 3 === 0
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 border-purple-500 text-white/70 hover:from-purple-500 hover:to-purple-600'
                            : index % 3 === 1
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500 text-white/70 hover:from-blue-500 hover:to-blue-600'
                            : 'bg-gradient-to-r from-green-600 to-green-700 border-green-500 text-white/70 hover:from-green-500 hover:to-green-600'
                        }`}
                        onClick={() => {
                          // TODO: Navigate to tag filter page
                          console.log(`Searching for tag: ${tag}`);
                        }}
                      >
                        <span className='relative z-10 flex items-center'>
                          <span className='mr-1'>#</span>
                          {tag.replace('-', ' ')}
                        </span>
                        <div className='absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300'></div>
                      </button>
                    ))}
                  </div>
                  <p className='text-gray-500 text-xs mt-3'>
                    {t('blog.click_tags')}
                  </p>
                </div>
              )}
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className='mt-12'>
              <h3 className='text-2xl font-bold text-white/70 mb-6'>
                {t('blog.articles_related')}
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105'
                  >
                    <div className='flex items-center justify-between mb-3'>
                      <span className='text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full'>
                        {relatedPost.category}
                      </span>
                      <span className='text-xs text-gray-500'>
                        {relatedPost.readTime} {t('blog.min')}
                      </span>
                    </div>

                    <h4 className='text-lg font-bold text-white/70 mb-3 line-clamp-2'>
                      <Link
                        to={`/blog/${relatedPost.slug}`}
                        className='hover:text-purple-400 transition-colors duration-200'
                      >
                        {relatedPost.title}
                      </Link>
                    </h4>

                    <p className='text-gray-400 text-sm leading-relaxed line-clamp-3'>
                      {relatedPost.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}
