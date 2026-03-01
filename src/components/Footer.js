import React from 'react';
import translations from '../localization';

function Footer({ lang }) {
  const t = translations[lang];
  return (
    <footer className="footer">
      <div className="container">
        {t.footer}
      </div>
    </footer>
  );
}

export default Footer;
