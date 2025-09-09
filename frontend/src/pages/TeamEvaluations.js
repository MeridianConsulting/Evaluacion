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

  // Cargar asignaciones donde soy jefe inmediato: ahora desde API (fallback a localStorage)
  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const currentUserId = localStorage.getItem('employeeId');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        if (currentUserId && apiUrl) {
          const resp = await fetch(`${apiUrl}/api/evaluations/assigned/${currentUserId}`);
          if (resp.ok) {
            const json = await resp.json();
            const rows = (json && (json.data || json.evaluaciones)) || [];
            const mapped = rows.map(r => ({
              id: r.id_evaluacion,
              employeeId: r.id_empleado,
              evaluationId: r.id_evaluacion,
              nombre: r.nombre,
              cargo: r.cargo,
              evaluacionEstado: r.estado_evaluacion || 'Pendiente'
            }));
            setTeamMembers(mapped);
            setLoading(false);
            return;
          }
        }
        // Fallback a localStorage si la API no está disponible
        const raw = currentUserId ? localStorage.getItem(`bossAssignmentsByBossId:${currentUserId}`) : null;
        const list = raw ? JSON.parse(raw) : [];
        setTeamMembers(Array.isArray(list) ? list : []);
      } catch (_) {
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };
    loadAssignments();
  }, []);

  const handleEvaluate = (assignment) => {
    const { employeeId, evaluationId } = assignment;
    if (!employeeId || !evaluationId) {
      return info('Datos incompletos', 'No se encontró el identificador de evaluación.');
    }
    // Configurar modo jefe y employeeId en localStorage
    localStorage.setItem('evalMode', 'manager');
    localStorage.setItem('employeeId', String(employeeId));
    // Abrir evaluación en modo jefe (página dedicada)
    window.location.href = `/performance-evaluation-boss?as=manager&eid=${encodeURIComponent(evaluationId)}&empId=${encodeURIComponent(employeeId)}`;
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
                    <td>{member.cargo || ''}</td>
                    <td>
                      <span className={`status-badge ${(member.evaluacionEstado||'pendiente').toLowerCase().replace(' ', '-')}`}>
                        {member.evaluacionEstado || 'Pendiente'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="evaluate-button"
                        onClick={() => handleEvaluate(member)}
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