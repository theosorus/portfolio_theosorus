import { useTranslation } from 'react-i18next';

export const useCV = () => {
  const { i18n } = useTranslation();
  const fileName = i18n.language?.startsWith('fr')
    ? 'cv_tcastillo_fr.pdf'
    : 'resume_tcastillo_en.pdf';
  const path = `/cv/${fileName}`;

  const download = () => {
    const link = document.createElement('a');
    link.href = path;
    link.download = fileName;
    link.click();
  };

  const view = () => window.open(path, '_blank', 'noopener,noreferrer');

  return { download, view, path, fileName };
};
