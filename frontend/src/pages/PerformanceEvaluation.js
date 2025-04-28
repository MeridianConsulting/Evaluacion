import React, { useState, useEffect } from "react";
import "../assets/css/Styles1.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignatureUploader from '../components/SignatureUploader';

function PerformanceEvaluation() {
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
  const [datosGenerales, setDatosGenerales] = useState({
    fechaIngreso: '',
    fechaEvaluacion: '',
    procesoGestion: '',
    nombreEvaluador: '',
    cargoEvaluador: '',
    procesoGestionEvaluador: '',
  });
  const [mejoramiento, setMejoramiento] = useState({
    fortalezas: '',
    aspectosMejorar: ''
  });
  const [planAccion, setPlanAccion] = useState({
    actividad: '',
    responsable: '',
    seguimiento: '',
    fecha: ''
  });

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

  // Agregar después de la declaración de otros estados (rows, hseqItems, etc.)
  const [funcionesCargo, setFuncionesCargo] = useState([]);

  // Agregar este useEffect justo después del useEffect principal existente
  useEffect(() => {
    if (employee && employee.cargo) {
      // Obtener funciones específicas del cargo
      obtenerFuncionesCargo(employee.cargo);
    }
  }, [employee]);

  // Agregar esta función para obtener las funciones del cargo
  const obtenerFuncionesCargo = async () => {
    const employeeId = localStorage.getItem('employeeId');
    if (!employeeId) {
      console.error("No se encontró ID del empleado");
      // Usamos fallback local si no hay ID
      const funcionesGenericas = generarFuncionesPorCargo(employee?.cargo || '');
      setFuncionesCargo(funcionesGenericas);
      return;
    }
    
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      // Aseguramos que la ruta coincida exactamente con lo definido en el backend
      const response = await fetch(`${apiUrl}/empleado-funciones/${employeeId}`);
      
      const data = await response.json();
      
      if (response.ok && data.success && data.funciones && data.funciones.length > 0) {
        // Convertimos las funciones del backend al formato que espera nuestro componente
        const funcionesFormateadas = data.funciones.map((funcion) => ({
          id: funcion.id,
          descripcion: funcion.descripcion || "Sin descripción",
          autoevaluacion: "",
          evaluacionJefe: "",
          justificacion: ""
        }));
        
        setFuncionesCargo(funcionesFormateadas);
      } else {
        // Si no obtuvimos funciones específicas, usamos la función local como fallback
        const funciones = generarFuncionesPorCargo(employee?.cargo || '');
        setFuncionesCargo(funciones);
      }
    } catch (error) {
      console.error("Error al obtener funciones del cargo");
      const funciones = generarFuncionesPorCargo(employee?.cargo || '');
      setFuncionesCargo(funciones);
    }
  };

  // Función para generar funciones específicas según el cargo
  const generarFuncionesPorCargo = (cargo) => {
    // Mapeo de cargos específicos a sus funciones
    const funcionesPorCargo = {
      'Gerente General': [
        "Planificar y establecer los objetivos estratégicos de la compañía",
        "Representar a la empresa ante autoridades y entidades externas",
        "Supervisar el desempeño de los diferentes departamentos",
        "Tomar decisiones de alto nivel que afectan la dirección de la empresa",
        "Gestionar recursos financieros y presupuestos generales"
      ],
      'Coordinador HSEQ': [
        "Diseñar e implementar el Sistema de Gestión HSEQ",
        "Realizar auditorías internas de cumplimiento normativo",
        "Elaborar y actualizar planes de emergencia y contingencia",
        "Capacitar al personal en temas de salud y seguridad",
        "Investigar incidentes y accidentes laborales"
      ],
      'Asistente Contable': [
        "Registrar transacciones contables en el sistema",
        "Preparar informes financieros periódicos",
        "Gestionar cuentas por pagar y cuentas por cobrar",
        "Conciliar cuentas bancarias y otros registros financieros",
        "Apoyar en la preparación de declaraciones tributarias"
      ],
      'Profesional de Proyectos': [
        "Coordinar la planificación y ejecución de proyectos asignados",
        "Realizar seguimiento al cumplimiento de cronogramas y presupuestos",
        "Elaborar informes de avance y resultados de proyectos",
        "Gestionar recursos asignados a los proyectos",
        "Identificar y mitigar riesgos en la ejecución de proyectos"
      ]
    };
    
    // Verificamos si tenemos funciones específicas para el cargo
    let funcionesEspecificas = funcionesPorCargo[cargo];
    
    // Si no tenemos funciones específicas, usamos funciones genéricas
    if (!funcionesEspecificas) {
      // Verificamos si el cargo pertenece a alguna categoría general
      if (cargo.includes('Gerente') || cargo.includes('Director')) {
        funcionesEspecificas = funcionesPorCargo['Gerente General'];
      } else if (cargo.includes('HSEQ') || cargo.includes('HSE')) {
        funcionesEspecificas = funcionesPorCargo['Coordinador HSEQ'];
      } else if (cargo.includes('Contable') || cargo.includes('Financier')) {
        funcionesEspecificas = funcionesPorCargo['Asistente Contable'];
      } else if (cargo.includes('Proyecto') || cargo.includes('Project')) {
        funcionesEspecificas = funcionesPorCargo['Profesional de Proyectos'];
      } else {
        // Si no coincide con ninguna categoría, usamos funciones genéricas
        funcionesEspecificas = [
          "Planificación y organización de actividades relacionadas con el cargo",
          "Gestión de información y documentación del área",
          "Resolución de problemas específicos de su área de competencia",
          "Cumplimiento de objetivos y metas establecidas para el cargo",
          "Contribución al mejoramiento continuo de los procesos del área"
        ];
      }
    }
    
    // Convertimos las descripciones en objetos completos para la evaluación
    return funcionesEspecificas.map((desc, index) => ({
      id: index + 1,
      descripcion: desc,
      autoevaluacion: "",
      evaluacionJefe: "",
      justificacion: ""
    }));
  };

  // Manejador para cambios en la calificación de funciones
  const handleFuncionChange = (index, field, value) => {
    setFuncionesCargo(prevFunciones => 
      prevFunciones.map((funcion, i) => 
        i === index ? { ...funcion, [field]: value } : funcion
      )
    );
    setFormTouched(true);
  };

  // Calcular promedio de calificaciones de funciones específicas
  const calcularPromedioFunciones = () => {
    let sumaTotal = 0;
    let contadorValidos = 0;
    
    funcionesCargo.forEach(funcion => {
      const auto = Number(funcion.autoevaluacion) || 0;
      const jefe = Number(funcion.evaluacionJefe) || 0;
      
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
    
    if (contadorValidos === 0) return "0.00";
    return (sumaTotal / contadorValidos).toFixed(2);
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
          setError(data.error || 'Error al obtener los datos del empleado.');
        } else {
          setEmployee(data);
          
          // Si el rol del empleado ha cambiado en la base de datos, actualizamos el localStorage
          if (data.rol && data.rol !== localStorage.getItem('userRole')) {
            localStorage.setItem('userRole', data.rol);
            // Si tu aplicación maneja el rol como un estado global, actualízalo aquí
          }
        }
      } catch (err) {
        setError('Error en la conexión con el servidor.');
      }
      setLoading(false);
    };

    fetchEmployee();
  }, []);

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

    // Validar funciones específicas
    funcionesCargo.forEach((funcion, index) => {
      if (!funcion.autoevaluacion || funcion.autoevaluacion === '') {
        errores[`funcion_auto_${index}`] = true;
        isValid = false;
      }
      if (!funcion.evaluacionJefe || funcion.evaluacionJefe === '') {
        errores[`funcion_jefe_${index}`] = true;
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

    // Validar plan de acción
    Object.keys(planAccion).forEach(key => {
      if (!planAccion[key]) {
        errores[`planAccion_${key}`] = true;
        isValid = false;
      }
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
  const handlePlanAccionChange = (e) => {
    const { name, value } = e.target;
    setPlanAccion(prev => ({
      ...prev,
      [name]: value
    }));
    setFormTouched(true);
  };

  // Modificar el manejador de envío del formulario
  const handleSubmitEvaluation = async () => {
    // Validar el formulario antes de enviar
    if (!validarFormulario()) {
      window.scrollTo(0, 0); // Desplazarse al inicio para ver la alerta
      alert('Error: Todos los campos son obligatorios. Por favor, complete todos los campos antes de enviar la evaluación.');
      // Los errores se mostrarán automáticamente y desaparecerán en 6 segundos
      return;
    }

    // Crear un objeto FormData para enviar la evaluación completa incluyendo las imágenes
    const formData = new FormData();
    
    // Agregar datos de la evaluación
    formData.append('employeeId', employee.id_empleado);
    formData.append('competenciasData', JSON.stringify(rows));
    formData.append('funcionesData', JSON.stringify(funcionesCargo));
    formData.append('hseqData', JSON.stringify(hseqItems));
    
    // Agregar las firmas si existen
    if (employeeSignature) {
      formData.append('employeeSignature', employeeSignature);
    }
    
    if (bossSignature) {
      formData.append('bossSignature', bossSignature);
    }
    
    try {
      setIsSubmitting(true);
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/evaluations/save`, {
        method: 'POST',
        body: formData, // No establecer Content-Type, FormData lo hace automáticamente
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Evaluación guardada exitosamente');
        // Redirigir o mostrar mensaje de éxito
      } else {
        alert(`Error al guardar: ${data.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error al enviar la evaluación:', error);
      alert('Error al guardar la evaluación. Intente nuevamente.');
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
      <Header />
      <div className="hero" style={{ 
        textAlign: "center", 
        padding: "clamp(1rem, 5vw, 2rem)" 
      }}>
        <h1 className="evaluacion-desempeno">EVALUACIÓN DE DESEMPEÑO</h1>
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
        padding: "clamp(1rem, 5vw, 2rem)" 
      }}>
        <section className="evaluation-section">
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
                <label>Proceso de gestión:</label>
                <input 
                  type="text" 
                  placeholder="Proceso asociado" 
                  name="procesoGestion"
                  value={datosGenerales.procesoGestion}
                  onChange={handleDatosGeneralesChange}
                  style={getErrorStyle('datosGenerales_procesoGestion')}
                />
                {visibleErrors.datosGenerales_procesoGestion && (
                  <span className="error-message">Este campo es obligatorio</span>
                )}
              </div>
            </div>

            {/* Fila 3 */}
            <div className="evaluation-row">
              <div className="evaluation-field">
                <label>Nombre del evaluador:</label>
                <input 
                  type="text" 
                  placeholder="Ingrese el nombre del evaluador" 
                  name="nombreEvaluador"
                  value={datosGenerales.nombreEvaluador}
                  onChange={handleDatosGeneralesChange}
                  style={getErrorStyle('datosGenerales_nombreEvaluador')}
                />
                {visibleErrors.datosGenerales_nombreEvaluador && (
                  <span className="error-message">Este campo es obligatorio</span>
                )}
              </div>
              <div className="evaluation-field">
                <label>Cargo/servicio prestado:</label>
                <input 
                  type="text" 
                  placeholder="Cargo o servicio prestado" 
                  name="cargoEvaluador"
                  value={datosGenerales.cargoEvaluador}
                  onChange={handleDatosGeneralesChange}
                  style={getErrorStyle('datosGenerales_cargoEvaluador')}
                />
                {visibleErrors.datosGenerales_cargoEvaluador && (
                  <span className="error-message">Este campo es obligatorio</span>
                )}
              </div>
              <div className="evaluation-field">
                <label>Proceso de gestión:</label>
                <input 
                  type="text" 
                  placeholder="Proceso asociado" 
                  name="procesoGestionEvaluador"
                  value={datosGenerales.procesoGestionEvaluador}
                  onChange={handleDatosGeneralesChange}
                  style={getErrorStyle('datosGenerales_procesoGestionEvaluador')}
                />
                {visibleErrors.datosGenerales_procesoGestionEvaluador && (
                  <span className="error-message">Este campo es obligatorio</span>
                )}
              </div>
            </div>
        </section>

        <hr className="evaluation-hr"/>
        <section className="evaluation-section">
          <h2 className="evaluation-h2">OBJETIVO DEL CARGO A EVALUAR</h2>
          <p>
            Describe las funciones principales y la razón de ser del cargo. 
            Incluye responsabilidades generales, alcance y actividades clave.
          </p>
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
              <tr>
                <th
                  colSpan={7}
                  style={{
                    background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))",
                    color: "#fff",
                    padding: "1rem",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  COMPETENCIAS
                </th>
              </tr>
              <tr style={{ backgroundColor: "#f0f0f0", textAlign: "left" }}>
                <th style={{ background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>COMPETENCIA</th>
                <th style={{ background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>DEFINICIÓN DE LA COMPETENCIA</th>
                <th style={{ background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>ASPECTO A EVALUAR</th>
                <th style={{ background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>TRABAJADOR</th>
                <th style={{ background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>JEFE INMEDIATO</th>
                <th style={{ background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>JUSTIFICACIÓN</th>
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
            </tbody>
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
              <tr>
              <td colSpan={3} style={{ fontWeight: "bold", backgroundColor: "#f5f5f5", padding: "0.8rem", textAlign: "right" }}>
                PROMEDIO CALIFICACIÓN COMPETENCIAS:
              </td>
              <td colSpan={2} style={{ backgroundColor: "#f5f5f5", padding: "0.8rem", textAlign: "center", fontWeight: "bold" }}>
                {calcularPromedioCompetencias()}
              </td>
              <td style={{ backgroundColor: "#f5f5f5" }}></td>
            </tr>
          </table>
        </section>
        {/* Nueva tabla para FUNCIONES CARGO O SERVICIO PRESTADO */}
        <hr className="evaluation-hr"/>
        <section className="evaluation-section">
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif" }}
          >
            <thead>
              <tr>
                <th
                  colSpan={4}
                  style={{
                    background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))",
                    color: "#fff",
                    padding: "1rem",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  FUNCIONES CARGO O SERVICIO PRESTADO
                </th>
              </tr>
              <tr style={{ backgroundColor: "#f0f0f0", textAlign: "left" }}>
                <th style={{ width: "60%", background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>FUNCIÓN ESPECÍFICA</th>
                <th style={{ width: "15%", background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>TRABAJADOR</th>
                <th style={{ width: "15%", background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>JEFE INMEDIATO</th>
                <th style={{ width: "10%", background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>JUSTIFICACIÓN</th>
              </tr>
            </thead>
            <tbody>
              {/* Usamos mapeo dinámico de funciones específicas del cargo */}
              {funcionesCargo.map((funcion, index) => (
                <tr key={index}>
                  <td style={{ backgroundColor: "#fff", padding: "0.5rem" }}>{funcion.descripcion}</td>
                  <td className="text-center" style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                    <select
                      className="rating-select"
                      value={funcion.autoevaluacion || ""}
                      onChange={(e) => handleFuncionChange(index, "autoevaluacion", e.target.value)}
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
                      value={funcion.evaluacionJefe || ""}
                      onChange={(e) => handleFuncionChange(index, "evaluacionJefe", e.target.value)}
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
                      rows={1}
                      placeholder="Justificación"
                      value={funcion.justificacion || ""}
                      onChange={(e) => handleFuncionChange(index, "justificacion", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
              {funcionesCargo.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "1rem" }}>
                    Cargando funciones específicas...
                  </td>
                </tr>
              )}
              <tr>
                <td className="promedio" style={{ fontWeight: "bold", backgroundColor: "#f5f5f5", padding: "0.8rem" }}>
                  PROMEDIO CALIFICACIÓN FUNCIONES:
                </td>
                <td colSpan="2" className="promedio-valor" style={{ backgroundColor: "#f5f5f5", textAlign: "center", fontWeight: "bold", padding: "0.8rem" }}>
                  {calcularPromedioFunciones()}
                </td>
                <td className="promedio-valor" style={{ backgroundColor: "#f5f5f5" }}></td>
              </tr>
            </tbody>
          </table>
        </section>
        {/* Después de la sección de competencias, antes de la sección de mejoramiento */}
        <hr className="evaluation-hr"/>
        <section className="evaluation-section">
          <table className="hseq-table">
            <thead>
              <tr>
                <th colSpan={4} className="hseq-header" style={{ background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff", textAlign: "center" }}>
                  CALIFICACIÓN GENERAL POR RESPONSABILIDADES HSEQ
                </th>
              </tr>
              <tr>
                <th className="hseq-subheader" style={{ width: "60%", background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff", textAlign: "center" }}>RESPONSABILIDAD</th>
                <th className="hseq-subheader" style={{ width: "15%", background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>TRABAJADOR</th>
                <th className="hseq-subheader" style={{ width: "15%", background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>JEFE INMEDIATO</th>
                <th className="hseq-subheader" style={{ width: "10%", background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>JUSTIFICACIÓN</th>
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
              <tr>
                <th className="plan-accion-th" style={{ background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>Actividades</th>
                <th className="plan-accion-th" style={{ background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>Responsable</th>
                <th className="plan-accion-th" style={{ background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>Seguimiento</th>
                <th className="plan-accion-th" style={{ background: "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))", color: "#fff" }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <input 
                    type="text" 
                    placeholder="Actividad" 
                    className="plan-accion-input"
                    name="actividad"
                    value={planAccion.actividad}
                    onChange={handlePlanAccionChange}
                    style={getErrorStyle('planAccion_actividad')}
                  />
                  {visibleErrors.planAccion_actividad && (
                    <span className="error-message">Obligatorio</span>
                  )}
                </td>
                <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <input 
                    type="text" 
                    placeholder="Responsable" 
                    className="plan-accion-input"
                    name="responsable"
                    value={planAccion.responsable}
                    onChange={handlePlanAccionChange}
                    style={getErrorStyle('planAccion_responsable')}
                  />
                  {visibleErrors.planAccion_responsable && (
                    <span className="error-message">Obligatorio</span>
                  )}
                </td>
                <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <input 
                    type="text" 
                    placeholder="Indicadores / Frecuencia" 
                    className="plan-accion-input"
                    name="seguimiento"
                    value={planAccion.seguimiento}
                    onChange={handlePlanAccionChange}
                    style={getErrorStyle('planAccion_seguimiento')}
                  />
                  {visibleErrors.planAccion_seguimiento && (
                    <span className="error-message">Obligatorio</span>
                  )}
                </td>
                <td className="plan-accion-td" style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <input 
                    type="date" 
                    className="plan-accion-input"
                    name="fecha"
                    value={planAccion.fecha}
                    onChange={handlePlanAccionChange}
                    style={getErrorStyle('planAccion_fecha')}
                  />
                  {visibleErrors.planAccion_fecha && (
                    <span className="error-message">Obligatorio</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
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
    </div>
  );
};

export default PerformanceEvaluation;
