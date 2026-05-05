import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python'; // Add python since samples are python
import sampleCodes from '../context/sampleCodes';
import { useLanguage } from '../context/LanguageContext';
import { Terminal } from 'lucide-react';

const CodeSection = () => {
  const { t } = useLanguage();

  const codeList = useMemo(
    () => Object.entries(sampleCodes).map(([key, value]) => ({ key, ...value })),
    []
  );
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    Prism.highlightAll();
  }, [activeIdx]);

  return (
    <motion.div
      className="glass card"
      style={{ marginTop: '4rem' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)' }}>{t.codeHeading || 'Code Examples'}</h3>
      </div>

      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{t.codeSnippetIntro}</p>

      <div className="code-tabs-container">
        {codeList.map((item, idx) => (
          <button
            key={item.id}
            className={`btn code-tab-btn ${activeIdx === idx ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveIdx(idx)}
          >
            {t.codingButtonName && t.codingButtonName[idx] ? t.codingButtonName[idx] : item.name}
          </button>
        ))}
      </div>

      <div className="code-container glass">
        <h4 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>
          {t.codingButtonName && t.codingButtonName[activeIdx] ? t.codingButtonName[activeIdx] : codeList[activeIdx].name}
        </h4>

        {t[`code_description_${activeIdx + 1}`] && (
          <p style={{ marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {t[`code_description_${activeIdx + 1}`]}
          </p>
        )}

        <div style={{ position: 'relative' }}>
          <div className="window-header">
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
          </div>
          <pre
            className="line-numbers code-pre"
          >
            <code className={activeIdx === 2 || activeIdx === 5 ? "language-javascript" : "language-python"}>
              {codeList[activeIdx].code}
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeSection;
