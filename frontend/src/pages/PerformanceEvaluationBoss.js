import React, { useState, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import "../assets/css/Styles1.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignatureUploader from '../components/SignatureUploader';
import { useNotification } from '../components/NotificationSystem';
import CompletionCelebrationBoss from '../components/CompletionCelebrationBoss';
import CompetenciasTable from "../components/CompetenciasTable";
import CompetenciasTableBoss from "../components/CompetenciasTableBoss";
import ValidationSummaryAlert from "../components/ValidationSummaryAlert";


function PerformanceEvaluationBoss() {
  const { success, error: showError, warning } = useNotification();
  const [employee, setEmployee] = useState(null);
  const [boss, setBoss] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [employeeSignature, setEmployeeSignature] = useState(null);
  const [bossSignature, setBossSignature] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [alertFading, setAlertFading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [visibleErrors, setVisibleErrors] = useState({}); // Estado para controlar errores visibles
  const [formTouched, setFormTouched] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [realAverages, setRealAverages] = useState({
    promedioCompetencias: 0,
    promedioHseq: 0,
    promedioGeneral: 0
  });
  const [datosGenerales, setDatosGenerales] = useState({
    fechaIngreso: '',
    fechaEvaluacion: '',
    area: '',
    categoriaEvaluacion: 'Anual', // Valor por defecto
  });
  // Modo de evaluación: autoevaluación (empleado) o revisión de jefe
  // Por defecto: desactivar gating por rol para evitar conflictos
  const [isManagerView, setIsManagerView] = useState(false);
  const isSelfView = false;
  const [mejoramiento, setMejoramiento] = useState({
    fortalezas: '',
    aspectosMejorar: '',
    necesidadesCapacitacion: ''
  });
  const [planesAccion, setPlanesAccion] = useState([
    {
      id: 1,
      actividad: '',
      responsable: '',
      seguimiento: '',
      fecha: '',
      comentariosJefe: ''
    }
  ]);
  const [actaCompromiso, setActaCompromiso] = useState([
    {
      id: 1,
      criterio: '',
      compromiso: ''
    }
  ]);
  const [comentariosJefe, setComentariosJefe] = useState('');

  // Asegurar autocompletado de fecha de evaluación y área si faltan
  useEffect(() => {
    if (!employee) return;
    setDatosGenerales(prev => ({
      ...prev,
      fechaEvaluacion: (!prev.fechaEvaluacion || prev.fechaEvaluacion === '0000-00-00') 
        ? new Date().toISOString().split('T')[0] 
        : prev.fechaEvaluacion,
      area: prev.area || (employee.area || ''),
      // Autocompletar fecha de ingreso con dato del empleado si existe y si está vacía
      fechaIngreso: (!prev.fechaIngreso || prev.fechaIngreso === '0000-00-00') 
        ? ((employee.fecha_ingreso && employee.fecha_ingreso !== '0000-00-00') 
            ? employee.fecha_ingreso 
            : (employee.fechaIngreso && employee.fechaIngreso !== '0000-00-00') 
              ? employee.fechaIngreso 
              : (prev.fechaIngreso || ''))
        : prev.fechaIngreso
    }));
  }, [employee]);

  // Detectar modo de vista por ruta: si hay :empleadoId => modo jefe
  const { empleadoId } = useParams();
  const location = useLocation();
  useEffect(() => {
    setIsManagerView(!!empleadoId);
  }, [empleadoId]);


  // Evaluación existente (para modo jefe o continuar edición)
  const [existingEvaluationId, setExistingEvaluationId] = useState(null);
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const eid = params.get('evaluacionId');
      if (eid) setExistingEvaluationId(eid);
    } catch (_) {
      // no-op
    }
  }, [location.search]);

  // Cargar evaluación existente cuando hay eid (para que el jefe complete) 
  useEffect(() => {
    const loadExistingEvaluation = async () => {
      if (!existingEvaluationId || !employee?.id_empleado) return;
      
      // Validar que el evaluationId sea válido (mayor que 0)
      if (!existingEvaluationId || existingEvaluationId === '0' || existingEvaluationId === 0) {
        setError('Error: La evaluación no existe o no se creó correctamente. El empleado debe completar su autoevaluación primero.');
        setLoading(false);
        return;
      }
      
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const resp = await fetch(`${apiUrl}/api/evaluations/${existingEvaluationId}/complete/${employee.id_empleado}`);
        if (!resp.ok) {
          setError('Error: No se pudo cargar la evaluación. Verifique que la evaluación existe y que el empleado completó su autoevaluación.');
          setLoading(false);
          return;
        }
        const payload = await resp.json();
        const data = payload?.data || {};

        // Mapear competencias
        if (Array.isArray(data.competencias)) {
          setRows(prev => prev.map(r => {
            const found = data.competencias.find(c => Number(c.id_aspecto) === Number(r.id));
            if (!found) return r;
            return {
              ...r,
              worker: found.calificacion_empleado ? Number(found.calificacion_empleado) : '',
              boss: found.calificacion_jefe ? Number(found.calificacion_jefe) : '',
              average: found.promedio ? String(found.promedio) : '',
              justificacionTrabajador: found.justificacion_empleado || '',
              justificacionJefe: found.justificacion_jefe || ''
            };
          }));
        }

        // Precargar fecha de ingreso que ya diligenció el evaluado (si existe en la evaluación)
        const fechaIngresoGuardada =
          data?.fecha_ingreso ||
          data?.fechaIngreso ||
          (data?.datos_generales && (data.datos_generales.fecha_ingreso || data.datos_generales.fechaIngreso));
        
        if (fechaIngresoGuardada && fechaIngresoGuardada !== '0000-00-00') {
          // Si hay una fecha guardada válida, usarla
          setDatosGenerales(prev => ({
            ...prev,
            fechaIngreso: fechaIngresoGuardada
          }));
        } else {
          // Si no hay fecha guardada, usar la fecha actual
          const fechaActual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
          setDatosGenerales(prev => ({
            ...prev,
            fechaIngreso: fechaActual
          }));
        }


        // Mejoramiento
        if (data.mejoramiento) {
          setMejoramiento({
            fortalezas: data.mejoramiento.fortalezas || '',
            aspectosMejorar: data.mejoramiento.aspectos_mejorar || data.mejoramiento.aspectosMejorar || '',
            necesidadesCapacitacion: data.mejoramiento.necesidades_capacitacion || data.mejoramiento.necesidadesCapacitacion || ''
          });
          // Cargar comentarios del jefe si existen
          if (data.mejoramiento.comentarios_jefe) {
            setComentariosJefe(data.mejoramiento.comentarios_jefe);
          }
        }

        // Acta de compromiso
        if (data.acta_compromiso && Array.isArray(data.acta_compromiso) && data.acta_compromiso.length > 0) {
          setActaCompromiso(data.acta_compromiso.map((acta, index) => ({
            id: index + 1,
            criterio: acta.criterio || '',
            compromiso: acta.compromiso || ''
          })));
        } else {
          setActaCompromiso([
            {
              id: 1,
              criterio: '',
              compromiso: ''
            }
          ]);
        }

        // Plan de acción (si viene uno)
        if (data.plan_accion) {
          const fechaPlan = (data.plan_accion.fecha === '0000-00-00') ? '' : (data.plan_accion.fecha || '');
          setPlanesAccion([{ 
            id: 1,
            actividad: data.plan_accion.actividad || '',
            responsable: data.plan_accion.responsable || '',
            seguimiento: data.plan_accion.seguimiento || '',
            fecha: fechaPlan,
            comentariosJefe: data.plan_accion.comentarios_jefe || ''
          }]);
        }

        // Precargar firmas si existen en la evaluación
        const firmaEmpleado = data?.firmas?.firma_empleado;
        const firmaJefe = data?.firmas?.firma_jefe;
        if (firmaEmpleado) setEmployeeSignature(firmaEmpleado);
        if (firmaJefe) setBossSignature(firmaJefe);
      } catch (_) {}
    };
    loadExistingEvaluation();
  }, [existingEvaluationId, employee]);

  // Manejo de estado para filas
  const [rows, setRows] = useState([
    {
      id: 1,
      aspecto: "Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 2,
      aspecto: "Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 3,
      aspecto: "Escucha con atención y comprende adecuadamente los mensajes o la información recibida, demostrando interés en lo que los demás expresan.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 4,
      aspecto: "Da respuesta a cada comunicación recibida de modo inmediato",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 5,
      aspecto: "Asume y aplica con responsabilidad las decisiones tomadas, tanto en sus tareas individuales como en las que corresponden al trabajo en equipo.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 6,
      aspecto: "Analiza las situaciones utilizando criterios claros y objetivos, logrando conclusiones justas y bien fundamentadas con las personas involucradas.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 7,
      aspecto: "Aporta soluciones alternativas en lo que refiere a sus saberes específicos.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 8,
      aspecto: "Comparte su conocimiento y experiencia especializada para apoyar los procesos de toma de decisiones en temas relacionados con su área de competencia.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 9,
      aspecto: "Identifica de manera anticipada posibles problemas y plantea soluciones viables, evidenciando su capacidad como especialista.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 10,
      aspecto: "Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativas al propio, para analizar y proponer soluciones posibles.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 11,
      aspecto: "Articula sus actuaciones con las de los demás",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 12,
      aspecto: "Cumple los compromisos adquiridos",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 13,
      aspecto: "Facilita la labor de sus supervisores y compañeros de trabajo",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 14,
      aspecto: "Escucha con interés y capta las necesidades de los demás.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 15,
      aspecto: "Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 16,
      aspecto: "Mantiene una comunicación proactiva con clientes internos y externos, tomando la iniciativa para informar, responder o coordinar, usando siempre un lenguaje claro y comprensible.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 17,
      aspecto: "Ejecuta sus tareas con los criterios de calidad establecidos.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 18,
      aspecto: "Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 19,
      aspecto: "Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 20,
      aspecto: "Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 21,
      aspecto: "Demuestra dominio técnico y procedimental en las tareas críticas del rol.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 22,
      aspecto: "Entrega resultados alineados con los estándares y tiempos definidos para su cargo.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
    {
      id: 23,
      aspecto: "Prioriza y organiza sus funciones para asegurar el cumplimiento sin reprocesos.",
      worker: "",
      boss: "",
      average: "",
      justificacionTrabajador: "",
      justificacionJefe: "",
    },
  ]);

  // Funciones para guardar y cargar datos del localStorage
  const saveFormData = () => {
    const formData = {
      datosGenerales,
      rows,
      mejoramiento,
      planesAccion,
      actaCompromiso,
      employeeSignature,
      bossSignature,
      timestamp: new Date().getTime()
    };
    localStorage.setItem('evaluationFormData', JSON.stringify(formData));
  };

  const loadFormData = () => {
    const savedData = localStorage.getItem('evaluationFormData');
    if (savedData) {
      try {
        const formData = JSON.parse(savedData);
        
        // Verificar que los datos no sean muy antiguos (máximo 7 días)
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos
        const now = new Date().getTime();
        
        if (formData.timestamp && (now - formData.timestamp) < maxAge) {
          setDatosGenerales(formData.datosGenerales || datosGenerales);
          setRows(formData.rows || rows);
          setMejoramiento(formData.mejoramiento || mejoramiento);
          setPlanesAccion(formData.planesAccion || planesAccion);
          setActaCompromiso(formData.actaCompromiso || actaCompromiso);
          setEmployeeSignature(formData.employeeSignature || null);
          setBossSignature(formData.bossSignature || null);
          return true;
        } else {
          // Datos muy antiguos, limpiar
          localStorage.removeItem('evaluationFormData');
        }
      } catch (error) {
        localStorage.removeItem('evaluationFormData');
      }
    }
    return false;
  };

  const clearFormData = () => {
    // Limpiar todos los datos de cache relacionados con la evaluación
    // NOTA: No se elimina el token de autenticación para mantener la sesión
    localStorage.removeItem('evaluationFormData');
    localStorage.removeItem('instructionsRead');
    localStorage.removeItem('lastEvaluationId');
    
    // Limpiar datos específicos del formulario que se guardan en cache
    localStorage.removeItem('evaluationDatosGenerales');
    localStorage.removeItem('evaluationCompetencias');
    localStorage.removeItem('evaluationMejoramiento');
    localStorage.removeItem('evaluationPlanesAccion');
    localStorage.removeItem('evaluationActaCompromiso');
    localStorage.removeItem('evaluationFirmas');
    localStorage.removeItem('evaluationFormTouched');
    localStorage.removeItem('evaluationValidationErrors');
  };

  // Función para obtener promedios reales de la base de datos
  const fetchRealAverages = async (evaluationId) => {
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/evaluations/${evaluationId}/complete/${employee?.id_empleado}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.promedios) {
          const promedios = data.data.promedios;
          setRealAverages({
            promedioCompetencias: parseFloat(promedios.promedio_competencias) || 0,
            promedioHseq: 0,
            promedioGeneral: parseFloat(promedios.promedio_general) || 0
          });
        }
      }
    } catch (error) {
      // En caso de error, usar los promedios calculados localmente
      setRealAverages({
        promedioCompetencias: Number(calcularPromedioCompetencias()) || 0,
        promedioHseq: Number(calcularPromedioHseq()) || 0,
        promedioGeneral: (() => {
          const pc = Number(calcularPromedioCompetencias()) || 0;
          const ph = Number(calcularPromedioHseq()) || 0;
          const parts = [pc, ph].filter(n => n > 0);
          return parts.length ? (parts.reduce((a,b)=>a+b,0) / parts.length) : 0;
        })()
      });
    }
  };

  useEffect(() => {
    const employeeId = empleadoId || localStorage.getItem('employeeId');
    if (!employeeId) {
      setError('No se encontró el ID del empleado.');
      setLoading(false);
      return;
    }
    
    const fetchEmployee = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}/employees/${employeeId}`);
        const data = await response.json();
        
        if (!response.ok) {
          setError((data && (data.error || data.message)) || 'Error al obtener los datos del empleado.');
        } else {
          setEmployee(data && (data.data || data));
          
          // Si el rol del empleado ha cambiado en la base de datos, actualizamos el localStorage
          if (data.rol && data.rol !== localStorage.getItem('userRole')) {
            localStorage.setItem('userRole', data.rol);
            // Si tu aplicación maneja el rol como un estado global, actualízalo aquí
          }
          
          // Rellenar automáticamente la fecha de evaluación y el área del evaluado INMEDIATAMENTE
          setDatosGenerales(prev => ({
            ...prev,
            fechaEvaluacion: new Date().toISOString().split('T')[0], // Fecha actual
            area: data.area || '', // Área del empleado evaluado
            // Autocompletar fecha de ingreso desde el empleado si no está definida / inválida
            fechaIngreso: (!prev.fechaIngreso || prev.fechaIngreso === '0000-00-00')
              ? ((data.fecha_ingreso && data.fecha_ingreso !== '0000-00-00')
                  ? data.fecha_ingreso
                  : (data.fechaIngreso && data.fechaIngreso !== '0000-00-00')
                    ? data.fechaIngreso
                    : (prev.fechaIngreso || ''))
              : prev.fechaIngreso
          }));
          
          // Cargar datos guardados después de obtener los datos del empleado
          loadFormData();
        }
      } catch (err) {
        setError('Error en la conexión con el servidor.');
      }
      setLoading(false);
    };

    fetchEmployee();
  }, [empleadoId]);

  // Cargar datos del jefe (usuario logueado) para mostrar su nombre en la celebración
  useEffect(() => {
    const loadBoss = async () => {
      try {
        const myId = localStorage.getItem('employeeId');
        if (!myId) return;
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const resp = await fetch(`${apiUrl}/employees/${myId}`);
        if (!resp.ok) return;
        const data = await resp.json();
        setBoss(data && (data.data || data));
      } catch (_) {}
    };
    loadBoss();
  }, []);


  // Guardar datos automáticamente cuando cambien
  useEffect(() => {
    if (employee && formTouched) {
      setIsSaving(true);
      saveFormData();
      
      // Simular un pequeño delay para mostrar el indicador de guardado
      setTimeout(() => {
        setIsSaving(false);
      }, 500);
    }
  }, [datosGenerales, rows, mejoramiento, planesAccion, actaCompromiso, employeeSignature, bossSignature, employee, formTouched]);

  // Calcula promedio cada vez que cambie evaluación
  const handleSelectChange = (rowId, field, value) => {
    const numericValue = value === "" ? 0 : Number(value);

    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === rowId) {
          const newRow = { ...row, [field]: numericValue };
          const workerVal = newRow.worker || 0;
          const bossVal = newRow.boss || 0;
          const avg = (workerVal + bossVal) / 2;
          newRow.average = workerVal === 0 && bossVal === 0 ? "" : avg.toFixed(1);
          return newRow;
        }
        return row;
      })
    );
    setFormTouched(true);
  };

  // Manejar cambio en mejoramiento
  const handleMejoramientoChange = (e) => {
    const { id, value } = e.target;
    setMejoramiento(prev => ({
      ...prev,
      [id]: value
    }));
    setFormTouched(true);
  };

  // Manejar cambio en plan de acción
  const handlePlanAccionChange = (planId, field, value) => {
    setPlanesAccion(prev => 
      prev.map(plan => 
        plan.id === planId ? { ...plan, [field]: value } : plan
      )
    );
    setFormTouched(true);
  };

  // Agregar nuevo plan de acción
  const addPlanAccion = () => {
    if (planesAccion.length < 4) {
      const newId = Math.max(...planesAccion.map(p => p.id)) + 1;
      setPlanesAccion(prev => [
        ...prev,
        {
          id: newId,
          actividad: '',
          responsable: '',
          seguimiento: '',
          fecha: ''
        }
      ]);
      setFormTouched(true);
    }
  };

  // Eliminar plan de acción
  const removePlanAccion = (planId) => {
    if (planesAccion.length > 1) {
      setPlanesAccion(prev => prev.filter(plan => plan.id !== planId));
      setFormTouched(true);
    }
  };

  // Manejar cambio en acta de compromiso
  const handleActaCompromisoChange = (actaId, field, value) => {
    setActaCompromiso(prev => 
      prev.map(acta => 
        acta.id === actaId ? { ...acta, [field]: value } : acta
      )
    );
    setFormTouched(true);
  };

  // Agregar nuevo acta de compromiso
  const addActaCompromiso = () => {
    if (actaCompromiso.length < 3) {
      const newId = Math.max(...actaCompromiso.map(a => a.id)) + 1;
      setActaCompromiso(prev => [
        ...prev,
        {
          id: newId,
          criterio: '',
          compromiso: ''
        }
      ]);
      setFormTouched(true);
    }
  };

  // Eliminar acta de compromiso
  const removeActaCompromiso = (actaId) => {
    if (actaCompromiso.length > 1) {
      setActaCompromiso(prev => prev.filter(acta => acta.id !== actaId));
      setFormTouched(true);
    }
  };

  // Calcular promedio de calificaciones de competencias
  const calcularPromedioCompetencias = () => {
    let sumaTotal = 0;
    let contadorValidos = 0;
    
    rows.forEach(row => {
      const workerVal = Number(row.worker) || 0;
      const bossVal = Number(row.boss) || 0;
      
      if (workerVal > 0 && bossVal > 0) {
        sumaTotal += (workerVal + bossVal) / 2;
        contadorValidos++;
      } else if (workerVal > 0) {
        sumaTotal += workerVal;
        contadorValidos++;
      } else if (bossVal > 0) {
        sumaTotal += bossVal;
        contadorValidos++;
      }
    });
    
    if (contadorValidos === 0) return 0;
    return (sumaTotal / contadorValidos).toFixed(2);
  };

  // Calcular promedio de calificaciones HSEQ (deshabilitado)
  const calcularPromedioHseq = () => {
    return 0;
  };

  // Helpers para promedios por apartado de competencias
  const calcularPromediosPorApartado = () => {
    // Mapeo de apartados -> índices de rows
    const grupos = {
      'Comunicacion efectiva': [0,1,2,3],
      'Instrumentalidad de decisiones': [4,5],
      'Aporte profesional': [6,7,8,9],
      'Colaboracion': [10,11,12],
      'Relaciones interpersonales': [13,14,15],
      'Gestion de procedimientos': [16,17,18],
      'Cumplimiento de funciones del cargo': [19,20,21,22],
    };

    const promedios = {};

    Object.entries(grupos).forEach(([nombre, indices]) => {
      let suma = 0;
      let cuenta = 0;
      indices.forEach(i => {
        const workerVal = Number(rows[i]?.worker) || 0;
        const bossVal = Number(rows[i]?.boss) || 0;
        if (workerVal > 0 && bossVal > 0) {
          suma += (workerVal + bossVal) / 2;
          cuenta += 1;
        } else if (workerVal > 0) {
          suma += workerVal;
          cuenta += 1;
        } else if (bossVal > 0) {
          suma += bossVal;
          cuenta += 1;
        }
      });
      promedios[nombre] = cuenta === 0 ? 0 : Number((suma / cuenta).toFixed(2));
    });

    return promedios;
  };

  // Función de validación de formulario
  const validarFormulario = () => {
    // Validaciones deshabilitadas: permitir envío sin completar todos los campos
    setValidationErrors({});
    return { isValid: true, errores: {} };
  };

  // Manejar cambio en datos generales
  const handleDatosGeneralesChange = (e) => {
    const { name, value } = e.target;
    setDatosGenerales(prev => ({
      ...prev,
      [name]: value
    }));
    setFormTouched(true);
  };

  // Modificar el manejador de envío del formulario para la nueva estructura nativa
  // Función para validar todos los campos de calificaciones
  const validateAllCalifications = () => {
    // Validaciones deshabilitadas
    return {};
  };

  const fileToBase64 = (file) => new Promise((resolve) => {
    if (!file) return resolve('');
    if (typeof file === 'string' && file.startsWith('data:')) return resolve(file);
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });


  const handleSave = async (finalizar = false) => {
    // Validaciones deshabilitadas: proceder directamente al guardado
    try {
      setIsSubmitting(true);
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      if (!existingEvaluationId || existingEvaluationId === '0' || existingEvaluationId === 0) {
        warning('Falta identificador', 'No se encontró el ID de la evaluación. La evaluación debe existir en la base de datos.');
        setIsSubmitting(false);
        return;
      }
      const jefeId = datosGenerales.idEvaluador || localStorage.getItem('employeeId') || '';

      // Construir FormData según API nativa
      const fd = new FormData();
      fd.append('evaluationId', String(existingEvaluationId));
      
      // Agregar categoría de evaluación
      fd.append('categoriaEvaluacion', datosGenerales.categoriaEvaluacion);

      // Competencias según estructura esperada por backend nativo
      const competenciasData = rows.map(r => ({
        id: r.id,
        aspecto: r.aspecto,
        worker: (r.worker ?? '') === 0 ? '' : String(r.worker ?? ''),
        boss: (r.boss ?? '') === 0 ? '' : String(r.boss ?? ''),
        average: String(r.average ?? '')
      }));
      fd.append('competenciasData', JSON.stringify(competenciasData));

      // Mejoramiento
      fd.append('mejoramiento', JSON.stringify({
        fortalezas: mejoramiento.fortalezas || '',
        aspectosMejorar: mejoramiento.aspectosMejorar || '',
        necesidadesCapacitacion: mejoramiento.necesidadesCapacitacion || '',
        comentariosJefe: comentariosJefe || ''
      }));

      // Acta de compromiso
      fd.append('actaCompromiso', JSON.stringify(actaCompromiso));

      // Plan de acción: enviar el primero no vacío (API espera objeto, no arreglo)
      const firstFilledPlan = (planesAccion.find(p =>
        [p.actividad, p.responsable, p.seguimiento, p.fecha]
          .some(v => String(v || '').trim() !== '')
      ) || planesAccion[0] || { actividad: '', responsable: '', seguimiento: '', fecha: '', comentariosJefe: '' });
      fd.append('planesAccion', JSON.stringify({
        actividad: firstFilledPlan.actividad || '',
        responsable: firstFilledPlan.responsable || '',
        seguimiento: firstFilledPlan.seguimiento || '',
        fecha: firstFilledPlan.fecha || '',
        comentariosJefe: firstFilledPlan.comentariosJefe || ''
      }));

      // Promedios (sin restricciones)
      const promedioCompetenciasVal = Number(calcularPromedioCompetencias()) || 0;
      const promedioHseqVal = 0;
      const promedioGeneralVal = promedioCompetenciasVal;
      fd.append('promedioCompetencias', String(promedioCompetenciasVal));
      
      fd.append('generalAverage', String(promedioGeneralVal));
      fd.append('groupAverages', JSON.stringify(calcularPromediosPorApartado()));

      // Firma del jefe como archivo si existe
      if (bossSignature instanceof File) {
        fd.append('bossSignature', bossSignature);
      }

      // Comentarios del jefe (no hay campo dedicado en API; se podría incluir en mejoramiento si se necesita)

      const response = await fetch(`${apiUrl}/api/evaluations/update-native`, {
        method: 'POST',
        body: fd
      });
      const data = await response.json();

      if (response.ok) {
        // Obtener el ID de la evaluación recién guardada
        const evaluationId = existingEvaluationId || data.id_evaluacion;
        
        localStorage.setItem('lastEvaluationId', evaluationId);
        
        // Obtener promedios reales de la base de datos
        await fetchRealAverages(evaluationId);
        
        // Mensaje de éxito acorde al 100% al terminar
        const tituloOk = finalizar
          ? '¡Evaluación del jefe completada (100%)!'
          : 'Cambios guardados';
        const mensajeEstado = finalizar
          ? 'El expediente quedó al 100% y pasó a "Pendiente HSEQ". Puede consultar el reporte desde Resultados.'
          : 'Se guardó el progreso de la evaluación del jefe.';

        success(tituloOk, mensajeEstado);
        
        // Limpiar todos los datos de cache
        clearFormData();
        
        // Mostrar animación si finaliza
        if (finalizar) setShowCompletion(true);
        
        // Limpiar el formulario después del éxito
        setRows([
          {
            id: 1,
            aspecto: "Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor",
            worker: "",
            boss: "",
            average: "",
            justificacionTrabajador: "",
            justificacionJefe: "",
          },
          {
            id: 2,
            aspecto: "Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 3,
            aspecto: "Escucha con atención y comprende adecuadamente los mensajes o la información recibida, demostrando interés en lo que los demás expresan.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 4,
            aspecto: "Da respuesta a cada comunicación recibida de modo inmediato",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 5,
            aspecto: "Asume y aplica con responsabilidad las decisiones tomadas, tanto en sus tareas individuales como en las que corresponden al trabajo en equipo.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 6,
            aspecto: "Analiza las situaciones utilizando criterios claros y objetivos, logrando conclusiones justas y bien fundamentadas con las personas involucradas.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 7,
            aspecto: "Aporta soluciones alternativas en lo que refiere a sus saberes específicos.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 8,
            aspecto: "Comparte su conocimiento y experiencia especializada para apoyar los procesos de toma de decisiones en temas relacionados con su área de competencia.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 9,
            aspecto: "Identifica de manera anticipada posibles problemas y plantea soluciones viables, evidenciando su capacidad como especialista.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 10,
            aspecto: "Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativas al propio, para analizar y proponer soluciones posibles.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 11,
            aspecto: "Articula sus actuaciones con las de los demás",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 12,
            aspecto: "Cumple los compromisos adquiridos",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 13,
            aspecto: "Facilita la labor de sus supervisores y compañeros de trabajo",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 14,
            aspecto: "Escucha con interés y capta las necesidades de los demás.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 15,
            aspecto: "Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 16,
            aspecto: "Mantiene una comunicación proactiva con clientes internos y externos, tomando la iniciativa para informar, responder o coordinar, usando siempre un lenguaje claro y comprensible.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 17,
            aspecto: "Ejecuta sus tareas con los criterios de calidad establecidos.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 18,
            aspecto: "Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 19,
            aspecto: "Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 20,
            aspecto: "Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 21,
            aspecto: "Demuestra dominio técnico y procedimental en las tareas críticas del rol.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 22,
            aspecto: "Entrega resultados alineados con los estándares y tiempos definidos para su cargo.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 23,
            aspecto: "Prioriza y organiza sus funciones para asegurar el cumplimiento sin reprocesos.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
        ]);
        
        setMejoramiento({ fortalezas: '', aspectosMejorar: '', necesidadesCapacitacion: '' });
        setComentariosJefe('');
        setPlanesAccion([
          {
            id: 1,
            actividad: '',
            responsable: '',
            seguimiento: '',
            fecha: '',
            comentariosJefe: ''
          }
        ]);
        setActaCompromiso([
          {
            id: 1,
            criterio: '',
            compromiso: ''
          }
        ]);
        setEmployeeSignature(null);
        setBossSignature(null);
        setDatosGenerales({
          fechaIngreso: '',
          fechaEvaluacion: '',
          area: '',
        });
        
        // Redirigir al inicio de la página web (comentado para permitir el modal de celebración)
        // window.location.href = '/';
      } else {
        const errorMessage = data.error ? 
          `Error: ${data.error}` : 
          `Error al guardar: ${data.message || 'Error desconocido'}`;
        showError('Error al guardar', errorMessage);
      }
    } catch (error) {
      showError('Error de conexión', 'Error al guardar la evaluación. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Estilos para campos con error
  const errorStyle = {
    border: '2px solid #ff3860',
    boxShadow: '0 0 0 1px #ff3860'
  };

  // Estilos para la alerta
  const alertStyle = {
    backgroundColor: '#ffdddd',
    color: '#ff3860',
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '4px',
    fontWeight: 'bold',
    textAlign: 'center',
    display: showAlert ? 'block' : 'none',
    animation: alertFading ? 'fadeOut 0.8s ease' : 'fadeIn 0.5s ease',
    opacity: alertFading ? '0' : '1',
    transition: 'opacity 0.8s ease',
    position: 'fixed',
    top: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100050,
    maxWidth: '1000px',
    width: 'calc(100% - 32px)'
  };

  // Estilo para campos con error - ahora verificando visibleErrors en lugar de validationErrors
  const getErrorStyle = (fieldName) => {
    return visibleErrors[fieldName] ? {
      border: '2px solid #ff3860',
      boxShadow: '0 0 0 1px #ff3860'
    } : {};
  };

  // Función helper para obtener estilos de error de calificaciones
  const getCalificationErrorStyle = (rowId, field) => {
    return visibleErrors[`competencia_${field}_${rowId}`] ? {
      border: '2px solid #ff3860',
      boxShadow: '0 0 0 1px #ff3860'
    } : {};
  };

  
  // Gestionar la visibilidad de errores - los bordes rojos permanecen hasta que se corrijan
  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      // Mostrar los errores cuando se actualice validationErrors
      setVisibleErrors(validationErrors);
    } else {
      // Limpiar errores visibles cuando no hay errores de validación
      setVisibleErrors({});
    }
  }, [validationErrors]);
  
  // Mantener el resto del código para cerrar la alerta principal
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setAlertFading(true);
        
        const fadeTimer = setTimeout(() => {
          setShowAlert(false);
          setAlertFading(false);
        }, 800);
        
        return () => clearTimeout(fadeTimer);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="evaluation-page-unique">
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <Header />
      <div className="hero" style={{ 
        textAlign: "center", 
        padding: "clamp(1rem, 5vw, 2rem)" 
      }}>
        {/* Indicador visual de evaluación del jefe */}
        <div style={{
          background: 'linear-gradient(135deg, #1F3B73, #0A0F1A)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'inline-block',
          boxShadow: '0 4px 12px rgba(31, 59, 115, 0.3)',
          border: '2px solid #2D4A7C'
        }}>
          <div style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            EVALUACIÓN DEL JEFE DIRECTO
          </div>
        </div>
        
        <h1 className="evaluacion-desempeno">EVALUACIÓN DE DESEMPEÑO</h1>
        {isSaving && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '10px',
            color: '#059669',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid #059669',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Guardando progreso...
          </div>
        )}
      </div>


      <main className="evaluation-container-unique" style={{ 
        padding: "clamp(1rem, 5vw, 2rem)",
        position: 'relative',
        zIndex: 10001
      }}>
        <section className="evaluation-section" style={{ position: 'relative', zIndex: 10002 }}>
            <div className="evaluation-row">
              <div className="evaluation-field">
                <label>Nombre del evaluado:</label>
                <input 
                  type="text" 
                  placeholder="Ingrese el nombre del evaluado" 
                  value={employee?.nombre || ''}
                  readOnly
                />
              </div>
              <div className="evaluation-field">
                <label>No. de Identificación:</label>
                <input 
                  type="text" 
                  placeholder="Cédula / ID" 
                  value={employee?.cedula || ''}
                  readOnly
                />
              </div>
              <div className="evaluation-field">
                <label>Cargo/servicio:</label>
                <input 
                  type="text" 
                  placeholder="Cargo o servicio" 
                  value={employee?.cargo || ''}
                  readOnly
                />
              </div>
            </div>

            {/* Fila 2 */}
            <div className="evaluation-row">
              <div className="evaluation-field">
                <label>Fecha de ingreso:</label>
                <input 
                  type="date" 
                  name="fechaIngreso"
                  value={datosGenerales.fechaIngreso}
                  onChange={(e) => handleDatosGeneralesChange(e)}
                  style={getErrorStyle('datosGenerales_fechaIngreso')}
                />
                {visibleErrors.datosGenerales_fechaIngreso && (
                  <span className="error-message">Este campo es obligatorio</span>
                )}
              </div>
              <div className="evaluation-field">
                <label>Fecha de la evaluación:</label>
                <input 
                  type="date" 
                  name="fechaEvaluacion"
                  value={datosGenerales.fechaEvaluacion}
                  onChange={handleDatosGeneralesChange}
                  style={getErrorStyle('datosGenerales_fechaEvaluacion')}
                />
                {visibleErrors.datosGenerales_fechaEvaluacion && (
                  <span className="error-message">Este campo es obligatorio</span>
                )}
              </div>
              <div className="evaluation-field">
                <label>Área:</label>
                <input 
                  type="text" 
                  placeholder="Se llena automáticamente con el área del evaluado" 
                  name="area"
                  value={datosGenerales.area || ''}
                  readOnly
                  style={{
                    ...getErrorStyle('datosGenerales_area'),
                    backgroundColor: '#f5f5f5',
                    cursor: 'not-allowed'
                  }}
                />
                {visibleErrors.datosGenerales_area && (
                  <span className="error-message">Este campo es obligatorio</span>
                )}
              </div>
            </div>

            {/* Fila 3 - Categoría de Evaluación */}
            <div className="evaluation-row" style={{ 
              marginTop: '20px',
              padding: '20px',
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '12px',
              border: '2px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <div className="evaluation-field" style={{ 
                width: '100%',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '12px',
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  📋 Categoría de Evaluación
                </label>
                <select 
                  name="categoriaEvaluacion"
                  value={datosGenerales.categoriaEvaluacion}
                  onChange={(e) => handleDatosGeneralesChange(e)}
                  style={{
                    ...getErrorStyle('datosGenerales_categoriaEvaluacion'),
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1e293b',
                    backgroundColor: '#ffffff',
                    border: '2px solid #cbd5e1',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    outline: 'none',
                    textAlign: 'center'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#1F3B73';
                    e.target.style.boxShadow = '0 0 0 3px rgba(31, 59, 115, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#cbd5e1';
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                  }}
                >
                  <option value="Período de prueba"> Período de prueba</option>
                  <option value="Trimestral"> Trimestral</option>
                  <option value="Anual"> Anual</option>
                </select>
                {visibleErrors.datosGenerales_categoriaEvaluacion && (
                  <span className="error-message" style={{ 
                    display: 'block', 
                    textAlign: 'center', 
                    marginTop: '8px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    ⚠️ Este campo es obligatorio
                  </span>
                )}
                <div style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#64748b',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}>
                  Seleccione el tipo de evaluación correspondiente
                </div>
              </div>
            </div>

        </section>

        <hr className="evaluation-hr"/>
        <section className="evaluation-section instrucciones">
          <h2 className="evaluation-h2-center">INSTRUCCIONES</h2>
          <ol className="evaluation-ol">
            <li>
              <strong>Lea detenidamente la definición de los aspectos a evaluar.</strong><br />
              Asegúrese de comprender cada criterio antes de asignar una calificación.
            </li>
            <li>
              <strong>Seleccione la categoría de desempeño correspondiente para cada aspecto.</strong><br />
              <ul>
                <li><strong>1 = No Cumple:</strong> No hay evidencia de cumplimiento o no alcanza lo esperado.</li>
                <li><strong>2 = Cumplimiento Regular:</strong> Cumple de forma limitada, con oportunidades de mejora.</li>
                <li><strong>3 = Cumplimiento Parcialmente:</strong> Cumple en lo esencial, pero presenta áreas susceptibles de perfeccionamiento.</li>
                <li><strong>4 = Cumplimiento Satisfactoriamente:</strong> Cumple a cabalidad con todos los aspectos evaluados.</li>
                <li><strong>5 = Cumplimiento de Manera Excelente:</strong> Además de cumplir con todos los aspectos, aporta un valor agregado notable para la organización.</li>
              </ul>
            </li>
            <li>
              <strong>Justifique las calificaciones extremas.</strong><br />
                Si otorga una calificación de 5, explique los factores de excelencia.<br />
                Si otorga una calificación de 2 o menor, justifique las razones de la deficiencia.
            </li>
            <li>
              <strong>Proponga un plan de acción obligatorio</strong> <br/>
               Para calificaciones de 5, 2 o menor, este plan debe detallar los pasos para mantener la excelencia o corregir las deficiencias.
            </li>
          </ol>
        </section>

      
        
        {/* Tabla de competencias: si es modo jefe, usar tabla de jefe */}
        {isManagerView ? (
          <CompetenciasTableBoss
            rows={rows}
            handleSelectChange={handleSelectChange}
            setRows={setRows}
            setFormTouched={setFormTouched}
            getCalificationErrorStyle={getCalificationErrorStyle}
            calcularPromedioCompetencias={calcularPromedioCompetencias}
          />
        ) : (
          <CompetenciasTable
            rows={rows}
            handleSelectChange={handleSelectChange}
            setRows={setRows}
            setFormTouched={setFormTouched}
            getCalificationErrorStyle={getCalificationErrorStyle}
            calcularPromedioCompetencias={calcularPromedioCompetencias}
          />
        )}
        

        <hr className="evaluation-hr"/>
        <section className="evaluation-section">
          <h2 className="seccion-titulo">MEJORAMIENTO Y DESARROLLO</h2>

          {/* Fortalezas */}
          <div className="mejora-bloque">
            <h3 className="mejora-subtitulo">FORTALEZAS</h3>
            <p className="mejora-ayuda">
              (Describa brevemente cuáles son las actividades del trabajo que mejor realiza y sus cualidades personales).<br/>
              Al inicio del comentario, indique la palabra que corresponda: EVALUADO, JEFE INMEDIATO o HSEQ, para diferenciar los conceptos.
            </p>
            <textarea
              id="fortalezas"
              rows="3"
              className="campo-textarea"
              value={mejoramiento.fortalezas}
              onChange={handleMejoramientoChange}
              style={getErrorStyle('fortalezas')}
            />
            {visibleErrors.fortalezas && (
              <span className="error-message">Este campo es obligatorio (mínimo 50 caracteres)</span>
            )}
          </div>

          {/* Factores a mejorar */}
          <div className="mejora-bloque">
            <h3 className="mejora-subtitulo">FACTORES A MEJORAR</h3>
            <p className="mejora-ayuda">
              (Concreta en qué aspectos debe mejorar el colaborador).<br/>
              Al inicio del comentario, indique la palabra que corresponda: EVALUADO, JEFE INMEDIATO o HSEQ, para diferenciar los conceptos.
            </p>
            <textarea
              id="aspectosMejorar"
              rows="3"
              className="campo-textarea"
              value={mejoramiento.aspectosMejorar}
              onChange={handleMejoramientoChange}
              style={getErrorStyle('aspectosMejorar')}
            />
            {visibleErrors.aspectosMejorar && (
              <span className="error-message">Este campo es obligatorio (mínimo 50 caracteres)</span>
            )}
          </div>

          {/* Necesidades de capacitación */}
          <div className="mejora-bloque mejora-bloque--full">
            <h3 className="mejora-subtitulo">NECESIDADES DE CAPACITACIÓN</h3>
            <textarea
              id="necesidadesCapacitacion"
              rows="3"
              className="campo-textarea"
              value={mejoramiento.necesidadesCapacitacion || ''}
              onChange={handleMejoramientoChange}
              name="necesidadesCapacitacion"
              style={getErrorStyle('necesidadesCapacitacion')}
            />
            {visibleErrors.necesidadesCapacitacion && (
              <span className="error-message">Si se llena este campo, debe tener mínimo 30 caracteres</span>
            )}
          </div>

          {/* Acta de compromiso */}
          <div className="mejora-bloque">
            <h3 className="mejora-subtitulo">ACTA DE COMPROMISO</h3>
            <table className="compromiso-table" style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
              minWidth: '100%'
            }}>
              <thead>
                {/* Barra de título "ACTA DE COMPROMISO" con gradiente */}
                <tr>
                  <th
                    colSpan={3}
                    style={{
                      background: "linear-gradient(90deg, #1F3B73 0%, #0A0F1A 100%)",
                      color: "#FFFFFF",
                      padding: "0.8rem 1rem",
                      textAlign: "center",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      height: "28px",
                      borderBottom: "1px solid rgba(0,0,0,0.25)"
                    }}
                  >
                    ACTA DE COMPROMISO
                  </th>
                </tr>
                {/* Encabezado de columnas */}
                <tr>
                  <th style={{ 
                    background: "#1E2A3A", 
                    color: "#FFFFFF",
                    textAlign: "center",
                    padding: "0.6rem 0.4rem",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    height: "24px",
                    borderTop: "1px solid #1E2A3A",
                    borderLeft: "1px solid #243447",
                    borderBottom: "1px solid #243447",
                    borderRight: "1px solid rgba(51,51,51,0.5)",
                    width: "40%"
                  }}>CRITERIO</th>
                  <th style={{ 
                    background: "#1E2A3A", 
                    color: "#FFFFFF",
                    textAlign: "center",
                    padding: "0.6rem 0.4rem",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    height: "24px",
                    borderTop: "1px solid #1E2A3A",
                    borderLeft: "1px solid #243447",
                    borderBottom: "1px solid #243447",
                    borderRight: "1px solid rgba(51,51,51,0.5)",
                    width: "40%"
                  }}>COMPROMISO</th>
                  <th style={{ 
                    background: "#1E2A3A", 
                    color: "#FFFFFF",
                    textAlign: "center",
                    padding: "0.6rem 0.4rem",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    height: "24px",
                    borderTop: "1px solid #1E2A3A",
                    borderLeft: "1px solid #243447",
                    borderBottom: "1px solid #243447",
                    borderRight: "1px solid rgba(51,51,51,0.5)",
                    width: "20%"
                  }}>ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {actaCompromiso.map((acta, index) => (
                  <tr key={acta.id} style={{ backgroundColor: "#fff" }}>
                    <td style={{ 
                      padding: "0.8rem", 
                      border: "1px solid #e5e7eb",
                      width: "40%",
                      verticalAlign: "top"
                    }}>
                      <textarea
                        placeholder="Criterio específico"
                        value={acta.criterio}
                        onChange={(e) => handleActaCompromisoChange(acta.id, 'criterio', e.target.value)}
                        style={{
                          ...getErrorStyle(`actaCompromiso_${index}_criterio`),
                          width: '100%',
                          minHeight: '80px',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: '#fff',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          lineHeight: '1.4'
                        }}
                        rows={3}
                      />
                      {visibleErrors[`actaCompromiso_${index}_criterio`] && (
                        <span className="error-message" style={{ display: 'block', marginTop: '4px', fontSize: '12px' }}>
                          Este campo es obligatorio (mínimo 30 caracteres)
                        </span>
                      )}
                    </td>
                    <td style={{ 
                      padding: "0.8rem", 
                      border: "1px solid #e5e7eb",
                      width: "40%",
                      verticalAlign: "top"
                    }}>
                      <textarea
                        placeholder="Compromiso específico"
                        value={acta.compromiso}
                        onChange={(e) => handleActaCompromisoChange(acta.id, 'compromiso', e.target.value)}
                        style={{
                          ...getErrorStyle(`actaCompromiso_${index}_compromiso`),
                          width: '100%',
                          minHeight: '80px',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: '#fff',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          lineHeight: '1.4'
                        }}
                        rows={3}
                      />
                      {visibleErrors[`actaCompromiso_${index}_compromiso`] && (
                        <span className="error-message" style={{ display: 'block', marginTop: '4px', fontSize: '12px' }}>
                          Este campo es obligatorio (mínimo 30 caracteres)
                        </span>
                      )}
                    </td>
                    <td style={{ 
                      padding: "0.8rem", 
                      border: "1px solid #e5e7eb", 
                      textAlign: "center",
                      width: "20%",
                      verticalAlign: "top"
                    }}>
                      <button
                        type="button"
                        onClick={() => removeActaCompromiso(acta.id)}
                        disabled={actaCompromiso.length === 1}
                        style={{
                          background: actaCompromiso.length === 1 ? '#e5e7eb' : '#ef4444',
                          color: actaCompromiso.length === 1 ? '#9ca3af' : 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: actaCompromiso.length === 1 ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease',
                          opacity: actaCompromiso.length === 1 ? 0.6 : 1
                        }}
                        onMouseOver={(e) => {
                          if (actaCompromiso.length > 1) {
                            e.target.style.background = '#dc2626';
                            e.target.style.transform = 'translateY(-1px)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (actaCompromiso.length > 1) {
                            e.target.style.background = '#ef4444';
                            e.target.style.transform = 'translateY(0)';
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Botón para agregar criterio */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                type="button"
                onClick={addActaCompromiso}
                disabled={actaCompromiso.length >= 3}
                style={{
                  background: actaCompromiso.length >= 3 
                    ? '#e5e7eb' 
                    : 'linear-gradient(135deg, #1F3B73, #0A0F1A)',
                  color: actaCompromiso.length >= 3 ? '#9ca3af' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: actaCompromiso.length >= 3 ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: actaCompromiso.length >= 3 
                    ? 'none' 
                    : '0 4px 12px rgba(31, 59, 115, 0.3)',
                  transition: 'all 0.3s ease',
                  opacity: actaCompromiso.length >= 3 ? 0.6 : 1
                }}
                onMouseOver={(e) => {
                  if (actaCompromiso.length < 3) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(31, 59, 115, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (actaCompromiso.length < 3) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(31, 59, 115, 0.3)';
                  }
                }}
              >
                <span style={{ fontSize: '16px' }}>+</span>
                {actaCompromiso.length >= 3 ? 'Máximo 3 criterios' : 'Agregar Criterio'}
              </button>
            </div>
            
            {visibleErrors.actaCompromiso_required && (
              <span className="error-message" style={{ display: 'block', textAlign: 'center', marginTop: '8px' }}>
                Se requiere al menos un criterio de compromiso completo
              </span>
            )}
          </div>
        </section>

        <section className="evaluation-section">
          <h2 className="seccion-titulo">PLAN DE ACCIÓN</h2>
          <table className="plan-accion-table">
            <thead>
              {/* Barra de título "PLAN DE ACCIÓN" con un ÚNICO gradiente */}
              <tr>
                <th
                  colSpan={isManagerView ? 5 : 4}
                  style={{
                    background: "linear-gradient(90deg, #1F3B73 0%, #0A0F1A 100%)",
                    color: "#FFFFFF",
                    padding: "0.8rem 1rem",
                    textAlign: "center",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    height: "28px",
                    borderBottom: "1px solid rgba(0,0,0,0.25)"
                  }}
                >
                  PLAN DE ACCIÓN
                </th>
              </tr>
              {/* Encabezado de columnas con color sólido y bordes sutiles */}
              <tr>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF",
                  textAlign: "center",
                  padding: "0.6rem 0.4rem",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: isManagerView ? "20%" : "25%"
                }}>Actividades</th>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF",
                  textAlign: "center",
                  padding: "0.6rem 0.4rem",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: isManagerView ? "20%" : "25%"
                }}>Responsable</th>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF",
                  textAlign: "center",
                  padding: "0.6rem 0.4rem",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: isManagerView ? "20%" : "25%"
                }}>Seguimiento</th>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF",
                  textAlign: "center",
                  padding: "0.6rem 0.4rem",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: isManagerView ? "20%" : "25%"
                }}>Fecha</th>
                {isManagerView && (
                  <th style={{ 
                    background: "#1E2A3A", 
                    color: "#FFFFFF",
                    textAlign: "center",
                    padding: "0.6rem 0.4rem",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    height: "24px",
                    borderTop: "1px solid #1E2A3A",
                    borderLeft: "1px solid #243447",
                    borderBottom: "1px solid #243447",
                    borderRight: "1px solid rgba(51,51,51,0.5)",
                    width: "20%"
                  }}>Comentarios del Jefe</th>
                )}
              </tr>
            </thead>
            <tbody>
              {planesAccion.map((plan, index) => (
                <tr key={plan.id}>
                  <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem", verticalAlign: "top" }}>
                    <textarea
                      placeholder="Actividad" 
                      className="plan-accion-input"
                      value={plan.actividad}
                      onChange={(e) => handlePlanAccionChange(plan.id, 'actividad', e.target.value)}
                      style={{
                        ...getErrorStyle(`planAccion_${index}_actividad`),
                        width: '100%',
                        minHeight: '80px',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: '#fff',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        lineHeight: '1.4',
                        boxSizing: 'border-box'
                      }}
                      rows={3}
                    />
                    {visibleErrors[`planAccion_${index}_actividad`] && (
                      <span className="error-message" style={{ display: 'block', marginTop: '4px', fontSize: '12px' }}>
                        Este campo es obligatorio
                      </span>
                    )}
                  </td>
                  <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem", verticalAlign: "top" }}>
                    <textarea
                      placeholder="Responsable" 
                      className="plan-accion-input"
                      value={plan.responsable}
                      onChange={(e) => handlePlanAccionChange(plan.id, 'responsable', e.target.value)}
                      style={{
                        ...getErrorStyle(`planAccion_${index}_responsable`),
                        width: '100%',
                        minHeight: '80px',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: '#fff',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        lineHeight: '1.4',
                        boxSizing: 'border-box'
                      }}
                      rows={3}
                    />
                    {visibleErrors[`planAccion_${index}_responsable`] && (
                      <span className="error-message" style={{ display: 'block', marginTop: '4px', fontSize: '12px' }}>
                        Este campo es obligatorio
                      </span>
                    )}
                  </td>
                  <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem", verticalAlign: "top" }}>
                    <textarea
                      placeholder="Indicadores / Frecuencia" 
                      className="plan-accion-input"
                      value={plan.seguimiento}
                      onChange={(e) => handlePlanAccionChange(plan.id, 'seguimiento', e.target.value)}
                      style={{
                        ...getErrorStyle(`planAccion_${index}_seguimiento`),
                        width: '100%',
                        minHeight: '80px',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: '#fff',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        lineHeight: '1.4',
                        boxSizing: 'border-box'
                      }}
                      rows={3}
                    />
                    {visibleErrors[`planAccion_${index}_seguimiento`] && (
                      <span className="error-message" style={{ display: 'block', marginTop: '4px', fontSize: '12px' }}>
                        Este campo es obligatorio
                      </span>
                    )}
                  </td>
                  <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem", position: 'relative', verticalAlign: "top" }}>
                    <input 
                      type="date" 
                      className="plan-accion-input"
                      value={plan.fecha}
                      onChange={(e) => handlePlanAccionChange(plan.id, 'fecha', e.target.value)}
                      style={{
                        ...getErrorStyle(`planAccion_${index}_fecha`),
                        width: '100%',
                        height: '80px',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: '#fff',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
                    />
                    {visibleErrors[`planAccion_${index}_fecha`] && (
                      <span className="error-message" style={{ display: 'block', marginTop: '4px', fontSize: '12px' }}>
                        Obligatorio
                      </span>
                    )}
                    {planesAccion.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePlanAccion(plan.id)}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          background: '#ff3860',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Eliminar plan"
                      >
                        ×
                      </button>
                    )}
                  </td>
                  {isManagerView && (
                    <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem", verticalAlign: "top" }}>
                      <textarea 
                        rows="3"
                        className="plan-accion-input"
                        placeholder="Comentarios del jefe"
                        value={plan.comentariosJefe}
                        onChange={(e) => handlePlanAccionChange(plan.id, 'comentariosJefe', e.target.value)}
                        style={{
                          width: '100%',
                          minHeight: '80px',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: '#fff',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          lineHeight: '1.4',
                          boxSizing: 'border-box'
                        }}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Botón para agregar más planes de acción */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '20px',
            padding: '16px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <button
              type="button"
              onClick={addPlanAccion}
              disabled={planesAccion.length >= 4}
              style={{
                background: planesAccion.length >= 4 
                  ? '#e5e7eb' 
                  : 'linear-gradient(135deg, #1F3B73, #0A0F1A)',
                color: planesAccion.length >= 4 ? '#9ca3af' : 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '14px 28px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: planesAccion.length >= 4 ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: planesAccion.length >= 4 
                  ? 'none' 
                  : '0 4px 12px rgba(31, 59, 115, 0.3)',
                transition: 'all 0.3s ease',
                opacity: planesAccion.length >= 4 ? 0.6 : 1,
                minWidth: '200px',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => {
                if (planesAccion.length < 4) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(31, 59, 115, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (planesAccion.length < 4) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(31, 59, 115, 0.3)';
                }
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>+</span>
              {planesAccion.length >= 4 ? 'Máximo 4 planes' : 'Agregar Plan de Acción'}
            </button>
            <div style={{ 
              marginTop: '8px', 
              fontSize: '12px', 
              color: '#64748b',
              fontStyle: 'italic'
            }}>
              {planesAccion.length < 4 ? `Puede agregar hasta ${4 - planesAccion.length} plan${4 - planesAccion.length > 1 ? 'es' : ''} más` : 'Ha alcanzado el máximo de planes'}
            </div>
          </div>
        </section>

        {isManagerView && (
        <section className="evaluation-section">
          <h2 className="seccion-titulo">COMENTARIOS DEL JEFE</h2>
          <textarea 
            rows="3" 
            className="textoarea-campo campo-textarea"
            value={comentariosJefe}
            onChange={(e)=>{ setComentariosJefe(e.target.value); setFormTouched(true); }}
            placeholder="Comentarios generales del jefe"
          />
        </section>
        )}

        <section className="evaluation-section" style={{ textAlign: "center" }}>
          <div className="signatures-container">
            <div className="signatures-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'start' }}>
              {/* Firma del Evaluado (solo lectura, precargada) */}
              <div style={{ position: 'relative' }}>
                <SignatureUploader 
                  label="Firma (Evaluado)" 
                  onChange={() => {}}
                  value={employeeSignature}
                  disabled={true}
                  errorStyle={getErrorStyle('employeeSignature')}
                />
              </div>

              {/* Firma del Jefe (editable, precargada si existe) */}
              <div style={{ position: 'relative' }}>
                <SignatureUploader 
                  label="Firma (Jefe Directo)" 
                  onChange={setBossSignature}
                  value={bossSignature}
                  errorStyle={getErrorStyle('bossSignature')}
                />
                {visibleErrors.bossSignature && (
                  <span className="error-message" style={{ position: 'absolute', bottom: '-20px', left: '0', right: '0', textAlign: 'center' }}>
                    La firma es obligatoria
                  </span>
                )}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="finalizar-btn" onClick={() => handleSave(true)} disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar y finalizar'}
            </button>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Componente de celebración épica */}
      <CompletionCelebrationBoss
        open={showCompletion}
        employeeName={employee?.nombre || ''}
        bossName={boss?.nombre || ''}
        compAvg={realAverages.promedioCompetencias}
        autoCloseMs={15000}
        closeOnBackdrop={false}
        onClose={() => { setShowCompletion(false); window.location.href = '/'; }}
        onPrimaryAction={() => (window.location.href = '/')}
      />
      
      {/* Estilos responsivos para ACTA DE COMPROMISO y PLAN DE ACCIÓN */}
      <style jsx>{`
        @media (max-width: 768px) {
          .compromiso-table {
            font-size: 12px !important;
          }
          .compromiso-table th,
          .compromiso-table td {
            padding: 0.5rem !important;
          }
          .compromiso-table textarea {
            min-height: 60px !important;
            font-size: 12px !important;
            padding: 8px !important;
          }
          .compromiso-table button {
            padding: 4px 8px !important;
            font-size: 11px !important;
          }
          
          /* Estilos responsivos para PLAN DE ACCIÓN */
          .plan-accion-table {
            font-size: 12px !important;
          }
          .plan-accion-table th,
          .plan-accion-table td {
            padding: 0.5rem !important;
          }
          .plan-accion-table textarea {
            min-height: 60px !important;
            font-size: 12px !important;
            padding: 8px !important;
          }
          .plan-accion-table input[type="date"] {
            height: 60px !important;
            font-size: 12px !important;
            padding: 8px !important;
          }
          .plan-accion-table button {
            padding: 4px 8px !important;
            font-size: 11px !important;
          }
        }
        @media (max-width: 480px) {
          .compromiso-table {
            font-size: 11px !important;
          }
          .compromiso-table th,
          .compromiso-table td {
            padding: 0.4rem !important;
          }
          .compromiso-table textarea {
            min-height: 50px !important;
            font-size: 11px !important;
            padding: 6px !important;
          }
          .compromiso-table button {
            padding: 3px 6px !important;
            font-size: 10px !important;
          }
          
          /* Estilos responsivos para PLAN DE ACCIÓN en móvil */
          .plan-accion-table {
            font-size: 11px !important;
          }
          .plan-accion-table th,
          .plan-accion-table td {
            padding: 0.4rem !important;
          }
          .plan-accion-table textarea {
            min-height: 50px !important;
            font-size: 11px !important;
            padding: 6px !important;
          }
          .plan-accion-table input[type="date"] {
            height: 50px !important;
            font-size: 11px !important;
            padding: 6px !important;
          }
          .plan-accion-table button {
            padding: 3px 6px !important;
            font-size: 10px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PerformanceEvaluationBoss;
