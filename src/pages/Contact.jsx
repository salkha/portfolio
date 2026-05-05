import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Code, ExternalLink, Send, Copy, CheckCircle } from 'lucide-react';

const Contact = () => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const contactData = t?.contact || { contactText: '', contactLinks: [] };
  const contactLinks = contactData.contactLinks || [];
  
  const emailLink = contactLinks.find(link => link.label.toLowerCase().includes('mail'))?.url || '';
  const email = emailLink.replace('mailto:', '');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = (label) => {
    const l = label.toLowerCase();
    if (l.includes('mail')) return <Mail size={24} />;
    if (l.includes('github')) return <Code size={24} />;
    if (l.includes('linkedin')) return <ExternalLink size={24} />;
    return <Send size={24} />;
  };

  return (
    <div className="container">
      <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="section-title">{language === 'de' ? 'Lass uns vernetzen' : 'Let\'s Connect'}</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            {contactData.contactText}
          </p>
        </motion.div>

        <div style={{ width: '100%', maxWidth: '800px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {/* Email Action Card */}
          <motion.div 
            className="glass card"
            whileHover={{ scale: 1.02 }}
            style={{ padding: '2.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ background: 'var(--primary-glow)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Mail color="white" size={24} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Email</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{email}</p>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a href={emailLink} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem' }}>
                {language === 'de' ? 'Schreiben' : 'Message'}
              </a>
              <button 
                onClick={copyToClipboard} 
                className="btn btn-outline" 
                style={{ padding: '0.75rem', borderColor: copied ? 'var(--secondary)' : 'var(--glass-border)' }}
              >
                {copied ? <CheckCircle size={18} color="#27c93f" /> : <Copy size={18} />}
              </button>
            </div>
          </motion.div>

          {/* Social Links Cards */}
          {contactLinks.filter(link => !link.label.toLowerCase().includes('mail')).map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass card"
              whileHover={{ scale: 1.02, y: -5 }}
              style={{ padding: '2.5rem', textAlign: 'center', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{ background: idx === 0 ? 'rgba(6, 182, 212, 0.2)' : 'rgba(139, 92, 246, 0.2)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <span style={{ color: idx === 0 ? 'var(--secondary)' : 'var(--primary)' }}>{getIcon(link.label)}</span>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{link.label}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                {language === 'de' ? 'Besuche mein Profil' : 'Visit my profile'}
              </p>
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ marginTop: '5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f', boxShadow: '0 0 10px #27c93f' }}></div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>
            {language === 'de' ? 'Verfügbar für neue Möglichkeiten' : 'Available for new opportunities'}
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
