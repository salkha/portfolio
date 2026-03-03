import React from 'react';
import translations from '../localization';

function Footer({ lang }) {
  const t = translations[lang] || translations['en']; // fallback to English

  return (
    <footer className="footer">
      <p>{t.footer}</p>
    </footer>
  );
}

export default Footer;