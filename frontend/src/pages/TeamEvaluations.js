import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Styles1.css';
import '../assets/css/TeamEvaluations.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNotification } from '../components/NotificationSystem';
import SEO from '../components/SEO';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// ===================== Estilos PDF =====================
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
  tableCellSm: { 
    flex: 1, 
    paddingHorizontal: 6, 
    textAlign: 'center' 
  },
  tableCellAspect: { 
    flex: 2.2, 
    paddingHorizontal: 6, 
    textAlign: 'left' 
  },
  tableCellObs: { 
    flex: 2.6, 
    paddingHorizontal: 6, 
    textAlign: 'left', 
    lineHeight: 1.2 
  },
  qualitativeSection: {
    marginBottom: 20,
    border: '1px solid #2c5aa0',
    borderRadius: 5,
    backgroundColor: '#f8f9fa',
  },
  qualitativeHeader: {
    backgroundColor: '#2c5aa0',
    padding: 12,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    borderBottom: '2px solid #1a3d6b',
  },
  qualitativeContent: {
    padding: 15,
    backgroundColor: '#ffffff',
  },
  qualitativeRow: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottom: '1px solid #e0e0e0',
  },
  qualitativeLabel: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#2c5aa0',
    marginBottom: 5,
  },
  qualitativeValue: {
    fontSize: 10,
    color: '#333',
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  compromisoItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f7ff',
    borderLeft: '4px solid #2c5aa0',
    borderRadius: 3,
  },
  compromisoCriterio: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#1a3d6b',
    marginBottom: 5,
  },
  compromisoTexto: {
    fontSize: 10,
    color: '#333',
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  fullWidthRow: {
    flexDirection: 'column',
    marginBottom: 12,
  },
});

