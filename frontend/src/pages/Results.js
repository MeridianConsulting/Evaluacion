import React, { useState, useEffect } from 'react';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Results({ onLogout, userRole }) {
  const [evaluacionesHistoricas, setEvaluacionesHistoricas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        // Obtener el ID del empleado del localStorage
        const employeeId = localStorage.getItem('employeeId');
        if (!employeeId) {
          setError('No se encontró el ID del empleado.');
          setLoading(false);
          return;
        }

        // Llamada a la API para obtener las evaluaciones del empleado
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}/api/evaluations/employee/${employeeId}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener el historial de evaluaciones');
        }
        
        const data = await response.json();
        
        // Si hay datos, actualizar el estado
        if (data.success && Array.isArray(data.evaluaciones)) {
          setEvaluacionesHistoricas(data.evaluaciones);
        } else {
          // Si no hay datos, establecer un array vacío
          setEvaluacionesHistoricas([]);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Error al cargar el historial de evaluaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
  }, []);

  // Función para mostrar estrellas según la calificación
  const renderEstrellas = (calificacion) => {
    const estrellas = [];
    const calificacionRedondeada = Math.round(calificacion * 2) / 2; // Redondear a 0.5
    
    for (let i = 1; i <= 5; i++) {
      if (i <= calificacionRedondeada) {
        // Estrella completa
        estrellas.push(<span key={i} className="estrella completa">★</span>);
      } else if (i - 0.5 === calificacionRedondeada) {
        // Media estrella
        estrellas.push(<span key={i} className="estrella media">★</span>);
      } else {
        // Estrella vacía
        estrellas.push(<span key={i} className="estrella vacia">☆</span>);
      }
    }
    
    return (
      <div className="estrellas-container">
        {estrellas} <span className="calificacion-numerica">({calificacion})</span>
      </div>
    );
  };

  // Función para obtener color según calificación
  const getColorClase = (calificacion) => {
    if (calificacion >= 4.5) return 'calificacion-excelente';
    if (calificacion >= 4.0) return 'calificacion-buena';
    if (calificacion >= 3.0) return 'calificacion-satisfactoria';
    if (calificacion >= 2.0) return 'calificacion-regular';
    return 'calificacion-baja';
  };

  // Función para descargar PDF de evaluación
  const downloadPDF = async (evaluationId) => {
    try {
      const employeeId = localStorage.getItem('employeeId');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      
      // Abrir en nueva ventana para descarga
      const downloadUrl = `${apiUrl}/api/evaluations/${evaluationId}/pdf/${employeeId}`;
      window.open(downloadUrl, '_blank');
      
    } catch (error) {
      console.error('Error al descargar PDF:', error);
      alert('Error al descargar el reporte. Intente nuevamente.');
    }
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="results-page">
      <style jsx>{`
        .estado-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .estado-completada {
          background-color: #d4edda;
          color: #155724;
        }
        .estado-borrador {
          background-color: #fff3cd;
          color: #856404;
        }
        .estado-aprobada {
          background-color: #cce5ff;
          color: #004085;
        }
        .download-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: background-color 0.3s;
        }
        .download-btn:hover {
          background-color: #0056b3;
        }
        .download-btn:active {
          transform: translateY(1px);
        }
      `}</style>
      <Header onLogout={onLogout} userRole={userRole} />
      
      <main className="results-main">
        <div className="results-container">
          <h1 className="results-title">Historial de Evaluaciones de Desempeño</h1>
          
          {loading ? (
            <div className="results-loading">
              <p>Cargando historial de evaluaciones...</p>
            </div>
          ) : error ? (
            <div className="results-error">
              <p>{error}</p>
            </div>
          ) : evaluacionesHistoricas.length === 0 ? (
            <div className="results-empty">
              <div className="results-empty-icon">📊</div>
              <h2>No hay evaluaciones disponibles</h2>
              <p>Aún no se han registrado evaluaciones de desempeño en el sistema.</p>
            </div>
          ) : (
            <div className="results-historico">
              <div className="results-summary">
                <div className="results-summary-item">
                  <span className="summary-label">Evaluaciones totales:</span>
                  <span className="summary-value">{evaluacionesHistoricas.length}</span>
                </div>
                <div className="results-summary-item">
                  <span className="summary-label">Última calificación:</span>
                  <span className="summary-value">
                    {evaluacionesHistoricas[0]?.promedios?.promedio_general ? 
                      renderEstrellas(parseFloat(evaluacionesHistoricas[0].promedios.promedio_general)) : 
                      'N/A'
                    }
                  </span>
                </div>
                <div className="results-summary-item">
                  <span className="summary-label">Promedio histórico:</span>
                  <span className="summary-value">
                    {evaluacionesHistoricas.length > 0 ? 
                      renderEstrellas(
                        evaluacionesHistoricas.reduce((acc, ev) => 
                          acc + (ev.promedios?.promedio_general ? parseFloat(ev.promedios.promedio_general) : 0), 0
                        ) / evaluacionesHistoricas.length
                      ) : 
                      'N/A'
                    }
                  </span>
                </div>
              </div>
              
              <div className="results-table-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Período</th>
                      <th>Estado</th>
                      <th>Promedio General</th>
                      <th>Promedio Competencias</th>
                      <th>Promedio HSEQ</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluacionesHistoricas.map(evaluacion => {
                      const promedioGeneral = evaluacion.promedios?.promedio_general ? parseFloat(evaluacion.promedios.promedio_general) : 0;
                      const promedioCompetencias = evaluacion.promedios?.promedio_competencias ? parseFloat(evaluacion.promedios.promedio_competencias) : 0;
                      const promedioHseq = evaluacion.promedios?.promedio_hseq ? parseFloat(evaluacion.promedios.promedio_hseq) : 0;
                      
                      return (
                        <tr key={evaluacion.id_evaluacion}>
                          <td>{formatDate(evaluacion.fecha_evaluacion)}</td>
                          <td>{evaluacion.periodo_evaluacion || 'N/A'}</td>
                          <td>
                            <span className={`estado-badge estado-${evaluacion.estado_evaluacion?.toLowerCase()}`}>
                              {evaluacion.estado_evaluacion}
                            </span>
                          </td>
                          <td className={getColorClase(promedioGeneral)}>
                            {promedioGeneral > 0 ? renderEstrellas(promedioGeneral) : 'N/A'}
                          </td>
                          <td className={getColorClase(promedioCompetencias)}>
                            {promedioCompetencias > 0 ? promedioCompetencias.toFixed(2) : 'N/A'}
                          </td>
                          <td className={getColorClase(promedioHseq)}>
                            {promedioHseq > 0 ? promedioHseq.toFixed(2) : 'N/A'}
                          </td>
                          <td>
                            <button 
                              className="download-btn"
                              onClick={() => downloadPDF(evaluacion.id_evaluacion)}
                              title="Descargar reporte en PDF"
                            >
                              📄 Descargar PDF
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="results-info">
                <h3>Interpretación de resultados</h3>
                <ul>
                  <li><span className="calificacion-excelente dot"></span> 4.5 - 5.0: Desempeño excepcional</li>
                  <li><span className="calificacion-buena dot"></span> 4.0 - 4.4: Desempeño superior al esperado</li>
                  <li><span className="calificacion-satisfactoria dot"></span> 3.0 - 3.9: Desempeño esperado</li>
                  <li><span className="calificacion-regular dot"></span> 2.0 - 2.9: Desempeño por debajo de lo esperado</li>
                  <li><span className="calificacion-baja dot"></span> 0.0 - 1.9: Desempeño insuficiente</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Results;
