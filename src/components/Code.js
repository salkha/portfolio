
import { useEffect, useState, useMemo } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";
import sampleCodes from "./sampleCodes";
import translations from '../localization';

export default function Code({ lang }) {
  const codeList = useMemo(
    () => Object.entries(sampleCodes).map(([key, value]) => ({ key, ...value })),
    []
  );
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    Prism.highlightAll();
  }, [activeIdx]);


  const t = translations[lang] || translations['en'];
  return (
    <section>
      <div className="code-btn-group">
        {codeList.map((item, idx) => (
          <button
            key={item.id}
            className={`main-btn code-btn${activeIdx === idx ? ' active' : ''}`}
            onClick={() => setActiveIdx(idx)}
            type="button"
            aria-pressed={activeIdx === idx}
          >
            {t.codingButtonName && t.codingButtonName[idx] ? t.codingButtonName[idx] : item.name}
          </button>
        ))}
      </div>
      <h2>{t.codingButtonName && t.codingButtonName[activeIdx] ? t.codingButtonName[activeIdx] : codeList[activeIdx].name}</h2>
      {/* Use code_description_X from localization.js for all code examples */}
      {t[`code_description_${activeIdx + 1}`] && (
        <p>{t[`code_description_${activeIdx + 1}`]}</p>
      )}
      <pre className="code-block">
        <code className="language-javascript">
          {codeList[activeIdx].code}
        </code>
      </pre>
    </section>
  );
}