import React from 'react';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LandingPage({ onLogout }) {
  return (
    <div className="landing-page">
      <Header onLogout={onLogout} />

      <section className="hero">
        <h1>Evaluación de Desempeño</h1>
        <p>Descubre tu potencial con nuestra evaluación de desempeño.</p>
        <button>Comenzar Evaluación</button>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
