import React from 'react';

const files = [
  {
    name: 'cv-en.pdf',
    file: require('../assets/cv-en.pdf'),
    label: 'CV (English)'
  },
  {
    name: 'cv-de.pdf',
    file: require('../assets/cv-de.pdf'),
    label: 'CV (German)'
  },
  {
    name: 'motivation-letter-en.pdf',
    file: require('../assets/motivation-letter-en.pdf'),
    label: 'Motivation Letter (English)'
  },
  {
    name: 'motivation-letter-de.pdf',
    file: require('../assets/motivation-letter-de.pdf'),
    label: 'Motivation Letter (German)'
  }
];

function Download() {
  return (
    <div className="download-section">
      <h2>Download Documents</h2>
      <ul>
        {files.map(({ name, file, label }) => (
          <li key={name}>
            <a href={file} download={name} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Download;
