import React, { useCallback, useEffect, useState } from 'react';
import useTestimonials from '@/hooks/useTestimonials';
import MetaData from '../noPage/MetaData';
import { motion } from 'framer-motion';
import { formatDate } from '@/components/utils/FormatDate';
import DeleteReview from './DeleteReview';
import UpdateReview from './UpdateReview';
import Spinner from '@/components/spinner/Spinner';

export default function ViewReview({ userId }) {
  const { testimonials, listAllTestimonials } = useTestimonials();
  const [review, setReview] = useState(null);
  const [updateReview, setUpdateReview] = useState(false);
  const [loading, setLoading] = useState(false);

  const filterReview = useCallback(() => {
    if (!userId) return;
    setLoading(true);

    const reviewFound = testimonials.find(
      (item) =>
        (item.userId?._id || item.userId) === userId && item.deleted === false
    );

    setReview(reviewFound || null);
    setLoading(false);
  }, [userId, testimonials]);

  useEffect(() => {
    if (testimonials.length > 0) {
      filterReview();
    }
  }, [testimonials, filterReview]);

  // Scroll to top when review changes
  useEffect(() => {
    if (review) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [review]);

  if (loading)
    return (
      <div className='grid col-span-2 my-26 mx-auto gap-6'>
        <Spinner size='4xl' />
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Review Details | TerraQuake API - User Experience'
        description='View the full testimonial from a TerraQuake API user. Learn how developers, researchers, and professionals apply our seismic data in real-world scenarios.'
        ogTitle='Review Details | TerraQuake API'
        ogDescription='Explore detailed user feedback and insights from those integrating TerraQuake API into scientific, academic, and operational projects.'
        twitterTitle='Review Details | TerraQuake API'
        twitterDescription='See how users around the world leverage TerraQuake API for seismic monitoring, data analysis, and research applications.'
        keywords='TerraQuake API review details, user testimonial TerraQuake, seismic data API experiences, developer feedback TerraQuake, research project integration TerraQuake API'
      />
      {/* SEO Stuff */}

      {/* Main animated container */}
      <section className='col-span-1 lg:col-span-2 bg-black/30 border border-pink-500/10 rounded-2xl shadow-lg p-6 sm:p-8 mt-6'>
        <div className='w-full max-w-5xl mx-auto'>
          {/* Title */}
          <motion.div
            className='mb-12 text-center'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className='text-3xl md:text-5xl font-extrabold text-white mb-4'>
              View a Review
            </h2>
            <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            <p className='text-xl text-left text-white/70 max-w-7xl'>
              Share your experience with TerraQuake API. Your insights help
              others in the community evaluate its impact and usefulness.
            </p>
            {review ? (
              <>
                <div className='flex flex-wrap justify-center gap-6 w-full py-10 px-4 mx-auto'>
                  <section className='flex flex-col justify-between relative bg-primaryColor overflow-hidden rounded-lg border border-gray-800 p-6 shadow-lg max-w-[550px] w-full'>
                    <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_90%_60%_at_50%_0%,#000_70%,transparent_110%)]'></div>

                    <article className='relative'>
                      <p className='my-2 font-sm text-gray-500'>
                        {formatDate(review.createdAt)}
                      </p>

                      <p className='text-left text-gray-200 leading-relaxed'>
                        {review.message}
                      </p>

                      <div className='flex justify-between pt-6 items-center relative'>
                        <div>
                          <h2 className='font-semibold text-left text-gray-100 text-base lg:text-lg'>
                            {review.name}
                          </h2>
                          <p className='text-left text-gray-400 text-sm'>
                            {review.role}
                          </p>
                        </div>
                      </div>
                      <div className='flex flex-col md:flex-row justify-center items-center gap-6'>
                        <button
                          onClick={() => setUpdateReview(true)}
                          className='w-26 border border-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer text-sm sm:text-base'
                        >
                          Update
                        </button>
                        <DeleteReview
                          reviewId={review?._id}
                          refetchTestimonials={listAllTestimonials}
                        />
                      </div>
                    </article>
                  </section>
                </div>
              </>
            ) : (
              <h2 className='my-6 font-semibold text-red-400'>
                No review found for this user.
              </h2>
            )}
          </motion.div>
        </div>
      </section>
      {/* UpdateReview */}
      {updateReview && review && (
        <UpdateReview
          reviewId={review?._id}
          review={review}
          setUpdateReview={setUpdateReview}
          setLoading={setLoading}
          setReview={setReview}
          refetchTestimonials={listAllTestimonials}
        />
      )}
    </>
  );
}
