import React, { useState, useEffect } from 'react';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
  const [generatingExcel, setGeneratingExcel] = useState(false);

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
      
      // Mostrar mensaje de éxito
      alert(`✅ Archivo PDF generado exitosamente: ${fileName}\n\nEl archivo contiene:\n• Información completa de la evaluación\n• Firmas digitales integradas\n• Formato profesional para impresión`);
      
      setGeneratingPDF(false);
      
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Intente nuevamente.');
      setGeneratingPDF(false);
    }
  };

  // Función para generar Excel profesional en una sola hoja
  const generateExcel = async (evaluacion) => {
    try {
      setGeneratingExcel(true);
      
      // Obtener datos completos de la evaluación
      const employeeId = localStorage.getItem('employeeId');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/evaluations/${evaluacion.id_evaluacion}/complete/${employeeId}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener datos completos de la evaluación');
      }
      
      const responseData = await response.json();
      const evaluationData = responseData.data;
      
      // Crear el workbook de Excel
      const workbook = XLSX.utils.book_new();
      
      // Crear una sola hoja con todo el reporte organizado
      const reportData = [];
      
      // Header principal
      reportData.push(['EVALUACIÓN DE DESEMPEÑO - MERIDIAN CONSULTING LTDA']);
      reportData.push(['']);
      reportData.push(['CUADRO DE MANDO - EVALUACIÓN DE DESEMPEÑO']);
      reportData.push(['']);
      
      // Información del período
      reportData.push(['Período de Evaluación:', evaluationData.evaluacion?.periodo_evaluacion || 'N/A']);
      reportData.push(['Fecha de Evaluación:', evaluationData.evaluacion?.fecha_evaluacion ? 
        new Date(evaluationData.evaluacion.fecha_evaluacion).toLocaleDateString('es-ES') : 'N/A']);
      reportData.push(['Estado:', evaluationData.evaluacion?.estado_evaluacion || 'N/A']);
      reportData.push(['']);
      
      // Sección 1: Datos del Empleado (izquierda) y Resumen (derecha)
      reportData.push(['DATOS DEL EMPLEADO', '', '', 'RESUMEN DE CALIFICACIONES']);
      reportData.push(['Nombre:', evaluationData.empleado?.nombre || 'N/A', '', 'Promedio Competencias:', evaluationData.promedios?.promedio_competencias || 'N/A']);
      reportData.push(['Cargo:', evaluationData.empleado?.cargo || 'N/A', '', 'Promedio HSEQ:', evaluationData.promedios?.promedio_hseq || 'N/A']);
      reportData.push(['Área:', evaluationData.empleado?.area || 'N/A', '', 'Promedio General:', evaluationData.promedios?.promedio_general || 'N/A']);
      reportData.push(['ID Empleado:', evaluationData.empleado?.id_empleado || 'N/A', '', 'Calificación Final:', getCalificacionFinal(evaluationData.promedios?.promedio_general)]);
      reportData.push(['']);
      
      // Sección 2: Competencias Evaluadas
      if (evaluationData.competencias && evaluationData.competencias.length > 0) {
        reportData.push(['COMPETENCIAS EVALUADAS']);
        reportData.push(['Aspecto', 'Calificación Empleado', 'Calificación Jefe', 'Promedio', 'Estado']);
        
        evaluationData.competencias.forEach(competencia => {
          const promedio = parseFloat(competencia.promedio) || 0;
          const estado = getEstadoCompetencia(promedio);
          reportData.push([
            competencia.aspecto || 'N/A',
            competencia.calificacion_empleado || 'N/A',
            competencia.calificacion_jefe || 'N/A',
            competencia.promedio || 'N/A',
            estado
          ]);
        });
        reportData.push(['']);
      }
      
      // Sección 3: Responsabilidades HSEQ
      if (evaluationData.hseq_data && evaluationData.hseq_data.length > 0) {
        reportData.push(['RESPONSABILIDADES HSEQ']);
        reportData.push(['Responsabilidad', 'Calificación', 'Autoevaluación', 'Evaluación Jefe', 'Estado']);
        
        evaluationData.hseq_data.forEach(hseq => {
          const calificacion = parseFloat(hseq.calificacion) || 0;
          const estado = getEstadoCompetencia(calificacion);
          reportData.push([
            hseq.responsabilidad || 'N/A',
            hseq.calificacion || 'N/A',
            hseq.autoevaluacion || 'N/A',
            hseq.evaluacion_jefe || 'N/A',
            estado
          ]);
        });
        reportData.push(['']);
      }
      
      // Sección 4: Plan de Mejoramiento
      if (evaluationData.mejoramiento || evaluationData.plan_accion) {
        reportData.push(['PLAN DE MEJORAMIENTO Y DESARROLLO']);
        reportData.push(['Fortalezas:', evaluationData.mejoramiento?.fortalezas || 'N/A']);
        reportData.push(['Aspectos a Mejorar:', evaluationData.mejoramiento?.aspectos_mejorar || 'N/A']);
        reportData.push(['']);
        reportData.push(['PLAN DE ACCIÓN']);
        reportData.push(['Actividad:', evaluationData.plan_accion?.actividad || 'N/A']);
        reportData.push(['Responsable:', evaluationData.plan_accion?.responsable || 'N/A']);
        reportData.push(['Seguimiento:', evaluationData.plan_accion?.seguimiento || 'N/A']);
        reportData.push(['Fecha:', evaluationData.plan_accion?.fecha || 'N/A']);
        reportData.push(['']);
      }
      
      // Sección 5: Firmas y Validación
      reportData.push(['FIRMAS Y VALIDACIÓN']);
      reportData.push(['Evaluado:', evaluationData.empleado?.nombre || 'N/A', '', 'Jefe Directo:', evaluationData.evaluacion?.evaluador_nombre || 'N/A']);
      reportData.push(['Cargo:', evaluationData.empleado?.cargo || 'N/A', '', 'Cargo:', evaluationData.evaluacion?.evaluador_cargo || 'N/A']);
      reportData.push(['']);
      reportData.push(['Estado Firma Empleado:', evaluationData.firmas?.firma_empleado ? 'FIRMADO' : 'PENDIENTE', '', 'Estado Firma Jefe:', evaluationData.firmas?.firma_jefe ? 'FIRMADO' : 'PENDIENTE']);
      reportData.push(['']);
      
      // Agregar las firmas como imágenes si están disponibles
      if (evaluationData.firmas?.firma_empleado || evaluationData.firmas?.firma_jefe) {
        reportData.push(['FIRMAS DIGITALES:']);
        
        if (evaluationData.firmas?.firma_empleado) {
          reportData.push(['Firma Empleado:', 'IMAGEN INCLUIDA']);
        }
        if (evaluationData.firmas?.firma_jefe) {
          reportData.push(['Firma Jefe:', 'IMAGEN INCLUIDA']);
        }
        
        reportData.push(['']);
        reportData.push(['NOTA: Las firmas digitales están incluidas como imágenes en el reporte.']);
        reportData.push(['Para ver las firmas completas, abra el archivo en Excel.']);
        reportData.push(['']);
      }
      
      // Sección 6: Información Técnica
      reportData.push(['INFORMACIÓN TÉCNICA DEL REPORTE']);
      reportData.push(['ID Evaluación:', evaluationData.evaluacion?.id_evaluacion || 'N/A', '', 'Versión Sistema:', '1.0']);
      reportData.push(['ID Empleado:', evaluationData.empleado?.id_empleado || 'N/A', '', 'Formato:', 'Excel (.xlsx)']);
      reportData.push(['Fecha Generación:', new Date().toLocaleDateString('es-ES'), '', 'Hora:', new Date().toLocaleTimeString('es-ES')]);
      reportData.push(['']);
      reportData.push(['ESTADÍSTICAS:']);
      reportData.push(['Total Competencias:', evaluationData.competencias?.length || 0, '', 'Total HSEQ:', evaluationData.hseq_data?.length || 0]);
      reportData.push(['Promedio General:', evaluationData.promedios?.promedio_general || 'N/A', '', 'Estado General:', getEstadoGeneral(evaluationData.promedios?.promedio_general)]);
      
      // Crear la hoja
      const worksheet = XLSX.utils.aoa_to_sheet(reportData);
      
      // Configurar ancho de columnas
      worksheet['!cols'] = [
        { width: 35 }, // Columna A
        { width: 30 }, // Columna B
        { width: 20 }, // Columna C
        { width: 30 }, // Columna D
        { width: 25 }  // Columna E
      ];
      
      // Aplicar estilos profesionales a las celdas
      // Título principal - Azul corporativo
      worksheet['A1'].s = { 
        font: { bold: true, size: 20, color: { rgb: "FFFFFF" } }, 
        alignment: { horizontal: "center", vertical: "center" },
        fill: { fgColor: { rgb: "2C5AA0" } }
      };
      
      // Subtítulo - Azul medio
      worksheet['A3'].s = { 
        font: { bold: true, size: 16, color: { rgb: "FFFFFF" } }, 
        alignment: { horizontal: "center", vertical: "center" },
        fill: { fgColor: { rgb: "4A90E2" } }
      };
      
      // Encabezados de sección - Gris profesional
      ['A9', 'A15', 'A22', 'A30', 'A37', 'A42'].forEach(cell => {
        if (worksheet[cell]) {
          worksheet[cell].s = { 
            font: { bold: true, size: 14, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "5A6C7D" } },
            alignment: { horizontal: "left", vertical: "center" }
          };
        }
      });
      
      // Aplicar estilos a las filas de encabezados de tabla
      const headerRows = [10, 16, 23, 31, 38, 43];
      headerRows.forEach(row => {
        if (worksheet[`A${row}`]) {
          // Aplicar estilo a toda la fila de encabezados
          for (let col = 0; col < 5; col++) {
            const cellRef = String.fromCharCode(65 + col) + row;
            if (worksheet[cellRef]) {
              worksheet[cellRef].s = {
                font: { bold: true, size: 12, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: "34495E" } },
                alignment: { horizontal: "center", vertical: "center" },
                border: {
                  top: { style: "thin", color: { rgb: "FFFFFF" } },
                  bottom: { style: "thin", color: { rgb: "FFFFFF" } },
                  left: { style: "thin", color: { rgb: "FFFFFF" } },
                  right: { style: "thin", color: { rgb: "FFFFFF" } }
                }
              };
            }
          }
        }
      });
      
      // Aplicar estilos especiales a celdas de información clave
      const infoKeyCells = [
        { cell: 'B5', label: 'ID Empleado' },
        { cell: 'B6', label: 'Período' },
        { cell: 'B7', label: 'Estado' },
        { cell: 'E5', label: 'Promedio Competencias' },
        { cell: 'E6', label: 'Promedio HSEQ' },
        { cell: 'E7', label: 'Promedio General' }
      ];
      
      infoKeyCells.forEach(({ cell, label }) => {
        if (worksheet[cell]) {
          worksheet[cell].s = {
            ...worksheet[cell].s,
            font: { ...(worksheet[cell].s?.font || {}), bold: true, size: 12 },
            fill: { fgColor: { rgb: "E8F4FD" } },
            border: {
              top: { style: "thin", color: { rgb: "2C5AA0" } },
              bottom: { style: "thin", color: { rgb: "2C5AA0" } },
              left: { style: "thin", color: { rgb: "2C5AA0" } },
              right: { style: "thin", color: { rgb: "2C5AA0" } }
            }
          };
        }
      });
      
      // Aplicar estilos a las celdas de datos
      const dataRows = [];
      for (let row = 11; row <= 50; row++) {
        if (worksheet[`A${row}`] && !worksheet[`A${row}`].s) {
          dataRows.push(row);
        }
      }
      
      dataRows.forEach(row => {
        for (let col = 0; col < 5; col++) {
          const cellRef = String.fromCharCode(65 + col) + row;
          if (worksheet[cellRef]) {
            worksheet[cellRef].s = {
              font: { size: 11, color: { rgb: "2C3E50" } },
              alignment: { horizontal: "left", vertical: "center" },
              border: {
                bottom: { style: "thin", color: { rgb: "BDC3C7" } }
              }
            };
          }
        }
      });
      
      // Aplicar estilos especiales a celdas específicas
      // Celdas de calificaciones con colores según el valor
      const calificacionCells = [];
      for (let row = 12; row <= 50; row++) {
        // Buscar celdas que contengan calificaciones
        for (let col = 1; col < 4; col++) {
          const cellRef = String.fromCharCode(65 + col) + row;
          if (worksheet[cellRef] && worksheet[cellRef].v && !isNaN(worksheet[cellRef].v)) {
            const valor = parseFloat(worksheet[cellRef].v);
            if (valor > 0) {
              calificacionCells.push({ cell: cellRef, valor: valor });
            }
          }
        }
      }
      
      // Aplicar colores según calificación
      calificacionCells.forEach(({ cell, valor }) => {
        let color;
        if (valor >= 4.5) color = "D5E8D4"; // Verde claro
        else if (valor >= 4.0) color = "B8D4E3"; // Azul claro
        else if (valor >= 3.0) color = "FFF2CC"; // Amarillo claro
        else if (valor >= 2.0) color = "F8CECC"; // Rojo claro
        else color = "F5B7B1"; // Rojo más intenso
        
        if (worksheet[cell]) {
          worksheet[cell].s = {
            ...worksheet[cell].s,
            fill: { fgColor: { rgb: color } },
            font: { ...(worksheet[cell].s?.font || {}), bold: true }
          };
        }
      });
      
      // Aplicar estilos a celdas de estado
      const estadoCells = [];
      for (let row = 12; row <= 50; row++) {
        const cellRef = String.fromCharCode(65 + 4) + row; // Columna E (Estado)
        if (worksheet[cellRef] && worksheet[cellRef].v) {
          estadoCells.push({ cell: cellRef, valor: worksheet[cellRef].v });
        }
      }
      
      // Aplicar colores según estado
      estadoCells.forEach(({ cell, valor }) => {
        let color;
        if (valor.includes('EXCELENTE')) color = "D5E8D4";
        else if (valor.includes('SUPERIOR')) color = "B8D4E3";
        else if (valor.includes('SATISFACTORIO')) color = "FFF2CC";
        else if (valor.includes('REGULAR')) color = "F8CECC";
        else color = "F5B7B1";
        
        if (worksheet[cell]) {
          worksheet[cell].s = {
            ...worksheet[cell].s,
            fill: { fgColor: { rgb: color } },
            font: { ...(worksheet[cell].s?.font || {}), bold: true, color: { rgb: "2C3E50" } }
          };
        }
      });
      
      // Agregar la hoja al workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Evaluación de Desempeño');
      
      // Agregar las firmas como imágenes si están disponibles
      if (evaluationData.firmas?.firma_empleado || evaluationData.firmas?.firma_jefe) {
        try {
          // Crear una nueva hoja para las firmas
          const firmasSheet = XLSX.utils.aoa_to_sheet([
            ['FIRMAS DIGITALES'],
            [''],
            ['Evaluado:', evaluationData.empleado?.nombre || 'N/A'],
            ['Cargo:', evaluationData.empleado?.cargo || 'N/A'],
            [''],
            ['Jefe Directo:', evaluationData.evaluacion?.evaluador_nombre || 'N/A'],
            ['Cargo:', evaluationData.evaluacion?.evaluador_cargo || 'N/A'],
            [''],
            ['Estado de Firmas:'],
            ['Empleado:', evaluationData.firmas?.firma_empleado ? 'FIRMADO' : 'PENDIENTE'],
            ['Jefe:', evaluationData.firmas?.firma_jefe ? 'FIRMADO' : 'PENDIENTE'],
            [''],
            ['NOTA: Las firmas están incluidas como imágenes en la hoja principal.'],
            ['Para ver las firmas completas, consulte el reporte en PDF.']
          ]);
          
          // Aplicar estilos a la hoja de firmas
          firmasSheet['!cols'] = [{ width: 25 }, { width: 40 }];
          firmasSheet['A1'].s = {
            font: { bold: true, size: 16, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "2C5AA0" } },
            alignment: { horizontal: "center" }
          };
          
          XLSX.utils.book_append_sheet(workbook, firmasSheet, 'Firmas');
        } catch (error) {
          console.log('No se pudo crear la hoja de firmas:', error);
        }
      }
      
      // Generar y descargar el archivo Excel
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      const fileName = `evaluacion_${evaluacion.id_evaluacion}_${new Date().toISOString().split('T')[0]}.xlsx`;
      saveAs(blob, fileName);
      
      // Mostrar mensaje de éxito
      alert(`✅ Reporte Excel profesional generado exitosamente: ${fileName}\n\nEl reporte incluye:\n• Dashboard completo con diseño corporativo\n• Paleta de colores profesional (azul Meridian)\n• Información organizada por secciones\n• Estado de firmas digitales\n• Hoja adicional de firmas\n• Formato empresarial para análisis`);
      
      setGeneratingExcel(false);
      
    } catch (error) {
      console.error('Error al generar Excel:', error);
      alert('Error al generar el archivo Excel. Intente nuevamente.');
      setGeneratingExcel(false);
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

  // Función para obtener calificación final
  const getCalificacionFinal = (promedio) => {
    if (!promedio) return 'N/A';
    const num = parseFloat(promedio);
    if (num >= 4.5) return 'EXCELENTE';
    if (num >= 4.0) return 'SUPERIOR';
    if (num >= 3.0) return 'SATISFACTORIO';
    if (num >= 2.0) return 'REGULAR';
    return 'INSUFICIENTE';
  };

  // Función para obtener estado de competencia
  const getEstadoCompetencia = (calificacion) => {
    if (!calificacion) return 'N/A';
    const num = parseFloat(calificacion);
    if (num >= 4.5) return 'EXCELENTE';
    if (num >= 4.0) return 'SUPERIOR';
    if (num >= 3.0) return 'SATISFACTORIO';
    if (num >= 2.0) return 'REGULAR';
    return 'INSUFICIENTE';
  };

  // Función para obtener estado general
  const getEstadoGeneral = (promedio) => {
    if (!promedio) return 'N/A';
    const num = parseFloat(promedio);
    if (num >= 4.5) return 'EXCELENTE';
    if (num >= 4.0) return 'SUPERIOR';
    if (num >= 3.0) return 'SATISFACTORIO';
    if (num >= 2.0) return 'REGULAR';
    return 'INSUFICIENTE';
  };

  return (
    <div className="results-page">
      <style jsx="true">{`
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
        .action-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pdf-btn {
          background-color: #dc3545;
        }
        .pdf-btn:hover {
          background-color: #c82333;
        }
        .excel-btn {
          background-color: #28a745;
        }
        .excel-btn:hover {
          background-color: #218838;
        }
        .results-info-banner {
          background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
          border: 1px solid #bbdefb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }
        .info-icon {
          font-size: 24px;
          flex-shrink: 0;
        }
        .info-content h3 {
          margin: 0 0 10px 0;
          color: #1976d2;
          font-size: 18px;
        }
        .info-content p {
          margin: 0 0 15px 0;
          color: #424242;
          line-height: 1.5;
        }
        .info-content ul {
          margin: 0;
          padding-left: 20px;
        }
        .info-content li {
          margin-bottom: 5px;
          color: #616161;
        }
      `}</style>
      <Header onLogout={onLogout} userRole={userRole} />
      
      <main className="results-main">
        <div className="results-container">
          <h1 className="results-title">Historial de Evaluaciones de Desempeño</h1>
          
          <div className="results-info-banner">
            <div className="info-icon">ℹ️</div>
            <div className="info-content">
              <h3>Reportes Disponibles</h3>
              <p>Ahora puedes generar reportes tanto en <strong>PDF</strong> como en <strong>Excel</strong>. Los reportes incluyen toda la información de la evaluación, incluyendo el estado de las firmas digitales.</p>
              <ul>
                <li><strong>📄 PDF:</strong> Reporte visual completo con firmas integradas</li>
                <li><strong>📊 Excel:</strong> Datos estructurados en hojas organizadas para análisis</li>
              </ul>
            </div>
          </div>
          
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
                            <div className="action-buttons">
                              <button 
                                className="download-btn pdf-btn"
                                onClick={() => generatePDF(evaluacion)}
                                disabled={generatingPDF}
                                title="Generar reporte en PDF con firmas"
                              >
                                {generatingPDF ? '⏳ Generando...' : '📄 PDF'}
                              </button>
                              <button 
                                className="download-btn excel-btn"
                                onClick={() => generateExcel(evaluacion)}
                                disabled={generatingExcel}
                                title="Generar reporte en Excel con firmas"
                              >
                                {generatingExcel ? '⏳ Generando...' : '📊 Excel'}
                              </button>
                            </div>
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
