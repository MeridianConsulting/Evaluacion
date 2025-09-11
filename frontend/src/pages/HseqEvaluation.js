import React, { useEffect, useMemo, useState } from 'react';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hseq from '../components/hseq';
import { useNotification } from '../components/NotificationSystem';

function HseqEvaluation({ onLogout, userRole }) {
  const { success, error: showError, warning } = useNotification();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluatedSet, setEvaluatedSet] = useState(new Set());
  const [hseqGlobalMap, setHseqGlobalMap] = useState({});
  const [searchText, setSearchText] = useState('');
  const [hseqItems, setHseqItems] = useState([
    { id: 1,  responsabilidad: 'Procurar el cuidado integral de su salud.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 2,  responsabilidad: 'Suministrar información clara, veraz y completa sobre su estado de salud.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 3,  responsabilidad: 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 4,  responsabilidad: 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 5,  responsabilidad: 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 6,  responsabilidad: 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 7,  responsabilidad: 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 8,  responsabilidad: 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 9,  responsabilidad: 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 10, responsabilidad: 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 11, responsabilidad: 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 12, responsabilidad: 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 13, responsabilidad: 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 14, responsabilidad: 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 15, responsabilidad: 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 16, responsabilidad: 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 17, responsabilidad: 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 18, responsabilidad: 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 19, responsabilidad: 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', evaluacionJefe: '', justificacionJefe: '' },
    { id: 20, responsabilidad: 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', evaluacionJefe: '', justificacionJefe: '' },
  ]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const periodo = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;

        const bossId = localStorage.getItem('employeeId');

        const [empRes, evalRes, globalRes] = await Promise.all([
          fetch(`${apiUrl}/api/employees`),
          bossId ? fetch(`${apiUrl}/api/evaluations/hseq-evaluated/${bossId}/${periodo}`) : Promise.resolve({ ok: true, json: async () => ({ data: [] }) }),
          fetch(`${apiUrl}/api/evaluations/hseq-evaluated/${periodo}`)
        ]);

        const empJson = await empRes.json();
        const empList = (empJson && (empJson.data || empJson)) || [];
        setEmployees(Array.isArray(empList) ? empList : []);

        if (evalRes) {
          const evalJson = await evalRes.json();
          const evalList = (evalJson && (evalJson.data || [])) || [];
          const ids = new Set(evalList.map(it => Number(it.id_empleado)));
          setEvaluatedSet(ids);
        }

        if (globalRes) {
          const globalJson = await globalRes.json();
          const rows = (globalJson && (globalJson.data || [])) || [];
          const map = {};
          rows.forEach(r => {
            const key = Number(r.id_empleado);
            map[key] = r;
          });
          setHseqGlobalMap(map);
        }
      } catch (e) {
        setError('No se pudo cargar empleados');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleHseqChange = (id, field, value) => {
    setHseqItems(prev => prev.map(it => it.id === id ? { ...it, [field]: value } : it));
  };

  const handleHseqJustificacionChange = (id, field, value) => {
    setHseqItems(prev => prev.map(it => it.id === id ? { ...it, [field]: value } : it));
  };

  const calcularPromedioHseq = () => {
    let suma = 0;
    let count = 0;
    hseqItems.forEach(it => {
      const v = Number(it.evaluacionJefe) || 0;
      if (v > 0) { suma += v; count += 1; }
    });
    return count ? (suma / count).toFixed(2) : 0;
  };

  const getHseqErrorStyle = () => ({});

  const periodoActual = useMemo(() => (
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
  ), []);

  const pendientes = useMemo(() => employees.filter(emp => !evaluatedSet.has(Number(emp.id_empleado))), [employees, evaluatedSet]);
  const evaluados = useMemo(() => employees.filter(emp => evaluatedSet.has(Number(emp.id_empleado))), [employees, evaluatedSet]);

  const totalEmpleados = employees.length;
  const evaluadosGlobal = useMemo(() => Object.keys(hseqGlobalMap).length, [hseqGlobalMap]);
  const pendientesGlobal = Math.max(0, totalEmpleados - evaluadosGlobal);
  const porcentajeCompletado = totalEmpleados ? Math.round((evaluadosGlobal / totalEmpleados) * 100) : 0;
  const porcentajePendiente = 100 - porcentajeCompletado;

  const empleadosFiltrados = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(emp => String(emp.nombre || '').toLowerCase().includes(q) || String(emp.cedula || '').includes(q));
  }, [employees, searchText]);

  // Función para validar la evaluación HSEQ
  const validarEvaluacionHseq = () => {
    if (!selectedEmployee) {
      warning('Selección requerida', 'Debe seleccionar un empleado para evaluar.');
      return false;
    }

    // Validar que todas las calificaciones estén completas
    const calificacionesFaltantes = hseqItems.filter(item => 
      !item.evaluacionJefe || item.evaluacionJefe === '' || item.evaluacionJefe === '0'
    );

    if (calificacionesFaltantes.length > 0) {
      warning('Calificaciones incompletas', `Debe calificar todas las responsabilidades HSEQ. Faltan ${calificacionesFaltantes.length} calificaciones.`);
      return false;
    }

    return true;
  };

  // Función para enviar la evaluación HSEQ
  const handleSubmitHseqEvaluation = async () => {
    if (!validarEvaluacionHseq()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      
      // Preparar datos para enviar
      const formData = new FormData();
      formData.append('employeeId', selectedEmployee.id_empleado);
      formData.append('hseqData', JSON.stringify(hseqItems));
      formData.append('promedioHseq', calcularPromedioHseq());
      formData.append('periodoEvaluacion', new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'));
      
      // Obtener ID del evaluador (jefe) desde localStorage
      const evaluadorId = localStorage.getItem('employeeId');
      if (evaluadorId) {
        formData.append('bossId', evaluadorId);
      }

      const response = await fetch(`${apiUrl}/api/evaluations/save-hseq`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        success('¡Evaluación HSEQ completada!', 'La evaluación HSEQ ha sido guardada exitosamente.');
        
        // Limpiar formulario después del éxito
        setHseqItems(prev => prev.map(item => ({
          ...item,
          evaluacionJefe: '',
          justificacionJefe: ''
        })));
        setSelectedEmployee(null);
      } else {
        const errorMessage = data.error ? 
          `Error: ${data.error}` : 
          `Error al guardar: ${data.message || 'Error desconocido'}`;
        showError('Error al guardar', errorMessage);
      }
    } catch (error) {
      showError('Error de conexión', 'Error al guardar la evaluación HSEQ. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hseq-evaluation-page">
      <Header onLogout={onLogout} userRole={userRole} />
      <main className="evaluation-container-unique" style={{ padding: 'clamp(1rem, 5vw, 2rem)', flex: 1 }}>
        <style>{`
          .hseq-card { 
            max-width: 1100px; 
            margin: 0 auto; 
            background: #ffffff; 
            border-radius: 12px; 
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            overflow: hidden;
          }
          .hseq-card-header {
            background: linear-gradient(90deg, #1F3B73 0%, #0A0F1A 100%);
            color: #fff;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .hseq-card-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0;
          }
          .hseq-body { padding: 18px 20px; }
          .hseq-toolbar { 
            display: grid; 
            grid-template-columns: 1fr; 
            gap: 12px; 
            margin-bottom: 16px; 
          }
          .hseq-field { display: flex; flex-direction: column; gap: 6px; }
          .hseq-label { font-weight: 600; color: #1f2937; }
          .hseq-select { 
            appearance: none;
            width: 100%;
            padding: 10px 12px;
            background: #f9fafb; 
            border: 1px solid #e5e7eb; 
            border-radius: 8px; 
            outline: none; 
            transition: box-shadow .2s ease, border-color .2s ease; 
          }
          .hseq-select:focus { 
            border-color: #1F3B73; 
            box-shadow: 0 0 0 4px rgba(31, 59, 115, 0.12);
            background: #ffffff;
          }
          .hseq-employee-info { 
            display: flex; 
            flex-wrap: wrap; 
            gap: 10px; 
            padding: 12px; 
            border: 1px solid #e5e7eb; 
            border-radius: 10px; 
            background: #f8fafc; 
            margin-bottom: 14px; 
          }
          .hseq-badge { 
            display: inline-flex; 
            align-items: center; 
            gap: 6px; 
            background: #eef2ff; 
            color: #1f3b73; 
            font-weight: 600; 
            border-radius: 9999px; 
            padding: 6px 12px; 
            border: 1px solid rgba(31,59,115,.15);
          }
          @media (min-width: 720px) { 
            .hseq-toolbar { grid-template-columns: 1fr 1fr; }
          }
          /* Asegurar footer pegado al fondo */
          .hseq-evaluation-page { min-height: 100vh; display: flex; flex-direction: column; }
          /* Dashboard */
          .hseq-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 14px 0; }
          .hseq-stat { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; }
          .hseq-stat-title { color: #6b7280; font-size: 12px; font-weight: 600; }
          .hseq-stat-value { color: #111827; font-size: 20px; font-weight: 800; }
          .hseq-progress { height: 8px; background: #eef2ff; border-radius: 999px; overflow: hidden; }
          .hseq-progress-bar { height: 100%; background: linear-gradient(90deg, #1F3B73, #0A0F1A); }
          .hseq-dash-table { width: 100%; border-collapse: collapse; }
          .hseq-dash-table th { text-align: left; font-size: 12px; color: #374151; background: #f3f4f6; padding: 10px; }
          .hseq-dash-table td { font-size: 14px; padding: 10px; border-bottom: 1px solid #f1f5f9; }
          .badge { display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:999px; border:1px solid transparent; font-size:12px; font-weight:700; }
          .badge-ok { background:#ecfdf5; color:#065f46; border-color:rgba(16,185,129,.25); }
          .badge-pend { background:#fefce8; color:#92400e; border-color:rgba(245,158,11,.25); }
          .search-input { width:100%; padding:10px 12px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; }
          @media (min-width: 900px) { .hseq-stats { grid-template-columns: repeat(4, 1fr); } }
        `}</style>

        <div className="hseq-card">
          <div className="hseq-card-header">
            <h1 className="hseq-card-title">Evaluación HSEQ</h1>
          </div>
          <div className="hseq-body">
            {loading && <p>Cargando empleados...</p>}
            {error && <p style={{ color: '#dc2626' }}>{error}</p>}

            {!loading && !error && (
              <div className="hseq-toolbar">
                <div className="hseq-field">
                  <label className="hseq-label">Seleccione empleado</label>
                  <select
                    className="hseq-select"
                    value={selectedEmployee?.id_empleado || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      const emp = employees.find(x => String(x.id_empleado) === String(val));
                      setSelectedEmployee(emp || null);
                    }}
                  >
                    <option value="">-- Seleccione --</option>
                    {pendientes.length > 0 && (
                      <optgroup label="Pendientes">
                        {pendientes.map(emp => (
                          <option key={`p-${emp.id_empleado}`} value={emp.id_empleado}>{emp.nombre}</option>
                        ))}
                      </optgroup>
                    )}
                    {evaluados.length > 0 && (
                      <optgroup label="Evaluados HSEQ">
                        {evaluados.map(emp => (
                          <option key={`e-${emp.id_empleado}`} value={emp.id_empleado}>✅ {emp.nombre}</option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Período: {periodoActual}</span>
                </div>
              </div>
            )}

            {/* Dashboard HSEQ */}
            {!loading && !error && (
              <div style={{ marginTop: '10px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'8px' }}>
                  <h2 style={{ fontSize:'1rem', margin:0, color:'#111827' }}>Dashboard HSEQ</h2>
                  <div style={{ width:'260px' }}>
                    <input
                      className="search-input"
                      placeholder="Buscar por nombre o cédula"
                      value={searchText}
                      onChange={(e)=>setSearchText(e.target.value)}
                    />
                  </div>
                </div>
                <div className="hseq-stats">
                  <div className="hseq-stat">
                    <div className="hseq-stat-title">Total empleados</div>
                    <div className="hseq-stat-value">{totalEmpleados}</div>
                  </div>
                  <div className="hseq-stat">
                    <div className="hseq-stat-title">Evaluados HSEQ</div>
                    <div className="hseq-stat-value">{evaluadosGlobal}</div>
                  </div>
                  <div className="hseq-stat">
                    <div className="hseq-stat-title">Pendientes HSEQ</div>
                    <div className="hseq-stat-value">{pendientesGlobal}</div>
                  </div>
                  <div className="hseq-stat">
                    <div className="hseq-stat-title">Avance del período</div>
                    <div className="hseq-progress" aria-label={`Avance ${porcentajeCompletado}%`}>
                      <div className="hseq-progress-bar" style={{ width: `${porcentajeCompletado}%` }} />
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#6b7280', marginTop:'6px' }}>
                      <span>Completado: {porcentajeCompletado}%</span>
                      <span>Pendiente: {porcentajePendiente}%</span>
                    </div>
                  </div>
                </div>

                <div style={{ width:'100%', overflowX:'auto', border:'1px solid #e5e7eb', borderRadius:'10px' }}>
                  <table className="hseq-dash-table">
                    <thead>
                      <tr>
                        <th>Empleado</th>
                        <th>Estado</th>
                        <th>Evaluador HSEQ</th>
                        <th>Fecha</th>
                        <th style={{ textAlign:'right' }}>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empleadosFiltrados.map(emp => {
                        const info = hseqGlobalMap[Number(emp.id_empleado)];
                        const estadoOk = Boolean(info && String(info.estado_evaluacion).toUpperCase() === 'COMPLETADA');
                        const fecha = info && info.fecha_evaluacion ? new Date(info.fecha_evaluacion) : null;
                        return (
                          <tr key={`row-${emp.id_empleado}`}>
                            <td style={{ whiteSpace:'nowrap' }}>{emp.nombre}</td>
                            <td>
                              <span className={`badge ${estadoOk ? 'badge-ok' : 'badge-pend'}`}>
                                {estadoOk ? 'Completada' : 'Pendiente'}
                              </span>
                            </td>
                            <td>{info?.evaluador_nombre || '-'}</td>
                            <td>{fecha ? fecha.toLocaleDateString() : '-'}</td>
                            <td style={{ textAlign:'right' }}>
                              <button
                                onClick={()=> setSelectedEmployee(emp)}
                                style={{
                                  background: 'linear-gradient(135deg, #1F3B73, #0A0F1A)',
                                  color: '#fff', border:'none', borderRadius:'6px', padding:'8px 12px', cursor:'pointer'
                                }}
                              >
                                Evaluar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {empleadosFiltrados.length === 0 && (
                        <tr>
                          <td colSpan={5} style={{ textAlign:'center', color:'#6b7280', padding:'16px' }}>Sin resultados</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedEmployee && (
              <>
                <div className="hseq-employee-info">
                  <span className="hseq-badge">
                    <span>Empleado:</span> {selectedEmployee.nombre}
                  </span>
                  <span className="hseq-badge" style={{ background: evaluatedSet.has(Number(selectedEmployee.id_empleado)) ? '#ecfdf5' : '#fefce8', color: evaluatedSet.has(Number(selectedEmployee.id_empleado)) ? '#065f46' : '#92400e', borderColor: evaluatedSet.has(Number(selectedEmployee.id_empleado)) ? 'rgba(16,185,129,.25)' : 'rgba(245,158,11,.25)'}}>
                    {evaluatedSet.has(Number(selectedEmployee.id_empleado)) ? 'HSEQ: Completada' : 'HSEQ: Pendiente'}
                  </span>
                </div>
                <Hseq
                  hseqItems={hseqItems}
                  handleHseqChange={handleHseqChange}
                  handleHseqJustificacionChange={handleHseqJustificacionChange}
                  calcularPromedioHseq={calcularPromedioHseq}
                  getHseqErrorStyle={getHseqErrorStyle}
                />
                
                {/* Botón de envío */}
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '24px',
                  padding: '20px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <button
                    onClick={handleSubmitHseqEvaluation}
                    disabled={isSubmitting}
                    style={{
                      background: isSubmitting 
                        ? '#9ca3af' 
                        : 'linear-gradient(135deg, #1F3B73, #0A0F1A)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: isSubmitting 
                        ? 'none' 
                        : '0 4px 12px rgba(31, 59, 115, 0.3)',
                      transition: 'all 0.3s ease',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                    onMouseOver={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 16px rgba(31, 59, 115, 0.4)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(31, 59, 115, 0.3)';
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid #ffffff',
                          borderTop: '2px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        Enviar Evaluación HSEQ
                      </>
                    )}
                  </button>
                  
                  {/* Mostrar promedio actual */}
                  <div style={{ 
                    marginTop: '12px', 
                    fontSize: '14px', 
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    Promedio actual: <strong style={{ color: '#1F3B73' }}>{calcularPromedioHseq()}</strong>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HseqEvaluation;


