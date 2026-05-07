import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CodeSection from '../components/CodeSection';

const Skills = () => {
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
      >
        <motion.h2 className="section-title" variants={syncVariants}>
          {t.skillsSectionTitles.main}
        </motion.h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Main Technical Skills */}
          <motion.div className="glass card" variants={syncVariants}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{t.skillsSectionTitles.technical}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {t.skills.map(skill => (
                <span key={skill} className="skill-badge">{skill}</span>
              ))}
            </div>
          </motion.div>

          {/* More Tools */}
          <motion.div className="glass card" variants={syncVariants}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{t.skillsSectionTitles.more}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {t.more_skills.map(skill => (
                <span key={skill} className="skill-badge">{skill}</span>
              ))}
            </div>
          </motion.div>

          {/* Practical Implementations */}
          <motion.div className="glass card" variants={syncVariants} style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{t.skillsSectionTitles.soft}</h3>
            <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.5rem' }}>
              {t.more_soft_skills.map((skill, idx) => (
                <li key={idx} style={{ marginBottom: '0.75rem' }}>{skill}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Code Examples Section */}
        <motion.div variants={syncVariants} style={{ marginTop: '4rem' }}>
          <CodeSection />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Skills;
