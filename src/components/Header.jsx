import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <div className="container nav-content">
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><NavLink to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{language === 'de' ? 'Startseite' : 'Home'}</NavLink></li>
          <li><NavLink to="/skills" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{language === 'de' ? 'Fähigkeiten' : 'Skills'}</NavLink></li>
          <li><NavLink to="/download" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{language === 'de' ? 'Download' : 'Download'}</NavLink></li>
          <li><NavLink to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{language === 'de' ? 'Kontakt' : 'Contact'}</NavLink></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={toggleLanguage} className="btn btn-outline lang-btn">
            <Globe size={20} />
            <span className="lang-text">{language.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
