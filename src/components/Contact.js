
import React from 'react';
import translations from '../localization';

function Contact({ lang }) {
  const t = translations[lang] || translations['en']; // fallback to English
  const contact = t.contact || { contactText: '', contactLinks: [] }; // extra safety

  // Icon SVGs
  const icons = {
    
        Email: (
          <svg className="contact-icon" width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 6H20V18H4V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 7L12 13L20 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        GitHub: (
          <svg className="contact-icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.8.5 12.32c0 5.22 3.44 9.65 8.2 11.21.6.11.82-.27.82-.6
            0-.3-.01-1.08-.02-2.12-3.34.74-4.04-1.66-4.04-1.66-.55-1.42-1.33-1.8-1.33-1.8
            -1.09-.77.08-.75.08-.75 1.2.09 1.84 1.25 1.84 1.25 1.07 1.86 2.8 1.32
            3.48 1.01.11-.79.42-1.33.76-1.63-2.66-.31-5.47-1.36-5.47-6.04
            0-1.33.47-2.41 1.24-3.26-.12-.31-.54-1.57.12-3.27
            0 0 1.01-.33 3.3 1.25a11.2 11.2 0 0 1 3-.41c1.02 0 2.05.14 3 .41
            2.28-1.58 3.29-1.25 3.29-1.25.66 1.7.24 2.96.12 3.27.77.85
            1.23 1.93 1.23 3.26 0 4.69-2.81 5.72-5.49 6.03.43.38.81 1.12.81 2.26
            0 1.63-.02 2.94-.02 3.34 0 .33.21.72.83.6
            4.76-1.56 8.19-5.99 8.19-11.21C23.5 5.8 18.35.5 12 .5Z"/>
          </svg>
        ),
        LinkedIn: (
          <svg className="contact-icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1
            4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05
            c.53-1 1.84-2.2 3.8-2.2 4.06 0 4.8 2.67 4.8 6.15V24h-4v-7.9
            c0-1.9-.03-4.34-2.65-4.34-2.65 0-3.05 2.07-3.05 4.2V24H8V8z"/>
          </svg>
        )
  };

  return (
    <section className="contact">
      <h3>{lang === 'en' ? 'Contact' : 'Kontakt'}</h3>
      <div className="project">
        <p>{contact.contactText}</p>
        <ul className="contact-list">
          {contact.contactLinks.map((link, idx) => (
            <li key={idx} style={{display: 'flex', alignItems: 'center', gap: '0.7em', marginBottom: '0.7em'}}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#232946', fontWeight: 500}}>
                {icons[link.label]}
                <span>{link.label === 'Email' ? <span>{link.label}: <span style={{fontFamily: 'monospace', color: '#555'}}>{link.url.replace('mailto:', '')}</span></span> : link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contact;