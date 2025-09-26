import React, { useState, useEffect } from 'react';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useNotification } from '../components/NotificationSystem';
import SEO from '../components/SEO';

// ==== Helpers UI (KPI, Collapsible, Timeline) ====
const KPI = ({ label, value, chip }) => (
  <div className="kpi-card">
    <div className="kpi-value">{value ?? '—'}</div>
    <div className="kpi-footer">
      <span className="kpi-label">{label}</span>
      {chip ? <span className={`chip chip-${chip.toLowerCase()}`}>{chip}</span> : null}
    </div>
  </div>
);

const Collapsible = ({ title, children, defaultOpen=false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card-collapsible">
      <button className="collapsible-head" onClick={() => setOpen(v=>!v)} aria-expanded={open}>
        <span>{title}</span>
        <span className={`caret ${open ? 'up' : 'down'}`} />
      </button>
      {open && <div className="collapsible-body">{children}</div>}
    </div>
  );
};

const Timeline3Steps = ({ estado }) => {
  // Estados: pendiente / en_progreso / completada (derivados de tu map existente)
  const mapa = {
    pendiente: 0, en_progreso: 1, completada: 2, finalizada: 2,
    'estado-pendiente': 0, 'estado-progreso': 1, 'estado-completada': 2, 'estado-finalizada': 2
  };
  const step = mapa[estado] ?? 0;
  const items = [
    { t:'Autoevaluación', w:'20%' },
    { t:'Evaluación Jefe', w:'40%' },
    { t:'Evaluación HSEQ', w:'40%' },
  ];
  return (
    <div className="timeline3">
      {items.map((it, i) => (
        <div key={it.t} className={`tl-item ${i<=step?'done':''}`}>
          <div className="tl-dot" />
          <div className="tl-meta">
            <div className="tl-title">{it.t}</div>
            <div className="tl-weight">{it.w}</div>
          </div>
          {i<items.length-1 && <div className={`tl-line ${i<step?'done':''}`} />}
        </div>
      ))}
    </div>
  );
};

// ===================== Estilos PDF (SIN CAMBIOS) =====================
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
});

// Devuelve la observación/justificación del ítem o 'N/A'
const getObs = (obj) =>
  obj?.observaciones ??
  obj?.observacion ??
  obj?.justificacion ??
  obj?.comentario ??
  'N/A';

