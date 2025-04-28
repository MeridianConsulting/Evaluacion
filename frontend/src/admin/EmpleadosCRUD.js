import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmpleadosCRUD.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function EmpleadosCRUD({ onLogout, userRole }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmpleado, setCurrentEmpleado] = useState({
    id_empleado: '',
    nombre: '',
    apellido: '',
    cedula: '',
    cargo: '',
    correo: '',
    estado: 'Activo',
    rol: 'empleado'
  });

  // Datos de ejemplo (simulando datos de la base de datos)
  const [empleados, setEmpleados] = useState([
    { id_empleado: 1, nombre: 'Juan', apellido: 'Pérez', cedula: '123456789', cargo: 'Gerente', correo: 'juan@ejemplo.com', estado: 'Activo', rol: 'jefe' },
    { id_empleado: 2, nombre: 'María', apellido: 'López', cedula: '987654321', cargo: 'Analista', correo: 'maria@ejemplo.com', estado: 'Activo', rol: 'empleado' },
    { id_empleado: 3, nombre: 'Carlos', apellido: 'Gómez', cedula: '456789123', cargo: 'Desarrollador', correo: 'carlos@ejemplo.com', estado: 'Inactivo', rol: 'empleado' }
  ]);

  const handleBackClick = () => {
    navigate('/admin');
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentEmpleado({
      id_empleado: '',
      nombre: '',
      apellido: '',
      cedula: '',
      cargo: '',
      correo: '',
      estado: 'Activo',
      rol: 'empleado'
    });
    setShowForm(true);
  };

  const handleEditClick = (empleado) => {
    setIsEditing(true);
    setCurrentEmpleado({...empleado});
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este empleado?')) {
      // Aquí iría la lógica para eliminar de la base de datos
      // Por ahora, solo lo eliminamos del estado local
      setEmpleados(empleados.filter(emp => emp.id_empleado !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmpleado({...currentEmpleado, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Actualizar empleado existente
      setEmpleados(empleados.map(emp => 
        emp.id_empleado === currentEmpleado.id_empleado ? currentEmpleado : emp
      ));
    } else {
      // Agregar nuevo empleado
      const newId = Math.max(...empleados.map(emp => emp.id_empleado), 0) + 1;
      setEmpleados([...empleados, {...currentEmpleado, id_empleado: newId}]);
    }
    
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  return (
    <div className="crud-container">
      <Header onLogout={onLogout} userRole={userRole} />
      
      <main className="crud-main">
        <div className="crud-header">
          <button className="back-button" onClick={handleBackClick}>
            Volver al Panel
          </button>
          <h1>Gestión de Empleados</h1>
          <button className="add-button" onClick={handleAddClick}>
            Agregar Empleado
          </button>
        </div>

        {showForm && (
          <div className="crud-form-container">
            <form className="crud-form" onSubmit={handleSubmit}>
              <h2>{isEditing ? 'Editar Empleado' : 'Nuevo Empleado'}</h2>
              
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input 
                  type="text" 
                  id="nombre" 
                  name="nombre" 
                  value={currentEmpleado.nombre} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="apellido">Apellido:</label>
                <input 
                  type="text" 
                  id="apellido" 
                  name="apellido" 
                  value={currentEmpleado.apellido} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cedula">Cédula:</label>
                <input 
                  type="text" 
                  id="cedula" 
                  name="cedula" 
                  value={currentEmpleado.cedula} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cargo">Cargo:</label>
                <input 
                  type="text" 
                  id="cargo" 
                  name="cargo" 
                  value={currentEmpleado.cargo} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="correo">Correo:</label>
                <input 
                  type="email" 
                  id="correo" 
                  name="correo" 
                  value={currentEmpleado.correo} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="estado">Estado:</label>
                <select 
                  id="estado" 
                  name="estado" 
                  value={currentEmpleado.estado} 
                  onChange={handleInputChange}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="rol">Rol:</label>
                <select 
                  id="rol" 
                  name="rol" 
                  value={currentEmpleado.rol} 
                  onChange={handleInputChange}
                >
                  <option value="empleado">Empleado</option>
                  <option value="jefe">Jefe</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              
              <div className="form-buttons">
                <button type="button" className="cancel-button" onClick={handleCancelForm}>
                  Cancelar
                </button>
                <button type="submit" className="save-button">
                  {isEditing ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="crud-table-container">
          <table className="crud-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cédula</th>
                <th>Cargo</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map(empleado => (
                <tr key={empleado.id_empleado}>
                  <td>{empleado.id_empleado}</td>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.cedula}</td>
                  <td>{empleado.cargo}</td>
                  <td>{empleado.correo}</td>
                  <td>
                    <span className={`role-badge ${empleado.rol}`}>
                      {empleado.rol === 'admin' ? 'Administrador' : 
                       empleado.rol === 'jefe' ? 'Jefe' : 'Empleado'}
                    </span>
                  </td>
                  <td>
                    <span className={`estado-badge ${empleado.estado.toLowerCase()}`}>
                      {empleado.estado}
                    </span>
                  </td>
                  <td className="acciones">
                    <button 
                      className="edit-button" 
                      onClick={() => handleEditClick(empleado)}
                    >
                      Editar
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDeleteClick(empleado.id_empleado)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default EmpleadosCRUD; 