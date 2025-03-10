import React from 'react';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Services({ onLogout }) {
  return (
    <div className="services-page">
      <Header onLogout={onLogout} />
      <main className="services-main">
        {/* Aquí puedes agregar el contenido de la página de Servicios */}
      </main>
      <Footer />
    </div>
  );
}

export default Services;
