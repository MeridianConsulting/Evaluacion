import React, { useState, useEffect } from 'react';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';

// Estilos para el PDF
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontSize: 12,
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
    borderBottom: '2px solid #2c5aa0',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5aa0',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
    border: '1px solid #ddd',
    borderRadius: 5,
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  sectionContent: {
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    borderBottom: '1px solid #eee',
    paddingBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    width: '40%',
    color: '#333',
  },
  value: {
    width: '60%',
    color: '#666',
  },
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  signatureSection: {
    marginTop: 30,
    border: '1px solid #ddd',
    borderRadius: 5,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  signatureBox: {
    alignItems: 'center',
    width: '45%',
  },
  signatureLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  signatureImage: {
    width: 150,
    height: 80,
    border: '1px solid #ccc',
  },
  promedio: {
    fontWeight: 'bold',
    color: '#2c5aa0',
  },
});

// Componente del documento PDF
const MyDocument = ({ evaluationData, apiUrl }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {/* Header */}
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>EVALUACIÓN DE DESEMPEÑO</Text>
        <Text style={pdfStyles.subtitle}>MERIDIAN CONSULTING LTDA</Text>
      </View>

      {/* Datos del empleado */}
      <View style={pdfStyles.section}>
        <View style={pdfStyles.sectionHeader}>
          <Text>DATOS DEL EMPLEADO</Text>
        </View>
        <View style={pdfStyles.sectionContent}>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Nombre:</Text>
            <Text style={pdfStyles.value}>{evaluationData.empleado?.nombre || 'N/A'}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Cargo:</Text>
            <Text style={pdfStyles.value}>{evaluationData.empleado?.cargo || 'N/A'}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Área:</Text>
            <Text style={pdfStyles.value}>{evaluationData.empleado?.area || 'N/A'}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Fecha de Evaluación:</Text>
            <Text style={pdfStyles.value}>
              {evaluationData.evaluacion?.fecha_evaluacion ? 
                new Date(evaluationData.evaluacion.fecha_evaluacion).toLocaleDateString('es-ES') : 'N/A'}
            </Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Período:</Text>
            <Text style={pdfStyles.value}>{evaluationData.evaluacion?.periodo_evaluacion || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Resumen de calificaciones */}
      {evaluationData.promedios && (
        <View style={pdfStyles.section}>
          <View style={pdfStyles.sectionHeader}>
            <Text>RESUMEN DE CALIFICACIONES</Text>
          </View>
          <View style={pdfStyles.sectionContent}>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Promedio Competencias:</Text>
              <Text style={pdfStyles.value}>{evaluationData.promedios.promedio_competencias || 'N/A'}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Promedio HSEQ:</Text>
              <Text style={pdfStyles.value}>{evaluationData.promedios.promedio_hseq || 'N/A'}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Promedio General:</Text>
              <Text style={pdfStyles.value}>{evaluationData.promedios.promedio_general || 'N/A'}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Competencias detalladas */}
      {evaluationData.competencias && evaluationData.competencias.length > 0 && (
        <View style={pdfStyles.section}>
          <View style={pdfStyles.sectionHeader}>
            <Text>COMPETENCIAS EVALUADAS</Text>
          </View>
          <View style={pdfStyles.sectionContent}>
            <View style={pdfStyles.table}>
              <View style={[pdfStyles.tableRow, pdfStyles.tableHeader]}>
                <Text style={pdfStyles.tableCell}>Aspecto</Text>
                <Text style={pdfStyles.tableCell}>Calificación Empleado</Text>
                <Text style={pdfStyles.tableCell}>Calificación Jefe</Text>
                <Text style={pdfStyles.tableCell}>Promedio</Text>
              </View>
              {evaluationData.competencias.map((competencia, index) => (
                <View key={index} style={pdfStyles.tableRow}>
                  <Text style={pdfStyles.tableCell}>{competencia.aspecto || 'N/A'}</Text>
                  <Text style={pdfStyles.tableCell}>{competencia.calificacion_empleado || 'N/A'}</Text>
                  <Text style={pdfStyles.tableCell}>{competencia.calificacion_jefe || 'N/A'}</Text>
                  <Text style={pdfStyles.tableCell}>{competencia.promedio || 'N/A'}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Datos HSEQ detallados */}
      {evaluationData.hseq_data && evaluationData.hseq_data.length > 0 && (
        <View style={pdfStyles.section}>
          <View style={pdfStyles.sectionHeader}>
            <Text>RESPONSABILIDADES HSEQ</Text>
          </View>
          <View style={pdfStyles.sectionContent}>
            <View style={pdfStyles.table}>
              <View style={[pdfStyles.tableRow, pdfStyles.tableHeader]}>
                <Text style={pdfStyles.tableCell}>Responsabilidad</Text>
                <Text style={pdfStyles.tableCell}>Calificación</Text>
                <Text style={pdfStyles.tableCell}>Autoevaluación</Text>
                <Text style={pdfStyles.tableCell}>Evaluación Jefe</Text>
              </View>
              {evaluationData.hseq_data.map((hseq, index) => (
                <View key={index} style={pdfStyles.tableRow}>
                  <Text style={pdfStyles.tableCell}>{hseq.responsabilidad || 'N/A'}</Text>
                  <Text style={pdfStyles.tableCell}>{hseq.calificacion || 'N/A'}</Text>
                  <Text style={pdfStyles.tableCell}>{hseq.autoevaluacion || 'N/A'}</Text>
                  <Text style={pdfStyles.tableCell}>{hseq.evaluacion_jefe || 'N/A'}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Mejoramiento y desarrollo */}
      {evaluationData.mejoramiento && (
        <View style={pdfStyles.section}>
          <View style={pdfStyles.sectionHeader}>
            <Text>MEJORAMIENTO Y DESARROLLO</Text>
          </View>
          <View style={pdfStyles.sectionContent}>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Fortalezas:</Text>
              <Text style={pdfStyles.value}>{evaluationData.mejoramiento.fortalezas || 'N/A'}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Aspectos a Mejorar:</Text>
              <Text style={pdfStyles.value}>{evaluationData.mejoramiento.aspectos_mejorar || 'N/A'}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Plan de acción */}
      {evaluationData.plan_accion && (
        <View style={pdfStyles.section}>
          <View style={pdfStyles.sectionHeader}>
            <Text>PLAN DE ACCIÓN</Text>
          </View>
          <View style={pdfStyles.sectionContent}>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Actividad:</Text>
              <Text style={pdfStyles.value}>{evaluationData.plan_accion.actividad || 'N/A'}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Responsable:</Text>
              <Text style={pdfStyles.value}>{evaluationData.plan_accion.responsable || 'N/A'}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Seguimiento:</Text>
              <Text style={pdfStyles.value}>{evaluationData.plan_accion.seguimiento || 'N/A'}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Fecha:</Text>
              <Text style={pdfStyles.value}>{evaluationData.plan_accion.fecha || 'N/A'}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Firmas */}
      <View style={pdfStyles.signatureSection}>
        <View style={pdfStyles.sectionHeader}>
          <Text>FIRMAS</Text>
        </View>
        <View style={pdfStyles.signatureRow}>
          {/* Firma del empleado */}
          <View style={pdfStyles.signatureBox}>
            <Text style={pdfStyles.signatureLabel}>Evaluado</Text>
            {evaluationData.firmas?.firma_empleado ? (
              <Image 
                src={evaluationData.firmas.firma_empleado}
                style={pdfStyles.signatureImage}
              />
            ) : (
              <Text style={pdfStyles.signatureLabel}>_________________________</Text>
            )}
          </View>

          {/* Firma del jefe */}
          <View style={pdfStyles.signatureBox}>
            <Text style={pdfStyles.signatureLabel}>Jefe Directo</Text>
            {evaluationData.firmas?.firma_jefe ? (
              <Image 
                src={evaluationData.firmas.firma_jefe}
                style={pdfStyles.signatureImage}
              />
            ) : (
              <Text style={pdfStyles.signatureLabel}>_________________________</Text>
            )}
          </View>
        </View>
        <View style={pdfStyles.sectionContent}>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Fecha:</Text>
            <Text style={pdfStyles.value}>{new Date().toLocaleDateString('es-ES')}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

function Results({ onLogout, userRole }) {
  const [evaluacionesHistoricas, setEvaluacionesHistoricas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingPDF, setGeneratingPDF] = useState(false);

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

  // Función para generar PDF con React PDF
  const generatePDF = async (evaluacion) => {
    try {
      setGeneratingPDF(true);
      
      // Obtener datos completos de la evaluación
      const employeeId = localStorage.getItem('employeeId');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/evaluations/${evaluacion.id_evaluacion}/complete/${employeeId}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener datos completos de la evaluación');
      }
      
      const responseData = await response.json();
      const evaluationData = responseData.data;
      
      // Debug: verificar datos de firmas
      console.log('Datos de firmas:', evaluationData.firmas);
      if (evaluationData.firmas?.firma_empleado) {
        console.log('Firma empleado base64 length:', evaluationData.firmas.firma_empleado.length);
        console.log('Firma empleado base64 starts with:', evaluationData.firmas.firma_empleado.substring(0, 50));
      }
      if (evaluationData.firmas?.firma_jefe) {
        console.log('Firma jefe base64 length:', evaluationData.firmas.firma_jefe.length);
        console.log('Firma jefe base64 starts with:', evaluationData.firmas.firma_jefe.substring(0, 50));
      }
      
      // Generar el PDF
      const blob = await pdf(<MyDocument evaluationData={evaluationData} apiUrl={apiUrl} />).toBlob();
      
      // Descargar el archivo usando la API nativa
      const fileName = `evaluacion_${evaluacion.id_evaluacion}_${new Date().toISOString().split('T')[0]}.pdf`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setGeneratingPDF(false);
      
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Intente nuevamente.');
      setGeneratingPDF(false);
    }
  };

  // Función para descargar PDF de evaluación (mantener compatibilidad)
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
                              onClick={() => generatePDF(evaluacion)}
                              disabled={generatingPDF}
                              title="Generar reporte en PDF con firmas"
                            >
                              {generatingPDF ? '⏳ Generando...' : '📄 Generar PDF'}
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
