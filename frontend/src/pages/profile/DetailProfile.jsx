import { useContext } from 'react';
import { Context } from '@/components/modules/Context';

export default function DetailProfile() {
  const { userLogin } = useContext(Context);

  return (
    <section>
      <h2 className='pointer-events-none text-xl sm:text-2xl font-semibold text-pink-400 mb-4'>
        Account Details
      </h2>
      <div className='grid sm:grid-cols-2 gap-4 sm:gap-6 text-gray-300 text-sm sm:text-base'>
        {[
          { label: 'Name:', value: userLogin?.name, type: 'text' },
          { label: 'Email:', value: userLogin?.email, type: 'email' },
          { label: 'Role:', value: userLogin?.role, type: 'text' },
          { label: 'Experience:', value: userLogin?.experience, type: 'text' },
          { label: 'Student:', value: userLogin?.student, type: 'text' },
          {
            label: 'Location (optional):',
            value: userLogin?.location,
            type: 'text',
          },
          {
            label: 'Website (optional):',
            value: userLogin?.website,
            type: 'url',
          },
          {
            label: 'Portfolio (optional):',
            value: userLogin?.portfolio,
            type: 'url',
          },
          { label: 'GitHub (optional):', value: userLogin?.github, type: 'url' },
          {
            label: 'LinkedIn (optional):',
            value: userLogin?.linkedin,
            type: 'url',
          },
          { label: 'Bio (optional):', value: userLogin?.bio, type: 'text' },
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
