
import React from 'react';
import translations from '../localization';

function CodingPagination({ total, current, onChange, lang }) {
  // Fallback to 'en' if lang is not provided
  const usedLang = lang || 'en';
  if (!lang) {
    console.warn('CodingPagination: lang prop not provided, defaulting to "en".');
  }
  const t = translations[usedLang] || translations['en'];
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