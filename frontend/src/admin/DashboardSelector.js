import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardSelector.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import SEO from '../components/SEO';

function DashboardSelector({ onLogout }) {
  const navigate = useNavigate();

  // Funciones para manejar los clicks en los botones
  const handleEmpleadosClick = () => {
    navigate('/admin/empleados');
  };

  // Gestión de Funciones eliminada

  const handleCargosClick = () => {
    navigate('/admin/cargos');
  };

  const handleDownloadReportClick = () => {
    generateAllEvaluationsExcel();
  };

  const generateAllEvaluationsExcel = async () => {
    try {
      const apiBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost/Evaluacion/backend';
      const resp = await fetch(`${apiBase}/api/evaluations/all-with-details`);
      if (!resp.ok) throw new Error('Error al obtener evaluaciones');
      const json = await resp.json();
      const rows = Array.isArray(json.data) ? json.data : [];

      const wb = new ExcelJS.Workbook();
      wb.created = new Date();
      wb.properties.title = 'Reporte Evaluaciones';
      wb.properties.company = 'Meridian Consulting LTDA';

      // Hoja principal con resumen
      const ws = wb.addWorksheet('Resumen Evaluaciones', { views: [{ state: 'frozen', ySplit: 6 }] });
      
      // Hoja para competencias detalladas
      const wsCompetencias = wb.addWorksheet('Competencias Detalladas', { views: [{ state: 'frozen', ySplit: 1 }] });
      
      // Hoja para HSEQ detallado
      const wsHseq = wb.addWorksheet('HSEQ Detallado', { views: [{ state: 'frozen', ySplit: 1 }] });
      
      // Hoja para Compromisos y Seguimiento
      const wsCompromisos = wb.addWorksheet('Compromisos y Seguimiento', { views: [{ state: 'frozen', ySplit: 1 }] });

      // Título
      ws.mergeCells('A1:X1');
      const title = ws.getCell('A1');
      title.value = 'REPORTE DE EVALUACIONES - MERIDIAN CONSULTING LTDA';
      title.font = { name: 'Calibri', size: 16, bold: true, color: { argb: 'FF1F3B73' } };
      title.alignment = { horizontal: 'center', vertical: 'middle' };

      ws.getCell('A3').value = 'Fecha de generación:';
      ws.getCell('B3').value = new Date().toLocaleString('es-CO');
      ws.getCell('A4').value = 'Total de evaluaciones:';
      ws.getCell('B4').value = rows.length;

      // Encabezados principales
      const headers = [
        'ID Evaluación','ID Empleado','Cédula','Nombre','Cargo','Área','Email','Fecha Evaluación','Período',
        'Estado','Fecha Creación','Fecha Autoevaluación','Fecha Eval. Jefe','Fecha Eval. HSEQ',
        'Nombre Jefe','Cargo Jefe','Evaluador HSEQ','Cargo Eval. HSEQ','Obs. Generales','Comentarios HSEQ',
        'Promedio Autoevaluación','Promedio Eval. Jefe','Promedio HSEQ','Promedio General'
      ];
      ws.addRow([]); // fila 5 vacía
      const headerRow = ws.addRow(headers);
      headerRow.eachCell((cell) => {
        cell.font = { name: 'Calibri', bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF34495E' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = { top:{style:'thin'}, left:{style:'thin'}, right:{style:'thin'}, bottom:{style:'thin'} };
      });

      const formatDate = (v) => {
        if (!v) return '';
        const d = new Date(v);
        return isNaN(d) ? ('' + v) : d.toLocaleString('es-CO');
      };

      // Datos principales
      rows.forEach((r, idx) => {
        // Usar SIEMPRE los valores de BD sin recalcular
        const promedioAuto = parseFloat(r.promedio_autoevaluacion) || 0;
        const promedioJefe = parseFloat(r.promedio_evaluacion_jefe) || 0;
        const promedioHseq = parseFloat(r.promedio_hseq_detalle) || 0;
        const promedioGeneral = parseFloat(r.promedio_general) || 0;
        
        const row = ws.addRow([
          r.id_evaluacion,
          r.id_empleado,
          r.empleado_cedula,
          r.empleado_nombre,
          r.empleado_cargo,
          r.empleado_area,
          r.empleado_email,
          formatDate(r.fecha_evaluacion),
          r.periodo_evaluacion,
          r.estado_evaluacion,
          formatDate(r.fecha_creacion),
          formatDate(r.fecha_autoevaluacion),
          formatDate(r.fecha_evaluacion_jefe),
          formatDate(r.fecha_evaluacion_hseq),
          r.jefe_nombre,
          r.jefe_cargo,
          r.evaluador_hseq_nombre,
          r.evaluador_hseq_cargo,
          r.observaciones_generales,
          r.comentarios_hseq,
          promedioAuto || 0,
          promedioJefe || 0,
          promedioHseq || 0,
          promedioGeneral || 0
        ]);
        // Zebra
        if (idx % 2 === 0) {
          row.eachCell((cell, col) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8F9FA' } };
          });
        }
        row.eachCell((cell) => {
          cell.border = { bottom: { style: 'thin', color: { argb: 'FFDEE2E6' } } };
          cell.alignment = { vertical: 'middle', wrapText: true };
        });
      });

      // Anchos
      const widths = [14,12,14,28,22,18,26,20,14,16,20,20,20,20,24,18,22,18,36,36,20,20,20,20];
      widths.forEach((w, i) => ws.getColumn(i+1).width = w);

      // ===== HOJA DE COMPETENCIAS DETALLADAS =====
      wsCompetencias.getCell('A1').value = 'COMPETENCIAS DETALLADAS - MERIDIAN CONSULTING LTDA';
      wsCompetencias.mergeCells('A1:J1');
      const titleComp = wsCompetencias.getCell('A1');
      titleComp.font = { name: 'Calibri', size: 16, bold: true, color: { argb: 'FF1F3B73' } };
      titleComp.alignment = { horizontal: 'center', vertical: 'middle' };

      // Encabezados competencias
      const headersComp = ['ID Evaluación', 'Empleado', 'Aspecto', 'Calificación Empleado', 'Justificación Empleado', 'Calificación Jefe', 'Justificación Jefe', 'Promedio', 'Fecha Creación'];
      const headerRowComp = wsCompetencias.addRow(headersComp);
      headerRowComp.eachCell((cell) => {
        cell.font = { name: 'Calibri', bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF34495E' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = { top:{style:'thin'}, left:{style:'thin'}, right:{style:'thin'}, bottom:{style:'thin'} };
      });

      // Datos competencias
      rows.forEach((r) => {
        if (r.competencias_detalle && Array.isArray(r.competencias_detalle)) {
          r.competencias_detalle.forEach((comp) => {
            const rowComp = wsCompetencias.addRow([
              r.id_evaluacion,
              r.empleado_nombre,
              comp.aspecto,
              comp.calificacion_empleado || '',
              comp.justificacion_empleado || '',
              comp.calificacion_jefe || '',
              comp.justificacion_jefe || '',
              comp.promedio || '',
              formatDate(comp.fecha_creacion)
            ]);
            rowComp.eachCell((cell) => {
              cell.border = { bottom: { style: 'thin', color: { argb: 'FFDEE2E6' } } };
              cell.alignment = { vertical: 'middle', wrapText: true };
            });
          });
        }
      });

      // Anchos competencias
      const widthsComp = [14, 30, 50, 20, 40, 20, 40, 15, 20];
      widthsComp.forEach((w, i) => wsCompetencias.getColumn(i+1).width = w);

      // ===== HOJA DE HSEQ DETALLADO =====
      wsHseq.getCell('A1').value = 'HSEQ DETALLADO - MERIDIAN CONSULTING LTDA';
      wsHseq.mergeCells('A1:K1');
      const titleHseq = wsHseq.getCell('A1');
      titleHseq.font = { name: 'Calibri', size: 16, bold: true, color: { argb: 'FF1F3B73' } };
      titleHseq.alignment = { horizontal: 'center', vertical: 'middle' };

      // Encabezados HSEQ
      const headersHseq = ['ID Evaluación', 'Empleado', 'Responsabilidad', 'Calificación', 'Evaluación Jefe', 'Justificación', 'Fecha Creación Item', 'Fecha Eval. HSEQ', 'Evaluador HSEQ', 'Observaciones', 'Comentarios HSEQ'];
      const headerRowHseq = wsHseq.addRow(headersHseq);
      headerRowHseq.eachCell((cell) => {
        cell.font = { name: 'Calibri', bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF34495E' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = { top:{style:'thin'}, left:{style:'thin'}, right:{style:'thin'}, bottom:{style:'thin'} };
      });

      // Datos HSEQ
      rows.forEach((r) => {
        if (r.hseq_detalle && Array.isArray(r.hseq_detalle)) {
          r.hseq_detalle.forEach((hseq) => {
            const rowHseq = wsHseq.addRow([
              r.id_evaluacion,
              r.empleado_nombre,
              hseq.responsabilidad,
              hseq.calificacion || '',
              hseq.evaluacion_jefe || '',
              hseq.justificacion || '',
              formatDate(hseq.fecha_creacion),
              formatDate(r.fecha_evaluacion_hseq),
              r.evaluador_hseq_nombre || 'Luis Guevara',
              r.observaciones_generales || '',
              r.comentarios_hseq || ''
            ]);
            rowHseq.eachCell((cell) => {
              cell.border = { bottom: { style: 'thin', color: { argb: 'FFDEE2E6' } } };
              cell.alignment = { vertical: 'middle', wrapText: true };
            });
          });
        }
      });

      // Anchos HSEQ
      const widthsHseq = [14, 30, 40, 15, 20, 40, 20, 20, 25, 40, 40];
      widthsHseq.forEach((w, i) => wsHseq.getColumn(i+1).width = w);

      // ===== HOJA DE COMPROMISOS Y SEGUIMIENTO =====
      wsCompromisos.getCell('A1').value = 'COMPROMISOS Y SEGUIMIENTO - MERIDIAN CONSULTING LTDA';
      wsCompromisos.mergeCells('A1:O1');
      const titleCompromisos = wsCompromisos.getCell('A1');
      titleCompromisos.font = { name: 'Calibri', size: 16, bold: true, color: { argb: 'FF1F3B73' } };
      titleCompromisos.alignment = { horizontal: 'center', vertical: 'middle' };

      // Encabezados compromisos y seguimiento
      const headersCompromisos = [
        'ID Evaluación', 'Empleado', 'Período', 'Estado',
        'Fortalezas', 'Aspectos a Mejorar', 'Necesidades Capacitación',
        'Plan Actividad', 'Plan Responsable', 'Plan Seguimiento', 'Plan Fecha',
        'Compromiso Descripción', 'Compromiso Responsable', 'Compromiso Fecha', 'Compromiso Estado'
      ];
      const headerRowCompromisos = wsCompromisos.addRow(headersCompromisos);
      headerRowCompromisos.eachCell((cell) => {
        cell.font = { name: 'Calibri', bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF34495E' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = { top:{style:'thin'}, left:{style:'thin'}, right:{style:'thin'}, bottom:{style:'thin'} };
      });

      // Datos compromisos y seguimiento
      rows.forEach((r, idx) => {
        const mejoramiento = r.mejoramiento || {};
        const planAccion = r.plan_accion || {};
        const actaCompromiso = Array.isArray(r.acta_compromiso) ? r.acta_compromiso : [];
        
        // Si hay acta de compromiso, crear una fila por cada compromiso
        if (actaCompromiso.length > 0) {
          actaCompromiso.forEach((compromiso, compIdx) => {
            const rowCompromiso = wsCompromisos.addRow([
              r.id_evaluacion,
              r.empleado_nombre,
              r.periodo_evaluacion,
              r.estado_evaluacion,
              compIdx === 0 ? (mejoramiento.fortalezas || mejoramiento.fortaleza || '') : '',
              compIdx === 0 ? (mejoramiento.aspectos_mejorar || mejoramiento.aspectosMejorar || '') : '',
              compIdx === 0 ? (mejoramiento.necesidades_capacitacion || mejoramiento.necesidadesCapacitacion || '') : '',
              compIdx === 0 ? (planAccion.actividad || '') : '',
              compIdx === 0 ? (planAccion.responsable || '') : '',
              compIdx === 0 ? (planAccion.seguimiento || '') : '',
              compIdx === 0 ? (planAccion.fecha ? formatDate(planAccion.fecha) : '') : '',
              compromiso.descripcion || compromiso.compromiso || '',
              compromiso.responsable || '',
              compromiso.fecha ? formatDate(compromiso.fecha) : '',
              compromiso.estado || compromiso.cumplido || ''
            ]);
            rowCompromiso.eachCell((cell) => {
              cell.border = { bottom: { style: 'thin', color: { argb: 'FFDEE2E6' } } };
              cell.alignment = { vertical: 'middle', wrapText: true };
            });
            // Zebra
            if ((idx + compIdx) % 2 === 0) {
              rowCompromiso.eachCell((cell) => {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8F9FA' } };
              });
            }
          });
        } else {
          // Si no hay acta de compromiso, crear una fila con mejoramiento y plan de acción
          const rowCompromiso = wsCompromisos.addRow([
            r.id_evaluacion,
            r.empleado_nombre,
            r.periodo_evaluacion,
            r.estado_evaluacion,
            mejoramiento.fortalezas || mejoramiento.fortaleza || '',
            mejoramiento.aspectos_mejorar || mejoramiento.aspectosMejorar || '',
            mejoramiento.necesidades_capacitacion || mejoramiento.necesidadesCapacitacion || '',
            planAccion.actividad || '',
            planAccion.responsable || '',
            planAccion.seguimiento || '',
            planAccion.fecha ? formatDate(planAccion.fecha) : '',
            '',
            '',
            '',
            ''
          ]);
          rowCompromiso.eachCell((cell) => {
            cell.border = { bottom: { style: 'thin', color: { argb: 'FFDEE2E6' } } };
            cell.alignment = { vertical: 'middle', wrapText: true };
          });
          // Zebra
          if (idx % 2 === 0) {
            rowCompromiso.eachCell((cell) => {
              cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8F9FA' } };
            });
          }
        }
      });

      // Anchos compromisos
      const widthsCompromisos = [14, 30, 14, 16, 40, 40, 30, 40, 25, 40, 20, 50, 25, 20, 15];
      widthsCompromisos.forEach((w, i) => wsCompromisos.getColumn(i+1).width = w);

      const buf = await wb.xlsx.writeBuffer({ useStyles: true, useSharedStrings: true });
      const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileName = `evaluaciones_completas_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.xlsx`;
      saveAs(blob, fileName);
    } catch (e) {
      alert('Error al generar Excel de evaluaciones: ' + (e?.message || 'desconocido'));
    }
  };

  return (
    <>
      <SEO 
        title="Panel de Administración - Sistema de Evaluación"
        description="Panel de administración del sistema de evaluación de desempeño de Meridian Consulting LTDA. Gestiona empleados, cargos y configuraciones del sistema."
        keywords="panel administración, gestión empleados, gestión cargos, administración sistema, Meridian Consulting, evaluación desempeño"
        url="https://evaluacion.meridianltda.com/admin"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Panel de Administración - Sistema de Evaluación",
          "description": "Panel de administración del sistema de evaluación de desempeño",
          "url": "https://evaluacion.meridianltda.com/admin",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Sistema de Evaluación de Desempeño - Meridian Consulting LTDA",
            "url": "https://evaluacion.meridianltda.com"
          },
          "about": {
            "@type": "Thing",
            "name": "Administración de Sistema de Evaluación"
          }
        }}
      />
      <div className="admin-dashboard">
      <Header onLogout={onLogout} />
      
      <main className="admin-main">
        <div className="admin-container">
          <h1 className="admin-title">Panel de Administrador</h1>
          <p className="admin-subtitle">Seleccione el módulo al que desea acceder:</p>
          
          <div className="admin-buttons">
            <button 
              className="admin-button empleados"
              onClick={handleEmpleadosClick}
            >
              <div className="button-content">
                <i className="button-icon empleados-icon"></i>
                <span>Gestión de Empleados</span>
              </div>
            </button>
            
            {/* Botón Gestión de Funciones eliminado */}
            
            <button 
              className="admin-button cargos"
              onClick={handleCargosClick}
            >
              <div className="button-content">
                <i className="button-icon cargos-icon"></i>
                <span>Gestión de Cargos</span>
              </div>
            </button>
            
            <button 
              className="admin-button reportes"
              onClick={handleDownloadReportClick}
            >
              <div className="button-content">
                <i className="button-icon reportes-icon"></i>
                <span>Descargar Reporte Excel</span>
              </div>
            </button>
          </div>
          
          <div className="admin-info">
            <p>Desde este panel podrá administrar los datos fundamentales del sistema de evaluación de desempeño.</p>
          </div>
        </div>
      </main>

      <Footer />
      </div>
    </>
  );
}

export default DashboardSelector; 