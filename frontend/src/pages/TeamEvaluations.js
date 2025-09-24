import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Styles1.css';
import '../assets/css/TeamEvaluations.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNotification } from '../components/NotificationSystem';
import SEO from '../components/SEO';

function TeamEvaluations({ onLogout, userRole }) {
  const navigate = useNavigate();
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
            // Debug temporal para ver los datos del backend
            console.log('Raw data from backend:', rows);
            
            const mapped = rows.map(r => {
              // Debug temporal para cada registro
              console.log('Processing row:', r);
              console.log('id_evaluacion:', r.id_evaluacion, 'id_empleado:', r.id_empleado);
              
              const raw = (r.estado_evaluacion || '').toString().toUpperCase();
              let display = 'Pendiente';
              
              // Mapear estados a texto más legible
              switch (raw) {
                case 'AUTOEVALUACION_PENDIENTE':
                  display = 'Pendiente Autoevaluación';
                  break;
                case 'AUTOEVALUACION_COMPLETADA':
                  display = 'Pendiente Evaluación Jefe';
                  break;
                case 'EVALUACION_JEFE_PENDIENTE':
                  display = 'Pendiente Evaluación Jefe';
                  break;
                case 'EVALUACION_JEFE_COMPLETADA':
                  display = 'Pendiente Evaluación HSEQ';
                  break;
                case 'HSEQ_PENDIENTE':
                  display = 'Pendiente Evaluación HSEQ';
                  break;
                case 'HSEQ_COMPLETADA':
                  display = 'Evaluación HSEQ Completada';
                  break;
                case 'EVALUACION_FINALIZADA':
                  display = 'Evaluación Finalizada';
                  break;
                case 'BORRADOR':
                  display = 'Borrador';
                  break;
                case 'COMPLETADA':
                  display = 'Completada';
                  break;
                case 'APROBADA':
                  display = 'Aprobada';
                  break;
                default:
                  display = raw || 'Pendiente';
              }
              
              const mappedRow = {
                id: r.id_evaluacion,
                employeeId: r.id_empleado,
                evaluationId: r.id_evaluacion,
                nombre: r.nombre,
                cargo: r.cargo,
                area: r.area,
                statusRaw: raw,
                evaluacionEstado: display,
                periodoEvaluacion: r.periodo_evaluacion,
                fechaCreacion: r.fecha_creacion
              };
              
              // Debug temporal para el objeto mapeado
              console.log('Mapped row:', mappedRow);
              
              return mappedRow;
            });
            setTeamMembers(mapped);
            setLoading(false);
            return;
          } else {
            console.error('Error al cargar evaluaciones asignadas:', resp.status, resp.statusText);
          }
        }
        // Fallback a localStorage si la API no está disponible
        const raw = currentUserId ? localStorage.getItem(`bossAssignmentsByBossId:${currentUserId}`) : null;
        const list = raw ? JSON.parse(raw) : [];
        setTeamMembers(Array.isArray(list) ? list : []);
      } catch (error) {
        console.error('Error al cargar asignaciones:', error);
        setTeamMembers([]);
        setError('Error al cargar las evaluaciones asignadas');
      } finally {
        setLoading(false);
      }
    };
    loadAssignments();
  }, []);

  const handleEvaluate = (assignment) => {
    // Debug temporal para diagnosticar el problema
    console.log('Assignment data:', assignment);
    console.log('Available fields:', Object.keys(assignment));
    
    const { employeeId, evaluationId } = assignment;
    console.log('Extracted - employeeId:', employeeId, 'evaluationId:', evaluationId);
    
    if (!employeeId || !evaluationId) {
      console.log('Missing data - employeeId:', employeeId, 'evaluationId:', evaluationId);
      return info('Datos incompletos', 'No se encontró el identificador de evaluación.');
    }
    // Navegar a la nueva ruta limpia para revisión de jefe (SPA)
    navigate(`/evaluaciones/${encodeURIComponent(employeeId)}/revision-jefe?evaluacionId=${encodeURIComponent(evaluationId)}`);
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
    <>
      <SEO 
        title="Evaluaciones del Equipo - Gestión de Evaluaciones"
        description="Gestiona las evaluaciones de tu equipo en el sistema de Meridian Consulting LTDA. Supervisa el progreso de evaluaciones, asigna tareas y revisa resultados del equipo."
        keywords="evaluaciones equipo, gestión evaluaciones, supervisión equipo, evaluación jefe, Meridian Consulting, gestión del desempeño"
        url="https://evaluacion.meridianltda.com/team-evaluations"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Evaluaciones del Equipo - Gestión de Evaluaciones",
          "description": "Página de gestión de evaluaciones del equipo en el sistema de Meridian Consulting LTDA",
          "url": "https://evaluacion.meridianltda.com/team-evaluations",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Sistema de Evaluación de Desempeño - Meridian Consulting LTDA",
            "url": "https://evaluacion.meridianltda.com"
          },
          "about": {
            "@type": "Thing",
            "name": "Gestión de Evaluaciones de Equipo"
          }
        }}
      />
      <div className="team-evaluations-page">
      <Header onLogout={onLogout} userRole={userRole} />
      
      <main className="team-evaluations-main">
        <div className="team-evaluations-container">
          <h1>Evaluaciones de Mi Equipo</h1>
          
          <div className="team-members-container">
            {teamMembers.length === 0 ? (
              <div className="no-members-message">
                <p>No tienes evaluaciones asignadas como jefe en este momento.</p>
              </div>
            ) : (
              <table className="team-members-table">
                <thead>
                  <tr>
                    <th>Empleado</th>
                    <th>Cargo</th>
                    <th>Área</th>
                    <th>Período</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map(member => (
                    <tr key={member.id}>
                      <td>{member.nombre}</td>
                      <td>{member.cargo || ''}</td>
                      <td>{member.area || ''}</td>
                      <td>{member.periodoEvaluacion || ''}</td>
                      <td>
                        <span className={`status-badge ${(member.evaluacionEstado||'pendiente').toLowerCase().replace(/\s+/g, '-')}`}>
                          {member.evaluacionEstado || 'Pendiente'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="evaluate-button"
                          onClick={() => handleEvaluate(member)}
                        >
                          {(() => {
                            const status = member.statusRaw || '';
                            if (status === 'EVALUACION_FINALIZADA' || status === 'COMPLETADA' || status === 'APROBADA') {
                              return 'Ver evaluación';
                            } else if (status === 'AUTOEVALUACION_COMPLETADA' || status === 'EVALUACION_JEFE_PENDIENTE') {
                              return 'Evaluar';
                            } else {
                              return 'Ver estado';
                            }
                          })()}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
    </>
  );
}

export default TeamEvaluations; 