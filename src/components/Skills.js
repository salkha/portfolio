import React from 'react';
import translations from '../localization';

function Skills({ lang }) {
  const t = translations[lang];
  return (
    <section className="skills">
      <h3>{lang === 'en' ? 'Skills' : 'Fähigkeiten'}</h3>
      <ul className="skills-list">
        {t.skills.map((skill, idx) => (
          <li key={idx}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
