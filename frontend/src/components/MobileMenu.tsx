import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`mobile-nav ${isOpen ? 'active' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Accueil</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" onClick={toggleMenu}>Connexion</Link>
            <Link to="/register" onClick={toggleMenu}>Inscription</Link>
          </>
        ) : (
          <>
            <Link to="/profile" onClick={toggleMenu}>Profil</Link>
            <button onClick={() => { onLogout(); toggleMenu(); }}>
              Déconnexion
            </button>
          </>
        )}
      </nav>
    </>
  );
};

export default MobileMenu; 