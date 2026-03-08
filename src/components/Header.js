import React from 'react';
import meImg from '../assets/me.png';
import translations from '../localization';
import { useNavigate, useLocation } from 'react-router-dom';

function Header({ lang, setLang }) {
  const t = translations[lang];
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className="header">
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

      <div className='header-element'>
        <div className="header-content">
          <div className="profile-pic">
            <img src={meImg} alt="Profile" />
          </div>
          <div>
            <h1>{t.header.name}</h1>
            <h2>{t.header.title}</h2>
            <p className="subtitle">{t.header.subtitle}</p>
          </div>
        </div>
        <div className="header-content header-nav-btns">
          <button
            className={`nav-btn${location.pathname === '/' ? ' active' : ''}`}
            onClick={() => navigate('/')}
          >{lang === 'en' ? 'Home' : 'Startseite'}</button>
          <button
            className={`nav-btn${location.pathname === '/coding-skills' ? ' active' : ''}`}
            onClick={() => navigate('/coding-skills')}
          >{lang === 'en' ? 'Coding Skills' : 'Coding-Skills'}</button>
        </div>
      </div>

    </header>
  );
}

export default Header;
