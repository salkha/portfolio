import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="profile-pic">
          <img src={process.env.PUBLIC_URL + '/me.png'} alt="Profile Photo" />
        </div>
        <div>
          <h1>Salman Khaled Ovi</h1>
          <h2>Full Stack Developer</h2>
          <p className="subtitle">Building elegant solutions with code. Passionate about web, open source, and developer experience.</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
