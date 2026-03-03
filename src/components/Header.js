import React from 'react';
import meImg from '../assets/me.png';
import translations from '../localization';
import { useNavigate } from 'react-router-dom';

function Header({ lang, setLang }) {
  const t = translations[lang];
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="container header-content">
        <div className="profile-pic">
          <img src={meImg} alt="Profile" />
        </div>
        <div>
          <h1>{t.header.name}</h1>
          <h2>{t.header.title}</h2>
          <p className="subtitle">{t.header.subtitle}</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            onClick={() => setLang('en')}
            style={{
              background: lang === 'en' ? '#eebbc3' : '#fff',
              color: lang === 'en' ? '#232946' : '#232946',
              border: '1px solid #eebbc3',
              borderRadius: '4px',
              padding: '0.3em 0.8em',
              cursor: 'pointer',
              fontWeight: lang === 'en' ? 'bold' : 'normal',
              transition: 'background 0.2s',
            }}
          >EN</button>
          <button
            onClick={() => setLang('de')}
            style={{
              background: lang === 'de' ? '#eebbc3' : '#fff',
              color: lang === 'de' ? '#232946' : '#232946',
              border: '1px solid #eebbc3',
              borderRadius: '4px',
              padding: '0.3em 0.8em',
              cursor: 'pointer',
              fontWeight: lang === 'de' ? 'bold' : 'normal',
              transition: 'background 0.2s',
            }}
          >DE</button>
        </div>
      </div>
      <div className="header-nav-btns">
        <button className="nav-btn" onClick={() => navigate('/')}>{lang === 'en' ? 'Home' : 'Startseite'}</button>
        <button className="nav-btn" onClick={() => navigate('/coding-skills')}>{lang === 'en' ? 'Coding Skills' : 'Coding-Fähigkeiten'}</button>
      </div>
    </header>
  );
}

export default Header;
