import React, { useState, useEffect } from 'react';
import '../assets/css/Styles1.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = ({ onLogout, userRole }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getPasswordStrength = (value) => {
    const lengthScore = value.length >= 12 ? 2 : value.length >= 8 ? 1 : 0;
    const variety = [/[a-z]/, /[A-Z]/, /\d/, /[^\w\s]/].reduce((acc, r) => acc + (r.test(value) ? 1 : 0), 0);
    const score = lengthScore + variety;
    if (!value) return { label: 'Sin contraseña', level: 'none' };
    if (score <= 2) return { label: 'Muy débil', level: 'weak' };
    if (score <= 4) return { label: 'Aceptable', level: 'medium' };
    return { label: 'Segura 🚀', level: 'strong' };
  };

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    const first = parts[0] ? parts[0][0] : '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
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
          if (data.rol && data.rol !== localStorage.getItem('userRole')) {
            localStorage.setItem('userRole', data.rol);
          }
        }
      } catch (err) {
        setError('Error en la conexión con el servidor.');
      }
      setLoading(false);
    };

    fetchEmployee();
  }, []);

  return (
    <div className="profile-page-unique">
      <Header onLogout={onLogout} userRole={userRole} />

      <style jsx>{`
        .profile-wrapper { width: min(1000px, 92vw); margin: 20px auto; display: flex; flex-direction: column; gap: 24px; }
        
        /* ===== HERO ===== */
        .page-hero { display: grid; grid-template-columns: auto 1fr; gap: 16px; align-items: center; background: #fff; border-radius: 16px; padding: 20px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
        .hero-avatar { width: 72px; height: 72px; border-radius: 50%; display: grid; place-items: center; background: linear-gradient(135deg, #1f3b73, #0e1a36); color: #fff; font-weight: 800; font-size: 1.5rem; border: 2px solid rgba(255,215,0,.6); }
        .hero-title { margin: 0; font-size: 1.8rem; font-weight: 800; color: #0e1a36; line-height: 1.2; }
        .hero-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
        .chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; background: #eef2ff; color: #1f3b73; font-weight: 600; border: 1px solid rgba(31,59,115,.15); transition: .3s; max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .chip:hover { background: #e0e7ff; box-shadow: 0 2px 6px rgba(0,0,0,0.06); }
        
        /* ===== CARDS ===== */
        .profile-grid { display: grid; gap: 20px; }
        .card { background: #fff; border-radius: 16px; padding: 20px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
        .card h2 { margin: 0 0 12px; font-size: 1.5rem; font-weight: 800; color: #0e1a36; }

        /* ===== FORM ===== */
        .form-row { display: grid; gap: 6px; margin-bottom: 16px; }
        .form-row label { font-weight: 700; color: #1F3B73; }
        .input-wrap { position: relative; }
        .input-wrap .prefix { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); opacity: .6; }
        .input-wrap .toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #1f3b73; font-size: 1.1rem; }
        .form-row input { width: 100%; padding: 10px 38px 10px 32px; border-radius: 8px; border: 1px solid #dcdfe6; outline: none; background: #fff; color: #0f172a; box-sizing: border-box; }
        .form-row input:focus { border-color: #1976d2; box-shadow: 0 0 0 3px rgba(25,118,210,.15); }

        /* Strength bar */
        .strength-wrap { display: grid; gap: 6px; margin-top: 6px; }
        .strength-label { font-size: .85rem; color: #55637a; font-weight: 600; }
        .strength-bar { display: flex; gap: 4px; }
        .strength-bar div { flex: 1; height: 8px; border-radius: 4px; background: #e5e7eb; transition: background .3s; }
        .strength-bar div.active.weak { background: #ef4444; }
        .strength-bar div.active.medium { background: #f59e0b; }
        .strength-bar div.active.strong { background: #16a34a; }

        /* Actions */
        .actions { display: flex; flex-direction: column; gap: 10px; align-items: stretch; }
        .btn-guardar { background: linear-gradient(90deg, #FFC107, #FFB300); padding: 12px; border: none; border-radius: 10px; font-weight: 700; transition: .3s; cursor: pointer; color: #1F3B73; }
        .btn-guardar:hover { background: linear-gradient(90deg, #FFB300, #FFA000); box-shadow: 0 6px 14px rgba(0,0,0,0.15); }
        .btn-guardar:active { transform: scale(0.97); }
        .msg { font-size: .95rem; text-align: center; }
        .msg.ok { color: #16a34a; }
        .msg.err { color: #dc2626; }

        @media (max-width: 600px) {
          .page-hero { grid-template-columns: 1fr; text-align: center; }
          .hero-avatar { margin: 0 auto; }
          .hero-meta { justify-content: center; }
        }
      `}</style>

      <div className="profile-container profile-wrapper">
        {loading ? (
          <p className="profile-loading">Cargando información...</p>
        ) : error ? (
          <p className="profile-error">{error}</p>
        ) : (
          employee && (
            <>
              {/* ==== HERO ==== */}
              <div className="page-hero">
                <div className="hero-avatar" aria-hidden="true">{getInitials(employee.nombre)}</div>
                <div className="hero-info">
                  <h1 className="hero-title">{employee.nombre}</h1>
                  <div className="hero-meta">
                    <span className="chip">🪪 {employee.cedula}</span>
                    <span className="chip">📧 {employee.email}</span>
                    <span className="chip">💼 {employee.cargo}</span>
                    <span className="chip">🏢 {employee.area || 'N/D'}</span>
                    <span className="chip">🛡️ {employee.rol === 'admin' ? 'Administrador' : employee.rol === 'jefe' ? 'Jefe' : 'Empleado'}</span>
                  </div>
                </div>
              </div>

              {/* ==== SEGURIDAD ==== */}
              <div className="profile-grid">
                <div className="card">
                  <h2>Seguridad: Cambiar contraseña</h2>
                  <p className="security-desc">Por tu seguridad, usa una contraseña de al menos 6 caracteres.</p>
                  
                  <div className="form-row">
                    <label>Nueva contraseña</label>
                    <div className="input-wrap">
                      <span className="prefix" aria-hidden="true">🔒</span>
                      <input type={showNew ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Ingresa la nueva contraseña" />
                      <button type="button" className="toggle" onClick={() => setShowNew(!showNew)}>{showNew ? '🙈' : '👁️'}</button>
                    </div>
                    {newPassword && (
                      <div className="strength-wrap">
                        <span className="strength-label">Seguridad: {getPasswordStrength(newPassword).label}</span>
                        <div className="strength-bar">
                          <div className={`${['weak','medium','strong'].includes(getPasswordStrength(newPassword).level) ? 'active ' + getPasswordStrength(newPassword).level : ''}`}></div>
                          <div className={`${['medium','strong'].includes(getPasswordStrength(newPassword).level) ? 'active ' + getPasswordStrength(newPassword).level : ''}`}></div>
                          <div className={`${getPasswordStrength(newPassword).level === 'strong' ? 'active strong' : ''}`}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-row">
                    <label>Confirmar nueva contraseña</label>
                    <div className="input-wrap">
                      <span className="prefix" aria-hidden="true">🔒</span>
                      <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirma la nueva contraseña" />
                      <button type="button" className="toggle" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? '🙈' : '👁️'}</button>
                    </div>
                  </div>

                  <div className="actions">
                    <button className="btn-guardar" disabled={pwLoading} onClick={async () => {
                      try {
                        setPwMessage('');
                        if (!newPassword || newPassword.length < 6) {
                          setPwMessage('La contraseña debe tener al menos 6 caracteres.');
                          return;
                        }
                        if (newPassword !== confirmPassword) {
                          setPwMessage('Las contraseñas no coinciden.');
                          return;
                        }
                        setPwLoading(true);
                        const apiUrl = process.env.REACT_APP_API_BASE_URL;
                        const employeeId = localStorage.getItem('employeeId');
                        const res = await fetch(`${apiUrl}/api/employees/${employeeId}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                          body: JSON.stringify({ contrasena: newPassword })
                        });
                        const data = await res.json().catch(() => ({}));
                        if (!res.ok || data.success === false) {
                          throw new Error(data.message || data.error || 'No se pudo actualizar la contraseña');
                        }
                        setPwMessage('Contraseña actualizada correctamente.');
                        setNewPassword('');
                        setConfirmPassword('');
                      } catch (e) {
                        setPwMessage(e.message || 'Error al actualizar la contraseña.');
                      } finally {
                        setPwLoading(false);
                      }
                    }}>
                      {pwLoading ? 'Guardando…' : 'Guardar contraseña'}
                    </button>
                    {pwMessage && (
                      <span className={`msg ${/actualizada|correctamente|exitosamente/i.test(pwMessage) ? 'ok' : 'err'}`}>
                        {pwMessage}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
