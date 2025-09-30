import React, { useState, useEffect } from "react";
import "../assets/css/Styles1.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignatureUploader from '../components/SignatureUploader';
import { useNotification } from '../components/NotificationSystem';
import CompletionCelebration from '../components/CompletionCelebration';
import CompetenciasTable from "../components/CompetenciasTable";
import SEO from '../components/SEO';


function PerformanceEvaluation() {
  const { success, error: showError, warning } = useNotification();
  const [employee, setEmployee] = useState(null);
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
  const [currentEvaluationState, setCurrentEvaluationState] = useState('AUTOEVALUACION_PENDIENTE');
  const [datosGenerales, setDatosGenerales] = useState({
    fechaIngreso: '',
    fechaEvaluacion: '',
    area: '',
    nombreEvaluador: '',
    cargoEvaluador: '',
    areaEvaluador: '',
    idEvaluador: '',
    categoriaEvaluacion: 'Anual', // Valor por defecto
  });
  const [empleados, setEmpleados] = useState([]);
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [busquedaEvaluador, setBusquedaEvaluador] = useState('');
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
      fecha: ''
    }
  ]);
  const [actaCompromiso, setActaCompromiso] = useState([
    {
      id: 1,
      criterio: '',
      compromiso: ''
    }
  ]);

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

  // Detectar modo de vista: jefe vs empleado (solo por querystring desde TeamEvaluations)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const asParam = params.get('as');
      const manager = (asParam === 'manager');
      if (!manager) {
        try { localStorage.removeItem('evalMode'); } catch (_) {}
      }
      setIsManagerView(manager);
    } catch (_) {
      setIsManagerView(false);
    }
  }, []);

  // Evaluación existente (para modo jefe o continuar edición)
  const [existingEvaluationId, setExistingEvaluationId] = useState(null);
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const eid = params.get('eid');
      if (eid) setExistingEvaluationId(eid);
    } catch (_) {
      // no-op
    }
  }, []);

  // Cargar evaluación existente cuando hay eid (para que el jefe complete) 
  useEffect(() => {
    const loadExistingEvaluation = async () => {
      if (!existingEvaluationId || !employee?.id_empleado) return;
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const resp = await fetch(`${apiUrl}/api/evaluations/${existingEvaluationId}/complete/${employee.id_empleado}`);
        if (!resp.ok) return;
        const payload = await resp.json();
        const data = payload?.data || {};

        // Actualizar estado de la evaluación
        if (data.evaluacion?.estado_evaluacion) {
          setCurrentEvaluationState(data.evaluacion.estado_evaluacion);
        }

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

        // Mejoramiento
        if (data.mejoramiento) {
          setMejoramiento({
            fortalezas: data.mejoramiento.fortalezas || '',
            aspectosMejorar: data.mejoramiento.aspectos_mejorar || data.mejoramiento.aspectosMejorar || '',
            necesidadesCapacitacion: data.mejoramiento.necesidades_capacitacion || data.mejoramiento.necesidadesCapacitacion || ''
          });
        }

        // Plan de acción (si viene uno)
        if (data.plan_accion) {
          const fechaPlan = (data.plan_accion.fecha === '0000-00-00') ? '' : (data.plan_accion.fecha || '');
          setPlanesAccion([{ 
            id: 1,
            actividad: data.plan_accion.actividad || '',
            responsable: data.plan_accion.responsable || '',
            seguimiento: data.plan_accion.seguimiento || '',
            fecha: fechaPlan
          }]);
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
    localStorage.removeItem('evaluationFormData');
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
            promedioHseq: parseFloat(promedios.promedio_hseq) || 0,
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
    const employeeId = localStorage.getItem('employeeId');
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
            area: data.area || '' // Área del empleado evaluado
          }));
          
          // Cargar datos guardados después de obtener los datos del empleado
          loadFormData();
        }
      } catch (err) {
        setError('Error en la conexión con el servidor.');
      }
      setLoading(false);
    };

    const fetchEmpleados = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}/api/employees`);
        const data = await response.json();
        
        if (response.ok) {
          setEmpleados(data && (data.data || data) || []);
        } else {
        }
      } catch (err) {
      }
    };

    fetchEmployee();
    fetchEmpleados();
  }, []);

  // Filtrar empleados cuando cambie la búsqueda
  useEffect(() => {
    if (busquedaEvaluador.trim() === '') {
      setEmpleadosFiltrados(empleados);
    } else {
      const filtrados = empleados.filter(empleado => 
        empleado.nombre.toLowerCase().includes(busquedaEvaluador.toLowerCase()) ||
        empleado.cargo.toLowerCase().includes(busquedaEvaluador.toLowerCase())
      );
      setEmpleadosFiltrados(filtrados);
    }
  }, [empleados, busquedaEvaluador]);

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

  // Calcula promedio cada vez que cambie autoevaluación o evaluación
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

  // Calcular promedio de calificaciones HSEQ (deshabilitado)
  const calcularPromedioHseq = () => {
    return 0;
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
    const errores = {};
    let isValid = true;

    // Validar datos generales - TODOS OBLIGATORIOS
    const requiredGeneralFields = ['fechaIngreso', 'fechaEvaluacion', 'area', 'categoriaEvaluacion'];
    requiredGeneralFields.forEach(key => {
      if (!datosGenerales[key]) {
        errores[`datosGenerales_${key}`] = true;
        isValid = false;
      }
    });

    // Validar competencias - TODAS OBLIGATORIAS
    rows.forEach((row, index) => {
      const workerOk = row.worker && String(row.worker) !== '' && String(row.worker) !== '0';
      const bossOk = row.boss && String(row.boss) !== '' && String(row.boss) !== '0';
      
      // Validar worker SIEMPRE (autoevaluación obligatoria)
      if (!workerOk) {
        errores[`competencia_worker_${row.id}`] = true;
        isValid = false;
      }
      
      // Validar boss SOLO en modo jefe (isManagerView = true)
      if (isManagerView && !bossOk) {
        errores[`competencia_boss_${row.id}`] = true;
        isValid = false;
      }

      // Validar justificaciones para calificaciones extremas (1, 2 o 5)
      if (workerOk) {
        const workerVal = Number(row.worker);
        if ((workerVal === 1 || workerVal === 2 || workerVal === 5) && !row.justificacionTrabajador?.trim()) {
          errores[`competencia_worker_justificacion_${row.id}`] = true;
          isValid = false;
        }
      }
      
      // Validar justificaciones del jefe SOLO en modo jefe
      if (isManagerView && bossOk) {
        const bossVal = Number(row.boss);
        if ((bossVal === 1 || bossVal === 2 || bossVal === 5) && !row.justificacionJefe?.trim()) {
          errores[`competencia_boss_justificacion_${row.id}`] = true;
          isValid = false;
        }
      }
    });

    // HSEQ deshabilitado - no validar

    // Validar mejoramiento - OBLIGATORIO con mínimo de caracteres
    if (!mejoramiento.fortalezas.trim()) {
      errores.fortalezas = true;
      isValid = false;
    } else if (mejoramiento.fortalezas.trim().length < 50) {
      errores.fortalezas = true;
      isValid = false;
    }
    
    if (!mejoramiento.aspectosMejorar.trim()) {
      errores.aspectosMejorar = true;
      isValid = false;
    } else if (mejoramiento.aspectosMejorar.trim().length < 50) {
      errores.aspectosMejorar = true;
      isValid = false;
    }

    // Validar necesidades de capacitación (opcional pero si se llena debe tener mínimo 30 caracteres)
    if (mejoramiento.necesidadesCapacitacion && mejoramiento.necesidadesCapacitacion.trim().length > 0 && mejoramiento.necesidadesCapacitacion.trim().length < 30) {
      errores.necesidadesCapacitacion = true;
      isValid = false;
    }

    // Validar planes de acción - OBLIGATORIO (al menos uno completo)
    let hasValidPlan = false;
    planesAccion.forEach((plan, index) => {
      const keys = Object.keys(plan).filter(k => k !== 'id');
      const hasAny = keys.some(k => plan[k] && String(plan[k]).trim() !== '');
      if (hasAny) {
        // Para responsable y seguimiento, permitir cualquier cantidad de caracteres (incluso vacío)
        const requiredFields = ['actividad', 'fecha']; // Solo actividad y fecha son obligatorios
        const allRequiredFilled = requiredFields.every(k => plan[k] && String(plan[k]).trim() !== '');
        if (allRequiredFilled) {
          hasValidPlan = true;
        } else {
          requiredFields.forEach(k => {
            if (!plan[k] || String(plan[k]).trim() === '') {
              errores[`planAccion_${index}_${k}`] = true;
              isValid = false;
            }
          });
        }
      }
    });
    
    if (!hasValidPlan) {
      errores.planAccion_required = true;
      isValid = false;
    }

    // Validar acta de compromiso - OBLIGATORIO (al menos uno completo con mínimo de caracteres)
    let hasValidActa = false;
    actaCompromiso.forEach((acta, index) => {
      const keys = Object.keys(acta).filter(k => k !== 'id');
      const hasAny = keys.some(k => acta[k] && String(acta[k]).trim() !== '');
      if (hasAny) {
        const allFilled = keys.every(k => acta[k] && String(acta[k]).trim() !== '');
        if (allFilled) {
          // Validar mínimo de caracteres para cada campo
          const criterioOk = acta.criterio && acta.criterio.trim().length >= 30;
          const compromisoOk = acta.compromiso && acta.compromiso.trim().length >= 30;
          
          if (criterioOk && compromisoOk) {
            hasValidActa = true;
          } else {
            if (!criterioOk) errores[`actaCompromiso_${index}_criterio`] = true;
            if (!compromisoOk) errores[`actaCompromiso_${index}_compromiso`] = true;
            isValid = false;
          }
        } else {
          keys.forEach(k => {
            if (!acta[k] || String(acta[k]).trim() === '') {
              errores[`actaCompromiso_${index}_${k}`] = true;
              isValid = false;
            }
          });
        }
      }
    });
    
    if (!hasValidActa) {
      errores.actaCompromiso_required = true;
      isValid = false;
    }

    // Validar firmas - CONDICIONAL POR MODO
    if (!employeeSignature) {
      errores.employeeSignature = true;
      isValid = false;
    }
    
    // Solo validar firma del jefe en modo jefe (isManagerView = true)
    if (isManagerView && !bossSignature) {
      errores.bossSignature = true;
      isValid = false;
    }

    setValidationErrors(errores);
    return isValid;
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

  // Modificar el manejador de envío del formulario para la nueva estructura nativa
  // Función para validar todos los campos de calificaciones
  const validateAllCalifications = () => {
    const errores = {};

    // Validar competencias (rows) - TODAS OBLIGATORIAS
    rows.forEach((row) => {
      const workerOk = row.worker && String(row.worker) !== '' && String(row.worker) !== '0';
      const bossOk = row.boss && String(row.boss) !== '' && String(row.boss) !== '0';
      
      // Validar worker SIEMPRE (autoevaluación obligatoria)
      if (!workerOk) {
        errores[`competencia_worker_${row.id}`] = true;
      }
      
      // Validar boss SOLO en modo jefe (isManagerView = true)
      if (isManagerView && !bossOk) {
        errores[`competencia_boss_${row.id}`] = true;
      }

      // Validar justificaciones para calificaciones extremas (1, 2 o 5)
      if (workerOk) {
        const workerVal = Number(row.worker);
        if ((workerVal === 1 || workerVal === 2 || workerVal === 5) && !row.justificacionTrabajador?.trim()) {
          errores[`competencia_worker_justificacion_${row.id}`] = true;
        }
      }
      
      // Validar justificaciones del jefe SOLO en modo jefe
      if (isManagerView && bossOk) {
        const bossVal = Number(row.boss);
        if ((bossVal === 1 || bossVal === 2 || bossVal === 5) && !row.justificacionJefe?.trim()) {
          errores[`competencia_boss_justificacion_${row.id}`] = true;
        }
      }
    });

    // HSEQ deshabilitado - no validar

    return errores;
  };

  const handleSubmitEvaluation = async () => {
    // Validar calificaciones de todas las secciones
    const erroresCalificaciones = validateAllCalifications();

    // Validar promedio y firmas (condicional por modo)
    const promedioCompetencias = calcularPromedioCompetencias();
    const promedioNumber = Number(promedioCompetencias);

    const erroresBasicos = {};
    if (!isManagerView && !employeeSignature) {
      erroresBasicos.employeeSignature = true;
    }
    if (isManagerView && !bossSignature) {
      erroresBasicos.bossSignature = true;
    }

    // Validar otros campos (datos generales, mejoramiento, plan de acción)
    const formularioValido = validarFormulario();
    
    // Fusionar errores de calificaciones y firmas con los del formulario
    setValidationErrors(prev => ({ ...prev, ...erroresCalificaciones, ...erroresBasicos }));
    const hayErroresCalif = Object.keys(erroresCalificaciones).length > 0;
    const hayErroresFirmas = Object.keys(erroresBasicos).length > 0;

    if (hayErroresCalif || !formularioValido) {
      window.scrollTo(0, 0);
      
      // Construir mensaje específico basado en los errores encontrados
      const erroresDetectados = [];
      
      // Verificar errores de competencias con detalles específicos
      const erroresCompetencias = Object.keys(erroresCalificaciones).filter(k => k.startsWith('competencia_'));
      if (erroresCompetencias.length > 0) {
        const erroresWorker = erroresCompetencias.filter(k => k.includes('_worker_') && !k.includes('_justificacion_'));
        const erroresBoss = erroresCompetencias.filter(k => k.includes('_boss_') && !k.includes('_justificacion_'));
        const erroresJustificacion = erroresCompetencias.filter(k => k.includes('_justificacion_'));
        
        if (erroresWorker.length > 0) {
          const competenciasFaltantes = erroresWorker.map(error => {
            const id = error.split('_')[2];
            const competencia = rows.find(r => r.id == id);
            return competencia ? `"${competencia.aspecto.substring(0, 50)}..."` : `competencia ${id}`;
          });
          erroresDetectados.push(`Calificaciones del trabajador faltantes: ${competenciasFaltantes.join(', ')}`);
        }
        if (erroresBoss.length > 0) {
          const competenciasFaltantes = erroresBoss.map(error => {
            const id = error.split('_')[2];
            const competencia = rows.find(r => r.id == id);
            return competencia ? `"${competencia.aspecto.substring(0, 50)}..."` : `competencia ${id}`;
          });
          erroresDetectados.push(`Calificaciones del jefe faltantes: ${competenciasFaltantes.join(', ')}`);
        }
        if (erroresJustificacion.length > 0) {
          const justificacionesFaltantes = erroresJustificacion.map(error => {
            const id = error.split('_')[3];
            const competencia = rows.find(r => r.id == id);
            const tipo = error.includes('_worker_') ? 'trabajador' : 'jefe';
            return competencia ? `"${competencia.aspecto.substring(0, 40)}..." (${tipo})` : `competencia ${id} (${tipo})`;
          });
          erroresDetectados.push(`Justificaciones requeridas para calificaciones 1, 2 o 5: ${justificacionesFaltantes.join(', ')}`);
        }
      }
      
      // Verificar errores de formulario con detalles específicos
      const erroresFormulario = Object.keys(validationErrors).filter(k => !k.startsWith('competencia_'));
      if (erroresFormulario.length > 0) {
        const camposFaltantes = [];
        
        // Detalles específicos de datos generales
        if (erroresFormulario.some(k => k.includes('datosGenerales_fechaIngreso'))) camposFaltantes.push('Fecha de ingreso');
        if (erroresFormulario.some(k => k.includes('datosGenerales_fechaEvaluacion'))) camposFaltantes.push('Fecha de evaluación');
        if (erroresFormulario.some(k => k.includes('datosGenerales_area'))) camposFaltantes.push('Área');
        if (erroresFormulario.some(k => k.includes('datosGenerales_categoriaEvaluacion'))) camposFaltantes.push('Categoría de evaluación');
        if (erroresFormulario.some(k => k.includes('datosGenerales_nombreEvaluador'))) camposFaltantes.push('Nombre del evaluador');
        if (erroresFormulario.some(k => k.includes('datosGenerales_cargoEvaluador'))) camposFaltantes.push('Cargo del evaluador');
        if (erroresFormulario.some(k => k.includes('datosGenerales_areaEvaluador'))) camposFaltantes.push('Área del evaluador');
        
        // Otros campos
        if (erroresFormulario.some(k => k.includes('fortalezas'))) camposFaltantes.push('Fortalezas (mínimo 50 caracteres)');
        if (erroresFormulario.some(k => k.includes('aspectosMejorar'))) camposFaltantes.push('Aspectos a mejorar (mínimo 50 caracteres)');
        if (erroresFormulario.some(k => k.includes('necesidadesCapacitacion'))) camposFaltantes.push('Necesidades de capacitación (mínimo 30 caracteres)');
        if (erroresFormulario.some(k => k.includes('planAccion_'))) camposFaltantes.push('Plan de acción (actividad y fecha obligatorias)');
        if (erroresFormulario.some(k => k.includes('actaCompromiso_'))) camposFaltantes.push('Acta de compromiso (mínimo 30 caracteres por campo)');
        
        if (camposFaltantes.length > 0) {
          erroresDetectados.push(`Campos requeridos: ${camposFaltantes.join(', ')}`);
        }
      }
      
      const mensaje = erroresDetectados.length > 0 
        ? `Por favor complete los siguientes campos:\n\n${erroresDetectados.join('\n\n')}`
        : 'Por favor complete todos los campos obligatorios.';
      
      warning('Campos obligatorios', mensaje);
      return;
    }

    if (!promedioNumber || promedioNumber <= 0) {
      window.scrollTo(0, 0);
      warning('Calificaciones requeridas', 'Debe completar al menos una calificación en la sección de competencias para poder finalizar la evaluación.');
      return;
    }

    if (hayErroresFirmas) {
      window.scrollTo(0, 0);
      const faltantes = [];
      if (!isManagerView && !employeeSignature) faltantes.push('Evaluado');
      if (isManagerView && !bossSignature) faltantes.push('Jefe Directo');
      const mensaje = faltantes.length === 2 
        ? 'Las firmas digitales del Evaluado y del Jefe Directo son obligatorias para finalizar la evaluación.' 
        : `La firma digital del ${faltantes[0]} es obligatoria para finalizar la evaluación.`;
      warning('Firmas requeridas', mensaje);
      return;
    }

    // Calcular promedios por apartado, HSEQ y resultado general
    const promediosPorApartado = calcularPromediosPorApartado();
    const promedioHseq = Number(calcularPromedioHseq());
    const promediosComponentes = [];
    if (promedioNumber > 0) promediosComponentes.push(promedioNumber);
    if (promedioHseq > 0) promediosComponentes.push(promedioHseq);
    const promedioGeneral = promediosComponentes.length > 0 
      ? Number((promediosComponentes.reduce((a, b) => a + b, 0) / promediosComponentes.length).toFixed(2)) 
      : 0;

    // Crear un objeto FormData para enviar datos a la nueva estructura nativa
    const formData = new FormData();
    formData.append('employeeId', employee.id_empleado);
    if (datosGenerales.idEvaluador) formData.append('bossId', String(datosGenerales.idEvaluador));
    if (existingEvaluationId) formData.append('evaluationId', String(existingEvaluationId));
    formData.append('promedioCompetencias', String(promedioCompetencias));
    formData.append('hseqAverage', String(promedioHseq));
    formData.append('generalAverage', String(promedioGeneral));
    formData.append('groupAverages', JSON.stringify(promediosPorApartado));
    
    // Agregar período de evaluación (puedes modificar esto según tus necesidades)
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    formData.append('periodoEvaluacion', `${year}-${month}`);
    
    // Agregar categoría de evaluación
    formData.append('categoriaEvaluacion', datosGenerales.categoriaEvaluacion);

    // Enviar datos completos para persistencia detallada en las nuevas tablas
    formData.append('competenciasData', JSON.stringify(rows));
    formData.append('hseqData', JSON.stringify([]));
    formData.append('mejoramiento', JSON.stringify(mejoramiento));
    formData.append('actaCompromiso', JSON.stringify(actaCompromiso));
    formData.append('planesAccion', JSON.stringify(planesAccion));

    if (employeeSignature) {
      formData.append('employeeSignature', employeeSignature);
    }
    if (bossSignature) {
      formData.append('bossSignature', bossSignature);
    }

    try {
      setIsSubmitting(true);
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const endpoint = existingEvaluationId ? 'update-native' : 'save-native';
      const response = await fetch(`${apiUrl}/api/evaluations/${endpoint}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        // Mostrar mensaje de éxito según el modo
        if (isManagerView) {
          success('¡Evaluación del Jefe Completada!', 'La evaluación del líder inmediato ha sido completada. Ahora está pendiente la evaluación HSEQ institucional.');
        } else {
          success('¡Autoevaluación Completada!', 'Su autoevaluación ha sido completada. Ahora está pendiente la evaluación del líder inmediato.');
        }
        
        // Obtener el ID de la evaluación recién guardada
        const evaluationId = data.id_evaluacion;
        
        localStorage.setItem('lastEvaluationId', evaluationId);
        
        // Obtener promedios reales de la base de datos
        await fetchRealAverages(evaluationId);
        
        // Limpiar datos guardados y tokens
        clearFormData();
        localStorage.removeItem('evaluationToken');
        localStorage.removeItem('evaluationTokenExpiry');
        localStorage.removeItem('instructionsRead');
        
        // Mostrar animación de cierre épico
        setShowCompletion(true);
        
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
          },
          {
            id: 3,
            aspecto: "Escucha con atención y comprende adecuadamente los mensajes o la información recibida, demostrando interés en lo que los demás expresan.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 4,
            aspecto: "Da respuesta a cada comunicación recibida de modo inmediato",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 5,
            aspecto: "Asume y aplica con responsabilidad las decisiones tomadas, tanto en sus tareas individuales como en las que corresponden al trabajo en equipo.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 6,
            aspecto: "Analiza las situaciones utilizando criterios claros y objetivos, logrando conclusiones justas y bien fundamentadas con las personas involucradas.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 7,
            aspecto: "Aporta soluciones alternativas en lo que refiere a sus saberes específicos.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 8,
            aspecto: "Comparte su conocimiento y experiencia especializada para apoyar los procesos de toma de decisiones en temas relacionados con su área de competencia.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 9,
            aspecto: "Identifica de manera anticipada posibles problemas y plantea soluciones viables, evidenciando su capacidad como especialista.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 10,
            aspecto: "Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativas al propio, para analizar y proponer soluciones posibles.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 11,
            aspecto: "Articula sus actuaciones con las de los demás",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 12,
            aspecto: "Cumple los compromisos adquiridos",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 13,
            aspecto: "Facilita la labor de sus supervisores y compañeros de trabajo",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 14,
            aspecto: "Escucha con interés y capta las necesidades de los demás.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 15,
            aspecto: "Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 16,
            aspecto: "Mantiene una comunicación proactiva con clientes internos y externos, tomando la iniciativa para informar, responder o coordinar, usando siempre un lenguaje claro y comprensible.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 17,
            aspecto: "Ejecuta sus tareas con los criterios de calidad establecidos.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 18,
            aspecto: "Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 19,
            aspecto: "Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 20,
            aspecto: "Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 21,
            aspecto: "Demuestra dominio técnico y procedimental en las tareas críticas del rol.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 22,
            aspecto: "Entrega resultados alineados con los estándares y tiempos definidos para su cargo.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 23,
            aspecto: "Prioriza y organiza sus funciones para asegurar el cumplimiento sin reprocesos.",
            worker: "",
            boss: "",
            average: "",
          },
        ]);
        
        // HSEQ deshabilitado - no limpiar
        
        setMejoramiento({ fortalezas: '', aspectosMejorar: '', necesidadesCapacitacion: '' });
        setPlanesAccion([
          {
            id: 1,
            actividad: '',
            responsable: '',
            seguimiento: '',
            fecha: ''
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
          nombreEvaluador: '',
          cargoEvaluador: '',
          areaEvaluador: '',
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

  // Función helper para obtener estilos de error de HSEQ (deshabilitado)
  const getHseqErrorStyle = (itemId, field) => {
    return {};
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
    <>
      <SEO 
        title="Evaluación de Desempeño - Autoevaluación del Colaborador"
        description="Completa tu autoevaluación de desempeño en el sistema de Meridian Consulting LTDA. Evalúa tus competencias, logros y áreas de mejora para tu desarrollo profesional."
        keywords="autoevaluación, evaluación de desempeño, competencias laborales, desarrollo profesional, Meridian Consulting, evaluación 360"
        url="https://evaluacion.meridianltda.com/performance"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Evaluación de Desempeño - Autoevaluación del Colaborador",
          "description": "Sistema de autoevaluación de desempeño para colaboradores de Meridian Consulting LTDA",
          "url": "https://evaluacion.meridianltda.com/performance",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Sistema de Evaluación de Desempeño - Meridian Consulting LTDA",
            "url": "https://evaluacion.meridianltda.com"
          },
          "about": {
            "@type": "Thing",
            "name": "Evaluación de Desempeño Laboral"
          }
        }}
      />
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
        <h1 className="evaluacion-desempeno">EVALUACIÓN DE DESEMPEÑO</h1>
        {isManagerView && (
          <div style={{
            background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
            border: '1px solid #bbdefb',
            borderRadius: '12px',
            padding: '15px',
            margin: '15px auto',
            maxWidth: '600px',
            fontSize: '14px',
            color: '#1976d2'
          }}>
            <strong>📋 Modo: Evaluación del Líder Inmediato</strong><br/>
            Está completando la evaluación del jefe directo. Esta es la etapa 2 del proceso de evaluación.
          </div>
        )}
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


      {/* Alerta de campos obligatorios */}
      <div style={alertStyle}>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
            <path fill="#ff3860" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          ¡ATENCIÓN! Todos los campos de esta evaluación son obligatorios.
        </span>
        <button 
          onClick={() => setShowAlert(false)} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#ff3860', 
            cursor: 'pointer',
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
        >
          ✕
        </button>
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
                  onChange={handleDatosGeneralesChange}
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
                   Categoría de Evaluación
                </label>
                <select 
                  name="categoriaEvaluacion"
                  value={datosGenerales.categoriaEvaluacion}
                  onChange={handleDatosGeneralesChange}
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
                     Este campo es obligatorio
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

            {/* Fila 4 */}
            <div className="evaluation-row">
              <div className="evaluation-field" style={{ position: 'relative', zIndex: 9999 }}>
                <label>Nombre del Jefe Inmediato:</label>
                <div style={{ position: 'relative', zIndex: 10000 }}>
                <input 
                  type="text" 
                    placeholder="Buscar evaluador..."
                    value={busquedaEvaluador || datosGenerales.nombreEvaluador || ''}
                    onChange={(e) => {
                      setBusquedaEvaluador(e.target.value);
                      if (e.target.value === '') {
                        setDatosGenerales(prev => ({ 
                          ...prev, 
                          nombreEvaluador: '',
                          cargoEvaluador: '',
                          areaEvaluador: ''
                        }));
                      }
                    }}
                    onFocus={() => setBusquedaEvaluador('')}
                  style={getErrorStyle('datosGenerales_nombreEvaluador')}
                />
                  {busquedaEvaluador && empleadosFiltrados.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      borderTop: 'none',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      zIndex: 10001,
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}>
                      {empleadosFiltrados.map((empleado) => (
                        <div
                          key={empleado.id_empleado}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #eee'
                          }}
                          onClick={() => {
                            setDatosGenerales(prev => ({ 
                              ...prev, 
                              nombreEvaluador: empleado.nombre,
                              cargoEvaluador: empleado.cargo || '',
                              areaEvaluador: empleado.area || '',
                              idEvaluador: empleado.id_empleado || ''
                            }));
                            // Guardar asignación local para TeamEvaluations (en el perfil del JEFE)
                            try {
                              const evaluationId = localStorage.getItem('lastEvaluationId');
                              const bossId = empleado.id_empleado;
                              const storageKey = `bossAssignmentsByBossId:${bossId}`;
                              const currentAssignments = JSON.parse(localStorage.getItem(storageKey) || '[]');
                              const newAssignment = {
                                id: `${employee?.id_empleado || ''}-${empleado.id_empleado}-${Date.now()}`,
                                employeeId: employee?.id_empleado || null,
                                evaluationId: existingEvaluationId || evaluationId || null,
                                nombre: employee?.nombre || '',
                                cargo: employee?.cargo || '',
                                evaluacionEstado: 'Pendiente'
                              };
                              const updated = [newAssignment, ...currentAssignments.filter(a => !(a.employeeId === newAssignment.employeeId && a.evaluationId === newAssignment.evaluationId))];
                              localStorage.setItem(storageKey, JSON.stringify(updated));
                            } catch(_){}
                            setBusquedaEvaluador('');
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                        >
                          {empleado.nombre}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {datosGenerales.nombreEvaluador && (
                  <div style={{ 
                    marginTop: '5px', 
                    padding: '5px 10px', 
                    backgroundColor: '#e8f4fd', 
                    borderRadius: '4px',
                    fontSize: '14px',
                    color: '#0066cc'
                  }}>
                    Seleccionado: {datosGenerales.nombreEvaluador}
                  </div>
                )}
                {visibleErrors.datosGenerales_nombreEvaluador && (
                  <span className="error-message">Este campo es obligatorio</span>
                )}
              </div>
              <div className="evaluation-field">
                <label>Cargo de Evaluador:</label>
                <input 
                  type="text" 
                  placeholder="Se llena automáticamente al seleccionar evaluador" 
                  name="cargoEvaluador"
                  value={datosGenerales.cargoEvaluador || ''}
                  readOnly
                  style={{
                    ...getErrorStyle('datosGenerales_cargoEvaluador'),
                    backgroundColor: '#f5f5f5',
                    cursor: 'not-allowed'
                  }}
                />
                {visibleErrors.datosGenerales_cargoEvaluador && (
                  <span className="error-message">Este campo es obligatorio</span>
                )}
              </div>
              <div className="evaluation-field">
                <label>Área:</label>
                <input 
                  type="text" 
                  placeholder="Se llena automáticamente al seleccionar evaluador" 
                  name="areaEvaluador"
                  value={datosGenerales.areaEvaluador || ''}
                  readOnly
                  style={{
                    ...getErrorStyle('datosGenerales_areaEvaluador'),
                    backgroundColor: '#f5f5f5',
                    cursor: 'not-allowed'
                  }}
                />
                {visibleErrors.datosGenerales_areaEvaluador && (
                  <span className="error-message">Este campo es obligatorio</span>
                )}
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
                <li><strong>3 = Cumple Parcialmente:</strong> Cumple en lo esencial, pero presenta áreas susceptibles de perfeccionamiento.</li>
                <li><strong>4 = Cumple Satisfactoriamente:</strong> Cumple a cabalidad con todos los aspectos evaluados.</li>
                <li><strong>5 = Cumple de Manera Excelente:</strong> Además de cumplir con todos los aspectos, aporta un valor agregado notable para la organización.</li>
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

      
        
        {/* Después de la sección de competencias, antes de la sección de mejoramiento */}
        <CompetenciasTable
          rows={rows}
          handleSelectChange={handleSelectChange}
          setRows={setRows}
          setFormTouched={setFormTouched}
          getCalificationErrorStyle={getCalificationErrorStyle}
          calcularPromedioCompetencias={calcularPromedioCompetencias}
        />
        {/* HSEQ temporalmente deshabilitado */}

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
              overflow: 'hidden'
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
                    <td style={{ padding: "0.8rem", border: "1px solid #e5e7eb" }}>
                      <input
                        type="text"
                        placeholder="Criterio específico"
                        value={acta.criterio}
                        onChange={(e) => handleActaCompromisoChange(acta.id, 'criterio', e.target.value)}
                        style={{
                          ...getErrorStyle(`actaCompromiso_${index}_criterio`),
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          fontSize: '14px',
                          backgroundColor: '#fff'
                        }}
                      />
                      {visibleErrors[`actaCompromiso_${index}_criterio`] && (
                        <span className="error-message" style={{ display: 'block', marginTop: '4px', fontSize: '12px' }}>
                          Este campo es obligatorio (mínimo 30 caracteres)
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "0.8rem", border: "1px solid #e5e7eb" }}>
                      <input
                        type="text"
                        placeholder="Compromiso específico"
                        value={acta.compromiso}
                        onChange={(e) => handleActaCompromisoChange(acta.id, 'compromiso', e.target.value)}
                        style={{
                          ...getErrorStyle(`actaCompromiso_${index}_compromiso`),
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          fontSize: '14px',
                          backgroundColor: '#fff'
                        }}
                      />
                      {visibleErrors[`actaCompromiso_${index}_compromiso`] && (
                        <span className="error-message" style={{ display: 'block', marginTop: '4px', fontSize: '12px' }}>
                          Este campo es obligatorio (mínimo 30 caracteres)
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "0.8rem", border: "1px solid #e5e7eb", textAlign: "center" }}>
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
                  colSpan={4}
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
                  width: "25%"
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
                  width: "25%"
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
                  width: "25%"
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
                  width: "25%"
                }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {planesAccion.map((plan, index) => (
                <tr key={plan.id}>
                  <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                    <input 
                      type="text" 
                      placeholder="Actividad" 
                      className="plan-accion-input"
                      value={plan.actividad}
                      onChange={(e) => handlePlanAccionChange(plan.id, 'actividad', e.target.value)}
                      style={getErrorStyle(`planAccion_${index}_actividad`)}
                    />
                    {visibleErrors[`planAccion_${index}_actividad`] && (
                      <span className="error-message">Este campo es obligatorio</span>
                    )}
                  </td>
                  <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                    <input 
                      type="text" 
                      placeholder="Responsable" 
                      className="plan-accion-input"
                      value={plan.responsable}
                      onChange={(e) => handlePlanAccionChange(plan.id, 'responsable', e.target.value)}
                      style={getErrorStyle(`planAccion_${index}_responsable`)}
                    />
                    {visibleErrors[`planAccion_${index}_responsable`] && (
                      <span className="error-message">Este campo es obligatorio</span>
                    )}
                  </td>
                  <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                    <input 
                      type="text" 
                      placeholder="Indicadores / Frecuencia" 
                      className="plan-accion-input"
                      value={plan.seguimiento}
                      onChange={(e) => handlePlanAccionChange(plan.id, 'seguimiento', e.target.value)}
                      style={getErrorStyle(`planAccion_${index}_seguimiento`)}
                    />
                    {visibleErrors[`planAccion_${index}_seguimiento`] && (
                      <span className="error-message">Este campo es obligatorio</span>
                    )}
                  </td>
                  <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem", position: 'relative' }}>
                    <input 
                      type="date" 
                      className="plan-accion-input"
                      value={plan.fecha}
                      onChange={(e) => handlePlanAccionChange(plan.id, 'fecha', e.target.value)}
                      style={getErrorStyle(`planAccion_${index}_fecha`)}
                    />
                    {visibleErrors[`planAccion_${index}_fecha`] && (
                      <span className="error-message">Obligatorio</span>
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

        <section className="evaluation-section" style={{ textAlign: "center" }}>
          <div className="signatures-container">
            <div className="signatures-row">
              <div style={{ position: 'relative' }}>
                <SignatureUploader 
                  label="Firma (Evaluado)" 
                  onChange={setEmployeeSignature}
                  value={employeeSignature}
                  errorStyle={getErrorStyle('employeeSignature')}
                />
                {visibleErrors.employeeSignature && (
                  <span className="error-message" style={{ position: 'absolute', bottom: '-20px', left: '0', right: '0', textAlign: 'center' }}>
                    La firma es obligatoria
                  </span>
                )}
              </div>
              {isManagerView && (
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
              )}
            </div>
          </div>
          <button className="finalizar-btn" onClick={handleSubmitEvaluation} disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Finalizar Evaluación'}
          </button>
        </section>
      </main>
      <Footer />
      
      {/* Componente de celebración épica */}
      <CompletionCelebration
        open={showCompletion}
        employeeName={employee?.nombre || ''}
        compAvg={realAverages.promedioCompetencias}
        hseqAvg={0}
        generalAvg={realAverages.promedioGeneral}
        autoCloseMs={15000}
        closeOnBackdrop={false}
        onClose={() => { setShowCompletion(false); window.location.href = '/'; }}
        onPrimaryAction={() => (window.location.href = '/')}
      />
      </div>
    </>
  );
};

export default PerformanceEvaluation;
