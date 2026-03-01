import React from 'react';
import translations from '../localization';

function About({ lang }) {
  const t = translations[lang];
  return (
    <section className="about">
      <h3>{lang === 'en' ? 'About Me' : 'Über mich'}</h3>
      <p>{t.about}</p>
    </section>
  );
}

export default About;
