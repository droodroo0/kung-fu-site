import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import UserProfile from './components/UserProfile';
import './App.css';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuHover = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  return (
    <header className="App-header">
      <nav className="main-nav">
        <ul className="nav-links">
          <li onMouseEnter={() => handleMenuHover('accueil')} onMouseLeave={handleMenuLeave}>
            <Link to="/">Accueil</Link>
            {activeMenu === 'accueil' && (
              <div className="submenu">
                <ul>
                  <li><Link to="/historique/kung-fu">Kung-fu</Link></li>
                  <li>
                    <Link to="/historique/club">Club</Link>
                    <ul>
                      <li><Link to="/historique/club/sections">Sections</Link></li>
                      <li><Link to="/historique/club/maitres">Maîtres</Link></li>
                      <li><Link to="/historique/club/montrelas">Montrelas Saint Sorlin</Link></li>
                      <li><Link to="/historique/club/bureaux">Bureaux</Link></li>
                      <li><Link to="/historique/club/professeurs">Professeurs et aides</Link></li>
                      <li><Link to="/historique/club/planning">Planning</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li onMouseEnter={() => handleMenuHover('grade')} onMouseLeave={handleMenuLeave}>
            <Link to="/grade">Grade</Link>
            {activeMenu === 'grade' && (
              <div className="submenu">
                <ul>
                  <li>
                    <Link to="/grade/reglements">Règlements</Link>
                    <ul>
                      <li><Link to="/grade/reglements/club">Grade club</Link></li>
                      <li><Link to="/grade/reglements/federaux">Grade fédéraux</Link></li>
                    </ul>
                  </li>
                  <li><Link to="/grade/tableaux">Tableaux</Link></li>
                  <li><Link to="/grade/commandements">Commandements</Link></li>
                  <li><Link to="/grade/videos">Vidéos suivant grade</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li onMouseEnter={() => handleMenuHover('manifestation')} onMouseLeave={handleMenuLeave}>
            <Link to="/manifestation">Manifestation</Link>
            {activeMenu === 'manifestation' && (
              <div className="submenu">
                <ul>
                  <li><Link to="/manifestation/fete-club">Fête du club</Link></li>
                  <li><Link to="/manifestation/championnats">Championnats</Link></li>
                  <li><Link to="/manifestation/calendrier">Calendrier</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li onMouseEnter={() => handleMenuHover('documents')} onMouseLeave={handleMenuLeave}>
            <Link to="/documents">Documents</Link>
            {activeMenu === 'documents' && (
              <div className="submenu">
                <ul>
                  <li><Link to="/documents/inscriptions">Documents inscriptions</Link></li>
                  <li><Link to="/documents/autres">Autres documents</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li onMouseEnter={() => handleMenuHover('galerie')} onMouseLeave={handleMenuLeave}>
            <Link to="/galerie">Galerie</Link>
            {activeMenu === 'galerie' && (
              <div className="submenu">
                <ul>
                  <li><Link to="/galerie/photos">Photos</Link></li>
                  <li><Link to="/galerie/videos">Vidéos</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li onMouseEnter={() => handleMenuHover('boutique')} onMouseLeave={handleMenuLeave}>
            <Link to="/boutique">Boutique</Link>
            {activeMenu === 'boutique' && (
              <div className="submenu">
                <ul>
                  <li><Link to="/boutique/catalogue">Boutique</Link></li>
                  <li><Link to="/boutique/commande">Bon de commande</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <Link to="/partenaire">Partenaire</Link>
          </li>
        </ul>
        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <span className="user-welcome">Bonjour, {user?.username}</span>
              <Link to="/profile" className="auth-button profile">Mon Profil</Link>
              <button onClick={logout} className="auth-button logout">Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/connexion" className="auth-button login">Connexion</Link>
              <Link to="/inscription" className="auth-button register">Inscription</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/inscription" element={<Register />} />
              <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