// ===================== PDF Component =====================
const MyDocument = ({ evaluationData }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={pdfStyles.page} wrap>
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>EVALUACIÓN DE DESEMPEÑO</Text>
        <Text style={pdfStyles.subtitle}>MERIDIAN CONSULTING LTDA</Text>
      </View>

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
              {evaluationData.evaluacion?.fecha_evaluacion
                ? new Date(evaluationData.evaluacion.fecha_evaluacion).toLocaleDateString('es-ES')
                : 'N/A'}
            </Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Período:</Text>
            <Text style={pdfStyles.value}>{evaluationData.evaluacion?.periodo_evaluacion || 'N/A'}</Text>
          </View>
        </View>
      </View>

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

      {evaluationData.competencias && evaluationData.competencias.length > 0 && (
        <View style={pdfStyles.section}>
          <View style={pdfStyles.sectionHeader}>
            <Text>COMPETENCIAS EVALUADAS</Text>
          </View>
          <View style={pdfStyles.sectionContent}>
            <View style={pdfStyles.table}>
              <View style={[pdfStyles.tableRow, pdfStyles.tableHeader]}>
                <Text style={pdfStyles.tableCellAspect}>Aspecto</Text>
                <Text style={pdfStyles.tableCellSm}>Trabajador</Text>
                <Text style={pdfStyles.tableCellObs}>Justificación Empleado</Text>
                <Text style={pdfStyles.tableCellSm}>Jefe</Text>
                <Text style={pdfStyles.tableCellObs}>Justificación Jefe</Text>
                <Text style={pdfStyles.tableCellSm}>Promedio</Text>
              </View>
              {evaluationData.competencias.map((c, idx) => (
                <View key={idx} style={pdfStyles.tableRow}>
                  <Text style={pdfStyles.tableCellAspect}>{c.aspecto || 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{c.calificacion_empleado ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellObs}>{c.justificacion_empleado || 'Sin justificación'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{c.calificacion_jefe ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellObs}>{c.justificacion_jefe || 'Sin justificación'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{c.promedio ?? 'N/A'}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* ===================== SECCIÓN: COMPETENCIAS CUALITATIVAS ===================== */}
      {evaluationData.competencias && evaluationData.competencias.length > 0 && 
       evaluationData.competencias.some(c => (c.justificacion_empleado && c.justificacion_empleado.trim()) || 
                                             (c.justificacion_jefe && c.justificacion_jefe.trim())) && (
        <View style={pdfStyles.qualitativeSection}>
          <View style={pdfStyles.qualitativeHeader}>
            <Text>COMPETENCIAS CUALITATIVAS - JUSTIFICACIONES Y OBSERVACIONES</Text>
          </View>
          <View style={pdfStyles.qualitativeContent}>
            {evaluationData.competencias
              .filter(c => (c.justificacion_empleado && c.justificacion_empleado.trim()) || 
                          (c.justificacion_jefe && c.justificacion_jefe.trim()))
              .map((c, idx) => (
                <View key={idx} style={pdfStyles.compromisoItem}>
                  <Text style={pdfStyles.compromisoCriterio}>
                    {c.aspecto || `Competencia ${idx + 1}`}
                  </Text>
                  {(c.justificacion_empleado && c.justificacion_empleado.trim()) && (
                    <View style={pdfStyles.fullWidthRow}>
                      <Text style={pdfStyles.qualitativeLabel}>Justificación del Trabajador:</Text>
                      <Text style={pdfStyles.qualitativeValue}>{c.justificacion_empleado}</Text>
                    </View>
                  )}
                  {(c.justificacion_jefe && c.justificacion_jefe.trim()) && (
                    <View style={pdfStyles.fullWidthRow}>
                      <Text style={pdfStyles.qualitativeLabel}>Justificación del Jefe:</Text>
                      <Text style={pdfStyles.qualitativeValue}>{c.justificacion_jefe}</Text>
                    </View>
                  )}
                </View>
              ))}
          </View>
        </View>
      )}

      {/* ===================== SECCIÓN: ACTA DE COMPROMISO ===================== */}
      {evaluationData.acta_compromiso && Array.isArray(evaluationData.acta_compromiso) && 
       evaluationData.acta_compromiso.length > 0 && (
        <View style={pdfStyles.qualitativeSection}>
          <View style={pdfStyles.qualitativeHeader}>
            <Text>ACTA DE COMPROMISO</Text>
          </View>
          <View style={pdfStyles.qualitativeContent}>
            {evaluationData.acta_compromiso.map((compromiso, idx) => (
              <View key={idx} style={pdfStyles.compromisoItem}>
                <Text style={pdfStyles.compromisoCriterio}>
                  Compromiso {idx + 1}: {compromiso.criterio || 'Sin criterio especificado'}
                </Text>
                <Text style={pdfStyles.compromisoTexto}>
                  {compromiso.compromiso || 'Sin compromiso especificado'}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* ===================== SECCIÓN: MEJORAMIENTO Y DESARROLLO ===================== */}
      {evaluationData.mejoramiento && (
        <View style={pdfStyles.qualitativeSection}>
          <View style={pdfStyles.qualitativeHeader}>
            <Text>MEJORAMIENTO Y DESARROLLO</Text>
          </View>
          <View style={pdfStyles.qualitativeContent}>
            {(evaluationData.mejoramiento.fortalezas && evaluationData.mejoramiento.fortalezas.trim()) && (
              <View style={pdfStyles.qualitativeRow}>
                <Text style={pdfStyles.qualitativeLabel}>Fortalezas Identificadas:</Text>
                <Text style={pdfStyles.qualitativeValue}>
                  {evaluationData.mejoramiento.fortalezas}
                </Text>
              </View>
            )}
            {(evaluationData.mejoramiento.aspectos_mejorar && evaluationData.mejoramiento.aspectos_mejorar.trim()) && (
              <View style={pdfStyles.qualitativeRow}>
                <Text style={pdfStyles.qualitativeLabel}>Aspectos a Mejorar:</Text>
                <Text style={pdfStyles.qualitativeValue}>
                  {evaluationData.mejoramiento.aspectos_mejorar}
                </Text>
              </View>
            )}
            {(evaluationData.mejoramiento.necesidades_capacitacion && evaluationData.mejoramiento.necesidades_capacitacion.trim()) && (
              <View style={pdfStyles.qualitativeRow}>
                <Text style={pdfStyles.qualitativeLabel}>Necesidades de Capacitación:</Text>
                <Text style={pdfStyles.qualitativeValue}>
                  {evaluationData.mejoramiento.necesidades_capacitacion}
                </Text>
              </View>
            )}
            {(evaluationData.mejoramiento.comentarios_jefe && evaluationData.mejoramiento.comentarios_jefe.trim()) && (
              <View style={pdfStyles.qualitativeRow}>
                <Text style={pdfStyles.qualitativeLabel}>Comentarios del Jefe Directo:</Text>
                <Text style={pdfStyles.qualitativeValue}>
                  {evaluationData.mejoramiento.comentarios_jefe}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* ===================== SECCIÓN: PLAN DE ACCIÓN ===================== */}
      {evaluationData.plan_accion && (
        <View style={pdfStyles.qualitativeSection}>
          <View style={pdfStyles.qualitativeHeader}>
            <Text>PLAN DE ACCIÓN</Text>
          </View>
          <View style={pdfStyles.qualitativeContent}>
            {(evaluationData.plan_accion.actividad && evaluationData.plan_accion.actividad.trim()) && (
              <View style={pdfStyles.qualitativeRow}>
                <Text style={pdfStyles.qualitativeLabel}>Actividad Planificada:</Text>
                <Text style={pdfStyles.qualitativeValue}>
                  {evaluationData.plan_accion.actividad}
                </Text>
              </View>
            )}
            {(evaluationData.plan_accion.responsable && evaluationData.plan_accion.responsable.trim()) && (
              <View style={pdfStyles.qualitativeRow}>
                <Text style={pdfStyles.qualitativeLabel}>Responsable:</Text>
                <Text style={pdfStyles.qualitativeValue}>
                  {evaluationData.plan_accion.responsable}
                </Text>
              </View>
            )}
            {(evaluationData.plan_accion.seguimiento && evaluationData.plan_accion.seguimiento.trim()) && (
              <View style={pdfStyles.qualitativeRow}>
                <Text style={pdfStyles.qualitativeLabel}>Seguimiento:</Text>
                <Text style={pdfStyles.qualitativeValue}>
                  {evaluationData.plan_accion.seguimiento}
                </Text>
              </View>
            )}
            {(evaluationData.plan_accion.fecha && evaluationData.plan_accion.fecha.trim()) && (
              <View style={pdfStyles.qualitativeRow}>
                <Text style={pdfStyles.qualitativeLabel}>Fecha Establecida:</Text>
                <Text style={pdfStyles.qualitativeValue}>
                  {evaluationData.plan_accion.fecha}
                </Text>
              </View>
            )}
            {(evaluationData.plan_accion.comentarios_jefe && evaluationData.plan_accion.comentarios_jefe.trim()) && (
              <View style={pdfStyles.qualitativeRow}>
                <Text style={pdfStyles.qualitativeLabel}>Comentarios del Jefe Directo:</Text>
                <Text style={pdfStyles.qualitativeValue}>
                  {evaluationData.plan_accion.comentarios_jefe}
                </Text>
              </View>
            )}
            {evaluationData.plan_accion.aprobado_jefe && (
              <View style={pdfStyles.qualitativeRow}>
                <Text style={pdfStyles.qualitativeLabel}>Estado de Aprobación:</Text>
                <Text style={pdfStyles.qualitativeValue}>
                  {evaluationData.plan_accion.aprobado_jefe === '1' || evaluationData.plan_accion.aprobado_jefe === 1 
                    ? 'Aprobado' 
                    : evaluationData.plan_accion.aprobado_jefe === '0' || evaluationData.plan_accion.aprobado_jefe === 0
                    ? 'Pendiente'
                    : String(evaluationData.plan_accion.aprobado_jefe)}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      <View style={pdfStyles.signatureSection}>
        <View style={pdfStyles.sectionHeader}>
          <Text>FIRMAS</Text>
        </View>
        <View style={pdfStyles.signatureRow}>
          <View style={pdfStyles.signatureBox}>
            <Text style={pdfStyles.signatureLabel}>Evaluado</Text>
            {evaluationData.firmas?.firma_empleado && evaluationData.firmas.firma_empleado.length > 100 ? (
              <Image 
                src={evaluationData.firmas.firma_empleado} 
                style={pdfStyles.signatureImage}
                onError={() => {}}
              />
            ) : (
              <Text style={pdfStyles.signatureLabel}>Firma no registrada</Text>
            )}
          </View>
          <View style={pdfStyles.signatureBox}>
            <Text style={pdfStyles.signatureLabel}>Jefe Directo</Text>
            {evaluationData.firmas?.firma_jefe && evaluationData.firmas.firma_jefe.length > 100 ? (
              <Image 
                src={evaluationData.firmas.firma_jefe} 
                style={pdfStyles.signatureImage}
                onError={() => {}}
              />
            ) : (
              <Text style={pdfStyles.signatureLabel}>Firma no registrada</Text>
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

function TeamEvaluations({ onLogout, userRole }) {
  const navigate = useNavigate();
  const { info, success, error: showError } = useNotification();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [generatingExcel, setGeneratingExcel] = useState(false);

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
            
            const mapped = rows.map(r => {
              
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
              
              
              return mappedRow;
            });
            setTeamMembers(mapped);
            setLoading(false);
            return;
          } else {
          }
        }
        // Fallback a localStorage si la API no está disponible
        const raw = currentUserId ? localStorage.getItem(`bossAssignmentsByBossId:${currentUserId}`) : null;
        const list = raw ? JSON.parse(raw) : [];
        setTeamMembers(Array.isArray(list) ? list : []);
      } catch (error) {
        setTeamMembers([]);
        setError('Error al cargar las evaluaciones asignadas');
      } finally {
        setLoading(false);
      }
    };
    loadAssignments();
  }, []);

  const handleEvaluate = (assignment) => {
    const { employeeId, evaluationId } = assignment;
    
    if (!employeeId || evaluationId === null || evaluationId === undefined) {
      return info('Datos incompletos', 'No se encontró el identificador de evaluación.');
    }
    // Navegar a la nueva ruta limpia para revisión de jefe (SPA)
    navigate(`/evaluaciones/${encodeURIComponent(employeeId)}/revision-jefe?evaluacionId=${encodeURIComponent(evaluationId)}`);
  };

  // ===================== Funciones de generación de reportes =====================
  const generatePDF = async (evaluacion) => {
    try {
      setGeneratingPDF(true);
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/evaluations/${evaluacion.id}/complete/${evaluacion.employeeId}`);
      if (!response.ok) throw new Error('Error al obtener datos completos de la evaluación');
      const { data: evaluationData } = await response.json();
      
      // Limpiar y validar las firmas antes de generar el PDF
      if (evaluationData.firmas && !Array.isArray(evaluationData.firmas)) {
        // Asegurar que las firmas tengan el formato correcto
        if (evaluationData.firmas.firma_empleado && !evaluationData.firmas.firma_empleado.startsWith('data:image')) {
          evaluationData.firmas.firma_empleado = `data:image/png;base64,${evaluationData.firmas.firma_empleado}`;
        }
        if (evaluationData.firmas.firma_jefe && !evaluationData.firmas.firma_jefe.startsWith('data:image')) {
          evaluationData.firmas.firma_jefe = `data:image/png;base64,${evaluationData.firmas.firma_jefe}`;
        }
      } else {
        // Si no hay firmas o es un array, inicializar objeto vacío
        evaluationData.firmas = {
          firma_empleado: null,
          firma_jefe: null
        };
      }
      
      const blob = await pdf(<MyDocument evaluationData={evaluationData} />).toBlob();

      const fileName = `evaluacion_${evaluacion.id}_${new Date().toISOString().split('T')[0]}.pdf`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      success('PDF generado', `Archivo PDF generado exitosamente: ${fileName}`);
    } catch (error) {
      showError('Error al generar PDF', 'Error al generar el PDF. Intente nuevamente.');
    } finally {
      setGeneratingPDF(false);
    }
  };

  const generateExcel = async (evaluacion) => {
    try {
      setGeneratingExcel(true);

      // ----- Fetch datos completos
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const resp = await fetch(`${apiUrl}/api/evaluations/${evaluacion.id}/complete/${evaluacion.employeeId}`);
      if (!resp.ok) throw new Error('Error al obtener datos completos de la evaluación');
      const responseData = await resp.json();
      const { data: evaluationData } = responseData;

      // ---------- Paleta y helpers
      const PALETTE = {
        blue: '184C8C',
        text: '2B2B2B',
        bg: 'F5F6F8',
        border: 'DADFE5',
        zebra: 'FAFBFC',
        heat: { green: 'D5E8D4', yellow: 'FFF2CC', red: 'F8CECC' },
        status: { SUPERIOR: '2E7D32', SATISFACTORIO: '1976D2', REGULAR: 'F9A825', INSUFICIENTE: 'C62828', EXCELENTE: '2E7D32' }
      };

      const FONT_TITLE = { name: 'Calibri', size: 20, bold: true, color: { argb: 'FFFFFFFF' } };
      const FONT_SUB   = { name: 'Calibri', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
      const FONT_BODY  = { name: 'Calibri', size: 11, color: { argb: 'FF' + PALETTE.text } };
      const ONE_DEC = '0.0';
      const dash = (v) => (v === undefined || v === null || v === '' || v === 'N/A' || v === 'null') ? '—' : v;
      const numOrBlank = (v) => Number.isFinite(parseFloat(v)) ? parseFloat(v) : null;

      const estadoPorValor = (n) => {
        const v = parseFloat(n || 0);
        if (v >= 4.5) return 'EXCELENTE';
        if (v >= 4.0) return 'SUPERIOR';
        if (v >= 3.0) return 'SATISFACTORIO';
        if (v >= 2.0) return 'REGULAR';
        return 'INSUFICIENTE';
      };

      const applyEstadoChip = (cell, estado) => {
        const MAP = { EXCELENTE:'Excelente', SUPERIOR:'Superior', SATISFACTORIO:'Satisfactorio', REGULAR:'Regular', INSUFICIENTE:'Insuficiente' };
        const text = MAP[estado] ?? dash(estado);
        const color = PALETTE.status[estado] || PALETTE.text;
        cell.value = { richText: [{ text: ` ${text} `, font: { name: 'Calibri', bold: true, color: { argb: 'FF' + color } } }] };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.bg } };
        cell.border = { top:{style:'thin',color:{argb:PALETTE.border}}, left:{style:'thin',color:{argb:PALETTE.border}},
                        bottom:{style:'thin',color:{argb:PALETTE.border}}, right:{style:'thin',color:{argb:PALETTE.border}} };
      };

      const heatFill = (val) => {
        const v = parseFloat(val);
        if (!Number.isFinite(v)) return null;
        if (v >= 4.5) return PALETTE.heat.green;
        if (v >= 3.0) return PALETTE.heat.yellow;
        return PALETTE.heat.red;
      };

      // ---------- Workbook
      const wb = new ExcelJS.Workbook();
      wb.created = new Date();
      wb.properties.title = `Evaluación ${evaluacion.id}`;
      wb.properties.company = 'Meridian Consulting LTDA';

      // ---------- Hoja
      const ws = wb.addWorksheet('Evaluación de Desempeño', {
        pageSetup: {
          paperSize: 9, orientation: 'portrait', fitToPage: true,
          margins: { left: 0.6, right: 0.6, top: 0.8, bottom: 0.8, header: 0.3, footer: 0.3 }
        }
      });

      // 8 columnas
      ws.columns = [
        { key: 'A', width: 30 }, { key: 'B', width: 15 },
        { key: 'C', width: 40 }, { key: 'D', width: 15 },
        { key: 'E', width: 40 }, { key: 'F', width: 15 },
        { key: 'G', width: 15 }, { key: 'H', width: 15 },
      ];

      // ---------- Encabezado
      ws.mergeCells('A1:H1');
      const cTitle = ws.getCell('A1');
      cTitle.value = 'EVALUACIÓN DE DESEMPEÑO – MERIDIAN CONSULTING LTDA';
      cTitle.font = FONT_TITLE; cTitle.alignment = { horizontal: 'center', vertical: 'middle' };
      cTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.blue } };
      ws.addRow([]);

      ws.mergeCells('A3:D3');
      ws.getCell('A3').value = `Período: ${dash(evaluationData.evaluacion?.periodo_evaluacion)}`;
      ws.getCell('A3').font = FONT_BODY;

      ws.mergeCells('E3:H3');
      const st = estadoPorValor(evaluationData.promedios?.promedio_general);
      const estadoCell = ws.getCell('D3'); estadoCell.font = FONT_BODY;
      applyEstadoChip(estadoCell, st);

      ws.addRow([]);

      // ---------- Datos del empleado
      const addSectionHeader = (title) => {
        const r = ws.addRow([title]); ws.mergeCells(`A${r.number}:H${r.number}`);
        const c = ws.getCell(`A${r.number}`);
        c.font = FONT_SUB; c.alignment = { horizontal: 'left', vertical: 'middle' };
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4B5A6B' } };
        return r.number;
      };
      addSectionHeader('DATOS DEL EMPLEADO');

      const putPair = (lA, vA, lB, vB) => {
        const r = ws.addRow([lA, dash(vA), null, lB, dash(vB), null, null, null]);
        ws.mergeCells(`B${r.number}:C${r.number}`);
        ws.mergeCells(`E${r.number}:F${r.number}`);
        r.getCell(1).font = { name: 'Calibri', bold: true, color: { argb: 'FF2B2B2B' } };
        r.getCell(4).font = { name: 'Calibri', bold: true, color: { argb: 'FF2B2B2B' } };
        r.eachCell(cell => {
          cell.font = cell.font || { name: 'Calibri', size: 11, color: { argb: 'FF2B2B2B' } };
          cell.border = { bottom: { style: 'thin', color: { argb: PALETTE.border } } };
          cell.alignment = { vertical: 'middle' };
        });
      };
      
      // Datos del empleado
      putPair('Nombre:', evaluationData.empleado?.nombre || 'N/A', 'Cédula:', evaluationData.empleado?.cedula || 'N/A');
      putPair('Cargo:', evaluationData.empleado?.cargo || 'N/A', 'Área:', evaluationData.empleado?.area || 'N/A');
      putPair('ID Empleado:', evaluationData.empleado?.id_empleado || 'N/A', 'Tipo Documento:', evaluationData.empleado?.tipo_documento || 'N/A');
      putPair('Email:', evaluationData.empleado?.email || 'N/A', 'Fecha Inicio Contrato:', evaluationData.empleado?.fecha_inicio_contrato ? new Date(evaluationData.empleado.fecha_inicio_contrato).toLocaleDateString('es-ES') : 'N/A');
      putPair('Proyecto:', evaluationData.empleado?.proyecto || 'N/A', 'ODS:', evaluationData.empleado?.ods || 'N/A');
      
      // Datos de la evaluación
      putPair('Fecha evaluación:', evaluationData.evaluacion?.fecha_evaluacion ? new Date(evaluationData.evaluacion.fecha_evaluacion).toLocaleDateString('es-ES') : 'N/A',
              'Período:', evaluationData.evaluacion?.periodo_evaluacion || 'N/A');
      putPair('Estado evaluación:', evaluationData.evaluacion?.estado_evaluacion || 'N/A', 'ID Evaluación:', evaluationData.evaluacion?.id_evaluacion || 'N/A');
      ws.addRow([]);

      // ---------- Competencias
      addSectionHeader('RESULTADOS POR COMPETENCIA');
      const hdrComp = ws.addRow(['Aspecto', 'Empleado', 'Justificación Empleado', 'Jefe', 'Justificación Jefe', 'Promedio', 'Estado']);
      hdrComp.eachCell((c, i) => {
        if (i<=7) {
          c.font = { name:'Calibri', bold:true, color:{ argb:'FFFFFFFF' } };
          c.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:'FF34495E' } };
          c.alignment = { horizontal:'center', vertical:'middle', wrapText: i===3 || i===5 };
        }
      });
      const headerCompRow = hdrComp.number;

      let zebra = false;
      (evaluationData.competencias || []).forEach(item => {
        zebra = !zebra;
        const emp = numOrBlank(item.calificacion_empleado);
        const jef = numOrBlank(item.calificacion_jefe);
        const pro = numOrBlank(item.promedio);
        const est = estadoPorValor(pro);
        const justEmp = item.justificacion_empleado || '';
        const justJefe = item.justificacion_jefe || '';

        const r = ws.addRow([dash(item.aspecto), emp, justEmp, jef, justJefe, pro, '', '']);
        r.eachCell((cell, col) => {
          cell.font = FONT_BODY;
          cell.border = { bottom:{ style:'thin', color:{ argb:PALETTE.border } } };
          cell.alignment = { vertical:'middle', wrapText: col===3 || col===5, horizontal: (col===2 || col===4 || col===6) ? 'right' : (col===7 ? 'center' : 'left') };
          if (zebra && col !== 6) cell.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:PALETTE.zebra } };
        });
        // formato 1 decimal
        ['B','D','F'].forEach(col => { const c = ws.getCell(`${col}${r.number}`); if (c.value !== null) c.numFmt = ONE_DEC; });
        // heat ONLY in Promedio
        const fCell = ws.getCell(`F${r.number}`); const hf = heatFill(fCell.value); if (hf) fCell.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:hf } };
        // chip de estado
        applyEstadoChip(ws.getCell(`G${r.number}`), est);
        // auto altura segun justificaciones
        const justLen = Math.max((`${justEmp}` || '').length, (`${justJefe}` || '').length);
        if (justLen > 80) r.height = Math.min(140, 18 + Math.ceil(justLen/70)*14);
      });
      ws.addRow([]);

      // ---------- Firmas
      addSectionHeader('FIRMAS');
      ws.addRow(['Evaluado:', dash(evaluationData.empleado?.nombre), '', 'Jefe Directo:', dash(evaluationData.evaluacion?.evaluador_nombre || ''), '', '', '']);
      ws.addRow(['Cargo:', dash(evaluationData.empleado?.cargo), '', 'Cargo:', dash(evaluationData.evaluacion?.evaluador_cargo || ''), '', '', '']);
      ws.addRow(['Firma del Empleado:', '', '', 'Firma del Jefe:', '', '', '', '']);
      for (let i = 0; i < 6; i++) ws.addRow(['', '', '', '', '', '', '', '']);

      const toDataUrl = (b64) => !b64 ? null : (b64.startsWith('data:image') ? b64 : `data:image/png;base64,${b64}`);
      const empDataUrl = toDataUrl(evaluationData.firmas?.firma_empleado);
      const jefeDataUrl = toDataUrl(evaluationData.firmas?.firma_jefe);
      const firmaAnchorRow = ws.lastRow.number - 5;
      if (empDataUrl) {
        const imgId = wb.addImage({ base64: empDataUrl, extension: 'png' });
        ws.addImage(imgId, { tl: { col: 1, row: firmaAnchorRow }, ext: { width: 220, height: 80 }, editAs: 'oneCell' });
      }
      if (jefeDataUrl) {
        const imgId = wb.addImage({ base64: jefeDataUrl, extension: 'png' });
        ws.addImage(imgId, { tl: { col: 5, row: firmaAnchorRow }, ext: { width: 220, height: 80 }, editAs: 'oneCell' });
      }
      ws.addRow([]);

      // ---------- Guardar
      const buf = await wb.xlsx.writeBuffer({ useStyles: true, useSharedStrings: true });
      const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileName = `evaluacion_${evaluacion.id}_${new Date().toISOString().split('T')[0]}.xlsx`;
      saveAs(blob, fileName);
      success('Excel generado', `Reporte Excel generado: ${fileName}`);
    } catch (e) {
      showError('Error al generar Excel', 'Error al generar el archivo Excel. Intente nuevamente.');
    } finally {
      setGeneratingExcel(false);
    }
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
                        <div className="action-buttons">
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
                          
                          {/* Botones de descarga disponibles para todas las evaluaciones */}
                          <div className="download-buttons">
                            <button 
                              className="download-btn pdf-btn" 
                              onClick={() => generatePDF(member)} 
                              disabled={generatingPDF} 
                              title="Generar PDF"
                            >
                              {generatingPDF ? '⏳' : '📄 PDF'}
                            </button>
                            <button 
                              className="download-btn excel-btn" 
                              onClick={() => generateExcel(member)} 
                              disabled={generatingExcel} 
                              title="Generar Excel"
                            >
                              {generatingExcel ? '⏳' : '📊 Excel'}
                            </button>
                          </div>
                        </div>
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