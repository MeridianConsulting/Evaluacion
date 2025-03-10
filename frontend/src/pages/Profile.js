import React, { useState, useEffect } from 'react';
import '../assets/css/Styles1.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = ({ onLogout }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const employeeId = localStorage.getItem('employeeId');
    if (!employeeId) {
      setError('No se encontró el ID del empleado.');
      setLoading(false);
      return;
    }
    
    const fetchEmployee = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}/employees/${employeeId}`);
        const data = await response.json();
        
        if (!response.ok) {
          setError(data.error || 'Error al obtener los datos del empleado.');
        } else {
          setEmployee(data);
        }
      } catch (err) {
        setError('Error en la conexión con el servidor.');
      }
      setLoading(false);
    };

    fetchEmployee();
  }, []);

  return (
    <div className="profile-page-unique">
      <Header onLogout={onLogout} />

      <div className="profile-container">
        {loading ? (
          <p className="profile-loading">Cargando información...</p>
        ) : error ? (
          <p className="profile-error">{error}</p>
        ) : (
          employee && (
            <div className="profile-card">
              <div className="profile-header">
                <h1>Bienvenido, {employee.nombre}</h1>
              </div>
              <div className="profile-details">
                <div className="profile-detail">
                  <strong>Cédula:</strong> {employee.cedula}
                </div>
                <div className="profile-detail">
                  <strong>Nombre:</strong> {employee.nombre}
                </div>
                <div className="profile-detail">
                  <strong>Cargo:</strong> {employee.cargo}
                </div>
                <div className="profile-detail">
                  <strong>Teléfono Personal:</strong> {employee.numero_telefonico}
                </div>
                <div className="profile-detail">
                  <strong>Email:</strong> {employee.email}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
