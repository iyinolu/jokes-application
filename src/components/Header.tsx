import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div id="brand" className="header-brand">
        Jokes Application
      </div>
      <div id="navigation" className="header-nav-container">
        <ul className="header-nav">
          <li role="button">Home</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
