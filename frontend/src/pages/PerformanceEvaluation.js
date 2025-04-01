import React from "react";
import "../assets/css/Styles1.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PerformanceEvaluation = () => {

  const onLogout = () => {
  };

  return (
    <div className="evaluation-page-unique">
      <Header onLogout={onLogout} />
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
          <h2 style={{ marginBottom: "1rem" }}>COMPETENCIAS</h2>
          <div className="evaluation-table-wrapper" style={{ overflowX: "auto" }}>
            <table className="evaluation-table">
              <thead>
                <tr>
                  <th style={{ minWidth: "180px" }}>Competencia</th>
                  <th style={{ minWidth: "300px" }}>Definición / Comportamientos</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Orientación al cliente</td>
                  <td>
                    Demuestra interés y compromiso por satisfacer necesidades 
                    del cliente interno y externo.
                  </td>
                  {[1,2,3,4,5].map(num => (
                    <td key={`orientacion-${num}`}>
                      <input type="radio" name="orientacion" value={num} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Colaboración</td>
                  <td>
                    Trabaja de forma cooperativa con compañeros, promueve la 
                    cohesión y el trabajo en equipo.
                  </td>
                  {[1,2,3,4,5].map(num => (
                    <td key={`colaboracion-${num}`}>
                      <input type="radio" name="colaboracion" value={num} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Planificación</td>
                  <td>
                    Organiza y prioriza el trabajo de manera efectiva, 
                    respetando tiempos y recursos.
                  </td>
                  {[1,2,3,4,5].map(num => (
                    <td key={`planificacion-${num}`}>
                      <input type="radio" name="planificacion" value={num} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
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
