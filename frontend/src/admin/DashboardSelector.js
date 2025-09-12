import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardSelector.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

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
      const resp = await fetch(`${apiBase}/api/evaluations/all`);
      if (!resp.ok) throw new Error('Error al obtener evaluaciones');
      const json = await resp.json();
      const rows = Array.isArray(json.data) ? json.data : [];

      const wb = new ExcelJS.Workbook();
      wb.created = new Date();
      wb.properties.title = 'Reporte Evaluaciones';
      wb.properties.company = 'Meridian Consulting LTDA';

      const ws = wb.addWorksheet('Evaluaciones', { views: [{ state: 'frozen', ySplit: 6 }] });

      // Título
      ws.mergeCells('A1:T1');
      const title = ws.getCell('A1');
      title.value = 'REPORTE DE EVALUACIONES - MERIDIAN CONSULTING LTDA';
      title.font = { name: 'Calibri', size: 16, bold: true, color: { argb: 'FF1F3B73' } };
      title.alignment = { horizontal: 'center', vertical: 'middle' };

      ws.getCell('A3').value = 'Fecha de generación:';
      ws.getCell('B3').value = new Date().toLocaleString('es-CO');
      ws.getCell('A4').value = 'Total de evaluaciones:';
      ws.getCell('B4').value = rows.length;

      // Encabezados
      const headers = [
        'ID Evaluación','ID Empleado','Cédula','Nombre','Cargo','Área','Email','Fecha Evaluación','Período',
        'Estado','Fecha Creación','Fecha Autoevaluación','Fecha Eval. Jefe','Fecha Eval. HSEQ',
        'Nombre Jefe','Cargo Jefe','Evaluador HSEQ','Cargo Eval. HSEQ','Obs. Generales','Comentarios HSEQ'
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

      // Datos
      rows.forEach((r, idx) => {
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
          r.comentarios_hseq
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
      const widths = [14,12,14,28,22,18,26,20,14,16,20,20,20,20,24,18,22,18,36,36];
      widths.forEach((w, i) => ws.getColumn(i+1).width = w);

      const buf = await wb.xlsx.writeBuffer({ useStyles: true, useSharedStrings: true });
      const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileName = `evaluaciones_todas_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.xlsx`;
      saveAs(blob, fileName);
    } catch (e) {
      alert('Error al generar Excel de evaluaciones: ' + (e?.message || 'desconocido'));
    }
  };

  return (
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
  );
}

export default DashboardSelector; 