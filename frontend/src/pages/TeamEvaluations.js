import React, { useState, useEffect } from 'react';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNotification } from '../components/NotificationSystem';

function TeamEvaluations({ onLogout, userRole }) {
  const { info } = useNotification();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulamos la carga de los miembros del equipo
  useEffect(() => {
    // Esta sería una llamada a la API en una implementación real
    const fetchTeamMembers = () => {
      // Simulamos una respuesta de API con datos ficticios
      setTimeout(() => {
        setTeamMembers([
          { id: 1, nombre: 'Ana Gómez', cargo: 'Desarrollador Front-end', evaluacionEstado: 'Pendiente' },
          { id: 2, nombre: 'Carlos Díaz', cargo: 'Desarrollador Back-end', evaluacionEstado: 'Completada' },
          { id: 3, nombre: 'Lucía Pérez', cargo: 'Diseñador UX/UI', evaluacionEstado: 'En progreso' },
          { id: 4, nombre: 'Miguel Torres', cargo: 'QA Tester', evaluacionEstado: 'No iniciada' },
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchTeamMembers();
  }, []);

  const handleEvaluate = (employeeId) => {
    // Aquí se redigiría a la página de evaluación para el empleado específico
    info('Redirigiendo', `Redirigiendo a la evaluación del empleado con ID: ${employeeId}`);
    // En una implementación real:
    // navigate(`/evaluate-employee/${employeeId}`);
  };

  if (loading) {
    return (
      <div className="team-evaluations-page">
        <Header onLogout={onLogout} userRole={userRole} />
        <main className="team-evaluations-main">
          <div className="loading-container">
            <p>Cargando miembros del equipo...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="team-evaluations-page">
        <Header onLogout={onLogout} userRole={userRole} />
        <main className="team-evaluations-main">
          <div className="error-container">
            <p>Error: {error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="team-evaluations-page">
      <Header onLogout={onLogout} userRole={userRole} />
      
      <main className="team-evaluations-main">
        <div className="team-evaluations-container">
          <h1>Evaluaciones de Mi Equipo</h1>
          
          <div className="team-members-container">
            <table className="team-members-table">
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>Cargo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map(member => (
                  <tr key={member.id}>
                    <td>{member.nombre}</td>
                    <td>{member.cargo}</td>
                    <td>
                      <span className={`status-badge ${member.evaluacionEstado.toLowerCase().replace(' ', '-')}`}>
                        {member.evaluacionEstado}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="evaluate-button"
                        onClick={() => handleEvaluate(member.id)}
                      >
                        {member.evaluacionEstado === 'Completada' ? 'Ver evaluación' : 'Evaluar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="team-evaluations-info">
            <h2>Instrucciones para evaluación de equipo</h2>
            <p>
              Como jefe de equipo, es importante que evalúe el desempeño de cada uno de sus colaboradores. 
              Para completar el proceso de evaluación, siga estos pasos:
            </p>
            <ol>
              <li>Haga clic en el botón "Evaluar" junto al nombre de cada empleado.</li>
              <li>Complete todos los campos requeridos en el formulario de evaluación.</li>
              <li>Agregue comentarios constructivos en las secciones correspondientes.</li>
              <li>Confirme su evaluación para finalizar el proceso.</li>
            </ol>
            <p>
              <strong>Nota:</strong> Las evaluaciones completadas pueden ser revisadas pero no modificadas 
              una vez que han sido finalizadas.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default TeamEvaluations; 