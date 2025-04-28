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

        // Llamada a la API para obtener los resultados históricos
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}/evaluaciones-historico/${employeeId}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener el historial de evaluaciones');
        }
        
        const data = await response.json();
        
        // Si hay datos, actualizar el estado
        if (data && Array.isArray(data.evaluaciones)) {
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

    // Para desarrollo, añadimos datos de muestra
    const cargarDatosDeMuestra = () => {
      // Simulamos la carga
      setTimeout(() => {
        // Datos de muestra (en producción esto vendría de la API)
        const datosEjemplo = [
          { id: 1, año: '2022', periodo: 'Anual', calificacion: 4.5, observaciones: 'Excelente desempeño en proyectos críticos' },
          { id: 2, año: '2021', periodo: 'Anual', calificacion: 4.2, observaciones: 'Buen rendimiento. Áreas de mejora: comunicación' },
          { id: 3, año: '2020', periodo: 'Anual', calificacion: 3.8, observaciones: 'Desempeño satisfactorio' }
        ];
        setEvaluacionesHistoricas(datosEjemplo);
        setLoading(false);
      }, 1000);
    };

    // En un entorno real llamaríamos a fetchResultados()
    // Para desarrollo usamos datos de muestra
    cargarDatosDeMuestra();
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

  return (
    <div className="results-page">
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
                    {renderEstrellas(evaluacionesHistoricas[0].calificacion)}
                  </span>
                </div>
                <div className="results-summary-item">
                  <span className="summary-label">Promedio histórico:</span>
                  <span className="summary-value">
                    {renderEstrellas(
                      evaluacionesHistoricas.reduce((acc, ev) => acc + ev.calificacion, 0) / 
                      evaluacionesHistoricas.length
                    )}
                  </span>
                </div>
              </div>
              
              <div className="results-table-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Año</th>
                      <th>Periodo</th>
                      <th>Calificación</th>
                      <th>Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluacionesHistoricas.map(evaluacion => (
                      <tr key={evaluacion.id}>
                        <td>{evaluacion.año}</td>
                        <td>{evaluacion.periodo}</td>
                        <td className={getColorClase(evaluacion.calificacion)}>
                          {renderEstrellas(evaluacion.calificacion)}
                        </td>
                        <td>{evaluacion.observaciones}</td>
                      </tr>
                    ))}
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
