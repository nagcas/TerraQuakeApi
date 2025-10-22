export default function Copyright() {
  return (
    <section className='relative border-t border-white/10 mt-10 pt-6 px-6 text-center text-sm text-slate-400 space-y-4'>
      <p>
        &copy; {new Date().getFullYear()} TerraQuake API · All rights reserved
      </p>
      <p className='max-w-3xl mx-auto leading-relaxed px-4'>
        TerraQuake API is free software: you can redistribute it and/or modify
        it under the terms of the{' '}
        <a
          href='https://www.gnu.org/licenses/agpl-3.0.html'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-violet-400 transition duration-200'
          aria-label='Visit the TerraQuake API licence'
        >
          GNU Affero General Public License
        </a>{' '}
        as published by the Free Software Foundation, either version 3 of the
        License, or (at your option) any later version.
      </p>
    </section>
  );
}
