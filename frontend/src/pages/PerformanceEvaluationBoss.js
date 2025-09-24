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
    aspectosMejorar: ''
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
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const resp = await fetch(`${apiUrl}/api/evaluations/${existingEvaluationId}/complete/${employee.id_empleado}`);
        if (!resp.ok) return;
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
            aspectosMejorar: data.mejoramiento.aspectos_mejorar || data.mejoramiento.aspectosMejorar || ''
          });
          // Cargar comentarios del jefe si existen
          if (data.mejoramiento.comentarios_jefe) {
            setComentariosJefe(data.mejoramiento.comentarios_jefe);
          }
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
      aspecto: "Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.",
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
      aspecto: "Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia",
      worker: "",
      boss: "",
      average: "",
      justificacionJefe: "",
    },
    {
      id: 6,
      aspecto: "Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.",
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
      aspecto: "Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.",
      worker: "",
      boss: "",
      average: "",
      justificacionJefe: "",
    },
    {
      id: 9,
      aspecto: "Anticipa problemas y posibles soluciones que advierten su carácter de especialista.",
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
      aspecto: "Toma la iniciativa en el contacto con clientes internos y externos para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.",
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

  // Funciones para guardar y cargar datos del localStorage
  const saveFormData = () => {
    const formData = {
      datosGenerales,
      rows,
      mejoramiento,
      planesAccion,
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
            promedioHseq: 0,
            promedioGeneral: parseFloat(promedios.promedio_general) || 0
          });
        }
      }
    } catch (error) {
      console.error('Error al obtener promedios reales:', error);
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
  }, [datosGenerales, rows, mejoramiento, planesAccion, employeeSignature, bossSignature, employee, formTouched]);

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
    const errores = {};
    let isValid = true;

    // Validar datos generales (según modo)
    const requiredGeneralFields = isManagerView
      ? ['fechaEvaluacion']
      : ['fechaIngreso','fechaEvaluacion','area'];
    requiredGeneralFields.forEach(key => {
      if (!datosGenerales[key]) {
        errores[`datosGenerales_${key}`] = true;
        isValid = false;
      }
    });

    // Validar competencias (condicional por modo)
    rows.forEach((row, index) => {
      const workerOk = row.worker && String(row.worker) !== '' && String(row.worker) !== '0';
      const bossOk = row.boss && String(row.boss) !== '' && String(row.boss) !== '0';
      
      // Solo validar worker en modo empleado
      if (!isManagerView && !workerOk) {
        errores[`worker_${index}`] = true;
        isValid = false;
      }
      
      // Solo validar boss en modo jefe
      if (isManagerView && !bossOk) {
        errores[`boss_${index}`] = true;
        isValid = false;
      }
    });

    // Validar mejoramiento
    if (!mejoramiento.fortalezas.trim()) {
      errores.fortalezas = true;
      isValid = false;
    }
    if (!mejoramiento.aspectosMejorar.trim()) {
      errores.aspectosMejorar = true;
      isValid = false;
    }

    // Validar planes de acción (opcional): si un plan tiene algún campo diligenciado, exigir todos
    planesAccion.forEach((plan, index) => {
      const keys = Object.keys(plan).filter(k => k !== 'id');
      const hasAny = keys.some(k => plan[k] && String(plan[k]).trim() !== '');
      if (hasAny) {
        keys.forEach(k => {
          if (!plan[k] || String(plan[k]).trim() === '') {
            errores[`planAccion_${index}_${k}`] = true;
            isValid = false;
          }
        });
      }
    });

    // Validar firmas (condicional por modo)
    if (!isManagerView && !employeeSignature) {
      errores.employeeSignature = true;
      isValid = false;
    }
    if (isManagerView && !bossSignature) {
      errores.bossSignature = true;
      isValid = false;
    }

    setValidationErrors(errores);
    return { isValid, errores };
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
    const errores = {};

    // Validar competencias (rows) - condicional por modo
    rows.forEach((row) => {
      const workerOk = row.worker && String(row.worker) !== '' && String(row.worker) !== '0';
      const bossOk = row.boss && String(row.boss) !== '' && String(row.boss) !== '0';
      if (!isManagerView && !workerOk) {
        errores[`competencia_worker_${row.id}`] = true;
      }
      if (isManagerView && !bossOk) {
        errores[`competencia_boss_${row.id}`] = true;
      }
      if (isManagerView && bossOk) {
        const bossVal = Number(row.boss);
        const needsJust = bossVal === 5 || bossVal <= 2;
        if (needsJust && !String(row.justificacionJefe || '').trim()) {
          errores[`competencia_boss_justificacion_${row.id}`] = true;
        }
      }
    });

    // Validar mejoramiento
    if (!mejoramiento.fortalezas.trim()) {
      errores.fortalezas = true;
    }
    if (!mejoramiento.aspectosMejorar.trim()) {
      errores.aspectosMejorar = true;
    }

    // Validar planes de acción (opcional): si un plan tiene algún campo diligenciado, exigir todos
    planesAccion.forEach((plan, index) => {
      const keys = Object.keys(plan).filter(k => k !== 'id');
      const hasAny = keys.some(k => plan[k] && String(plan[k]).trim() !== '');
      if (hasAny) {
        keys.forEach(k => {
          if (!plan[k] || String(plan[k]).trim() === '') {
            errores[`planAccion_${index}_${k}`] = true;
          }
        });
      }
    });

    // Validar firmas
    if (!isManagerView && !employeeSignature) {
      errores.employeeSignature = true;
    }
    if (isManagerView) {
      // En modo jefe, solo validar que exista la firma del jefe
      // La firma del empleado debe estar precargada desde la evaluación existente
      if (!bossSignature) {
        errores.bossSignature = true;
      }
    }

    setValidationErrors(prev => ({ ...prev, ...errores }));
    return errores;
  };

  const fileToBase64 = (file) => new Promise((resolve) => {
    if (!file) return resolve('');
    if (typeof file === 'string' && file.startsWith('data:')) return resolve(file);
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });


  const handleSave = async (finalizar = false) => {
    // Validar calificaciones de todas las secciones
    const erroresCalificaciones = validateAllCalifications();

    // Validar promedio y firmas (ambas requeridas)
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
    const { isValid: formularioValido, errores: erroresFormulario } = validarFormulario();
    // Fusionar errores de calificaciones y firmas con los del formulario
    const mergedErrors = { ...erroresCalificaciones, ...erroresBasicos, ...erroresFormulario };
    setValidationErrors(prev => ({ ...prev, ...mergedErrors }));
    const hayErroresCalif = Object.keys(erroresCalificaciones).length > 0;
    const hayErroresFirmas = Object.keys(erroresBasicos).length > 0;

    if (hayErroresCalif || !formularioValido) {
      window.scrollTo(0, 0);
      
      // Debug: mostrar información detallada
      console.log('=== DEBUG VALIDACIÓN ===');
      console.log('isManagerView:', isManagerView);
      console.log('hayErroresCalif:', hayErroresCalif);
      console.log('formularioValido:', formularioValido);
      console.log('erroresCalificaciones:', erroresCalificaciones);
      console.log('erroresFormulario:', erroresFormulario);
      console.log('erroresBasicos:', erroresBasicos);
      console.log('mergedErrors:', mergedErrors);
      console.log('========================');
      
      // Construir mensaje más descriptivo
      const keys = Object.keys(mergedErrors);
      const faltantes = [];
      // Excluir del resumen visible algunos detalles
      if (keys.some(k => k.startsWith('competencia_worker_')) && !isManagerView) faltantes.push('calificaciones del trabajador en competencias');
      if (keys.some(k => k.startsWith('competencia_boss_')) && isManagerView) faltantes.push('calificaciones del jefe en competencias');
      if (keys.some(k => k.startsWith('competencia_boss_justificacion_'))) faltantes.push('justificaciones del jefe');
      if (keys.some(k => k.startsWith('planAccion_'))) faltantes.push('plan de acción');
      if (keys.includes('employeeSignature')) faltantes.push('firma del Evaluado');
      if (keys.includes('bossSignature')) faltantes.push('firma del Jefe Directo');
      if (keys.some(k => k.startsWith('datosGenerales_'))) faltantes.push('datos generales');
      if (keys.includes('fortalezas')) faltantes.push('Fortalezas');
      if (keys.includes('aspectosMejorar')) faltantes.push('Aspectos a mejorar');

      const resumen = faltantes.length ? `Faltan: ${faltantes.join(', ')}.` : (isManagerView
        ? 'Complete los campos requeridos.'
        : 'Complete las calificaciones del trabajador y los campos requeridos.');
      warning('Campos obligatorios', resumen);
      return;
    }

    if (!promedioNumber || promedioNumber <= 0) {
      window.scrollTo(0, 0);
      warning('Validación requerida', 'Seleccione al menos una calificación en competencias para calcular el promedio.');
      return;
    }

    if (hayErroresFirmas) {
      window.scrollTo(0, 0);
      const faltantes = [];
      if (!isManagerView && !employeeSignature) faltantes.push('Evaluado');
      if (isManagerView && !bossSignature) faltantes.push('Jefe Directo');
      const mensaje = faltantes.length === 2 
        ? 'Las firmas del Evaluado y del Jefe Directo son obligatorias.' 
        : `La firma del ${faltantes[0]} es obligatoria.`;
      warning('Firmas requeridas', mensaje);
      return;
    }
    // Preparar payload para endpoint de actualización nativo (POST)
    try {
      setIsSubmitting(true);
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      if (!existingEvaluationId) {
        warning('Falta identificador', 'No se encontró el ID de la evaluación.');
        setIsSubmitting(false);
        return;
      }
      const jefeId = datosGenerales.idEvaluador || localStorage.getItem('employeeId') || '';

      // Construir FormData según API nativa
      const fd = new FormData();
      fd.append('evaluationId', String(existingEvaluationId));

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
        comentariosJefe: comentariosJefe || ''
      }));

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

      // Promedios
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
        
        // Guardar el ID de la evaluación para poder descargar el PDF
        localStorage.setItem('lastEvaluationId', evaluationId);
        
        // Obtener promedios reales de la base de datos
        await fetchRealAverages(evaluationId);
        
        // Mensaje de éxito acorde al 100% al terminar
        const tituloOk = finalizar
          ? '¡Evaluación del jefe completada (100%)!'
          : 'Cambios guardados';
        const mensajeEstado = finalizar
          ? 'El expediente quedó al 100% y pasó a "Pendiente HSEQ". Puede consultar o descargar el reporte desde Resultados.'
          : 'Se guardó el progreso de la evaluación del jefe.';

        success(tituloOk, mensajeEstado);
        
        // Limpiar datos guardados y tokens
        clearFormData();
        localStorage.removeItem('evaluationToken');
        localStorage.removeItem('evaluationTokenExpiry');
        localStorage.removeItem('instructionsRead');
        
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
            aspecto: "Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.",
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
            aspecto: "Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 6,
            aspecto: "Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.",
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
            aspecto: "Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.",
            worker: "",
            boss: "",
            average: "",
            justificacionJefe: "",
          },
          {
            id: 9,
            aspecto: "Anticipa problemas y posibles soluciones que advierten su carácter de especialista.",
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
            aspecto: "Toma la iniciativa en el contacto con clientes internos y externos para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.",
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
        
        setMejoramiento({ fortalezas: '', aspectosMejorar: '' });
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

  
  // Gestionar la ocultación temporal de mensajes de error
  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      // Mostrar los errores cuando se actualice validationErrors
      setVisibleErrors(validationErrors);
      
      // Configurar un temporizador para ocultarlos después de 6 segundos
      const timer = setTimeout(() => {
        setVisibleErrors({});  // Limpiar mensajes visibles pero mantener la validación
      }, 6000);
      
      return () => clearTimeout(timer);
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
            <div className="evaluation-row">
              <div className="evaluation-field">
                <label>Categoría de Evaluación:</label>
                <select 
                  name="categoriaEvaluacion"
                  value={datosGenerales.categoriaEvaluacion}
                  onChange={(e) => handleDatosGeneralesChange(e)}
                  style={getErrorStyle('datosGenerales_categoriaEvaluacion')}
                >
                  <option value="Período de prueba">Período de prueba</option>
                  <option value="Trimestral">Trimestral</option>
                  <option value="Anual">Anual</option>
                </select>
                {visibleErrors.datosGenerales_categoriaEvaluacion && (
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
              (Describa brevemente cuáles son las actividades del trabajo que mejor realiza y sus cualidades personales)
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
              <span className="error-message">Este campo es obligatorio</span>
            )}
          </div>

          {/* Factores a mejorar */}
          <div className="mejora-bloque">
            <h3 className="mejora-subtitulo">FACTORES A MEJORAR</h3>
            <p className="mejora-ayuda">
              (Concreta en qué aspectos debe mejorar el colaborador)
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
              <span className="error-message">Este campo es obligatorio</span>
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
              onChange={(e) => setMejoramiento(prev => ({
                ...prev,
                necesidadesCapacitacion: e.target.value
              }))}
            />
          </div>

          {/* Acta de compromiso */}
          <div className="mejora-bloque">
            <h3 className="mejora-subtitulo">ACTA DE COMPROMISO</h3>
            <table className="compromiso-table">
              <thead>
                <tr>
                  <th>CRITERIO</th>
                  <th>COMPROMISO</th>
                </tr>
              </thead>
              <tbody>
                {planesAccion.map((plan, index) => (
                  <tr key={plan.id}>
                    <td>
                      <input
                        type="text"
                        placeholder="Aspecto a mejorar"
                        value={plan.actividad}
                        onChange={(e) => handlePlanAccionChange(plan.id, 'actividad', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Compromiso"
                        value={plan.responsable}
                        onChange={(e) => handlePlanAccionChange(plan.id, 'responsable', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                      <span className="error-message">Obligatorio</span>
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
                      <span className="error-message">Obligatorio</span>
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
                      <span className="error-message">Obligatorio</span>
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
                  {isManagerView && (
                    <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                      <textarea 
                        rows="2"
                        className="plan-accion-input"
                        placeholder="Comentarios del jefe"
                        value={plan.comentariosJefe}
                        onChange={(e) => handlePlanAccionChange(plan.id, 'comentariosJefe', e.target.value)}
                        style={{
                          width: '100%',
                          minHeight: '40px',
                          resize: 'vertical',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          padding: '8px',
                          fontSize: '14px'
                        }}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Botón para agregar más planes de acción */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
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
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: planesAccion.length >= 4 ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: planesAccion.length >= 4 
                  ? 'none' 
                  : '0 4px 12px rgba(31, 59, 115, 0.3)',
                transition: 'all 0.3s ease',
                opacity: planesAccion.length >= 4 ? 0.6 : 1
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
              <span style={{ fontSize: '16px' }}>+</span>
              {planesAccion.length >= 4 ? 'Máximo 4 planes' : 'Agregar Plan de Acción'}
            </button>
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
                />
              </div>

              {/* Firma del Jefe (editable, precargada si existe) */}
              <div style={{ position: 'relative' }}>
                <SignatureUploader 
                  label="Firma (Jefe Directo)" 
                  onChange={setBossSignature}
                  value={bossSignature}
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
        onDownload={() => {
          // Descargar PDF de la evaluación usando el endpoint existente
          const evaluationId = localStorage.getItem('lastEvaluationId');
          if (evaluationId && employee?.id_empleado) {
            const apiUrl = process.env.REACT_APP_API_BASE_URL;
            const downloadUrl = `${apiUrl}/api/evaluations/${evaluationId}/pdf/${employee.id_empleado}`;
            window.open(downloadUrl, '_blank');
          } else {
            showError('Error', 'No se pudo obtener la información necesaria para descargar el PDF');
          }
        }}
      />
    </div>
  );
};

export default PerformanceEvaluationBoss;
