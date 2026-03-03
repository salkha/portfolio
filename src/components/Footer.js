import React from 'react';
import translations from '../localization';

function Footer({ lang }) {
  const t = translations[lang];
  return (
    <footer className="footer">
      <p>{t.footerText}</p>
    </footer>
  );
}

export default Footer;
