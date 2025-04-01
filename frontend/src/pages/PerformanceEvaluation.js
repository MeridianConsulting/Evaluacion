import React, { useState } from "react";
import "../assets/css/Styles1.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PerformanceEvaluation() {
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
  ]);

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

  return (
    <div className="evaluation-page-unique">
      <Header/>
      <div className="hero" style={{ textAlign: "center", padding: "2rem" }}>
        <h1 className="evaluacion-desempeno">EVALUACIÓN DE DESEMPEÑO</h1>
      </div>
      <main className="evaluation-container-unique" style={{ padding: "2rem" }}>
        <section className="evaluation-section">
            <div className="evaluation-row">
              <div className="evaluation-field">
                <label>Nombre del evaluado:</label>
                <input type="text" placeholder="Ingrese el nombre del evaluado" />
              </div>
              <div className="evaluation-field">
                <label>No. de Identificación:</label>
                <input type="text" placeholder="Cédula / ID" />
              </div>
              <div className="evaluation-field">
                <label>Cargo/servicio:</label>
                <input type="text" placeholder="Cargo o servicio" />
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
        <section className="evaluation-section">
          <h2 style={{ marginBottom: "1rem" }}>INSTRUCCIONES</h2>
            <ol>
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
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif" }}>
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
              <tr style={{ backgroundColor: "#E0E0E0", textAlign: "left" }}>
                <th>COMPETENCIA</th>
                <th>DEFINICIÓN DE LA COMPETENCIA</th>
                <th>ASPECTO A EVALUAR</th>
                <th>TRABAJADOR (Autoevaluación)</th>
                <th>JEFE INMEDIATO (Evaluación)</th>
                <th>PROMEDIO</th>
                <th>JUSTIFICACIÓN</th>
              </tr>
            </thead>

            <tbody>
              {/* Primera fila de la tabla, con rowSpan para Competencia y Definición */}
              <tr>
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#DCDCDC",
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
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  {rows[0].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <select
                    style={{ width: "100%" }}
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
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <select
                    style={{ width: "100%" }}
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
                  <input
                    type="text"
                    className="promedio-input"
                    readOnly
                    placeholder=""
                    value={rows[0].average}
                  />
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea rows={2} style={{ width: "100%" }} placeholder="Justifique (si 5 o ≤2)" />
                </td>
              </tr>

              {/* Aspecto 2 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  {rows[1].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <select
                    style={{ width: "100%" }}
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
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <select
                    style={{ width: "100%" }}
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
                  <input
                    type="text"
                    className="promedio-input"
                    readOnly
                    placeholder=""
                    value={rows[1].average}
                  />
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea rows={2} style={{ width: "100%" }} placeholder="Justifique (si 5 o ≤2)" />
                </td>
              </tr>

              {/* Aspecto 3 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  {rows[2].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <select
                    style={{ width: "100%" }}
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
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <select
                    style={{ width: "100%" }}
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
                  <input
                    type="text"
                    className="promedio-input"
                    readOnly
                    placeholder=""
                    value={rows[2].average}
                  />
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea rows={2} style={{ width: "100%" }} placeholder="Justifique (si 5 o ≤2)" />
                </td>
              </tr>

              {/* Aspecto 4 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  {rows[3].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <select
                    style={{ width: "100%" }}
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
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <select
                    style={{ width: "100%" }}
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
                  <input
                    type="text"
                    className="promedio-input"
                    readOnly
                    placeholder=""
                    value={rows[3].average}
                  />
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea rows={2} style={{ width: "100%" }} placeholder="Justifique (si 5 o ≤2)" />
                </td>
              </tr>
            </tbody>
          </table>
        </section>


        <hr style={{ margin: "2rem 0" }}/>

        <section className="evaluation-section">
          <h2>CALIFICACIÓN GENERAL POR COMPETENCIAS</h2>
          <table className="evaluation-table" style={{ marginTop: "1rem" }}>
            <thead>
              <tr>
                <th style={{ minWidth: "250px" }}>Descripción / Actividades</th>
                <th>Sobresaliente</th>
                <th>Aceptable</th>
                <th>Por mejorar</th>
                <th>Insuficiente</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ejemplo de actividad / competencia 1</td>
                <td><input type="radio" name="comp-generales-1" value="sobresaliente" /></td>
                <td><input type="radio" name="comp-generales-1" value="aceptable" /></td>
                <td><input type="radio" name="comp-generales-1" value="por-mejorar" /></td>
                <td><input type="radio" name="comp-generales-1" value="insuficiente" /></td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr style={{ margin: "2rem 0" }}/>
        <section className="evaluation-section">
          <h2>CALIFICACIÓN GENERAL POR RESPONSABILIDADES HSEQ</h2>
          <table className="evaluation-table" style={{ marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>Responsabilidad</th>
                <th>Calificación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cumplimiento de normas de seguridad</td>
                <td>
                  <select name="hseq-1">
                    <option value="">Seleccione</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr style={{ margin: "2rem 0" }}/>
        <section className="evaluation-section">
          <h2>MEJORAMIENTO Y DESARROLLO</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="fortalezas">Fortalezas</label><br />
            <textarea id="fortalezas" rows="3" style={{ width: "100%" }} />
          </div>
          <div>
            <label htmlFor="aspectosMejorar">Aspectos a mejorar</label><br />
            <textarea id="aspectosMejorar" rows="3" style={{ width: "100%" }} />
          </div>
        </section>
        <hr style={{ margin: "2rem 0" }}/>
        <section className="evaluation-section">
          <h2>PLAN DE ACCIÓN</h2>
          <table className="evaluation-table" style={{ marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>Actividades</th>
                <th>Responsable</th>
                <th>Seguimiento</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" placeholder="Actividad" /></td>
                <td><input type="text" placeholder="Responsable" /></td>
                <td><input type="text" placeholder="Indicadores / Frecuencia" /></td>
                <td><input type="date" /></td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr style={{ margin: "2rem 0" }}/>

        <section className="evaluation-section" style={{ textAlign: "center" }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-around", 
            flexWrap: "wrap", 
            gap: "1rem" 
          }}>
            <div>
              <label>Firma (Evaluado)</label>
              <div 
                style={{ 
                  border: "1px solid #ccc", 
                  height: "60px", 
                  width: "200px" 
                }}
              />
            </div>
            <div>
              <label>Firma (Jefe Directo)</label>
              <div 
                style={{ 
                  border: "1px solid #ccc", 
                  height: "60px", 
                  width: "200px" 
                }}
              />
            </div>
            <div>
              <label>Fecha</label>
              <input type="date" />
            </div>
          </div>
          <button 
            className="hero-button" 
            style={{ marginTop: "2rem" }}
          >
            Finalizar Evaluación
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};



export default PerformanceEvaluation;
