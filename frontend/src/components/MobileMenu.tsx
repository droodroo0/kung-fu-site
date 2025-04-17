import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MobileMenu.css';

interface MobileMenuProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Empêcher le défilement du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="mobile-menu-container">
      <button 
        className={`menu-button ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Menu principal"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      <nav className={`mobile-nav ${isOpen ? 'active' : ''}`}>
        <div className="mobile-nav-content">
          <Link to="/" onClick={closeMenu}>Accueil</Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={closeMenu}>Connexion</Link>
              <Link to="/register" onClick={closeMenu}>Inscription</Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={closeMenu}>Profil</Link>
              <button 
                onClick={() => { 
                  onLogout(); 
                  closeMenu(); 
                }}
                className="logout-button"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      </nav>
      {isOpen && <div className="mobile-menu-overlay" onClick={closeMenu} />}
    </div>
  );
};

export default MobileMenu; 