// ===================== PDF Component Reporte Consolidado =====================
const ConsolidatedReportDocument = ({ evaluationData }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>REPORTE CONSOLIDADO DE EVALUACIÓN</Text>
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
            <Text style={pdfStyles.label}>Período de Evaluación:</Text>
            <Text style={pdfStyles.value}>{evaluationData.evaluacion?.periodo_evaluacion || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Resumen de Calificaciones por Componente */}
      <View style={pdfStyles.section}>
        <View style={pdfStyles.sectionHeader}>
          <Text>RESUMEN DE CALIFICACIONES POR COMPONENTE</Text>
        </View>
        <View style={pdfStyles.sectionContent}>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Autoevaluación (20%):</Text>
            <Text style={[pdfStyles.value, pdfStyles.promedio]}>
              {evaluationData.promedios?.promedio_autoevaluacion || 'N/A'}
            </Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Evaluación del Jefe (40%):</Text>
            <Text style={[pdfStyles.value, pdfStyles.promedio]}>
              {evaluationData.promedios?.promedio_evaluacion_jefe || 'N/A'}
            </Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Evaluación HSEQ (40%):</Text>
            <Text style={[pdfStyles.value, pdfStyles.promedio]}>
              {evaluationData.promedios?.promedio_hseq || 'N/A'}
            </Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Calificación Final Ponderada:</Text>
            <Text style={[pdfStyles.value, pdfStyles.promedio]}>
              {(() => {
                const auto = evaluationData.promedios?.promedio_autoevaluacion ? parseFloat(evaluationData.promedios.promedio_autoevaluacion) : 0;
                const jefe = evaluationData.promedios?.promedio_evaluacion_jefe ? parseFloat(evaluationData.promedios.promedio_evaluacion_jefe) : 0;
                const hseq = evaluationData.promedios?.promedio_hseq ? parseFloat(evaluationData.promedios.promedio_hseq) : 0;
                
                if (auto > 0 && jefe > 0 && hseq > 0) {
                  const calificacionFinal = (auto * 0.20) + (jefe * 0.40) + (hseq * 0.40);
                  return Math.round(calificacionFinal * 10) / 10;
                }
                return 'N/A';
              })()}
            </Text>
          </View>
        </View>
      </View>

      {/* Detalle de Competencias */}
      {evaluationData.competencias && evaluationData.competencias.length > 0 && (
        <View style={pdfStyles.section}>
          <View style={pdfStyles.sectionHeader}>
            <Text>DETALLE DE COMPETENCIAS</Text>
          </View>
          <View style={pdfStyles.sectionContent}>
            <View style={pdfStyles.table}>
              <View style={[pdfStyles.tableRow, pdfStyles.tableHeader]}>
                <Text style={pdfStyles.tableCellAspect}>Competencia</Text>
                <Text style={pdfStyles.tableCellSm}>Autoeval.</Text>
                <Text style={pdfStyles.tableCellSm}>Jefe</Text>
                <Text style={pdfStyles.tableCellSm}>Promedio</Text>
              </View>
              {evaluationData.competencias.map((c, idx) => (
                <View key={idx} style={pdfStyles.tableRow}>
                  <Text style={pdfStyles.tableCellAspect}>{c.aspecto || 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{c.calificacion_empleado ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{c.calificacion_jefe ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{c.promedio ?? 'N/A'}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Detalle de HSEQ */}
      <View style={pdfStyles.section}>
        <View style={pdfStyles.sectionHeader}>
          <Text>DETALLE DE RESPONSABILIDADES HSEQ</Text>
        </View>
        <View style={pdfStyles.sectionContent}>
          {evaluationData.hseq_data && evaluationData.hseq_data.length > 0 ? (
            <View style={pdfStyles.table}>
              <View style={[pdfStyles.tableRow, pdfStyles.tableHeader]}>
                <Text style={pdfStyles.tableCellAspect}>Responsabilidad</Text>
                <Text style={pdfStyles.tableCellSm}>Calificación</Text>
                <Text style={pdfStyles.tableCellObs}>Observaciones</Text>
              </View>
              {evaluationData.hseq_data.map((h, idx) => (
                <View key={idx} style={pdfStyles.tableRow}>
                  <Text style={pdfStyles.tableCellAspect}>{h.responsabilidad || 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{h.calificacion ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellObs}>{getObs(h)}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={{ padding: '20px', textAlign: 'center' }}>
              <Text style={{ color: '#666', fontSize: '12px' }}>
                No se encontraron datos de evaluación HSEQ para este período.
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Fórmula de Cálculo */}
      <View style={pdfStyles.section}>
        <View style={pdfStyles.sectionHeader}>
          <Text>FÓRMULA DE CÁLCULO</Text>
        </View>
        <View style={pdfStyles.sectionContent}>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Fórmula:</Text>
            <Text style={pdfStyles.value}>Calificación Final = (Autoevaluación × 0.20) + (Evaluación Jefe × 0.40) + (Evaluación HSEQ × 0.40)</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Pesos:</Text>
            <Text style={pdfStyles.value}>Autoevaluación: 20% | Evaluación del Jefe: 40% | Evaluación HSEQ: 40%</Text>
          </View>
        </View>
      </View>

      {/* Firmas */}
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
                onError={() => console.log('Error cargando firma empleado')}
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
                onError={() => console.log('Error cargando firma empleado')}
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

// ===================== PDF Component (SIN CAMBIOS) =====================
const MyDocument = ({ evaluationData }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={pdfStyles.page}>
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
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Observaciones Generales:</Text>
            <Text style={pdfStyles.value}>{evaluationData.evaluacion?.observaciones_generales || 'N/A'}</Text>
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
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Calificación Final Ponderada:</Text>
              <Text style={[pdfStyles.value, pdfStyles.promedio]}>
                {(() => {
                  // Calcular calificación final ponderada para el PDF
                  const promedioCompetencias = evaluationData.promedios?.promedio_competencias ? parseFloat(evaluationData.promedios.promedio_competencias) : 0;
                  const promedioHseq = evaluationData.promedios?.promedio_hseq ? parseFloat(evaluationData.promedios.promedio_hseq) : 0;
                  
                  if (promedioCompetencias > 0 && promedioHseq > 0) {
                    // Aproximación: usar el promedio de competencias para autoevaluación y jefe
                    const promedioAutoevaluacion = promedioCompetencias;
                    const promedioJefe = promedioCompetencias;
                    
                    const calificacionFinal = (promedioAutoevaluacion * 0.20) + (promedioJefe * 0.40) + (promedioHseq * 0.40);
                    return Math.round(calificacionFinal * 10) / 10;
                  }
                  return 'N/A';
                })()}
              </Text>
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
                <Text style={pdfStyles.tableCellSm}>Jefe</Text>
                <Text style={pdfStyles.tableCellSm}>Promedio</Text>
              </View>
              {evaluationData.competencias.map((c, idx) => (
                <View key={idx} style={pdfStyles.tableRow}>
                  <Text style={pdfStyles.tableCellAspect}>{c.aspecto || 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{c.calificacion_empleado ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{c.calificacion_jefe ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{c.promedio ?? 'N/A'}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}


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
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Comentarios del Jefe:</Text>
              <Text style={pdfStyles.value}>{evaluationData.mejoramiento.comentarios_jefe || 'N/A'}</Text>
            </View>
          </View>
        </View>
      )}

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
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Comentarios del Jefe:</Text>
              <Text style={pdfStyles.value}>{evaluationData.plan_accion.comentarios_jefe || 'N/A'}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Estado:</Text>
              <Text style={pdfStyles.value}>{evaluationData.plan_accion.aprobado_jefe || 'N/A'}</Text>
            </View>
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
                onError={() => console.log('Error cargando firma empleado')}
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
                onError={() => console.log('Error cargando firma empleado')}
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

// Helper: asegura prefijo data URL
const toDataUrl = (b64) => {
  if (!b64) return null;
  return b64.startsWith('data:image') ? b64 : `data:image/png;base64,${b64}`;
};

function Results({ onLogout, userRole }) {
  const { success, error: showError } = useNotification();
  const [evaluacionesHistoricas, setEvaluacionesHistoricas] = useState([]);
  const [evaluacionesHseq, setEvaluacionesHseq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [generatingExcel, setGeneratingExcel] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // ==== Filtros ====
  const [filterPeriodo, setFilterPeriodo] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  // Catálogos a partir de datos
  const periodos = Array.from(new Set(evaluacionesHistoricas.map(e => e?.periodo_evaluacion).filter(Boolean)));
  const estados = Array.from(new Set(evaluacionesHistoricas.map(e => e?.estado_evaluacion).filter(Boolean)));

  // Normalizador para búsqueda simple
  const includes = (txt, q) => String(txt||'').toLowerCase().includes(String(q||'').toLowerCase());

  // Lista filtrada
  const evaluacionesFiltradas = evaluacionesHistoricas.filter(e => {
    if (filterPeriodo && e?.periodo_evaluacion !== filterPeriodo) return false;
    if (filterEstado && e?.estado_evaluacion !== filterEstado) return false;
    if (filterQuery && !(includes(e?.periodo_evaluacion, filterQuery) || includes(e?.fecha_evaluacion, filterQuery))) return false;
    return true;
  });

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const employeeId = localStorage.getItem('employeeId');
        if (!employeeId) {
          setError('No se encontró el ID del empleado.');
          setLoading(false);
          return;
        }
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        
        // Obtener evaluaciones de competencias
        const response = await fetch(`${apiUrl}/api/evaluations/employee/${employeeId}`);
        if (!response.ok) throw new Error('Error al obtener el historial de evaluaciones');
        const data = await response.json();
        
        const evaluaciones = data.success && Array.isArray(data.evaluaciones) ? data.evaluaciones : [];
        setEvaluacionesHistoricas(evaluaciones);

        // Obtener todas las evaluaciones HSEQ del empleado
        try {
          const hseqResponse = await fetch(`${apiUrl}/api/evaluations/hseq/employee/${employeeId}`);
          if (hseqResponse.ok) {
            const hseqData = await hseqResponse.json();
            if (hseqData.success && Array.isArray(hseqData.data)) {
              setEvaluacionesHseq(hseqData.data);
            }
          }
        } catch (hseqErr) {
          // No es crítico si falla la consulta HSEQ
        }
      } catch (err) {
        setError('Error al cargar el historial de evaluaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
    
    // Refrescar cada 30 segundos para capturar cambios desde la base de datos
    const interval = setInterval(fetchResultados, 30000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Función para refrescar manualmente desde la base de datos
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const employeeId = localStorage.getItem('employeeId');
      if (!employeeId) {
        setError('No se encontró el ID del empleado.');
        return;
      }
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      
      // Obtener evaluaciones de competencias
      const response = await fetch(`${apiUrl}/api/evaluations/employee/${employeeId}`);
      if (!response.ok) throw new Error('Error al obtener el historial de evaluaciones');
      const data = await response.json();
      
      const evaluaciones = data.success && Array.isArray(data.evaluaciones) ? data.evaluaciones : [];
      setEvaluacionesHistoricas(evaluaciones);

      // Obtener todas las evaluaciones HSEQ del empleado
      try {
        const hseqResponse = await fetch(`${apiUrl}/api/evaluations/hseq/employee/${employeeId}`);
        if (hseqResponse.ok) {
          const hseqData = await hseqResponse.json();
          if (hseqData.success && Array.isArray(hseqData.data)) {
            setEvaluacionesHseq(hseqData.data);
          }
        }
      } catch (hseqErr) {
        // No es crítico si falla la consulta HSEQ
      }
      
      success('Datos actualizados', 'El historial de evaluaciones se ha actualizado desde la base de datos.');
    } catch (err) {
      showError('Error al actualizar', 'Error al actualizar el historial de evaluaciones');
    } finally {
      setRefreshing(false);
    }
  };


  // UI helpers
  const renderEstrellas = (calificacion) => {
    const estrellas = [];
    const calificacionRedondeada = Math.round(calificacion * 2) / 2;
    for (let i = 1; i <= 5; i++) {
      if (i <= calificacionRedondeada) {
        estrellas.push(<span key={i} className="estrella completa">★</span>);
      } else if (i - 0.5 === calificacionRedondeada) {
        estrellas.push(<span key={i} className="estrella media">★</span>);
      } else {
        estrellas.push(<span key={i} className="estrella vacia">☆</span>);
      }
    }
    return <div className="estrellas-container">{estrellas} <span className="calificacion-numerica">({calificacion})</span></div>;
  };

  const getColorClase = (calificacion) => {
    if (calificacion >= 4.5) return 'calificacion-excelente';
    if (calificacion >= 4.0) return 'calificacion-buena';
    if (calificacion >= 3.0) return 'calificacion-satisfactoria';
    if (calificacion >= 2.0) return 'calificacion-regular';
    return 'calificacion-baja';
  };

  // ===================== PDF Reporte Consolidado =====================
  const generateConsolidatedPDF = async (evaluacion) => {
    try {
      setGeneratingPDF(true);
      const employeeId = localStorage.getItem('employeeId');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      
      // Obtener datos completos de la evaluación
      const response = await fetch(`${apiUrl}/api/evaluations/${evaluacion.id_evaluacion}/complete/${employeeId}`);
      if (!response.ok) throw new Error('Error al obtener datos completos de la evaluación');
      const { data: evaluationData } = await response.json();
      
      // Debug: Verificar que las firmas se están obteniendo
      console.log('Datos de evaluación obtenidos:', evaluationData);
      console.log('Firmas obtenidas:', evaluationData.firmas);
      
      // Calcular promedios de autoevaluación y evaluación del jefe desde las competencias
      let promedioAutoevaluacion = 0;
      let promedioEvaluacionJefe = 0;
      let promedioHseq = 0;
      
      if (evaluationData.competencias && evaluationData.competencias.length > 0) {
        const competencias = evaluationData.competencias;
        let sumaAutoevaluacion = 0;
        let sumaJefe = 0;
        let countAutoevaluacion = 0;
        let countJefe = 0;
        
        competencias.forEach(comp => {
          if (comp.calificacion_empleado && !isNaN(parseFloat(comp.calificacion_empleado))) {
            sumaAutoevaluacion += parseFloat(comp.calificacion_empleado);
            countAutoevaluacion++;
          }
          if (comp.calificacion_jefe && !isNaN(parseFloat(comp.calificacion_jefe))) {
            sumaJefe += parseFloat(comp.calificacion_jefe);
            countJefe++;
          }
        });
        
        promedioAutoevaluacion = countAutoevaluacion > 0 ? Math.round((sumaAutoevaluacion / countAutoevaluacion) * 10) / 10 : 0;
        promedioEvaluacionJefe = countJefe > 0 ? Math.round((sumaJefe / countJefe) * 10) / 10 : 0;
      }
      
      // Obtener datos detallados de HSEQ desde las evaluaciones HSEQ del empleado
      let hseqData = [];
      try {
        const hseqResponse = await fetch(`${apiUrl}/api/evaluations/hseq/employee/${employeeId}`);
        if (hseqResponse.ok) {
          const hseqResponseData = await hseqResponse.json();
          
          if (hseqResponseData.success && Array.isArray(hseqResponseData.data)) {
            
            // Buscar la evaluación HSEQ correspondiente al período de la evaluación actual
            let hseqEval = hseqResponseData.data.find(h => h.periodo_evaluacion === evaluacion.periodo_evaluacion);
            
            // Si no se encuentra para el período exacto, buscar la más reciente
            if (!hseqEval && hseqResponseData.data.length > 0) {
              hseqEval = hseqResponseData.data[0]; // La más reciente (ya están ordenadas por fecha DESC)
            }
            
            if (hseqEval) {
              if (hseqEval.promedio_hseq) {
                promedioHseq = parseFloat(hseqEval.promedio_hseq);
              }
              // Obtener los datos detallados de HSEQ usando el ID de la evaluación
              if (hseqEval.id_hseq_evaluacion) {
                try {
                  const hseqDetailResponse = await fetch(`${apiUrl}/api/evaluations/hseq/${hseqEval.id_hseq_evaluacion}`);
                  if (hseqDetailResponse.ok) {
                    const hseqDetailData = await hseqDetailResponse.json();
                    
                    if (hseqDetailData.success && hseqDetailData.data && hseqDetailData.data.criterios) {
                      hseqData = hseqDetailData.data.criterios;
                    }
                  } else {
                  }
                } catch (hseqDetailErr) {
                  // Error obteniendo detalles HSEQ
                }
              }
            } else {
            }
          } else {
          }
        } else {
        }
      } catch (hseqErr) {
        // Error obteniendo datos HSEQ
      }
      
      // Asegurar que las firmas estén disponibles y sean un objeto
      if (!evaluationData.firmas || Array.isArray(evaluationData.firmas)) {
        evaluationData.firmas = {
          firma_empleado: null,
          firma_jefe: null
        };
      }

      // Agregar los promedios calculados al objeto de datos
      const evaluationDataWithCalculated = {
        ...evaluationData,
        promedios: {
          ...evaluationData.promedios,
          promedio_autoevaluacion: promedioAutoevaluacion,
          promedio_evaluacion_jefe: promedioEvaluacionJefe,
          promedio_hseq: promedioHseq
        },
        hseq_data: hseqData,
        firmas: evaluationData.firmas // Asegurar que las firmas se mantengan
      };
      
      
      // Debug: Verificar las firmas antes de generar PDF
      console.log('Firmas antes de generar PDF:', evaluationDataWithCalculated.firmas);
      console.log('Firma empleado en PDF:', evaluationDataWithCalculated.firmas?.firma_empleado ? 'Sí' : 'No');
      console.log('Firma jefe en PDF:', evaluationDataWithCalculated.firmas?.firma_jefe ? 'Sí' : 'No');
      console.log('Tipo de firmas:', typeof evaluationDataWithCalculated.firmas);
      console.log('Es array:', Array.isArray(evaluationDataWithCalculated.firmas));
      
      // Generar PDF del reporte consolidado
      const blob = await pdf(<ConsolidatedReportDocument evaluationData={evaluationDataWithCalculated} />).toBlob();

      const fileName = `reporte_consolidado_${evaluacion.id_evaluacion}_${new Date().toISOString().split('T')[0]}.pdf`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      success('PDF consolidado generado', `Reporte consolidado PDF generado exitosamente: ${fileName}`);
    } catch (error) {
      showError('Error al generar PDF consolidado', 'Error al generar el reporte consolidado PDF. Intente nuevamente.');
    } finally {
      setGeneratingPDF(false);
    }
  };

  // ===================== PDF (SIN CAMBIOS) =====================
  const generatePDF = async (evaluacion) => {
    try {
      setGeneratingPDF(true);
      const employeeId = localStorage.getItem('employeeId');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/evaluations/${evaluacion.id_evaluacion}/complete/${employeeId}`);
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

      const fileName = `evaluacion_${evaluacion.id_evaluacion}_${new Date().toISOString().split('T')[0]}.pdf`;
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

  // ===================== EXCEL (mejorado AA + chips + zebra + heatmap) =====================
// ========= NUEVA FUNCIÓN generateExcel (estructura + AA + KPIs + chips + zebra + heatmap + pie) =========
const generateExcel = async (evaluacion) => {
  try {
    setGeneratingExcel(true);

    // ----- Fetch datos completos
    const employeeId = localStorage.getItem('employeeId');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const resp = await fetch(`${apiUrl}/api/evaluations/${evaluacion.id_evaluacion}/complete/${employeeId}`);
    if (!resp.ok) throw new Error('Error al obtener datos completos de la evaluación');
    const responseData = await resp.json();
    const { data: evaluationData } = responseData;

    // ---------- Paleta AA y helpers
    const PALETTE = {
      blue: '184C8C',           // azul corporativo
      text: '2B2B2B',           // gris oscuro texto
      bg: 'F5F6F8',             // neutro fondo
      border: 'DADFE5',         // bordes sutiles
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

    const normalizeObs = (obj) =>
      obj?.observaciones ?? obj?.observacion ?? obj?.justificacion ?? obj?.comentario ?? obj?.nota ?? '';

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

    // Calcular promedios de autoevaluación y evaluación del jefe desde las competencias
    let promedioAutoevaluacion = 0;
    let promedioEvaluacionJefe = 0;
    let promedioHseq = 0;
    
    if (evaluationData.competencias && evaluationData.competencias.length > 0) {
      const competencias = evaluationData.competencias;
      let sumaAutoevaluacion = 0;
      let sumaJefe = 0;
      let countAutoevaluacion = 0;
      let countJefe = 0;
      
      competencias.forEach(comp => {
        if (comp.calificacion_empleado && !isNaN(parseFloat(comp.calificacion_empleado))) {
          sumaAutoevaluacion += parseFloat(comp.calificacion_empleado);
          countAutoevaluacion++;
        }
        if (comp.calificacion_jefe && !isNaN(parseFloat(comp.calificacion_jefe))) {
          sumaJefe += parseFloat(comp.calificacion_jefe);
          countJefe++;
        }
      });
      
      promedioAutoevaluacion = countAutoevaluacion > 0 ? Math.round((sumaAutoevaluacion / countAutoevaluacion) * 10) / 10 : 0;
      promedioEvaluacionJefe = countJefe > 0 ? Math.round((sumaJefe / countJefe) * 10) / 10 : 0;
    }
    
    // Obtener datos detallados de HSEQ desde las evaluaciones HSEQ del empleado
    let hseqData = [];
    try {
      const hseqResponse = await fetch(`${apiUrl}/api/evaluations/hseq/employee/${employeeId}`);
      if (hseqResponse.ok) {
        const hseqResponseData = await hseqResponse.json();
        
        if (hseqResponseData.success && Array.isArray(hseqResponseData.data)) {
          
          // Buscar la evaluación HSEQ correspondiente al período de la evaluación actual
          let hseqEval = hseqResponseData.data.find(h => h.periodo_evaluacion === evaluacion.periodo_evaluacion);
          
          // Si no se encuentra para el período exacto, buscar la más reciente
          if (!hseqEval && hseqResponseData.data.length > 0) {
            hseqEval = hseqResponseData.data[0]; // La más reciente (ya están ordenadas por fecha DESC)
          }
          
          if (hseqEval) {
            if (hseqEval.promedio_hseq) {
              promedioHseq = parseFloat(hseqEval.promedio_hseq);
            }
            // Obtener los datos detallados de HSEQ usando el ID de la evaluación
            if (hseqEval.id_hseq_evaluacion) {
              try {
                const hseqDetailResponse = await fetch(`${apiUrl}/api/evaluations/hseq/${hseqEval.id_hseq_evaluacion}`);
                if (hseqDetailResponse.ok) {
                  const hseqDetailData = await hseqDetailResponse.json();
                  
                  if (hseqDetailData.success && hseqDetailData.data && hseqDetailData.data.criterios) {
                    hseqData = hseqDetailData.data.criterios;
                  }
                } else {
                  // Error obteniendo detalles HSEQ
                }
              } catch (detailErr) {
                // Error en request de detalles HSEQ
              }
            } else {
            }
          } else {
          }
        } else {
        }
      }
    } catch (hseqErr) {
      // Error obteniendo datos HSEQ
    }

    // Agregar los promedios calculados al objeto de datos
    const evaluationDataWithCalculated = {
      ...evaluationData,
      promedios: {
        ...evaluationData.promedios,
        promedio_autoevaluacion: promedioAutoevaluacion,
        promedio_evaluacion_jefe: promedioEvaluacionJefe,
        promedio_hseq: promedioHseq
      },
      hseq_data: hseqData
    };

    // ---------- Workbook
    const wb = new ExcelJS.Workbook();
    wb.created = new Date();
    wb.properties.title = `Evaluación ${evaluacion.id_evaluacion}`;
    wb.properties.company = 'Meridian Consulting LTDA';

    // ---------- Hoja
    const ws = wb.addWorksheet('Evaluación de Desempeño', {
      pageSetup: {
        paperSize: 9, orientation: 'portrait', fitToPage: true,
        margins: { left: 0.6, right: 0.6, top: 0.8, bottom: 0.8, header: 0.3, footer: 0.3 }
      }
    });

    // 6 columnas para acomodar 3 KPIs horizontales (A:B, C:D, E:F)
    ws.columns = [
      { key: 'A', width: 30 }, { key: 'B', width: 18 },
      { key: 'C', width: 30 }, { key: 'D', width: 18 },
      { key: 'E', width: 30 }, { key: 'F', width: 18 },
    ];

    // ---------- Encabezado compacto: Título + Período + Estado
    ws.mergeCells('A1:F1');
    const cTitle = ws.getCell('A1');
    cTitle.value = 'EVALUACIÓN DE DESEMPEÑO – MERIDIAN CONSULTING LTDA';
    cTitle.font = FONT_TITLE; cTitle.alignment = { horizontal: 'center', vertical: 'middle' };
    cTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.blue } };
    ws.addRow([]);

    ws.mergeCells('A3:C3');
    ws.getCell('A3').value = `Período: ${dash(evaluationData.evaluacion?.periodo_evaluacion)}`;
    ws.getCell('A3').font = FONT_BODY;

    ws.mergeCells('D3:F3');
    const st = estadoPorValor(evaluationData.promedios?.promedio_general);
    const estadoCell = ws.getCell('D3'); estadoCell.font = FONT_BODY;
    applyEstadoChip(estadoCell, st);

    ws.addRow([]);

    // ---------- Tarjetas KPI (3 horizontales, una cifra decimal)
    const promComp = numOrBlank(evaluationData.promedios?.promedio_competencias);
    const promHseq = numOrBlank(evaluationData.promedios?.promedio_hseq);
    const promGral = numOrBlank(evaluationData.promedios?.promedio_general);
    
    // Calcular calificación final ponderada para Excel
    let promFinal = null;
    if (promComp && promHseq) {
      // Aproximación: usar el promedio de competencias para autoevaluación y jefe
      const promedioAutoevaluacion = promComp;
      const promedioJefe = promComp;
      promFinal = (promedioAutoevaluacion * 0.20) + (promedioJefe * 0.40) + (promHseq * 0.40);
      promFinal = Math.round(promFinal * 10) / 10;
    }
    
    const estadoGral = estadoPorValor(promFinal || promGral);

    const drawCard = (range, value, label, estadoOpt=null) => {
      ws.mergeCells(range);
      const c = ws.getCell(range.split(':')[0]);
      const big = (value===null ? '—' : value.toFixed(1));
      c.value = { richText: [
        { text: `${big}\n`, font: { name:'Calibri', size: 22, bold: true, color:{ argb:'FF'+PALETTE.text } } },
        { text: label,        font: { name:'Calibri', size: 11, color:{ argb:'FF'+PALETTE.text } } },
      ]};
      c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.bg } };
      c.border = { top:{style:'thin',color:{argb:PALETTE.border}}, left:{style:'thin',color:{argb:PALETTE.border}},
                   bottom:{style:'thin',color:{argb:PALETTE.border}}, right:{style:'thin',color:{argb:PALETTE.border}} };
      // chip a la derecha (celda superior derecha del rango)
      if (estadoOpt) {
        const topRight = range.split(':')[1];
        const chipCell = ws.getCell(topRight);
        applyEstadoChip(chipCell, estadoOpt);
      }
    };

    // fila de inicio para KPIs
    const kpiTop = 5;
    drawCard(`A${kpiTop}:B${kpiTop+3}`, promComp, 'Promedio Competencias');
    drawCard(`C${kpiTop}:D${kpiTop+3}`, promHseq, 'Promedio HSEQ');
    drawCard(`E${kpiTop}:F${kpiTop+3}`, promFinal || promGral, 'Calificación Final', estadoGral);
    ws.addRow([]); ws.addRow([]);

    // ---------- Datos del empleado (2 columnas)
    const addSectionHeader = (title) => {
      const r = ws.addRow([title]); ws.mergeCells(`A${r.number}:F${r.number}`);
      const c = ws.getCell(`A${r.number}`);
      c.font = FONT_SUB; c.alignment = { horizontal: 'left', vertical: 'middle' };
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4B5A6B' } };
      return r.number;
    };
    addSectionHeader('DATOS DEL EMPLEADO');

    const rowStartDatos = ws.lastRow.number + 1;
    const putPair = (lA, vA, lB, vB) => {
      // A: etiqueta izquierda, B: valor (se expandirá a C), D: etiqueta derecha, E: valor (se expandirá a F)
      const r = ws.addRow([lA, dash(vA), null, lB, dash(vB), null]);

      // Unimos SOLO las celdas de valor, no las de etiqueta
      ws.mergeCells(`B${r.number}:C${r.number}`);
      ws.mergeCells(`E${r.number}:F${r.number}`);

      // Estilos ligeros
      r.getCell(1).font = { name: 'Calibri', bold: true, color: { argb: 'FF2B2B2B' } }; // etiqueta izq
      r.getCell(4).font = { name: 'Calibri', bold: true, color: { argb: 'FF2B2B2B' } }; // etiqueta der
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


    // Leyenda / microcopy
    const note = ws.addRow([
      'Escala 1–5: 1=Insuficiente, 2=Regular, 3=Satisfactorio, 4–5=Superior. ' +
      'Estados: 4.0–5.0 Superior; 3.0–3.9 Satisfactorio; 2.0–2.9 Regular; <2.0 Insuficiente.'
    ]);
    ws.mergeCells(`A${note.number}:F${note.number}`);
    ws.getCell(`A${note.number}`).font = { name:'Calibri', size:10, color:{ argb:'FF6B6B6B' } };
    ws.addRow([]);

    // ---------- Competencias (tabla con Observaciones)
    addSectionHeader('RESULTADOS POR COMPETENCIA');
    const hdrComp = ws.addRow(['Aspecto', 'Empleado', 'Jefe', 'Promedio', 'Estado', 'Observaciones']);
    hdrComp.eachCell((c, i) => {
      if (i<=6) {
        c.font = { name:'Calibri', bold:true, color:{ argb:'FFFFFFFF' } };
        c.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:'FF34495E' } };
        c.alignment = { horizontal:'center', vertical:'middle', wrapText: i===6 };
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
      const obs = normalizeObs(item);

      const r = ws.addRow([dash(item.aspecto), emp, jef, pro, '', obs]);
      r.eachCell((cell, col) => {
        cell.font = FONT_BODY;
        cell.border = { bottom:{ style:'thin', color:{ argb:PALETTE.border } } };
        cell.alignment = { vertical:'middle', wrapText: col===6, horizontal: (col>=2 && col<=4) ? 'right' : (col===5 ? 'center' : 'left') };
        if (zebra && col !== 4) cell.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:PALETTE.zebra } };
      });
      // formato 1 decimal
      ['B','C','D'].forEach(col => { const c = ws.getCell(`${col}${r.number}`); if (c.value !== null) c.numFmt = ONE_DEC; });
      // heat ONLY in Promedio
      const dCell = ws.getCell(`D${r.number}`); const hf = heatFill(dCell.value); if (hf) dCell.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:hf } };
      // chip de estado
      applyEstadoChip(ws.getCell(`E${r.number}`), est);
      // auto altura segun observación
      const obsLen = (`${obs}` || '').length; if (obsLen > 80) r.height = Math.min(140, 18 + Math.ceil(obsLen/70)*14);
    });
    ws.addRow([]);

    // ---------- HSEQ (tabla)
    addSectionHeader('RESPONSABILIDADES HSEQ');
    const hdrH = ws.addRow(['Responsabilidad', 'Calificación', 'Estado', 'Observaciones']);
    hdrH.eachCell((c, i) => {
      if (i<=4) {
        c.font = { name:'Calibri', bold:true, color:{ argb:'FFFFFFFF' } };
        c.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:'FF34495E' } };
        c.alignment = { horizontal:'center', vertical:'middle', wrapText: i===4 };
      }
    });

    zebra = false;
    if (evaluationDataWithCalculated.hseq_data && evaluationDataWithCalculated.hseq_data.length > 0) {
      evaluationDataWithCalculated.hseq_data.forEach(h => {
        zebra = !zebra;
        const cal = numOrBlank(h.calificacion);
        const est = estadoPorValor(cal);
        const r = ws.addRow([dash(h.responsabilidad), cal, est, normalizeObs(h)]);
        r.eachCell((cell, col) => {
          cell.font = FONT_BODY;
          cell.border = { bottom:{ style:'thin', color:{ argb:PALETTE.border } } };
          cell.alignment = { vertical:'middle', wrapText: col===4, horizontal: (col===2) ? 'right' : (col===3 ? 'center' : 'left') };
          if (zebra) cell.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:PALETTE.zebra } };
        });
        // formato 1 decimal
        const c = ws.getCell(`B${r.number}`); if (c.value !== null) c.numFmt = ONE_DEC;
        // chip de estado
        applyEstadoChip(ws.getCell(`C${r.number}`), est);
      });
    } else {
      // Mostrar mensaje cuando no hay datos HSEQ
      const noDataRow = ws.addRow(['No se encontraron datos de evaluación HSEQ para este período', '', '', '']);
      noDataRow.eachCell((cell, col) => {
        cell.font = { name:'Calibri', italic:true, color:{ argb:'FF666666' } };
        cell.alignment = { horizontal:'center', vertical:'middle' };
      });
      ws.mergeCells(`A${noDataRow.number}:D${noDataRow.number}`);
    }
    ws.addRow([]);

    // ---------- Plan de mejora (SMART + semáforo)
    addSectionHeader('PLAN DE MEJORA');
    const hdrP = ws.addRow(['Acción', 'Métrica', 'Responsable', 'Fecha', 'Estado', 'Observaciones']);
    hdrP.eachCell((c,i)=>{ if(i<=6){ c.font={ name:'Calibri', bold:true, color:{argb:'FFFFFFFF'} }; c.fill={ type:'pattern', pattern:'solid', fgColor:{argb:'FF34495E'} }; c.alignment={ horizontal:'center', vertical:'middle' }; } });

    const acciones = Array.isArray(evaluationData.plan_accion?.acciones)
      ? evaluationData.plan_accion.acciones
      : (evaluationData.plan_accion ? [evaluationData.plan_accion] : []);
    (acciones.length ? acciones : [{ actividad: dash(evaluationData.plan_accion?.actividad), seguimiento: dash(evaluationData.plan_accion?.seguimiento), responsable: dash(evaluationData.plan_accion?.responsable), fecha: dash(evaluationData.plan_accion?.fecha), estado: 'Pendiente' }])
      .forEach(a => {
        const r = ws.addRow([
          dash(a.actividad), dash(a.metrica || a.seguimiento), dash(a.responsable),
          dash(a.fecha), '', dash(a.observaciones || '')
        ]);
        r.eachCell((cell) => { cell.font = FONT_BODY; cell.border = { bottom:{ style:'thin', color:{ argb:PALETTE.border } } }; });
        const est = (a.estado || 'Pendiente').toUpperCase();
        const map = { 'PENDIENTE':'REGULAR', 'EN CURSO':'SATISFACTORIO', 'CERRADA':'SUPERIOR' };
        applyEstadoChip(ws.getCell(`E${r.number}`), map[est] || 'REGULAR');
      });
    ws.addRow([]);

    // ---------- Firmas y validación (cajas ligeras)
    addSectionHeader('FIRMAS');
    ws.addRow(['Evaluado:', dash(evaluationData.empleado?.nombre), '', 'Jefe Directo:', dash(evaluationData.evaluacion?.evaluador_nombre || ''), '']);
    ws.addRow(['Cargo:', dash(evaluationData.empleado?.cargo), '', 'Cargo:', dash(evaluationData.evaluacion?.evaluador_cargo || ''), '']);
    ws.addRow(['Firma del Empleado:', '', '', 'Firma del Jefe:', '', '']);
    for (let i = 0; i < 6; i++) ws.addRow(['', '', '', '', '', '']);

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

    // ---------- Índice interno (hipervínculos) y pie con metadatos
    const idxStart = ws.rowCount + 1;
    ws.addRow(['Índice (clic para ir): KPIs | Datos | Competencias | HSEQ | Plan | Firmas']);
    ws.mergeCells(`A${idxStart}:F${idxStart}`);
    ws.getCell(`A${idxStart}`).font = { name:'Calibri', size:10, color:{argb:'FF356DB1'} };
    ws.getCell(`A${idxStart}`).value = { text: 'Ir a Competencias', hyperlink: `#A${headerCompRow}` };

    ws.headerFooter.oddFooter = `&L ID Eval: ${dash(evaluationData.evaluacion?.id_evaluacion)}  |  Plantilla v1.0 &R Página &P de &N`;
    // área de impresión
    ws.pageSetup.printArea = `A1:F${ws.lastRow.number}`;

    // ---------- Guardar
    const buf = await wb.xlsx.writeBuffer({ useStyles: true, useSharedStrings: true });
    const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `evaluacion_${evaluacion.id_evaluacion}_${new Date().toISOString().split('T')[0]}.xlsx`;
    saveAs(blob, fileName);
    success('Excel generado', `Reporte Excel mejorado generado: ${fileName}`);
  } catch (e) {
    showError('Error al generar Excel', 'Error al generar el archivo Excel. Intente nuevamente.');
  } finally {
    setGeneratingExcel(false);
  }
};

// ===================== EXCEL Reporte Consolidado =====================
const generateConsolidatedExcel = async (evaluacion) => {
  try {
    setGeneratingExcel(true);

    // ----- Fetch datos completos
    const employeeId = localStorage.getItem('employeeId');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const resp = await fetch(`${apiUrl}/api/evaluations/${evaluacion.id_evaluacion}/complete/${employeeId}`);
    if (!resp.ok) throw new Error('Error al obtener datos completos de la evaluación');
    const responseData = await resp.json();
    const { data: evaluationData } = responseData;
    
    // Debug: Verificar que las firmas se están obteniendo
    console.log('Datos de evaluación obtenidos (Excel):', evaluationData);
    console.log('Firmas obtenidas (Excel):', evaluationData.firmas);
    
    // Calcular promedios de autoevaluación y evaluación del jefe desde las competencias
    let promedioAutoevaluacion = 0;
    let promedioEvaluacionJefe = 0;
    let promedioHseq = 0;
    
    if (evaluationData.competencias && evaluationData.competencias.length > 0) {
      const competencias = evaluationData.competencias;
      let sumaAutoevaluacion = 0;
      let sumaJefe = 0;
      let countAutoevaluacion = 0;
      let countJefe = 0;
      
      competencias.forEach(comp => {
        if (comp.calificacion_empleado && !isNaN(parseFloat(comp.calificacion_empleado))) {
          sumaAutoevaluacion += parseFloat(comp.calificacion_empleado);
          countAutoevaluacion++;
        }
        if (comp.calificacion_jefe && !isNaN(parseFloat(comp.calificacion_jefe))) {
          sumaJefe += parseFloat(comp.calificacion_jefe);
          countJefe++;
        }
      });
      
      promedioAutoevaluacion = countAutoevaluacion > 0 ? Math.round((sumaAutoevaluacion / countAutoevaluacion) * 10) / 10 : 0;
      promedioEvaluacionJefe = countJefe > 0 ? Math.round((sumaJefe / countJefe) * 10) / 10 : 0;
    }
    
    // Obtener datos detallados de HSEQ desde las evaluaciones HSEQ del empleado
    let hseqData = [];
    try {
      const hseqResponse = await fetch(`${apiUrl}/api/evaluations/hseq/employee/${employeeId}`);
      if (hseqResponse.ok) {
        const hseqResponseData = await hseqResponse.json();
        
        if (hseqResponseData.success && Array.isArray(hseqResponseData.data)) {
          
          // Buscar la evaluación HSEQ correspondiente al período de la evaluación actual
          let hseqEval = hseqResponseData.data.find(h => h.periodo_evaluacion === evaluacion.periodo_evaluacion);
          
          // Si no se encuentra para el período exacto, buscar la más reciente
          if (!hseqEval && hseqResponseData.data.length > 0) {
            hseqEval = hseqResponseData.data[0]; // La más reciente (ya están ordenadas por fecha DESC)
          }
          
          if (hseqEval) {
            if (hseqEval.promedio_hseq) {
              promedioHseq = parseFloat(hseqEval.promedio_hseq);
            }
            // Obtener los datos detallados de HSEQ usando el ID de la evaluación
            if (hseqEval.id_hseq_evaluacion) {
              try {
                const hseqDetailResponse = await fetch(`${apiUrl}/api/evaluations/hseq/${hseqEval.id_hseq_evaluacion}`);
                if (hseqDetailResponse.ok) {
                  const hseqDetailData = await hseqDetailResponse.json();
                  
                  if (hseqDetailData.success && hseqDetailData.data && hseqDetailData.data.criterios) {
                    hseqData = hseqDetailData.data.criterios;
                  }
                }
              } catch (hseqDetailErr) {
                // Error obteniendo detalles HSEQ
              }
            }
          }
        }
      }
    } catch (hseqErr) {
      // Error obteniendo datos HSEQ
    }

    // ---------- Paleta y helpers
    const PALETTE = {
      blue: '184C8C',           // azul corporativo
      text: '2B2B2B',           // gris oscuro texto
      bg: 'F5F6F8',             // neutro fondo
      border: 'DADFE5',         // bordes sutiles
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

    const normalizeObs = (obj) =>
      obj?.observaciones ?? obj?.observacion ?? obj?.justificacion ?? obj?.comentario ?? obj?.nota ?? '';

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

    // Asegurar que las firmas estén disponibles y sean un objeto
    if (!evaluationData.firmas || Array.isArray(evaluationData.firmas)) {
      evaluationData.firmas = {
        firma_empleado: null,
        firma_jefe: null
      };
    }

    // Agregar los promedios calculados y datos HSEQ al objeto de datos
    const evaluationDataWithCalculated = {
      ...evaluationData,
      promedios: {
        ...evaluationData.promedios,
        promedio_autoevaluacion: promedioAutoevaluacion,
        promedio_evaluacion_jefe: promedioEvaluacionJefe,
        promedio_hseq: promedioHseq
      },
      hseq_data: hseqData,
      firmas: evaluationData.firmas // Asegurar que las firmas se mantengan
    };

    // ---------- Workbook
    const wb = new ExcelJS.Workbook();
    wb.created = new Date();
    wb.properties.title = `Reporte Consolidado ${evaluacion.id_evaluacion}`;
    wb.properties.company = 'Meridian Consulting LTDA';

    // ---------- Hoja
    const ws = wb.addWorksheet('Reporte Consolidado', {
      pageSetup: {
        paperSize: 9, orientation: 'portrait', fitToPage: true,
        margins: { left: 0.6, right: 0.6, top: 0.8, bottom: 0.8, header: 0.3, footer: 0.3 }
      }
    });

    // 6 columnas para acomodar 3 KPIs horizontales (A:B, C:D, E:F)
    ws.columns = [
      { key: 'A', width: 30 }, { key: 'B', width: 18 },
      { key: 'C', width: 30 }, { key: 'D', width: 18 },
      { key: 'E', width: 30 }, { key: 'F', width: 18 },
    ];

    // ---------- Encabezado
    ws.mergeCells('A1:F1');
    const cTitle = ws.getCell('A1');
    cTitle.value = 'REPORTE CONSOLIDADO DE EVALUACIÓN – MERIDIAN CONSULTING LTDA';
    cTitle.font = FONT_TITLE; cTitle.alignment = { horizontal: 'center', vertical: 'middle' };
    cTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.blue } };
    ws.addRow([]);

    ws.mergeCells('A3:C3');
    ws.getCell('A3').value = `Período: ${dash(evaluationDataWithCalculated.evaluacion?.periodo_evaluacion)}`;
    ws.getCell('A3').font = FONT_BODY;

    ws.mergeCells('D3:F3');
    const st = estadoPorValor(evaluationDataWithCalculated.promedios?.promedio_general);
    const estadoCell = ws.getCell('D3'); estadoCell.font = FONT_BODY;
    applyEstadoChip(estadoCell, st);

    ws.addRow([]);

    // ---------- KPIs de Componentes (3 horizontales)
    const promAuto = numOrBlank(evaluationDataWithCalculated.promedios?.promedio_autoevaluacion);
    const promJefe = numOrBlank(evaluationDataWithCalculated.promedios?.promedio_evaluacion_jefe);
    const promHseq = numOrBlank(evaluationDataWithCalculated.promedios?.promedio_hseq);
    
    // Calcular calificación final ponderada
    let promFinal = null;
    if (promAuto && promJefe && promHseq) {
      promFinal = (promAuto * 0.20) + (promJefe * 0.40) + (promHseq * 0.40);
      promFinal = Math.round(promFinal * 10) / 10;
    }
    
    const estadoFinal = estadoPorValor(promFinal);

    const drawCard = (range, value, label, estadoOpt=null) => {
      ws.mergeCells(range);
      const c = ws.getCell(range.split(':')[0]);
      const big = (value===null ? '—' : value.toFixed(1));
      c.value = { richText: [
        { text: `${big}\n`, font: { name:'Calibri', size: 22, bold: true, color:{ argb:'FF'+PALETTE.text } } },
        { text: label,        font: { name:'Calibri', size: 11, color:{ argb:'FF'+PALETTE.text } } },
      ]};
      c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PALETTE.bg } };
      c.border = { top:{style:'thin',color:{argb:PALETTE.border}}, left:{style:'thin',color:{argb:PALETTE.border}},
                   bottom:{style:'thin',color:{argb:PALETTE.border}}, right:{style:'thin',color:{argb:PALETTE.border}} };
      // chip a la derecha
      if (estadoOpt) {
        const topRight = range.split(':')[1];
        const chipCell = ws.getCell(topRight);
        applyEstadoChip(chipCell, estadoOpt);
      }
    };

    // fila de inicio para KPIs
    const kpiTop = 5;
    drawCard(`A${kpiTop}:B${kpiTop+3}`, promAuto, 'Autoevaluación (20%)', estadoPorValor(promAuto));
    drawCard(`C${kpiTop}:D${kpiTop+3}`, promJefe, 'Evaluación Jefe (40%)', estadoPorValor(promJefe));
    drawCard(`E${kpiTop}:F${kpiTop+3}`, promHseq, 'Evaluación HSEQ (40%)', estadoPorValor(promHseq));
    ws.addRow([]); ws.addRow([]);

    // ---------- Calificación Final
    const addSectionHeader = (title) => {
      const r = ws.addRow([title]); ws.mergeCells(`A${r.number}:F${r.number}`);
      const c = ws.getCell(`A${r.number}`);
      c.font = FONT_SUB; c.alignment = { horizontal: 'left', vertical: 'middle' };
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4B5A6B' } };
      return r.number;
    };
    addSectionHeader('CALIFICACIÓN FINAL PONDERADA');

    const finalRow = ws.addRow(['Calificación Final:', dash(promFinal), '', 'Estado:', '', '']);
    ws.mergeCells(`B${finalRow.number}:C${finalRow.number}`);
    ws.mergeCells(`E${finalRow.number}:F${finalRow.number}`);
    
    finalRow.getCell(1).font = { name: 'Calibri', bold: true, color: { argb: 'FF2B2B2B' } };
    finalRow.getCell(4).font = { name: 'Calibri', bold: true, color: { argb: 'FF2B2B2B' } };
    finalRow.eachCell(cell => {
      cell.font = cell.font || { name: 'Calibri', size: 11, color: { argb: 'FF2B2B2B' } };
      cell.border = { bottom: { style: 'thin', color: { argb: PALETTE.border } } };
      cell.alignment = { vertical: 'middle' };
    });
    
    // Aplicar chip de estado a la calificación final
    applyEstadoChip(ws.getCell(`E${finalRow.number}`), estadoFinal);
    ws.addRow([]);

    // ---------- Fórmula de Cálculo
    addSectionHeader('FÓRMULA DE CÁLCULO');
    const formulaRow = ws.addRow(['Fórmula:', 'Calificación Final = (Autoevaluación × 0.20) + (Evaluación Jefe × 0.40) + (Evaluación HSEQ × 0.40)', '', '', '', '']);
    ws.mergeCells(`B${formulaRow.number}:F${formulaRow.number}`);
    formulaRow.getCell(1).font = { name: 'Calibri', bold: true, color: { argb: 'FF2B2B2B' } };
    formulaRow.getCell(2).font = { name: 'Calibri', size: 11, color: { argb: 'FF2B2B2B' } };
    ws.addRow([]);

    // ---------- Detalle de Competencias
    addSectionHeader('DETALLE DE COMPETENCIAS');
    const hdrComp = ws.addRow(['Competencia', 'Autoeval.', 'Jefe', 'Promedio', 'Estado', 'Observaciones']);
    hdrComp.eachCell((c, i) => {
      if (i<=6) {
        c.font = { name:'Calibri', bold:true, color:{ argb:'FFFFFFFF' } };
        c.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:'FF34495E' } };
        c.alignment = { horizontal:'center', vertical:'middle', wrapText: i===6 };
      }
    });
    const headerCompRow = hdrComp.number;

    let zebra = false;
    (evaluationDataWithCalculated.competencias || []).forEach(item => {
      zebra = !zebra;
      const emp = numOrBlank(item.calificacion_empleado);
      const jef = numOrBlank(item.calificacion_jefe);
      const pro = numOrBlank(item.promedio);
      const est = estadoPorValor(pro);
      const obs = normalizeObs(item);

      const r = ws.addRow([dash(item.aspecto), emp, jef, pro, '', obs]);
      r.eachCell((cell, col) => {
        cell.font = FONT_BODY;
        cell.border = { bottom:{ style:'thin', color:{ argb:PALETTE.border } } };
        cell.alignment = { vertical:'middle', wrapText: col===6, horizontal: (col>=2 && col<=4) ? 'right' : (col===5 ? 'center' : 'left') };
        if (zebra && col !== 4) cell.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:PALETTE.zebra } };
      });
      // formato 1 decimal
      ['B','C','D'].forEach(col => { const c = ws.getCell(`${col}${r.number}`); if (c.value !== null) c.numFmt = ONE_DEC; });
      // chip de estado
      applyEstadoChip(ws.getCell(`E${r.number}`), est);
    });
    ws.addRow([]);

    // ---------- Detalle de HSEQ
    addSectionHeader('DETALLE DE RESPONSABILIDADES HSEQ');
    const hdrHseq = ws.addRow(['Responsabilidad', 'Calificación', 'Estado', 'Observaciones']);
    hdrHseq.eachCell((c, i) => {
      if (i<=4) {
        c.font = { name:'Calibri', bold:true, color:{ argb:'FFFFFFFF' } };
        c.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:'FF34495E' } };
        c.alignment = { horizontal:'center', vertical:'middle', wrapText: i===4 };
      }
    });

    zebra = false;
    if (evaluationDataWithCalculated.hseq_data && evaluationDataWithCalculated.hseq_data.length > 0) {
      evaluationDataWithCalculated.hseq_data.forEach(h => {
        zebra = !zebra;
        const cal = numOrBlank(h.calificacion);
        const est = estadoPorValor(cal);
        const r = ws.addRow([dash(h.responsabilidad), cal, est, normalizeObs(h)]);
        r.eachCell((cell, col) => {
          cell.font = FONT_BODY;
          cell.border = { bottom:{ style:'thin', color:{ argb:PALETTE.border } } };
          cell.alignment = { vertical:'middle', wrapText: col===4, horizontal: (col===2) ? 'right' : (col===3 ? 'center' : 'left') };
          if (zebra) cell.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:PALETTE.zebra } };
        });
        // formato 1 decimal
        const c = ws.getCell(`B${r.number}`); if (c.value !== null) c.numFmt = ONE_DEC;
        // chip de estado
        applyEstadoChip(ws.getCell(`C${r.number}`), est);
      });
    } else {
      // Mostrar mensaje cuando no hay datos HSEQ
      const noDataRow = ws.addRow(['No se encontraron datos de evaluación HSEQ para este período', '', '', '']);
      noDataRow.eachCell((cell, col) => {
        cell.font = { name:'Calibri', italic:true, color:{ argb:'FF666666' } };
        cell.alignment = { horizontal:'center', vertical:'middle' };
      });
      ws.mergeCells(`A${noDataRow.number}:D${noDataRow.number}`);
    }
    ws.addRow([]);

    // ---------- Firmas
    addSectionHeader('FIRMAS');
    ws.addRow(['Evaluado:', dash(evaluationDataWithCalculated.empleado?.nombre), '', 'Jefe Directo:', dash(evaluationDataWithCalculated.datos_generales?.nombreEvaluador || ''), '']);
    ws.addRow(['Cargo:', dash(evaluationDataWithCalculated.empleado?.cargo), '', 'Cargo:', dash(evaluationDataWithCalculated.datos_generales?.cargoEvaluador || ''), '']);
    ws.addRow(['Firma del Empleado:', '', '', 'Firma del Jefe:', '', '']);
    for (let i = 0; i < 6; i++) ws.addRow(['', '', '', '', '', '']);

    const toDataUrl = (b64) => !b64 ? null : (b64.startsWith('data:image') ? b64 : `data:image/png;base64,${b64}`);
    const empDataUrl = toDataUrl(evaluationDataWithCalculated.firmas?.firma_empleado);
    const jefeDataUrl = toDataUrl(evaluationDataWithCalculated.firmas?.firma_jefe);
    
    // Debug: Verificar las firmas procesadas
    console.log('Firma empleado procesada:', empDataUrl ? 'Sí' : 'No');
    console.log('Firma jefe procesada:', jefeDataUrl ? 'Sí' : 'No');
    console.log('Firmas en Excel:', evaluationDataWithCalculated.firmas);
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

    // Debug: Verificar las firmas antes de generar Excel
    console.log('Firmas antes de generar Excel:', evaluationDataWithCalculated.firmas);
    console.log('Firma empleado en Excel:', evaluationDataWithCalculated.firmas?.firma_empleado ? 'Sí' : 'No');
    console.log('Firma jefe en Excel:', evaluationDataWithCalculated.firmas?.firma_jefe ? 'Sí' : 'No');
    console.log('Tipo de firmas en Excel:', typeof evaluationDataWithCalculated.firmas);
    console.log('Es array en Excel:', Array.isArray(evaluationDataWithCalculated.firmas));

    // ---------- Guardar
    const buf = await wb.xlsx.writeBuffer({ useStyles: true, useSharedStrings: true });
    const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `reporte_consolidado_${evaluacion.id_evaluacion}_${new Date().toISOString().split('T')[0]}.xlsx`;
    saveAs(blob, fileName);
    success('Excel consolidado generado', `Reporte consolidado Excel generado: ${fileName}`);
  } catch (e) {
    showError('Error al generar Excel consolidado', 'Error al generar el reporte consolidado Excel. Intente nuevamente.');
  } finally {
    setGeneratingExcel(false);
  }
};

  // Descarga PDF directa (compat)
  const downloadPDF = async (evaluationId) => {
    try {
      const employeeId = localStorage.getItem('employeeId');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const downloadUrl = `${apiUrl}/api/evaluations/${evaluationId}/pdf/${employeeId}`;
      window.open(downloadUrl, '_blank');
    } catch (error) {
      showError('Error al descargar', 'Error al descargar el reporte. Intente nuevamente.');
    }
  };

  // Descarga PDF de evaluación HSEQ
  const downloadHseqPDF = async (periodo) => {
    try {
      const employeeId = localStorage.getItem('employeeId');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      
      // Limpiar el período para asegurar formato correcto
      const periodoLimpio = periodo ? periodo.toString().trim() : null;
      
      const downloadUrl = `${apiUrl}/api/hseq/employee/${employeeId}/pdf/${periodoLimpio}`;
      
      window.open(downloadUrl, '_blank');
      success('PDF HSEQ generado', 'El reporte PDF de evaluación HSEQ se está descargando.');
    } catch (error) {
      showError('Error al descargar', 'Error al descargar el reporte HSEQ. Intente nuevamente.');
    }
  };

  // Descarga Excel de evaluación HSEQ
  const downloadHseqExcel = async (hseqEval) => {
    try {
      const employeeId = localStorage.getItem('employeeId');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      
      // Obtener los datos detallados de la evaluación HSEQ
      const response = await fetch(`${apiUrl}/api/evaluations/hseq/${hseqEval.id_evaluacion}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Error al obtener datos de la evaluación HSEQ');
      }
      
      const evaluacion = data.data;
      
      // Crear workbook de Excel
      const wb = new ExcelJS.Workbook();
      wb.created = new Date();
      wb.properties.title = `Evaluación HSEQ ${hseqEval.periodo_evaluacion}`;
      wb.properties.company = 'Meridian Consulting LTDA';
      
      // Crear hoja principal
      const ws = wb.addWorksheet('Evaluación HSEQ');
      
      // Configurar columnas
      ws.columns = [
        { key: 'A', width: 50 },
        { key: 'B', width: 15 },
        { key: 'C', width: 60 }
      ];
      
      // Definir estilos básicos
      const titleStyle = {
        font: { name: 'Calibri', bold: true, size: 14 },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E2F3' } },
        alignment: { horizontal: 'center', vertical: 'middle' }
      };
      
      const headerStyle = {
        font: { name: 'Calibri', bold: true, size: 11, color: { argb: 'FFFFFFFF' } },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF366092' } },
        alignment: { horizontal: 'center', vertical: 'middle' },
        border: {
          top: { style: 'thin', color: { argb: 'FF000000' } },
          left: { style: 'thin', color: { argb: 'FF000000' } },
          bottom: { style: 'thin', color: { argb: 'FF000000' } },
          right: { style: 'thin', color: { argb: 'FF000000' } }
        }
      };
      
      const dataStyle = {
        font: { name: 'Calibri', size: 11 },
        alignment: { vertical: 'middle' },
        border: {
          top: { style: 'thin', color: { argb: 'FF000000' } },
          left: { style: 'thin', color: { argb: 'FF000000' } },
          bottom: { style: 'thin', color: { argb: 'FF000000' } },
          right: { style: 'thin', color: { argb: 'FF000000' } }
        }
      };
      
      const summaryStyle = {
        font: { name: 'Calibri', bold: true, size: 12 },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E2F3' } },
        alignment: { horizontal: 'center', vertical: 'middle' }
      };
      
      // Agregar información del empleado
      ws.getCell('A1').value = 'INFORMACIÓN DEL EMPLEADO';
      ws.getCell('A1').font = titleStyle.font;
      ws.getCell('A1').fill = titleStyle.fill;
      ws.getCell('A1').alignment = titleStyle.alignment;
      ws.mergeCells('A1:C1');
      
      ws.getCell('A2').value = 'Nombre:';
      ws.getCell('B2').value = evaluacion.empleado_nombre || 'N/A';
      
      ws.getCell('A3').value = 'Período:';
      ws.getCell('B3').value = hseqEval.periodo_evaluacion || 'N/A';
      
      ws.getCell('A4').value = 'Fecha de Evaluación:';
      ws.getCell('B4').value = hseqEval.fecha_evaluacion || 'N/A';
      
      ws.getCell('A5').value = 'Evaluador:';
      ws.getCell('B5').value = evaluacion.evaluador_nombre || 'No asignado';
      
      ws.getCell('A6').value = 'Estado:';
      ws.getCell('B6').value = hseqEval.estado_evaluacion || 'N/A';
      
      ws.getCell('A7').value = 'Promedio HSEQ:';
      ws.getCell('B7').value = hseqEval.promedio_hseq || 'N/A';
      
      // Agregar sección de responsabilidades HSEQ
      ws.getCell('A9').value = 'RESPONSABILIDADES HSEQ';
      ws.getCell('A9').font = summaryStyle.font;
      ws.getCell('A9').fill = summaryStyle.fill;
      ws.getCell('A9').alignment = summaryStyle.alignment;
      ws.mergeCells('A9:C9');
      
      // Encabezados de tabla
      ws.getCell('A10').value = 'Responsabilidad';
      ws.getCell('A10').font = headerStyle.font;
      ws.getCell('A10').fill = headerStyle.fill;
      ws.getCell('A10').alignment = headerStyle.alignment;
      ws.getCell('A10').border = headerStyle.border;
      
      ws.getCell('B10').value = 'Calificación';
      ws.getCell('B10').font = headerStyle.font;
      ws.getCell('B10').fill = headerStyle.fill;
      ws.getCell('B10').alignment = headerStyle.alignment;
      ws.getCell('B10').border = headerStyle.border;
      
      ws.getCell('C10').value = 'Observaciones';
      ws.getCell('C10').font = headerStyle.font;
      ws.getCell('C10').fill = headerStyle.fill;
      ws.getCell('C10').alignment = headerStyle.alignment;
      ws.getCell('C10').border = headerStyle.border;
      
      // Agregar datos de responsabilidades HSEQ
      let rowIndex = 11;
      if (evaluacion.criterios && Array.isArray(evaluacion.criterios)) {
        evaluacion.criterios.forEach(criterio => {
          ws.getCell(`A${rowIndex}`).value = criterio.responsabilidad || criterio.nombre_criterio || criterio.criterio || 'N/A';
          ws.getCell(`A${rowIndex}`).font = dataStyle.font;
          ws.getCell(`A${rowIndex}`).alignment = dataStyle.alignment;
          ws.getCell(`A${rowIndex}`).border = dataStyle.border;
          
          ws.getCell(`B${rowIndex}`).value = criterio.calificacion || 0;
          ws.getCell(`B${rowIndex}`).font = dataStyle.font;
          ws.getCell(`B${rowIndex}`).alignment = dataStyle.alignment;
          ws.getCell(`B${rowIndex}`).border = dataStyle.border;
          
          ws.getCell(`C${rowIndex}`).value = criterio.observaciones || criterio.justificacion || '';
          ws.getCell(`C${rowIndex}`).font = dataStyle.font;
          ws.getCell(`C${rowIndex}`).alignment = dataStyle.alignment;
          ws.getCell(`C${rowIndex}`).border = dataStyle.border;
          
          rowIndex++;
        });
      }
      
      // Agregar resumen
      ws.getCell(`A${rowIndex + 1}`).value = 'RESUMEN';
      ws.getCell(`A${rowIndex + 1}`).font = summaryStyle.font;
      ws.getCell(`A${rowIndex + 1}`).fill = summaryStyle.fill;
      ws.getCell(`A${rowIndex + 1}`).alignment = summaryStyle.alignment;
      ws.mergeCells(`A${rowIndex + 1}:C${rowIndex + 1}`);
      
      ws.getCell(`A${rowIndex + 2}`).value = 'Promedio Final:';
      ws.getCell(`A${rowIndex + 2}`).font = { name: 'Calibri', bold: true };
      ws.getCell(`B${rowIndex + 2}`).value = evaluacion.promedio_final || hseqEval.promedio_hseq || 0;
      ws.getCell(`B${rowIndex + 2}`).font = { name: 'Calibri', bold: true };
      
      ws.getCell(`A${rowIndex + 3}`).value = 'Estado:';
      ws.getCell(`A${rowIndex + 3}`).font = { name: 'Calibri', bold: true };
      ws.getCell(`B${rowIndex + 3}`).value = hseqEval.estado_evaluacion || 'N/A';
      ws.getCell(`B${rowIndex + 3}`).font = { name: 'Calibri', bold: true };
      
      // Configurar área de impresión
      ws.pageSetup.printArea = `A1:C${rowIndex + 3}`;
      ws.pageSetup.orientation = 'landscape';
      ws.pageSetup.fitToPage = true;
      ws.pageSetup.fitToWidth = 1;
      ws.pageSetup.fitToHeight = 0;
      
      // Guardar archivo
      const buf = await wb.xlsx.writeBuffer({ useStyles: true, useSharedStrings: true });
      const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileName = `evaluacion_hseq_${employeeId}_${hseqEval.periodo_evaluacion}_${new Date().toISOString().split('T')[0]}.xlsx`;
      saveAs(blob, fileName);
      
      success('Excel generado', `Reporte HSEQ Excel generado: ${fileName}`);
    } catch (error) {
      showError('Error al generar Excel', 'Error al generar el reporte Excel HSEQ. Intente nuevamente.');
    }
  };

  // Verificar si existe evaluación HSEQ para un período
  const checkHseqEvaluation = async (periodo) => {
    try {
      const employeeId = localStorage.getItem('employeeId');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/hseq/employee/${employeeId}/pdf/${periodo}`, {
        method: 'HEAD' // Solo verificar si existe sin descargar
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  // Componente para cada evaluación HSEQ
  const HseqEvaluationCard = ({ periodo }) => {
    const [hasHseq, setHasHseq] = useState(null);
    
    useEffect(() => {
      checkHseqEvaluation(periodo).then(setHasHseq);
    }, [periodo]);

    return (
      <div className="hseq-evaluation-card">
        <div className="hseq-card-header">
          <h3>Evaluación HSEQ - {periodo}</h3>
          <span className="hseq-period-badge">{periodo}</span>
        </div>
        <div className="hseq-card-content">
          {hasHseq === null ? (
            <div className="hseq-loading">
              <div className="loading-spinner"></div>
              <span>Verificando evaluación HSEQ...</span>
            </div>
          ) : hasHseq ? (
            <div className="hseq-available">
              <div className="hseq-status success">
                <span className="status-icon">✅</span>
                <span>Evaluación HSEQ completada</span>
              </div>
              <div className="hseq-download-buttons">
                <button 
                  className="download-btn hseq-btn" 
                  onClick={() => downloadHseqPDF(periodo)}
                  title="Descargar PDF HSEQ"
                >
                  📄 PDF HSEQ
                </button>
                <button 
                  className="download-btn hseq-btn excel-btn" 
                  onClick={() => downloadHseqExcel({periodo_evaluacion: periodo, id_evaluacion: null})}
                  title="Descargar Excel HSEQ"
                >
                  📊 Excel HSEQ
                </button>
              </div>
            </div>
          ) : (
            <div className="hseq-not-available">
              <div className="hseq-status pending">
                <span className="status-icon">⏳</span>
                <span>Evaluación HSEQ no realizada aún</span>
              </div>
              <p className="hseq-message">
                La evaluación HSEQ para este período aún no ha sido completada por el área de HSEQ.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  const getCalificacionFinal = (promedio) => {
    if (!promedio) return 'N/A';
    const num = parseFloat(promedio);
    if (num >= 4.5) return 'EXCELENTE';
    if (num >= 4.0) return 'SUPERIOR';
    if (num >= 3.0) return 'SATISFACTORIO';
    if (num >= 2.0) return 'REGULAR';
    return 'INSUFICIENTE';
  };

  const getEstadoCompetencia = (calificacion) => {
    if (!calificacion) return 'N/A';
    const num = parseFloat(calificacion);
    if (num >= 4.5) return 'EXCELENTE';
    if (num >= 4.0) return 'SUPERIOR';
    if (num >= 3.0) return 'SATISFACTORIO';
    if (num >= 2.0) return 'REGULAR';
    return 'INSUFICIENTE';
  };

  const getEstadoGeneral = (promedio) => {
    if (!promedio) return 'N/A';
    const num = parseFloat(promedio);
    if (num >= 4.5) return 'EXCELENTE';
    if (num >= 4.0) return 'SUPERIOR';
    if (num >= 3.0) return 'SATISFACTORIO';
    if (num >= 2.0) return 'REGULAR';
    return 'INSUFICIENTE';
  };

  // Función para obtener la descripción del estado de evaluación
  const getDescripcionEstado = (estado) => {
    const estados = {
      'AUTOEVALUACION_PENDIENTE': 'Pendiente Autoevaluación',
      'AUTOEVALUACION_COMPLETADA': 'Pendiente Evaluación Jefe',
      'EVALUACION_JEFE_PENDIENTE': 'Pendiente Evaluación Jefe',
      'EVALUACION_JEFE_COMPLETADA': 'Evaluación Completada',
      'HSEQ_PENDIENTE': 'Evaluación Completada',
      'HSEQ_COMPLETADA': 'Evaluación Completada',
      'EVALUACION_FINALIZADA': 'Evaluación Completada',
      'BORRADOR': 'Borrador',
      'COMPLETADA': 'Completada',
      'APROBADA': 'Aprobada'
    };
    return estados[estado] || estado;
  };

  // Función para obtener la clase CSS del estado
  const getClaseEstado = (estado) => {
    const clases = {
      'AUTOEVALUACION_PENDIENTE': 'estado-pendiente',
      'AUTOEVALUACION_COMPLETADA': 'estado-progreso',
      'EVALUACION_JEFE_PENDIENTE': 'estado-progreso',
      'EVALUACION_JEFE_COMPLETADA': 'estado-completada',
      'HSEQ_PENDIENTE': 'estado-completada',
      'HSEQ_COMPLETADA': 'estado-completada',
      'EVALUACION_FINALIZADA': 'estado-completada',
      'BORRADOR': 'estado-borrador',
      'COMPLETADA': 'estado-completada',
      'APROBADA': 'estado-aprobada'
    };
    return clases[estado] || 'estado-desconocido';
  };

  // Función para obtener el porcentaje de progreso
  const getProgresoPorcentaje = (estado) => {
    const progresos = {
      'AUTOEVALUACION_PENDIENTE': 0,
      'AUTOEVALUACION_COMPLETADA': 50,
      'EVALUACION_JEFE_PENDIENTE': 50,
      'EVALUACION_JEFE_COMPLETADA': 100,
      'HSEQ_PENDIENTE': 100,
      'HSEQ_COMPLETADA': 100,
      'EVALUACION_FINALIZADA': 100,
      'BORRADOR': 0,
      'COMPLETADA': 100,
      'APROBADA': 100
    };
    return progresos[estado] || 0;
  };

  // Función para calcular la calificación final ponderada
  const calcularCalificacionFinal = (evaluacion, hseqEval) => {
    try {
      // Obtener promedios disponibles
      const promedioCompetencias = evaluacion.promedios?.promedio_competencias ? parseFloat(evaluacion.promedios.promedio_competencias) : 0;
      const promedioHseq = hseqEval?.promedio_hseq ? parseFloat(hseqEval.promedio_hseq) : 0;

      // Intentar obtener datos detallados de competencias
      let promedioAutoevaluacion = 0;
      let promedioJefe = 0;

      // Verificar si tenemos competencias detalladas
      if (evaluacion.competencias_detalle && evaluacion.competencias_detalle.length > 0) {
        // Calcular promedio de autoevaluación
        const sumaAutoevaluacion = evaluacion.competencias_detalle.reduce((sum, comp) => {
          const calif = parseFloat(comp.calificacion_empleado) || 0;
          return sum + calif;
        }, 0);
        promedioAutoevaluacion = sumaAutoevaluacion / evaluacion.competencias_detalle.length;

        // Calcular promedio de evaluación del jefe
        const sumaJefe = evaluacion.competencias_detalle.reduce((sum, comp) => {
          const calif = parseFloat(comp.calificacion_jefe) || 0;
          return sum + calif;
        }, 0);
        promedioJefe = sumaJefe / evaluacion.competencias_detalle.length;
      } else {
        // Si no tenemos datos detallados, usar el promedio de competencias como base
        if (promedioCompetencias > 0) {
          // Aproximación: dividir el promedio de competencias entre empleado y jefe
          // Asumimos que el promedio de competencias es el promedio entre ambos
          promedioAutoevaluacion = promedioCompetencias;
          promedioJefe = promedioCompetencias;
        }
      }

      // Verificar que tengamos datos para calcular
      if (promedioAutoevaluacion === 0 && promedioJefe === 0 && promedioHseq === 0) {
        return null;
      }

      // Calcular promedio ponderado: Autoevaluación 20%, Jefe 40%, HSEQ 40%
      let calificacionFinal = 0;
      let totalPeso = 0;

      // Autoevaluación (20%)
      if (promedioAutoevaluacion > 0) {
        calificacionFinal += promedioAutoevaluacion * 0.20;
        totalPeso += 0.20;
      }

      // Evaluación del jefe (40%)
      if (promedioJefe > 0) {
        calificacionFinal += promedioJefe * 0.40;
        totalPeso += 0.40;
      }

      // Evaluación HSEQ (40%)
      if (promedioHseq > 0) {
        calificacionFinal += promedioHseq * 0.40;
        totalPeso += 0.40;
      }

      // Si no tenemos todas las evaluaciones, ajustar el peso
      if (totalPeso < 1.0 && totalPeso > 0) {
        calificacionFinal = calificacionFinal / totalPeso;
      }

      // Redondear a 1 decimal
      const calificacionRedondeada = totalPeso > 0 ? Math.round(calificacionFinal * 10) / 10 : null;
      
      return calificacionRedondeada;
    } catch (error) {
      return null;
    }
  };

  // Función para obtener el estado de la calificación final
  const getEstadoCalificacionFinal = (calificacion) => {
    if (!calificacion || calificacion === 0) return 'N/A';
    const num = parseFloat(calificacion);
    if (num >= 4.5) return 'EXCELENTE';
    if (num >= 4.0) return 'SUPERIOR';
    if (num >= 3.0) return 'SATISFACTORIO';
    if (num >= 2.0) return 'REGULAR';
    return 'INSUFICIENTE';
  };

  return (
    <>
      <SEO 
        title="Resultados de Evaluación de Desempeño"
        description="Consulta tus resultados de evaluación de desempeño en Meridian Consulting LTDA. Visualiza tu progreso, competencias evaluadas y métricas de desarrollo profesional."
        keywords="resultados evaluación, desempeño laboral, métricas profesionales, competencias evaluadas, progreso profesional, Meridian Consulting"
        url="https://evaluacion.meridianltda.com/results"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Resultados de Evaluación de Desempeño",
          "description": "Página de resultados del sistema de evaluación de desempeño de Meridian Consulting LTDA",
          "url": "https://evaluacion.meridianltda.com/results",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Sistema de Evaluación de Desempeño - Meridian Consulting LTDA",
            "url": "https://evaluacion.meridianltda.com"
          },
          "about": {
            "@type": "Thing",
            "name": "Resultados de Evaluación de Desempeño Laboral"
          }
        }}
      />
      <div className="results-page">
      <style>{`
        .estado-badge { padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        .estado-completada { background-color: #d4edda; color: #155724; }
        .estado-borrador { background-color: #fff3cd; color: #856404; }
        .estado-aprobada { background-color: #cce5ff; color: #004085; }
        
        /* Nuevos estados del flujo de trabajo */
        .estado-pendiente { background-color: #f8d7da; color: #721c24; }
        .estado-progreso { background-color: #fff3cd; color: #856404; }
        .estado-finalizada { background-color: #d1ecf1; color: #0c5460; }
        .estado-desconocido { background-color: #e2e3e5; color: #383d41; }
        
        /* Barra de progreso */
        .progreso-evaluacion {
          width: 100%;
          height: 8px;
          background-color: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 4px;
        }
        
        .progreso-evaluacion-fill {
          height: 100%;
          background: linear-gradient(90deg, #28a745, #20c997);
          transition: width 0.3s ease;
          border-radius: 4px;
        }
        
        .progreso-evaluacion-fill.pendiente { background: linear-gradient(90deg, #dc3545, #fd7e14); }
        .progreso-evaluacion-fill.progreso { background: linear-gradient(90deg, #ffc107, #fd7e14); }
        .progreso-evaluacion-fill.completada { background: linear-gradient(90deg, #17a2b8, #20c997); }
        .progreso-evaluacion-fill.finalizada { background: linear-gradient(90deg, #28a745, #20c997); }
        .download-btn { background-color: #007bff; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; transition: background-color 0.3s; }
        .download-btn:hover { background-color: #0056b3; }
        .download-btn:active { transform: translateY(1px); }
        .action-buttons { display: flex; gap: 8px; flex-wrap: wrap; }
        .pdf-btn { background-color: #dc3545; }
        .pdf-btn:hover { background-color: #c82333; }
        .excel-btn { background-color: #28a745; }
        .excel-btn:hover { background-color: #218838; }
        .hseq-btn { background-color: #17a2b8; }
        .hseq-btn:hover { background-color: #138496; }
        
        /* Estilos para la sección HSEQ */
        .results-hseq-section { margin-top: 40px; }
        .results-section-title { color: #2c5aa0; font-size: 24px; margin-bottom: 20px; text-align: center; }
        .results-hseq-container { display: grid; gap: 20px; }
        .hseq-evaluation-card { 
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); 
          border: 1px solid #dee2e6; 
          border-radius: 12px; 
          padding: 20px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .hseq-card-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 15px; 
          padding-bottom: 10px; 
          border-bottom: 2px solid #17a2b8;
        }
        .hseq-card-header h3 { margin: 0; color: #2c5aa0; font-size: 18px; }
        .hseq-period-badge { 
          background: #17a2b8; 
          color: white; 
          padding: 4px 12px; 
          border-radius: 20px; 
          font-size: 12px; 
          font-weight: bold;
        }
        .hseq-card-content { display: flex; flex-direction: column; gap: 15px; }
        .hseq-loading { 
          display: flex; 
          align-items: center; 
          gap: 10px; 
          color: #6c757d; 
          font-style: italic;
        }
        .loading-spinner { 
          width: 16px; 
          height: 16px; 
          border: 2px solid #f3f3f3; 
          border-top: 2px solid #17a2b8; 
          border-radius: 50%; 
          animation: spin 1s linear infinite;
        }
        .hseq-status { 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          font-weight: 600; 
          padding: 8px 12px; 
          border-radius: 8px;
        }
        .hseq-status.success { 
          background: #d4edda; 
          color: #155724; 
          border: 1px solid #c3e6cb;
        }
        .hseq-status.pending { 
          background: #fff3cd; 
          color: #856404; 
          border: 1px solid #ffeaa7;
        }
        .status-icon { font-size: 16px; }
        .hseq-message { 
          margin: 0; 
          color: #6c757d; 
          font-size: 14px; 
          line-height: 1.5;
        }
        .hseq-available { display: flex; flex-direction: column; gap: 10px; }
        
        /* Estilos para las nuevas tarjetas HSEQ */
        .hseq-evaluation-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border: 1px solid #dee2e6;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .hseq-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #dee2e6;
        }
        .hseq-card-title {
          margin: 0;
          color: #1F3B73;
          font-size: 18px;
          font-weight: 600;
        }
        .hseq-status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .hseq-status-badge.completed {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .hseq-card-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .hseq-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }
        .hseq-info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hseq-info-label {
          font-size: 12px;
          color: #6c757d;
          font-weight: 600;
          text-transform: uppercase;
        }
        .hseq-info-value {
          font-size: 14px;
          color: #212529;
          font-weight: 500;
        }
        .hseq-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .hseq-download-buttons {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }
        .hseq-download-btn {
          background: linear-gradient(135deg, #17a2b8, #138496);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        .hseq-download-btn:hover {
          background: linear-gradient(135deg, #138496, #117a8b);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(23, 162, 184, 0.3);
        }
        .hseq-download-btn.excel-btn {
          background: linear-gradient(135deg, #28a745, #1e7e34);
        }
        .hseq-download-btn.excel-btn:hover {
          background: linear-gradient(135deg, #1e7e34, #155724);
          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        }
        .hseq-no-evaluations {
          text-align: center;
          padding: 40px 20px;
          color: #6c757d;
        }
        .hseq-no-evaluations-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }
        .hseq-no-evaluations h3 {
          margin: 0 0 8px 0;
          color: #495057;
          font-size: 18px;
        }
        .hseq-no-evaluations p {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .results-info-banner { background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border: 1px solid #bbdefb; border-radius: 12px; padding: 20px; margin-bottom: 30px; display: flex; align-items: flex-start; gap: 15px; }
        .info-icon { font-size: 24px; flex-shrink: 0; }
        .info-content h3 { margin: 0 0 10px 0; color: #1976d2; font-size: 18px; }
        .info-content p { margin: 0 0 15px 0; color: #424242; line-height: 1.5; }
        .info-content ul { margin: 0; padding-left: 20px; }
        .info-content li { margin-bottom: 5px; color: #616161; }
        
        /* === Grid base === */
        .results-container { max-width: 1200px; margin: 0 auto; }
        .kpi-grid { display:grid; grid-template-columns: repeat(4, minmax(180px,1fr)); gap: 16px; margin: 16px 0 8px; }

        /* === KPI cards === */
        .kpi-card{ background:#fff; border:1px solid #dee2e6; border-radius:12px; padding:16px; box-shadow:0 2px 8px rgba(0,0,0,.05); display:flex; flex-direction:column; gap:6px }
        .kpi-value{ font-size:40px; line-height:1; font-weight:800; color:#1F3B73; letter-spacing:-.5px; text-align:center }
        .kpi-footer{ display:flex; justify-content:space-between; align-items:center }
        .kpi-label{ font-size:12px; color:#6b7280; font-weight:600; text-transform:uppercase; letter-spacing:.3px }
        .chip{ padding:2px 8px; border-radius:999px; font-size:11px; font-weight:700; border:1px solid rgba(0,0,0,.08) }
        .chip-excelente,.chip-superior{ background:#e7f5ee; color:#1e7e34 }
        .chip-satisfactorio{ background:#e8f1fb; color:#1d4ed8 }
        .chip-regular{ background:#fff7e6; color:#b45309 }
        .chip-insuficiente{ background:#fde7e9; color:#b91c1c }

        /* === Collapsible cards === */
        .card-collapsible{ background:#fff; border:1px solid #e5e7eb; border-radius:12px; margin:14px 0; overflow:hidden }
        .collapsible-head{ width:100%; display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:linear-gradient(135deg,#f8fafc,#eef2ff); color:#1F3B73; font-weight:700; border:none; cursor:pointer }
        .caret{ width:0; height:0; border-left:6px solid transparent; border-right:6px solid transparent }
        .caret.down{ border-top:6px solid #1F3B73 } .caret.up{ border-bottom:6px solid #1F3B73 }
        .collapsible-body{ padding:16px }

        /* === Timeline 3 pasos === */
        .timeline3{ display:flex; align-items:center; gap:8px; margin-bottom:8px }
        .tl-item{ display:flex; align-items:center; position:relative }
        .tl-dot{ width:14px; height:14px; border-radius:50%; background:#cbd5e1; border:2px solid #64748b }
        .tl-item.done .tl-dot{ background:#2c5aa0; border-color:#2c5aa0 }
        .tl-line{ width:56px; height:2px; background:#cbd5e1; margin:0 8px } .tl-line.done{ background:#2c5aa0 }
        .tl-meta{ margin-left:8px } .tl-title{ font-weight:700; font-size:12px } .tl-weight{ font-size:11px; color:#6b7280 }

        /* === Filtros === */
        .filters-bar{ display:flex; justify-content:space-between; align-items:center; gap:12px; padding:12px; background:#fff; border:1px solid #e5e7eb; border-radius:12px; margin:12px 0 }
        .filters-left{ display:flex; gap:12px; flex-wrap:wrap; align-items:end }
        .filters-left label{ display:flex; flex-direction:column; gap:4px; font-size:12px; color:#6b7280; font-weight:600; text-transform:uppercase }
        .filters-left select,.filters-left input{ min-width:180px; height:36px; padding:6px 10px; border:1px solid #cbd5e1; border-radius:8px; outline:0 }
        .filters-search input{ width:220px }

        /* === Tabla (alineaciones limpias) === */
        .results-table th{ position:sticky; top:0; background:#f8fafc; z-index:1 }
        .results-table td:nth-child(4),
        .results-table td:nth-child(5),
        .results-table td:nth-child(6),
        .results-table td:nth-child(7){ text-align:center }
        .results-table tbody tr:nth-child(odd){ background:#fafbfc }

        /* === Bloque cálculo === */
        .calc-block{ border:1px dashed #cbd5e1; padding:12px; border-radius:10px; background:#f8fafc }
        .calc-row{ display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px solid #edf2f7 }
        .calc-row:last-child{ border-bottom:none }
        .calc-note{ font-size:12px; color:#6b7280; margin-top:8px }

        /* === Listas compactas === */
        .list-compact{ margin:0; padding-left:18px }
        .list-compact li{ margin:2px 0 }

        /* Small tweaks existentes */
        .action-buttons{ gap:6px }

                /* ====== Responsive extras (NO cambian desktop) ====== */
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* >= tablet pequeña / <= 1024px */
        @media (max-width: 1024px) {
          .results-container{ max-width:100%; padding:0 16px; }
          .results-title{ font-size:22px; line-height:1.2; }

          /* KPIs de 4 → 2 columnas */
          .kpi-grid{ grid-template-columns: repeat(2, minmax(160px,1fr)); gap:12px; }

          /* Filtros en columna */
          .filters-bar{ flex-direction:column; align-items:stretch; gap:10px; }
          .filters-left{ width:100%; gap:10px; }
          .filters-left label{ flex:1; min-width:140px; }
          .filters-left select, .filters-left input{ width:100%; min-width:0; }

          /* HSEQ: dos columnas (ahora manejado por la regla general) */

          /* Textos informativos a una columna */
          .results-info > div{ grid-template-columns:1fr; }
        }

        /* móviles medianos / <= 768px */
        @media (max-width: 768px) {
          .results-main{ padding-top:8px; }
          .results-title{ font-size:20px; }

          /* KPIs: 1 columna, tamaños más amigables */
          .kpi-card{ padding:14px; }
          .kpi-value{ font-size:32px; }
          .kpi-label{ font-size:11px; }
          .kpi-grid{ grid-template-columns: 1fr; }

          /* Tabla: scroll horizontal (sin romper layout) */
          .results-table-container{ overflow-x:auto; -webkit-overflow-scrolling:touch; }
          .results-table{ min-width: 760px; } /* conserva estructura y header sticky */

          /* Botones de acción: ocupar ancho disponible */
          .action-buttons{ width:100%; }
          .action-buttons .download-btn{ flex:1; min-width:120px; }

          /* Filtros apilados 100% */
          .filters-left{ flex-direction:column; align-items:stretch; }
          .filters-left label{ width:100%; }
          .filters-search input{ width:100%; }

          /* Tarjetas HSEQ y badges */
          .hseq-card-header h3{ font-size:16px; }
          .hseq-period-badge{ font-size:11px; padding:4px 10px; }
          .hseq-download-buttons{ flex-direction:column; }
          .hseq-download-btn{ width:100%; justify-content:center; }

          /* Timeline compacto */
          .timeline3{ flex-wrap:wrap; gap:6px; }
          .tl-line{ width:36px; }
        }

        /* móviles chicos / <= 480px */
        @media (max-width: 480px) {
          .results-container{ padding:0 12px; }
          .results-title{ font-size:18px; }

          .kpi-card{ padding:12px; }
          .kpi-value{ font-size:28px; }

          .collapsible-head{ padding:10px 12px; }
          .collapsible-body{ padding:12px; }

          .filters-bar{ padding:10px; }
          .results-section-title{ font-size:20px; }

          .hseq-evaluation-card{ padding:16px; }
          .hseq-info-grid{ grid-template-columns:1fr; }

          .progreso-evaluacion{ height:6px; }
        }

        /* ===== Interpretación de resultados (responsive real) ===== */
        .results-info-grid{
          display:grid;
          grid-template-columns: repeat(2, minmax(260px, 1fr));
          gap:20px;
          margin-top:15px;
        }
        /* desktop ancho (opcional: 3 columnas) */
        @media (min-width: 1280px){
          .results-info-grid{ grid-template-columns: repeat(3, minmax(260px, 1fr)); }
        }
        /* tablet */
        @media (max-width: 1024px){
          .results-info-grid{ grid-template-columns: 1fr 1fr; }
        }
        /* móvil */
        @media (max-width: 768px){
          .results-info-grid{ grid-template-columns: 1fr; }
        }

        /* Puntos de color (bullets) en la leyenda */
        .dot{
          width:10px; height:10px; border-radius:999px;
          display:inline-block; margin-right:8px; vertical-align:middle;
        }
        .calificacion-excelente.dot{ background:#1e7e34; }
        .calificacion-buena.dot{ background:#1976D2; }
        .calificacion-satisfactoria.dot{ background:#1d4ed8; }
        .calificacion-regular.dot{ background:#b45309; }
        .calificacion-baja.dot{ background:#b91c1c; }

        /* HSEQ: columnas auto (1–3 según ancho) */
        .results-hseq-container{
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 20px;
          align-items: stretch;   /* que todas las tarjetas llenen el alto del track */
        }

        /* asegura que la tarjeta no se "encoja" dentro del grid */
        .card-collapsible{ width:100%; min-width:0; }
        .hseq-evaluation-card{ width:100%; }

      `}</style>

      <Header onLogout={onLogout} userRole={userRole} />

      <main className="results-main">
        <div className="results-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1 className="results-title">Historial de Evaluaciones de Desempeño</h1>
            <button 
              onClick={handleRefresh} 
              disabled={refreshing}
              style={{
                background: refreshing ? '#6c757d' : 'linear-gradient(135deg, #1F3B73, #0A0F1A)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: refreshing ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(31, 59, 115, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                if (!refreshing) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(31, 59, 115, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!refreshing) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(31, 59, 115, 0.3)';
                }
              }}
            >
              {refreshing ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Actualizando...
                </>
              ) : (
                <>
                  🔄 Actualizar
                </>
              )}
            </button>
          </div>

              <Collapsible title="Flujo de evaluación (3 etapas)" defaultOpen={false}>
                {/* El timeline usa el estado de la última evaluación como referencia visual */}
                {evaluacionesHistoricas[0] && (
                  <Timeline3Steps estado={getClaseEstado(evaluacionesHistoricas[0].estado_evaluacion)} />
                )}
                <ul className="list-compact">
                  <li><strong>Autoevaluación:</strong> 20%</li>
                  <li><strong>Evaluación del Jefe:</strong> 40%</li>
                  <li><strong>Evaluación HSEQ:</strong> 40%</li>
                </ul>
              </Collapsible>

              <Collapsible title="Cálculo de calificación final (ponderado)" defaultOpen={false}>
                <div className="calc-block">
                  <div className="calc-row"><span>Autoevaluación</span><span>20%</span></div>
                  <div className="calc-row"><span>Jefe</span><span>40%</span></div>
                  <div className="calc-row"><span>HSEQ</span><span>40%</span></div>
                  <div className="calc-note">Final = Auto (0.20) + Jefe (0.40) + HSEQ (0.40). Si falta alguna evaluación, se repondera automáticamente.</div>
                </div>
              </Collapsible>

          {loading ? (
            <div className="results-loading"><p>Cargando historial de evaluaciones...</p></div>
          ) : error ? (
            <div className="results-error"><p>{error}</p></div>
          ) : evaluacionesHistoricas.length === 0 ? (
            <div className="results-empty">
              <div className="results-empty-icon">📊</div>
              <h2>No hay evaluaciones disponibles</h2>
              <p>Aún no se han registrado evaluaciones de desempeño en el sistema.</p>
            </div>
          ) : (
            <div className="results-historico">
              {/* KPIs */}
              <div className="kpi-grid">
                <KPI label="Evaluaciones totales" value={evaluacionesHistoricas.length} />
                <KPI
                  label="Última calificación final"
                  value={(() => {
                    const ultima = evaluacionesHistoricas[0];
                    if (!ultima) return '—';
                    const hseq = evaluacionesHseq.find(h => h.periodo_evaluacion === ultima?.periodo_evaluacion);
                    const cf = calcularCalificacionFinal(ultima, hseq);
                    return (cf ?? '—');
                  })()}
                  chip={(() => {
                    const ultima = evaluacionesHistoricas[0];
                    if (!ultima) return null;
                    const hseq = evaluacionesHseq.find(h => h.periodo_evaluacion === ultima?.periodo_evaluacion);
                    const cf = calcularCalificacionFinal(ultima, hseq);
                    return cf ? getEstadoCalificacionFinal(cf) : null;
                  })()}
                />
                <KPI
                  label="Último promedio HSEQ"
                  value={(() => {
                    const ultima = evaluacionesHistoricas[0];
                    const hseq = evaluacionesHseq.find(h => h.periodo_evaluacion === ultima?.periodo_evaluacion);
                    return hseq?.promedio_hseq ? Number(hseq.promedio_hseq).toFixed(1) : '—';
                  })()}
                  chip={(() => {
                    const ultima = evaluacionesHistoricas[0];
                    const hseq = evaluacionesHseq.find(h => h.periodo_evaluacion === ultima?.periodo_evaluacion);
                    return hseq?.promedio_hseq ? getEstadoCalificacionFinal(parseFloat(hseq.promedio_hseq)) : null;
                  })()}
                />
                <KPI
                  label="Promedio histórico final"
                  value={(() => {
                    const vals = evaluacionesHistoricas.map(ev => {
                      const hseq = evaluacionesHseq.find(h => h.periodo_evaluacion === ev.periodo_evaluacion);
                      return calcularCalificacionFinal(ev, hseq);
                    }).filter(v => v !== null && v !== undefined);
                    if (!vals.length) return '—';
                    const avg = vals.reduce((a,b)=>a+b,0)/vals.length;
                    return avg.toFixed(1);
                  })()}
                />
              </div>

              {/* Botones de Reporte Consolidado */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '20px 0' }}>
                <button 
                  onClick={() => generateConsolidatedPDF(evaluacionesHistoricas[0])} 
                  disabled={generatingPDF || !evaluacionesHistoricas[0]}
                  style={{
                    background: generatingPDF ? '#6c757d' : 'linear-gradient(135deg, #dc3545, #c82333)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: generatingPDF ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(220, 53, 69, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!generatingPDF) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 16px rgba(220, 53, 69, 0.4)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!generatingPDF) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.3)';
                    }
                  }}
                >
                  {generatingPDF ? '⏳ Generando...' : '📄 Reporte Consolidado PDF'}
                </button>
                <button 
                  onClick={() => generateConsolidatedExcel(evaluacionesHistoricas[0])} 
                  disabled={generatingExcel || !evaluacionesHistoricas[0]}
                  style={{
                    background: generatingExcel ? '#6c757d' : 'linear-gradient(135deg, #28a745, #1e7e34)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: generatingExcel ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!generatingExcel) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 16px rgba(40, 167, 69, 0.4)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!generatingExcel) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.3)';
                    }
                  }}
                >
                  {generatingExcel ? '⏳ Generando...' : '📊 Reporte Consolidado Excel'}
                </button>
              </div>

              {/* Filtros */}
              <div className="filters-bar">
                <div className="filters-left">
                  <label>
                    <span>Período</span>
                    <select value={filterPeriodo} onChange={e=>setFilterPeriodo(e.target.value)}>
                      <option value="">Todos</option>
                      {periodos.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </label>
                  <label>
                    <span>Estado</span>
                    <select value={filterEstado} onChange={e=>setFilterEstado(e.target.value)}>
                      <option value="">Todos</option>
                      {estados.map(s => <option key={s} value={s}>{getDescripcionEstado(s)}</option>)}
                    </select>
                  </label>
                  <label className="filters-search">
                    <span>Buscar</span>
                    <input
                      type="search"
                      placeholder="Período o fecha…"
                      value={filterQuery}
                      onChange={e=>setFilterQuery(e.target.value)}
                    />
                  </label>
                </div>
                <div className="filters-right">
                  {/* Puedes añadir aquí 'Exportar vista' si más adelante quieres */}
                </div>
              </div>

              <div className="results-table-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Período</th>
                      <th>Estado</th>
                      <th>Calificación Final</th>
                      <th>Promedio General</th>
                      <th>Promedio Competencias</th>
                      <th>Promedio HSEQ</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluacionesFiltradas.map(evaluacion => {
                      const promedioGeneral = evaluacion.promedios?.promedio_general ? parseFloat(evaluacion.promedios.promedio_general) : 0;
                      const promedioCompetencias = evaluacion.promedios?.promedio_competencias ? parseFloat(evaluacion.promedios.promedio_competencias) : 0;
                      
                      // Buscar el promedio HSEQ correspondiente en las evaluaciones HSEQ
                      const hseqCorrespondiente = evaluacionesHseq.find(hseq => 
                        hseq.periodo_evaluacion === evaluacion.periodo_evaluacion
                      );
                      const promedioHseq = hseqCorrespondiente?.promedio_hseq ? parseFloat(hseqCorrespondiente.promedio_hseq) : 0;

                      // Calcular calificación final para esta evaluación
                      const calificacionFinal = calcularCalificacionFinal(evaluacion, hseqCorrespondiente);

                      return (
                        <tr key={evaluacion.id_evaluacion}>
                          <td>{formatDate(evaluacion.fecha_evaluacion)}</td>
                          <td>{evaluacion.periodo_evaluacion || 'N/A'}</td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <span className={`estado-badge ${getClaseEstado(evaluacion.estado_evaluacion)}`}>
                                {getDescripcionEstado(evaluacion.estado_evaluacion)}
                              </span>
                              <div className="progreso-evaluacion">
                                <div 
                                  className={`progreso-evaluacion-fill ${getClaseEstado(evaluacion.estado_evaluacion).replace('estado-', '')}`}
                                  style={{ width: `${getProgresoPorcentaje(evaluacion.estado_evaluacion)}%` }}
                                ></div>
                              </div>
                              <small style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                                {getProgresoPorcentaje(evaluacion.estado_evaluacion)}% completado
                              </small>
                            </div>
                          </td>
                          <td className={getColorClase(calificacionFinal)}>
                            {calificacionFinal ? (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {renderEstrellas(calificacionFinal)}
                                <small style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                                  {getEstadoCalificacionFinal(calificacionFinal)}
                                </small>
                              </div>
                            ) : 'N/A'}
                          </td>
                          <td className={getColorClase(promedioGeneral)}>{promedioGeneral > 0 ? renderEstrellas(promedioGeneral) : 'N/A'}</td>
                          <td className={getColorClase(promedioCompetencias)}>{promedioCompetencias > 0 ? promedioCompetencias.toFixed(1) : 'N/A'}</td>
                          <td className={getColorClase(promedioHseq)}>
                            {promedioHseq > 0 ? (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {renderEstrellas(promedioHseq)}
                                <small style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                                  {getEstadoCalificacionFinal(promedioHseq)}
                                </small>
                              </div>
                            ) : 'N/A'}
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="download-btn pdf-btn" onClick={() => generatePDF(evaluacion)} disabled={generatingPDF} title="Generar PDF">
                                {generatingPDF ? '⏳ Generando...' : '📄 PDF'}
                              </button>
                              <button className="download-btn excel-btn" onClick={() => generateExcel(evaluacion)} disabled={generatingExcel} title="Generar Excel">
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

              {/* Sección de Evaluaciones HSEQ */}
              <div className="results-hseq-section">
                <h2 className="results-section-title">Evaluaciones HSEQ</h2>
                <div className="results-hseq-container">
                  {evaluacionesHseq.length > 0 ? (
                    evaluacionesHseq.map(hseqEval => (
                      <Collapsible
                        key={`hseq-${hseqEval.id_hseq_evaluacion}`}
                        title={`🛡️ Evaluación HSEQ - ${hseqEval.periodo_evaluacion}`}
                        defaultOpen={false}
                      >
                        <div className="hseq-info-grid">
                          <div className="hseq-info-item"><span className="hseq-info-label">Evaluador</span><span className="hseq-info-value">{hseqEval.evaluador_nombre || 'N/A'}</span></div>
                          <div className="hseq-info-item"><span className="hseq-info-label">Fecha</span><span className="hseq-info-value">{formatDate(hseqEval.fecha_evaluacion)}</span></div>
                          <div className="hseq-info-item"><span className="hseq-info-label">Estado</span><span className="hseq-info-value">{hseqEval.estado_evaluacion}</span></div>
                          <div className="hseq-info-item">
                            <span className="hseq-info-label">Promedio HSEQ</span>
                            <span className="hseq-info-value">
                              {hseqEval.promedio_hseq ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  {renderEstrellas(parseFloat(hseqEval.promedio_hseq))}
                                  <small style={{ color:'#666' }}>({getEstadoCalificacionFinal(parseFloat(hseqEval.promedio_hseq))})</small>
                                </div>
                              ) : 'N/A'}
                            </span>
                          </div>
                        </div>
                        <div className="hseq-actions">
                          <button className="hseq-download-btn" onClick={() => downloadHseqPDF(hseqEval.periodo_evaluacion)}>📄 PDF HSEQ</button>
                          <button className="hseq-download-btn excel-btn" onClick={() => downloadHseqExcel(hseqEval)}>📊 Excel HSEQ</button>
                        </div>
                      </Collapsible>
                    ))
                  ) : (
                    <div className="hseq-no-evaluations">
                      <div className="hseq-no-evaluations-icon">🛡️</div>
                      <h3>No hay evaluaciones HSEQ disponibles</h3>
                      <p>Las evaluaciones HSEQ aparecerán aquí una vez que sean completadas por el equipo HSEQ.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="results-info">
                <h3>Interpretación de resultados</h3>
                <div className="results-info-grid">
                  <div>
                    <h4 style={{ color: '#2c5aa0', marginBottom: '10px' }}>Calificación Final (Promedio Ponderado)</h4>
                    <ul>
                      <li><span className="calificacion-excelente dot"></span> 4.5 - 5.0: EXCELENTE</li>
                      <li><span className="calificacion-buena dot"></span> 4.0 - 4.4: SUPERIOR</li>
                      <li><span className="calificacion-satisfactoria dot"></span> 3.0 - 3.9: SATISFACTORIO</li>
                      <li><span className="calificacion-regular dot"></span> 2.0 - 2.9: REGULAR</li>
                      <li><span className="calificacion-baja dot"></span> 0.0 - 1.9: INSUFICIENTE</li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: '#2c5aa0', marginBottom: '10px' }}>Componentes de Evaluación</h4>
                    <ul>
                      <li><strong>Autoevaluación:</strong> 20% del peso total</li>
                      <li><strong>Evaluación del Jefe:</strong> 40% del peso total</li>
                      <li><strong>Evaluación HSEQ:</strong> 40% del peso total</li>
                    </ul>
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '10px', fontStyle: 'italic' }}>
                      La calificación final combina las tres perspectivas para obtener una evaluación integral del desempeño.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      </div>
    </>
  );
}

export default Results;
