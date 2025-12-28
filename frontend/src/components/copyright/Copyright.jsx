import { t } from "i18next";

export default function Copyright() {
  return (
    <section className='relative border-t border-white/10 mt-10 pt-6 px-6 text-center text-sm text-slate-400 space-y-4'>
      <p>
        &copy; {new Date().getFullYear()}{t('footer.reserved')}
      </p>
      <p className='max-w-3xl mx-auto leading-relaxed px-4'>
        {t('footer.reserved_terms')}{' '}
        <a
          href='https://www.gnu.org/licenses/agpl-3.0.html'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-violet-400 transition duration-200'
          aria-label='Visit the TerraQuake API licence'
        >
          {t('footer.licenced_gnu')}
        </a>{' '}
        {t('footer.licenced')}
      </p>
    </section>
  );
}
