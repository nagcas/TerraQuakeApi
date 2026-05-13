import { useTranslation } from 'react-i18next';

export default function KofiButton() {
  const { t } = useTranslation('translation');

  return (
    <a
      href="https://ko-fi.com/X8X21ZGPMB"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-[9999] bg-[#8b5cf6] text-white px-5 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
    >
      ☕ {t('kofi.support')}
    </a>
  );
}