import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Code, Cpu, Globe } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();

  const syncTransition = {
    duration: 1.0,
    ease: "linear",
  };

  const syncVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: syncTransition,
    },
  };

  return (
    <div className="container">
      <motion.section
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'center' }}
      >
        <motion.div variants={syncVariants} style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '1rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
            <span className="gradient-text animate-shine">{t.header.name}</span>
          </h1>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: 600 }}>
            {t.header.title}
          </h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 3.5rem', fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            {t.about}
          </p>
        </motion.div>

        <motion.div
          className="glass card"
          style={{ marginTop: '2rem', textAlign: 'center' }}
          variants={syncVariants}
        >
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{t.projectsIntro}</h3>
          {t.projectsParagraphs.map((p, idx) => (
            <p key={idx} style={{ marginBottom: '1rem', color: 'var(--text-muted)', marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>{p}</p>
          ))}

          <div 
            className="projects-grid" 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2.5rem', marginBottom: '1.5rem' }}
          >
            {t.projects.slice(0, 3).map((project, idx) => (
              <div 
                key={idx} 
                className="glass" 
                style={{ padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center' }}
              >
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--secondary)' }}>{project.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{project.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
