import React, { useState, useEffect } from 'react';
import '../assets/css/Styles1.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = ({ onLogout }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtenemos el ID del empleado del localStorage
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
    <div className="Profile-page-unique">
      <Header onLogout={onLogout} />
      
      <div className="profile-container">
        {loading ? (
          <p>Cargando información...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="employee-info">
            <h1>Bienvenido, {employee.nombre}</h1>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Cargo:</strong> {employee.cargo}</p>
            <p><strong>Teléfono:</strong> {employee.numero_telefonico}</p>
            {/* Agrega aquí otros campos que quieras mostrar */}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
