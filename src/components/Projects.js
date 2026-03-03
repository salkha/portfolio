import translations from '../localization';

function Projects({ lang }) {
  const t = translations[lang];
  return (
    <section className="projects">
      <h3>{lang === 'en' ? 'Projects' : 'Projekte'}</h3>
      <ul className="projects-list">
        {t.projects.map((project, idx) => (
          <li key={idx}>{project.title}</li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;
