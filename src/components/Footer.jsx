import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer>
      <div className="container">
        <p>{t.footer}</p>
      </div>
    </footer>
  );
};

export default Footer;
