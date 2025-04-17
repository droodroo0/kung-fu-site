import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <h1>École de Kung-Fu Traditionnel</h1>
        <p>Découvrez l'art ancestral du kung-fu dans une école qui perpétue la tradition depuis plus de 30 ans</p>
        <div className="hero-buttons">
          <Link to="/inscription" className="cta-button">Commencer votre voyage</Link>
          <Link to="/programmes" className="cta-button secondary">Découvrir nos programmes</Link>
        </div>
      </section>

      <div className="content">
        <section className="features-grid">
          <div className="feature-card">
            <i className="fas fa-dragon"></i>
            <h3>Style Traditionnel</h3>
            <p>Apprentissage des formes anciennes et techniques authentiques du kung-fu traditionnel chinois.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-dumbbell"></i>
            <h3>Entraînement Complet</h3>
            <p>Développement de la force, de la souplesse et de l'équilibre à travers des exercices traditionnels.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-heart"></i>
            <h3>Bien-être Mental</h3>
            <p>Méditation et pratiques énergétiques pour harmoniser le corps et l'esprit.</p>
          </div>
        </section>

        <section className="programs-section">
          <h2>Nos Programmes</h2>
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-image-placeholder"></div>
              <h3>Programme Enfants</h3>
              <p>Initiation au kung-fu adaptée aux enfants de 6 à 12 ans</p>
              <span className="price">À partir de 150€/trimestre</span>
            </div>
            <div className="program-card">
              <div className="program-image-placeholder"></div>
              <h3>Programme Adultes</h3>
              <p>Entraînement complet pour tous les niveaux</p>
              <span className="price">À partir de 180€/trimestre</span>
            </div>
            <div className="program-card">
              <div className="program-image-placeholder"></div>
              <h3>Programme Intensif</h3>
              <p>Formation approfondie pour les pratiquants avancés</p>
              <span className="price">À partir de 250€/trimestre</span>
            </div>
          </div>
        </section>

        <section className="masters-section">
          <h2>Nos Maîtres</h2>
          <div className="masters-grid">
            <div className="master-card">
              <div className="master-image-placeholder"></div>
              <h3>Maître Chen</h3>
              <p>30 ans d'expérience en kung-fu traditionnel</p>
              <p className="specialty">Spécialité: Style du Dragon</p>
            </div>
            <div className="master-card">
              <div className="master-image-placeholder"></div>
              <h3>Maître Li</h3>
              <p>25 ans d'expérience en arts martiaux</p>
              <p className="specialty">Spécialité: Tai Chi</p>
            </div>
          </div>
        </section>

        <section className="schedule-section">
          <h2>Horaires des Cours</h2>
          <div className="schedule-grid">
            <div className="schedule-card">
              <h3>Lundi</h3>
              <ul>
                <li>9h - 10h30: Tai Chi</li>
                <li>17h - 18h: Enfants Débutants</li>
                <li>18h30 - 20h: Adultes Tous Niveaux</li>
              </ul>
            </div>
            <div className="schedule-card">
              <h3>Mercredi</h3>
              <ul>
                <li>14h - 15h: Enfants Avancés</li>
                <li>18h30 - 20h: Adultes Débutants</li>
                <li>20h - 21h30: Avancés</li>
              </ul>
            </div>
            <div className="schedule-card">
              <h3>Samedi</h3>
              <ul>
                <li>9h - 10h30: Tous Niveaux</li>
                <li>10h30 - 12h: Pratique Libre</li>
                <li>14h - 16h: Stage Mensuel</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 