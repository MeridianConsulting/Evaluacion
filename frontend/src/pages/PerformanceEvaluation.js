import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Styles1.css"; // Tu hoja de estilos principal
import logoMeridian from "../assets/img/logo_meridian_blanco.png";

const PerformanceEvaluation = () => {
  // Solo diseño; no se implementa lógica funcional
  return (
    <div className="evaluation-page">
      {/* Encabezado */}
      <header className="navbar">
        <div className="navbar-logo">
          <img src={logoMeridian} alt="Meridian Logo" />
        </div>
        <div className="navbar-title">
          <h1>EVALUACIÓN DE DESEMPEÑO</h1>
        </div>
      </header>

      {/* Información general de la evaluación */}
      <section className="hero">
        <h2>Información General</h2>
        <div className="info-section">
          <p>
            <strong>Fecha:</strong> 13/10/2020
          </p>
          <p>
            <strong>Versión:</strong> 07
          </p>
          <p>
            <strong>Código:</strong> GH-F-15
          </p>
        </div>
        <p className="instruction">
          Para realizar la evaluación debe oprimir el botón <strong>Iniciar Evaluación</strong>. Una vez finalizado el proceso, presione el botón <strong>Finalizar</strong>.
        </p>
      </section>

      {/* Datos del Evaluado y Evaluador */}
      <section className="data-section">
        <table className="data-table excel-table">
          <tbody>
            <tr>
              <th>Nombre del Evaluado</th>
              <td>CESAR EDUARDO GARNICA GOMEZ</td>
              <th>No. de Identificación</th>
              <td>1101693549</td>
              <th>Cargo / Servicio</th>
              <td>cesar.garnica94@gmail.com</td>
            </tr>
            <tr>
              <th>Fecha de Ingreso</th>
              <td>11/07/2024</td>
              <th>Fecha de Evaluación</th>
              <td>21/03/2025</td>
              <th>Proceso de Gestión</th>
              <td>Gestión de Proyectos</td>
            </tr>
            <tr>
              <th>Nombre del Evaluador</th>
              <td colSpan="2"></td>
              <th>Cargo/Servicio Prestado</th>
              <td colSpan="2"></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Objetivo del Cargo */}
      <section className="evaluation-section">
        <h2>OBJETIVO DEL CARGO A EVALUAR</h2>
        <p>
          SERVICIO PARA MONITOREO DE YACIMIENTOS, CONSTRUCCIÓN DE ESCENARIOS DE SUBSUELO 
          Y SOPORTE A LOS PLANES INTEGRADOS DE DESARROLLO, MADURACIÓN DE OPORTUNIDADES 
          DE DESARROLLO EN EL CORTO Y LARGO PLAZO, A LOS PROYECTOS EN MADURACIÓN Y EJECUCIÓN 
          QUE SOPORTA LA GERENCIA DE DESARROLLO ORINOQUIA EN LOS CAMPOS DE LA VRO – DURANTE 
          EL 2do SEMESTRE DE 2024
        </p>
      </section>

      {/* Instrucciones */}
      <section className="evaluation-section">
        <h2>INSTRUCCIONES</h2>
        <ol>
          <li>Lea detenidamente la definición de los aspectos a evaluar.</li>
          <li>Señale el desempeño evaluado en la casilla correspondiente (1 a 5): 1 = No Cumple, 2 = Cumple Regularmente, 3 = Cumple Parcialmente, 4 = Cumple Satisfactoriamente, 5 = Cumple de Manera Excelente.</li>
          <li>Justifique calificaciones de 5 o menores o iguales a 2 y genere un plan de acción.</li>
        </ol>
      </section>

      {/* Competencias */}
      <section className="evaluation-section">
        <h2>COMPETENCIAS</h2>
        <table className="competencias-table excel-table">
          <thead>
            <tr>
              <th>COMPETENCIA</th>
              <th>DEFINICIÓN</th>
              <th>ASPECTO A EVALUAR</th>
              <th>TRABAJADOR<br />(Autoevaluación)</th>
              <th>JEFE INMEDIATO<br />(Evaluación)</th>
              <th>PROMEDIO</th>
              <th>JUSTIFICACIÓN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Comunicación efectiva</td>
              <td>Establecer comunicación efectiva y positiva con superiores, pares y clientes.</td>
              <td>Utiliza canales de comunicación con claridad y precisión.</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="7">... más detalles ...</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Funciones del Cargo */}
      <section className="evaluation-section">
        <h2>FUNCIONES CARGO O SERVICIO PRESTADO</h2>
        <table className="funciones-table excel-table">
          <thead>
            <tr>
              <th>DESCRIPCIÓN DE ACTIVIDADES</th>
              <th>TRABAJADOR<br />(Autoevaluación)</th>
              <th>JEFE INMEDIATO<br />(Evaluación)</th>
              <th>PROMEDIO</th>
              <th>JUSTIFICACIÓN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Generar Modelo analítico del yacimiento...</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Responsabilidades HSEQ */}
      <section className="evaluation-section">
        <h2>RESPONSABILIDADES HSEQ</h2>
        <table className="hseq-table excel-table">
          <thead>
            <tr>
              <th>DESCRIPCIÓN DE ACTIVIDADES</th>
              <th>TRABAJADOR<br />(Autoevaluación)</th>
              <th>HSEQ<br />(Evaluación)</th>
              <th>PROMEDIO</th>
              <th>JUSTIFICACIÓN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Procurar el cuidado integral de su salud.</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Consolidado de Evaluación */}
      <section className="evaluation-section">
        <h2>CONSOLIDADO CALIFICACIÓN EVALUACIÓN DE DESEMPEÑO</h2>
        <table className="consolidado-table excel-table">
          <thead>
            <tr>
              <th>CALIFICACIONES</th>
              <th>TOTAL</th>
              <th>APROBÓ EVALUACIÓN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>COMPETENCIAS</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>FUNCIONES CARGO O SERVICIO PRESTADO</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>RESPONSABILIDADES HSEQ</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>RESULTADO DEFINITIVO EVALUACIÓN</td>
              <td colSpan="2"></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Mejoramiento y Desarrollo */}
      <section className="evaluation-section">
        <h2>MEJORAMIENTO Y DESARROLLO</h2>
        <div className="mejoramiento-container">
          <div className="fortalezas">
            <h3>FORTALEZAS</h3>
            <p>Para registrar la información, seleccione la opción de ingresar.</p>
          </div>
          <div className="aspectos-mejorar">
            <h3>ASPECTOS A MEJORAR</h3>
            <p>Para registrar la información, seleccione la opción de ingresar.</p>
          </div>
        </div>
      </section>

      {/* Plan de Acción */}
      <section className="evaluation-section">
        <h2>PLAN DE ACCIÓN</h2>
        <table className="plan-accion-table excel-table">
          <thead>
            <tr>
              <th>ACTIVIDADES</th>
              <th>FECHA</th>
              <th>RESPONSABLE</th>
              <th>SEGUIMIENTO</th>
              <th>FECHA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5">...</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Firmas */}
      <section className="evaluation-section firmas-section">
        <div className="firmas-container">
          <div className="firma-evaluador">
            <strong>FIRMA EVALUADOR (JEFE DIRECTO / HSEQ)</strong>
            <p>__________________________</p>
          </div>
          <div className="firma-trabajador">
            <strong>FIRMA TRABAJADOR</strong>
            <p>__________________________</p>
          </div>
        </div>
      </section>

      {/* Elaboró / Revisó / Aprobó */}
      <section className="evaluation-section responsables-section">
        <table className="responsables-table excel-table">
          <thead>
            <tr>
              <th>NOMBRE / CARGO</th>
              <th>ELABORÓ</th>
              <th>REVISO</th>
              <th>APROBÓ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                Cindy Alejandra Pinilla López<br />Asistente de Gestión Humana
              </td>
              <td>
                Danyerly Mosquera Tafur<br />Coordinadora HSEQ
              </td>
              <td>
                Nora Moreno Moreno<br />Gerente Administrativa y Financiera
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <footer className="evaluation-footer">
        <div className="footer-top">
          <div className="footer-branding">
            <img className="footer-logo" src={logoMeridian} alt="Meridian Logo" />
            <p>© 2025 Meridian Consulting Ltda.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PerformanceEvaluation;
