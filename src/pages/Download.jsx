import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Download as DownloadIcon, FileText, Send } from 'lucide-react';

// Import Assets
import cvDe from '../assets/cv-de.pdf';
import cvEn from '../assets/cv-en.pdf';
import motivationDe from '../assets/motivation-de.pdf';
import motivationEn from '../assets/motivation-en.pdf';

const Download = () => {
  const { language } = useLanguage();

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

  const content = {
    de: {
      title: 'Download Bereich',
      subtitle: 'Hier findest du meine Bewerbungsunterlagen in der passenden Sprache.',
      cv: {
        title: 'Lebenslauf',
        description: 'Detaillierte Übersicht meines Werdegangs.',
        file: cvDe,
        fileName: 'Lebenslauf_Salman_Khaled_Ovi.pdf'
      },
      motivation: {
        title: 'Motivationsschreiben',
        description: 'Warum ich die richtige Wahl für dein Team bin.',
        file: motivationDe,
        fileName: 'Motivationsschreiben_Salman_Khaled_Ovi.pdf'
      },
      button: 'Download PDF'
    },
    en: {
      title: 'Download Section',
      subtitle: 'Here you can find my application documents in the respective language.',
      cv: {
        title: 'Curriculum Vitae',
        description: 'A detailed overview of my professional career.',
        file: cvEn,
        fileName: 'CV_Salman_Khaled_Ovi.pdf'
      },
      motivation: {
        title: 'Motivation Letter',
        description: 'Why I am the right choice for your team.',
        file: motivationEn,
        fileName: 'Motivation_Letter_Salman_Khaled_Ovi.pdf'
      },
      button: 'Download PDF'
    }
  };

  const t = content[language];

  return (
    <div className="container">
      <motion.section 
        style={{ textAlign: 'center' }}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={syncVariants}>
          <h2 className="section-title">{t.title}</h2>
          <p style={{ marginBottom: '4rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 4rem' }}>
            {t.subtitle}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {/* CV Card */}
          <motion.div 
            className="glass card"
            whileHover={{ y: -10 }}
            variants={syncVariants}
            style={{ padding: '3rem' }}
          >
            <div style={{ background: 'var(--primary-glow)', width: '60px', height: '60px', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <FileText size={32} color="white" />
            </div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{t.cv.title}</h3>
            <p style={{ marginBottom: '2.5rem', color: 'var(--text-muted)' }}>
              {t.cv.description}
            </p>
            <a 
              href={t.cv.file} 
              download={t.cv.fileName}
              className="btn btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <DownloadIcon size={20} /> {t.button}
            </a>
          </motion.div>

          {/* Motivation Letter Card */}
          <motion.div 
            className="glass card"
            whileHover={{ y: -10 }}
            variants={syncVariants}
            style={{ padding: '3rem' }}
          >
            <div style={{ background: 'var(--secondary)', opacity: 0.9, width: '60px', height: '60px', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <Send size={32} color="white" />
            </div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{t.motivation.title}</h3>
            <p style={{ marginBottom: '2.5rem', color: 'var(--text-muted)' }}>
              {t.motivation.description}
            </p>
            <a 
              href={t.motivation.file} 
              download={t.motivation.fileName}
              className="btn btn-outline" 
              style={{ width: '100%', justifyContent: 'center', border: '1px solid var(--primary)' }}
            >
              <DownloadIcon size={20} /> {t.button}
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Download;
