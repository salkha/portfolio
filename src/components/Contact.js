import React from 'react';
import translations from '../localization';

function Contact({ lang }) {
  const t = translations[lang];
  return (
    <section className="contact">
      <h3>{lang === 'en' ? 'Contact' : 'Kontakt'}</h3>
      <ul className="contact-list">
        <li>{t.contact.emailLabel}: <a href="mailto:salmankhaledovi@gmail.com">salmankhaledovi@gmail.com</a></li>
        <li>{t.contact.githubLabel}: <a href="https://github.com/salmanovi" target="_blank" rel="noopener noreferrer">github.com/salmanovi</a></li>
        <li>{t.contact.linkedinLabel}: <a href="https://linkedin.com/in/salman-khaled-ovi" target="_blank" rel="noopener noreferrer">linkedin.com/in/salman-khaled-ovi</a></li>
      </ul>
    </section>
  );
}

export default Contact;
