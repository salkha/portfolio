
import React from 'react';
import translations from '../localization';

function CodingPagination({ total, current, onChange }) {
  // Use English as default, or pass lang as prop if available
  const lang = (typeof window !== 'undefined' && window.navigator.language.startsWith('de')) ? 'de' : 'en';
  const t = translations[lang] || translations['en'];
  return (
    <div className="coding-pagination">
      <p>{t.codeSnippetIntro}</p>
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          className={idx === current ? 'active' : ''}
          onClick={() => onChange(idx)}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
}

export default CodingPagination;