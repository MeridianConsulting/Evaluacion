import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Styles1.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LandingPage({ onLogout }) {
  const [showModal, setShowModal] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setShowModal(true);
    setAccepted(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAccept = () => {
    setShowModal(false);
    // Si se ha marcado la casilla, redirige a la página de evaluación de desempeño
    if (accepted) {
      navigate('/performance');
    }
  };

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
            <h2>Instrucciones de manejo de la evaluación de desempeño</h2>

            <h3>Autoevaluación (trabajador):</h3>
            <ol>
              <li>
                Una vez que abra el archivo desde el menú de Inicio, ingrese su nombre en la parte superior, guárdelo con su nombre completo y la fecha actual, y luego presione el botón "Generar".
              </li>
              <li>
                El archivo se completará y quedará resguardado en el servidor, por lo que no será posible volver a abrirlo. Inicie la evaluación; cuando se guarde y finalice la edición, quedará registrado en la hoja correspondiente.
              </li>
              <li>
                Todo lo registrado en el PDF y en la primera hoja con el botón "Iniciar Evaluación" se consignará en la hoja correspondiente.
              </li>
              <li>
                Registre los aspectos a evaluar y los nombres del primer y segundo observador. Recuerde que esta información se enviará en PDF a su jefe inmediato.
              </li>
              <li>
                Al finalizar, la evaluación mostrará un enlace para que el jefe inmediato acceda a la evaluación en Excel, la revise y firme de conformidad.
              </li>
            </ol>

            <h3>Jefe inmediato:</h3>
            <ol>
              <li>
                Recibirá, ya sea en su correo o en la hoja de "Jefe Inmediato", un enlace para iniciar la evaluación.
              </li>
              <li>
                Revisará y aprobará o denegará los aspectos a mejorar.
              </li>
              <li>
                Registrará su firma y la enviará al evaluado.
              </li>
              <li>
                Recibirá la confirmación final, y el PDF definitivo se enviará al departamento de Outlook para archivar el informe.
              </li>
            </ol>

            <p style={{ marginTop: '1rem' }}>
              <strong>Meridan Consulting Ltda.</strong> – En cumplimiento y mantenimiento de sus certificaciones y procesos de mejora continua, se resguardará electrónicamente esta evaluación de desempeño. Al proceder, se entiende y acepta el tratamiento de datos, la validez de la firma electrónica y el almacenamiento del archivo final para fines de control y gestión interna.
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
              <button onClick={handleAccept} disabled={!accepted}>Acepto</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default LandingPage;
