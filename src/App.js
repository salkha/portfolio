
import './index.css';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import React, { useState } from 'react';

function App() {
  const [lang, setLang] = useState('en');
  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main className="container">
        <About lang={lang} />
        <Skills lang={lang} />
        <Projects lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

export default App;
