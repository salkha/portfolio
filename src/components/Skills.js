import React from 'react';
import translations from '../localization';

function Skills({ lang }) {
  const t = translations[lang];
  const titles = t.skillsSectionTitles;
  return (
    <section className="skills">
      <h3>{titles.main}</h3>
      <h3 className="skills-block-title">{titles.technical}</h3>
      <ul className="skills-list skills-list-primary">
        {t.skills.map((skill, idx) => (
          <li key={idx}>{skill}</li>
        ))}
      </ul>
      <h3 className="skills-block-title" style={{marginTop: '2.2rem'}}>{titles.more}</h3>
      <ul className="skills-list skills-list-secondary">
        {t.more_skills.map((more_skill, idx) => (
          <li key={idx}>{more_skill}</li>
        ))}
      </ul>
      <h3 className="skills-block-title" style={{marginTop: '2.2rem'}}>{titles.soft}</h3>
      <ul className="skills-list skills-list-tertiary">
        {t.more_soft_skills.map((soft_skill, idx) => (
          <li key={idx}>{soft_skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
