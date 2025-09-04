import React, { useState, useEffect } from 'react';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

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
  const [evaluacionesHistoricas, setEvaluacionesHistoricas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [generatingExcel, setGeneratingExcel] = useState(false);

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
        setEvaluacionesHistoricas(data.success && Array.isArray(data.evaluaciones) ? data.evaluaciones : []);
      } catch (err) {
        console.error('Error:', err);
        setError('Error al cargar el historial de evaluaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
  }, []);

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

      alert(`✅ Archivo PDF generado exitosamente: ${fileName}`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Intente nuevamente.');
    } finally {
      setGeneratingPDF(false);
    }
  };

  // ===================== EXCEL (con columna OBSERVACIONES) =====================
  const generateExcel = async (evaluacion) => {
    try {
      setGeneratingExcel(true);

      // Traer datos completos
      const employeeId = localStorage.getItem('employeeId');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const resp = await fetch(`${apiUrl}/api/evaluations/${evaluacion.id_evaluacion}/complete/${employeeId}`);
      if (!resp.ok) throw new Error('Error al obtener datos completos de la evaluación');
      const { data: evaluationData } = await resp.json();

      // Workbook
      const wb = new ExcelJS.Workbook();
      wb.created = new Date();
      wb.properties.title = `Evaluación ${evaluacion.id_evaluacion}`;
      wb.properties.company = 'Meridian Consulting LTDA';

      // Colores
      const azulMeridian = '2C5AA0';
      const grisHeader   = '34495E';
      const grisSeccion  = '5A6C7D';

      // Hoja
      const ws = wb.addWorksheet('Evaluación de Desempeño', {
        pageSetup: { paperSize: 9, orientation: 'portrait', fitToPage: true }
      });

      // AHORA SON 6 COLUMNAS (A..F) para incluir "Observaciones"
      ws.columns = [
        { header: '', key: 'c1', width: 34 }, // A
        { header: '', key: 'c2', width: 26 }, // B
        { header: '', key: 'c3', width: 18 }, // C
        { header: '', key: 'c4', width: 24 }, // D
        { header: '', key: 'c5', width: 18 }, // E (Estado)
        { header: '', key: 'c6', width: 45 }, // F (Observaciones) - ancho para textos largos
      ];

      // Helpers
      const addSectionHeader = (title) => {
        const r = ws.addRow([title]);
        ws.mergeCells(`A${r.number}:F${r.number}`);
        const c = ws.getCell(`A${r.number}`);
        c.font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: grisSeccion } };
        c.alignment = { horizontal: 'left', vertical: 'middle' };
        return r.number;
      };

      const estadoPorValor = (n) => {
        const v = parseFloat(n || 0);
        if (v >= 4.5) return 'EXCELENTE';
        if (v >= 4.0) return 'SUPERIOR';
        if (v >= 3.0) return 'SATISFACTORIO';
        if (v >= 2.0) return 'REGULAR';
        return 'INSUFICIENTE';
      };

      const colorPorCalificacion = (val) => {
        const v = parseFloat(val);
        if (isNaN(v)) return null;
        if (v >= 4.5) return 'FFD5E8D4';
        if (v >= 4.0) return 'FFB8D4E3';
        if (v >= 3.0) return 'FFFFF2CC';
        if (v >= 2.0) return 'FFF8CECC';
        return 'FFF5B7B1';
      };

      const normalizeObs = (obj) =>
        obj?.observaciones ??
        obj?.observacion ??
        obj?.justificacion ??
        obj?.comentario ??
        obj?.nota ??
        'N/A';

      const setRowBaseStyle = (row) => {
        row.eachCell((cell, colNum) => {
          cell.font = { size: 11, color: { argb: 'FF2C3E50' } };
          cell.border = { bottom: { style: 'thin', color: { argb: 'FFBDC3C7' } } };
          cell.alignment = { vertical: 'middle', wrapText: colNum === 6 ? true : false }; // wrap solo en OBS
        });
      };

      // Título
      ws.mergeCells('A1:F1');
      ws.getCell('A1').value = 'EVALUACIÓN DE DESEMPEÑO - MERIDIAN CONSULTING LTDA';
      ws.getCell('A1').font = { bold: true, size: 20, color: { argb: 'FFFFFFFF' } };
      ws.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };
      ws.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: azulMeridian } };
      ws.addRow([]);

      ws.mergeCells('A3:F3');
      ws.getCell('A3').value = 'CUADRO DE MANDO - EVALUACIÓN DE DESEMPEÑO';
      ws.getCell('A3').font = { bold: true, size: 16, color: { argb: 'FFFFFFFF' } };
      ws.getCell('A3').alignment = { horizontal: 'center' };
      ws.getCell('A3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4A90E2' } };
      ws.addRow([]);

      // Período/fecha/estado
      ws.addRows([
        ['Período de Evaluación:', evaluationData.evaluacion?.periodo_evaluacion || 'N/A', '', 'Estado:', evaluationData.evaluacion?.estado_evaluacion || 'N/A', ''],
        ['Fecha de Evaluación:', evaluationData.evaluacion?.fecha_evaluacion ? new Date(evaluationData.evaluacion.fecha_evaluacion).toLocaleDateString('es-ES') : 'N/A', '', '', '', ''],
        [''],
      ]);

      // Datos del empleado + Resumen
      addSectionHeader('DATOS DEL EMPLEADO');
      ws.addRow(['Nombre:', evaluationData.empleado?.nombre || 'N/A', '', 'Promedio Competencias:', evaluationData.promedios?.promedio_competencias || 'N/A', '']);
      ws.addRow(['Cargo:',   evaluationData.empleado?.cargo  || 'N/A', '', 'Promedio HSEQ:',       evaluationData.promedios?.promedio_hseq || 'N/A', '']);
      ws.addRow(['Área:',    evaluationData.empleado?.area   || 'N/A', '', 'Promedio General:',    evaluationData.promedios?.promedio_general || 'N/A', '']);
      ws.addRow(['ID Empleado:', evaluationData.empleado?.id_empleado || 'N/A', '', 'Calificación Final:', estadoPorValor(evaluationData.promedios?.promedio_general), '']);
      ws.addRow(['']);

      // ===================== Competencias (con OBSERVACIONES) =====================
      if (Array.isArray(evaluationData.competencias) && evaluationData.competencias.length) {
        addSectionHeader('COMPETENCIAS EVALUADAS');

        const hdr = ws.addRow(['Aspecto', 'Calificación Empleado', 'Calificación Jefe', 'Promedio', 'Estado', 'Observaciones']);
        hdr.eachCell((c, col) => {
          c.font = { bold: true, color: { argb: 'FFFFFFFF' } };
          c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: grisHeader } };
          c.alignment = { horizontal: col === 6 ? 'left' : 'center', vertical: 'middle', wrapText: col === 6 };
          c.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });

        evaluationData.competencias.forEach((c) => {
          const obs = normalizeObs(c);
          const row = ws.addRow([
            c.aspecto || 'N/A',
            c.calificacion_empleado ?? 'N/A',
            c.calificacion_jefe ?? 'N/A',
            c.promedio ?? 'N/A',
            estadoPorValor(c.promedio),
            obs,
          ]);
          setRowBaseStyle(row);

          // Coloreos B, C, D
          ['B', 'C', 'D'].forEach((col) => {
            const cell = ws.getCell(`${col}${row.number}`);
            const fill = colorPorCalificacion(cell.value);
            if (fill) {
              cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } };
              cell.font = { ...cell.font, bold: true };
              cell.alignment = { ...cell.alignment, horizontal: 'center' };
            }
          });

          // Estado (E)
          const eCell = ws.getCell(`E${row.number}`);
          const txt = `${eCell.value || ''}`;
          let fill = 'FFF5B7B1';
          if (txt.includes('EXCELENTE')) fill = 'FFD5E8D4';
          else if (txt.includes('SUPERIOR')) fill = 'FFB8D4E3';
          else if (txt.includes('SATISFACTORIO')) fill = 'FFFFF2CC';
          else if (txt.includes('REGULAR')) fill = 'FFF8CECC';
          eCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } };
          eCell.font = { ...eCell.font, bold: true, color: { argb: 'FF2C3E50' } };
          eCell.alignment = { horizontal: 'center', vertical: 'middle' };

          // Altura estimada por longitud de observación
          const len = (obs || '').toString().length;
          if (len > 60) {
            row.height = Math.min(120, 18 + Math.ceil(len / 70) * 15);
          }
        });

        ws.addRow(['']);
      }

      // ===================== HSEQ (con OBSERVACIONES) =====================
      if (Array.isArray(evaluationData.hseq_data) && evaluationData.hseq_data.length) {
        addSectionHeader('RESPONSABILIDADES HSEQ');

        const hdr = ws.addRow(['Responsabilidad', 'Calificación', 'Autoevaluación', 'Evaluación Jefe', 'Estado', 'Observaciones']);
        hdr.eachCell((c, col) => {
          c.font = { bold: true, color: { argb: 'FFFFFFFF' } };
          c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: grisHeader } };
          c.alignment = { horizontal: col === 6 ? 'left' : 'center', vertical: 'middle', wrapText: col === 6 };
        });

        evaluationData.hseq_data.forEach((h) => {
          const obs = normalizeObs(h);
          const row = ws.addRow([
            h.responsabilidad || 'N/A',
            h.calificacion ?? 'N/A',
            h.autoevaluacion ?? 'N/A',
            h.evaluacion_jefe ?? 'N/A',
            estadoPorValor(h.calificacion),
            obs,
          ]);
          setRowBaseStyle(row);

          // colorear B
          const bCell = ws.getCell(`B${row.number}`);
          const bFill = colorPorCalificacion(bCell.value);
          if (bFill) {
            bCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bFill } };
            bCell.font = { ...bCell.font, bold: true };
            bCell.alignment = { ...bCell.alignment, horizontal: 'center' };
          }

          // estado (E)
          const eCell = ws.getCell(`E${row.number}`);
          const txt = `${eCell.value || ''}`;
          let fill = 'FFF5B7B1';
          if (txt.includes('EXCELENTE')) fill = 'FFD5E8D4';
          else if (txt.includes('SUPERIOR')) fill = 'FFB8D4E3';
          else if (txt.includes('SATISFACTORIO')) fill = 'FFFFF2CC';
          else if (txt.includes('REGULAR')) fill = 'FFF8CECC';
          eCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } };
          eCell.font = { ...eCell.font, bold: true, color: { argb: 'FF2C3E50' } };
          eCell.alignment = { horizontal: 'center', vertical: 'middle' };

          const len = (obs || '').toString().length;
          if (len > 60) {
            row.height = Math.min(120, 18 + Math.ceil(len / 70) * 15);
          }
        });

        ws.addRow(['']);
      }

      // ===================== Plan de Mejoramiento =====================
      if (evaluationData.mejoramiento || evaluationData.plan_accion) {
        addSectionHeader('PLAN DE MEJORAMIENTO Y DESARROLLO');
        ws.addRow(['Fortalezas:', evaluationData.mejoramiento?.fortalezas || 'N/A', '', 'Aspectos a Mejorar:', evaluationData.mejoramiento?.aspectos_mejorar || 'N/A', '']);
        ws.addRow(['PLAN DE ACCIÓN', '', '', '', '', '']);
        ws.addRow(['Actividad:', evaluationData.plan_accion?.actividad || 'N/A', '', 'Responsable:', evaluationData.plan_accion?.responsable || 'N/A', '']);
        ws.addRow(['Seguimiento:', evaluationData.plan_accion?.seguimiento || 'N/A', '', 'Fecha:', evaluationData.plan_accion?.fecha || 'N/A', '']);
        ws.addRow(['']);
      }

      // ===================== Firmas y validación (imágenes) =====================
      const firmasHeaderRow = addSectionHeader('FIRMAS Y VALIDACIÓN');
      ws.addRow(['Evaluado:', evaluationData.empleado?.nombre || 'N/A', '', 'Jefe Directo:', evaluationData.evaluacion?.evaluador_nombre || 'N/A', '']);
      ws.addRow(['Cargo:', evaluationData.empleado?.cargo || 'N/A', '', 'Cargo:', evaluationData.evaluacion?.evaluador_cargo || 'N/A', '']);
      ws.addRow(['']);
      ws.addRow(['Firma del Empleado:', '', '', 'Firma del Jefe:', '', '']);
      // Espacio para imágenes
      for (let i = 0; i < 8; i++) ws.addRow(['', '', '', '', '', '']);

      const empDataUrl = toDataUrl(evaluationData.firmas?.firma_empleado);
      const jefeDataUrl = toDataUrl(evaluationData.firmas?.firma_jefe);

      if (empDataUrl) {
        const imgId = wb.addImage({ base64: empDataUrl, extension: 'png' });
        ws.addImage(imgId, {
          tl: { col: 1, row: firmasHeaderRow + 5 }, // Columna B
          ext: { width: 200, height: 80 },
          editAs: 'oneCell'
        });
      }
      if (jefeDataUrl) {
        const imgId = wb.addImage({ base64: jefeDataUrl, extension: 'png' });
        ws.addImage(imgId, {
          tl: { col: 4, row: firmasHeaderRow + 5 }, // Columna E
          ext: { width: 200, height: 80 },
          editAs: 'oneCell'
        });
      }
      ws.addRow(['']);

      // ===================== Información técnica =====================
      const tech = addSectionHeader('INFORMACIÓN TÉCNICA DEL REPORTE');
      ws.addRow(['ID Evaluación:', evaluationData.evaluacion?.id_evaluacion || 'N/A', '', 'Versión Sistema:', '1.0', '']);
      ws.addRow(['ID Empleado:', evaluationData.empleado?.id_empleado || 'N/A', '', 'Formato:', 'Excel (.xlsx)', '']);
      ws.addRow(['Fecha Generación:', new Date().toLocaleDateString('es-ES'), '', 'Hora:', new Date().toLocaleTimeString('es-ES'), '']);
      ws.addRow(['ESTADÍSTICAS:', '', '', '', '', '']);
      ws.addRow(['Total Competencias:', evaluationData.competencias?.length || 0, '', 'Total HSEQ:', evaluationData.hseq_data?.length || 0, '']);
      ws.addRow(['Promedio General:', evaluationData.promedios?.promedio_general || 'N/A', '', 'Estado General:', estadoPorValor(evaluationData.promedios?.promedio_general), '']);

      // Exportar
      const buf = await wb.xlsx.writeBuffer({ useStyles: true, useSharedStrings: true });
      const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileName = `evaluacion_${evaluacion.id_evaluacion}_${new Date().toISOString().split('T')[0]}.xlsx`;
      saveAs(blob, fileName);

      alert(`✅ Reporte Excel generado con observaciones: ${fileName}`);
    } catch (e) {
      console.error('Error al generar Excel:', e);
      alert('Error al generar el archivo Excel. Intente nuevamente.');
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
      alert('Error al descargar el reporte. Intente nuevamente.');
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

  return (
    <div className="results-page">
      <style jsx="true">{`
        .estado-badge { padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        .estado-completada { background-color: #d4edda; color: #155724; }
        .estado-borrador { background-color: #fff3cd; color: #856404; }
        .estado-aprobada { background-color: #cce5ff; color: #004085; }
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
          <h1 className="results-title">Historial de Evaluaciones de Desempeño</h1>

          <div className="results-info-banner">
            <div className="info-icon">ℹ️</div>
            <div className="info-content">
              <h3>Reportes Disponibles</h3>
              <p>Genera reportes en <strong>PDF</strong> y <strong>Excel</strong>. El Excel ahora incluye una columna de <strong>Observaciones</strong> al frente de cada ítem.</p>
              <ul>
                <li><strong>📄 PDF:</strong> Reporte visual con firmas integradas</li>
                <li><strong>📊 Excel:</strong> Tablas con Observaciones y firmas</li>
              </ul>
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
                          <td><span className={`estado-badge estado-${evaluacion.estado_evaluacion?.toLowerCase()}`}>{evaluacion.estado_evaluacion}</span></td>
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
