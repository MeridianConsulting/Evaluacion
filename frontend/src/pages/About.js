import React from 'react';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function About({ onLogout }) {
  return (
    <div className="about-page">
      <Header onLogout={onLogout} />
      <main className="about-main">
        {/* Aquí puedes agregar el contenido de la página Acerca de */}
      </main>
      <Footer />
    </div>
  );
}

export default About;
