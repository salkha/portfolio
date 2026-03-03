import React from 'react';

function CodingPagination({ total, current, onChange }) {
  return (
    <div className="coding-pagination">
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