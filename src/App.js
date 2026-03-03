// App.js - Main application component, handles routing and language state
import './index.css';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CodingPagination from './components/CodingPagination';
import Code from './components/Code';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Main App function, sets up routes and language switching
function App() {
  const [lang, setLang] = useState('en');

  return (
    <>
      {/* Header component with language switch */}
      <Header lang={lang} setLang={setLang} />

      <main className="container">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <About lang={lang} />
                <Skills lang={lang} />
                <Projects lang={lang} />
                <Contact lang={lang} />
              </>
            }
          />

          {/* Coding Skills Page */}
          <Route
            path="/coding-skills"
            element={
              <>
                {/* CodingPagination and Code components */}
                <CodingPagination />
                <Code lang={lang} />
              </>
            }
          />
        </Routes>
      </main>

      {/* Footer component */}
      <Footer lang={lang} />
    </>
  );
}

export default App;