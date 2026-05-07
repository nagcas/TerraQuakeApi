import { useContext } from 'react';
import { Context } from '@/components/modules/Context';
import { useTranslation } from 'react-i18next';

export default function DetailProfile() {
  const { t } = useTranslation('translation');
  const { userLogin } = useContext(Context);

  return (
    <section>
      <h2 className='pointer-events-none text-xl sm:text-2xl font-semibold text-pink-400 mb-4'>
        {t('detail_profile.title_detail')}
      </h2>
      <div className='grid sm:grid-cols-2 gap-4 sm:gap-6 text-gray-300 text-sm sm:text-base'>
        {[
          { 
            label: t('detail_profile.title_name'), 
            value: userLogin?.name, 
            type: 'text' 
          },
          { 
            label: t('detail_profile.label_email'), 
            value: userLogin?.email, 
            type: 'email' 
          },
          { 
            label: t('detail_profile.label_role'), 
            value: userLogin?.role, 
            type: 'text' 
          },
          { 
            label: t('detail_profile.label_experience'), 
            value: userLogin?.experience, 
            type: 'text' 
          },
          { 
            label: t('detail_profile.label_student'), 
            value: userLogin?.student, 
            type: 'text' 
          },
          {
            label: t('detail_profile.label_location'),
            value: userLogin?.location,
            type: 'text',
          },
          {
            label: t('detail_profile.label_website'),
            value: userLogin?.website,
            type: 'url',
          },
          {
            label: t('detail_profile.label_portfolio'),
            value: userLogin?.portfolio,
            type: 'url',
          },
          { 
            label: t('detail_profile.label_github'), 
            value: userLogin?.github, 
            type: 'url' 
          },
          {
            label: t('detail_profile.label_linkedin'),
            value: userLogin?.linkedin,
            type: 'url',
          },
          { 
            label: t('detail_profile.label_bio'), 
            value: userLogin?.bio, 
            type: 'text' 
          },
        ].map(({ label, value, type }) =>
          type !== 'url' ? (
            <p
              key={label}
              className='flex flex-col'
            >
              <span className='font-bold text-purple-400'>{label}</span>
              <span>{value}</span>
            </p>
          ) : (
            <p key={label} className='flex flex-col'>
              <span className='font-bold text-purple-400'>
                {label}
              </span>
              <a
                href={value || ''}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-pink-400'
              >
                {value || ''}
              </a>
            </p>
          )
        )}
      </div>
    </section>
  );
}
