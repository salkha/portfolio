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
        <div className="lang-btn-group">
          <button
            className={`main-btn lang-btn${lang === 'en' ? ' active' : ''}`}
            onClick={() => setLang('en')}
          >EN</button>
          <button
            className={`main-btn lang-btn${lang === 'de' ? ' active' : ''}`}
            onClick={() => setLang('de')}
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
