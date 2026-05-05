import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Code, Cpu, Globe } from 'lucide-react';

const Home = () => {
  const { t, language } = useLanguage();

  return (
    <div className="container">
      <section style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            <span className="gradient-text">{t.header.name}</span>
          </h1>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            {t.header.title}
          </h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
            {t.about}
          </p>
        </motion.div>

        <motion.div 
          className="glass card"
          style={{ marginTop: '3rem', textAlign: 'center' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{t.projectsIntro}</h3>
          {t.projectsParagraphs.map((p, idx) => (
            <p key={idx} style={{ marginBottom: '1rem', color: 'var(--text-muted)', marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>{p}</p>
          ))}
          
          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2.5rem', marginBottom: '2.5rem' }}>
            {t.projects.slice(0, 3).map((project, idx) => (
              <div key={idx} className="glass" style={{ padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--secondary)' }}>{project.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{project.description}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = '/skills'}
            >
              {language === 'de' ? 'Alle Projekte ansehen' : 'View All Projects'}
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
