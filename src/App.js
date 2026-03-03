import './index.css';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Code from './components/Code';
import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

function App() {
  const [lang, setLang] = useState('en');

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main className="container">
        <Routes>

          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Skills lang={lang} />
                <Projects lang={lang} />
                <About lang={lang} />
                <Contact lang={lang} />
              </>
            }
          />

          {/* New Page */}
          <Route
            path="/coding-skills"
            element={<Code lang={lang}/>}
          />

        </Routes>
      </main>

      <Footer lang={lang} />
    </>
  );
}

export default App;