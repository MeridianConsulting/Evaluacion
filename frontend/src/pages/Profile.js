import React from 'react';
import '../assets/css/Styles1.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ onLogout }) {
  return (
    <div className="Profile-page-unique">
      <Header onLogout={onLogout} />

      <Footer />
    </div>
  );
}

export default Profile;
