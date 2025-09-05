import React, { useState, useEffect } from "react";
import "../assets/css/Styles1.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignatureUploader from '../components/SignatureUploader';
import { useNotification } from '../components/NotificationSystem';
import CompletionCelebration from '../components/CompletionCelebration';


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
  const [datosGenerales, setDatosGenerales] = useState({
    fechaIngreso: '',
    fechaEvaluacion: '',
    area: '',
    nombreEvaluador: '',
    cargoEvaluador: '',
    areaEvaluador: '',
  });
  const [empleados, setEmpleados] = useState([]);
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [busquedaEvaluador, setBusquedaEvaluador] = useState('');
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
      fecha: ''
    }
  ]);

  // Manejo de estado para filas
  const [rows, setRows] = useState([
    {
      id: 1,
      aspecto: "Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor",
      worker: "",
      boss: "",
      average: "",
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
      aspecto: "Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.",
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
      aspecto: "Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia",
      worker: "",
      boss: "",
      average: "",
    },
    {
      id: 6,
      aspecto: "Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.",
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
      aspecto: "Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.",
      worker: "",
      boss: "",
      average: "",
    },
    {
      id: 9,
      aspecto: "Anticipa problemas y posibles que advierten su carácter de especialista.",
      worker: "",
      boss: "",
      average: "",
    },
    {
      id: 10,
      aspecto: "Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativa al propio, para analizar y proponer soluciones posibles.",
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
      aspecto: "Toma la iniciativa en el contacto con cliente interno y externo para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.",
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
      aspecto: "Prioriza y organiza sus funciones para asegurar cumplimiento sin reprocesos.",
      worker: "",
      boss: "",
      average: "",
    },
  ]);

  // Agregamos el estado para las responsabilidades HSEQ
  const [hseqItems, setHseqItems] = useState([
    {
      id: 1,
      responsabilidad: "Procurar el cuidado integral de su salud.",
      autoevaluacion: "",
      evaluacionJefe: "",
    },
    {
      id: 2,
      responsabilidad: "Suministrar información clara, veraz y completa sobre su estado de salud.",
      autoevaluacion: "",
      evaluacionJefe: "",
    },
    {
      id: 3,
      responsabilidad: "Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.",
      calificacion: "",
    },
    {
      id: 4,
      responsabilidad: "Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.",
      calificacion: "",
    },
    {
      id: 5,
      responsabilidad: "Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.",
      calificacion: "",
    },
    {
      id: 6,
      responsabilidad: "Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.",
      calificacion: "",
    },
    {
      id: 7,
      responsabilidad: "Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.",
      calificacion: "",
    },
    {
      id: 8,
      responsabilidad: "Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.",
      calificacion: "",
    },
    {
      id: 9,
      responsabilidad: "Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.",
      calificacion: "",
    },
    {
      id: 10,
      responsabilidad: "Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.",
      calificacion: "",
    },
    {
      id: 11,
      responsabilidad: "Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.",
      calificacion: "",
    },
    {
      id: 12,
      responsabilidad: "Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.",
      calificacion: "",
    },
    {
      id: 13,
      responsabilidad: "Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.",
      calificacion: "",
    },
    {
      id: 14,
      responsabilidad: "Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.",
      calificacion: "",
    },
    {
      id: 15,
      responsabilidad: "Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.",
      calificacion: "",
    },
    {
      id: 16,
      responsabilidad: "Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.",
      calificacion: "",
    },
    {
      id: 17,
      responsabilidad: "Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.",
      calificacion: "",
    },
    {
      id: 18,
      responsabilidad: "Participar en simulacros, elección de COPASST y elección de comité de convivencia.",
      calificacion: "",
    },
    {
      id: 19,
      responsabilidad: "Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.",
      calificacion: "",
    },
    {
      id: 20,
      responsabilidad: "Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.",
      calificacion: "",
    }
  ]);

  

  

  

  

  

  

  // Funciones para guardar y cargar datos del localStorage
  const saveFormData = () => {
    const formData = {
      datosGenerales,
      rows,
      hseqItems,
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
          setHseqItems(formData.hseqItems || hseqItems);
          setMejoramiento(formData.mejoramiento || mejoramiento);
          setPlanesAccion(formData.planesAccion || planesAccion);
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
          console.error('Error al cargar empleados:', data);
        }
      } catch (err) {
        console.error('Error al cargar empleados:', err);
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
  }, [datosGenerales, rows, hseqItems, mejoramiento, planesAccion, employeeSignature, bossSignature, employee, formTouched]);

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

  // Manejador para cambios en la calificación HSEQ
  const handleHseqChange = (id, field, value) => {
    setHseqItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
    setFormTouched(true);
  };

  // Calcular promedio de calificaciones HSEQ
  const calcularPromedioHseq = () => {
    let sumaTotal = 0;
    let contadorValidos = 0;
    
    hseqItems.forEach(item => {
      const auto = Number(item.autoevaluacion) || 0;
      const jefe = Number(item.evaluacionJefe) || 0;
      
      if (auto > 0 && jefe > 0) {
        sumaTotal += (auto + jefe) / 2;
        contadorValidos++;
      } else if (auto > 0) {
        sumaTotal += auto;
        contadorValidos++;
      } else if (jefe > 0) {
        sumaTotal += jefe;
        contadorValidos++;
      }
    });
    
    if (contadorValidos === 0) return 0;
    return (sumaTotal / contadorValidos).toFixed(2);
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

    // Validar datos generales
    Object.keys(datosGenerales).forEach(key => {
      if (!datosGenerales[key]) {
        errores[`datosGenerales_${key}`] = true;
        isValid = false;
      }
    });

    // Validar competencias
    rows.forEach((row, index) => {
      if (!row.worker || row.worker === '') {
        errores[`worker_${index}`] = true;
        isValid = false;
      }
      if (!row.boss || row.boss === '') {
        errores[`boss_${index}`] = true;
        isValid = false;
      }
    });


    // Validar HSEQ
    hseqItems.forEach((item, index) => {
      if (!item.autoevaluacion || item.autoevaluacion === '') {
        errores[`hseq_auto_${index}`] = true;
        isValid = false;
      }
      if (!item.evaluacionJefe || item.evaluacionJefe === '') {
        errores[`hseq_jefe_${index}`] = true;
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

    // Validar planes de acción
    planesAccion.forEach((plan, index) => {
      Object.keys(plan).forEach(key => {
        if (key !== 'id' && !plan[key]) {
          errores[`planAccion_${index}_${key}`] = true;
          isValid = false;
        }
      });
    });

    // Validar firmas
    if (!employeeSignature) {
      errores.employeeSignature = true;
      isValid = false;
    }
    if (!bossSignature) {
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

  // Modificar el manejador de envío del formulario para la nueva estructura nativa
  // Función para validar todos los campos de calificaciones
  const validateAllCalifications = () => {
    const errores = {};

    // Validar competencias (rows) - autoevaluación y evaluación del jefe
    rows.forEach((row, index) => {
      if (!row.worker || row.worker === '' || row.worker === '0') {
        errores[`competencia_worker_${row.id}`] = true;
      }
      if (!row.boss || row.boss === '' || row.boss === '0') {
        errores[`competencia_boss_${row.id}`] = true;
      }
    });

    // Validar HSEQ items
    hseqItems.forEach((item, index) => {
      if (item.autoevaluacion !== undefined && (!item.autoevaluacion || item.autoevaluacion === '' || item.autoevaluacion === '0')) {
        errores[`hseq_autoevaluacion_${item.id}`] = true;
      }
      if (item.evaluacionJefe !== undefined && (!item.evaluacionJefe || item.evaluacionJefe === '' || item.evaluacionJefe === '0')) {
        errores[`hseq_evaluacionJefe_${item.id}`] = true;
      }
      if (item.calificacion !== undefined && (!item.calificacion || item.calificacion === '' || item.calificacion === '0')) {
        errores[`hseq_calificacion_${item.id}`] = true;
      }
    });

    return errores;
  };

  const handleSubmitEvaluation = async () => {
    // Validar todos los campos de calificaciones
    const erroresCalificaciones = validateAllCalifications();
    
    // Validación básica: promedio de competencias y firmas
    const promedioCompetencias = calcularPromedioCompetencias();
    const promedioNumber = Number(promedioCompetencias);

    const erroresBasicos = {};
    if (!employeeSignature) {
      erroresBasicos.employeeSignature = true;
    }
    if (!bossSignature) {
      erroresBasicos.bossSignature = true;
    }

    // Combinar todos los errores
    const todosLosErrores = { ...erroresBasicos, ...erroresCalificaciones };

    if (Object.keys(erroresCalificaciones).length > 0) {
      setValidationErrors(todosLosErrores);
      window.scrollTo(0, 0);
      warning('Campos obligatorios', 'Todos los campos de calificaciones son obligatorios. Por favor complete todas las evaluaciones.');
      return;
    }

    if (!promedioNumber || promedioNumber <= 0) {
      setValidationErrors(todosLosErrores);
      window.scrollTo(0, 0);
      warning('Validación requerida', 'Seleccione al menos una calificación en competencias para calcular el promedio.');
      return;
    }

    if (Object.keys(erroresBasicos).length > 0) {
      setValidationErrors(todosLosErrores);
      window.scrollTo(0, 0);
      warning('Firmas requeridas', 'Las firmas del Evaluado y del Jefe Directo son obligatorias.');
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
    formData.append('promedioCompetencias', String(promedioCompetencias));
    formData.append('hseqAverage', String(promedioHseq));
    formData.append('generalAverage', String(promedioGeneral));
    formData.append('groupAverages', JSON.stringify(promediosPorApartado));
    
    // Agregar período de evaluación (puedes modificar esto según tus necesidades)
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    formData.append('periodoEvaluacion', `${year}-${month}`);

    // Enviar datos completos para persistencia detallada en las nuevas tablas
    formData.append('competenciasData', JSON.stringify(rows));
    formData.append('hseqData', JSON.stringify(hseqItems));
    formData.append('mejoramiento', JSON.stringify(mejoramiento));
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
      // Cambiar la URL para usar el nuevo controlador nativo
      const response = await fetch(`${apiUrl}/api/evaluations/save-native`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        // Mostrar mensaje de éxito
        success('¡Evaluación completada!', 'La evaluación ha sido diligenciada exitosamente.');
        
        // Obtener el ID de la evaluación recién guardada
        const evaluationId = data.id_evaluacion;
        
        // Guardar el ID de la evaluación para poder descargar el PDF
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
            aspecto: "Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.",
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
            aspecto: "Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 6,
            aspecto: "Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.",
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
            aspecto: "Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 9,
            aspecto: "Anticipa problemas y posibles que advierten su carácter de especialista.",
            worker: "",
            boss: "",
            average: "",
          },
          {
            id: 10,
            aspecto: "Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativa al propio, para analizar y proponer soluciones posibles.",
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
            aspecto: "Toma la iniciativa en el contacto con cliente interno y externo para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.",
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
            aspecto: "Prioriza y organiza sus funciones para asegurar cumplimiento sin reprocesos.",
            worker: "",
            boss: "",
            average: "",
          },
        ]);
        
        setHseqItems([
          {
            id: 1,
            responsabilidad: "Procurar el cuidado integral de su salud.",
            autoevaluacion: "",
            evaluacionJefe: "",
          },
          {
            id: 2,
            responsabilidad: "Suministrar información clara, veraz y completa sobre su estado de salud.",
            autoevaluacion: "",
            evaluacionJefe: "",
          },
          {
            id: 3,
            responsabilidad: "Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.",
            calificacion: "",
          },
          {
            id: 4,
            responsabilidad: "Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.",
            calificacion: "",
          },
          {
            id: 5,
            responsabilidad: "Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.",
            calificacion: "",
          },
          {
            id: 6,
            responsabilidad: "Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.",
            calificacion: "",
          },
          {
            id: 7,
            responsabilidad: "Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.",
            calificacion: "",
          },
          {
            id: 8,
            responsabilidad: "Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.",
            calificacion: "",
          },
          {
            id: 9,
            responsabilidad: "Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.",
            calificacion: "",
          },
          {
            id: 10,
            responsabilidad: "Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.",
            calificacion: "",
          },
          {
            id: 11,
            responsabilidad: "Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.",
            calificacion: "",
          },
          {
            id: 12,
            responsabilidad: "Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.",
            calificacion: "",
          },
          {
            id: 13,
            responsabilidad: "Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.",
            calificacion: "",
          },
          {
            id: 14,
            responsabilidad: "Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.",
            calificacion: "",
          },
          {
            id: 15,
            responsabilidad: "Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.",
            calificacion: "",
          },
          {
            id: 16,
            responsabilidad: "Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.",
            calificacion: "",
          },
          {
            id: 17,
            responsabilidad: "Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.",
            calificacion: "",
          },
          {
            id: 18,
            responsabilidad: "Participar en simulacros, elección de COPASST y elección de comité de convivencia.",
            calificacion: "",
          },
          {
            id: 19,
            responsabilidad: "Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.",
            calificacion: "",
          },
          {
            id: 20,
            responsabilidad: "Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.",
            calificacion: "",
          }
        ]);
        
        setMejoramiento({ fortalezas: '', aspectosMejorar: '' });
        setPlanesAccion([
          {
            id: 1,
            actividad: '',
            responsable: '',
            seguimiento: '',
            fecha: ''
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
    position: 'relative'
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

  // Función helper para obtener estilos de error de HSEQ
  const getHseqErrorStyle = (itemId, field) => {
    return visibleErrors[`hseq_${field}_${itemId}`] ? {
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
      <style jsx>{`
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
                  readOnly
                  style={{
                    ...getErrorStyle('datosGenerales_fechaEvaluacion'),
                    backgroundColor: '#f5f5f5',
                    cursor: 'not-allowed'
                  }}
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

            {/* Fila 3 */}
            <div className="evaluation-row">
              <div className="evaluation-field" style={{ position: 'relative', zIndex: 9999 }}>
                <label>Nombre del evaluador:</label>
                <div style={{ position: 'relative', zIndex: 10000 }}>
                  <input 
                    type="text"
                    placeholder="Buscar evaluador..."
                    value={busquedaEvaluador}
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
                              areaEvaluador: empleado.area || ''
                            }));
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
              <em>
                Si otorga una calificación de 5, explique los factores de excelencia.<br />
                Si otorga una calificación de 2 o menor, justifique las razones de la deficiencia.
              </em>
            </li>
            <li>
              <strong>Proponga un plan de acción obligatorio</strong> para calificaciones de 5, 2 o menor.<br />
              Este plan debe detallar los pasos para mantener la excelencia o corregir las deficiencias.
            </li>
          </ol>
        </section>

        <hr className="evaluation-hr"/>
        <section className="evaluation-section">
          <table className="evaluation-table">
            <thead>
              {/* Barra de título "COMPETENCIAS" con un ÚNICO gradiente */}
              <tr>
                <th
                  colSpan={6}
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
                  COMPETENCIAS
                </th>
              </tr>
              
              {/* Encabezado de columnas con color sólido y bordes sutiles */}
              <tr>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF", 
                  padding: "0.6rem 0.4rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: "20%"
                }}>COMPETENCIA</th>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF", 
                  padding: "0.6rem 0.4rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: "25%"
                }}>DEFINICIÓN DE LA COMPETENCIA</th>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF", 
                  padding: "0.6rem 0.4rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: "28%"
                }}>ASPECTO A EVALUAR</th>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF", 
                  padding: "0.6rem 0.4rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: "14%"
                }}>TRABAJADOR</th>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF", 
                  padding: "0.6rem 0.4rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: "16%"
                }}>JEFE INMEDIATO</th>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF", 
                  padding: "0.6rem 0.4rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: "22%"
                }}>JUSTIFICACIÓN</th>
              </tr>
            </thead>
            <tbody>
              {/* Fila con rowSpan para "Comunicación efectiva" y su definición */}
              <tr>
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  Comunicación <br /> efectiva
                </td>
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Establecer comunicación efectiva y positiva con superiores jerárquicos,
                  pares y clientes, tanto en la expresión escrita como verbal y gestual.
                </td>

                {/* Aspecto 1 */}
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[0].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[0].worker === 0 ? "" : rows[0].worker}
                    onChange={(e) => handleSelectChange(rows[0].id, "worker", e.target.value)}
                    style={getCalificationErrorStyle(rows[0].id, 'worker')}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[0].boss === 0 ? "" : rows[0].boss}
                    onChange={(e) => handleSelectChange(rows[0].id, "boss", e.target.value)}
                    style={getCalificationErrorStyle(rows[0].id, 'boss')}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Aspecto 2 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[1].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[1].worker === 0 ? "" : rows[1].worker}
                    onChange={(e) => handleSelectChange(rows[1].id, "worker", e.target.value)}
                    style={getCalificationErrorStyle(rows[1].id, 'worker')}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[1].boss === 0 ? "" : rows[1].boss}
                    onChange={(e) => handleSelectChange(rows[1].id, "boss", e.target.value)}
                    style={getCalificationErrorStyle(rows[1].id, 'boss')}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Aspecto 3 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[2].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[2].worker === 0 ? "" : rows[2].worker}
                    onChange={(e) => handleSelectChange(rows[2].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[2].boss === 0 ? "" : rows[2].boss}
                    onChange={(e) => handleSelectChange(rows[2].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Aspecto 4 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[3].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[3].worker === 0 ? "" : rows[3].worker}
                    onChange={(e) => handleSelectChange(rows[3].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[3].boss === 0 ? "" : rows[3].boss}
                    onChange={(e) => handleSelectChange(rows[3].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>
            <tr>
              <td colSpan={7} style={{ borderBottom: "1px solid #ccc", margin: 0, padding: 0 }}></td>
            </tr>

            {/* Nueva Competencia: Instrumentalidad de decisiones */}
              <tr>
                {/* Primera fila: fila con rowSpan para competencia y definición */}
                <td
                  rowSpan={2}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  Instrumentalidad de <br /> decisiones
                </td>
                <td
                  rowSpan={2}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Decidir sobre las acciones en las que es responsable con criterios
                  de economía, eficacia, eficiencia y transparencia de la decisión.
                </td>

                {/* Aspecto 1 */}
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[4].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[4].worker === 0 ? "" : rows[4].worker}
                    onChange={(e) => handleSelectChange(rows[4].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[4].boss === 0 ? "" : rows[4].boss}
                    onChange={(e) => handleSelectChange(rows[4].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Segunda fila para el segundo aspecto */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[5].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[5].worker === 0 ? "" : rows[5].worker}
                    onChange={(e) => handleSelectChange(rows[5].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[5].boss === 0 ? "" : rows[5].boss}
                    onChange={(e) => handleSelectChange(rows[5].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>
              <tr>
              <td colSpan={7} style={{ borderBottom: "1px solid #ccc", margin: 0, padding: 0 }}></td>
            </tr>

              {/* Nueva Competencia: Aporte profesional */}
              <tr>
                {/* Primera fila con rowSpan de 4 para el nombre y la definición de la competencia */}
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  Aporte <br /> profesional
                </td>
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Poner a disposición de la administración sus saberes, experiencias previas,
                  asesorando la actualización de sus saberes expertos.
                </td>

                {/* Aspecto 1 */}
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[6].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[6].worker === 0 ? "" : rows[6].worker}
                    onChange={(e) => handleSelectChange(rows[6].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[6].boss === 0 ? "" : rows[6].boss}
                    onChange={(e) => handleSelectChange(rows[6].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Fila 2 de la competencia: Aspecto 2 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[7].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[7].worker === 0 ? "" : rows[7].worker}
                    onChange={(e) => handleSelectChange(rows[7].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[7].boss === 0 ? "" : rows[7].boss}
                    onChange={(e) => handleSelectChange(rows[7].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Fila 3 de la competencia: Aspecto 3 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[8].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[8].worker === 0 ? "" : rows[8].worker}
                    onChange={(e) => handleSelectChange(rows[8].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[8].boss === 0 ? "" : rows[8].boss}
                    onChange={(e) => handleSelectChange(rows[8].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Fila 4 de la competencia: Aspecto 4 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[9].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[9].worker === 0 ? "" : rows[9].worker}
                    onChange={(e) => handleSelectChange(rows[9].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[9].boss === 0 ? "" : rows[9].boss}
                    onChange={(e) => handleSelectChange(rows[9].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>
              <tr>
              <td colSpan={7} style={{ borderBottom: "1px solid #ccc", margin: 0, padding: 0 }}></td>
            </tr>

              {/* Nueva Competencia: Colaboración */}
              <tr>
                {/* Primera fila con rowSpan=3 para la competencia y su definición */}
                <td
                  rowSpan={3}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  Colaboración
                </td>
                <td
                  rowSpan={3}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Coopera con los demás con el fin de alcanzar los objetivos de la compañía.
                </td>

                {/* Aspecto 1 */}
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[10].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[10].worker === 0 ? "" : rows[10].worker}
                    onChange={(e) => handleSelectChange(rows[10].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[10].boss === 0 ? "" : rows[10].boss}
                    onChange={(e) => handleSelectChange(rows[10].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Fila 2 de la competencia: Aspecto 2 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[11].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[11].worker === 0 ? "" : rows[11].worker}
                    onChange={(e) => handleSelectChange(rows[11].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[11].boss === 0 ? "" : rows[11].boss}
                    onChange={(e) => handleSelectChange(rows[11].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Fila 3 de la competencia: Aspecto 3 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[12].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[12].worker === 0 ? "" : rows[12].worker}
                    onChange={(e) => handleSelectChange(rows[12].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[12].boss === 0 ? "" : rows[12].boss}
                    onChange={(e) => handleSelectChange(rows[12].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>
              <tr>
              <td colSpan={7} style={{ borderBottom: "1px solid #ccc", margin: 0, padding: 0 }}></td>
            </tr>

              {/* Nueva Competencia: Relaciones interpersonales */}
              <tr>
                {/* Primera fila con rowSpan=3 para la competencia y su definición */}
                <td
                  rowSpan={3}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  Relaciones <br /> interpersonales
                </td>
                <td
                  rowSpan={3}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Establecer y mantener relaciones de trabajo positivas, basadas en la comunicación
                  abierta y fluida y el respeto por los demás.
                </td>

                {/* Aspecto 1 */}
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[13].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[13].worker === 0 ? "" : rows[13].worker}
                    onChange={(e) => handleSelectChange(rows[13].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[13].boss === 0 ? "" : rows[13].boss}
                    onChange={(e) => handleSelectChange(rows[13].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Fila 2 de la competencia: Aspecto 2 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[14].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[14].worker === 0 ? "" : rows[14].worker}
                    onChange={(e) => handleSelectChange(rows[14].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[14].boss === 0 ? "" : rows[14].boss}
                    onChange={(e) => handleSelectChange(rows[14].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Fila 3 de la competencia: Aspecto 3 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[15].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[15].worker === 0 ? "" : rows[15].worker}
                    onChange={(e) => handleSelectChange(rows[15].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[15].boss === 0 ? "" : rows[15].boss}
                    onChange={(e) => handleSelectChange(rows[15].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>
              <tr>
              <td colSpan={7} style={{ borderBottom: "1px solid #ccc", margin: 0, padding: 0 }}></td>
            </tr>

              {/* Nueva Competencia: Gestión de procedimientos */}
              <tr>
                {/* Primera fila con rowSpan=3 para la competencia y su definición */}
                <td
                  rowSpan={3}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  Gestión de <br /> procedimientos
                </td>
                <td
                  rowSpan={3}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Desarrollar las tareas a cargo en el marco de los procedimientos vigentes
                  y proponer e introducir acciones para acelerar la entrega continua
                  y la productividad.
                </td>

                {/* Aspecto 1 */}
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[16].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[16].worker === 0 ? "" : rows[16].worker}
                    onChange={(e) => handleSelectChange(rows[16].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[16].boss === 0 ? "" : rows[16].boss}
                    onChange={(e) => handleSelectChange(rows[16].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Fila 2 de la competencia: Aspecto 2 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[17].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[17].worker === 0 ? "" : rows[17].worker}
                    onChange={(e) => handleSelectChange(rows[17].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[17].boss === 0 ? "" : rows[17].boss}
                    onChange={(e) => handleSelectChange(rows[17].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>

              {/* Fila 3 de la competencia: Aspecto 3 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[18].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[18].worker === 0 ? "" : rows[18].worker}
                    onChange={(e) => handleSelectChange(rows[18].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[18].boss === 0 ? "" : rows[18].boss}
                    onChange={(e) => handleSelectChange(rows[18].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>
              {/* Competencia: Cumplimiento de funciones del cargo */}
              <tr>
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  Cumplimiento de <br /> funciones del cargo
                </td>
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Asegurar la ejecución oportuna y con calidad de las funciones específicas del cargo, demostrando dominio técnico y alineación con los estándares establecidos.
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[19].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[19].worker === 0 ? "" : rows[19].worker}
                    onChange={(e) => handleSelectChange(rows[19].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[19].boss === 0 ? "" : rows[19].boss}
                    onChange={(e) => handleSelectChange(rows[19].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[20].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[20].worker === 0 ? "" : rows[20].worker}
                    onChange={(e) => handleSelectChange(rows[20].id, "worker", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[20].boss === 0 ? "" : rows[20].boss}
                    onChange={(e) => handleSelectChange(rows[20].id, "boss", e.target.value)}
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                  />
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[21].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                    <select
                      className="rating-select"
                    value={rows[21].worker === 0 ? "" : rows[21].worker}
                    onChange={(e) => handleSelectChange(rows[21].id, "worker", e.target.value)}
                    >
                      <option value="">1 - 5</option>
                      <option value="1">1 - No Cumple</option>
                      <option value="2">2 - Regular</option>
                      <option value="3">3 - Parcial</option>
                      <option value="4">4 - Satisfactorio</option>
                      <option value="5">5 - Excelente</option>
                    </select>
                  </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                    <select
                      className="rating-select"
                    value={rows[21].boss === 0 ? "" : rows[21].boss}
                    onChange={(e) => handleSelectChange(rows[21].id, "boss", e.target.value)}
                    >
                      <option value="">1 - 5</option>
                      <option value="1">1 - No Cumple</option>
                      <option value="2">2 - Regular</option>
                      <option value="3">3 - Parcial</option>
                      <option value="4">4 - Satisfactorio</option>
                      <option value="5">5 - Excelente</option>
                    </select>
                  </td>
                  <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                    <textarea
                      className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    />
                  </td>
                </tr>
              <tr className="avg-row">
                <td colSpan={6}>
                  <div className="avg-wrap">
                    <span className="avg-label">PROMEDIO CALIFICACIÓN COMPETENCIAS:</span>
                    <span className="avg-value">{calcularPromedioCompetencias()}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        
        {/* Después de la sección de competencias, antes de la sección de mejoramiento */}
        <hr className="evaluation-hr"/>
        <section className="evaluation-section">
          <table className="hseq-table">
            <thead>
              {/* Barra de título "HSEQ" con un ÚNICO gradiente */}
              <tr>
                <th 
                  colSpan={4} 
                  style={{ 
                    background: "linear-gradient(90deg, #1F3B73 0%, #0A0F1A 100%)", 
                    color: "#FFFFFF", 
                    textAlign: "center",
                    padding: "0.8rem 1rem",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    height: "28px",
                    borderBottom: "1px solid rgba(0,0,0,0.25)"
                  }}
                >
                  CALIFICACIÓN GENERAL POR RESPONSABILIDADES HSEQ
                </th>
              </tr>
              {/* Encabezado de columnas con color sólido y bordes sutiles */}
              <tr>
                <th style={{ 
                  width: "60%", 
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
                  borderRight: "1px solid rgba(51,51,51,0.5)"
                }}>RESPONSABILIDAD</th>
                <th style={{ 
                  width: "15%", 
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
                  borderRight: "1px solid rgba(51,51,51,0.5)"
                }}>TRABAJADOR</th>
                <th style={{ 
                  width: "15%", 
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
                  borderRight: "1px solid rgba(51,51,51,0.5)"
                }}>HSEQ</th>
                <th style={{ 
                  width: "10%", 
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
                  borderRight: "1px solid rgba(51,51,51,0.5)"
                }}>JUSTIFICACIÓN</th>
              </tr>
            </thead>
            <tbody>
              {hseqItems.map(item => (
                <tr key={item.id}>
                  <td style={{ backgroundColor: "#fff", padding: "0.5rem" }}>{item.responsabilidad}</td>
                  <td className="text-center" style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                    <select
                      className="rating-select"
                      value={item.autoevaluacion}
                      onChange={(e) => handleHseqChange(item.id, "autoevaluacion", e.target.value)}
                      style={getHseqErrorStyle(item.id, 'autoevaluacion')}
                    >
                      <option value="">1 - 5</option>
                      <option value="1">1 - No Cumple</option>
                      <option value="2">2 - Regular</option>
                      <option value="3">3 - Parcial</option>
                      <option value="4">4 - Satisfactorio</option>
                      <option value="5">5 - Excelente</option>
                    </select>
                  </td>
                  <td className="text-center" style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                    <select
                      className="rating-select"
                      value={item.evaluacionJefe}
                      onChange={(e) => handleHseqChange(item.id, "evaluacionJefe", e.target.value)}
                      style={getHseqErrorStyle(item.id, 'evaluacionJefe')}
                    >
                      <option value="">1 - 5</option>
                      <option value="1">1 - No Cumple</option>
                      <option value="2">2 - Regular</option>
                      <option value="3">3 - Parcial</option>
                      <option value="4">4 - Satisfactorio</option>
                      <option value="5">5 - Excelente</option>
                    </select>
                  </td>
                  <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                    <textarea
                      className="hseq-textarea"
                      rows={1}
                      placeholder="Justificación"
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td className="hseq-promedio" style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                  PROMEDIO CALIFICACIÓN HSEQ:
                </td>
                <td colSpan="2" className="hseq-promedio-valor" style={{ backgroundColor: "#f5f5f5" }}>
                  {calcularPromedioHseq()}
                </td>
                <td className="hseq-promedio-valor" style={{ backgroundColor: "#f5f5f5" }}></td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr className="evaluation-hr"/>
        <section className="evaluation-section">
          <h2 className="seccion-titulo">MEJORAMIENTO Y DESARROLLO</h2>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="fortalezas" className="campo-label">Fortalezas</label>
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
          <div>
            <label htmlFor="aspectosMejorar" className="campo-label">Aspectos a mejorar</label>
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

        <section className="evaluation-section" style={{ textAlign: "center" }}>
          <div className="signatures-container">
            <div className="signatures-row">
              <div style={{ position: 'relative' }}>
                <SignatureUploader 
                  label="Firma (Evaluado)" 
                  onChange={setEmployeeSignature}
                  value={employeeSignature}
                />
                {visibleErrors.employeeSignature && (
                  <span className="error-message" style={{ position: 'absolute', bottom: '-20px', left: '0', right: '0', textAlign: 'center' }}>
                    La firma es obligatoria
                  </span>
                )}
              </div>
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
        hseqAvg={realAverages.promedioHseq}
        generalAvg={realAverages.promedioGeneral}
        autoCloseMs={0}
        closeOnBackdrop={false}
        onClose={() => setShowCompletion(false)}
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

export default PerformanceEvaluation;
