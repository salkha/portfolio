import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CodeSection from '../components/CodeSection';

const Skills = () => {
  const { t } = useLanguage();

  return (
    <div className="container">
      <section>
        <h2 className="section-title">{t.skillsSectionTitles.main}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Main Technical Skills */}
          <motion.div 
            className="glass card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{t.skillsSectionTitles.technical}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {t.skills.map(skill => (
                <span key={skill} className="skill-badge">{skill}</span>
              ))}
            </div>
          </motion.div>

          {/* More Tools */}
          <motion.div 
            className="glass card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{t.skillsSectionTitles.more}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {t.more_skills.map(skill => (
                <span key={skill} className="skill-badge">{skill}</span>
              ))}
            </div>
          </motion.div>

          {/* Practical Implementations */}
          <motion.div 
            className="glass card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{ gridColumn: '1 / -1' }}
          >
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{t.skillsSectionTitles.soft}</h3>
            <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.5rem' }}>
              {t.more_soft_skills.map((skill, idx) => (
                <li key={idx} style={{ marginBottom: '0.75rem' }}>{skill}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Code Examples Section */}
        <CodeSection />
      </section>
    </div>
  );
};

export default Skills;
