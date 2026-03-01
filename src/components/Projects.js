import React from 'react';
import translations from '../localization';

function Projects({ lang }) {
  const t = translations[lang];
  return (
    <section className="projects">
      <h3>{lang === 'en' ? 'Projects' : 'Projekte'}</h3>
      {t.projects.map((project, idx) => (
        <div className="project" key={idx}>
          <h4>{project.title}</h4>
          <p>{project.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Projects;
