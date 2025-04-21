import React, { useState, useEffect } from "react";
import "../assets/css/Styles1.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PerformanceEvaluation() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
  };

  // Manejador para cambios en la calificación HSEQ
  const handleHseqChange = (id, field, value) => {
    setHseqItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
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

  return (
    <div className="evaluation-page-unique">
      <Header/>
      <div className="hero" style={{ 
        textAlign: "center", 
        padding: "clamp(1rem, 5vw, 2rem)" 
      }}>
        <h1 className="evaluacion-desempeno">EVALUACIÓN DE DESEMPEÑO</h1>
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
                <input type="date" />
              </div>
              <div className="evaluation-field">
                <label>Fecha de la evaluación:</label>
                <input type="date" />
              </div>
              <div className="evaluation-field">
                <label>Proceso de gestión:</label>
                <input type="text" placeholder="Proceso asociado" />
              </div>
            </div>

            {/* Fila 3 */}
            <div className="evaluation-row">
              <div className="evaluation-field">
                <label>Nombre del evaluador:</label>
                <input type="text" placeholder="Ingrese el nombre del evaluador" />
              </div>
              <div className="evaluation-field">
                <label>Cargo/servicio prestado:</label>
                <input type="text" placeholder="Cargo o servicio prestado" />
              </div>
              <div className="evaluation-field">
                <label>Proceso de gestión:</label>
                <input type="text" placeholder="Proceso asociado" />
              </div>
            </div>
        </section>

        <hr style={{ margin: "2rem 0" }}/>
        <section className="evaluation-section">
          <h2 style={{ marginBottom: "1rem" }}>OBJETIVO DEL CARGO A EVALUAR</h2>
          <p>
            Describe las funciones principales y la razón de ser del cargo. 
            Incluye responsabilidades generales, alcance y actividades clave.
          </p>
        </section>
        <hr style={{ margin: "2rem 0" }}/>
        <section className="evaluation-section instrucciones">
          <h2 style={{ marginBottom: "1rem", textAlign: "center", fontWeight: "bold" }}>INSTRUCCIONES</h2>
          <ol style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
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

        <hr style={{ margin: "2rem 0" }}/>
        <section className="evaluation-section">
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif" }}
          >
            <thead>
              <tr>
                <th
                  colSpan={7}
                  style={{
                    backgroundColor: "#000",
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
                <th>COMPETENCIA</th>
                <th>DEFINICIÓN DE LA COMPETENCIA</th>
                <th>ASPECTO A EVALUAR</th>
                <th>TRABAJADOR</th>
                <th>JEFE INMEDIATO</th>
                <th>JUSTIFICACIÓN</th>
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
          </table>
        </section>

        {/* Después de la sección de competencias, antes de la sección de mejoramiento */}
        <hr style={{ margin: "2rem 0" }}/>
        <section className="evaluation-section">
          <table className="hseq-table">
            <thead>
              <tr>
                <th colSpan={4} className="hseq-header" style={{ backgroundColor: "#000", color: "#fff", textAlign: "center" }}>
                  CALIFICACIÓN GENERAL POR RESPONSABILIDADES HSEQ
                </th>
              </tr>
              <tr>
                <th className="hseq-subheader" style={{ width: "60%", backgroundColor: "#f0f0f0", textAlign: "center" }}>RESPONSABILIDAD</th>
                <th className="hseq-subheader" style={{ width: "15%", backgroundColor: "#f0f0f0" }}>TRABAJADOR</th>
                <th className="hseq-subheader" style={{ width: "15%", backgroundColor: "#f0f0f0" }}>JEFE INMEDIATO</th>
                <th className="hseq-subheader" style={{ width: "10%", backgroundColor: "#f0f0f0" }}>JUSTIFICACIÓN</th>
              </tr>
            </thead>
            <tbody>
              {hseqItems.map(item => (
                <tr key={item.id}>
                  <td>{item.responsabilidad}</td>
                  <td className="text-center">
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
                  <td className="text-center">
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
                  <td>
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

        <hr style={{ margin: "2rem 0" }}/>
        <section className="evaluation-section">
          <h2 className="seccion-titulo">MEJORAMIENTO Y DESARROLLO</h2>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="fortalezas" className="campo-label">Fortalezas</label>
            <textarea 
              id="fortalezas" 
              rows="3" 
              className="campo-textarea"
            />
          </div>
          <div>
            <label htmlFor="aspectosMejorar" className="campo-label">Aspectos a mejorar</label>
            <textarea 
              id="aspectosMejorar" 
              rows="3" 
              className="campo-textarea"
            />
          </div>
        </section>
        <hr style={{ margin: "2rem 0" }}/>
        <section className="evaluation-section">
          <h2 className="seccion-titulo">PLAN DE ACCIÓN</h2>
          <table className="plan-accion-table">
            <thead>
              <tr>
                <th className="plan-accion-th" style={{ backgroundColor: "#f0f0f0" }}>Actividades</th>
                <th className="plan-accion-th" style={{ backgroundColor: "#f0f0f0" }}>Responsable</th>
                <th className="plan-accion-th" style={{ backgroundColor: "#f0f0f0" }}>Seguimiento</th>
                <th className="plan-accion-th" style={{ backgroundColor: "#f0f0f0" }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="plan-accion-td">
                  <input 
                    type="text" 
                    placeholder="Actividad" 
                    className="plan-accion-input"
                  />
                </td>
                <td className="plan-accion-td">
                  <input 
                    type="text" 
                    placeholder="Responsable" 
                    className="plan-accion-input"
                  />
                </td>
                <td className="plan-accion-td">
                  <input 
                    type="text" 
                    placeholder="Indicadores / Frecuencia" 
                    className="plan-accion-input"
                  />
                </td>
                <td className="plan-accion-td">
                  <input 
                    type="date" 
                    className="plan-accion-input"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr style={{ margin: "2rem 0" }}/>

        <section className="evaluation-section" style={{ textAlign: "center" }}>
          <div className="firmas-container">
            <div className="firma-item">
              <label className="campo-label">Firma (Evaluado)</label>
              <div className="firma-box" style={{ border: "1px solid #000" }}></div>
            </div>
            <div className="firma-item">
              <label className="campo-label">Firma (Jefe Directo)</label>
              <div className="firma-box" style={{ border: "1px solid #000" }}></div>
            </div>
            <div className="firma-item">
              <label className="campo-label">Fecha</label>
              <input type="date" className="fecha-input" />
            </div>
          </div>
          <button className="finalizar-btn" style={{ 
            backgroundColor: "#000", 
            color: "#fff", 
            borderColor: "#000",
            transition: "background-color 0.3s, color 0.3s"
          }}>
            Finalizar Evaluación
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PerformanceEvaluation;
