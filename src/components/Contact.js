import React from 'react';
import translations from '../localization';

function Contact({ lang }) {
  const t = translations[lang] || translations['en']; // fallback to English
  const contact = t.contact || { contactText: '', contactLinks: [] }; // extra safety

  return (
    <section className="contact">
      <h3>{lang === 'en' ? 'Contact' : 'Kontakt'}</h3>
      <p>{contact.contactText}</p>
      <ul className="contact-list">
        {contact.contactLinks.map((link, idx) => (
          <li key={idx}><a href={link.url}>{link.label}</a></li>
        ))}
      </ul>
    </section>
  );
}

export default Contact;