import React, { useState, useEffect } from 'react';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useNotification } from '../components/NotificationSystem';

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
                <Text style={pdfStyles.tableCellSm}>Jefe</Text>
                <Text style={pdfStyles.tableCellSm}>Promedio</Text>
                <Text style={pdfStyles.tableCellObs}>Observaciones</Text>
              </View>
              {evaluationData.competencias.map((c, idx) => (
                <View key={idx} style={pdfStyles.tableRow}>
                  <Text style={pdfStyles.tableCellAspect}>{c.aspecto || 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{c.calificacion_empleado ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{c.calificacion_jefe ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{c.promedio ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellObs}>{getObs(c)}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {evaluationData.hseq_data && evaluationData.hseq_data.length > 0 && (
        <View style={pdfStyles.section}>
          <View style={pdfStyles.sectionHeader}>
            <Text>RESPONSABILIDADES HSEQ</Text>
          </View>
          <View style={pdfStyles.sectionContent}>
            <View style={pdfStyles.table}>
              <View style={[pdfStyles.tableRow, pdfStyles.tableHeader]}>
                <Text style={pdfStyles.tableCellAspect}>Responsabilidad</Text>
                <Text style={pdfStyles.tableCellSm}>Calificación</Text>
                <Text style={pdfStyles.tableCellSm}>Autoeval.</Text>
                <Text style={pdfStyles.tableCellSm}>Eval. Jefe</Text>
                <Text style={pdfStyles.tableCellObs}>Observaciones</Text>
              </View>
              {evaluationData.hseq_data.map((h, idx) => (
                <View key={idx} style={pdfStyles.tableRow}>
                  <Text style={pdfStyles.tableCellAspect}>{h.responsabilidad || 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{h.calificacion ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{h.autoevaluacion ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellSm}>{h.evaluacion_jefe ?? 'N/A'}</Text>
                  <Text style={pdfStyles.tableCellObs}>{getObs(h)}</Text>
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
            {evaluationData.firmas?.firma_empleado ? (
              <Image src={evaluationData.firmas.firma_empleado} style={pdfStyles.signatureImage} />
            ) : (
              <Text style={pdfStyles.signatureLabel}>_________________________</Text>
            )}
          </View>
          <View style={pdfStyles.signatureBox}>
            <Text style={pdfStyles.signatureLabel}>Jefe Directo</Text>
            {evaluationData.firmas?.firma_jefe ? (
              <Image src={evaluationData.firmas.firma_jefe} style={pdfStyles.signatureImage} />
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

// Helper: asegura prefijo data URL
const toDataUrl = (b64) => {
  if (!b64) return null;
  return b64.startsWith('data:image') ? b64 : `data:image/png;base64,${b64}`;
};

function Results({ onLogout, userRole }) {
  const { success, error: showError } = useNotification();
  const [evaluacionesHistoricas, setEvaluacionesHistoricas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [generatingExcel, setGeneratingExcel] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
        const response = await fetch(`${apiUrl}/api/evaluations/employee/${employeeId}`);
        if (!response.ok) throw new Error('Error al obtener el historial de evaluaciones');
        const data = await response.json();
        
        const evaluaciones = data.success && Array.isArray(data.evaluaciones) ? data.evaluaciones : [];
        setEvaluacionesHistoricas(evaluaciones);
      } catch (err) {
        console.error('Error:', err);
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
      const response = await fetch(`${apiUrl}/api/evaluations/employee/${employeeId}`);
      if (!response.ok) throw new Error('Error al obtener el historial de evaluaciones');
      const data = await response.json();
      
      const evaluaciones = data.success && Array.isArray(data.evaluaciones) ? data.evaluaciones : [];
      setEvaluacionesHistoricas(evaluaciones);
      success('Datos actualizados', 'El historial de evaluaciones se ha actualizado desde la base de datos.');
    } catch (err) {
      console.error('Error:', err);
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

  // ===================== PDF (SIN CAMBIOS) =====================
  const generatePDF = async (evaluacion) => {
    try {
      setGeneratingPDF(true);
      const employeeId = localStorage.getItem('employeeId');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/evaluations/${evaluacion.id_evaluacion}/complete/${employeeId}`);
      if (!response.ok) throw new Error('Error al obtener datos completos de la evaluación');
      const { data: evaluationData } = await response.json();
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
      console.error('Error al generar PDF:', error);
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
    const estadoGral = estadoPorValor(promGral);

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
    drawCard(`E${kpiTop}:F${kpiTop+3}`, promGral, 'Promedio General', estadoGral);
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
    const hdrH = ws.addRow(['Responsabilidad', 'Calificación', 'Autoeval.', 'Eval. Jefe', 'Estado', 'Observaciones']);
    hdrH.eachCell((c, i) => {
      if (i<=6) {
        c.font = { name:'Calibri', bold:true, color:{ argb:'FFFFFFFF' } };
        c.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:'FF34495E' } };
        c.alignment = { horizontal:'center', vertical:'middle', wrapText: i===6 };
      }
    });
    const headerHseqRow = hdrH.number;

    zebra = false;
    (evaluationData.hseq_data || []).forEach(h => {
      zebra = !zebra;
      const cal = numOrBlank(h.calificacion);
      const est = estadoPorValor(cal);
      const r = ws.addRow([dash(h.responsabilidad), cal, numOrBlank(h.autoevaluacion), numOrBlank(h.evaluacion_jefe), '', normalizeObs(h)]);
      r.eachCell((cell, col) => {
        cell.font = FONT_BODY;
        cell.border = { bottom:{ style:'thin', color:{ argb:PALETTE.border } } };
        cell.alignment = { vertical:'middle', wrapText: col===6, horizontal: (col>=2 && col<=4) ? 'right' : (col===5 ? 'center' : 'left') };
        if (zebra) cell.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:PALETTE.zebra } };
      });
      ['B','C','D'].forEach(col => { const c = ws.getCell(`${col}${r.number}`); if (c.value !== null) c.numFmt = ONE_DEC; });
      applyEstadoChip(ws.getCell(`E${r.number}`), est);
    });
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
    console.error('Error al generar Excel:', e);
    showError('Error al generar Excel', 'Error al generar el archivo Excel. Intente nuevamente.');
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
      console.error('Error al descargar PDF:', error);
      showError('Error al descargar', 'Error al descargar el reporte. Intente nuevamente.');
    }
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
      'EVALUACION_JEFE_COMPLETADA': 'Pendiente Evaluación HSEQ',
      'HSEQ_PENDIENTE': 'Pendiente Evaluación HSEQ',
      'HSEQ_COMPLETADA': 'Evaluación HSEQ Completada',
      'EVALUACION_FINALIZADA': 'Evaluación Finalizada',
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
      'EVALUACION_JEFE_COMPLETADA': 'estado-progreso',
      'HSEQ_PENDIENTE': 'estado-progreso',
      'HSEQ_COMPLETADA': 'estado-completada',
      'EVALUACION_FINALIZADA': 'estado-finalizada',
      'BORRADOR': 'estado-borrador',
      'COMPLETADA': 'estado-completada',
      'APROBADA': 'estado-aprobada'
    };
    return clases[estado] || 'estado-desconocido';
  };

  // Función para obtener el porcentaje de progreso
  const getProgresoPorcentaje = (estado) => {
    const progresos = {
      'AUTOEVALUACION_PENDIENTE': 20,
      'AUTOEVALUACION_COMPLETADA': 40,
      'EVALUACION_JEFE_PENDIENTE': 40,
      'EVALUACION_JEFE_COMPLETADA': 60,
      'HSEQ_PENDIENTE': 60,
      'HSEQ_COMPLETADA': 80,
      'EVALUACION_FINALIZADA': 100,
      'BORRADOR': 10,
      'COMPLETADA': 80,
      'APROBADA': 100
    };
    return progresos[estado] || 0;
  };

  return (
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
        .results-info-banner { background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border: 1px solid #bbdefb; border-radius: 12px; padding: 20px; margin-bottom: 30px; display: flex; align-items: flex-start; gap: 15px; }
        .info-icon { font-size: 24px; flex-shrink: 0; }
        .info-content h3 { margin: 0 0 10px 0; color: #1976d2; font-size: 18px; }
        .info-content p { margin: 0 0 15px 0; color: #424242; line-height: 1.5; }
        .info-content ul { margin: 0; padding-left: 20px; }
        .info-content li { margin-bottom: 5px; color: #616161; }
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

          <div className="results-info-banner">
            <div className="info-icon">ℹ️</div>
            <div className="info-content">
              <h3>Flujo de Evaluación de Desempeño</h3>
              <p>El sistema ahora maneja un <strong>flujo de trabajo estructurado</strong> con 3 etapas principales:</p>
              <ul>
                <li><strong>1️⃣ Autoevaluación del Colaborador:</strong> El empleado completa su autoevaluación</li>
                <li><strong>2️⃣ Evaluación del Líder Inmediato:</strong> El jefe directo revisa y evalúa</li>
                <li><strong>3️⃣ Evaluación HSEQ Institucional:</strong> Evaluación final por parte de HSEQ</li>
              </ul>
              <p>Los <strong>reportes PDF y Excel</strong> están disponibles para evaluaciones completadas.</p>
            </div>
          </div>

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
              <div className="results-summary">
                <div className="results-summary-item">
                  <span className="summary-label">Evaluaciones totales:</span>
                  <span className="summary-value">{evaluacionesHistoricas.length}</span>
                </div>
                <div className="results-summary-item">
                  <span className="summary-label">Última calificación:</span>
                  <span className="summary-value">
                    {evaluacionesHistoricas[0]?.promedios?.promedio_general
                      ? renderEstrellas(parseFloat(evaluacionesHistoricas[0].promedios.promedio_general))
                      : 'N/A'}
                  </span>
                </div>
                <div className="results-summary-item">
                  <span className="summary-label">Promedio histórico:</span>
                  <span className="summary-value">
                    {evaluacionesHistoricas.length > 0
                      ? renderEstrellas(
                          evaluacionesHistoricas.reduce((acc, ev) =>
                            acc + (ev.promedios?.promedio_general ? parseFloat(ev.promedios.promedio_general) : 0), 0
                          ) / evaluacionesHistoricas.length
                        )
                      : 'N/A'}
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
                          <td className={getColorClase(promedioGeneral)}>{promedioGeneral > 0 ? renderEstrellas(promedioGeneral) : 'N/A'}</td>
                          <td className={getColorClase(promedioCompetencias)}>{promedioCompetencias > 0 ? promedioCompetencias.toFixed(2) : 'N/A'}</td>
                          <td className={getColorClase(promedioHseq)}>{promedioHseq > 0 ? promedioHseq.toFixed(2) : 'N/A'}</td>
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
