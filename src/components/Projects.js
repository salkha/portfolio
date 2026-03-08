import translations from '../localization';

function Projects({ lang }) {
  const t = translations[lang];
  return (
    <section className="projects">
      <p>{t.projectsIntro}</p>
      <h3>{lang === 'en' ? 'Projects' : 'Projekte'}</h3>
      <ul className="projects-list">
        {t.projects.map((project, idx) => (
          <li key={idx}>{project.title}</li>
        ))}
      </ul>
      {t.projectsParagraphs && t.projectsParagraphs.map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </section>
  );
}

export default Projects;
