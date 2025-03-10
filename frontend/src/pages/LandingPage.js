import React, { useState, useEffect } from 'react'; // Se agregó useEffect
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LandingPage({ onLogout }) {
  const [showModal, setShowModal] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    setAccepted(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAccept = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log(
      "%c🚀 Developed by José Mateo López Cifuentes",
      "font-size: 14px; color: #2ecc71; font-weight: bold;"
    );
    console.log(
      "%c📧 Email: josemateolopezcifuentes@gmail.com",
      "font-size: 12px; color: #3498db;"
    );
    console.log(
      "%c🔗 LinkedIn: José Mateo López Cifuentes (Visit: https://shorturl.at/Sx0PY)",
      "font-size: 12px; color: #e74c3c;"
    );

    if (!localStorage.getItem("authorMessageShown")) {
      localStorage.setItem("authorMessageShown", "true");
    }
  }, []);

  return (
    <div className="landing-page">
      <Header onLogout={onLogout} />

      <section className="hero">
        <h1>Evaluación de Desempeño</h1>
        <p>Descubre tu potencial con nuestra evaluación de desempeño.</p>
        <button onClick={handleOpenModal}>Comenzar Evaluación</button>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>INSTRUCCIONES DE MANEJO DE LA EVALUACIÓN DE DESEMPEÑO</h2>

            <h3>AUTOEVALUACIÓN (Trabajador):</h3>
            <ol>
              <li>
                Una vez abra el archivo desde el menú de INICIO ingresar su nombre en la parte de arriba,
                en donde el botón Generar, guárdelo con su nombre completo y la fecha de hoy.
                Después, presionar el botón GENERAR.
              </li>
              <li>
                Este archivo se rellena y queda resguardado en el servidor y no es posible volver a abrirlo.
                INICIAR EVALUACIÓN y cuando se guarde y finalice la edición, quedará en la hoja respectiva.
              </li>
              <li>
                Todo lo que quede registrado en el PDF y en la primera hoja con el botón INICIAR EVALUACIÓN
                quedará registrado en la hoja correspondiente.
              </li>
              <li>
                Se deben registrar los aspectos a evaluar y el primer y segundo Observador.
                Recuerde que esta información se envía por PDF a su Jefe Inmediato.
              </li>
              <li>
                La evaluación final al finalizar da el link a Jefe Inmediato con la Evaluación en Excel
                para su revisión y firma de conformidad.
              </li>
            </ol>

            <h3>JEFE INMEDIATO</h3>
            <ol>
              <li>
                Recibe en su correo o en la hoja de Jefe Inmediato un link para la evaluación.
                (INICIAR EVALUACIÓN).
              </li>
              <li>
                Revisa y aprueba y/o deniega los Aspectos a Mejorar.
              </li>
              <li>
                Registra su firma y la envía al evaluado.
              </li>
              <li>
                Recibe la confirmación final. Y el PDF final se envía al departamento de OUTLOOK
                para archivar el informe.
              </li>
            </ol>

            <p style={{ marginTop: '1rem' }}>
              <strong>Meridan Consulting Ltda.</strong>, en cumplimiento y mantenimiento de sus certificaciones
              y procesos de mejora continua, estará resguardando electrónicamente esta evaluación de desempeño.
              Al proceder con la misma, se da por entendido y aceptado el tratamiento de datos, la validez de
              la firma electrónica y el resguardo del archivo final para fines de control y gestión interna.
            </p>

            <div className="acceptance-container">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <span>Acepto que he leído las instrucciones de manejo del presente archivo</span>
              </label>
            </div>

            <div className="modal-buttons">
              <button onClick={handleCloseModal}>Cerrar</button>
              <button onClick={handleAccept} disabled={!accepted}>
                Acepto
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default LandingPage;
