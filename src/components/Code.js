import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";
import sampleCodes from "./sampleCodes";
import translations from '../localization';

export default function Code({ lang }) {
  const codeList = Object.entries(sampleCodes).map(([key, value]) => ({ key, ...value }));
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
          >
            {item.name}
          </button>
        ))}
      </div>
      <h2>{t.codeHeading}</h2>
      <pre className="code-block">
        <code className="language-javascript">
          {codeList[activeIdx].code}
        </code>
      </pre>
    </section>
  );
}