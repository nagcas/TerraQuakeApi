import { useCallback, useEffect, useRef, useState } from 'react';
import { TimelineContent } from '@/components/testimonials/TimelineAnimation';
import AvatarUser from '../utils/AvatarUser';
import useTestimonials from '@/hooks/useTestimonials';
import { formatDate } from '../utils/FormatDate';
import { useTranslation } from 'react-i18next';

export default function ClientFeedback() {
  const { t } = useTranslation('translation');

  const { testimonials } = useTestimonials();
  const testimonialRef = useRef(testimonials);
  const [review, setReview] = useState([]);

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: 'blur(10px)',
      y: -20,
      opacity: 0,
    },
  };

  const filterReview = useCallback(() => {
    if (!testimonials) return;

    const visibleReviews = testimonials.filter(
      (item) => item.deleted === false
    );

    setReview(visibleReviews);
  }, [testimonials]);

  useEffect(() => {
    filterReview();
  }, [filterReview]);

  return (
    <section
      className='max-w-screen relative text-white bg-white/[0.02] rounded-lg mt-16 py-14'
      ref={testimonialRef}
    >
      <article className='max-w-screen-md mx-auto text-center space-y-2 p-6'>
        <TimelineContent
          as='h2'
          className={
            'xl:text-5xl text-3xl font-medium text-white/80 bg-clip-text pb-2'
          }
          animationNum={0}
          customVariants={revealVariants}
          timelineRef={testimonialRef}
        >
          {t('testimonial.title')} 
        </TimelineContent>
        <TimelineContent
          as='p'
          className={'mx-auto text-gray-400'}
          animationNum={1}
          customVariants={revealVariants}
          timelineRef={testimonialRef}
        >
          {t('testimonial.description')}
        </TimelineContent>
      </article>
      <div className='flex flex-wrap justify-center gap-6 w-full py-10 px-4 mx-auto'>
        {review.slice(0, 6).map((item) => (
          <TimelineContent
            key={item._id}
            animationNum={item._id}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
            className='flex flex-col justify-between relative bg-primaryColor overflow-hidden rounded-lg border border-gray-800 p-6 shadow-lg max-w-[550px] w-full'
          >
            <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_90%_60%_at_50%_0%,#000_70%,transparent_110%)]'></div>

            <article className='relative'>
              <p className='my-2 font-sm text-gray-500'>
                {formatDate(item.createdAt)}
              </p>

              <p className='text-gray-200 leading-relaxed'>{item.message}</p>

              <div className='flex justify-between pt-6 items-center relative'>
                <div>
                  <h2 className='font-semibold text-gray-100 text-base lg:text-lg'>
                    {item.name}
                  </h2>
                  <p className='text-gray-400 text-sm'>{item.role}</p>
                </div>
                <AvatarUser
                  size='60px'
                  image={item.avatar}
                />
              </div>
            </article>
          </TimelineContent>
        ))}
      </div>
    </section>
  );
}
