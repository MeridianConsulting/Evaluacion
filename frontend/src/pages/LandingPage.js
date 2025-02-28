import React from 'react';
import '../assets/css/LandingPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="landing-page">
      <Header />

      <section className="hero">
        <h1>Evalúa y Potencia el Desempeño de tu Equipo</h1>
        <p>Optimiza el rendimiento de tus colaboradores con nuestra evaluación profesional</p>
        <button>Comenzar Evaluación</button>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
