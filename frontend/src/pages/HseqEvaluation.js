import React, { useEffect, useState } from 'react';
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
    const loadEmployees = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const resp = await fetch(`${apiUrl}/api/employees`);
        const json = await resp.json();
        const list = (json && (json.data || json)) || [];
        setEmployees(Array.isArray(list) ? list : []);
      } catch (e) {
        setError('No se pudo cargar empleados');
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
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
      <main className="evaluation-container-unique" style={{ padding: 'clamp(1rem, 5vw, 2rem)' }}>
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
                    {employees.map(emp => (
                      <option key={emp.id_empleado} value={emp.id_empleado}>
                        {emp.nombre} - {emp.cargo || ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {selectedEmployee && (
              <>
                <div className="hseq-employee-info">
                  <span className="hseq-badge">
                    <span>Empleado:</span> {selectedEmployee.nombre}
                  </span>
                  <span className="hseq-badge">
                    <span>Cargo:</span> {selectedEmployee.cargo || ''}
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


