import React from 'react';
import '../assets/css/Styles1.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

function Results({ onLogout }) {
  return (
    <div className="results-page-unique">
      <Header onLogout={onLogout} />

      <Footer />
    </div>
  );
}

export default Results;
